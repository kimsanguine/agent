#!/bin/bash
# 영어 SRT → 한국어 SRT 번역 실행
# 사용법: bash scripts/translate.sh <영상ID>
#
# 예시:
#   bash scripts/translate.sh EdZWPB1fIJc

set -e

VIDEO_ID="$1"

if [ -z "$VIDEO_ID" ]; then
    echo "사용법: bash scripts/translate.sh <영상ID>"
    echo ""
    echo "등록된 영상 목록:"
    ls videos/ 2>/dev/null || echo "  (없음)"
    exit 1
fi

# 폴더 안에서 영어 원본 SRT 자동 탐지 (_ko.srt 제외)
INPUT=$(find "videos/$VIDEO_ID" -name "*.srt" ! -name "*_ko.srt" 2>/dev/null | head -1)
if [ -z "$INPUT" ]; then
    echo "오류: videos/$VIDEO_ID/ 안에 SRT 파일이 없습니다."
    echo "먼저 download.sh로 영상을 다운로드해주세요."
    exit 1
fi

if [ -z "$GEMINI_API_KEY" ]; then
    echo "오류: GEMINI_API_KEY 환경변수가 설정되지 않았습니다."
    echo "  export GEMINI_API_KEY=your_key"
    exit 1
fi

echo "▶ 한국어 자막 번역 시작: $VIDEO_ID"
python3 scripts/translate_srt.py "$VIDEO_ID"
