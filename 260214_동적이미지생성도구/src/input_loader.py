import json
from pathlib import Path
from typing import Any

from src.normalizer import normalize_items
from src.prompt_parser import parse_prompt
from src.prompt_to_graph import prompt_spec_to_graph
from src.schema import InputChannel


def load_input_graph(
    channel: InputChannel,
    value: str,
    client: Any,
    board_id: str | None,
) -> dict[str, list[dict[str, Any]]]:
    if channel == InputChannel.GRAPH_JSON:
        return json.loads(Path(value).read_text(encoding="utf-8"))

    if channel == InputChannel.PROMPT:
        return prompt_spec_to_graph(parse_prompt(value))

    if channel == InputChannel.PROMPT_FILE:
        text = Path(value).read_text(encoding="utf-8")
        return prompt_spec_to_graph(parse_prompt(text))

    if channel == InputChannel.MIRO_BOARD:
        if client is None or board_id is None:
            raise ValueError("miro-board requires both client and board_id")
        items = client.get_board_items(board_id)
        return normalize_items(items)

    raise ValueError(f"Unsupported input channel: {channel}")
