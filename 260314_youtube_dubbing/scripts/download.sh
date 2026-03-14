#!/bin/bash
# 유튜브 영상 다운로드 + Whisper 영어 자막 생성
# 사용법: bash scripts/download.sh <YouTube URL>
#
# 예시:
#   bash scripts/download.sh https://www.youtube.com/watch?v=EdZWPB1fIJc

set -e

URL="$1"

if [ -z "$URL" ]; then
    echo "사용법: bash scripts/download.sh <YouTube URL>"
    exit 1
fi

# 영상 ID 추출
VIDEO_ID=$(yt-dlp --get-id "$URL" 2>/dev/null)
if [ -z "$VIDEO_ID" ]; then
    echo "오류: 영상 ID를 추출할 수 없습니다."
    exit 1
fi

# 영상 제목 추출 후 파일명 정제 (특수문자 제거, 공백→언더스코어, 최대 60자)
RAW_TITLE=$(yt-dlp --get-title "$URL" 2>/dev/null)
SAFE_TITLE=$(echo "$RAW_TITLE" \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/[^a-z0-9가-힣 ]//g' \
    | sed 's/  */ /g' \
    | sed 's/ /_/g' \
    | cut -c1-60)

echo "▶ 영상 ID   : $VIDEO_ID"
echo "▶ 영상 제목  : $RAW_TITLE"
echo "▶ 파일명     : $SAFE_TITLE"

OUTPUT_DIR="videos/$VIDEO_ID"
mkdir -p "$OUTPUT_DIR"

# 제목 파일로 저장 (translate.sh에서 참조)
echo "$SAFE_TITLE" > "$OUTPUT_DIR/title.txt"
echo "$RAW_TITLE" > "$OUTPUT_DIR/title_raw.txt"

echo ""
echo "▶ 영상 다운로드..."
yt-dlp -f mp4 "$URL" -o "$OUTPUT_DIR/${SAFE_TITLE}.mp4"

echo ""
echo "▶ Whisper 영어 자막 생성 (small 모델)..."
whisper "$OUTPUT_DIR/${SAFE_TITLE}.mp4" \
    --language en \
    --model small \
    --output_format srt \
    --output_dir "$OUTPUT_DIR"

# whisper가 생성한 .srt 파일을 제목 기반으로 통일
WHISPER_OUT=$(find "$OUTPUT_DIR" -name "*.srt" ! -name "*_ko.srt" | head -1)
TARGET_SRT="$OUTPUT_DIR/${SAFE_TITLE}.srt"
if [ "$WHISPER_OUT" != "$TARGET_SRT" ]; then
    mv "$WHISPER_OUT" "$TARGET_SRT"
fi

echo ""
echo "✅ 완료!"
echo "   영상     : $OUTPUT_DIR/${SAFE_TITLE}.mp4"
echo "   영어 자막 : $OUTPUT_DIR/${SAFE_TITLE}.srt"
echo ""
echo "다음 단계: bash scripts/translate.sh $VIDEO_ID"
