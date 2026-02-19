"""Extract non-text objects into run-scoped manifest and assets."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import fitz


def _classify_image_from_context(page: fitz.Page, bbox: fitz.Rect) -> str:
    text_hint = page.get_textbox(bbox).lower()

    if "fig" in text_hint or "diagram" in text_hint:
        return "diagram"
    if "table" in text_hint:
        return "table"
    if any(symbol in text_hint for symbol in ["∑", "∫", "=", "λ", "µ"]):
        return "equation"
    return "figure"


def extract_objects(input_pdf: Path, run_dir: Path) -> list[dict[str, Any]]:
    """Extract image-like assets and write manifest.

    v1 policy: equations are extracted as images and preserved during compose.
    """

    assets_dir = run_dir / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)

    manifest: list[dict[str, Any]] = []

    with fitz.open(input_pdf) as doc:
        for page_idx in range(doc.page_count):
            page = doc[page_idx]
            image_infos = page.get_image_info(xrefs=True)

            for image_idx, image_info in enumerate(image_infos, start=1):
                xref = image_info.get("xref")
                if not xref:
                    continue

                extracted = doc.extract_image(xref)
                if not extracted:
                    continue

                ext = extracted.get("ext", "png")
                asset_name = f"p{page_idx + 1:03d}_img{image_idx:03d}.{ext}"
                asset_path = assets_dir / asset_name
                asset_path.write_bytes(extracted["image"])

                rect_values = image_info.get("bbox") or image_info.get("bbox_rect")
                if rect_values:
                    bbox_rect = fitz.Rect(rect_values)
                else:
                    bbox_rect = fitz.Rect(0, 0, 0, 0)

                asset_type = _classify_image_from_context(page, bbox_rect)
                manifest.append(
                    {
                        "asset_id": f"asset-{page_idx + 1}-{image_idx}",
                        "page": page_idx + 1,
                        "bbox": [bbox_rect.x0, bbox_rect.y0, bbox_rect.x1, bbox_rect.y1],
                        "type": asset_type,
                        "path": str(asset_path),
                    }
                )

    (run_dir / "asset_manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    return manifest
