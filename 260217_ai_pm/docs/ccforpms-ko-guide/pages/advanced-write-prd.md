# 2.1: PRD 작성하기
원문: https://ccforpms.com/advanced/write-prd

## 한 줄 요약
AI를 PRD 대필 도구가 아니라 사고 파트너로 활용해, 더 빠르고 더 탄탄한 초안을 만드는 방법을 다룹니다.

## 핵심 내용
- 목표는 PRD를 혼자 처음부터 쓰기보다, AI와 함께 사고를 구조화해 초안 품질을 높이는 것입니다.
- 핵심은 4가지입니다: `@-mentions`로 전체 맥락 제공, Socratic questioning으로 논리 점검, 전략안 다중 생성, Sub-agents 사전 리뷰.
- 맥락 입력 시 회사 문서, 사용자 리서치, PRD 템플릿, 방법론 문서를 함께 주면 결과가 구체화됩니다.
- Socratic questioning은 문제 정의, 해법 타당성, 성공 지표, 제약, 전략 적합성 중심으로 3~5개 질문을 깊게 다루는 것이 효과적입니다.
- 동일 기능도 여러 접근안으로 나눠 비교하면, 첫 아이디어 고착을 줄이고 더 나은 선택이 가능합니다.
- Sub-agents는 Engineer(기술/리스크), Executive(사업성/우선순위), User Researcher(사용자 적합성) 관점을 제공합니다.
- 문제 해결 팁도 제시됩니다: 결과가 generic하면 컨텍스트를 늘리고, 리뷰가 얕으면 agent 역할과 검토 범위를 더 구체화합니다.

## 실습/실행 단계
1. Claude Code에서 `/start-2-1` 실행.
2. 기능 주제를 정하고 관련 파일을 `@company-context.md`, `@user-research/...`, `@prd-template.md`, `@methods/socratic-questioning.md` 형태로 연결.
3. Socratic questioning 기반 핵심 질문을 받아 문제·해법·지표·제약·타이밍을 명확히 정리.
4. agents로 2~3개 전략안을 parallel로 생성하고 비교해 방향 선택.
5. 선택한 PRD 초안을 `@.claude/agents/engineer.md`, `@.claude/agents/executive.md`, `@.claude/agents/user-researcher.md`로 리뷰.
6. 피드백 반영 후 버전명을 체계화해 저장하고 팀 공유.
7. 다음 단계는 `/start-2-2`로 Module 2.2 진행.

## 기억할 포인트
- 최종 판단은 PM이 해야 하며, AI는 판단을 돕는 보조자입니다.
- 항상 첫 초안을 그대로 쓰지 말고 대안 비교를 거쳐야 품질이 올라갑니다.
- high-stakes 문서일수록 다중 관점 리뷰의 효과가 큽니다.
- 속도와 추적성은 parallel 작업, 명확한 파일명, git 기록으로 확보할 수 있습니다.
