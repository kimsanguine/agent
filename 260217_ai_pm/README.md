# PM을 위한 Claude Code 완전 가이드 v1.1

> **"도구를 배우는 것이 아니라, PM의 일하는 방식을 재설계한다."**

---

## 📋 개요

이 레포지토리는 **PM이 Claude Code (AI 어시스턴트 CLI)를 활용하여 Discovery → Definition → Delivery → Growth의 전체 제품 개발 사이클에서 일하는 방식을 변화시키는 방법**을 다룹니다.

단순한 도구 사용법이 아닌, **실제 터미널 입력 → Claude 응답 → PM 판단**의 워크스루를 통해 학습하도록 설계되었습니다.

---

## 🆕 v1.1의 변화: Anthropic Q1 2026 공지사항 반영

### 핵심 업데이트
v1.0 (2월 배포)에서 **Claude Code, Claude API, Code Review 기본기**를 다뤘다면, **v1.1은 Anthropic이 2026년 1월~3월 발표한 26개의 신기능/서비스를 완전히 통합**했습니다.

#### 신규 추가된 8개 섹션 (Anthropic 업데이트)

| 섹션 | 기능 | 비즈니스 임팩트 |
|------|------|----------------|
| **1.4 Code vs Cowork** | IDE 선택 프레임워크: 팀 규모별 최적 도구 | 5명~200명 조직별 의사결정 매트릭스 |
| **2.3 Project Memory (Part 3)** | Claude Memory: 자동 학습 시스템 vs CLAUDE.md | 1M Context 환경에서 프로젝트 상태 일관성 유지 |
| **3.7 Team Automation** | /loop (Cron) vs Cowork Scheduled Tasks | PM 개입 없이 98% 자동화 가능한 아키텍처 |
| **6.4 Office Automation** | Claude in PowerPoint/Excel | 분기 보고서 48시간 → 30분 (95% 시간 단축) |
| **6.5 Computer Use** | UI 자동화 (94% 정확도, Sonnet 4.6) | Jira 배치 생성 240분/월 → 25분/월 |
| **6.6 Code Review** | PR 자동 리뷰 (보안 검증) | 45분 → 7분/PR, 92% 취약점 감지 |
| **7.5 Marketplace Strategy** | 수익화 모델 + Ambassador 프로그램 | 크리에이터: $100K~$300K/년 수익 가능 |
| **8.3 Cowork Enterprise** | 조직 확장 (SSO, RBAC, 감시, 규정) | 100명 팀: $404K/년 비용 절감, 574% ROI |

### 각 섹션의 구체적 내용

**1.4-code-vs-cowork.md** (4,700자)
- 11개 선택 기준 매트릭스 (속도, 협업, GUI, 자동화 등)
- 3가지 시나리오별 추천 (1-3명 팀, 5-20명, 200+명)
- 하이브리드 워크플로우 (Code + Cowork 동시 사용)

**2.3-project-memory.md** (파트 3 추가, +4,700자)
- Claude Memory (자동 학습)와 CLAUDE.md (수동 규칙) 비교
- 3단계 메모리 계층 (세션/프로젝트/조직)
- 90일 메모리 관리 사이클
- 1M Context에서 상태 일관성 유지 전략

**3.7-automation-team-design.md** (5,200자)
- /loop 3가지 실전 예제 (스타트업 배포, 성장팀 주간, Enterprise 24/7 Canary)
- Cowork Scheduled Tasks (GUI 기반) 아키텍처
- PM 개입 메트릭 (일반: 15% 자동화 → Claude: 98%)

**6.4-office-automation.md** (6,500자)
- PowerPoint: 분기 보고서 자동 생성 (48시간 → 30분)
- Excel: 재무 예측 (3시간 → 11분)
- Before/After 실제 시간 비교 및 ROI 계산

**6.5-computer-use.md** (5,800자)
- UI 자동화 3가지 사례 (Jira 배치, Figma 색상 변경, Forms 자동화)
- Sonnet 4.6 기반 94% 정확도
- Jira 자동화로 240분/월 → 25분/월

**6.6-code-review.md** (6,200자)
- 자동 PR 리뷰: SQL injection, XSS, N+1 쿼리, 메모리 누수 검증
- 100인 팀: 45분 → 7분/PR (84% 단축)
- $92,192/년 비용 절감 사례

**7.5-marketplace-strategy.md** (5,800자)
- 마켓플레이스 수익화: 30% Anthropic, 70% 크리에이터
- 2가지 성공 사례 (LinkedIn 스킬: $100K+, B2B Agent: $300K+)
- 3단계 Ambassador 프로그램 (25% → 20% → 0% 수수료)

**8.3-cowork-enterprise.md** (5,600자)
- 조직 확장 플랫폼 (SSO, GDPR, HIPAA, 감사 추적, RBAC)
- Series B 100명 회사: $404K/년 절감, 574% ROI
- 2주~2개월 단계적 롤아웃

---

## 📚 구성

```
docs/final_v1/
├─ 00-index.md (전체 목차 및 학습 경로)
├─ Part 1: 시작하기 (개념)
│  ├─ 1.1-why-now.md
│  ├─ 1.2-what-is-claude-code.md
│  ├─ 1.3-install-and-first-run.md
│  └─ 1.4-code-vs-cowork.md ✨ v1.1 신규
├─ Part 2: 기본기 (실전 기초)
│  ├─ 2.1-2.6 (6개 파일)
│  └─ 2.3-project-memory.md (Part 3 추가됨) ✨ v1.1 강화
├─ Part 3: 고급 설정 (자동화 인프라)
│  ├─ 3.1-3.6 (6개 파일)
│  └─ 3.7-automation-team-design.md ✨ v1.1 신규
├─ Part 4-5: Discovery/Definition (문제 정의)
├─ Part 6: Delivery (실행)
│  ├─ 6.1-6.3 (기존)
│  ├─ 6.4-office-automation.md ✨ v1.1 신규
│  ├─ 6.5-computer-use.md ✨ v1.1 신규
│  └─ 6.6-code-review.md ✨ v1.1 신규
├─ Part 7: Growth (분석)
│  ├─ 7.1-7.4 (기존)
│  └─ 7.5-marketplace-strategy.md ✨ v1.1 신규
├─ Part 8: Enterprise (조직)
│  ├─ 8.1-8.2 (기존)
│  └─ 8.3-cowork-enterprise.md ✨ v1.1 신규
├─ A. 부록 (10개 실전 사례)
├─ bridge-modules.md (Part 간 네비게이션)
├─ code/ (5개 Python 유틸)
├─ samples/ (CSV/JSON 샘플 데이터)
├─ templates/ (재사용 가능한 템플릿)
└─ VALIDATION_REPORT.md
```

**총 규모: 48개 마크다운 파일, 21,443줄**

---

## 🎯 대상 독자 & 학습 경로

| 레벨 | 경험 | 추천 경로 |
|------|------|----------|
| **J (Junior)** | PM 0~2년, AI 도구 경험 적음 | Part 1 → 2 → 4 → 5 → 6 → 7 → 8 (전체) |
| **P (Practitioner)** | PM 3~7년, AI 도구 일부 사용 | Part 1 훑고 → Part 3 → 6 (자동화) → 7~8 (최신 기능) |
| **L (Lead)** | PM 7년+, 팀/조직 리딩 | Part 1 훑고 → Part 5 (전략) → 3.7 (팀 자동화) → 8.3 (Enterprise) |

### v1.1 신규 내용에 집중할 PM들

**클로드 업데이트를 빠르게 따라가고 싶다면:**
1. Part 1.4 (IDE 선택 → Cowork 이해)
2. Part 2.3 (Memory 시스템 이해)
3. Part 3.7 (자동화 아키텍처)
4. Part 6.4~6.6 (최신 자동화 기능)
5. Part 7.5~8.3 (비즈니스 기회)

**예상 소요 시간: 4~6시간** (각 섹션 20~40분)

---

## 🔄 v1.0 vs v1.1 비교

| 항목 | v1.0 (Feb 2026) | v1.1 (Mar 2026) | 추가 내용 |
|------|-----------------|-----------------|---------|
| **Part 개수** | 8개 | 8개 | 동일 |
| **파일 개수** | 40개 | 48개 | +8개 신규 섹션 |
| **총 라인 수** | ~16K | 21.4K | +33% 확대 |
| **IDE 선택 가이드** | ❌ | ✅ 1.4 | Code vs Cowork 선택 프레임워크 |
| **Project Memory** | 기초 | ✅ 확장 (Part 3) | 자동학습 시스템 + CLAUDE.md 통합 |
| **팀 자동화** | ❌ | ✅ 3.7 | /loop + Cowork 아키텍처 |
| **Office 자동화** | ❌ | ✅ 6.4 | PowerPoint/Excel 자동 생성 |
| **UI 자동화** | ❌ | ✅ 6.5 | Computer Use (94% 정확도) |
| **Code Review** | ❌ | ✅ 6.6 | 자동 PR 리뷰 + 보안 검증 |
| **수익화** | ❌ | ✅ 7.5 | Marketplace + Ambassador |
| **Enterprise** | 기초 | ✅ 확장 8.3 | SSO, RBAC, 감사, 규정 |
| **실전 사례** | 10개 | 10개 | 동일 |

---

## 💡 v1.1이 중요한 이유

**Anthropic은 2026년 Q1에 Claude의 영역을 극적으로 확장했습니다:**

1. **도구의 범위 확장**
   - Before: Claude Code (터미널 기반 AI)
   - After: Claude Code + Cowork (GUI) + Computer Use (UI 자동화) + Marketplace (수익화) + Enterprise (조직)

2. **PM의 업무 패턴 변화**
   - 문서 작성: 48시간 → 30분
   - 반복 작업: 월 240분 → 25분
   - 팀 협업: 수동 → 98% 자동화
   - 개발 검증: 45분 → 7분/PR

3. **비즈니스 기회 창출**
   - 크리에이터: Marketplace에서 $100K~$300K/년 수익
   - 엔터프라이즈: 조직당 $400K/년 절감 가능

**v1.1은 이 모든 변화를 PM의 관점에서 통합적으로 설명합니다.**

---

## 🚀 빠른 시작

### 처음 사용자
```bash
# 전체 가이드 탐색
docs/final_v1/00-index.md 열기

# 또는 당신의 레벨에 맞춰
1. Part 1 읽기 (개념 이해)
2. Part 2 읽기 (기본 사용법)
3. 당신의 업무에 맞는 Part 선택 (4-8)
```

### Claude Code 이미 사용 중인 PM
```bash
# v1.1의 신규 내용만 빠르게 확인
1. docs/final_v1/1.4-code-vs-cowork.md (Cowork 이해)
2. docs/final_v1/3.7-automation-team-design.md (자동화 아키텍처)
3. docs/final_v1/6.4~6.6 (최신 기능)
4. docs/final_v1/7.5~8.3 (비즈니스 전략)
```

---

## 📖 각 Part 개요

### Part 1: 시작하기 — 왜 지금, AI 네이티브 PM인가
**목표:** PM의 역할 변화를 이해하고, Claude Code를 선택할 이유를 파악

- 1.1: PM 역할 변화 (Before/After 시간 배분)
- 1.2: Claude Code vs ChatGPT/Copilot (CLI의 4가지 장점)
- 1.3: 설치 및 첫 실행
- **1.4 (v1.1 신규):** IDE 선택 프레임워크 (Code vs Cowork)

### Part 2: 기본기 — Claude Code와 대화하기
**목표:** CLI 환경에서 파일을 다루고, 모드를 전환하며, 프로젝트 메모리를 설정

- 2.1: 파일 참조 및 입력 패턴
- 2.2: Edit/Auto-Accept/Plan 모드, think/ultrathink
- **2.3 (v1.1 확장):** Project Memory 심화 (Claude Memory + CLAUDE.md 통합)
- 2.4: 커스텀 서브에이전트 작성
- 2.5: 에이전트 팀 협업
- 2.6: Human-in-the-Loop 철학

### Part 3: 고급 설정 — 워크플로우 자동화 인프라
**목표:** MCP, 슬래시 커맨드, 커스텀 스킬, 외부 자동화 연동

- 3.1~3.6: MCP, CLAUDE.md 심화, 슬래시 커맨드, 스킬, n8n, 멀티모델 라우팅
- **3.7 (v1.1 신규):** Team Automation 아키텍처 (/loop + Cowork Scheduled Tasks)

### Part 4~5: Discovery/Definition — 문제 정의 및 해결책 설계
**목표:** 리서치 데이터 분석 → PRD 작성 → 전략 문서 수립

### Part 6: Delivery — 실행 및 배포
**목표:** PM이 직접 코딩, 비주얼 에셋 생성, 배포

- 6.1: Vibe Coding (SaaS MVP 하루 완성)
- 6.2: 비주얼 에셋 자동 생성
- 6.3: GitHub/Vercel 배포
- **6.4 (v1.1 신규):** Office Automation (PowerPoint/Excel 자동 생성)
- **6.5 (v1.1 신규):** Computer Use (UI 자동화, 94% 정확도)
- **6.6 (v1.1 신규):** Code Review 자동화 (PR 검증, 보안 검증)

### Part 7: Growth — 분석 및 최적화
**목표:** 실험 분석, KPI 대시보드, 비용 전략, 수익화

- 7.1~7.4: 실험 분석, 대시보드, AI 관찰성, 1M Context 비용 전략
- **7.5 (v1.1 신규):** Marketplace Strategy (수익화 + Ambassador 프로그램)

### Part 8: Enterprise — 조직 확장
**목표:** 팀/회사 규모에서 Claude를 운영하는 방법

- 8.1~8.2: AI 제품 전략, 성장 경로
- **8.3 (v1.1 신규):** Cowork Enterprise (SSO, RBAC, 감사, 규정 준수)

### 부록 A: 실전 사례
10개의 구체적 시나리오별 워크스루

---

## 🔗 관련 리소스

- **GitHub Issues:** 질문/피드백 등록
- **Anthropic 공식 문서:** https://claude.ai/docs
- **Claude Code 릴리스 노트:** https://github.com/anthropics/claude-code

---

## 📝 라이선스 및 기여

이 가이드는 개인용/팀용 학습 자료입니다.

오류 발견, 제안, 또는 개선사항은 GitHub Issues로 등록해주세요.

---

## 📅 버전 히스토리

| 버전 | 배포일 | 핵심 내용 | 파일 수 |
|------|--------|---------|--------|
| **v1.0** | 2026-02-XX | Claude Code 기본기 (Part 1~8, 기초) | 40개 |
| **v1.1** | 2026-03-25 | Anthropic Q1 2026 공지 통합 (+8개 신규 섹션) | 48개 |

---

**마지막 업데이트:** 2026-03-25
**다음 예정:** v1.2 (Claude 2.5/3.0 출시 시)
