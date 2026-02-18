from pathlib import Path
from unittest.mock import patch

from src.cli import run_poc


@patch("src.cli.render_with_remotion")
def test_run_poc_writes_graph(mock_render, tmp_path: Path):
    class FakeClient:
        def get_board_items(self, board_id):
            return [{"id": "n1", "type": "shape", "data": {"content": "Input"}, "position": {"x": 0, "y": 0}}]

        def create_embed(self, board_id, target_url):
            return "embed_1"

    out_dir = tmp_path / "artifacts"
    run_poc(client=FakeClient(), board_id="uXjVTest", out_dir=out_dir, render_url="https://cdn.example.com/out.mp4")

    graph_path = out_dir / "graph.json"
    assert graph_path.exists()
    mock_render.assert_called_once_with(
        graph_path=graph_path,
        output_video=out_dir / "out.mp4",
        output_still=out_dir / "thumb.png",
        output_webm=out_dir / "out.webm",
        output_gif=out_dir / "out.gif",
    )
