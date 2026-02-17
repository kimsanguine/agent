import re

from src.schema import PromptSpec


_DEFAULT_TITLE = "인포그래픽"
_DEFAULT_STEPS = ["문제 정의", "처리", "결과"]
_DEFAULT_EMPHASIS = ["핵심 메시지"]
_DEFAULT_TONE = "professional"
_LABEL_PATTERN = re.compile(r"^(목표|단계|강조|톤)\s*:\s*(.*)$")


def parse_prompt(text: str) -> PromptSpec:
    title = _DEFAULT_TITLE
    steps: list[str] = []
    emphasis_item = ""
    tone = _DEFAULT_TONE

    for raw_line in text.splitlines():
        line = raw_line.strip()
        match = _LABEL_PATTERN.match(line)

        if not match:
            continue

        label, value = match.groups()
        value = value.strip()

        if label == "목표" and value:
            title = value
            continue

        if label == "단계":
            parsed_steps = [step.strip() for step in value.split("->") if step.strip()]
            steps = parsed_steps[:7]
            continue

        if label == "강조" and value:
            emphasis_item = value
            continue

        if label == "톤" and value:
            tone = value

    if len(steps) < 3:
        steps = _DEFAULT_STEPS.copy()

    emphasis = [emphasis_item] if emphasis_item else _DEFAULT_EMPHASIS.copy()

    return PromptSpec(title=title, steps=steps, emphasis=emphasis, tone=tone)
