# requirements.md

영문 논문 PDF → 한국어 논문 PDF 번역/아카이빙 에이전트(v1) 구현을 위한 요구사항 정리 문서입니다.

## 1) 시스템 요구사항

- Python: **3.13+**
- OS: macOS / Linux 권장
- 패키지 매니저: `pip` 또는 `uv`
- (선택) OCR 로컬 백업 사용 시: `tesseract` 바이너리 설치 필요

---

## 2) Python 의존성

## 2.1 필수 의존성 (v1)

- `google-genai` (Gemini API)
- `PyMuPDF` (PDF 레이아웃/객체 처리)
- `pdfplumber` (텍스트/테이블 추출 보조)
- `reportlab` (PDF 합성 보조)
- `python-dotenv` (환경변수 로딩)
- `pydantic` (설정/스키마 검증)
- `tenacity` (재시도 정책)

## 2.2 개발/테스트 권장

- `pytest`
- `pytest-cov`
- `ruff`

## 2.3 선택 의존성 (Fallback/확장)

- `google-cloud-vision` (OCR fallback)
- `azure-ai-documentintelligence` (OCR 대체 fallback)
- `deepl` (번역 대체 fallback)
- `pytesseract` (로컬 OCR fallback)

---

## 3) 외부 API/서비스 요구사항

## 3.1 Primary (필수)

- **Google Gemini API**
  - 키: `GEMINI_API_KEY`
  - 기본 모델: `gemini-2.0-flash`

## 3.2 OCR Fallback (선택)

- **Google Cloud Vision API**
  - `GOOGLE_CLOUD_PROJECT`
  - `GOOGLE_APPLICATION_CREDENTIALS` (서비스 계정 JSON 경로)

## 3.3 Contingency (선택)

- Azure Document Intelligence
- DeepL API

---

## 4) 운영 기본값 (PRD 정합)

- 병렬 워커 수: `4`
- glossary 자동 채택 임계치: `0.90`
- 재시도 횟수: `3`
- 버전 규칙: `{원문명}_ko_v{n}.pdf`
- overwrite 금지, 수정 시 `v+1`

---

## 5) 설치 예시

```bash
python -m venv venv
source venv/bin/activate
pip install \
  google-genai PyMuPDF pdfplumber reportlab python-dotenv pydantic tenacity \
  pytest pytest-cov ruff
```

OCR/대체 API를 쓸 경우 필요한 선택 의존성을 추가 설치합니다.

---

## 6) 체크리스트

- [ ] `.env`에 필수 키 설정 (`GEMINI_API_KEY`)
- [ ] 모델/워커/임계치 값이 PRD와 일치
- [ ] Fallback 사용 시 관련 키/크레덴셜 설정
- [ ] 테스트 환경에서 PDF 입출력 경로 권한 확인
