# 260216_PDF번역도구

영문 논문 PDF를 한국어 논문 PDF로 변환하고 아카이빙하기 위한 프로젝트입니다.

## 구현 범위 (현재)

- M1 + M2 기본 파이프라인
  - 입력 PDF 검증 (FR-001)
  - 객체 추출 매니페스트 + 레이아웃 블록 분할
  - Review1 패키지 생성 (checklist + asset index)
  - Gemini 기반 블록 번역 + glossary 임계치(0.90) 분류
  - 레이아웃 기반 재합성 + 버전 파일 출력 (`{원문명}_ko_v{n}.pdf`)
  - 진행 상태 저장/재개 (`progress.json`)

## 설치

### 1) 런타임 환경
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install -e .
```

### 2) 개발/테스트 환경
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements-dev.txt
pip install -e .
```

## 환경변수

```bash
cp .env.example .env
```

`.env`의 필수 값:

- `GEMINI_API_KEY`

고정 정책(v1):

- `PARALLEL_WORKERS=4`
- `GLOSSARY_AUTO_ACCEPT_THRESHOLD=0.90`
- `ALLOW_OVERWRITE=false`

## CLI 사용법

### 1) Review1까지만 실행
```bash
python -m pdf_translator.cli run --input input/sample.pdf --stop-after review1
```

생성 결과:

- `output/runs/<run_id>/asset_manifest.json`
- `output/runs/<run_id>/segments.json`
- `output/runs/<run_id>/review1_checklist.md`
- `output/runs/<run_id>/review1_asset_index.md`
- `output/runs/<run_id>/progress.json`

### 2) 재개 실행
```bash
python -m pdf_translator.cli run --resume
```

또는 특정 run 재개:

```bash
python -m pdf_translator.cli run --resume --run-id <run_id>
```

### 3) 전체 실행 (번역 + 합성)
```bash
python -m pdf_translator.cli run --input input/sample.pdf
```

출력 파일 규칙:

- `output/{원문명}_ko_v1.pdf`
- 기존 파일이 있으면 자동으로 `v2`, `v3` 증가
- overwrite 금지

### 4) 산출물 검증
```bash
python -m pdf_translator.cli verify-run --run-id <run_id>
```

## 테스트/검증

```bash
ruff check src tests
pytest -q tests/unit
pytest -q tests/integration --maxfail=1
```

## 디렉토리 구조

```text
src/pdf_translator/
  config.py
  cli.py
  pipeline/
  extract/
  translate/
  compose/

tests/
  unit/
  integration/

input/
output/
```
