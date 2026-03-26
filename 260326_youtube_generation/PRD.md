# 유튜브 콘텐츠 자동 생성 파이프라인

## 개요

레퍼런스 영상 분석부터 최종 영상 출력까지, 유튜브 콘텐츠 제작 전 과정을 자동화하는 파이프라인.
텍스트 기반 콘텐츠(팩트/나레이션형 영상)를 대상으로 한다.

---

## 파이프라인 단계 (11단계)

### 1단계: 레퍼런스 수집 (`reference`)
- **입력**: 유튜브 URL 3~5개 (같은 주제의 인기 영상)
- **처리**: 각 영상의 자막 추출 + 메타데이터(조회수, 좋아요, 댓글수) 수집
- **출력**: `reference/` 폴더
  - `video_01.json` ~ `video_05.json` (자막 + 메타데이터)
  - `analysis_summary.md` (공통 패턴, 핵심 키워드, 평균 길이 등)
- **도구**: yt-dlp, YouTube Data API

### 2단계: 팩트체크 + 패턴 분석 (`research`)
- **입력**: 레퍼런스 분석 결과 + 사용자 지정 주제
- **처리**:
  - 레퍼런스 영상에서 주장/팩트 추출 → 교차 검증
  - 성공 패턴 분석 (훅 유형, 구성, 길이, 톤)
- **출력**:
  - `verified-data.md` (검증된 팩트/데이터)
  - `patterns.md` (패턴 분석 결과)
- **도구**: Claude API (분석), 웹 검색 (팩트체크)

### 3단계: 컨셉 + 훅 설계 (`concept`)
- **입력**: 검증된 데이터 + 패턴 분석
- **처리**:
  - 영상 컨셉 결정 (각도, 타겟, 톤)
  - 첫 30초 훅 설계 (3가지 후보)
  - 인트로 스크립트 작성
- **출력**:
  - `concept.md` (컨셉 문서)
  - `hook-intro.md` (훅 + 인트로 후보 3종)
- **도구**: Claude API

### 4단계: 아웃라인 (`outline`)
- **입력**: 컨셉 + 훅 + 검증 데이터
- **처리**: 영상 전체 구조 설계
- **출력**:
  - `outline.md` (10~15개 섹션, 각 섹션별 핵심 포인트 + 예상 시간)
- **도구**: Claude API

### 5단계: 대본 작성 (`script`)
- **입력**: 아웃라인 + 검증 데이터 + 패턴
- **처리**:
  - 초안 작성 (draft.md)
  - 구어체 변환 + 길이 조절
  - 최종 대본 생성
- **출력**:
  - `draft.md` (초안)
  - `script.txt` (최종 나레이션 대본, 목표 3,000~5,000자)
- **도구**: Claude API
- **제약**: 목표 영상 길이(분) × 650자 = 대본 글자수

### 6단계: TTS 음성 생성 (`tts`)
- **입력**: script.txt
- **처리**:
  - 텍스트를 자연스러운 한국어 음성으로 변환
  - 자막 파일 동시 생성
- **출력**:
  - `audio.mp3` (나레이션 음성)
  - `subtitle.srt` (타임코드 포함 자막)
- **도구**: Google Cloud TTS / OpenAI TTS / ElevenLabs
- **제약**: 목표 6~10분 영상

### 7단계: 스토리보드 (`storyboard`)
- **입력**: script.txt + subtitle.srt
- **처리**:
  - 대본을 씬 단위로 분할
  - 각 씬별 이미지 프롬프트 생성
  - 타임코드 매핑
- **출력**:
  - `storyboard.json`
    ```json
    {
      "scenes": [
        {
          "id": 1,
          "start_time": "00:00:00",
          "end_time": "00:00:22",
          "narration": "대본 해당 부분...",
          "image_prompt": "이미지 생성 프롬프트...",
          "visual_style": "cinematic, warm tone",
          "text_overlay": "화면에 표시할 텍스트"
        }
      ]
    }
    ```
- **도구**: Claude API

### 8단계: 이미지 생성 (`images`)
- **입력**: storyboard.json
- **처리**: 각 씬의 이미지 프롬프트로 이미지 생성
- **출력**:
  - `scenes/scene_01.png` ~ `scene_XX.png`
- **도구**: DALL-E 3 / Midjourney API / Flux
- **제약**: 16:9 비율 (1920×1080), 일관된 스타일 유지

### 9단계: 영상 조합 (`compose`)
- **입력**: audio.mp3 + subtitle.srt + scene_XX.png
- **처리**:
  - 이미지 + 오디오 + 자막 합성
  - 트랜지션/줌 효과 적용
  - CapCut 호환 프로젝트 파일 생성 (수동 편집 지원)
- **출력**:
  - `draft_content.json` (CapCut 프로젝트 파일)
  - `output/final.mp4` (자동 조합 버전)
- **도구**: FFmpeg, moviepy
- **CapCut JSON**: 수동 미세 조정이 필요한 경우 CapCut에서 import

### 10단계: 유튜브 메타데이터 (`metadata`)
- **입력**: 컨셉 + 대본 + 패턴 분석
- **처리**:
  - SEO 최적화 제목 생성 (후보 5개)
  - 설명문 작성 (챕터 타임스탬프 포함)
  - 태그 30개 생성
  - 카테고리 추천
- **출력**:
  - `youtube.md`
    ```
    ## 제목 (후보)
    1. ...
    2. ...

    ## 설명
    ...

    ## 태그
    ...

    ## 카테고리
    ...
    ```
- **도구**: Claude API

### 11단계: 썸네일 생성 (`thumbnail`)
- **입력**: 제목 + 컨셉 + 핵심 이미지
- **처리**:
  - 클릭을 유도하는 썸네일 디자인 5종 생성
  - 텍스트 오버레이 + 이미지 합성
- **출력**:
  - `thumbnails/thumbnail_01.png` ~ `thumbnail_05.png`
- **도구**: 이미지 생성 API + Pillow (텍스트 합성)
- **제약**: 1280×720, 2MB 이하

---

## 폴더 구조

```
channels/
└── {채널명}/
    └── projects/
        └── {프로젝트명}/
            ├── config.yaml          # 프로젝트 설정 (주제, 타겟, 톤 등)
            ├── reference/
            │   ├── video_01.json
            │   └── analysis_summary.md
            ├── research/
            │   ├── verified-data.md
            │   └── patterns.md
            ├── concept/
            │   ├── concept.md
            │   └── hook-intro.md
            ├── outline/
            │   └── outline.md
            ├── script/
            │   ├── draft.md
            │   └── script.txt
            ├── tts/
            │   ├── audio.mp3
            │   └── subtitle.srt
            ├── storyboard/
            │   └── storyboard.json
            ├── scenes/
            │   ├── scene_01.png
            │   └── ...
            ├── compose/
            │   └── draft_content.json
            ├── metadata/
            │   └── youtube.md
            ├── thumbnails/
            │   ├── thumbnail_01.png
            │   └── ...
            └── output/
                ├── final.mp4
                ├── youtube.md
                └── thumbnails/
```

---

## 실행 방식

### CLI 명령어

```bash
# 전체 파이프라인 실행
python youtube_gen.py run --channel "B채널" --project "조선미식" --topic "조선시대 궁중 음식"

# 특정 단계만 실행
python youtube_gen.py run --channel "B채널" --project "조선미식" --step reference
python youtube_gen.py run --channel "B채널" --project "조선미식" --step script

# 특정 단계부터 이어서 실행
python youtube_gen.py run --channel "B채널" --project "조선미식" --from storyboard

# 상태 확인
python youtube_gen.py status --channel "B채널" --project "조선미식"
```

### config.yaml 예시

```yaml
channel: "B채널"
project: "조선미식"
topic: "조선시대 궁중 음식의 비밀"
target_audience: "역사/음식에 관심 있는 20~40대"
tone: "흥미로운 다큐멘터리"
target_duration_minutes: 8
language: "ko"

reference_urls:
  - "https://youtube.com/watch?v=..."
  - "https://youtube.com/watch?v=..."
  - "https://youtube.com/watch?v=..."

tts:
  provider: "openai"       # openai | google | elevenlabs
  voice: "nova"
  speed: 1.0

image:
  provider: "dall-e-3"     # dall-e-3 | flux | midjourney
  style: "cinematic"
  resolution: "1920x1080"

api_keys:
  claude: "${ANTHROPIC_API_KEY}"
  openai: "${OPENAI_API_KEY}"
  youtube: "${YOUTUBE_API_KEY}"
```

---

## 기술 스택

| 구분 | 도구 |
|------|------|
| 언어 | Python 3.11+ |
| 레퍼런스 수집 | yt-dlp, YouTube Data API v3 |
| AI 분석/생성 | Claude API (Sonnet 4.6) |
| 팩트체크 | 웹 검색 API (Google/Tavily) |
| TTS | OpenAI TTS / Google Cloud TTS / ElevenLabs |
| 이미지 생성 | DALL-E 3 / Flux |
| 영상 조합 | FFmpeg, moviepy |
| 썸네일 | Pillow + 이미지 생성 API |
| 프로젝트 관리 | YAML 기반 config |

---

## 파이프라인 상태 관리

각 단계의 완료 여부를 `pipeline_state.json`으로 관리:

```json
{
  "channel": "B채널",
  "project": "조선미식",
  "created_at": "2026-03-26T10:00:00",
  "steps": {
    "reference": { "status": "completed", "completed_at": "..." },
    "research": { "status": "completed", "completed_at": "..." },
    "concept": { "status": "running", "started_at": "..." },
    "outline": { "status": "pending" },
    "script": { "status": "pending" },
    "tts": { "status": "pending" },
    "storyboard": { "status": "pending" },
    "images": { "status": "pending" },
    "compose": { "status": "pending" },
    "metadata": { "status": "pending" },
    "thumbnail": { "status": "pending" }
  }
}
```

---

## 우선순위 및 구현 계획

### Phase 1: 텍스트 파이프라인 (핵심)
1. 레퍼런스 수집 (yt-dlp 자막 추출)
2. 팩트체크 + 패턴 분석 (Claude API)
3. 컨셉 + 훅 설계 (Claude API)
4. 아웃라인 (Claude API)
5. 대본 작성 (Claude API)
6. 유튜브 메타데이터 (Claude API)

→ 대본까지만으로도 즉시 가치 창출 가능

### Phase 2: 미디어 생성
7. TTS 음성 생성
8. 스토리보드
9. 이미지 생성
10. 썸네일 생성

### Phase 3: 영상 조합
11. FFmpeg/moviepy 자동 합성
12. CapCut 프로젝트 파일 export

---

## 스크린샷 원본 파이프라인 매핑

| # | 스크린샷 단계 | 출력물 | 본 PRD 단계 |
|---|-------------|--------|------------|
| 1 | 레퍼런스 수집 | 영상 3개 분석 완료 | `reference` |
| 2 | 팩트체크 + 패턴 분석 | verified-data.md, patterns.md | `research` |
| 3 | 컨셉 + 훅 설계 | concept.md, hook-intro.md | `concept` |
| 4 | 아웃라인 | outline.md (12개 섹션) | `outline` |
| 5 | 대본 작성 | draft.md → script.txt (3,847자) | `script` |
| 6 | TTS | audio.mp3 (6분 32초) + subtitle.srt | `tts` |
| 7 | 스토리보드 | storyboard.json (18개 씬) | `storyboard` |
| 8 | 이미지 생성 | scene_01.png ~ scene_18.png | `images` |
| 9 | CapCut 프로젝트 | draft_content.json | `compose` |
| 10 | 유튜브 메타데이터 | youtube.md (제목/설명/태그) | `metadata` |
| 11 | 썸네일 | thumbnail_01~05.png | `thumbnail` |
