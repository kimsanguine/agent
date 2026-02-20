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

### 운영 메모
- 본 인덱스는 문서 목록용이 아니라, **개편 우선순위 + 삭제 의사결정 + coverage 검증**의 기준 문서다.
- 2차 개편 완료 시, 본 문서의 상태 요약/coverage 표를 기준으로 release note를 작성한다.
