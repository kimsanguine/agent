from src.schema import PromptSpec


_DEFAULT_TITLE = "인포그래픽"
_DEFAULT_STEPS = ["문제 정의", "처리", "결과"]
_DEFAULT_EMPHASIS = ["핵심 메시지"]
_DEFAULT_TONE = "professional"


def parse_prompt(text: str) -> PromptSpec:
    title = _DEFAULT_TITLE
    steps: list[str] = []
    emphasis_item = ""
    tone = _DEFAULT_TONE

    for raw_line in text.splitlines():
        line = raw_line.strip()

        if line.startswith("목표:"):
            value = line.split(":", 1)[1].strip()
            if value:
                title = value
            continue

        if line.startswith("단계:"):
            value = line.split(":", 1)[1].strip()
            parsed_steps = [step.strip() for step in value.split("->") if step.strip()]
            steps = parsed_steps[:7]
            continue

        if line.startswith("강조:"):
            value = line.split(":", 1)[1].strip()
            if value:
                emphasis_item = value
            continue

        if line.startswith("톤:"):
            value = line.split(":", 1)[1].strip()
            if value:
                tone = value

    if len(steps) < 3:
        steps = _DEFAULT_STEPS.copy()

    emphasis = [emphasis_item] if emphasis_item else _DEFAULT_EMPHASIS.copy()

    return PromptSpec(title=title, steps=steps, emphasis=emphasis, tone=tone)
