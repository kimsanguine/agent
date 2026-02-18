# TaskFlow 사용자 페르소나
원문: https://ccforpms.com/company-context/personas

## 한 줄 요약
TaskFlow는 Sarah(Enterprise Admin), Mike(IC Engineer), Alex(Team Lead) 3개 핵심 페르소나를 기준으로 기능 우선순위와 제품 결정을 내린다.

## 핵심 내용
- 문서는 TaskFlow의 주요 사용자 3명을 정의하고, 각자의 목표·불편·필수 기능을 제품 의사결정에 연결한다.
- **Sarah (Enterprise Admin)**: 보안, 컴플라이언스, 비용 통제가 최우선이며 `SSO`, `audit logs`, `advanced permissions`, `bulk user management`, `admin dashboard`를 필수로 본다.
- **Mike (IC Engineer)**: 깊은 집중과 빠른 개발 흐름을 중시하며 `keyboard shortcuts`, 빠른 성능, `GitHub integration`, 풍부한 Markdown, 충분한 task context를 중요하게 본다.
- **Alex (Team Lead)**: 팀 운영 가시성과 예측 가능성을 중시하며 team dashboard, workload view, blocked task visibility, sprint reports, comment summaries를 요구한다.
- 비교 관점에서 Sarah는 구매 최종 결정권자, Mike는 채택에 영향 주는 추천자, Alex는 운영 성공에 영향 주는 내부 영향력자다.
- 기능 의사결정 예시:
  - **Dark mode**: Mike에게 높은 가치, 구현 비용 낮음 → 출시 타당.
  - **Advanced permissions**: 엔터프라이즈 수주에 필요한 차단 해소 기능 → 우선 출시.
- Q1 2025 우선순위: `Mobile app` → `SSO & enterprise features` → activation 개선 → `Dark mode`.

## 실습/실행 단계
1. 기능 아이디어마다 어떤 페르소나의 어떤 핵심 문제를 해결하는지 먼저 명시한다.
2. PRD에 페르소나별 목표, pain point, 성공 지표를 연결해 요구사항을 작성한다.
3. 우선순위 회의에서 수주 필수 기능과 사용자 만족 강화 기능을 분리해 평가한다.
4. 로드맵 항목별로 구매 영향도(결정자/추천자/영향력자)와 사업 효과를 함께 점검한다.
5. 출시 후 보안 사고, shipped features, sprint velocity 같은 페르소나별 지표로 효과를 검증한다.

## 기억할 포인트
- 모든 기능은 최소 한 페르소나의 핵심 니즈와 직접 연결되어야 한다.
- 엔터프라이즈 확장은 보안·권한·감사 기능이 전제 조건이다.
- 개발자 채택은 속도, 맥락, `GitHub` 같은 workflow 연동이 좌우한다.
- 팀 리드용 가시성 기능은 운영 효율과 리스크 대응 속도를 높인다.
- 페르소나는 설명 자료가 아니라 PRD, 우선순위, 로드맵의 실행 기준이다.
