"""Dynamic glossary generation with threshold policy."""

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path
from typing import Any


def _tokenize(text: str) -> list[str]:
    candidates = re.findall(r"\b[A-Za-z][A-Za-z0-9_-]{2,}\b", text)
    return [c for c in candidates if c.lower() not in {"the", "and", "with", "from"}]


def build_glossary(
    segments: list[dict[str, Any]],
    threshold: float,
    run_dir: Path,
) -> list[dict[str, Any]]:
    """Create glossary candidates from segment corpus.

    Score heuristic for v1: min(1.0, frequency / 5).
    """

    counter: Counter[str] = Counter()
    for seg in segments:
        counter.update(_tokenize(seg["source_text"]))

    glossary: list[dict[str, Any]] = []
    for term, freq in counter.most_common(100):
        score = min(1.0, freq / 5)
        glossary.append(
            {
                "term": term,
                "candidate": "",
                "score": round(score, 3),
                "status": "accepted" if score >= threshold else "pending",
            }
        )

    (run_dir / "glossary.json").write_text(
        json.dumps(glossary, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    return glossary


def summarize_glossary(glossary: list[dict[str, Any]]) -> dict[str, int]:
    accepted = sum(1 for item in glossary if item["status"] == "accepted")
    pending = sum(1 for item in glossary if item["status"] == "pending")
    return {
        "total": len(glossary),
        "accepted": accepted,
        "pending": pending,
    }
