# TaskFlow 제품 개요
원문: https://ccforpms.com/company-context/product

## 한 줄 요약
TaskFlow는 원격팀을 위한 async-first 프로젝트 관리 SaaS로, 맥락 중심 협업과 빠른 실행을 통해 Activation·Retention 성장을 노린다.

## 핵심 내용
- 제품 포지셔닝: Asana의 기능 범위와 Linear의 사용감을 결합한 원격 협업 특화 도구.
- 핵심 가치: 흩어진 업무를 통합하고, 각 Task에 배경 맥락을 붙여 회의 의존도를 낮춤.
- 제품 철학 5가지: async-first, 맥락 우선, 속도 우선, 강한 기본값+유연성, 디자인 품질.
- 주요 기능 축: Task 관리, 프로젝트/뷰, 협업, 알림, 연동, 리포팅/분석.
- 차별화: "Context cards", AI 기반 댓글 요약, 의사결정 표시, smart batching, two-way sync, 예측 분석.
- 주요 Persona:
  - Sarah(Enterprise Admin): SSO, RBAC, audit logs, 조직 단위 통제/보안 중시
  - Mike(IC Engineer): Keyboard shortcuts, GitHub 연동, 빠른 UI, 명확한 우선순위 선호
  - Alex(Team Lead): 팀 가시성, blocked 이슈 조기 발견, workload 균형 중시
- 로드맵: 현재 코어 기능 제공 → 단기(모바일 앱, SSO, 권한, 감사 로그, 온보딩 개선) → 중기(Dark mode, time tracking, API v2) → 탐색(AI, OKRs 등).
- 지표 체계:
  - North Star: "Weekly Active Teams" (850 → 1,200 목표)
  - Activation 45%→60%, Retention 65%→75%, Time to Value 45분→15분, Viral Coefficient 1.2→1.5+.
- 가격 전략: Free / Pro($12/user/month) / Enterprise(Custom)로 구성, 가격 경쟁력 대비 가치 우위 지향.
- 기술 스택: React + TypeScript, Node.js + Express, PostgreSQL, Redis, AWS, React Native.

## 실습/실행 단계
1. North Star와 보조 지표(Activation, Retention, Time to Value, Viral Coefficient)의 현재값/목표값을 한 장으로 정리한다.
2. Persona별 pain point를 기능 백로그와 연결해 우선순위를 재배치한다.
3. Onboarding Redesign PRD에 Activation 45%→60% 가설, 실험 설계, 성공 기준을 명시한다.
4. Dark Mode는 개발 착수 전 KPI(채택률, 만족도, 이탈 영향)를 확정한다.
5. Template Library는 리서치 질문과 검증 지표(Time to Value 단축)를 먼저 설계한다.
6. 문서 운영 체계를 고정한다: Notion(PRD), Figma(디자인), GitHub(기술 스펙), TaskFlow(로드맵 추적).

## 기억할 포인트
- 핵심 경쟁력은 기능 수보다 “맥락이 살아있는 async 협업 경험”이다.
- 성장의 레버는 신규 유입보다 Activation·Time to Value 개선에 더 가깝다.
- Enterprise 확장은 SSO·권한·감사 로그 같은 신뢰 기능이 선행 조건이다.
- 가격 경쟁력은 진입점이고, 장기 차별화는 속도·사용성·협업 품질이다.
