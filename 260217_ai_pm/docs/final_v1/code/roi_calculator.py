"""
roi_calculator.py — 1M Context ROI 분석 도구
PM이 "이 태스크에 얼마를 써야 하는가"를 데이터로 판단한다.

사용법:
    python roi_calculator.py

Part 7.4 1M Context 비용 전략 실습 코드
"""
from dataclasses import dataclass


@dataclass
class CostSimulation:
    """단일 호출의 비용-품질 시뮬레이션"""
    model: str
    input_tokens: int
    output_tokens: int
    input_rate: float      # $/1M tokens
    output_rate: float     # $/1M tokens
    quality_score: float   # 0~100

    @property
    def cost(self) -> float:
        return round(
            (self.input_tokens * self.input_rate
             + self.output_tokens * self.output_rate) / 1_000_000, 4
        )

    @property
    def cost_per_quality(self) -> float:
        """품질 1점당 비용"""
        if self.quality_score == 0:
            return float("inf")
        return round(self.cost / self.quality_score, 6)


def compare_strategies(
    input_tokens: int,
    output_tokens: int,
    quality_scores: dict[str, float],
) -> None:
    """여러 모델의 비용-품질을 비교 출력한다."""

    configs = {
        "Haiku 4.5":       (1.00, 5.00),
        "Sonnet 4.6":      (3.00 if input_tokens <= 200_000 else 6.00,
                            15.00 if input_tokens <= 200_000 else 22.50),
        "Opus 4.6":        (5.00, 25.00),
        "Gemini 2.5 Flash": (0.30, 2.50),
        "Gemini 2.5 Pro":  (1.25 if input_tokens <= 200_000 else 2.50,
                            10.00 if input_tokens <= 200_000 else 20.00),
    }

    sims = []
    for model, (i_rate, o_rate) in configs.items():
        q = quality_scores.get(model, 70)
        sim = CostSimulation(model, input_tokens, output_tokens, i_rate, o_rate, q)
        sims.append(sim)

    # 비용 효율 순 정렬 (quality > 0인 것만)
    valid_sims = [s for s in sims if s.quality_score > 0]
    valid_sims.sort(key=lambda s: s.cost_per_quality)

    print(f"\n{'='*70}")
    print(f"  Context: {input_tokens:,} tokens | Output: {output_tokens:,} tokens")
    print(f"{'='*70}")
    print(f"  {'모델':<20} {'비용':>8} {'품질':>6} {'$/점':>10}  {'판정'}")
    print(f"  {'-'*60}")

    for i, s in enumerate(valid_sims):
        badge = "** BEST" if i == 0 else ""
        print(f"  {s.model:<20} ${s.cost:>6.4f} {s.quality_score:>5.0f}  "
              f"${s.cost_per_quality:>8.6f}  {badge}")

    # 불가 모델 표시
    invalid_sims = [s for s in sims if s.quality_score == 0]
    for s in invalid_sims:
        print(f"  {s.model:<20}  --- 사용 불가 (context 초과) ---")

    # ROI 비교: 최저가 대비
    if len(valid_sims) >= 2:
        cheapest = min(valid_sims, key=lambda s: s.cost)
        best_quality = max(valid_sims, key=lambda s: s.quality_score)

        if cheapest.model != best_quality.model:
            cost_increase = ((best_quality.cost - cheapest.cost) / cheapest.cost) * 100
            quality_increase = ((best_quality.quality_score - cheapest.quality_score)
                               / cheapest.quality_score) * 100
            roi = quality_increase / cost_increase if cost_increase > 0 else float("inf")
            print(f"\n  ROI 분석: {cheapest.model} -> {best_quality.model}")
            print(f"  비용 +{cost_increase:.0f}% | 품질 +{quality_increase:.0f}% | ROI = {roi:.2f}")


def monthly_budget_optimizer(
    monthly_budget: float,
    tasks: list[dict],
) -> None:
    """월 예산 제약 하에서 태스크별 최적 모델 배합을 추천한다."""

    print(f"\n{'='*70}")
    print(f"  월 예산 최적화: ${monthly_budget:.0f}/월")
    print(f"{'='*70}")

    total_cost = 0.0
    for task in tasks:
        name = task["name"]
        tokens = task["input_tokens"]
        output = task["output_tokens"]
        freq = task["monthly_frequency"]

        # 가장 저렴한 모델부터 시도
        candidates = [
            ("Gemini Flash", 0.30, 2.50, 1_000_000),
            ("Haiku 4.5",    1.00, 5.00, 200_000),
            ("Sonnet 4.6",   3.00 if tokens <= 200_000 else 6.00,
                             15.00 if tokens <= 200_000 else 22.50, 1_000_000),
            ("Opus 4.6",     5.00, 25.00, 1_000_000),
        ]

        for model_name, i_rate, o_rate, max_ctx in candidates:
            if tokens > max_ctx:
                continue
            per_call = (tokens * i_rate + output * o_rate) / 1_000_000
            monthly = per_call * freq
            if total_cost + monthly <= monthly_budget:
                total_cost += monthly
                print(f"  {name:<30} -> {model_name:<15} "
                      f"${per_call:.4f}/회 x {freq}회 = ${monthly:.2f}/월")
                break
        else:
            print(f"  {name:<30} -> 예산 초과 - 스킵")

    print(f"\n  총 월 비용: ${total_cost:.2f} / 예산 ${monthly_budget:.0f}")
    print(f"  잔여 예산:  ${monthly_budget - total_cost:.2f}")


if __name__ == "__main__":
    # 시뮬레이션 1: PRD 분석 (10K)
    compare_strategies(10_000, 2_000, {
        "Haiku 4.5": 72, "Sonnet 4.6": 88, "Opus 4.6": 95,
        "Gemini 2.5 Flash": 65, "Gemini 2.5 Pro": 85,
    })

    # 시뮬레이션 2: 경쟁사 분석 (200K)
    compare_strategies(200_000, 10_000, {
        "Haiku 4.5": 60, "Sonnet 4.6": 84, "Opus 4.6": 92,
        "Gemini 2.5 Flash": 55, "Gemini 2.5 Pro": 80,
    })

    # 시뮬레이션 3: 코드리뷰 (600K)
    compare_strategies(600_000, 50_000, {
        "Haiku 4.5": 0,  # 200K 초과 불가
        "Sonnet 4.6": 65, "Opus 4.6": 90,
        "Gemini 2.5 Flash": 50, "Gemini 2.5 Pro": 75,
    })

    # 월 예산 최적화 예시
    monthly_budget_optimizer(100.0, [
        {"name": "피드백 분류 (500건/일)", "input_tokens": 2_000, "output_tokens": 500, "monthly_frequency": 10_000},
        {"name": "주간 경쟁사 분석",       "input_tokens": 100_000, "output_tokens": 20_000, "monthly_frequency": 4},
        {"name": "PRD 리뷰",              "input_tokens": 10_000, "output_tokens": 5_000, "monthly_frequency": 8},
        {"name": "월간 코드리뷰",          "input_tokens": 600_000, "output_tokens": 50_000, "monthly_frequency": 2},
    ])
