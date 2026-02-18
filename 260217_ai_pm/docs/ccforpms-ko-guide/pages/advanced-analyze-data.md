# 2.2: 데이터 분석
원문: https://ccforpms.com/advanced/analyze-data

## 한 줄 요약
Claude Code를 활용해 PM의 데이터 업무를 Discovery, Impact Estimation, Experiment Analysis의 3단계로 수행하는 방법을 설명한다.

## 핵심 내용
- 이 모듈은 기능 개발 전후 의사결정을 데이터로 연결하는 실무 흐름을 다룬다.
- 3단계 산출물:
  - Discovery: `problem-analysis.md`
  - Impact Estimation: `impact-estimate.md`, `roi-scenarios.md`
  - Experiment Analysis: `experiment-readout.md`
- Impact 계산 프레임워크:
  - `Impact = Users Affected × Current Action Rate × Expected Lift × Value per Action`
  - rollout 비율, 현재 전환율, 보수적 lift, LTV 기반 가치까지 함께 반영해야 한다.
- 추정은 단일값이 아니라 pessimistic, realistic, optimistic 3개 시나리오로 제시한다.
- 실험 평가는 Topline만으로 끝내지 않고, 통계 유의성(`p-value`, `95% CI`), 세그먼트, 품질 지표(retention), 선행 지표(template usage, invite rate)까지 본다.
- Claude Code는 `CSV/TSV/JSON` 직접 분석, 대용량 처리, 통계 계산, 정량+정성 교차분석에 유용하다.
- 사례 핵심: 전체 평균이 약해 보여도 타깃 세그먼트에서 큰 효과가 있으면 부분 rollout 전략이 가능하다.

## 실습/실행 단계
1. Claude Code에서 `/start-2-2`로 모듈을 시작한다.
2. `activation-funnel-q4.csv` 등 퍼널 데이터를 읽어 drop-off 구간을 찾고, 설문 데이터와 연결해 `problem-analysis.md`를 작성한다.
3. 기준 전환율과 예상 lift를 바탕으로 ROI 모델을 만들고, 3개 시나리오를 `impact-estimate.md`, `roi-scenarios.md`에 정리한다.
4. `onboarding-experiment-results.csv`로 cohort 비교, 유의성 검정, `company_size` 세그먼트, week 1 retention, leading indicators를 분석한다.
5. 결과를 `experiment-readout.md`에 정리하고 ship, iterate, kill 및 segment별 출시 범위를 제안한다.

## 기억할 포인트
- Topline만 보면 중요한 승패가 가려질 수 있으니 세그먼트 분석이 필수다.
- activation 수치만 보지 말고 retention 같은 품질 지표를 함께 확인한다.
- lift는 보수적으로 추정하고 항상 범위와 시나리오로 제시한다.
- adoption 100%를 가정하지 말고 실제 rollout 조건을 반영한다.
- 반복되는 분석은 프롬프트와 템플릿으로 표준화해 속도와 일관성을 높인다.
