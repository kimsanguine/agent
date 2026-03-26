# Contributing to AI PM 가이드

이 가이드에 대한 피드백, 제안, 개선사항을 환영합니다!

---

## 🎯 우리의 목표

실무 PM을 위한 **최신 AI 도구 & 전략 가이드**의 지속적 개선.

매 분기 Anthropic, OpenAI 등의 새로운 기능을 PM 관점에서 빠르게 통합하고, 사용자의 경험 기반 피드백을 반영합니다.

---

## 📝 피드백하는 3가지 방식

### 1️⃣ Issue 제출 (권장) — 가장 효율적

[GitHub Issues](https://github.com/kimsanguine/AI_PM/issues)로 이슈를 열어주세요.

**이슈 유형별 템플릿:**

#### 🐛 오류 보고 (오타, 링크 깨짐)
```
제목: [오류] Part X.Y의 라인 N에 오타

내용:
- 위치: Part X.Y, N줄차
- 현재: "..."
- 수정 제안: "..."
```

**예**: [오류] Part 6.4에서 "Office 자동화"가 "Office 자동화"로 표기

#### ✨ 기술 업데이트 반영 요청
```
제목: [업데이트] Anthropic [날짜] 발표 반영 요청

내용:
- 기능명: Claude [기능]
- 링크: https://...
- PM 관점 의견: "이건 Part X와 관련 있고, 다음과 같이 보강할 수 있을 것 같습니다..."
```

**예**: [업데이트] Claude Code Auto Mode 추가 반영 요청

#### 💡 사용 경험 기반 피드백
```
제목: [경험] Part X를 사용하며 발견한 점

내용:
- 상황: "우리는 에이전트를 구축하고 있고..."
- 도움된 부분: "Part X.Y의 N가지가..."
- 아쉬운 부분: "하지만 이것도 다뤘으면..."
```

**예**: [경험] Part 6.5를 사용하며 Computer Use 신뢰도 이슈 발견

---

### 2️⃣ Pull Request (코드 개선)

코드 예제, 가이드 구조, 템플릿 개선을 위한 PR을 환영합니다.

**PR 체크리스트:**

```
- [ ] 기존 파일 구조 변경 없음 (새 섹션 추가 시에만 Part 파일 수정)
- [ ] 예제 코드 실행 테스트 완료
- [ ] 한글-영문 표기 일관성 유지 (기술용어는 영문)
- [ ] 새 링크/참조 추가 시 VALIDATION_REPORT.md 재실행 완료
- [ ] CHANGELOG.md에 변경사항 기록
```

**PR 예시:**
- Part 3.2의 Python 예제 업데이트 (더 효율적인 로직)
- Part 5의 PRD 템플릿 개선
- 새로운 한국 사례 추가 (부록 A)
- 신규 샘플 데이터 추가 (docs/samples/)

---

### 3️⃣ 직접 연락 (민감한 피드백)

공개하기 어려운 피드백:
- 보안 이슈
- 민감한 비즈니스 정보
- 개인 경험 공유 (이름 비공개 원할 경우)

**이메일**: sanguinekim@anthropic.com (또는 README.md에 표시된 연락처)

---

## 📋 기여 가이드라인

### 원칙

1. **구조 보존**
   - Part 이름/순서 변경 금지
   - 기존 예제/템플릿 보존 (확장은 가능)
   - bridge-modules.md의 의존성 그래프 업데이트 필요 시만 수정

2. **언어 규칙**
   - **한글**: UI 텍스트, 설명, 사례, 의사결정
   - **영문**: 기술용어 (Claude Code, Computer Use, Cowork), 제품명, URL
   - 예: "Claude Code의 원격 제어 (Remote Control) 기능..."

3. **출처 명시**
   - Anthropic 공식 문서 링크 필수
   - 외부 참고자료 인용 시 저작권 표시
   - 새로운 예제는 실행 가능해야 함

4. **검증 프로세스**
   - 새 링크 추가 후 `validate_final_v1.py` 실행 필수
   - 크로스링크 0개 깨짐 확인
   - VALIDATION_REPORT.md 재생성

### 파일 수정 시 체크리스트

```bash
# 1. 변경사항 작성/수정
# (예: Part 6.4의 예제 코드 개선)

# 2. 검증 스크립트 실행
cd /Users/sanguinekim/Documents/3_Code/Vibe/Project/260217_ai_pm
python docs/final_v1/code/validate_final_v1.py

# 3. CHANGELOG.md 업데이트 (있으면)
# [Enhanced] Part X.Y: 설명

# 4. 크로스링크 재확인
# validate_final_v1.py 결과에서 0개 깨짐 확인

# 5. Git 커밋
git add [수정된 파일]
git commit -m "chore: Part X.Y 예제 개선 (설명)"
```

---

## 🚀 매 분기 업데이트 프로세스

이 가이드는 다음 주기로 업데이트됩니다:

1. **월별 피드백 수집** (Issues, PR)
2. **분기말 Anthropic 업데이트 통합** (3월, 6월, 9월, 12월)
3. **신규 버전 릴리스** (v1.1, v1.2, ...)
4. **사용자 피드백 반영** (다음 분기 우선순위)

**현재 스케줄:**
- v1.0: 2026-02-22
- v1.1: 2026-03-26 (Anthropic Q1 통합)
- v1.2: 예상 2026-06-30 (Q2 통합)

---

## 🙏 감사합니다!

모든 피드백은 이 가이드를 더 좋은 자료로 만드는 데 도움이 됩니다.

**제공된 피드백의 예상 반영 시기:**
- 🔴 긴급 (오류, 보안 이슈): 즉시 또는 다음 패치 (v1.1.1, v1.1.2 등)
- 🟡 일반 (예제 개선, 기술 업데이트): 다음 마이너 버전 (v1.2)
- 🟢 제안 (새 섹션, 구조 개선): 다음 메이저 버전 또는 피드백 축적 시

---

## 📚 참고자료

- **GitHub Issues**: https://github.com/kimsanguine/AI_PM/issues
- **CHANGELOG**: [CHANGELOG.md](CHANGELOG.md)
- **검증 스크립트**: [docs/final_v1/code/validate_final_v1.py](docs/final_v1/code/validate_final_v1.py)
- **Anthropic 공식 문서**: https://code.claude.com/

---

**다시 한번 감사합니다! 🌟**
