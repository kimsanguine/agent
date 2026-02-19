"""Layout block segmentation for translation units."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import fitz


def segment_layout_blocks(input_pdf: Path, run_dir: Path) -> list[dict[str, Any]]:
    """Create text-box level segments preserving bbox/page metadata."""

    segments: list[dict[str, Any]] = []

    with fitz.open(input_pdf) as doc:
        segment_id = 1
        for page_idx in range(doc.page_count):
            page = doc[page_idx]
            blocks = page.get_text("blocks")

            for block in blocks:
                x0, y0, x1, y1, text, *_ = block
                normalized = text.strip()
                if not normalized:
                    continue

                segments.append(
                    {
                        "segment_id": f"seg-{segment_id:05d}",
                        "page": page_idx + 1,
                        "bbox": [x0, y0, x1, y1],
                        "source_text": normalized,
                        "translated_text": "",
                    }
                )
                segment_id += 1

    (run_dir / "segments.json").write_text(
        json.dumps(segments, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    return segments
