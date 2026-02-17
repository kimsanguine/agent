from src.prompt_parser import parse_prompt


def test_parse_prompt_with_hybrid_guided_prompt_fields():
    text = """목표: 고객 문의 처리 자동화
단계: 문의 수집 -> 의도 분류 -> 답변 생성
강조: 응답시간 단축
톤: professional"""

    spec = parse_prompt(text)

    assert spec.title == "고객 문의 처리 자동화"
    assert spec.steps == ["문의 수집", "의도 분류", "답변 생성"]
    assert spec.emphasis == ["응답시간 단축"]
    assert spec.tone == "professional"


def test_parse_prompt_tolerates_spaced_label_format():
    text = """목표 : 고객 문의 처리 자동화
단계 : 문의 수집 -> 의도 분류 -> 답변 생성
강조 : 응답시간 단축
톤 : professional"""

    spec = parse_prompt(text)

    assert spec.title == "고객 문의 처리 자동화"
    assert spec.steps == ["문의 수집", "의도 분류", "답변 생성"]
    assert spec.emphasis == ["응답시간 단축"]
    assert spec.tone == "professional"


def test_parse_prompt_truncates_steps_to_seven_items():
    text = """단계: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8"""

    spec = parse_prompt(text)

    assert spec.steps == ["1", "2", "3", "4", "5", "6", "7"]


def test_parse_prompt_falls_back_for_short_steps_and_missing_emphasis():
    text = """목표: 고객 문의 처리 자동화
단계: 문의 수집 -> 의도 분류"""

    spec = parse_prompt(text)

    assert spec.title == "고객 문의 처리 자동화"
    assert spec.steps == ["문제 정의", "처리", "결과"]
    assert spec.emphasis == ["핵심 메시지"]
    assert spec.tone == "professional"
