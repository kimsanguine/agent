---
type: guide
status: revise
track: context
---

# Company Context - Personas

**빠른 요약**
- Company Context - Personas 주제를 빠르게 이해하고 바로 써볼 수 있게 정리한 문서입니다.

**이번 문서 목표**
- 읽고 나면 Company Context - Personas 내용을 내 업무 흐름에 맞게 적용할 수 있습니다.

**처음 보는 분 가이드**
- 먼저 `## 1) 목적`과 `## 5) 실습/적용 체크리스트`만 읽고 시작하세요.
- 용어가 낯설면 [사전](./사전.md)을 먼저 확인하세요.

## 1) 목적
- 페르소나를 설명 자료가 아니라 **기능 우선순위와 출시 판단의 운영 기준**으로 사용한다.
- 구매 결정권자/추천자/운영 영향자 관점을 분리해 전략 충돌을 줄인다.
- Junior/Senior/Leader PM이 동일한 사용자 언어로 PRD를 작성하도록 표준화한다.

## 2) 원문 핵심 요약 (ccforpms)
- 원문은 TaskFlow 핵심 사용자 3명(Sarah, Mike, Alex)을 기준으로 제품 결정을 내리도록 설계한다.
- Sarah(Enterprise Admin)는 보안·컴플라이언스·비용 통제를 최우선으로 보고 SSO, audit log, advanced permissions를 필수로 요구한다.
- Mike(IC Engineer)는 빠른 UX, keyboard shortcut, GitHub 연동, rich markdown, 충분한 task context를 중시한다.
- Alex(Team Lead)는 팀 가시성, blocked issue 조기 감지, workload 균형, sprint report, 댓글 요약을 요구한다.
- 영향력 관점에서 Sarah는 구매 결정권, Mike는 채택 추천권, Alex는 운영 성공 영향력이 크다.
- 기능 예시에서 Dark mode는 Mike 가치가 높고 구현비용이 낮아 빠른 출시 대상으로 평가된다.
- Q1 우선순위는 Mobile → SSO & Enterprise features → Activation 개선 → Dark mode로 제시된다.

## 3) 이든 철학 반영 포인트 (v2.4)
- **P3 PM 오케스트레이션**: PM은 페르소나별 니즈를 한 문서에 병합하지 않고, 충돌 지점을 분리해 의사결정을 설계한다.
- **P7 Automation vs Augmentation**: 인터뷰 요약/태깅은 자동화하고, 우선순위 충돌 조정은 PM이 직접 수행한다.
- **FR-021 정합**: 페르소나-경쟁-가설을 5축(Product/Pricing/Positioning/Performance/People) 분석과 연결한다.
- **Junior-first + 확장 구조**: Junior는 페르소나 카드 템플릿부터 시작, Senior/Leader는 조직 단위 우선순위 정책으로 확장한다.
- **Level1~2 연계**: 페르소나 기반 PRD를 Notion/Linear/Slack으로 동일 포맷 게시해 의사결정 손실을 줄인다.

## 4) 실무 적용 시나리오
### 시나리오: Enterprise 기능과 Developer UX 기능 충돌 조정
1. 기능 후보를 Sarah/Mike/Alex 영향도로 점수화한다.
   - 예: SSO(5/1/3), Dark mode(1/5/2), Team workload alert(2/2/5)
2. 매출 영향(수주), 채택 영향(사용), 운영 영향(팀 효율)을 각각 분리해서 평가한다.
3. 분기 목표가 Enterprise 확장일 경우 Sarah 관련 블로커(SSO/권한/audit)를 1차 우선순위로 고정한다.
4. 단, Mike 채택 리스크 완화를 위해 저비용 고효율 항목(Dark mode, shortcut 개선)을 병행 배치한다.
5. 출시 후 페르소나별 KPI(수주율/활성률/팀 리드 만족도)를 따로 측정해 재조정한다.

### 이번 주 완료형 실행 플랜
- **월~화 실행**: Sarah/Mike/Alex 페르소나 카드의 목표·고통·필수 기능을 최신화하고 인터뷰/고객 피드백을 재분류한다.
- **수~목 실행**: 이번 주 백로그를 페르소나 영향도 점수로 재정렬하고 충돌 항목의 우선순위 규칙을 문서로 확정한다.
- **금요일 검증**: 페르소나별 KPI 추적 가능 여부를 점검하고, 점수 대비 실제 효과를 리뷰해 다음 주 조정안을 확정한다.
- **Done 기준**: 기능-페르소나 매핑표와 충돌 조정 로그가 최신 상태이며, 각 페르소나별 성공 지표가 측정 가능한 데이터 소스로 연결되어 있다.
- **리스크/완화**: 특정 페르소나 요구가 과대표집되면 최근 4주 데이터 기준 샘플 수를 공개하고 가중치 규칙으로 균형을 맞춘다.

## 5) 실습/적용 체크리스트
- [ ] Sarah/Mike/Alex 각 페르소나의 핵심 목표/고통/성공지표를 최신화했다.
- [ ] 주요 백로그 항목을 페르소나별로 1:1 매핑했다.
- [ ] 충돌 항목(예: 보안 vs 속도)에 대한 우선순위 규칙을 정의했다.
- [ ] 인터뷰/피드백 데이터를 페르소나 태그로 분류해 저장했다.
- [ ] 분기 회고에서 페르소나별 KPI를 분리 보고했다.

## 6) 산출물
- 페르소나 운영 카드(목표/리스크/필수 기능/KPI)
- 기능-페르소나 우선순위 매트릭스
- 충돌 조정 결정 로그(결정 기준과 보류 사유 포함)
- 페르소나별 주간 KPI 리포트(영향 기능/변화 수치/다음 액션)
