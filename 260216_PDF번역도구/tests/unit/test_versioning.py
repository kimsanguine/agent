from __future__ import annotations

from pathlib import Path

import pytest

from pdf_translator.compose.versioning import next_output_path


def test_next_output_path_increments_version(tmp_path: Path):
    source_pdf = tmp_path / "paper.pdf"
    source_pdf.write_text("placeholder", encoding="utf-8")

    output_dir = tmp_path / "output"
    output_dir.mkdir()
    (output_dir / "paper_ko_v1.pdf").touch()
    (output_dir / "paper_ko_v2.pdf").touch()

    next_path = next_output_path(
        source_pdf=source_pdf,
        output_dir=output_dir,
        pattern="{source_name}_ko_v{version}.pdf",
        allow_overwrite=False,
    )

    assert next_path.name == "paper_ko_v3.pdf"



def test_next_output_path_rejects_overwrite(tmp_path: Path):
    source_pdf = tmp_path / "paper.pdf"
    source_pdf.write_text("placeholder", encoding="utf-8")

    with pytest.raises(ValueError):
        next_output_path(
            source_pdf=source_pdf,
            output_dir=tmp_path / "output",
            pattern="{source_name}_ko_v{version}.pdf",
            allow_overwrite=True,
        )
