"""
영어 SRT → 한국어 SRT 번역기
Gemini API (gemini-2.0-flash) 사용

사용법:
    python3 scripts/translate_srt.py <영상ID>
    예) python3 scripts/translate_srt.py EdZWPB1fIJc
"""

import glob
import re
import os
import sys
import time
from google import genai

BATCH_SIZE = 15
BATCH_DELAY = 4  # 배치 간 대기(초) — 분당 15회 제한 대응


def parse_srt(filepath: str) -> list[dict]:
    with open(filepath, encoding="utf-8") as f:
        content = f.read().strip()

    blocks = []
    for block in re.split(r"\n\n+", content):
        lines = block.strip().split("\n")
        if len(lines) < 3:
            continue
        blocks.append({
            "index": lines[0],
            "timing": lines[1],
            "text": " ".join(lines[2:]),
        })
    return blocks


def parse_timing(timing: str) -> float:
    """타이밍 문자열에서 구간 길이(초) 계산"""
    parts = timing.split(" --> ")
    def to_sec(t):
        h, m, s = t.replace(",", ".").split(":")
        return int(h)*3600 + int(m)*60 + float(s)
    return to_sec(parts[1]) - to_sec(parts[0])


def sec_to_srt_time(sec: float) -> str:
    """초를 SRT 타임스탬프 형식으로 변환 (HH:MM:SS,mmm)"""
    h = int(sec // 3600)
    m = int((sec % 3600) // 60)
    s = sec % 60
    ms = round((s - int(s)) * 1000)
    return f"{h:02d}:{m:02d}:{int(s):02d},{ms:03d}"


def adjust_block_starts(blocks: list[dict]) -> list[dict]:
    """발화 전 과도한 무음 구간이 있는 블록의 시작 시점을 보정.

    Whisper가 긴 무음(박수 등)을 첫 블록에 포함시켜 자막이 너무 일찍 뜨는 문제를 수정.
    영어 발화 속도 기준으로 텍스트 길이 대비 블록 길이가 비정상적으로 길면
    블록 끝에서 거슬러 올라가 실제 발화 시작 시점으로 start를 당긴다.
    """
    ENGLISH_CPS = 14.0   # 영어 발화 속도 (chars/sec)
    RATIO_LIMIT = 3.0    # 실제 길이 / 예상 발화 시간 비율 임계값
    LEAD_IN = 0.5        # 발화 시작 전 여유 시간(초)

    def end_sec(timing: str) -> float:
        parts = timing.split(" --> ")
        h, m, s = parts[1].replace(",", ".").split(":")
        return int(h)*3600 + int(m)*60 + float(s)

    adjusted = []
    for b in blocks:
        duration = parse_timing(b["timing"])
        text_len = len(b["text"].strip())
        expected = text_len / ENGLISH_CPS if text_len > 0 else 0
        if expected > 0 and duration / expected > RATIO_LIMIT:
            parts = b["timing"].split(" --> ")
            new_start = max(0.0, end_sec(b["timing"]) - expected - LEAD_IN)
            new_timing = f"{sec_to_srt_time(new_start)} --> {parts[1]}"
            adjusted.append({**b, "timing": new_timing})
        else:
            adjusted.append(b)
    return adjusted


def is_english(text: str) -> bool:
    korean_chars = len(re.findall(r"[가-힣]", text))
    total_alpha = len(re.findall(r"[a-zA-Z가-힣]", text))
    if total_alpha == 0:
        return False
    return korean_chars / total_alpha < 0.1


def strip_hint(text: str) -> str:
    """[목표:N자] 힌트 및 번역 앞 넘버링 제거"""
    text = re.sub(r"\[목표:\d+자\]\s*", "", text).strip()
    # 번역 앞에 붙은 "숫자." 리스트 넘버링 제거 (ex: "1. 에이전트..." → "에이전트...")
    text = re.sub(r"^\d+\.\s+", "", text).strip()
    return text


def translate_batch(client: genai.Client, blocks: list[dict], attempt: int = 1) -> list[str]:
    """블록 배치를 한국어로 번역. 타이밍 기반 목표 글자수 계산."""

    # 구간 길이 기반 목표 글자수 (한국어 더빙 발화속도 약 4.5자/초)
    lines_with_hint = []
    for i, b in enumerate(blocks):
        duration = parse_timing(b["timing"])
        target = max(8, int(duration * 4.5))
        lines_with_hint.append(f"{i+1}. [목표:{target}자] {b['text']}")

    numbered = "\n".join(lines_with_hint)

    extra = ""
    if attempt > 1:
        extra = "\n\nCRITICAL RETRY: You MUST output Korean (한글) for EVERY line. No English lines allowed."

    prompt = f"""You are a professional subtitle translator for AI/tech video dubbing.

CRITICAL RULES:
1. Translate each line as a FRAGMENT — do NOT rearrange content between lines.
   Each line is a time-locked segment; the translation must cover the SAME content as the original, nothing more or less.
2. [목표:Nchar] shows the target Korean character count based on the display duration. Aim to get close.
3. Output format: "1. 한국어번역" — number, period, space, then Korean text ONLY.
4. EVERY line must be Korean (한글). Never leave a line in English.
5. Keep in English: Claude Code, API, LLM, AI, agent, deskilling, Anthropic, ChatGPT
6. Use natural spoken Korean (구어체).
7. Do NOT include the [목표:Nchar] hint in your output.
8. Return ONLY the {len(blocks)} numbered lines.{extra}

Subtitle lines to translate:

{numbered}"""

    for retry in range(5):
        try:
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
            )
            break
        except Exception as e:
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                wait = 30 * (retry + 1)
                print(f"  ⏳ API 제한 → {wait}초 대기 후 재시도...")
                time.sleep(wait)
            else:
                raise

    result_text = response.text.strip()
    translations = []
    for line in result_text.split("\n"):
        line = line.strip()
        if not line:
            continue
        match = re.match(r"^\d+\.\s*(.+)$", line)
        if match:
            translations.append(strip_hint(match.group(1)))
        elif re.search(r"[가-힣]", line):
            translations.append(strip_hint(line))

    # 개수 보정
    texts = [b["text"] for b in blocks]
    while len(translations) < len(texts):
        translations.append(texts[len(translations)])
    translations = translations[:len(texts)]

    # 영어 잔존 항목 재시도
    english_indices = [i for i, t in enumerate(translations) if is_english(t)]
    if english_indices and attempt < 3:
        print(f"  ⚠️  {len(english_indices)}개 영어 잔존 → 재번역 (시도 {attempt+1})")
        retry_blocks = [blocks[i] for i in english_indices]
        retry_results = translate_batch(client, retry_blocks, attempt + 1)
        for idx, result in zip(english_indices, retry_results):
            translations[idx] = result

    return translations


def main():
    if len(sys.argv) < 2:
        print("사용법: python3 scripts/translate_srt.py <영상ID>")
        print("예시:  python3 scripts/translate_srt.py EdZWPB1fIJc")
        sys.exit(1)

    video_id = sys.argv[1]
    base_dir = os.path.join("videos", video_id)

    # 폴더 내 영어 원본 SRT 자동 탐지 (_ko.srt 제외)
    srt_candidates = [
        f for f in glob.glob(os.path.join(base_dir, "*.srt"))
        if not f.endswith("_ko.srt")
    ]
    if not srt_candidates:
        print(f"오류: videos/{video_id}/ 안에 SRT 파일이 없습니다.")
        sys.exit(1)

    srt_input = srt_candidates[0]
    base_name = os.path.splitext(os.path.basename(srt_input))[0]
    srt_output = os.path.join(base_dir, f"{base_name}_ko.srt")

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("오류: GEMINI_API_KEY 환경변수가 설정되지 않았습니다.")
        sys.exit(1)

    client = genai.Client(api_key=api_key)

    print(f"▶ 영상 ID: {video_id}")
    print(f"  입력: {srt_input}")
    print(f"  출력: {srt_output}\n")

    blocks = parse_srt(srt_input)
    blocks = adjust_block_starts(blocks)
    print(f"총 {len(blocks)}개 자막 블록 발견\n")

    all_translations = []
    for i in range(0, len(blocks), BATCH_SIZE):
        batch = blocks[i: i + BATCH_SIZE]
        batch_num = i // BATCH_SIZE + 1
        total_batches = (len(blocks) + BATCH_SIZE - 1) // BATCH_SIZE
        print(f"번역 중... 배치 {batch_num}/{total_batches} ({i+1}~{min(i+len(batch), len(blocks))}번)")
        translated = translate_batch(client, batch)
        all_translations.extend(translated)
        if i + BATCH_SIZE < len(blocks):
            time.sleep(BATCH_DELAY)

    # 영어 잔존 리포트
    english_remaining = [
        blocks[i]["index"]
        for i in range(len(blocks))
        if is_english(all_translations[i])
    ]
    if english_remaining:
        print(f"\n⚠️  영어 잔존 {len(english_remaining)}개: {english_remaining}")
    else:
        print("\n✅ 영어 잔존 없음")

    # 저장
    with open(srt_output, "w", encoding="utf-8") as f:
        for block, ko_text in zip(blocks, all_translations):
            f.write(f"{block['index']}\n")
            f.write(f"{block['timing']}\n")
            f.write(f"{ko_text}\n\n")

    print(f"✅ 저장 완료: {srt_output}")


if __name__ == "__main__":
    main()
