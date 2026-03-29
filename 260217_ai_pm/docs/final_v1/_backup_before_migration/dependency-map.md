# 하네스 엔지니어링과 Part 1-8 연결 맵

> **목표**: Claude Code AI PM 가이드의 Part 1-8 구조가 하네스 엔지니어링의 4가지 핵심 요소(헌법, 작업 구조, 검증, 루프)와 어떻게 정렬되는지 파악하고 문서 간 의존성을 매핑.

---

## 하네스 엔지니어링 4가지 핵심 요소 (Harness Engineering Framework)

| 요소 | 정의 | PM 맥락 |
|------|------|--------|
| **1. 헌법 (Constitution)** | 팀의 모든 행동을 규제하는 원칙과 규칙의 성문화 | CLAUDE.md, 프로젝트 메모리, 팀 OKR, 문화 |
| **2. 작업 구조 (Work Structure)** | 반복 가능한 프로세스, 롤 정의, 책임 체계 | Discovery → Definition → Delivery → Growth 파이프라인 |
| **3. 검증 (Validation)** | 가정을 데이터로 검증하고 의사결정을 뒷받침하는 프레임워크 | A/B 테스트, 사용자 리서치, 실험 분석 |
| **4. 루프 (Loop)** | 피드백을 수집하고 지속적으로 개선하는 순환 구조 | 주간 대시보드, KPI 추적, 성장 메트릭 최적화 |

---

## Part 1: 시작하기 — 왜 지금, AI 네이티브 PM인가

### Part 1.1: why-now.md

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 1.1-why-now.md | PM 역할 변화, "자동화/증강/직접판단" 프레임워크 | **헌법 — 기본 철학** |

**상세 연결:**
- **헌법 적용**: 이 파일에서 정의하는 "자동화/증강/직접판단" 3가지 프레임워크가 **프로젝트의 근본 원칙**이 됨
- PM이 매 작업을 할 때 "이것은 자동화/증강/직접판단 중 어디인가?"를 항상 자문하는 규칙
- CLAUDE.md에 이 프레임워크를 명시하면, 모든 이후 작업이 이 원칙에 정렬됨
- **Repository Harness 첫 번째 핵심**: "AI를 도구가 아닌 팀원으로 대하는" 철학적 기반

**실전 적용:**
```yaml
## CLAUDE.md 헌법 섹션
Framework: Automation / Augmentation / Direct Judgment
- Automation: 반복적, 규칙 명확, 판단 불필요
- Augmentation: AI 초안 + PM 판단
- Direct Judgment: PM만이 할 수 있는 영역
```

---

### Part 1.2: what-is-claude-code.md

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 1.2-what-is-claude-code.md | Claude Code의 CLI 4가지 장점, ChatGPT와의 차이 | **헌법 — 도구의 기본 성질** |

**상세 연결:**
- Claude Code의 4가지 핵심 특성 (파일 읽기/쓰기, MCP 통합, 모드 전환, 메모리 유지)이 Repository Harness의 **기술적 토대**가 됨
- 이 파일에서 설명하는 "파일 시스템 중심 워크플로우"가 모든 자동화의 기반
- **Repository Harness의 기술 정책**: "터미널 중심, 파일 기반, 상시 메모리 유지"

---

### Part 1.3-4: install-and-first-run.md, code-vs-cowork.md

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 1.3-install-and-first-run.md | 설치, 첫 세션, 트러블슈팅 | **작업 구조 — 온보딩 체크리스트** |
| 1.4-code-vs-cowork.md | Claude Code (자동화) vs Cowork (협업) 선택 기준 | **검증 기준 — 도구 선택 검증** |

**상세 연결:**
- Part 1.3은 **Application Harness의 온보딩 프로세스** 정의
- Part 1.4는 "어떤 상황에서 어떤 도구를 선택하는가"를 결정하는 **검증 기준**

---

## Part 2: 기본기 — Claude Code와 대화하기

### Part 2.1-2.2: files-and-input.md, modes-and-depth.md

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 2.1-files-and-input.md | @파일 참조, 이미지 입력, 다중 출력 | **작업 구조 — 입력 표준화** |
| 2.2-modes-and-depth.md | Edit/Auto-Accept/Plan 모드, think/ultrathink | **작업 구조 — 실행 모드 선택** |

**상세 연결:**
- Part 2.1에서 정의하는 "@파일 참조 규칙", "이미지 메타데이터 포맷"은 **Application Harness의 입력 표준**
- Part 2.2의 "모드별 의사결정 트리"는 **작업 구조의 실행 경로**를 명시
- CLAUDE.md에 이 규칙들을 저장하면, 매번 세션마다 "어떤 모드를 쓸까"를 자동 결정 가능

---

### Part 2.3: project-memory.md 🔑

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 2.3-project-memory.md | 메모리 4단계 계층, PM 프로젝트용 CLAUDE.md 작성법 | **헌법 + 작업 구조** |

**상세 연결:**
- **가장 중요한 Harness 연결점**: Part 2.3에서 정의하는 "메모리 계층 구조"가 **Repository Harness의 핵심 실행 메커니즘**
  - Global CLAUDE.md (조직 공통 규칙)
  - Project CLAUDE.md (프로젝트 특화 규칙) ← **PM 프로젝트의 헌법**
  - Directory CLAUDE.md (모듈별 규칙) ← **Application Harness**
  - Personal CLAUDE.local.md (개인 선호도)

**실전 적용:**
```
헌법 적용 순서:
Local > Directory > Project > Global
구체적인 규칙이 일반적 규칙을 덮어씀 (선택적 적용)
```

- Part 2.3에서 배운 "CLAUDE.md의 4단계 계층"이 바로 **Harness의 다층 구조**를 구현하는 방식

---

### Part 2.4-2.6: custom-subagents.md, agent-teams.md, human-in-the-loop.md

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 2.4-custom-subagents.md | .claude/agents/ 작성, 엔지니어/경영진/리서처 에이전트 | **작업 구조 — 역할 기반 에이전트** |
| 2.5-agent-teams.md | 멀티에이전트 협업, Delegate 모드, 태스크 의존성 | **실행 루프 — 병렬 실행 및 조율** |
| 2.6-human-in-the-loop.md | Human-in-the-Loop 철학, 루프 깊이 프레임워크 | **검증 기준 — PM 판단 포인트** |

**상세 연결:**
- Part 2.4-2.5: **Application Harness의 팀 설계** — 각 역할(엔지니어, 경영진, 리서처)별로 다른 **작업 구조**를 정의
- Part 2.6: **Harness의 Human-in-the-Loop 원칙** — "AI가 제시, PM이 검증/판단"의 사이클을 명시

---

## Part 3: 고급 설정 — 워크플로우 자동화 인프라

### Part 3.1-3.4: MCP, CLAUDE.md 심화, 슬래시 커맨드, 커스텀 스킬

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 3.1-mcp-integration.md | Notion/Linear/Slack/GitHub 하나의 터미널 연결 | **실행 루프 — 데이터 수집 자동화** |
| 3.2-claude-md-deep-dive.md | CLAUDE.md 심화: 폴더 구조, YAML front matter, AI Evals | **헌법 + 작업 구조 심화** |
| 3.3-slash-commands.md | /today, /prd, /status 등 반복 워크플로우 자동화 | **실행 루프 — 자동화 명령어** |
| 3.4-custom-skills.md | SKILL.md 기반 재사용 워크플로우 패키지 | **작업 구조 — 재사용 가능한 프로세스** |

**상세 연결:**

**Part 3.1 (MCP):**
- MCP는 **Repository Harness의 데이터 계층**
- "외부 도구를 Claude의 확장으로 통합"한다는 것은 **Harness의 개방성**을 의미
- Notion/Linear/Slack을 MCP로 연결하면, "기존 팀 도구가 CLAUDE.md의 입력 소스"가 됨

**Part 3.2 (CLAUDE.md 심화):**
- 이 파일이 **가장 핵심적인 Harness 구현 가이드**
- YAML Front Matter로 정의하는 "타입, 우선순위, 메트릭"은 **작업 구조의 메타데이터**
- AI Evals 프레임워크는 **검증 기준**을 코드화하는 방식

```yaml
---
type: prd | user-story | research
tags: [q1-planning, user-engagement]
omtm: engagement  # One Metric That Matters
priority: p0 | p1 | p2
---
```

**Part 3.3 (슬래시 커맨드):**
- `/today`, `/prd`, `/status`는 **반복적 작업 구조**를 자동화한 것
- 매 호출마다 "이 작업은 어떤 원칙(헌법)으로 실행되어야 하나"를 자동 참조
- **실행 루프를 명시적으로 트리거**하는 메커니즘

**Part 3.4 (커스텀 스킬):**
- SKILL.md는 **Application Harness의 재사용 가능한 템플릿**
- 특정 PM 워크플로우(예: "경쟁사 분석", "PRD 작성")를 반복 가능한 형태로 저장
- 팀 공유 시 "우리 조직의 표준 프로세스(헌법)"를 확산시키는 메커니즘

---

### Part 3.5-3.6: n8n 자동화, 멀티모델 라우팅

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 3.5-automation-n8n.md | n8n으로 스케줄/이벤트 기반 워크플로우 | **실행 루프 — 외부 자동화 시스템** |
| 3.6-multimodel-routing.md | 태스크별 최적 모델 선택 의사결정 트리 | **검증 기준 — 모델 선택 최적화** |

**상세 연결:**
- Part 3.5: Claude Code를 넘어 **n8n 같은 외부 자동화 플랫폼과의 통합**
  - "하네스의 실행 루프가 외부 시스템으로 확장"됨을 의미
- Part 3.6: **검증 기준의 비용 최적화** — "이 작업에는 어떤 모델(Claude 3.5 / Sonnet / Haiku)이 최적인가"를 결정하는 의사결정 트리

---

## Part 4: Discovery — 문제 발견

### Part 4.1-4.2: 사용자 리서치, 경쟁사 분석

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 4.1-discovery-user-research.md | CSV/설문 분석, 인터뷰 합성, PM 판단 포인트 | **작업 구조 — 리서치 표준화** |
| 4.2-discovery-competitive-analysis.md | 구조화된 분석, 멀티에이전트 병렬 분석 | **작업 구조 + 실행 루프** |

**상세 연결:**
- Part 4.1-4.2에서 정의하는 "Discovery의 프로세스"는 **Application Harness**
  - "CSV는 어떻게 분석하는가", "인터뷰 데이터는 어떻게 패턴화하는가"를 표준화
  - Part 2.1의 "@파일 참조"와 Part 3.2의 "메타데이터 규칙"을 활용한 구체적 사례

**실전:**
- Part 4.1의 "PM 판단 포인트" = **검증 기준**: "이 패턴은 통계적으로 유의한가", "실제 고객 Pain Point인가"
- Part 4.2의 "멀티에이전트 병렬 분석" = **실행 루프**: Part 2.5의 Agent Teams를 실제 Discovery 작업에 적용

---

## Part 5: Definition — 해결책 정의

### Part 5.1: definition-write-prd.md 🔑

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 5.1-definition-write-prd.md | 4단계 워크플로우, 소크라틱 질문, 멀티에이전트 리뷰 | **작업 구조 — PRD 정의 프로세스** |

**상세 연결:**
- **Harness '작업 구조'의 가장 구체적 구현**
- Part 5.1의 4단계 워크플로우:
  1. 컨텍스트 기반 질문 생성
  2. 소크라틱 대화로 가정 검증
  3. 멀티 관점 리뷰 (엔지니어, 경영진, 리서처)
  4. PRD 최종 작성

이것은 "문제 정의 → 가정 검증 → 다각도 검증 → 최종 결정"의 **Harness 실행 루프**를 그대로 따름

- **소크라틱 질문** = **검증 기준**: PM의 가정을 체계적으로 도전하는 메커니즘
- **멀티에이전트 리뷰** = **실행 루프**: Part 2.5의 Agent Teams를 PRD 검증에 적용

---

### Part 5.2: definition-product-strategy.md

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 5.2-definition-product-strategy.md | Diagnosis → Guiding Policy → Coherent Actions | **헌법 + 작업 구조** |

**상세 연결:**
- "Guiding Policy"는 **프로젝트의 헌법** (Part 1.1과 연결)
- "Coherent Actions"는 **작업 구조의 일관성 원칙**

---

## Part 6: Delivery — 직접 만들고 보여주기

### Part 6.1-6.3: Vibe 코딩, 비주얼 에셋, GitHub 배포

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 6.1-delivery-vibe-coding.md | 1M Context 시대 SaaS MVP 하루 완성 | **실행 루프 — 통합 개발 세션** |
| 6.2-delivery-visual-assets.md | 5가지 비주얼 에셋 유형, Gemini API 연동 | **작업 구조 — 에셋 생성 표준** |
| 6.3-delivery-github-deploy.md | Git 기초, Vercel 배포, 모니터링 | **실행 루프 — 배포 자동화** |

**상세 연결:**

**Part 6.1 (Vibe 코딩):**
- "1M Context = 전체 프로젝트 맥락을 한 세션에서 유지"
- Part 3.1의 MCP 통합 + Part 3.2의 CLAUDE.md 심화 + Part 2.5의 Agent Teams를 **통합 실행**하는 사례
- **실행 루프의 진화**: "파편화된 세션 → 통합 세션" 으로의 전환
- Repository Harness의 "전체 구조 유지" 원칙을 1M Context로 구현 가능하게 됨

**Part 6.2-6.3:**
- **Application Harness**: "PM이 직접 만드는 에셋, 배포의 표준화 규칙"

---

### Part 6.4-6.6: Office 자동화, Computer Use, 코드 리뷰

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 6.4-office-automation.md | Office 문서 자동 생성 및 배포 | **실행 루프 — 문서 자동화** |
| 6.5-computer-use.md | Claude의 컴퓨터 사용 능력으로 UI 자동화 | **실행 루프 — UI 기반 자동화** |
| 6.6-code-review.md | PM과 엔지니어의 효과적 코드 리뷰 흐름 | **검증 기준 — 코드 품질 기준** |

---

## Part 7: Growth — 측정과 운영

### Part 7.1-7.2: 실험 분석, KPI 대시보드

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 7.1-growth-experiment-analysis.md | A/B 테스트 분석, Impact 공식, ROI 시나리오 | **검증 기준 — 성과 측정** |
| 7.2-growth-kpi-dashboard.md | OMTM, KPI 정의, 자동화 스크립트, 알림 체계 | **검증 기준 + 실행 루프** |

**상세 연결:**

**Part 7.1-7.2:**
- **검증 기준의 중심**: "어떤 지표가 성공을 증명하는가"
- OMTM (One Metric That Matters) = **프로젝트의 북극성 지표**
- Part 3.2의 CLAUDE.md에 OMTM을 명시하면, 모든 의사결정이 이 지표에 정렬됨

```yaml
## CLAUDE.md 검증 기준
North Star Metric (NSM): Weekly Active Users (WAU)
  현재: 1,250명
  목표 (Q2): 2,000명
  성공 기준: +60% 성장
```

- Part 7.2의 "자동화 스크립트" = **실행 루프**: 매주 자동으로 KPI를 계산하고 Slack으로 알림

---

### Part 7.3-7.4: AI Observability, 1M Context 비용 전략

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 7.3-ai-observability.md | Helicone/LangSmith 프로덕션 모니터링 | **검증 기준 — AI 성능 추적** |
| 7.4-1m-context-cost-strategy.md | 1M Context 비용 프레임워크, ROI 시뮬레이션 | **검증 기준 — 비용 효율성 추적** |

---

## Part 8: 전략과 성장 경로

### Part 8.1: ai-product-strategy.md

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 8.1-ai-product-strategy.md | 4D 프레임워크 (Direction/Differentiation/Design/Deployment) | **헌법 — 장기 전략 원칙** |

**상세 연결:**
- **Repository Harness의 장기 비전**: 프로젝트가 "왜 AI를 활용하는가", "어떤 해자(Moat)를 구축할 것인가"를 명시
- Part 1.1의 "자동화/증강/직접판단" 프레임워크가 **단기 실행 규칙**이라면, Part 8.1의 4D는 **장기 전략**
- 모든 작업이 이 4D 전략으로 정렬되어야 함

```yaml
## CLAUDE.md 전략 섹션
4D Framework:
  D1 (Direction): Data Moat — 사용할수록 우리 데이터 가치 증가
  D2 (Differentiation): 경쟁사와의 3가지 차별점
  D3 (Design): 사용자 경험의 고유성
  D4 (Deployment): 확장 가능한 비즈니스 모델
```

---

### Part 8.2: growth-path.md

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| 8.2-growth-path.md | J/P/L 로드맵, Before/After, 팀 도입 가이드 | **헌법 + 실행 루프 — 조직 확산** |

**상세 연결:**
- **Repository Harness의 조직 확산 방법**
- "J(Junior) → P(Practitioner) → L(Lead)" 성장 경로는 **팀원들이 Harness를 어떻게 내재화할 것인가**를 설명

---

## Appendix: 실전 연습

### A.1-A.3: 실행 시나리오 및 사용 사례

| 파일명 | 핵심 개념 | Harness 연결점 |
|--------|----------|--------------|
| A.1-running-scenario.md | Discovery → Definition → Delivery → Growth 전체 흐름 | **전체 Harness 사이클** |
| A.2-level3-exercises.md | 자동화/증강/직접판단 프레임워크 실전 | **헌법 실행 연습** |
| A.3-usecase-scenarios.md | 마켓 사이징, 피드백 합성, M&A 실사 등 6가지 시나리오 | **Application Harness 사례** |

**상세 연결:**
- Part A는 **Harness의 모든 요소를 실제 PM 업무에 적용**하는 사례집
- 각 시나리오는 "헌법 → 작업 구조 → 검증 기준 → 실행 루프"의 완전한 사이클을 보여줌

---

## 요약: Harness와 Part 1-8의 정합성

### 헌법(Constitution) 매핑
| Harness 요소 | 구현 파일 | 핵심 원칙 |
|-----------|----------|---------|
| **기본 철학** | Part 1.1 | 자동화/증강/직접판단 프레임워크 |
| **도구 정책** | Part 1.2 | 파일 중심, CLI 기반, 상시 메모리 |
| **메모리 계층** | Part 2.3 | Global → Project → Directory → Personal |
| **장기 전략** | Part 8.1 | 4D Framework (Direction/Differentiation/Design/Deployment) |

### 작업 구조(Task Structure) 매핑
| Harness 요소 | 구현 파일 | 구체적 절차 |
|-----------|----------|----------|
| **입력 표준** | Part 2.1 | @파일 참조, 이미지 메타데이터 포맷 |
| **실행 모드** | Part 2.2 | Edit/Auto-Accept/Plan, think/ultrathink |
| **역할 기반** | Part 2.4 | 엔지니어/경영진/리서처 에이전트 |
| **리서치 표준** | Part 4.1-4.2 | CSV 분석, 인터뷰 패턴화, 경쟁사 분석 |
| **PRD 프로세스** | Part 5.1 | 질문 → 소크라틱 대화 → 멀티리뷰 → 최종 작성 |
| **에셋 표준** | Part 6.2 | 5가지 비주얼 에셋 생성 규칙 |
| **CLAUDE.md 심화** | Part 3.2 | YAML Front Matter, AI Evals, 5축 프레임워크 |
| **슬래시 커맨드** | Part 3.3 | /today, /prd, /status 자동화 |
| **커스텀 스킬** | Part 3.4 | SKILL.md 기반 재사용 워크플로우 |

### 검증 기준(Validation) 매핕
| Harness 요소 | 구현 파일 | 검증 메커니즘 |
|-----------|----------|-------------|
| **가정 검증** | Part 5.1 | 소크라틱 질문으로 PM의 가정 도전 |
| **Human-in-the-Loop** | Part 2.6 | PM 판단 포인트 명시, 루프 깊이 프레임워크 |
| **성과 측정** | Part 7.1-7.2 | A/B 테스트 분석, OMTM 기반 KPI 추적 |
| **비용 효율** | Part 7.4, 3.6 | 1M Context ROI 시뮬레이션, 모델 선택 최적화 |
| **코드 품질** | Part 6.6 | PM-엔지니어 코드 리뷰 기준 |

### 실행 루프(Execution Loop) 매핑
| Harness 요소 | 구현 파일 | 반복 메커니즘 |
|-----------|----------|------------|
| **병렬 실행** | Part 2.5 | Agent Teams, Delegate 모드, 태스크 의존성 |
| **데이터 수집** | Part 3.1 | MCP 통합 (Notion/Linear/Slack/GitHub) |
| **통합 개발** | Part 6.1 | 1M Context 세션으로 전체 프로젝트 유지 |
| **배포 자동화** | Part 6.3, 3.5 | GitHub CI/CD, Vercel 배포, n8n 외부 자동화 |
| **성과 추적** | Part 7.2 | KPI 자동 계산, Slack 알림, 주간 대시보드 |
| **문서 자동화** | Part 6.4 | Office 문서 자동 생성 및 배포 |

---

## Harness와 PM 프로젝트 CLAUDE.md의 구체적 연결

### 예시: TaskFlow 제품의 CLAUDE.md 구성

```markdown
# CLAUDE.md — TaskFlow PM 워크스페이스

## 1️⃣ 헌법 (Constitution)

### 기본 철학
- **프레임워크**: 자동화/증강/직접판단 (Part 1.1)
- **도구 정책**: CLI 파일 중심, 상시 메모리 유지 (Part 1.2)
- **장기 전략**: Data Moat 구축 (Part 8.1)

### 북극성 지표
- **OMTM**: Weekly Active Teams (WAT)
- 현재: 850개 팀, 목표: 1,200개 팀

---

## 2️⃣ 작업 구조 (Task Structure)

### 입력 표준 (Part 2.1)
- CSV: "user_id, action, timestamp, outcome"
- 이미지: "@screenshot.png [context description]"

### 모드 선택 (Part 2.2)
- PRD 작성: Auto-Accept + ultrathink
- 데이터 분석: Edit + think
- 전략 검토: Plan + think

### 리서치 프로세스 (Part 4.1-4.2)
- 사용자 인터뷰: 최소 10명, 각 1시간
- 경쟁사 분석: 5축 프레임워크 (기능, 가격, UX, 마케팅, 번들)

### PRD 워크플로우 (Part 5.1)
1. 컨텍스트 제공 → 2. AI 질문 수집 → 3. PM 답변 및 검증
4. 멀티에이전트 리뷰 (엔지니어, 경영진, 리서처)
5. 최종 PRD 작성

---

## 3️⃣ 검증 기준 (Validation)

### 성공 정의 (Part 7.1-7.2)
- **신기능 출시**:
  - 7일 retention > 40%
  - DAU/WAU ratio > 0.25
  - NPS > 50

### A/B 테스트 기준
- 최소 표본 크기: 2,000명
- 신뢰도: 95%, 유의도: 0.05
- 실험 기간: 최소 14일

### 비용 효율 기준 (Part 3.6, 7.4)
- 모델 선택: Claude 3.5 (기본) → Haiku (간단 작업)
- 1M Context 비용: $5/세션 이하

---

## 4️⃣ 실행 루프 (Execution Loop)

### 주간 사이클
1. **월요일**: 일일 브리핑 (/today 자동화)
2. **화수목**: 기능 개발 (Vibe 코딩, Part 6.1)
3. **금요일**: 성과 리뷰 (KPI 대시보드 자동 생성, Part 7.2)
4. **토일**: 전략 회의 및 다음주 계획

### 에이전트 팀 (Part 2.5)
- **엔지니어 에이전트**: 기술 검증, 구현 가능성 평가
- **경영진 에이전트**: 비용-이익 분석, 전략 정렬
- **리서처 에이전트**: 사용자 영향도, 통계 유의성 검증

### 자동화 (Part 3.3, 3.5)
- `/prd`: PRD 작성 워크플로우 시작
- `/status`: 주간 상태 보고서 자동 생성
- n8n: 매주 금요일 KPI 계산 및 Slack 발송
```

---

## 결론: Harness는 실전 PM을 위한 의사결정 프레임워크

**Harness의 4가지 요소:**
1. **헌법** = "우리 팀이 의사결정할 때 어떤 원칙을 따르는가"
2. **작업 구조** = "그 원칙을 구체적 프로세스로 어떻게 구현하는가"
3. **검증 기준** = "우리 결정이 맞았는지 어떻게 증명하는가"
4. **실행 루프** = "검증 결과로 다시 개선하는 반복 주기는 어떻게 구성되는가"

**Part 1-8의 배치:**
- **Part 1**: 헌법의 철학적 기반
- **Part 2-3**: 작업 구조와 자동화 인프라 구축
- **Part 4-6**: 실제 PM 일 (Discovery → Definition → Delivery)에 작업 구조 적용
- **Part 7**: 검증 기준과 성과 추적
- **Part 8**: 헌법의 장기 전략화와 팀 확산

**CLAUDE.md가 연결고리:**
- 각 파일에서 배운 "원칙, 프로세스, 기준, 루프"를 CLAUDE.md에 저장하면
- 모든 Claude Code 세션이 자동으로 "우리 팀의 Harness"를 따르게 됨

---

## 참고: Harness 1-4 Tier 매핑

| Tier | 복잡도 | 대상 | Part 매핑 |
|------|--------|------|-----------|
| **Tier 1** | 단순 | J (Junior) | Part 1-2, A.1-A.2 |
| **Tier 2** | 중간 | P (Practitioner) | Part 2-5, A.3 |
| **Tier 3** | 고급 | L (Lead) | Part 3-7, 8.1 |
| **Tier 4** | 엔터프라이즈 | 팀/조직 | Part 8.2, Repository Harness 도입 |

---

**문서 최종 업데이트**: 2026-03-29
**작성자**: AI PM 가이드 저자
**라이선스**: CC BY-NC 4.0
