# YouTube 강의 한국어 자막 파이프라인

유튜브 영상을 다운로드하고, Whisper로 영어 자막을 생성하고, Gemini API로 한국어로 번역하는 자동화 파이프라인.

---

## 폴더 구조

```
260314_youtube_dubbing/
├── README.md
├── scripts/
│   ├── download.sh        # 영상 다운로드 + 영어 자막 생성
│   ├── translate.sh       # 한국어 번역 실행 래퍼
│   └── translate_srt.py   # Gemini API 번역 스크립트
└── videos/
    └── <영상ID>/              # 유튜브 영상 ID 기준으로 폴더 생성
        ├── title.txt          # 정제된 파일명용 제목
        ├── title_raw.txt      # 원본 영상 제목
        ├── <영상제목>.mp4
        ├── <영상제목>.srt     # Whisper 생성 영어 자막
        └── <영상제목>_ko.srt  # Gemini 번역 한국어 자막
```

파일명은 영상 제목에서 자동 생성됩니다 (소문자, 공백→언더스코어, 특수문자 제거, 최대 60자).

---

## 사전 요구사항

```bash
pip install yt-dlp openai-whisper google-genai
brew install ffmpeg
```

환경변수 설정:
```bash
export GEMINI_API_KEY=your_gemini_api_key
```

---

## 사용 방법

### 원커맨드 실행 (권장)

Claude Code 슬래시 커맨드:
```
/youtube <YouTube URL>
```

예시:
```
/youtube https://www.youtube.com/watch?v=EdZWPB1fIJc
```

### 단계별 직접 실행

#### 1단계: 영상 다운로드 + 영어 자막 생성

```bash
bash scripts/download.sh <YouTube URL>
```

→ 영상 제목을 자동으로 받아 `videos/<영상ID>/<영상제목>.mp4`, `<영상제목>.srt` 생성

#### 2단계: 한국어 자막 번역

```bash
GEMINI_API_KEY=your_key bash scripts/translate.sh <영상ID>
```

또는 직접:
```bash
python3 scripts/translate_srt.py <영상ID>
```

→ `videos/<영상ID>/<영상제목>_ko.srt` 생성

#### 3단계: VLC로 재생

1. VLC 실행 → `<영상제목>.mp4` 열기
2. 메뉴: 자막 → 자막 파일 추가 → `<영상제목>_ko.srt` 선택

---

## 번역 품질

| 항목 | 내용 |
|------|------|
| 모델 | Gemini 2.0 Flash |
| 번역 방식 | 배치 번역 (15개 블록 단위) |
| 타이밍 기준 | 구간 길이(초) × 4.5자/초 목표 |
| 영어 잔존 처리 | 자동 감지 후 최대 3회 재시도 |
| 영어 유지 단어 | Claude Code, API, LLM, AI, agent, deskilling, Anthropic, ChatGPT |
| 번역 품질 | 약 95% (기술 강의 기준) |

### 번역 원칙
- 각 자막 블록을 시간 단편(fragment)으로 취급 — 블록 간 내용 재배치 금지
- 구간 길이에 맞는 한국어 글자수 목표 제공 (더빙 타이밍 최적화)
- 구어체 한국어 사용

### 자막 시작 시점 보정
Whisper는 박수·무음 구간을 첫 발화 블록에 포함시켜 자막이 실제 발화보다 일찍 나타나는 문제가 있습니다.
`translate_srt.py`가 번역 전에 자동으로 감지하여 보정합니다.

- 영어 발화 속도(14자/초) 기준으로 블록 길이 대비 텍스트 양이 3배 이상 차이나면 비정상 판단
- 블록 끝 시간에서 실제 발화 시간을 역산해 시작 시점을 당김 (0.5초 여유 포함)

---

## 주의사항

- 저작권: 내부 교육/학습 목적으로만 사용, 외부 배포 금지
- GPU 없을 경우 Whisper 자막 생성이 느릴 수 있음 (`--model small` 기본 사용)
- Whisper `--task translate`는 영어→한국어가 아닌 X언어→영어 번역임 (오해 주의)
- Gemini API 무료 티어: 분당 15회 제한. 긴 영상(300블록+)은 배치 간 자동 딜레이 및 429 재시도로 처리

---

## 처리된 영상 목록

| 영상 ID | 제목 | 처리일 |
|---------|------|--------|
| EdZWPB1fIJc | Dario Amodei on Claude Code & AI disruption | 2026-03-13 |
| wEsjK3Smovw | From Writing Code to Managing Agents | 2026-03-13 |
| mViFYTwWvcM | Spec-Driven Development: AI Assisted Coding Explained | 2026-03-14 |
| rmvDxxNubIg | No Vibes Allowed: Solving Hard Problems in Complex Codebases | 2026-03-14 |
