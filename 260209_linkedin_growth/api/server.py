"""Flask REST API 서버 (port 5000)."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from flask import Flask, jsonify, request
from flask_cors import CORS

import config
from ai.content_analyzer import analyze_content_insights
from ai.recommender import get_latest_recommendations, generate_recommendations
from analytics.calculator import calculate_period_stats, calculate_weekly_stats
from collectors.followers import collect_followers
from collectors.posts import collect_posts
from engagement.comment_queue import (
    approve_comment,
    get_pending,
    get_stats as queue_stats,
    reject_comment,
    mark_posted,
)
from engagement.target_manager import (
    add_target,
    get_priority_targets,
    load_targets,
    remove_target,
)
from engagement.recommended_targets import (
    apply_recommended_target_action,
    get_recommended_targets,
    refresh_recommended_targets,
)
from mock.mock_data import MockData
from storage.analytics_store import AnalyticsStore

app = Flask(__name__)
CORS(app)


# ── Analytics ──


@app.route("/api/analytics/<user_id>/summary")
def get_summary(user_id: str):
    """7/30/90일 요약."""
    posts = collect_posts(user_id)
    followers = collect_followers(user_id)
    profile_views = MockData.generate_profile_views()

    period_stats = calculate_period_stats(posts, followers, profile_views)
    weekly_stats = calculate_weekly_stats(posts, followers)

    return jsonify({
        "user_id": user_id,
        "period_stats": period_stats,
        "weekly_stats": weekly_stats,
        "followers": {k: v for k, v in followers.items() if k != "history"},
        "total_posts": len(posts),
    })


@app.route("/api/analytics/<user_id>/posts")
def get_posts(user_id: str):
    """포스트 목록 (정렬 파라미터)."""
    sort_by = request.args.get("sort", "created_at")
    order = request.args.get("order", "desc")
    limit = int(request.args.get("limit", 50))

    posts = collect_posts(user_id)

    # 정렬
    reverse = order == "desc"
    if sort_by in ("impressions", "reactions", "comments", "engagement_rate"):
        posts.sort(key=lambda p: p.get(sort_by, 0), reverse=reverse)
    else:
        posts.sort(key=lambda p: p.get("created_at", ""), reverse=reverse)

    return jsonify({"posts": posts[:limit], "total": len(posts)})


@app.route("/api/analytics/<user_id>/trends")
def get_trends(user_id: str):
    """차트용 시계열 데이터."""
    days = int(request.args.get("days", 30))

    posts = collect_posts(user_id)
    followers = collect_followers(user_id)
    profile_views = MockData.generate_profile_views()

    # 일별 데이터
    follower_history = followers.get("history", [])[-days:]

    # 포스트 타임라인
    post_timeline = [
        {
            "date": p.get("created_at", "")[:10],
            "impressions": p.get("impressions", 0),
            "engagement_rate": p.get("engagement_rate", 0),
            "reactions": p.get("reactions", 0),
            "comments": p.get("comments", 0),
        }
        for p in posts
    ]

    return jsonify({
        "follower_history": follower_history[-days:],
        "profile_views": profile_views[-days:],
        "post_timeline": post_timeline,
    })


@app.route("/api/analytics/<user_id>/insights")
def get_insights(user_id: str):
    """AI 콘텐츠 인사이트 (최근 N일)."""
    days = int(request.args.get("days", 30))
    posts = collect_posts(user_id)

    result = analyze_content_insights(posts, period_days=days)

    return jsonify({
        "user_id": user_id,
        "period_days": days,
        **result,
    })


# ── AI Recommendations ──


@app.route("/api/recommendations/<user_id>")
def get_recommendations(user_id: str):
    """AI 추천 결과."""
    result = get_latest_recommendations()
    if not result:
        posts = collect_posts(user_id)
        result = generate_recommendations(posts)
    return jsonify(result)


# ── Engagement ──


@app.route("/api/targets", methods=["GET"])
def list_targets():
    """타겟 프로필 목록."""
    return jsonify({"targets": load_targets()})


@app.route("/api/targets", methods=["POST"])
def create_target():
    """타겟 프로필 추가."""
    data = request.get_json()
    target = add_target(data)
    return jsonify(target), 201


@app.route("/api/targets/<target_id>", methods=["DELETE"])
def delete_target(target_id: str):
    """타겟 프로필 삭제."""
    if remove_target(target_id):
        return jsonify({"ok": True})
    return jsonify({"error": "not found"}), 404


@app.route("/api/comments/queue", methods=["GET"])
def get_comment_queue():
    """댓글 큐."""
    status_filter = request.args.get("status", "pending")
    from engagement.comment_queue import load_queue
    queue = load_queue()
    if status_filter != "all":
        queue = [q for q in queue if q.get("status") == status_filter]
    return jsonify({"queue": queue, "stats": queue_stats()})


@app.route("/api/targets/recommendations", methods=["GET"])
def list_target_recommendations():
    """추천 타겟 목록 조회."""
    user_id = request.args.get("user_id", config.LINKEDIN_USER_ID or "mock-user")
    limit = int(request.args.get("limit", 10))
    min_score = float(request.args.get("min_score", 0))
    distance = request.args.get("distance")
    action = request.args.get("action")
    state = request.args.get("state")

    result = get_recommended_targets(
        user_id=user_id,
        limit=limit,
        min_score=min_score,
        distance=int(distance) if distance is not None else None,
        action=action,
        state=state,
    )

    return jsonify(result)


@app.route("/api/targets/recommendations/refresh", methods=["POST"])
def refresh_target_recommendations():
    """추천 타겟 재계산 트리거."""
    data = request.get_json() or {}
    user_id = data.get("user_id") or config.LINKEDIN_USER_ID or "mock-user"
    window_days = int(data.get("window_days", 30))
    limit = int(data.get("limit", 10))
    force = bool(data.get("force", False))

    result = refresh_recommended_targets(
        user_id=user_id,
        window_days=window_days,
        limit=limit,
        force=force,
    )
    status_code = 202 if result.get("status") == "queued" else 200
    return jsonify(result), status_code


@app.route("/api/targets/recommendations/<candidate_id>/action", methods=["POST"])
def action_target_recommendation(candidate_id: str):
    """추천 타겟 액션 처리."""
    data = request.get_json() or {}
    user_id = data.get("user_id") or config.LINKEDIN_USER_ID or "mock-user"
    action = data.get("action", "skip")
    note = data.get("note")
    snooze_days = data.get("snooze_days")

    result = apply_recommended_target_action(
        candidate_id=candidate_id,
        user_id=user_id,
        action=action,
        note=note,
        snooze_days=snooze_days,
    )

    if not result.get("ok"):
        if result.get("error") == "candidate_not_found":
            return jsonify(result), 404
        return jsonify(result), 400

    return jsonify(result)


@app.route("/api/comments/<comment_id>/approve", methods=["POST"])
def approve(comment_id: str):
    """댓글 승인."""
    data = request.get_json() or {}
    edited_text = data.get("text")
    if approve_comment(comment_id, edited_text):
        return jsonify({"ok": True})
    return jsonify({"error": "not found"}), 404


@app.route("/api/comments/<comment_id>/reject", methods=["POST"])
def reject(comment_id: str):
    """댓글 거부."""
    if reject_comment(comment_id):
        return jsonify({"ok": True})
    return jsonify({"error": "not found"}), 404


@app.route("/api/comments/<comment_id>/posted", methods=["POST"])
def posted(comment_id: str):
    """게시 완료."""
    if mark_posted(comment_id):
        return jsonify({"ok": True})
    return jsonify({"error": "not found"}), 404


# ── Health ──


@app.route("/api/health")
def health():
    return jsonify({"status": "ok", "mock_mode": config.USE_MOCK_DATA})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
