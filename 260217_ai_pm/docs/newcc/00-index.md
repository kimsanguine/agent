---
type: guide
status: new
track: appendix
---

# NewCC 문서 인덱스 (실전 운영판)

**빠른 요약**
- 전체 문서 구성과 상태를 한 번에 확인하는 운영 인덱스입니다.

**이번 문서 목표**
- 문서 우선순위와 커버리지 현황을 보고 다음 작업 순서를 정할 수 있습니다.

**처음 보는 분 가이드**
- 먼저 `## 1) 목적`과 `## 5) 실습/적용 체크리스트`만 읽고 시작하세요.
- 용어가 낯설면 [사전](./사전.md)을 먼저 확인하세요.

## 1) 목적
- `docs/newcc` 전체 43개 문서를 **운영 가능한 구조**로 관리하기 위한 기준 인덱스를 제공한다.
- 원문 34개 페이지(`docs/ccforpms-ko-guide/pages`) 대비 반영 상태를 한 번에 점검한다.
- `new / revise / drop-candidate` 상태 기반으로 1차/2차 개편 우선순위를 고정한다.

## 2) 원문 핵심 요약 (ccforpms)
- 원문 코스는 단순 도구 소개가 아니라, **모듈별 산출물**(문서·티켓·자동화 로그) 중심으로 설계되어 있다.
- 0.x~2.x는 설치/기초/고급 작성·분석 패턴을 통해 PM의 실행 기본기를 만든다.
- 3.x~4.x는 생성형 작업(비주얼)과 Vibe Coding 루프로 결과물을 실제 릴리스 가능한 형태까지 연결한다.
- Company Context 문서군은 모든 실습이 회사 목표/KPI와 맞물리도록 기준 맥락을 제공한다.
- 따라서 newcc 인덱스의 핵심 역할은 “목록”이 아니라, 원문 34개를 실행 체계로 재배열한 운영 지도다.

### Claude Code 핵심 기능 연결 (official 반영)
- Claude Code 공식 Overview 기준으로, 인덱스 문서는 단순 목록보다 **실행 가능한 작업 단위**(파일 수정, 검토, 검증)로 연결될 때 가치가 커진다.
- PM 관점에서는 `00-index.md`를 주간 오퍼레이션의 단일 진입점으로 두고, Claude Code에서 섹션별 문서 점검 작업을 병렬로 위임해 커버리지 확인 속도를 높일 수 있다.
- Tutorials Hub의 시작 가이드는 “질문→산출물” 전환을 강조하므로, 인덱스에서도 상태(`new/revise/drop-candidate`)를 곧바로 실행 액션으로 맵핑하는 설계가 필요하다.
- Opus 4.6 활용 튜토리얼의 핵심처럼, 복합 작업(coverage 점검, 우선순위 재정렬)은 단계별 계획 후 실행으로 나누면 검증 누락이 줄어든다.
- Cowork/Chrome 튜토리얼 관점에서 보면 웹 리서치·문서 탐색 결과를 인덱스 근거 표로 환원하는 운영이 가능해져, 근거 추적성과 팀 공유성이 높아진다.
- 금융 서비스 튜토리얼의 컴플라이언스 관점을 반영해, 문서 변경 시 근거 링크·승인 로그·검증 체크를 함께 남기면 감사 가능한 PM 운영 체계를 만들 수 있다.

### ccforpms 단계별 실행 예시 (실전 재현)
1. 월요일 09:00, 문서 오너가 원문 34개 페이지 목록과 `docs/newcc` 43개 목록을 나란히 열고 매핑 누락 여부를 1차 확인한다.
2. 월요일 11:00, 각 문서에 `new/revise/drop-candidate` 상태를 임시 태깅하고 근거(중복률, 참조도, 실행 기여도)를 한 줄씩 기록한다.
3. 화요일 14:00, 섹션 오너가 자신에게 할당된 문서를 실제로 열어 `## 1)~## 6)` 구조 준수 여부와 링크 무결성을 점검한다.
4. 수요일 10:00, QA 에디터가 Coverage 매트릭스를 기준으로 “원문 있음/newcc 없음” 케이스를 재검색해 누락 0을 재확인한다.
5. 수요일 16:00, 편집 리드가 drop-candidate 4개에 D-01~D-03 정량 근거를 채우고, 삭제가 아닌 통합이 더 유리한지 검토 메모를 작성한다.
6. 목요일 15:00, 리뷰어가 1차 개편 문서 15개를 표본 검수하여 용어 일관성(OMTM, AC/TC, FR/NFR)과 실행 문장 품질을 확인한다.
7. 금요일 11:00, 운영 리드가 상태 요약표/coverage 통계/우선순위 보드가 서로 같은 수치를 가리키는지 교차 검증한다.
8. 금요일 17:00, 릴리스 게이트 미팅에서 “누락 0, 링크 오류 0, 상태 불일치 0”을 확인한 뒤 차주 백로그와 에스컬레이션 항목을 확정한다.

### 43개 전체 파일 목록 (섹션별, 누락 없음)

### A. Entry / Getting Started
1. `00-index.md` (new)
2. `home.md` (revise)
3. `0.0-getting-started-introduction.md` (revise)
4. `0.1-getting-started-installation.md` (revise)
5. `0.2-getting-started-start-and-clone.md` (revise)

### B. Fundamentals (1.x)
6. `1.1-fundamentals-welcome.md` (revise)
7. `1.2-fundamentals-visualizing-files.md` (revise)
8. `1.3-fundamentals-first-tasks.md` (revise)
9. `1.4-fundamentals-agents.md` (revise)
10. `1.5-fundamentals-custom-subagents.md` (revise)
11. `1.6-fundamentals-project-memory.md` (revise)
12. `1.7-fundamentals-claude-code-navigation.md` (revise)

### C. Advanced (2.x)
13. `2.1-advanced-write-prd.md` (revise)
14. `2.2-advanced-analyze-data.md` (revise)
15. `2.3-advanced-product-strategy.md` (revise)

### D. Nano Banana (3.x)
16. `3.0-nano-banana-setup.md` (revise)
17. `3.1.1-nano-banana-welcome-first-generation.md` (revise)
18. `3.1.2-nano-banana-understanding-basics.md` (revise)
19. `3.1.3-nano-banana-consistency-style.md` (drop-candidate)
20. `3.1.4-nano-banana-style-database.md` (drop-candidate)
21. `3.2.1-nano-banana-users-product-visuals.md` (revise)
22. `3.2.2-nano-banana-strategy-architecture-visuals.md` (revise)
23. `3.2.3-nano-banana-marketing-launch-assets.md` (revise)

### E. Vibe Coding (4.x)
24. `4.0-vibe-coding.md` (revise)
25. `4.1-vibe-coding-setup.md` (revise)
26. `4.2-vibe-coding-plan.md` (revise)
27. `4.3-vibe-coding-build-iterate.md` (revise)
28. `4.4-vibe-coding-github.md` (revise)
29. `4.5-vibe-coding-go-live.md` (revise)

### F. Company Context
30. `company-context-overview.md` (revise)
31. `company-context-product.md` (revise)
32. `company-context-personas.md` (revise)
33. `company-context-competitive.md` (revise)

### G. Appendix
34. `cowork.md` (drop-candidate)
35. `search.md` (drop-candidate)
36. `사전.md` (new)

### H. Ecosystem (5.x)
37. `5.0-ecosystem-overview.md` (new)
38. `5.1-level1-claude-ai-mcp-quickwins.md` (new)
39. `5.2-level2-claude-code-hub.md` (new)
40. `5.3-level3-n8n-automation.md` (new)
41. `5.4-level4-vibe-agenting.md` (new)
42. `5.5-omtm-kpi-ops-dashboard.md` (new)
43. `5.6-integrated-workflow-playbook.md` (new)

## 3) 이든 철학 반영 포인트 (v2.4)
- **P2 맥락 우선**: 인덱스가 Company Context/실습 트랙/산출물 연결을 한눈에 보이게 해 문서 사용 맥락 누락을 줄인다.
- **P3 PM 오케스트레이션**: 43개 문서를 역할별(기초/고급/생성/운영)로 묶어 PM이 실행 순서를 설계하기 쉽게 만든다.
- **P4 속도-검증 균형**: `new/revise/drop-candidate` 상태를 명시해 빠른 개편과 품질 게이트를 동시에 운영한다.
- **P8 Connected Hub + Level1~4**: Level1(Quick Win)→Level2(Code Hub)→Level3(n8n)→Level4(Agenting) 경로가 인덱스에서 즉시 탐색 가능해야 한다.
- **P9 Words-to-Workflow**: 문서 제목/상태/체크리스트를 실행 지시문으로 재사용 가능한 구조로 유지한다.

### 상태 요약 (43개 기준)

| 상태 | 개수 | 비율 |
|---|---:|---:|
| new | 9 | 20.9% |
| revise | 30 | 69.8% |
| drop-candidate | 4 | 9.3% |
| 합계 | 43 | 100% |

## 4) 실무 적용 시나리오
### 실무 적용 시나리오 (초보자용 상세 실행안)

### PM Use Case 확장 (Claude Code 기능 매핑)
| PM 상황 | Claude Code 기능 | 실행 예시 | 검증 포인트 |
|---|---|---|---|
| 원문↔개편 문서 커버리지 점검 | 파일 검색/내용 검색, 다중 파일 검토 | `docs/ccforpms-ko-guide/pages`와 `docs/newcc`를 대조해 누락 여부를 일괄 확인 | 누락 0건, 매핑 근거 링크 존재 |
| drop-candidate 판단 근거 수집 | 병렬 분석, 구조화 요약 | 중복률/참조도/산출물 기여도를 문서별로 집계해 D-01~D-05 표 갱신 | 근거 3개 이상/문서, 판정 일관성 |
| 1차 개편 우선순위 재조정 | 계획 기반 실행(Plan→실행) | 금주 리소스 기준으로 15개 문서 우선순위를 재배열하고 Owner 지정 | Owner 미지정 0건, 금주 완료 가능성 |
| 릴리스 게이트 사전 검증 | 체크리스트 기반 검수 | 링크 무결성/수치 일치/상태 동기화 항목을 게이트 전에 자동 점검 | broken link 0, 수치 불일치 0 |
| 주간 운영 리포트 생성 | 템플릿화된 산출물 작성 | 인덱스 상태표 기반으로 주간 리뷰 노트와 차주 백로그 초안을 생성 | OMTM/차단 이슈/다음 액션 포함 |

#### 월~금 운영 오케스트레이션 실행표
| 요일 | 핵심 작업 | 1차 Owner | 2차 검수/승인 | 게이트(통과 기준) | 보고 리듬 | 에스컬레이션 경로 |
|---|---|---|---|---|---|---|
| 월 | 43개 문서 상태 동기화(`new/revise/drop-candidate`) | 섹션 오너 | 편집 리드 | 상태 누락 0건, 근거 메모 100% | 12:00 중간 공유, 18:00 EOD | 섹션 오너→편집 리드→운영 리드 |
| 화 | 34:34 매핑 검증 + 내부 링크 무결성 검사 | QA 에디터 | 편집 리드 | broken link 0건, 매핑 불일치 0건 | 17:00 검증 리포트 | QA→운영 리드→의사결정자 |
| 수 | drop-candidate 4건 D-01~D-03 정량 근거 작성 | 편집 리드 | 리뷰어 1명 | 정량 근거 3개/문서 충족 | 16:00 의사결정 프리리드 | 편집 리드→문서 오너→스폰서 |
| 목 | 1차 개편 15개 문서 품질 통합 점검 | 문서 오너 | QA 에디터 | 용어 일관성 95%+, 실행 문장 누락 0건 | 11:00/18:00 2회 | 문서 오너→QA→운영 리드 |
| 금 | 릴리스 게이트 + 차주 백로그 확정 | 운영 리드 | 전원 | 누락 0, 수치 불일치 0, 미해결 blocker 0 | 15:00 게이트 리뷰 | 운영 리드→팀 리드→최종 승인자 |

#### 게이트 상세 정의 (실제 운영 기준)
- **Gate A (월):** 모든 문서에 상태 태그와 근거 문장이 1:1로 존재해야 한다.
- **Gate B (화):** Coverage 표, 상태표, 실제 파일 목록의 카운트가 동일해야 한다.
- **Gate C (수):** drop-candidate는 최소 3개 정량 근거(D-01~D-03)가 없으면 보류 처리한다.
- **Gate D (목):** `## 1)~## 6)` 구조, 내부 링크, 용어 일관성 검수를 모두 통과해야 한다.
- **Gate E (금):** 릴리스 노트 초안과 차주 이월 항목이 함께 제출되어야 완료로 인정한다.

#### 검증/복구 흐름
1. 검증자가 불일치(카운트/링크/상태)를 발견하면 즉시 `차단 이슈`로 분류한다.
2. 차단 이슈는 4시간 내 1차 수정, 24시간 내 재검증 완료를 기본 SLA로 적용한다.
3. 24시간 내 해소 실패 시 운영 리드가 우선순위를 재정렬하고, 비핵심 개편 항목을 차주로 이관한다.
4. 데이터 불일치가 반복되면 수동 표 편집을 중지하고 단일 원본(인덱스 상태표)만 수정하도록 잠금 정책을 건다.
5. 금요일 게이트 직전 unresolved blocker가 남아 있으면 해당 문서는 릴리스에서 제외하고 위험 메모를 함께 발행한다.

### 원문 34개 pages 대비 Coverage 매트릭스

> 기준: `docs/ccforpms-ko-guide/pages/*.md` 34개 파일

| 원문 파일명 (34) | newcc 대응 파일명 | 반영상태 |
|---|---|---|
| `home.md` | `home.md` | 반영(revise) |
| `0.0-getting-started-introduction.md` | `0.0-getting-started-introduction.md` | 반영(revise) |
| `0.1-getting-started-installation.md` | `0.1-getting-started-installation.md` | 반영(revise) |
| `0.2-getting-started-start-and-clone.md` | `0.2-getting-started-start-and-clone.md` | 반영(revise) |
| `1.1-fundamentals-welcome.md` | `1.1-fundamentals-welcome.md` | 반영(revise) |
| `1.2-fundamentals-visualizing-files.md` | `1.2-fundamentals-visualizing-files.md` | 반영(revise) |
| `1.3-fundamentals-first-tasks.md` | `1.3-fundamentals-first-tasks.md` | 반영(revise) |
| `1.4-fundamentals-agents.md` | `1.4-fundamentals-agents.md` | 반영(revise) |
| `1.5-fundamentals-custom-subagents.md` | `1.5-fundamentals-custom-subagents.md` | 반영(revise) |
| `1.6-fundamentals-project-memory.md` | `1.6-fundamentals-project-memory.md` | 반영(revise) |
| `1.7-fundamentals-claude-code-navigation.md` | `1.7-fundamentals-claude-code-navigation.md` | 반영(revise) |
| `2.1-advanced-write-prd.md` | `2.1-advanced-write-prd.md` | 반영(revise) |
| `2.2-advanced-analyze-data.md` | `2.2-advanced-analyze-data.md` | 반영(revise) |
| `2.3-advanced-product-strategy.md` | `2.3-advanced-product-strategy.md` | 반영(revise) |
| `3.0-nano-banana-setup.md` | `3.0-nano-banana-setup.md` | 반영(revise) |
| `3.1.1-nano-banana-welcome-first-generation.md` | `3.1.1-nano-banana-welcome-first-generation.md` | 반영(revise) |
| `3.1.2-nano-banana-understanding-basics.md` | `3.1.2-nano-banana-understanding-basics.md` | 반영(revise) |
| `3.1.3-nano-banana-consistency-style.md` | `3.1.3-nano-banana-consistency-style.md` | 조건부 반영(drop-candidate) |
| `3.1.4-nano-banana-style-database.md` | `3.1.4-nano-banana-style-database.md` | 조건부 반영(drop-candidate) |
| `3.2.1-nano-banana-users-product-visuals.md` | `3.2.1-nano-banana-users-product-visuals.md` | 반영(revise) |
| `3.2.2-nano-banana-strategy-architecture-visuals.md` | `3.2.2-nano-banana-strategy-architecture-visuals.md` | 반영(revise) |
| `3.2.3-nano-banana-marketing-launch-assets.md` | `3.2.3-nano-banana-marketing-launch-assets.md` | 반영(revise) |
| `4.0-vibe-coding.md` | `4.0-vibe-coding.md` | 반영(revise) |
| `4.1-vibe-coding-setup.md` | `4.1-vibe-coding-setup.md` | 반영(revise) |
| `4.2-vibe-coding-plan.md` | `4.2-vibe-coding-plan.md` | 반영(revise) |
| `4.3-vibe-coding-build-iterate.md` | `4.3-vibe-coding-build-iterate.md` | 반영(revise) |
| `4.4-vibe-coding-github.md` | `4.4-vibe-coding-github.md` | 반영(revise) |
| `4.5-vibe-coding-go-live.md` | `4.5-vibe-coding-go-live.md` | 반영(revise) |
| `company-context-overview.md` | `company-context-overview.md` | 반영(revise) |
| `company-context-product.md` | `company-context-product.md` | 반영(revise) |
| `company-context-personas.md` | `company-context-personas.md` | 반영(revise) |
| `company-context-competitive.md` | `company-context-competitive.md` | 반영(revise) |
| `cowork.md` | `cowork.md` | 조건부 반영(drop-candidate) |
| `search.md` | `search.md` | 조건부 반영(drop-candidate) |

### Coverage 통계
- 원문 pages: **34개**
- newcc 1:1 대응: **34개 (100%)**
- 완전 반영(유지/개정): **30개**
- 조건부 반영(drop-candidate): **4개**
- 미대응(누락): **0개**

### 이번 주 운영 미니 플랜 (완료 추적용)
| 구분 | Owner | Gate | 보고 리듬 |
|---|---|---|---|
| 1차 개편 15개 | 문서별 섹션 오너 | 초안 100% + 내부 링크 무결성 | 매일 18:00 스탠드업(10분) |
| drop-candidate 4개 | 편집 리드 + 리뷰어 1명 | D-01~D-05 체크표 1차 완료 | 수/금 의사결정 메모 공유 |
| Coverage 재검증 | QA 에디터 | 34:34 매핑 재검증 + 누락 0 | 금요일 릴리스 게이트 리뷰 |

### 이번 주 완료형 실행 플랜
- **월~화:** 1차 개편 대상 15개 중 우선순위 8개 문서를 보강하고 상태 태그(`new/revise/drop-candidate`)를 재동기화한다.
- **수~목:** 남은 7개 문서 보강과 함께 drop-candidate 4개에 D-01~D-03 근거 데이터를 채운다.
- **금 검증:** Coverage 표, 상태 요약, 34개 원문 매핑을 교차검토해 누락/불일치 0건을 확인한다.
- **Done 기준:** 43개 상태표 업데이트, 1차/2차 우선순위 합의 메모, 릴리스 노트 초안까지 모두 링크된다.
- **리스크·완화:** 오너 미지정으로 지연될 수 있으므로 문서별 단일 담당자를 선지정하고, 미완료 항목은 2차 백로그로 즉시 이관한다.

### Claude Code 핵심개념 체크리스트 (표준 템플릿)
- [ ] 이 문서의 목표를 **문제-행동-성과지표** 1문장으로 적었다.
- [ ] 작업 시작 전에 **모드(Plan / Edit / Auto-Accept)** 선택 기준을 기록했다.
- [ ] `CLAUDE.md`의 프로젝트 규칙(금지사항/품질게이트/보고형식)을 확인했다.
- [ ] `@` 또는 첨부 자료로 **맥락 입력(문서/데이터/정책) 3개 이상** 연결했다.
- [ ] 필요한 경우 **sub-agent/병렬 작업** 범위와 합성(synthesis) 책임자를 지정했다.
- [ ] **MCP/외부도구 연동 필요 여부**와 접근 권한 상태를 점검했다.
- [ ] 산출물에 **검증 기준(정확성/재현성/지표/테스트)** 을 명시했다.
- [ ] 결과를 **Git/문서 링크/로그**로 추적 가능하게 남겼다.
- [ ] 다음 액션 3개를 **담당자·기한·검증포인트**와 함께 확정했다.

## 5) 실습/적용 체크리스트
- [ ] 34개 원문 대응 관계(1:1 매핑)와 누락 0개를 확인했다.
- [ ] `new/revise/drop-candidate` 상태 분류를 최신 개편안과 동기화했다.
- [ ] drop-candidate 4개 문서에 대해 삭제 기준(D-01~D-05) 적용 계획을 합의했다.
- [ ] 1차/2차 개편 우선순위를 주간 운영 캘린더에 반영했다.
- [ ] 릴리스 노트 작성 기준(coverage/상태표 기반)을 문서화했다.

### drop-candidate 삭제 기준 (정량 기준 포함)

| 기준 ID | 판단 기준 | 정량 임계값 | 판정 |
|---|---|---|---|
| D-01 | 실제 참조도 | 최근 8주 내부 링크/인용 횟수 ≤ 1회 | 삭제 후보 유지 |
| D-02 | 내용 중복도 | 상위 대체 문서와 중복률 ≥ 70% | 통합 우선 |
| D-03 | 산출물 기여도 | 문서 체크리스트 실행 후 신규 산출물 4주 연속 0건 | 삭제 후보 유지 |
| D-04 | 운영 필요성 | 편집자 2인 리뷰 점수 평균 < 3.0/5.0 (2회 연속) | 삭제 승인 가능 |
| D-05 | 안전 삭제 검증 | 삭제 후 2주간 복구 요청 0건 | 최종 삭제 확정 |

## 6) 산출물
- 43개 문서 상태 대시보드(`new/revise/drop-candidate`) 1종
- 원문 34개 대비 coverage 매트릭스 1종
- drop-candidate 삭제 기준표(D-01~D-05) 1종
- 1차/2차 개편 우선순위 실행 목록 1종
- 이번 주 완료 추적 보드(Owner/Gate/리듬/차주 이월 항목) 1종

### 운영 우선순위 (1차/2차 개편)

### 1차 개편 대상 (실행 우선)
- 인덱스/부록/컨텍스트/에코시스템 15개:
  - `00-index.md`
  - `company-context-overview.md`
  - `company-context-product.md`
  - `company-context-personas.md`
  - `company-context-competitive.md`
  - `cowork.md`
  - `search.md`
  - `사전.md`
  - `5.0-ecosystem-overview.md`
  - `5.1-level1-claude-ai-mcp-quickwins.md`
  - `5.2-level2-claude-code-hub.md`
  - `5.3-level3-n8n-automation.md`
  - `5.4-level4-vibe-agenting.md`
  - `5.5-omtm-kpi-ops-dashboard.md`
  - `5.6-integrated-workflow-playbook.md`

### 2차 개편 대상 (연결 정합)
- 나머지 28개 `revise` 문서(0.x~4.x, home 포함)
- 목표: 5.x 실행 체계와 0~4 트랙 과제를 같은 산출물 포맷으로 통일

### 자주 막히는 지점과 해결 가이드
- **막힘 1: 문서 상태 태그는 맞는데 근거가 없음**
  - 증상: `new/revise/drop-candidate`만 기입되고 왜 그런지 설명이 없다.
  - 해결: 상태 변경 시 반드시 근거 1줄(중복률/참조도/산출물 기여도 중 1개 이상) 동반 입력을 강제한다.
- **막힘 2: Coverage 수치가 표마다 다름**
  - 증상: 상태 요약표(43)와 coverage 표(34)가 서로 다른 숫자를 보인다.
  - 해결: 금요일 게이트 전 “단일 카운트 소스(인덱스 표)”에서만 수치를 갱신하고, 다른 표는 복사 동기화한다.
- **막힘 3: drop-candidate 결론이 계속 미뤄짐**
  - 증상: 논의만 반복되고 통합/삭제 결론이 나지 않는다.
  - 해결: D-01~D-05 체크가 80% 이상 채워지지 않으면 의사결정 회의 안건으로 상정하지 않는 규칙을 적용한다.
- **막힘 4: 오너가 불명확해 일정 지연**
  - 증상: 누구도 최종 수정 책임을 지지 않아 금요일 게이트 직전 이슈가 쌓인다.
  - 해결: 문서마다 1차 오너 1명, 2차 검수자 1명을 고정하고 미지정 문서는 진행 금지한다.

### 원문 링크 (Claude Code / Tutorials)
- Claude Code Overview: https://code.claude.com/docs/en/overview
- Tutorials Hub: https://claude.com/resources/tutorials
- Getting started with Claude AI: https://claude.com/resources/tutorials/getting-started-with-claude-ai
- Get the most from Claude Opus 4.6: https://claude.com/resources/tutorials/get-the-most-from-claude-opus-4-6
- Simplify your browsing experience with Claude for Chrome: https://claude.com/resources/tutorials/simplify-your-browsing-experience-with-claude-for-chrome
- Claude Cowork: A Research Preview: https://claude.com/resources/tutorials/claude-cowork-a-research-preview
- Getting started with Claude for Financial Services: https://claude.com/resources/tutorials/getting-started-with-claude-for-financial-services

### 운영 메모
- 본 인덱스는 문서 목록용이 아니라, **개편 우선순위 + 삭제 의사결정 + coverage 검증**의 기준 문서다.
- 2차 개편 완료 시, 본 문서의 상태 요약/coverage 표를 기준으로 release note를 작성한다.
- 주간 운영에서 오너/게이트/보고 리듬/에스컬레이션 경로가 빠지면 실행 품질이 급격히 떨어지므로, 표 기반으로 고정 운영한다.
