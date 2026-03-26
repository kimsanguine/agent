# CHANGELOG — AI PM 가이드

모든 주목할만한 변경사항은 이 파일에 기록됩니다.

이 프로젝트는 [Semantic Versioning](https://semver.org/)을 따릅니다.

---

## [v1.1.0] — 2026-03-26

### ✨ New Features (8개 신규 섹션 추가)

#### Part 1: 기본 개념
- **1.4: Claude Code vs Cowork IDE** (353줄, 10KB)
  - IDE 선택 기준: 에이전트 구축 단계별 최적 도구 선택
  - Claude Code (커맨드라인, 원격 제어, 자동화)
  - Cowork (협업, 프로젝트 관리, 실시간 동기화)
  - 의사결정 매트릭스 & 전환 시점

#### Part 2: 기본 개념 심화
- **2.3: Claude Memory를 활용한 프로젝트 메모리 설계** (810줄, 27KB) — 확장
  - Claude Memory 구조 (Recall/Request Memory 분리)
  - 메모리 기반 에이전트 지시어 자동 업데이트
  - TK (Tacit Knowledge) 축적 및 주입 전략
  - 프로젝트 메모리 아키텍처 설계 (문맥/의사결정/성과 레이어)

#### Part 3: 고급 설정
- **3.7: AI 팀 규모화 및 자동화 설계** (536줄, 15KB)
  - 1명 → 5명 → 25명 → 100명 조직 전환점
  - 에이전트 팀 구조 (Tier 1~5)
  - 협업 도구 선택 (Cowork Projects, Dispatch)
  - 의사결정 자동화 (PM-ENGINE, Claude Memory 연계)

#### Part 6: 실행 (신규 3개 섹션)
- **6.4: Office 자동화 전략** (466줄, 11KB)
  - PowerPoint 자동화 (Claude in PowerPoint)
  - Excel 자동화 (Claude in Excel)
  - 실무 PM 업무 효율화 (보고서, 데이터 분석, 프레젠테이션)
  - 에이전트 대시보드 생성 자동화

- **6.5: Computer Use 기능 활용** (489줄, 13KB)
  - Computer Use API 개요
  - PM 관점: 자동화 가능한 UI 작업
  - 브라우저 기반 작업 자동화 (데이터 수집, 폼 작성)
  - 신뢰도 & 비용 고려사항 (마우스/키보드 입력 오류율, 토큰 사용)

- **6.6: Claude Code Review 통합 워크플로우** (619줄, 17KB)
  - Claude Code Review 기능 (코드 품질, 보안, 성능)
  - CI/CD 파이프라인 통합
  - 에이전트 코드 신뢰도 향상
  - Review 커스터마이징 (스타일 가이드, 보안 정책)

#### Part 7: 성장
- **7.5: Claude Marketplace 전략** (476줄, 14KB)
  - Claude Marketplace 비즈니스 모델
  - 에이전트 마켓플레이스 출시 가이드
  - 수익 분배 & 계약 구조
  - 성공 사례 (고객 확보, 가격 설정)

#### Part 8: 엔터프라이즈
- **8.3: Cowork Enterprise 스케일링** (460줄, 14KB)
  - Cowork Enterprise 기능 (관리, 감사, SSO)
  - 팀별 권한 관리 (역할, 파일 접근)
  - 대규모 협업 워크플로우
  - 엔터프라이즈 보안 & 규정 준수

### 🔄 Enhanced (1개 섹션 확장)
- **Part 2.3**: Claude Memory + TK 시스템 연계 확장
  - 라인 수: 기존 300줄 → 810줄 (+170%)
  - 추가 내용: 메모리 레이어, 자동 지시어 업데이트, 실전 사례

### 📊 Metrics
| 항목 | v1.0 | v1.1 | 변화 |
|------|------|------|------|
| **파일** | 40개 | 48개 | +8개 (+20%) |
| **라인** | 16K | 21.4K | +5.4K (+33%) |
| **섹션** | 40개 | 48개 | +8개 |
| **크로스링크** | 검증 완료 | 96개 | 0개 깨짐 ✅ |
| **저작권** | 완료 | 완료 | 100% |
| **검증 상태** | PASS | PASS | 2건 경미 이슈 기록 |

### 📚 콘텐츠 맥락
8개 신규 섹션은 Anthropic 2026년 Q1 발표 26개 업데이트를 PM 관점에서 통합:
- **Claude Code 강화**: Remote Control, Code Review, Auto Mode
- **Cowork/IDE**: Plugin, Enterprise, Projects, Scheduled Tasks
- **모델**: Opus 4.6, Sonnet 4.6, 1M 토큰 컨텍스트
- **기능**: Claude Memory, Computer Use, Office 통합, Marketplace

---

## [v1.0.0] — 2026-02-22

### ✨ Initial Release
- **콘텐츠**: 8개 Part + 10개 부록 (실전 시나리오)
- **파일**: 40개 (총 16K줄)
- **구조**: Part 간 의존성 그래프 (bridge-modules.md)
- **검증**: 크로스링크 100%, 저작권 표시 완료
- **산출물**: Python 유틸 5개, 샘플 데이터 4개, 템플릿 5개

### 📚 콘텐츠
| Part | 제목 | 파일 수 | 내용 |
|------|------|---------|------|
| **1** | 기본 개념 | 3개 | Claude Code 기초, AI 도구 선택, 에이전트 이해 |
| **2** | 기본 심화 | 6개 | 프롬프트 엔지니어링, 맥락 관리, 멀티모델 라우팅, 비용 계산 |
| **3** | 고급 설정 | 7개 | 1M 토큰 시대, 에이전트 아키텍처, 자동화 설계 |
| **4** | 발견 | 2개 | 기회 발굴, 가정 검증 |
| **5** | 정의 | 2개 | PRD 작성, 로드맵 수립 |
| **6** | 실행 | 3개 | 에이전트 설계, 테스트, 배포 |
| **7** | 성장 | 5개 | OKR 정의, A/B 테스트, 비용 최적화, 마켓플레이스 준비 |
| **8** | 엔터프라이즈 | 3개 | 규모화, 보안, 거버넌스 |
| **A** | 시나리오 | 10개 | 실전 사례 (SaaS, Fintech, Healthcare 등) |

---

## 버저닝 규칙

- **Major** (1.0.0): 전체 콘텐츠 재구성, 구조 변경
- **Minor** (0.1.0): 신규 섹션/기능 추가
- **Patch** (0.0.1): 오류 수정, 예제 개선, 링크 업데이트

---

## 피드백 & 개선

각 버전 업데이트는 다음을 포함합니다:
- Anthropic 분기별 업데이트 (신기능 & 모델 개선)
- 사용자 피드백 (Issues, PR)
- 코드 예제 개선 (실행 및 테스트 완료)

[CONTRIBUTING.md](CONTRIBUTING.md)에서 피드백 방식을 확인하세요.
