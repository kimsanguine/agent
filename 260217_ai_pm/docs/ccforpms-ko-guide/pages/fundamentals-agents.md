# 1.4: 병렬 작업을 위한 Agents
원문: https://ccforpms.com/fundamentals/agents

## 한 줄 요약
`Agents`는 Claude를 여러 독립 작업 단위로 동시에 돌려, PM의 반복·대량 업무 시간을 크게 줄이는 방식이다.

## 핵심 내용
- `Agents`는 서로 상태를 공유하거나 대화하지 않는 독립 Claude 인스턴스이며, 각자 파일/툴 작업을 수행한다.
- 적합한 상황: 대량 문서 처리, 경쟁사 다건 리서치, 소스별 병렬 분석, 촉박한 마감 업무.
- 비적합한 상황: 단일 작업, 선행 결과가 필요한 순차 작업, 매우 짧은 소규모 작업.
- 프롬프트 방식은 3가지가 핵심이다:
  - agent 수를 직접 지정하는 명시형
  - 병렬 의도만 주고 수를 맡기는 위임형
  - 데이터 소스별 전문 역할을 나누는 분업형
- 대표 오케스트레이션 패턴: fan-out, specialized roles, parallel research, batch document generation, validation pipeline.
- 실무 완성도를 위해서는 각 agent 결과를 최종 문서로 `synthesis`하라는 지시가 필수다.
- 다음 모듈은 임시 병렬용 `ad-hoc agents`에서 재사용형 `custom sub-agents`로 확장한다.

## 실습/실행 단계
1. Claude Code에서 `/start-1-4`를 실행한다.
2. 병렬 대상(예: `/meetings`, `/interviews`, `@survey-results.csv`)과 추출 항목을 정의한다.
3. agent 수를 직접 정하거나 병렬 처리 의도만 전달해 자동 분배를 유도한다.
4. 출력 형식 템플릿(섹션 구조)을 지정해 결과 일관성을 맞춘다.
5. 마지막에 통합 산출물 파일(예: `@weekly-summary.md`)로 결과를 합치라고 명확히 지시한다.
6. 실패 시 파일 경로, 지시 명확성, 오류 메시지를 확인하고 해당 agent만 재실행한다.

## 기억할 포인트
- 병렬화 가능한 문제인지 먼저 판단하면 agent 효과가 극대화된다.
- agent 실행 자체보다 마지막 통합(`synthesis`) 설계가 결과 품질을 좌우한다.
- 작은 작업에 과도한 agent 사용은 오히려 비효율이다.
- 1.4의 초점은 “임시 병렬 처리”, 1.5의 초점은 “상시 전문 팀 구성”이다.
