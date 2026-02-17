import json
from pathlib import Path
from unittest.mock import patch

from src.cli import run_poc, run_stage2
from src.schema import InputChannel


def _base_graph() -> dict[str, list[dict[str, object]]]:
    return {
        "nodes": [{"id": "n1", "label": "Base", "type": "shape", "x": 0, "y": 0}],
        "edges": [],
        "timeline": [{"nodeId": "n1", "startFrame": 0, "endFrame": 45}],
    }


def _drafts() -> list[dict[str, object]]:
    return [
        {
            "draft_id": "draft-1",
            "strategy": "pipeline_flow",
            "graph": {
                "nodes": [{"id": "n1", "label": "Draft1", "type": "shape", "x": 0, "y": 0}],
                "edges": [],
                "timeline": [{"nodeId": "n1", "startFrame": 0, "endFrame": 45}],
            },
        },
        {
            "draft_id": "draft-2",
            "strategy": "loop_feedback",
            "graph": {
                "nodes": [{"id": "n2", "label": "Draft2", "type": "shape", "x": 60, "y": 30}],
                "edges": [],
                "timeline": [{"nodeId": "n2", "startFrame": 0, "endFrame": 45}],
            },
        },
        {
            "draft_id": "draft-3",
            "strategy": "hub_spoke",
            "graph": {
                "nodes": [{"id": "n3", "label": "Draft3", "type": "shape", "x": 120, "y": 60}],
                "edges": [],
                "timeline": [{"nodeId": "n3", "startFrame": 0, "endFrame": 45}],
            },
        },
    ]


@patch("src.cli.render_with_remotion")
@patch("src.cli.generate_drafts")
@patch("src.cli.load_input_graph")
def test_run_stage2_generates_three_drafts_and_renders_selected_default(
    mock_load_input_graph,
    mock_generate_drafts,
    mock_render,
    tmp_path: Path,
):
    mock_load_input_graph.return_value = _base_graph()
    mock_generate_drafts.return_value = _drafts()

    class FakeClient:
        def __init__(self) -> None:
            self.embed_calls: list[tuple[str, str]] = []

        def create_embed(self, board_id: str, target_url: str):
            self.embed_calls.append((board_id, target_url))
            return "embed_1"

    client = FakeClient()
    out_dir = tmp_path / "artifacts"

    result = run_stage2(
        client=client,
        board_id="uXjVStage2",
        out_dir=out_dir,
        render_url="https://cdn.example.com/out.mp4",
        input_channel="prompt",
        input_value="목표: stage2 테스트",
    )

    mock_load_input_graph.assert_called_once_with(
        channel=InputChannel.PROMPT,
        value="목표: stage2 테스트",
        client=client,
        board_id="uXjVStage2",
    )
    mock_generate_drafts.assert_called_once_with(_base_graph())

    graph_path = out_dir / "graph.json"
    assert json.loads(graph_path.read_text(encoding="utf-8")) == _drafts()[0]["graph"]

    mock_render.assert_called_once_with(
        graph_path=graph_path,
        output_video=out_dir / "out.mp4",
        output_still=out_dir / "thumb.png",
    )
    assert client.embed_calls == [("uXjVStage2", "https://cdn.example.com/out.mp4")]

    assert result["selected_draft_id"] == "draft-1"
    assert result["selected_strategy"] == "pipeline_flow"
    assert result["drafts"] == [
        {"draft_id": "draft-1", "strategy": "pipeline_flow"},
        {"draft_id": "draft-2", "strategy": "loop_feedback"},
        {"draft_id": "draft-3", "strategy": "hub_spoke"},
    ]


@patch("src.cli.render_with_remotion")
@patch("src.cli.generate_drafts")
@patch("src.cli.load_input_graph")
def test_run_stage2_explicit_draft_selection_picks_correct_draft(
    mock_load_input_graph,
    mock_generate_drafts,
    mock_render,
    tmp_path: Path,
):
    mock_load_input_graph.return_value = _base_graph()
    mock_generate_drafts.return_value = _drafts()

    class FakeClient:
        def create_embed(self, board_id: str, target_url: str):
            return "embed_1"

    out_dir = tmp_path / "artifacts"

    result = run_stage2(
        client=FakeClient(),
        board_id="uXjVStage2",
        out_dir=out_dir,
        render_url="https://cdn.example.com/out.mp4",
        draft_id="draft-2",
    )

    graph_path = out_dir / "graph.json"
    assert json.loads(graph_path.read_text(encoding="utf-8")) == _drafts()[1]["graph"]
    assert result["selected_draft_id"] == "draft-2"
    assert result["selected_strategy"] == "loop_feedback"

    mock_render.assert_called_once_with(
        graph_path=graph_path,
        output_video=out_dir / "out.mp4",
        output_still=out_dir / "thumb.png",
    )


@patch("src.cli.generate_drafts")
@patch("src.cli.render_with_remotion")
@patch("src.cli.load_input_graph")
def test_run_poc_backward_compatibility_unchanged(
    mock_load_input_graph,
    mock_render,
    mock_generate_drafts,
    tmp_path: Path,
):
    graph = {
        "nodes": [{"id": "n1", "label": "Legacy", "type": "shape", "x": 0, "y": 0}],
        "edges": [],
        "timeline": [{"nodeId": "n1", "startFrame": 0, "endFrame": 45}],
    }
    mock_load_input_graph.return_value = graph

    class FakeClient:
        def __init__(self) -> None:
            self.embed_calls: list[tuple[str, str]] = []

        def create_embed(self, board_id: str, target_url: str):
            self.embed_calls.append((board_id, target_url))
            return "embed_1"

    client = FakeClient()
    out_dir = tmp_path / "artifacts"

    result = run_poc(
        client=client,
        board_id="uXjVLegacy",
        out_dir=out_dir,
        render_url="https://cdn.example.com/out.mp4",
    )

    assert result is None
    assert json.loads((out_dir / "graph.json").read_text(encoding="utf-8")) == graph

    mock_generate_drafts.assert_not_called()
    mock_render.assert_called_once_with(
        graph_path=out_dir / "graph.json",
        output_video=out_dir / "out.mp4",
        output_still=out_dir / "thumb.png",
    )
    assert client.embed_calls == [("uXjVLegacy", "https://cdn.example.com/out.mp4")]
