# 하네스 엔지니어링 가이드 v2.0
## AI 팀원을 안정적으로 운영하기 위한 실무 가이드

---

## 목차

1. [하네스 엔지니어링이란](#1-하네스-엔지니어링이란)
2. [프롬프트 엔지니어링과의 차이](#2-프롬프트-엔지니어링과의-차이)
3. [4가지 핵심 요소](#3-4가지-핵심-요소)
   - [💡 Claude 3-Agent 아키텍처와의 매핑](#-선택사항-claude-3-agent-아키텍처와의-매핑)
4. [2-Layer 하네스 구조](#4-2-layer-하네스-구조)
5. [11단계 실전 구현 완벽 가이드](#5-11단계-실전-구현-완벽-가이드)
   - [💡 실행 루프 자동화 (Claude Code)](#-claude-code-활용-시-실행-루프-자동화)
6. [폴더 구조 레퍼런스](#6-폴더-구조-레퍼런스)
   - [💡 CLAUDE.md와의 연계](#-선택사항-claudemd와의-연계)
7. [품질 검증 기준](#7-품질-검증-기준)
8. [경영학 관점의 정당화](#8-경영학-관점의-정당화)
9. [핵심 요약](#9-핵심-요약)
10. [참고 자료](#10-참고-자료)
11. [Appendix A: 팀 규모별 하네스 조정](#appendix-a-팀-규모별-하네스-조정)
12. [Appendix B: 안티패턴 & 해결책](#appendix-b-안티패턴--해결책)
13. [Appendix C: 자동화 체크리스트](#appendix-c-자동화-체크리스트)

---

## 1. 하네스 엔지니어링이란

### Q. 하네스 엔지니어링이 뭔가요?

**A.** AI를 "도구"로 쓰는 방식을 넘어서, AI를 "팀원"으로 운영하기 위한 일관된 체계다.

프롬프트 엔지니어링이 "이번 작업에서 좋은 결과를 얻는 법"이라면, **하네스 엔지니어링은 "반복되는 작업에서 계속 좋은 결과를 유지하는 법"** 이다.

| 관점 | 프롬프트 엔지니어링 | 하네스 엔지니어링 |
|------|------------------|-----------------|
| 목표 | 한 번의 좋은 결과 | 일관된 품질 유지 |
| 기간 | 단기 (1-2회 상호작용) | 장기 (반복 작업) |
| 초점 | "어떻게 물을까?" | "어떻게 구조화할까?" |
| 도구 | 프롬프트 | 헌법, 검증, 루프 |

### Q. 왜 필요한가요?

**A.** AI와 함께 일하다 보면, 같은 작업을 반복해도 **결과가 들쭉날쭉해진다.**

```
[무구조 방식 — 매번 다른 결과]
물어봄 → 결과 A (좋음) → 다시 물어봄 → 결과 B (나쁨) → 다시 수정 → 결과 C (그냥 그럼)
→ 매번 다른 품질, 재현 불가능

[하네스 방식 — 일관된 결과]
헌법 정의 → 검증 기준 → 실행 루프 → 매번 결과 A 수준 유지
→ 일관된 품질, 재현 가능, 개선 가능
```

### Q. 조직 관점에서 하네스는 뭔가요?

**A.** 위임(Delegation) 이론으로 본다면, 하네스는 **"위임자가 수행자에게 줄 수 있는 최고 수준의 구체화"** 다.

> 💡 Claude Code를 사용한다면 [Section 3: Claude 3-Agent 아키텍처](#-선택사항-claude-3-agent-아키텍처와의-매핑) 섹션도 참고하세요.

경영학에서 위임의 실패 원인:
- ❌ "적절한 수준으로 처리해 줘" (모호함)
- ❌ "내 방식대로 해 줘" (개인화, 확장 불가)
- ✅ "이 헌법 안에서 자율적으로 판단해 줘" (명확함 + 확장성)

**하네스 = 경영 효율을 AI 시대에 맞게 재해석한 것**

---

## 2. 프롬프트 엔지니어링과의 차이

### Q. 프롬프트 엔지니어링으로는 부족한가요?

**A.** 단기 작업이면 충분하다. 하지만 반복 작업에서는 한계가 있다.

| 구분 | 프롬프트 엔지니어링 | 하네스 엔지니어링 |
|------|------------------|-----------------|
| **적용 범위** | 1회 또는 소수 작업 | 반복 작업 |
| **결과 재현성** | 낮음 (프롬프트에 따라 변함) | 높음 (구조화되어 있음) |
| **학습 곡선** | 즉시 효과 | 초반 설정 후 점진적 개선 |
| **확장성** | 팀 적용 어려움 | 팀 적용 가능 |
| **비용 효율** | 낮음 (반복 시도) | 높음 (일관된 결과) |

### 사례: 1000개 CSV 파일 데이터 정제

**프롬프트 엔지니어링 방식:**
```
"파일 1 → 데이터 정제 → 검증 → 수정 → 저장
→ 파일 2 → 같은 방식 적용 → 규칙 다르게 적용됨 → 재작업"

비용: 높음 (매번 수정), 시간: 길음, 일관성: 낮음
```

**하네스 엔지니어링 방식:**
```
"데이터 정제 헌법 정의 → 검증 기준 수립 → 1000개 자동 처리 → 일괄 검수"

비용: 낮음 (반복), 시간: 짧음, 일관성: 높음
```

---

## 3. 4가지 핵심 요소

하네스 엔지니어링은 4가지 핵심 요소로 구성된다. 이 4가지가 모두 갖춰져야만 "하네스"라고 부를 수 있다.

### ① 헌법 (Constitution)

**정의**: AI가 따라야 할 절대 원칙

- **수준**: 구체적이고 거부할 수 없는 지침
- **작성자**: 사람이 먼저 골격을 잡음 (AI는 구체화만)
- **변경**: 외부 환경 변화가 있을 때만 갱신
- **검증**: 사람이 반드시 읽고 승인

**예시 (260203_longform_agent 기반):**
```markdown
# 헌법: 동영상 자막 생성 시스템

## 목적
유튜브 교육 콘텐츠를 위해 한국어 자막을 자동 생성한다.

## 핵심 가치
- 정확성: 음성 내용과 100% 일치
- 가독성: 한 줄에 15자 이내, 5초 이상 화면 표시
- 접근성: 청각장애인도 이해 가능한 [음향 효과] 표기

## 논의 불가 항목
- 번역은 하지 않는다 (한국어 음성만)
- 외부 API 의존도를 50% 이하로 유지한다
- 코드 파일당 500줄 이상 금지
```

### ② 작업 구조 (Task Structure)

**정의**: AI가 각 단계에서 무엇을 해야 하는지 명확히 구조화

- **형식**: 단계별 체크리스트, 의사결정 트리, 입출력 명세
- **작성자**: 사람과 AI가 함께
- **변경**: 프로젝트 진행 중 발견되는 것을 반영
- **검증**: 사람이 주기적으로 리뷰

**예시:**
```
Step 1: 영상 다운로드 (yt-dlp)
↓
Step 2: 자막 추출 (Whisper)
↓
Step 3: 음절 동기화 (이전 결과와 비교)
↓
Step 4: 포맷 검증 (자막 길이, 한글 인코딩)
↓
Step 5: 최종 검수 (사람 또는 자동화 테스트)
```

### ③ 검증 기준 (Validation Criteria)

**정의**: 결과물이 "좋다"는 것을 어떻게 정의할지

- **형식**: 점수 기반 평가, 체크리스트, 자동화 테스트
- **작성자**: 사람이 기준, AI가 평가
- **변경**: 비즈니스 요구사항 변화에 따라
- **검증**: 기준 자체가 공정한지 주기적으로 점검

**예시:**
```
| 평가 항목 | 기준 | 점수 |
|---------|------|------|
| 정확도 | 원본과 100% 일치 | 5점 |
| 가독성 | 자막이 15자 이내 | 3점 |
| 동기화 | 음성과 ±100ms 오차 | 2점 |
| 합계 | 10점 이상 통과 | - |

현재 결과: 9.5/10 (재작업 필요)
```

### ④ 실행 루프 (Execution Loop)

**정의**: 결과 확인 → 피드백 → 검증 → 수정을 반복하는 프로세스

- **형식**: 자동화 또는 수동 리뷰 주기
- **작성자**: AI가 중심, 사람이 감시
- **변경**: 반복할 때마다 루프 개선
- **검증**: 품질 기준에 도달할 때까지 반복

**예시:**
```
[실행 루프 - 1회차]
자막 생성 → 테스트 실행 → 점수 8/10
발견 사항: "ㅁ발음 구분 안 됨"
→ 헌법 수정: "이중 모음은 분해해서 표기"

[실행 루프 - 2회차]
자막 생성 → 테스트 실행 → 점수 9.5/10
발견 사항: "긴 이름 처리 미흡"
→ 헌법 수정: "고유명사 > 15자는 약자 사용"

[반복...]
점수 기준 도달까지 반복
```

### 💡 선택사항: Claude 3-Agent 아키텍처와의 매핑

하네스의 4가지 요소는 Claude의 공식 3-agent 패턴과 자연스럽게 매핑된다. Claude Code를 사용한다면 이 연계를 활용할 수 있다.

| 하네스 요소 | Claude Agent | 역할 | 예시 |
|-----------|-------------|------|------|
| **헌법** | Planner Agent (확장) | 요구사항 해석 + 계획 수립 | "이 프로젝트의 핵심 가치가 무엇일까?" 토론 |
| **작업 구조** | Generator Agent (구현) | 각 단계별 구체적 실행 | "Step 6에 따라 데이터 정제 함수를 구현해" |
| **검증 기준** | Evaluator Agent (검증) | 결과물 평가 + 피드백 | "이 결과가 9/10 수준인가?" 자동 채점 |
| **실행 루프** | Multi-agent Handoff | 결과 → 피드백 → 수정 → 재검증 | claude-progress.txt로 세션 간 연속성 유지 |

**Claude Code 활용 팁:**
- Planner: `/newtask` 스킬로 헌법 초안 구조화
- Generator: `claude-code` 모드로 구현 작업 위임
- Evaluator: 자동화 테스트 + claude-progress.txt 기반 검증
- 세션 간 연속성: `.claude/progress.txt` 파일에 루프 진행 기록 저장

---

## 4. 2-Layer 하네스 구조

하네스는 **Repository Harness**와 **Application Harness** 2층으로 나뉜다.

### Repository Harness (저장소 레벨)

**정의**: 전체 저장소에 적용되는 공통 원칙

```
project-root/
├── harness/
│   ├── core-values.md         # 핵심 가치 (간결, 검증 가능, 안전)
│   ├── code-style.md          # 코딩 스타일 (파일당 500줄, 함수당 30줄)
│   ├── commit-strategy.md     # Git 커밋 전략
│   ├── testing-policy.md      # 테스트 정책
│   └── escalation.md          # 에스컬레이션 기준
```

**예시:**
```markdown
# 저장소 핵심 가치

## 간결함 (Simplicity)
- 파일당 500줄 이상 금지
- 함수당 30줄 이상 금지
- 외부 라이브러리는 사전 승인 목록만 사용

## 검증 가능성 (Verifiability)
- 모든 기능에 단위 테스트 필수
- E2E 테스트 커버리지 80% 이상
- 회귀 테스트는 매 배포 필수

## 안전성 (Safety)
- 사용자 데이터는 로컬 저장만 허가
- API 호출은 rate limit 구현 필수
- XSS/CSRF 방지는 필수
```

### Application Harness (애플리케이션 레벨)

**정의**: 특정 애플리케이션/기능에만 적용되는 원칙

```
project-root/
├── apps/
│   └── video-generator/
│       ├── harness/
│       │   ├── constitution.md      # 이 앱의 헌법
│       │   ├── spec.md              # 기능 명세
│       │   ├── validation.md        # 검증 기준
│       │   └── rollback-plan.md     # 롤백 전략
```

**예시:**
```markdown
# 애플리케이션 하네스: CSV 데이터 정제

## 헌법
- 목적: CRM 시스템용 고객 데이터 자동 정제
- 핵심 가치: 데이터 무결성, 정확성, 성능
- 논의 불가: 원본 데이터 삭제 금지, 외부 API 의존 50% 이하

## 입력 명세
- 입력: CSV 파일 또는 폴더 경로
- 포맷: UTF-8, ANSI 인코딩 자동 감지
- 최대 크기: 500MB/파일

## 출력 명세
- 출력: 정제된 CSV 파일
- 형식: UTF-8 인코딩, 쉼표 구분
- 메타데이터: 정제 로그, 변경 내역 기록
```

### Repository vs Application 하네스 충돌 시 우선순위

```
Application Harness > Repository Harness

예: Repository에서 "파일당 500줄"이지만,
Application에서 "파이프라인 파일은 1000줄 허가"
→ Application 기준 적용
```

---

## 5. 11단계 실전 구현 완벽 가이드

### Step 1-5. 기초 설정 (Scaffold)

#### Step 1. 프로젝트 디렉토리 구조 만들기

**목표**: Repository Harness와 Application Harness를 구분하는 폴더 구조 생성

**실행:**
```bash
# 프로젝트 루트로 이동
mkdir -p data-cleaner
cd data-cleaner

# 저장소 하네스 디렉토리
mkdir -p harness/{core,roles,workflows,templates,schemas}

# 애플리케이션 하네스 디렉토리
mkdir -p apps/data-cleaner/harness/{docs,specs}

# 구현 디렉토리
mkdir -p apps/video-generator/{src,tests,config}

# 진행 추적
mkdir -p .claude

# 폴더 구조 확인
tree -L 3 harness apps .claude
```

**결과 구조:**
```
video-generator/
├── harness/
│   ├── core/
│   │   └── index.md
│   ├── roles/
│   │   ├── coder.md
│   │   └── reviewer.md
│   ├── workflows/
│   │   └── pipeline.md
│   ├── templates/
│   └── schemas/
├── apps/
│   └── video-generator/
│       ├── harness/
│       │   ├── docs/
│       │   │   └── constitution.md
│       │   └── specs/
│       │       └── api-spec.md
│       ├── src/
│       │   ├── pipeline.py
│       │   ├── video_processor.py
│       │   └── subtitle_generator.py
│       ├── tests/
│       │   ├── test_pipeline.py
│       │   └── test_validators.py
│       └── config/
│           └── config.yaml
├── .claude/
│   ├── progress.txt
│   └── agent.md
└── README.md
```

#### Step 2. Git 초기화

**목표**: 버전 관리 준비

```bash
cd video-generator
git init
git config user.name "Your Name"
git config user.email "you@example.com"

# .gitignore 생성
cat > .gitignore << 'EOF'
__pycache__/
*.pyc
.env
.venv/
*.mp4
*.srt
.DS_Store
*.log
EOF

# 초기 커밋
git add .gitignore
git commit -m "init: initialize project structure"
```

#### Step 3. 환경 설정 (Python venv 예시)

```bash
# Python 가상 환경 생성
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# or: venv\Scripts\activate  # Windows

# 필수 라이브러리 설치
pip install --upgrade pip
pip install google-genai yt-dlp whisper numpy opencv-python

# 요구사항 저장
pip freeze > requirements.txt

# .env 파일 생성
cat > .env << 'EOF'
GEMINI_API_KEY=your_key_here
YOUTUBE_COOKIE_ENABLED=true
EOF
```

#### Step 4. README 작성

```bash
cat > README.md << 'EOF'
# Video Generator — 자동 영상 자막 생성 시스템

## 개요
YouTube 영상 → Whisper 음성인식 → Gemini 번역/정정 → SRT 자막 생성

## 빠른 시작
```bash
source venv/bin/activate
python apps/video-generator/src/pipeline.py --url "https://youtube.com/watch?v=..."
```

## 구조
- `harness/`: Repository 레벨 원칙
- `apps/video-generator/`: 애플리케이션 구현 + 하네스
- `tests/`: 자동화 테스트

더 자세한 내용: 각 디렉토리의 README.md 참고
EOF

git add README.md
git commit -m "docs: add project overview"
```

#### Step 5. AGENT.md 작성 (AI와의 인수인계 문서)

```bash
cat > .claude/agent.md << 'EOF'
# AGENT.md — AI 팀원 운영 문서

## 읽기 순서
1. 이 파일 (AGENT.md)
2. `harness/core/index.md` (저장소 원칙)
3. `apps/video-generator/harness/docs/constitution.md` (헌법)
4. `apps/video-generator/harness/specs/api-spec.md` (기능 명세)
5. `apps/video-generator/src/pipeline.py` (메인 로직)

## 현재 상태
- Repository Harness: 초안 완성
- Application Harness: 작성 예정
- 구현: 대기 중

## 다음 작업
1. 헌법 작성 및 리뷰
2. API 명세서 작성
3. 파이프라인 구현

## 문의사항
모호한 부분이 있으면 ./progress.txt에 기록하세요.
EOF

git add .claude/agent.md
git commit -m "docs: add AI onboarding document"
```

### Step 6. 헌법 작성 및 검증

#### 헌법 샘플 (CSV 데이터 정제 자동화)

```markdown
# 헌법: 고객 데이터 CSV 정제 시스템

## 프로젝트 기본 정보
- **프로젝트명**: Data Cleaner
- **목적**: CRM 시스템용 고객 데이터 자동 정제
- **예상 처리량**: 월 1000+ CSV 파일
- **주요 사용처**: 마케팅 캠페인, 데이터 분석

---

## 1. 핵심 가치 (Core Values)

### ① 데이터 무결성 (Data Integrity)
**정의**: 원본 데이터를 절대 손실하지 않으면서 정제

| 범위 | 기준 | 검증 방법 |
|------|------|---------|
| 백업 | 정제 전 원본 파일 필수 저장 | 백업 폴더 확인 |
| 추적성 | 정제된 행마다 출처 표기 | `_source_row` 컬럼 |
| 복구성 | 정제 실패 시 1시간 내 복구 가능 | 히스토리 로그 |
| 검증 | 정제 후 행 개수 변화 기록 | 레포트 자동 생성 |

### ② 정확성 (Accuracy)
**정의**: 정제 규칙이 명확하고 일관되게 적용됨

| 항목 | 기준 | 예시 |
|------|------|------|
| 중복 제거 | 이메일 + 전화번호 조합 기준 | `user@email.com` + `010-1234-5678` |
| 빈값 처리 | `NULL` 또는 `-` 로 통일 | `고객명` 빈값은 행 삭제 |
| 데이터 타입 | 날짜는 ISO 8601 형식 | `2025-03-15` |
| 이상값 | 이메일, 전화번호 형식 검증 | 잘못된 형식 플래깅 |

### ③ 성능 (Performance)
**정의**: 1000개 파일을 합리적 시간에 처리

| 항목 | 기준 | 이유 |
|------|------|------|
| 처리 속도 | 1개 파일 < 5초 | 일괄 처리 시간 < 1시간 |
| 메모리 사용 | 1개 파일당 < 500MB | 서버 안정성 |
| 병렬 처리 | 최대 4개 파일 동시 처리 | CPU 효율성 |
| 실패 재시도 | 실패 파일 자동 재시도 3회 | 네트워크 오류 대비 |

---

## 2. 논의 불가 항목 (Non-Negotiables)

### 기술적 제약
- 🚫 **원본 데이터 삭제 금지** → 반드시 백업 생성
- 🚫 **외부 API 의존도 50% 이상 금지** → 로컬 정제 우선
- 🚫 **코드 파일당 400줄 이상 금지** → 단일 책임 원칙
- 🚫 **함수당 25줄 이상 금지** → 테스트 가능성

### 보안/프라이버시
- 🚫 **개인정보 로그 출력 금지** → 민감 필드 마스킹 필수 (SSN, 신용카드 등)
- 🚫 **정제된 데이터 명확한 권한 관리** → 접근 제어 목록 유지
- 🚫 **중간 파일 암호화 없이 저장 금지** → 암호화 전송/저장 필수

### 품질 기준
- 🚫 **정제율 95% 미만 결과 제출 금지** → 수동 검증 후만 배포
- 🚫 **10개 이상 연속 오류 발생 시 중단** → 자동 롤백 필요
- 🚫 **정제 로그 없이 배포 금지** → 변경 내역 추적 필수

---

## 3. 역할 정의 (Role Definition)

| 역할 | 담당 | 책임 |
|------|-----|------|
| **사람 (PM/데이터 담당)** | 헌법 검증, 정제 규칙 결정 | 비즈니스 요구사항 판단 |
| **AI (코더)** | 파이프라인 작성, 자동 수정 | 헌법 범위 내 최적화 |
| **자동화 (CI/CD)** | 정기 정제, 품질 체크 | 기준 미달 시 거부 |

---

## 4. 변경 이력

| 날짜 | 변경 사항 | 사유 |
|------|---------|------|
| 2025-03-15 | 초안 작성 | 프로젝트 시작 |
| (향후) | - | - |

---

## 검증 체크리스트

- [ ] 목적이 명확하고 측정 가능한가?
- [ ] 핵심 가치 3개가 충분히 구체화되었는가?
- [ ] 논의 불가 항목이 정말 "논의 불가"인가?
- [ ] 역할 정의가 명확하고 겹치지 않는가?
- [ ] PM이 이 헌법으로 충분히 운영할 수 있다고 느껴지는가?

**최종 승인**: _______________ (PM 서명)
```

**실행:**
```bash
cat > apps/data-cleaner/harness/docs/constitution.md << 'EOF'
[위 내용 붙여넣기]
EOF

git add apps/data-cleaner/harness/docs/constitution.md
git commit -m "docs: add application constitution v1"
```

### Step 7. AI 평가 — 다중 관점 검증

**목표**: 헌법이 정말 명확하고 실행 가능한지 확인

**평가 요청 예시:**
```
[이 헌법을 읽고 다음 3가지 관점에서 평가해 줘]

1. 시니어 개발자 관점:
   - 구조와 확장성이 충분한가?
   - 기술 부채 위험은 없는가?
   - 10점 만점으로 점수를 매겨줄 때: __/10

2. 보안 담당자 관점:
   - 데이터 보호 정책이 충분한가?
   - API 보안, XSS, 인증 등에서 빠진 부분이 있는가?
   - 10점 만점으로 점수를 매겨줄 때: __/10

3. PM 관점:
   - 비즈니스 요구사항을 모두 커버하는가?
   - 운영 가능성이 높은가?
   - 10점 만점으로 점수를 매겨줄 때: __/10

각 관점별로 피드백과 개선안을 제시해 줘.
```

**평가 결과 예시 (상상):**
```
시니어 개발자 관점: 7/10
피드백: "API 의존도 50% 제약은 좋지만, 로컬 처리 시 메모리 제한이 명시되지 않았다."
개선안: "GPU 메모리 4GB 이상 권장" 추가

보안 담당자 관점: 8/10
피드백: "개인정보 마스킹이 필요하다고는 했으나, 어떤 항목인지 구체화되지 않았다."
개선안: "마스킹 대상: 연락처(01X-XXXX-XXXX), 이메일, 주민등록번호"

PM 관점: 9/10
피드백: "명확하고 실행 가능하다."
개선안: "월 500+ 처리 기준 검증 필요"
```

**적용:**
```bash
# 평가 결과를 반영하여 헌법 수정
# (위의 constitution.md 파일에 피드백 반영)

git add apps/video-generator/harness/docs/constitution.md
git commit -m "refactor: apply multi-perspective evaluation feedback v1"
```

### Step 8. 모호한 것 제거하기

**목표**: AI가 자의적으로 해석할 여지를 없애기

**검증 프롬프트:**
```
[헌법에서 다음을 점검해 줘]

1. 수치/횟수가 명시되지 않은 규칙이 있는가?
2. "적절한", "충분한", "필요 시" 같은 모호한 표현이 남아 있는가?
3. 예외 상황에서는 어떻게 처리하는가? (정책)
4. AI가 사람에게 에스컬레이션해야 할 상황은 언제인가?

구체적인 수정안을 제시해 줘.
```

**개선 전후 비교:**

| Before (모호) | After (명확) |
|-------------|------------|
| "고유명사는 표준 표기법을 따른다" | "고유명사는 국립국어원 표기법 또는 공식 영문명을 한글로 변환" |
| "중요한 음향은 표기한다" | "신뢰도 0.8 이상의 음향만 `[음향명]` 표기" |
| "필요 시 수정한다" | "5회 수정 후에도 신뢰도 0.85 미만이면 에스컬레이션" |

**적용:**
```bash
git add apps/video-generator/harness/docs/constitution.md
git commit -m "fix: clarify ambiguous rules with explicit thresholds"
```

### Step 9. Git 버전 관리 — 커밋 전략

**목표**: 모든 변경사항을 추적 가능하게 기록

**권장 커밋 시점:**

| 시점 | 커밋 메시지 예시 | 설명 |
|------|-----------------|------|
| 헌법 초안 완성 | `feat: add constitution draft v1` | 첫 헌법 |
| 평가 피드백 반영 | `refactor: apply multi-perspective feedback` | 개선 |
| 모호함 제거 | `fix: clarify ambiguous rules with explicit thresholds` | 구체화 |
| 파이프라인 구현 | `feat: implement video pipeline` | 코드 추가 |
| 테스트 통과 | `test: add unit tests for video processor` | 테스트 |
| 버그 수정 | `fix: handle invalid subtitle timing` | 버그 해결 |
| 성능 개선 | `perf: optimize memory usage in pipeline` | 최적화 |
| 루프 완료 | `milestone: complete execution loop v1` | 주요 이정표 |

**실제 커밋 로그 예시:**
```bash
git log --oneline | head -20
# 출력 예시:
# a1b2c3d milestone: complete execution loop cycle 1
# e4f5g6h test: add regression tests for v1
# i7j8k9l fix: handle edge case in subtitle timing
# m10n11o refactor: apply senior dev review feedback
# p12q13r feat: implement subtitle synchronization
# s14t15u feat: implement whisper integration
# v16w17x fix: clarify ambiguous rules with explicit thresholds
# y18z19a refactor: apply multi-perspective evaluation feedback
# b20c21d docs: add api specification
# e22f23g feat: add application constitution v1
# h24i25j docs: add AI onboarding document
# k26l27m init: initialize project structure
```

### Step 10. 암묵지 줄이기 — AGENT.md 상세화

**목표**: AI가 "당연히"라고 생각할 여지를 없애기

**상세한 AGENT.md 샘플:**
```markdown
# AGENT.md v2 — 상세 운영 문서

## 읽기 순서 (필수)
1. 이 파일 (AGENT.md)
2. `harness/core/index.md`
3. `apps/video-generator/harness/docs/constitution.md`
4. `apps/video-generator/src/pipeline.py`
5. `tests/test_pipeline.py`

## 현재 진행 상황
```
[████████░░] 80% 완료 (Step 10 진행 중)
- Step 1-9: 완료
- Step 10: 진행 중 (이 파일 작성)
- Step 11: 대기 중
```

## 구현 규칙 (반드시 따를 것)

### 코드 스타일
```python
# ✅ 좋은 예
def process_subtitle(subtitle_text, max_chars=15):
    """자막을 처리한다.

    Args:
        subtitle_text: 원본 자막
        max_chars: 한 줄 최대 글자 (기본값 15)
    """
    return subtitle_text[:max_chars]

# ❌ 나쁜 예
def proc(t):
    return t[:15]  # 함수명 불명확, 주석 없음
```

### 테스트 작성
```python
# ✅ 필수: 새 기능마다 테스트 작성
def test_process_subtitle():
    result = process_subtitle("안녕하세요")
    assert len(result) <= 15
    assert "안녕" in result

# ❌ 금지: 테스트 없이 코드만 제출
# def new_feature(): ...
```

### API 호출
```python
# ✅ 좋은 예: 에러 처리 + rate limit
try:
    response = client.generate(prompt, timeout=30)
except APIError as e:
    logger.error(f"API 에러: {e}")
    return None  # Fallback

# ❌ 나쁜 예: 에러 처리 없음
response = client.generate(prompt)  # 타임아웃 위험
```

## 문제 발생 시 보고 양식

```
[문제 보고]
제목: [심각도] 문제명

상황:
- 어떤 작업 중?
- 입력값은?
- 예상 결과는?
- 실제 결과는?

재현 방법:
$ python src/pipeline.py --url "..."
↓
[에러 메시지]

원인 분석:
- 추측: ...

제안:
- 해결책 1: ...
- 해결책 2: ...
```

## 성공 사례 (아직 없음)

향후 구현 후 기록할 예정.

## 다음 작업
1. Step 11: 실행 루프 돌리기
2. 첫 영상 테스트
3. 회귀 테스트 추가
```

**적용:**
```bash
cat > .claude/agent.md << 'EOF'
[위 내용 붙여넣기]
EOF

git add .claude/agent.md
git commit -m "docs: detail AGENT.md with operational rules"
```

### Step 11. 실행 루프 돌리기

**목표**: 파이프라인 구현 → 테스트 → 피드백 → 개선 반복

#### 실행 루프 진행 기록

```markdown
# 실행 루프 추적 — progress.txt

## 루프 1회차 (2025-03-15)

### ① 결과 확인
- 파이프라인 구현 완료
- 테스트 파일 50개 샘플: `data/samples/`
- 정제 결과: `output/cleaned_batch_001.csv`

### ② 발견 사항
- [문제 1] 정제율 92% (기준: 95% 이상)
  → 원인: 중복 제거 로직이 너무 약함
  → 조치: 이메일 + 전화번호 조합 기준으로 강화

- [문제 2] 빈값 처리 불일치 (NULL vs -)
  → 원인: 데이터 소스별로 다른 빈값 표기
  → 조치: 통일된 `NULL` 표기로 정규화

- [문제 3] 날짜 형식 오류 (2025/03/15 vs 2025-03-15)
  → 원인: 소스 파일의 날짜 형식이 다양함
  → 조치: ISO 8601 형식으로 자동 변환 함수 추가

### ③ 재검증
- 수정된 파이프라인 재실행
- 결과: 정제율 96.5%, 중복 제거 98% → ✅ 통과
- 회귀 테스트: 50/50 파일 통과

### ④ 문서 갱신
- `constitution.md`: "이메일 + 전화번호 조합 기준" 명시
- `AGENT.md`: "빈값 처리는 config/cleanrules.json에서 확장"
- `tests/test_cleaner.py`: 8개 테스트 케이스 추가

### 결과
✅ 루프 1 완료 — 정제율 기준 통과

---

## 루프 2회차 (2025-03-22)

### ① 결과 확인
- 200개 파일 배치 테스트
- 평균 정제율: 96.8% ✅
- 평균 처리 시간: 3.2초/파일 ✅

### ② 발견 사항
- 특수문자 처리 미흡 (예: ™, ®, € 등)
  → 조치: 유니코드 정규화 + 제거 옵션 추가

- 이메일 도메인 소문자화 누락
  → 조치: 이메일 도메인 자동 소문자화 함수 추가

### ③ 재검증 및 갱신
- `constitution.md`: 특수문자 처리 기준 추가
- 200개 배치 테스트 모두 통과

### 결과
✅ 루프 2 완료 — 대규모 배치 처리 검증됨

---

## 현황 요약
- 총 루프: 2회차
- 누적 개선: 6가지
- 정제율: 96.8% (목표 95% 달성)
- 테스트 커버리지: 88%
```

**기록 저장:**
```bash
cat > .claude/progress.txt << 'EOF'
[위 내용 붙여넣기]
EOF

git add .claude/progress.txt
git commit -m "milestone: complete execution loop cycle 1-2"
```

**루프별 결과 메트릭:**

| 루프 | 정제율 | 중복제거율 | 테스트 통과 | 상태 |
|------|--------|----------|-----------|------|
| 0 (초안) | 91% | 85% | 30/50 | ❌ 부적격 |
| 1 | 96.5% | 98% | 50/50 | ✅ 통과 |
| 2 | 96.8% | 99% | 200/200 | ✅ 통과 |

### 💡 Claude Code 활용 시: 실행 루프 자동화

하네스의 실행 루프를 Claude Code와 연계하면, 루프 반복을 더욱 효율적으로 관리할 수 있다.

#### 1. 세션 간 연속성: claude-progress.txt

여러 Claude 세션에서 작업할 때, `.claude/progress.txt`에 진행 상황을 기록해 두면:
```bash
# 세션 1
claude-code → [Step 6 헌법 수정] → progress.txt 업데이트
git add .claude/progress.txt
git commit -m "harness: update progress for loop 1"

# 세션 2
claude-code → [progress.txt 읽음] → "지난번 정제율 96.5%, 이제 중복제거 로직 강화"
→ [Step 7 검증 기준 개선] → progress.txt 업데이트
```

**이점**: 세션이 끝나도 Evaluator Agent가 이전 진행 상황을 파악하고 다음 루프를 시작할 수 있다.

#### 2. CI/CD 자동화: GitHub Actions 연계

테스트를 자동으로 실행하는 `.github/workflows/harness-validate.yml`:
```yaml
name: Harness Validation
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run validation tests
        run: |
          python -m pytest tests/ -v
          if [ $? -eq 0 ]; then
            echo "✅ 검증 기준 통과"
          else
            echo "❌ 검증 실패 — 루프 반복 필요"
          fi
```

**이점**: 매 커밋마다 자동으로 검증 기준 충족 여부를 확인, 실행 루프의 각 단계를 빠르게 순회.

#### 3. 스킬 활용: 구조화 자동화

Claude Code의 스킬을 이용해 반복 작업을 자동화:
```
/newtask "Loop 2: 데이터 정제율 96.8% → 97.5% 달성"
→ 자동으로 PRD 구조 생성 + 테스트 케이스 스캐폴드

/sketch "헌법 변경 내역 다이어그램"
→ 이전 vs 현재 헌법의 변화를 시각화
```

**선택 기준:**
- Claude Code가 활성화된 환경에서만 적용
- 직접 운영 중이라면 수동으로 progress.txt 관리
- GitHub Actions는 규모가 커질수록 더 유용 (50+ 테스트 케이스)

---

## 6. 폴더 구조 레퍼런스

### 완전한 예시 구조 (Step 11 완료 후)

> 💡 팀 프로젝트라면 [CLAUDE.md와의 연계](#-선택사항-claudemd와의-연계) 섹션에서 프로젝트 규약화 방법을 참고하세요.

```
data-cleaner/
│
├── harness/                                    # Repository Harness
│   ├── core/
│   │   ├── index.md                            # "저장소 목적, 핵심 가치"
│   │   ├── core-values.md                      # "간결, 검증 가능, 안전"
│   │   └── commit-policy.md                    # "커밋 전략"
│   ├── roles/
│   │   ├── coder.md                            # "AI 코더 역할"
│   │   ├── reviewer.md                         # "리뷰어 역할"
│   │   └── escalation.md                       # "에스컬레이션 기준"
│   ├── workflows/
│   │   ├── pipeline.md                         # "파이프라인 실행 흐름"
│   │   ├── testing.md                          # "테스트 워크플로우"
│   │   └── rollback.md                         # "롤백 절차"
│   ├── templates/
│   │   ├── task-template.md                    # "작업 할당 템플릿"
│   │   └── issue-template.md                   # "이슈 보고 템플릿"
│   └── schemas/
│       └── manifest.json                       # "프로젝트 메타데이터"
│
├── apps/
│   └── data-cleaner/                           # Application Harness
│       ├── harness/
│       │   ├── docs/
│       │   │   ├── constitution.md             # "이 앱의 헌법"
│       │   │   ├── product-sense.md            # "비즈니스 맥락"
│       │   │   └── architecture.md             # "시스템 구조"
│       │   ├── specs/
│       │   │   ├── api-spec.md                 # "입출력 명세"
│       │   │   ├── validation.md               # "검증 기준"
│       │   │   └── performance.md              # "성능 목표"
│       │   └── schemas/
│       │       └── subtitle.schema.json        # "자막 포맷 스키마"
│       │
│       ├── src/
│       │   ├── __init__.py
│       │   ├── pipeline.py                     # "메인 파이프라인 (300줄 이내)"
│       │   ├── video_processor.py              # "영상 처리 (200줄 이내)"
│       │   ├── subtitle_generator.py           # "자막 생성 (250줄 이내)"
│       │   ├── validators.py                   # "검증 로직 (150줄 이내)"
│       │   └── config.py                       # "설정 관리"
│       │
│       ├── tests/
│       │   ├── __init__.py
│       │   ├── test_pipeline.py                # "파이프라인 테스트"
│       │   ├── test_video_processor.py         # "영상 처리 테스트"
│       │   ├── test_subtitle_generator.py      # "자막 생성 테스트"
│       │   ├── test_validators.py              # "검증 테스트"
│       │   ├── fixtures/
│       │   │   ├── sample_video.mp4            # "테스트 영상"
│       │   │   └── expected_output.srt         # "예상 출력"
│       │   └── conftest.py                     # "pytest 설정"
│       │
│       ├── config/
│       │   ├── config.yaml                     # "런타임 설정"
│       │   ├── names.json                      # "고유명사 사전"
│       │   └── prompts.yaml                    # "Gemini 프롬프트"
│       │
│       ├── examples/
│       │   ├── basic_usage.py                  # "기본 사용법"
│       │   └── batch_processing.py             # "배치 처리 예제"
│       │
│       ├── README.md                           # "앱 개요"
│       └── requirements.txt                    # "의존성"
│
├── .claude/
│   ├── agent.md                                # "AI 운영 가이드"
│   ├── progress.txt                            # "루프 진행 기록"
│   ├── checklist.md                            # "실행 체크리스트"
│   └── issues.md                               # "발견된 이슈"
│
├── .env.example                                # "환경변수 템플릿"
├── .gitignore
├── README.md                                   # "저장소 개요"
├── requirements.txt                            # "의존성"
└── Makefile (선택사항)                          # "편의 명령"
```

### 💡 선택사항: CLAUDE.md와의 연계

하네스 구조를 프로젝트의 `CLAUDE.md` 문서로 정식화하면, Claude Code 사용자들이 프로젝트 규약을 명확히 이해할 수 있다.

#### Repository Harness ↔ CLAUDE.md

**CLAUDE.md의 핵심 섹션:**
```markdown
# CLAUDE.md

## Repository Harness (공통 원칙)
- 파일당 최대 500줄
- 모든 함수에 단위 테스트 필수
- 커밋 메시지: 명사형 (feat: ..., fix: ...)

## Active Projects & Commands
cd data-cleaner
pip install -r requirements.txt
python -m pytest tests/
```

**하네스 문서와의 관계:**
- `harness/core-values.md` → CLAUDE.md의 "Repository Harness"
- `harness/commit-policy.md` → CLAUDE.md의 "Command Quick Reference"
- `harness/workflows/testing.md` → CLAUDE.md의 "Testing Pattern"

#### Application Harness ↔ 프로젝트 Config

**프로젝트별 CLAUDE.md 추가 정보:**
```markdown
## Project: data-cleaner

### Architecture
- Pipeline: data_cleaner/pipeline.py
- Core modules: validators.py, processors.py
- Config: config/config.yaml

### Build Commands
python -m pytest tests/         # 전체 테스트
python main.py --sample        # 샘플 데이터 테스트
python -m pytest --profile=ci  # CI/CD 프로필

### Constitution & Validation
- 헌법: apps/data-cleaner/harness/docs/constitution.md
- 검증 기준: apps/data-cleaner/harness/specs/validation.md
- 진행 기록: .claude/progress.txt
```

**이렇게 하면:**
1. Claude Code 사용자가 처음 프로젝트를 봐도 즉시 하네스 위치와 규약을 파악
2. Repository Harness (공통)와 Application Harness (특수)의 충돌을 명시적으로 관리
3. 팀 규모가 커져도 "어디를 읽어야 하는가"가 명확함

---

## 7. 품질 검증 기준

### 자동화 검증

```python
# tests/test_validators.py
import unittest
from src.validators import validate_subtitle

class TestSubtitleValidation(unittest.TestCase):
    def test_max_length(self):
        """자막이 15자 이내인가"""
        result = validate_subtitle("안녕하세요반갑습니다")
        self.assertFalse(result['valid'])  # 20자 > 15자

    def test_timing_range(self):
        """타이밍이 유효한가"""
        result = validate_subtitle("안녕하세요", timing=(0, 2.5))
        self.assertTrue(result['valid'])

    def test_encoding(self):
        """UTF-8 인코딩인가"""
        result = validate_subtitle("안녕하세요")
        self.assertEqual(result['encoding'], 'utf-8')
```

### 수동 검증 체크리스트

```markdown
# 수동 검증 체크리스트 (PM용)

## 내용 검증
- [ ] 음성 내용과 자막이 100% 일치하는가? (샘플 5개 영상)
- [ ] 고유명사가 올바르게 표기되었는가?
- [ ] 음향 효과가 적절히 표기되었는가?

## 형식 검증
- [ ] 모든 자막이 15자 이내인가?
- [ ] 타이밍이 정확한가? (±100ms)
- [ ] 파일 인코딩이 UTF-8인가?

## 성능 검증
- [ ] 1시간 영상 처리 시간이 5분 이내인가?
- [ ] 메모리 사용량이 4GB 이내인가?
```

---

## 8. 경영학 관점의 정당화

### 하네스와 위임 이론

**경영학의 핵심 원리:**
> "명확한 기준이 있을수록, 권한 위임이 가능해진다."

| 위임 수준 | 특징 | 하네스와의 관계 |
|---------|------|----------------|
| 불가능 | "내 맘대로 해" (모호) | 헌법 없음 |
| 약함 | "괜찮을 것 같으면 해" (불완전) | 헌법 초안 |
| 중간 | "이 틀 안에서 해" (구체화) | ← 우리가 목표하는 수준 |
| 강함 | "완전 자동화" (규칙화) | 고도화된 하네스 |

### 비용 효율

**하네스 없이 100개 작업:**
```
작업 1: 1시간 (결과 A)
작업 2: 1.5시간 (결과 B, 다시 수정)
작업 3: 1시간 (결과 A)
작업 4: 1.5시간 (결과 B, 다시 수정)
...
총 시간: 125시간 (평균 1.25시간/건)
```

**하네스로 100개 작업:**
```
헌법 작성: 4시간
테스트/검증 설정: 3시간
작업 1-100: 0.5시간/건 (자동화) = 50시간
총 시간: 57시간 (평균 0.57시간/건)
절감: 68시간 (54% 절감)
```

### 팀 확장

**1인일 때:**
- 헌법, 검증, 루프를 개인이 담당
- 시간: 짧음, 효율: 높음

**3-5인 팀으로 확장할 때:**
- 헌법: PM이 정의, 모든 팀원이 따름
- 검증: 리뷰 체계 도입
- 루프: 병렬 작업 가능
- 시간: 더 길어질 수 있음, 효율: 높음 (병렬화)

**하네스 없이 확장:**
- 각자 다른 기준으로 작업
- 품질 편차 심함
- 의사소통 비용 증가
- 실패 가능성 높음 ❌

---

## 9. 핵심 요약

### 하네스 = 4가지 요소의 통합

```
헌법 (Constitution)
    ↓ (해석)
작업 구조 (Task Structure)
    ↓ (평가)
검증 기준 (Validation Criteria)
    ↓ (실행)
실행 루프 (Execution Loop)
    ↓ (개선)
[다음 루프로]
```

### 11단계 요약

| 단계 | 키워드 | 결과 |
|------|--------|------|
| 1-5 | 스캐폴드 | 폴더 + Git 준비 |
| 6 | 헌법 작성 | Constitution.md |
| 7 | 평가 | 피드백 수집 |
| 8 | 명확화 | 모호함 제거 |
| 9 | 버전 관리 | 커밋 기록 |
| 10 | 상세화 | AGENT.md 완성 |
| 11 | 루프 | 개선 반복 |

---

## 10. 참고 자료

### 관련 개념
- **위임 이론** (Management Delegation Theory)
- **MBO** (Management By Objectives)
- **PDCA 사이클** (Plan-Do-Check-Act)
- **CI/CD** (Continuous Integration/Deployment)

### 추천 읽기 (향후)
- "The Goal" — Eliyahu Goldratt
- "Accelerate" — Nicole Forsgren
- Claude AI 공식 하네스 엔지니어링 문서

---

## Appendix A. 팀 규모별 하네스 조정

### 1인 운영 (Solo)

**특징:**
- PM = AI 운영자 = 검증자
- 빠른 피드백 루프 가능
- 개인 재량 크다

**하네스 구조:**
```
Harness (간단)
├── constitution.md           # 간단 버전 (1-2페이지)
├── validation.md             # 자동 테스트 중심
└── progress.txt              # 개인 노트
```

**권장 실행 루프:**
- 루프 1회: 1-2시간
- 빈도: 매일 또는 주 3회
- 검증 방식: 자동화 + 샘플 수동

---

### 3-5인 팀 (Small Team)

**특징:**
- PM과 개발자, 검증자 분리
- 명시적 커뮤니케이션 필요
- 일관된 기준 중요

**하네스 구조:**
```
Harness (중간)
├── core/
│   ├── constitution.md
│   ├── roles.md              # 역할 정의 명확화
│   └── escalation.md         # 에스컬레이션 기준
├── validation/
│   ├── automated-checks.py
│   ├── manual-checklist.md
│   └── qa-sign-off.md
└── processes/
    ├── code-review.md
    ├── sprint-planning.md
    └── retrospective.md
```

**권장 실행 루프:**
- 루프 1회: 스프린트 내 2-3회 (주당 4-6시간)
- 빈도: 스프린트 기반 (1-2주)
- 검증 방식: 자동화 + 리뷰 회의

**커뮤니케이션 구조:**
```
PM → 헌법 정의/검증
개발자 ← 구현 / 피드백 요청 →
QA ← 테스트 / 리포트 →
```

---

### 10인 이상 (Large Team)

**특징:**
- 부서별/팀별 하네스 분리
- 공통 저장소 하네스 필수
- 자동화 인프라 중요

**하네스 구조:**
```
Organization Harness
├── core/
│   ├── vision.md
│   ├── core-values.md
│   └── governance.md
├── teams/
│   ├── team-backend/
│   │   ├── constitution.md
│   │   └── validation.md
│   ├── team-frontend/
│   │   ├── constitution.md
│   │   └── validation.md
│   └── team-ops/
│       ├── constitution.md
│       └── validation.md
├── shared/
│   ├── ci-cd-pipeline.yml
│   ├── shared-testing.py
│   └── monitoring.md
└── processes/
    ├── cross-team-coordination.md
    ├── release-process.md
    └── incident-response.md
```

**권장 실행 루프:**
- 루프 1회: 스프린트 내 1회 (주당 2-3시간)
- 빈도: 스프린트 기반
- 검증 방식: 자동화 + 팀별 리뷰 + 정기 감사

**거버넌스:**
```
경영진 (분기 감사)
    ↓
PM (월간 점검)
    ↓
팀 리더 (주간 점검)
    ↓
개발자 (일일 작업)
```

---

## Appendix B. 안티패턴 & 해결책

### 안티패턴 1: 헌법 없이 시작

**증상:**
```
"AI한테 "좀 대충 정리해 줘"라고 하면 알아서 할 줄 알았는데, 매번 다르네"
```

**원인:**
- 헌법이 없으면 AI가 자의적으로 판단
- 같은 프롬프트도 매번 다른 결과
- 기준이 없어서 "좋다/나쁘다"도 판단 불가

**해결책:**
1. **즉시 중단**: 현재 진행 중인 작업 멈추기
2. **헌법 작성**: 최소 목적, 핵심 가치, 논의 불가 항목 정의
3. **재시작**: 헌법을 기반으로 다시 시작
4. **타임라인**: 3-4시간 투자로 이후 반복 작업 50%+ 절감

---

### 안티패턴 2: 검증 기준이 모호함

**증상:**
```
"결과가 '괜찮은 것 같은데' 확신이 안 선다"
"5번 수정해도 같은 문제가 반복된다"
```

**원인:**
- "좋은 품질"을 정량적으로 정의하지 않음
- AI도 "합격선"을 모르므로 자의적 해석
- 매번 다른 기준으로 평가

**해결책:**
```markdown
# Before (모호)
- "좋은 품질의 자막"
- "읽기 쉬운 자막"
- "정확한 음성 인식"

# After (명확)
- 자막 길이: 15자 이내
- 타이밍 오차: ±100ms
- 신뢰도: 0.85 이상
- 테스트 통과율: 95%
```

**실행:**
1. 점수 기반 평가표 만들기 (10점 만점)
2. 최소 합격선 설정 (예: 8점 이상)
3. 불합격 항목별 개선안 명시
4. 자동 테스트 추가

---

### 안티패턴 3: Git 버전 관리 생략

**증상:**
```
"어디서부터 잘못됐는지 모르겠다"
"이전 버전으로 돌아갈 수가 없다"
"누가 뭘 수정했는지 알 수 없다"
```

**원인:**
- 파일 복사본만 남김 (v1, v2, v3...)
- 변경 이력 추적 불가
- 롤백 불가능

**해결책:**
```bash
# ❌ 나쁜 방식
constitution_v1.md
constitution_v1_backup.md
constitution_v1_final.md
constitution_v2.md

# ✅ 좋은 방식
git log --oneline
# 출력:
# a1b2c3d fix: clarify ambiguous rules
# e4f5g6h refactor: apply feedback
# i7j8k9l feat: add constitution v1

# 언제든 이전 버전으로 복구 가능
git revert a1b2c3d
```

**실행:**
1. Git 초기화: `git init`
2. 중요 변경마다 커밋: `git commit -m "..."`
3. 로그 확인: `git log --oneline`
4. 필요시 롤백: `git revert <커밋해시>`

---

### 안티패턴 4: 암묵지 방치

**증상:**
```
"내가 예상한 대로 안 했네"
"왜 이렇게 비효율적인 구현을 했지?"
"이건 내가 당연히 알고 있던 건데..."
```

**원인:**
- 문서에 명시하지 않은 기준들
- "당연히 이렇게 할 줄 알았는데" 가정
- AI는 문서에 없으면 자의적 해석

**해결책:**
```markdown
# Before (암묵지)
"코드는 읽기 쉽게"
"효율적으로"
"사려 깊게"

# After (명시지)
"파일당 500줄, 함수당 30줄"
"불필요한 라이브러리 4개 이상 추가 금지"
"주석은 함수마다 최소 1줄, 복잡한 로직마다 라인 단위"
"변수명: 의미를 담고 3단어 이내"
```

**실행:**
1. AI와 작업하며 의도와 다른 부분 발견
2. 그 부분을 명확한 규칙으로 정의
3. 헌법/AGENT.md에 추가
4. 다음 작업부터 기준 적용

---

## Appendix C. 자동화 체크리스트

### Quick Start 체크리스트 (Step 1-11 완료 기준)

```markdown
# ✅ 하네스 엔지니어링 체크리스트

## Phase 1: 기초 설정 (1-2일)
- [ ] 1. 폴더 구조 생성
- [ ] 2. Git 초기화
- [ ] 3. Python venv 설정
- [ ] 4. README 작성
- [ ] 5. AGENT.md 작성

예상 시간: 2-3시간

## Phase 2: 헌법 & 평가 (1-2일)
- [ ] 6. 헌법 작성 (초안)
- [ ] 7. AI 평가 (다중 관점)
- [ ] 7-1. 평가 피드백 반영
- [ ] Git 커밋 (Step 6-7 완료)

예상 시간: 4-6시간

## Phase 3: 명확화 & 상세화 (1일)
- [ ] 8. 모호한 것 제거
- [ ] 9. Git 커밋 전략 수립
- [ ] 10. AGENT.md 상세화

예상 시간: 2-3시간

## Phase 4: 실행 루프 (반복)
- [ ] 11. 파이프라인 구현 & 테스트
- [ ] 11-1. 첫 루프 결과 분석
- [ ] 11-2. 헌법 수정 및 반영
- [ ] 11-3. 문서 갱신 & Git 커밋
- [ ] 11-4. 루프 2회차 진행
- [ ] 11-5. 회귀 테스트 통과 확인

예상 시간: 1주 (루프당 4-5시간 × 2-3회)

---

## 최종 검증 (모두 Y/N으로 응답)

### 헌법
- [ ] 목적이 명확하고 측정 가능한가?
- [ ] 핵심 가치 3개가 충분히 구체화되었는가?
- [ ] 논의 불가 항목이 정말 "논의 불가"인가?
- [ ] PM이 이것으로 충분히 운영할 수 있다고 느껴지는가?

### 작업 구조
- [ ] 각 단계의 입출력이 명확한가?
- [ ] 예외 상황 처리가 정의되었는가?
- [ ] AI가 "자의적으로" 판단할 여지가 없는가?

### 검증 기준
- [ ] 기준이 정량적인가? (점수, 수치, %)
- [ ] 합격/불합격이 명확하게 구분되는가?
- [ ] 자동화 테스트로 검증 가능한가?

### 실행 루프
- [ ] 결과 확인 → 피드백 → 재검증 → 수정이 명확한 순서인가?
- [ ] 루프 결과가 기록되는가? (progress.txt)
- [ ] 발견된 개선사항이 헌법에 반영되는가?

---

## 점수

모두 Y인 경우: **전체 점수 100/100** ✅ 하네스 엔지니어링 완성!
1개 이상 N인 경우: 해당 항목 개선 후 재검증
```

---

## 추가 자료

### 150자 한줄 요약

> **하네스 엔지니어링 = AI를 팀원으로 운영하기 위한 체계.** 헌법(절대 원칙) + 작업 구조(단계별 명확화) + 검증 기준(정량적 평가) + 실행 루프(개선 반복)의 4가지 요소로 구성. 반복 작업에서 일관된 품질을 유지하고, 팀 확장을 가능하게 하는 경영 기법.

### 추천 시작

**처음부터 완벽할 필요는 없다.**
- 헌법은 "초안"으로 시작해서 루프 중에 개선
- "완벽한 헌법 > 시작"이 아니라 "불완전해도 시작"하는 것이 중요
- 루프를 반복하며 자연스럽게 고도화됨

