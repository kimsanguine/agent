"""Output versioning helpers enforcing no-overwrite policy."""

from __future__ import annotations

import re
from pathlib import Path


def next_output_path(
    source_pdf: Path,
    output_dir: Path,
    pattern: str,
    allow_overwrite: bool,
) -> Path:
    if allow_overwrite:
        raise ValueError("Overwrite is forbidden by policy")

    output_dir.mkdir(parents=True, exist_ok=True)

    source_name = source_pdf.stem
    escaped = re.escape(source_name)
    version_pattern = re.compile(rf"^{escaped}_ko_v(\d+)\.pdf$")

    highest = 0
    for item in output_dir.glob(f"{source_name}_ko_v*.pdf"):
        match = version_pattern.match(item.name)
        if match:
            highest = max(highest, int(match.group(1)))

    version = highest + 1
    file_name = pattern.format(source_name=source_name, version=version)
    return output_dir / file_name
