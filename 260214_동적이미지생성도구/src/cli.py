import json
from pathlib import Path
from typing import Any

from src.draft_generator import generate_drafts
from src.input_loader import load_input_graph
from src.remotion_bridge import render_with_remotion
from src.schema import InputChannel


def get_input_channel_choices() -> list[str]:
    return [channel.value for channel in InputChannel]


def run_poc(
    client,
    board_id: str,
    out_dir: Path,
    render_url: str,
    input_channel: str = InputChannel.MIRO_BOARD.value,
    input_value: str | None = None,
) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)

    channel = InputChannel(input_channel)
    if input_value is None:
        if channel == InputChannel.MIRO_BOARD:
            input_value = board_id
        else:
            raise ValueError("input_value is required for non-miro channels")

    graph = load_input_graph(
        channel=channel,
        value=input_value,
        client=client,
        board_id=board_id,
    )

    graph_path = out_dir / "graph.json"
    graph_path.write_text(json.dumps(graph, ensure_ascii=False, indent=2), encoding="utf-8")

    render_with_remotion(
        graph_path=graph_path,
        output_video=out_dir / "out.mp4",
        output_still=out_dir / "thumb.png",
        output_webm=out_dir / "out.webm",
        output_gif=out_dir / "out.gif",
    )

    client.create_embed(board_id, render_url)


def run_stage2(
    client,
    board_id: str,
    out_dir: Path,
    render_url: str,
    input_channel: str = InputChannel.MIRO_BOARD.value,
    input_value: str | None = None,
    draft_id: str | None = None,
    strategy: str | None = None,
) -> dict[str, Any]:
    out_dir.mkdir(parents=True, exist_ok=True)

    channel = InputChannel(input_channel)
    if input_value is None:
        if channel == InputChannel.MIRO_BOARD:
            input_value = board_id
        else:
            raise ValueError("input_value is required for non-miro channels")

    base_graph = load_input_graph(
        channel=channel,
        value=input_value,
        client=client,
        board_id=board_id,
    )

    drafts = generate_drafts(base_graph)
    if not drafts:
        raise ValueError("generate_drafts returned no drafts")

    selected_draft = None
    if draft_id is not None:
        selected_draft = next((draft for draft in drafts if draft.get("draft_id") == draft_id), None)
        if selected_draft is None:
            raise ValueError(f"Unknown draft_id: {draft_id}")
    elif strategy is not None:
        selected_draft = next((draft for draft in drafts if draft.get("strategy") == strategy), None)
        if selected_draft is None:
            raise ValueError(f"Unknown strategy: {strategy}")
    else:
        selected_draft = drafts[0]

    selected_graph = selected_draft["graph"]

    graph_path = out_dir / "graph.json"
    graph_path.write_text(json.dumps(selected_graph, ensure_ascii=False, indent=2), encoding="utf-8")

    render_with_remotion(
        graph_path=graph_path,
        output_video=out_dir / "out.mp4",
        output_still=out_dir / "thumb.png",
        output_webm=out_dir / "out.webm",
        output_gif=out_dir / "out.gif",
    )

    client.create_embed(board_id, render_url)

    return {
        "selected_draft_id": selected_draft["draft_id"],
        "selected_strategy": selected_draft["strategy"],
        "drafts": [
            {
                "draft_id": draft["draft_id"],
                "strategy": draft["strategy"],
            }
            for draft in drafts
        ],
    }
