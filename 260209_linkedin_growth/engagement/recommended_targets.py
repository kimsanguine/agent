"""추천 타겟 저장/조회/액션 관리 (data/targets/recommended_targets.json)."""

import json
from datetime import datetime, timedelta

import config

RECOMMENDED_TARGETS_FILE = config.TARGETS_DIR / "recommended_targets.json"


def _now_iso() -> str:
    return datetime.now().isoformat()


def _default_payload(user_id: str = "mock-user") -> dict:
    return {
        "user_id": user_id,
        "generated_at": _now_iso(),
        "window_days": 30,
        "profile_dna": {
            "type": "builder",
            "scores": {
                "content_fit": 78.4,
                "interaction_style": 64.2,
                "operating_rhythm": 71.5,
            },
            "window_days": 30,
            "updated_at": _now_iso(),
        },
        "popularity": {
            "pi": 67.3,
            "grade": "growing",
            "components": {
                "reach_score": 70.0,
                "engagement_quality_score": 65.0,
                "growth_velocity_score": 63.0,
            },
        },
        "weights": {
            "topic_fit": 0.30,
            "response_probability": 0.25,
            "popularity_fit": 0.20,
            "network_distance_fit": 0.15,
            "recent_activity": 0.10,
        },
        "candidates": [
            {
                "candidate_id": "cand_2nd_9281",
                "name": "Product Leader A",
                "profile_url": "https://example.com/a",
                "headline": "AI Product Lead",
                "topics": ["AI", "Growth"],
                "network_distance": 2,
                "mutual_count": 5,
                "recent_activity": {
                    "posts_30d": 6,
                    "avg_engagement_rate": 5.8,
                    "last_posted_at": "2026-02-13T09:30:00",
                },
                "scores": {
                    "trs": 82.6,
                    "topic_fit": 88.0,
                    "response_probability": 74.0,
                    "popularity_fit": 80.0,
                    "network_distance_fit": 79.0,
                    "recent_activity": 90.0,
                    "penalty": 3.4,
                },
                "recommended_action": "connect",
                "reasons": [
                    "내 상위 주제와 높은 유사도",
                    "2촌 + 공통 연결 5명",
                    "최근 활동 활발",
                ],
                "state": "active",
            },
            {
                "candidate_id": "cand_2nd_3102",
                "name": "Growth PM B",
                "profile_url": "https://example.com/b",
                "headline": "B2B Growth PM",
                "topics": ["SaaS", "Growth", "Experiment"],
                "network_distance": 2,
                "mutual_count": 3,
                "recent_activity": {
                    "posts_30d": 4,
                    "avg_engagement_rate": 4.9,
                    "last_posted_at": "2026-02-12T08:20:00",
                },
                "scores": {
                    "trs": 74.2,
                    "topic_fit": 79.0,
                    "response_probability": 66.0,
                    "popularity_fit": 72.0,
                    "network_distance_fit": 78.0,
                    "recent_activity": 70.0,
                    "penalty": 1.8,
                },
                "recommended_action": "follow",
                "reasons": [
                    "실험형 포스트와 높은 주제 적합도",
                    "공통 연결 기반 접근 가능",
                ],
                "state": "active",
            },
            {
                "candidate_id": "cand_3rd_2208",
                "name": "Tech Writer C",
                "profile_url": "https://example.com/c",
                "headline": "Developer Relations",
                "topics": ["Technical", "Career"],
                "network_distance": 3,
                "mutual_count": 1,
                "recent_activity": {
                    "posts_30d": 3,
                    "avg_engagement_rate": 3.2,
                    "last_posted_at": "2026-02-10T10:10:00",
                },
                "scores": {
                    "trs": 58.7,
                    "topic_fit": 62.0,
                    "response_probability": 49.0,
                    "popularity_fit": 65.0,
                    "network_distance_fit": 52.0,
                    "recent_activity": 61.0,
                    "penalty": 1.3,
                },
                "recommended_action": "watch",
                "reasons": [
                    "주제 중첩은 있으나 반응 확률이 낮음",
                ],
                "state": "active",
            },
        ],
        "meta": {
            "total": 3,
            "returned": 3,
            "cached": True,
        },
    }


def _load_or_init(user_id: str = "mock-user") -> dict:
    if not RECOMMENDED_TARGETS_FILE.exists():
        payload = _default_payload(user_id)
        save_recommended_targets(payload)
        return payload

    with open(RECOMMENDED_TARGETS_FILE, encoding="utf-8") as f:
        payload = json.load(f)

    if payload.get("user_id") != user_id:
        payload["user_id"] = user_id

    return payload


def save_recommended_targets(payload: dict):
    with open(RECOMMENDED_TARGETS_FILE, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)


def get_recommended_targets(
    user_id: str = "mock-user",
    limit: int = 10,
    min_score: float = 0,
    distance: int | None = None,
    action: str | None = None,
    state: str | None = None,
) -> dict:
    payload = _load_or_init(user_id)

    candidates = payload.get("candidates", [])

    if min_score > 0:
        candidates = [c for c in candidates if float(c.get("scores", {}).get("trs", 0)) >= min_score]

    if distance is not None:
        candidates = [c for c in candidates if int(c.get("network_distance", 99)) == distance]

    if action:
        candidates = [c for c in candidates if c.get("recommended_action") == action]

    if state:
        candidates = [c for c in candidates if c.get("state", "active") == state]

    candidates = sorted(candidates, key=lambda c: float(c.get("scores", {}).get("trs", 0)), reverse=True)

    if limit > 0:
        candidates = candidates[:limit]

    return {
        "user_id": payload.get("user_id", user_id),
        "generated_at": payload.get("generated_at", _now_iso()),
        "window_days": payload.get("window_days", 30),
        "profile_dna": payload.get("profile_dna", {}),
        "popularity": payload.get("popularity", {}),
        "weights": payload.get("weights", {}),
        "candidates": candidates,
        "meta": {
            "total": len(payload.get("candidates", [])),
            "returned": len(candidates),
            "cached": True,
        },
    }


def refresh_recommended_targets(
    user_id: str = "mock-user",
    window_days: int = 30,
    limit: int = 10,
    force: bool = False,
) -> dict:
    payload = _load_or_init(user_id)
    payload["generated_at"] = _now_iso()
    payload["window_days"] = window_days

    profile_dna = payload.get("profile_dna", {})
    if isinstance(profile_dna, dict):
        profile_dna["window_days"] = window_days
        profile_dna["updated_at"] = _now_iso()
        payload["profile_dna"] = profile_dna

    save_recommended_targets(payload)

    if force:
        return {
            "ok": True,
            "job_id": f"reco_job_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "status": "queued",
        }

    return {
        "ok": True,
        "user_id": user_id,
        "generated_at": payload["generated_at"],
        "total_candidates": min(limit, len(payload.get("candidates", []))),
    }


def apply_recommended_target_action(
    candidate_id: str,
    user_id: str,
    action: str,
    note: str | None = None,
    snooze_days: int | None = None,
) -> dict:
    payload = _load_or_init(user_id)
    candidates = payload.get("candidates", [])

    candidate = next((c for c in candidates if c.get("candidate_id") == candidate_id), None)
    if candidate is None:
        return {"ok": False, "error": "candidate_not_found"}

    result = {
        "ok": True,
        "candidate_id": candidate_id,
        "action": action,
        "updated_at": _now_iso(),
    }

    if note:
        candidate["note"] = note

    if action == "hide":
        candidate["state"] = "hidden"
        result["state"] = "hidden"

    elif action == "snooze":
        candidate["state"] = "snoozed"
        days = snooze_days if isinstance(snooze_days, int) and snooze_days > 0 else 7
        candidate["snoozed_until"] = (datetime.now() + timedelta(days=days)).isoformat()
        result["state"] = "snoozed"

    elif action == "add_target":
        from engagement.target_manager import add_target

        target = add_target({
            "name": candidate.get("name", ""),
            "profile_url": candidate.get("profile_url", ""),
            "headline": candidate.get("headline", ""),
            "topics": candidate.get("topics", []),
            "priority": "high" if float(candidate.get("scores", {}).get("trs", 0)) >= 80 else "medium",
            "notes": note or "recommended target converted",
        })

        candidate["state"] = "converted"
        candidate["target_id"] = target.get("id")
        result["state"] = "converted"
        result["target_id"] = target.get("id")

    elif action in {"connect", "follow", "skip"}:
        candidate["last_action"] = action
        candidate["state"] = "active" if action in {"connect", "follow"} else candidate.get("state", "active")
        result["state"] = candidate.get("state", "active")

    else:
        return {"ok": False, "error": "invalid_action"}

    save_recommended_targets(payload)
    return result
