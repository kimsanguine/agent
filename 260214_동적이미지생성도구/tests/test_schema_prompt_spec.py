from dataclasses import fields

from src.schema import InputChannel, PromptSpec


def test_prompt_spec_and_input_channel_contracts():
    assert [channel.value for channel in InputChannel] == [
        "prompt",
        "prompt-file",
        "graph-json",
        "miro-board",
    ]

    assert [field.name for field in fields(PromptSpec)] == [
        "title",
        "steps",
        "emphasis",
        "tone",
    ]

    spec = PromptSpec(
        title="Title",
        steps=["step1", "step2"],
        emphasis=["clarity"],
        tone="neutral",
    )

    assert spec.title == "Title"
    assert spec.steps == ["step1", "step2"]
    assert spec.emphasis == ["clarity"]
    assert spec.tone == "neutral"
