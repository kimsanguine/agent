from __future__ import annotations

from pathlib import Path

import fitz
import pytest

from pdf_translator.config import Settings


@pytest.fixture
def sample_pdf(tmp_path: Path) -> Path:
    path = tmp_path / "sample.pdf"

    doc = fitz.open()
    page = doc.new_page()
    page.insert_text(
        (72, 72),
        "This paper studies transformer models and attention mechanisms.",
    )
    page.insert_text((72, 110), "Equation: E = mc^2")

    doc.save(path)
    doc.close()

    return path


@pytest.fixture
def settings_factory(tmp_path: Path):
    def _factory() -> Settings:
        input_dir = tmp_path / "input"
        output_dir = tmp_path / "output"

        return Settings(
            gemini_api_key="test-key",
            translation_provider="gemini",
            gemini_model="gemini-2.0-flash",
            parallel_workers=4,
            glossary_auto_accept_threshold=0.90,
            max_retry=3,
            request_timeout_seconds=60,
            log_level="INFO",
            input_dir=input_dir,
            output_dir=output_dir,
            archive_dir=output_dir / "archive",
            evidence_dir=output_dir / "evidence",
            output_filename_pattern="{source_name}_ko_v{version}.pdf",
            allow_overwrite=False,
        )

    return _factory
