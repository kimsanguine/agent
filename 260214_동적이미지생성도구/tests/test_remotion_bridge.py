from pathlib import Path
from unittest.mock import patch

from src.remotion_bridge import render_with_remotion


@patch("subprocess.run")
def test_render_with_remotion_invokes_node_with_default_args(mock_run, tmp_path: Path):
    graph = tmp_path / "graph.json"
    graph.write_text("{}", encoding="utf-8")

    output_video = tmp_path / "out.mp4"
    output_still = tmp_path / "thumb.png"

    render_with_remotion(
        graph_path=graph,
        output_video=output_video,
        output_still=output_still,
    )

    mock_run.assert_called_once_with(
        [
            "node",
            "renderer/render.mjs",
            "--input",
            str(graph),
            "--out",
            str(output_video),
            "--still",
            str(output_still),
        ],
        check=True,
    )


@patch("subprocess.run")
def test_render_with_remotion_includes_optional_multi_format_args(mock_run, tmp_path: Path):
    graph = tmp_path / "graph.json"
    graph.write_text("{}", encoding="utf-8")

    output_video = tmp_path / "out.mp4"
    output_still = tmp_path / "thumb.png"
    output_webm = tmp_path / "out.webm"
    output_gif = tmp_path / "out.gif"

    render_with_remotion(
        graph_path=graph,
        output_video=output_video,
        output_still=output_still,
        output_webm=output_webm,
        output_gif=output_gif,
    )

    mock_run.assert_called_once_with(
        [
            "node",
            "renderer/render.mjs",
            "--input",
            str(graph),
            "--out",
            str(output_video),
            "--still",
            str(output_still),
            "--webm",
            str(output_webm),
            "--gif",
            str(output_gif),
        ],
        check=True,
    )
