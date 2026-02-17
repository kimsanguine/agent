import json
from pathlib import Path

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
    )

    client.create_embed(board_id, render_url)
