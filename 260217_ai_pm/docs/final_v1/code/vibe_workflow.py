"""
vibe_workflow.py — 바이브 코딩 워크플로우 플래너
PM이 바이브 코딩 세션을 시작하기 전에 최적의 전략을 결정한다.

사용법:
    python vibe_workflow.py

Part 6.1 바이브 코딩 v2 실습 코드
"""
from dataclasses import dataclass, field
from enum import Enum


class ProjectScale(Enum):
    SMALL = "small"      # 3-5 페이지, 단일 기능
    MEDIUM = "medium"    # SaaS MVP, 10-20 파일
    LARGE = "large"      # 전체 리팩토링, 50+ 파일


class ApproachType(Enum):
    REBUILD = "rebuild"
    IMPROVE = "improve"


@dataclass
class VibeSession:
    """바이브 코딩 세션의 최적 전략을 계산한다."""
    project_name: str
    existing_files: int = 0
    estimated_tokens: int = 0
    scale: ProjectScale = ProjectScale.SMALL
    has_tests: bool = False
    has_prd: bool = False
    has_competitor_data: bool = False

    @property
    def recommended_model(self) -> str:
        if self.estimated_tokens > 200_000:
            return "Opus 4.6 (1M Context)"
        if self.scale == ProjectScale.SMALL:
            return "Sonnet 4.6 (200K)"
        return "Sonnet 4.6 (200K)"

    @property
    def recommended_strategy(self) -> str:
        if self.existing_files == 0:
            return "신규 프로젝트: PRD → Plan → Agent Teams 구현"
        if self.existing_files <= 10:
            return "소규모 수정: 순차 파일 수정"
        return "대규모 수정: 1M Context 로딩 → Plan 모드 → Agent Teams"

    @property
    def use_agent_teams(self) -> bool:
        return self.scale in (ProjectScale.MEDIUM, ProjectScale.LARGE)

    @property
    def estimated_cost(self) -> float:
        """세션 예상 비용 (달러)"""
        if "Opus" in self.recommended_model:
            input_rate, output_rate = 5.00, 25.00
        else:
            input_rate, output_rate = 3.00, 15.00

        output_tokens = int(self.estimated_tokens * 0.3)
        return round(
            (self.estimated_tokens * input_rate
             + output_tokens * output_rate) / 1_000_000, 2
        )

    @property
    def context_loading_plan(self) -> list[str]:
        """Context에 로딩할 자료 우선순위"""
        plan = []
        if self.has_prd:
            plan.append("[필수] PRD/요구사항 문서")
        if self.has_competitor_data:
            plan.append("[권장] 경쟁사 분석 자료")
        if self.existing_files > 0:
            plan.append(f"[필수] 기존 코드 ({self.existing_files}개 파일)")
        if self.has_tests:
            plan.append("[권장] 기존 테스트 코드")
        plan.append("[필수] CLAUDE.md (프로젝트 규칙)")
        return plan


def recommend_approach(
    existing_code_lines: int,
    has_tests: bool,
    needs_stack_change: bool,
) -> ApproachType:
    """기존 코드를 개선할지, 재구현할지 판단한다."""
    if needs_stack_change:
        return ApproachType.REBUILD
    if existing_code_lines < 200:
        return ApproachType.REBUILD
    if has_tests and existing_code_lines > 500:
        return ApproachType.IMPROVE
    return ApproachType.IMPROVE


def plan_session(session: VibeSession) -> None:
    """바이브 코딩 세션 계획을 출력한다."""
    print(f"\n{'='*60}")
    print(f"  바이브 코딩 세션 플래너: {session.project_name}")
    print(f"{'='*60}")

    print(f"\n  [프로젝트 정보]")
    print(f"  규모:           {session.scale.value}")
    print(f"  기존 파일 수:   {session.existing_files}개")
    print(f"  예상 토큰:      {session.estimated_tokens:,}")

    print(f"\n  [추천 전략]")
    print(f"  모델:           {session.recommended_model}")
    print(f"  전략:           {session.recommended_strategy}")
    print(f"  Agent Teams:    {'Yes' if session.use_agent_teams else 'No'}")
    print(f"  예상 비용:      ${session.estimated_cost}")

    print(f"\n  [Context 로딩 순서] (중요한 것부터)")
    for i, item in enumerate(session.context_loading_plan, 1):
        print(f"    {i}. {item}")

    # 경고
    warnings = []
    if session.estimated_tokens > 800_000:
        warnings.append("토큰이 800K 초과 — Lost-in-the-Middle 위험. 핵심 지시를 앞/뒤에 배치하세요.")
    if session.estimated_tokens > 200_000 and "Sonnet" in session.recommended_model:
        warnings.append("200K 초과 시 Sonnet 가격 2배. Opus가 오히려 저렴할 수 있습니다.")
    if not session.has_prd:
        warnings.append("PRD 없이 바이브 코딩하면 방향이 흔들립니다. PRD를 먼저 작성하세요.")

    if warnings:
        print(f"\n  [주의사항]")
        for w in warnings:
            print(f"    ! {w}")


if __name__ == "__main__":
    # 시나리오 1: 신규 SaaS MVP
    session1 = VibeSession(
        project_name="피드백 분석 SaaS MVP",
        existing_files=0,
        estimated_tokens=415_000,
        scale=ProjectScale.MEDIUM,
        has_prd=True,
        has_competitor_data=True,
    )
    plan_session(session1)

    # 시나리오 2: 기존 프로젝트에 기능 추가
    session2 = VibeSession(
        project_name="기존 SaaS에 AI 요약 기능 추가",
        existing_files=150,
        estimated_tokens=300_000,
        scale=ProjectScale.LARGE,
        has_tests=True,
        has_prd=True,
    )
    plan_session(session2)

    # 시나리오 3: 소규모 프로토타입
    session3 = VibeSession(
        project_name="랜딩 페이지 프로토타입",
        existing_files=0,
        estimated_tokens=30_000,
        scale=ProjectScale.SMALL,
        has_prd=True,
    )
    plan_session(session3)

    # 재구현 vs 개선 판단
    print(f"\n{'='*60}")
    print(f"  재구현 vs 개선 판단")
    print(f"{'='*60}")

    cases = [
        ("150줄 유틸리티 (테스트 없음)", 150, False, False),
        ("2000줄 API 서버 (테스트 있음)", 2000, True, False),
        ("500줄 앱 (기술 스택 변경 필요)", 500, True, True),
    ]

    for name, lines, tests, stack_change in cases:
        approach = recommend_approach(lines, tests, stack_change)
        print(f"\n  {name}")
        print(f"  → {approach.value} 권장")
