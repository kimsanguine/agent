---
type: guide
status: revise
track: context
---

# Company Context - Product

**빠른 요약**
- Company Context - Product 주제를 빠르게 이해하고 바로 써볼 수 있게 정리한 문서입니다.

**이번 문서 목표**
- 읽고 나면 Company Context - Product 내용을 내 업무 흐름에 맞게 적용할 수 있습니다.

**처음 보는 분 가이드**
- 먼저 `## 1) 목적`과 `## 5) 실습/적용 체크리스트`만 읽고 시작하세요.
- 용어가 낯설면 [사전](./사전.md)을 먼저 확인하세요.

## 1) 목적
- 제품 개요를 기능 설명서가 아니라 **우선순위·투자·실험 판단 문서**로 전환한다.
- 제품 철학(async-first, context-rich, speed-first)을 로드맵 및 KPI에 직접 연결한다.
- PRD 작성 시 “왜 이 기능을 지금 하는가”를 정량/정성으로 증명할 수 있게 한다.

## 2) 원문 핵심 요약 (ccforpms)
- TaskFlow 포지셔닝은 Asana의 범용성과 Linear의 사용감을 결합한 원격 협업 특화 PM SaaS다.
- 핵심 가치 제안은 “업무 단위(task)에 맥락을 결합해 회의 의존도를 낮추는 async 협업”이다.
- 제품 철학 5축은 async-first, context-first, speed-first, opinionated but flexible, design quality다.
- 핵심 기능군은 Task 관리, 프로젝트 뷰, 협업, 알림, 연동, 리포팅/분석으로 구성된다.
- 차별 기능으로 Context cards, AI 댓글 요약, 의사결정 표시, smart batching, two-way sync, 예측 분석이 제시된다.
- 핵심 성과 지표는 WAT(Weekly Active Teams), Activation(45→60), Retention(65→75), Time-to-Value(45분→15분), Viral Coefficient(1.2→1.5+)다.
- 단기 로드맵은 모바일, SSO/권한/audit log, 온보딩 개선이며, 중기 이후 API v2·time tracking·AI 고도화로 확장한다.

## 3) 이든 철학 반영 포인트 (v2.4)
- **P1 실행 우선**: 기능 아이디어는 설명으로 끝내지 않고 “PRD→티켓→실험 계획”까지 한 세트로 산출한다.
- **P4 속도-검증 균형**: 빠른 초안 생성 후 AC/TC/Traceability로 검증하는 2단 구조를 표준으로 삼는다.
- **P8 Connected Hub**: 제품 문서(Claude/Notion)·이슈(Linear)·상태 공유(Slack)·자동 리마인드(n8n)를 하나로 묶는다.
- **FR-016~FR-020 반영**: Level1 즉시 워크플로우, Level2 허브, OMTM 대시보드를 제품 의사결정 루틴에 연결한다.
- **Words-to-Workflow(P9)**: “기능 설명 문장”을 실행 명령(` /prd`, `/status`, `/agent`)으로 바로 변환할 수 있어야 한다.

## 4) 실무 적용 시나리오
### 시나리오: 온보딩 개선 기능 우선순위 결정
1. 제품 지표에서 Activation 45%와 Time-to-Value 45분을 문제 정의로 확정한다.
2. `2.1-advanced-write-prd` 방식으로 온보딩 개선안 3개를 동시에 생성한다.
   - A안: 첫 프로젝트 자동 생성
   - B안: 역할별 템플릿 추천
   - C안: 첫 협업 초대 유도
3. `2.2-advanced-analyze-data` 방식으로 예상 lift를 시나리오(보수/기준/공격)로 계산한다.
4. Linear Epic/Story 생성 시 각 안의 KPI 영향도(Activation, TTV)를 명시한다.
5. 2주 파일럿 후 유지/확대/중단 결정을 KPI 기준으로 확정한다.

### 이번 주 완료형 실행 플랜
- **월~화 실행**: 제품 가치 제안 1문장과 핵심 KPI(Activation/Retention/TTV/Viral) 기준선을 최신화해 의사결정 출발점을 고정한다.
- **수~목 실행**: 기능 후보 2~3개를 동일 포맷(가설/임팩트/비용/리스크)으로 비교하고 파일럿 우선순위를 확정한다.
- **금요일 검증**: 파일럿 대상 기능의 수용 기준과 측정 방식이 준비되었는지 리뷰하고 출시/보류를 결정한다.
- **Done 기준**: KPI-기능 매핑, 우선순위 결정 근거, 파일럿 측정 계획이 문서에 연결되어 즉시 실행 가능한 상태다.
- **리스크/완화**: 기능 선호 논쟁이 길어지면 사전 정의한 KPI 가중치표로 판단하고, 동점 항목은 1주 파일럿으로 실측 후 결정한다.

## 5) 실습/적용 체크리스트
- [ ] 제품 가치 제안 1문장과 차별화 포인트 3개를 최신화했다.
- [ ] North Star + 보조지표(Activation/Retention/TTV/Viral)를 한 표로 정리했다.
- [ ] 단기 로드맵 항목(모바일/Enterprise/온보딩)의 성공 지표를 각각 정의했다.
- [ ] 기능 후보별 예상 임팩트와 리스크를 동일 포맷으로 비교했다.
- [ ] PRD/티켓/실험 결과 링크를 문서에 역추적 가능하게 연결했다.

## 6) 산출물
- 제품 포지셔닝 캔버스(문제/가치/차별/타깃)
- KPI-기능 매핑 시트(기능 ↔ 지표 ↔ 목표)
- 기능 우선순위 의사결정 로그(채택/보류/폐기 사유)
- 파일럿 실행 브리프(대상 사용자/기간/측정 KPI/중단 조건)
