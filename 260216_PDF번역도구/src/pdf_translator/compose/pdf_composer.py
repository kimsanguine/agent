"""Compose translated PDF using source layout as baseline."""

from __future__ import annotations

from pathlib import Path

import fitz


def compose_translated_pdf(
    source_pdf: Path,
    translated_segments: list[dict],
    output_pdf: Path,
) -> Path:
    """Overlay translated text on source layout.

    v1 safe approach:
    - keep original page and assets
    - draw white rectangle over each text block bbox
    - insert translated text inside same bbox
    """

    segments_by_page: dict[int, list[dict]] = {}
    for segment in translated_segments:
        segments_by_page.setdefault(segment["page"], []).append(segment)

    with fitz.open(source_pdf) as doc:
        for page_idx in range(doc.page_count):
            page_no = page_idx + 1
            page_segments = segments_by_page.get(page_no, [])

            for seg in page_segments:
                translated = seg.get("translated_text", "").strip()
                if not translated:
                    continue

                rect = fitz.Rect(seg["bbox"])
                page = doc[page_idx]
                page.draw_rect(rect, color=(1, 1, 1), fill=(1, 1, 1), width=0)
                page.insert_textbox(
                    rect,
                    translated,
                    fontsize=10,
                    color=(0, 0, 0),
                    align=fitz.TEXT_ALIGN_LEFT,
                )

        output_pdf.parent.mkdir(parents=True, exist_ok=True)
        doc.save(output_pdf)

    return output_pdf
