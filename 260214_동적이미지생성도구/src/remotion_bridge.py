from pathlib import Path
import subprocess


def render_with_remotion(
    graph_path: Path,
    output_video: Path,
    output_still: Path,
    output_webm: Path | None = None,
    output_gif: Path | None = None,
) -> None:
    cmd = [
        "node",
        "renderer/render.mjs",
        "--input",
        str(graph_path),
        "--out",
        str(output_video),
        "--still",
        str(output_still),
    ]

    if output_webm is not None:
        cmd.extend(["--webm", str(output_webm)])

    if output_gif is not None:
        cmd.extend(["--gif", str(output_gif)])

    subprocess.run(cmd, check=True)
