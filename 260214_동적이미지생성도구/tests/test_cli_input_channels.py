import json
from pathlib import Path
from unittest.mock import patch

from src.cli import get_input_channel_choices, run_poc
from src.schema import InputChannel


def test_get_input_channel_choices_exposes_all_channels():
    assert get_input_channel_choices() == [channel.value for channel in InputChannel]


@patch("src.cli.render_with_remotion")
@patch("src.cli.load_input_graph")
def test_run_poc_uses_channel_and_value_with_loader(mock_load_input_graph, mock_render, tmp_path: Path):
    graph = {
        "nodes": [{"id": "n1", "label": "시작", "type": "shape", "x": 0, "y": 0}],
        "edges": [],
        "timeline": [{"nodeId": "n1", "startFrame": 0, "endFrame": 45}],
    }
    mock_load_input_graph.return_value = graph

    class FakeClient:
        def __init__(self):
            self.embed_calls = []

        def create_embed(self, board_id, target_url):
            self.embed_calls.append((board_id, target_url))
            return "embed_1"

    client = FakeClient()
    out_dir = tmp_path / "artifacts"

    run_poc(
        client=client,
        board_id="uXjVTest",
        out_dir=out_dir,
        render_url="https://cdn.example.com/out.mp4",
        input_channel="prompt",
        input_value="목표: 단일 채널 테스트",
    )

    mock_load_input_graph.assert_called_once_with(
        channel=InputChannel.PROMPT,
        value="목표: 단일 채널 테스트",
        client=client,
        board_id="uXjVTest",
    )

    graph_path = out_dir / "graph.json"
    assert json.loads(graph_path.read_text(encoding="utf-8")) == graph

    mock_render.assert_called_once_with(
        graph_path=graph_path,
        output_video=out_dir / "out.mp4",
        output_still=out_dir / "thumb.png",
    )
    assert client.embed_calls == [("uXjVTest", "https://cdn.example.com/out.mp4")]


@patch("src.cli.render_with_remotion")
@patch("src.cli.load_input_graph")
def test_run_poc_defaults_to_miro_board_channel(mock_load_input_graph, mock_render, tmp_path: Path):
    mock_load_input_graph.return_value = {"nodes": [], "edges": [], "timeline": []}

    class FakeClient:
        def create_embed(self, board_id, target_url):
            return "embed_1"

    out_dir = tmp_path / "artifacts"

    run_poc(
        client=FakeClient(),
        board_id="uXjVDefault",
        out_dir=out_dir,
        render_url="https://cdn.example.com/out.mp4",
    )

    mock_load_input_graph.assert_called_once_with(
        channel=InputChannel.MIRO_BOARD,
        value="uXjVDefault",
        client=mock_load_input_graph.call_args.kwargs["client"],
        board_id="uXjVDefault",
    )
    assert mock_render.called
