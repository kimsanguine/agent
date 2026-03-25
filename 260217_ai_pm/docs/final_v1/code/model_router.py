"""
model_router.py — AI 모델 라우팅 엔진
태스크의 컨텍스트 크기, 추론 복잡도, 비용 예산에 따라 최적 모델을 선택한다.

사용법:
    python model_router.py

Part 3.6 멀티모델 라우팅 실습 코드
"""
from dataclasses import dataclass
from enum import Enum


class Complexity(Enum):
    LOW = "low"          # 분류, 추출, 간단 요약
    MEDIUM = "medium"    # 구조화 분석, 리포트 생성
    HIGH = "high"        # 다단계 추론, 장문맥 분석, 전략 수립


class Budget(Enum):
    MINIMAL = "minimal"  # 호출당 $0.01 이하
    BALANCED = "balanced" # 호출당 $0.01~$1.00
    UNLIMITED = "unlimited" # 품질 우선, 비용 무시


@dataclass
class ModelConfig:
    name: str
    input_price: float   # $/1M tokens
    output_price: float  # $/1M tokens
    max_context: int     # tokens
    strengths: list[str]


# 2026년 3월 기준 모델 카탈로그
MODELS = {
    "opus": ModelConfig("claude-opus-4-6", 5.00, 25.00, 1_000_000,
                        ["deep_reasoning", "long_context", "code_review"]),
    "sonnet": ModelConfig("claude-sonnet-4-6", 3.00, 15.00, 1_000_000,
                          ["balanced", "analysis", "writing"]),
    "sonnet_long": ModelConfig("claude-sonnet-4-6", 6.00, 22.50, 1_000_000,
                               ["long_context_balanced"]),
    "haiku": ModelConfig("claude-haiku-4-5", 1.00, 5.00, 200_000,
                         ["classification", "extraction", "fast"]),
    "gemini_flash": ModelConfig("gemini-2.5-flash", 0.30, 2.50, 1_000_000,
                                ["multimodal", "fast", "cheap"]),
    "gpt_nano": ModelConfig("gpt-5.4-nano", 0.20, 1.25, 128_000,
                            ["classification", "ultra_cheap"]),
}


def select_model(
    context_tokens: int,
    complexity: Complexity,
    budget: Budget = Budget.BALANCED,
    needs_multimodal: bool = False,
) -> ModelConfig:
    """태스크 특성에 따라 최적 모델을 선택한다."""

    # 멀티모달 필요 시 Gemini 우선
    if needs_multimodal and context_tokens <= 200_000:
        return MODELS["gemini_flash"]

    # 장문맥 (200K 초과)
    if context_tokens > 200_000:
        if budget == Budget.MINIMAL:
            return MODELS["gemini_flash"]
        if complexity == Complexity.HIGH or budget == Budget.UNLIMITED:
            return MODELS["opus"]
        return MODELS["sonnet_long"]

    # 표준 컨텍스트 (200K 이하)
    if complexity == Complexity.LOW:
        if budget == Budget.MINIMAL:
            return MODELS["gpt_nano"]
        return MODELS["haiku"]

    if complexity == Complexity.MEDIUM:
        return MODELS["sonnet"]

    # HIGH complexity, 200K 이하
    if budget == Budget.UNLIMITED:
        return MODELS["opus"]
    return MODELS["sonnet"]


def estimate_cost(
    model: ModelConfig,
    input_tokens: int,
    output_tokens: int = 0,
) -> float:
    """예상 비용을 달러로 계산한다."""
    if output_tokens == 0:
        output_tokens = int(input_tokens * 0.15)  # 기본: input의 15%
    cost = (input_tokens * model.input_price + output_tokens * model.output_price) / 1_000_000
    return round(cost, 4)


if __name__ == "__main__":
    print("=" * 50)
    print("  AI 모델 라우팅 시뮬레이션 (2026년 3월)")
    print("=" * 50)

    # 사례 1: 코드베이스 전체 리뷰
    m1 = select_model(600_000, Complexity.HIGH, Budget.UNLIMITED)
    c1 = estimate_cost(m1, 600_000, 50_000)
    print(f"\n사례 1: 코드리뷰 (600K tokens)")
    print(f"  → {m1.name}, 예상 비용: ${c1}")

    # 사례 2: 주간 경쟁사 분석
    m2 = select_model(100_000, Complexity.MEDIUM)
    c2 = estimate_cost(m2, 100_000, 20_000)
    print(f"\n사례 2: 경쟁사 분석 (100K tokens)")
    print(f"  → {m2.name}, 예상 비용: ${c2}")

    # 사례 3: 피드백 분류 (1건)
    m3 = select_model(2_000, Complexity.LOW, Budget.MINIMAL)
    c3 = estimate_cost(m3, 2_000, 500)
    print(f"\n사례 3: 피드백 분류 (2K tokens)")
    print(f"  → {m3.name}, 예상 비용: ${c3}")

    # 사례 4: 멀티모달 이미지 분석
    m4 = select_model(50_000, Complexity.MEDIUM, needs_multimodal=True)
    c4 = estimate_cost(m4, 50_000, 5_000)
    print(f"\n사례 4: 멀티모달 분석 (50K tokens)")
    print(f"  → {m4.name}, 예상 비용: ${c4}")

    # 월간 비용 추정
    print(f"\n{'=' * 50}")
    print(f"  월간 비용 추정 (주 5일 운영)")
    print(f"{'=' * 50}")
    monthly = (c1 * 4) + (c2 * 4) + (c3 * 500 * 20) + (c4 * 20)
    print(f"  코드리뷰 월 4회:     ${c1 * 4:.2f}")
    print(f"  경쟁사 분석 월 4회:  ${c2 * 4:.2f}")
    print(f"  피드백 분류 월 10K건: ${c3 * 500 * 20:.2f}")
    print(f"  멀티모달 월 20회:    ${c4 * 20:.2f}")
    print(f"  {'─' * 30}")
    print(f"  총 월 예상 비용:     ${monthly:.2f}")
