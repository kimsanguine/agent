from __future__ import annotations

from pathlib import Path

from pdf_translator.translate.glossary import build_glossary, summarize_glossary


def test_glossary_threshold_policy(tmp_path: Path):
    segments = [
        {
            "segment_id": "seg-1",
            "page": 1,
            "bbox": [0, 0, 1, 1],
            "source_text": "Transformer Transformer Transformer Transformer Transformer",
            "translated_text": "",
        },
        {
            "segment_id": "seg-2",
            "page": 1,
            "bbox": [0, 0, 1, 1],
            "source_text": "Attention",
            "translated_text": "",
        },
    ]

    glossary = build_glossary(segments=segments, threshold=0.90, run_dir=tmp_path)
    summary = summarize_glossary(glossary)

    status_by_term = {item["term"]: item["status"] for item in glossary}

    assert status_by_term["Transformer"] == "accepted"
    assert status_by_term["Attention"] == "pending"
    assert summary["accepted"] >= 1
    assert summary["pending"] >= 1
    assert (tmp_path / "glossary.json").exists()
