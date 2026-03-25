"""
part_navigator.py — Part 간 네비게이션 추천 엔진
학습자의 레벨과 목표에 따라 최적 읽기 경로를 BFS로 계산한다.

사용법:
    python part_navigator.py

브릿지 모듈 (bridge-modules.md) 실습 코드
"""
from collections import deque
from dataclasses import dataclass, field


@dataclass
class Part:
    id: str
    title: str
    level: str           # J, P, L
    estimated_minutes: int
    file: str


# Part 카탈로그
PARTS = {
    "1.1": Part("1.1", "왜 지금, AI 네이티브 PM인가", "J", 10, "1.1-why-now.md"),
    "1.3": Part("1.3", "설치와 첫 실행", "J", 15, "1.3-install-and-first-run.md"),
    "2.1": Part("2.1", "파일과 입력", "J", 15, "2.1-files-and-input.md"),
    "2.3": Part("2.3", "프로젝트 메모리", "P", 20, "2.3-project-memory.md"),
    "2.5": Part("2.5", "Agent Teams", "P", 25, "2.5-agent-teams.md"),
    "2.6": Part("2.6", "Human-in-the-Loop", "J", 20, "2.6-human-in-the-loop.md"),
    "3.1": Part("3.1", "MCP 연동", "P", 30, "3.1-mcp-integration.md"),
    "3.6": Part("3.6", "멀티모델 라우팅", "P", 25, "3.6-multimodel-routing.md"),
    "4.1": Part("4.1", "유저 리서치", "P", 30, "4.1-discovery-user-research.md"),
    "5.1": Part("5.1", "PRD 작성", "P", 30, "5.1-definition-write-prd.md"),
    "5.2": Part("5.2", "제품 전략", "L", 25, "5.2-definition-product-strategy.md"),
    "6.1": Part("6.1", "바이브 코딩 v2", "J", 40, "6.1-delivery-vibe-coding.md"),
    "6.2": Part("6.2", "비주얼 에셋", "P", 25, "6.2-delivery-visual-assets.md"),
    "6.3": Part("6.3", "GitHub 배포", "P", 20, "6.3-delivery-github-deploy.md"),
    "7.1": Part("7.1", "실험 분석", "P", 25, "7.1-growth-experiment-analysis.md"),
    "7.2": Part("7.2", "KPI 대시보드", "L", 30, "7.2-growth-kpi-dashboard.md"),
    "7.3": Part("7.3", "AI Observability", "L", 30, "7.3-ai-observability.md"),
    "7.4": Part("7.4", "1M Context 비용 전략", "P", 25, "7.4-1m-context-cost-strategy.md"),
    "8.1": Part("8.1", "AI 제품 전략", "L", 25, "8.1-ai-product-strategy.md"),
    "8.2": Part("8.2", "성장 경로", "J", 20, "8.2-growth-path.md"),
}

# 의존성 그래프: {from: [to, ...]}
GRAPH = {
    "1.1": ["1.3"],
    "1.3": ["2.1"],
    "2.1": ["2.3", "2.6"],
    "2.3": ["3.1"],
    "2.5": ["6.1"],
    "2.6": ["6.1"],
    "3.1": ["3.6"],
    "3.6": ["6.1", "7.4"],
    "4.1": ["5.1"],
    "5.1": ["5.2", "6.1"],
    "5.2": ["8.1"],
    "6.1": ["6.2", "6.3", "7.4"],
    "6.3": ["7.1"],
    "7.1": ["7.2"],
    "7.2": ["7.3"],
    "7.3": ["3.6"],  # 피드백 루프
    "7.4": ["8.1"],
}

LEVEL_ORDER = {"J": 0, "P": 1, "L": 2}


def find_path_bfs(start: str, end: str) -> list[str]:
    """BFS로 두 Part 사이의 최단 경로를 찾는다."""
    if start == end:
        return [start]

    queue = deque([[start]])
    visited = {start}

    while queue:
        path = queue.popleft()
        current = path[-1]

        for neighbor in GRAPH.get(current, []):
            if neighbor == end:
                return path + [neighbor]
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(path + [neighbor])

    return []  # 경로 없음


def recommend_path(level: str, goal: str) -> list[str]:
    """레벨과 목표에 따라 추천 경로를 반환한다."""
    paths = {
        "J_start": ["1.1", "1.3", "2.1", "2.6", "6.1"],
        "P_cost": ["3.6", "7.4", "6.1", "7.3"],
        "L_system": ["5.2", "3.6", "6.1", "7.3", "7.4", "8.1"],
        "P_prd": ["5.1", "6.1", "6.3"],
        "J_prototype": ["1.3", "2.1", "6.1", "6.2"],
        "L_team": ["8.2", "3.6", "6.1", "7.3"],
    }

    key = f"{level}_{goal}"
    return paths.get(key, paths["J_start"])


def print_path(path: list[str], label: str) -> None:
    """경로를 보기 좋게 출력한다."""
    total_min = sum(PARTS[p].estimated_minutes for p in path if p in PARTS)
    print(f"\n  [{label}] (예상 {total_min}분)")
    for i, part_id in enumerate(path):
        part = PARTS.get(part_id)
        if part:
            arrow = "  -> " if i > 0 else "     "
            print(f"  {arrow}{part.id} {part.title} ({part.level}, {part.estimated_minutes}분)")


def print_connections(part_id: str) -> None:
    """특정 Part에서 갈 수 있는 다음 Part 목록을 출력한다."""
    targets = GRAPH.get(part_id, [])
    part = PARTS.get(part_id)
    if not part:
        print(f"  Part {part_id}를 찾을 수 없습니다.")
        return

    print(f"\n  {part.id} {part.title} 이후 추천:")
    if not targets:
        print(f"    (마지막 Part입니다)")
        return
    for t in targets:
        tp = PARTS.get(t)
        if tp:
            print(f"    -> {tp.id} {tp.title} ({tp.level})")


if __name__ == "__main__":
    print("=" * 60)
    print("  AI PM 가이드 — Part 네비게이터")
    print("=" * 60)

    # 추천 경로 3가지
    print("\n--- 추천 읽기 경로 ---")
    print_path(
        recommend_path("J", "start"),
        "신입 PM 오리엔테이션"
    )
    print_path(
        recommend_path("P", "cost"),
        "비용 최적화 트랙"
    )
    print_path(
        recommend_path("L", "system"),
        "전체 시스템 설계 트랙"
    )

    # BFS 경로 탐색
    print("\n--- 경로 탐색 (BFS) ---")
    for start, end in [("3.6", "7.3"), ("1.1", "6.1"), ("5.1", "8.1")]:
        path = find_path_bfs(start, end)
        if path:
            print_path(path, f"{start} -> {end}")
        else:
            print(f"\n  [{start} -> {end}] 경로 없음")

    # 특정 Part에서의 다음 추천
    print("\n--- 다음 Part 추천 ---")
    for p in ["6.1", "3.6", "7.4"]:
        print_connections(p)

    # 피드백 루프 시각화
    print("\n--- 핵심 피드백 루프 ---")
    loop = ["3.6", "6.1", "7.3", "3.6"]
    total = sum(PARTS[p].estimated_minutes for p in loop[:3])
    print(f"\n  모델 선택 -> 구현 -> 모니터링 -> 재선택 (1사이클 {total}분)")
    for i, p in enumerate(loop):
        arrow = " -> " if i > 0 else "    "
        part = PARTS[p]
        print(f"  {arrow}{part.id} {part.title}")
