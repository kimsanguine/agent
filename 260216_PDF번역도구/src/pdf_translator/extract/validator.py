"""Input PDF validation (FR-001)."""

from __future__ import annotations

from pathlib import Path

import fitz


class PdfValidationError(ValueError):
    """Raised when input PDF does not satisfy FR-001."""


def validate_input_pdf(path: Path) -> dict[str, int | str]:
    """Validate PDF and return basic metadata.

    FR-001 constraints for v1:
    - file exists
    - extension is .pdf
    - file is non-empty
    - at least one page
    - encrypted PDFs are rejected
    """

    if not path.exists():
        raise PdfValidationError(f"Input not found: {path}")

    if path.suffix.lower() != ".pdf":
        raise PdfValidationError(f"Input must be a PDF: {path}")

    if path.stat().st_size <= 0:
        raise PdfValidationError(f"Input PDF is empty: {path}")

    try:
        doc = fitz.open(path)
    except Exception as exc:  # pragma: no cover - library-specific parse errors
        raise PdfValidationError(f"Invalid PDF: {path}") from exc

    with doc:
        if doc.is_encrypted:
            raise PdfValidationError("Encrypted PDF is not supported in v1")

        page_count = doc.page_count
        if page_count < 1:
            raise PdfValidationError("PDF must contain at least 1 page")

        return {
            "file_name": path.name,
            "file_stem": path.stem,
            "page_count": page_count,
            "size_bytes": path.stat().st_size,
        }
