from __future__ import annotations

import pytest

from pdf_translator.config import Settings, get_settings


def test_get_settings_defaults_and_runtime_dirs(monkeypatch, tmp_path):
    monkeypatch.setenv("GEMINI_API_KEY", "dummy")
    monkeypatch.setenv("INPUT_DIR", str(tmp_path / "input"))
    monkeypatch.setenv("OUTPUT_DIR", str(tmp_path / "output"))
    monkeypatch.setenv("ARCHIVE_DIR", str(tmp_path / "output" / "archive"))
    monkeypatch.setenv("EVIDENCE_DIR", str(tmp_path / "output" / "evidence"))
    monkeypatch.delenv("ALLOW_OVERWRITE", raising=False)

    settings = get_settings(reload=True)

    assert settings.parallel_workers == 4
    assert settings.glossary_auto_accept_threshold == 0.90
    assert settings.allow_overwrite is False
    assert settings.runs_dir.exists()



def test_settings_reject_fixed_policy_violations(tmp_path):
    base = {
        "gemini_api_key": "dummy",
        "translation_provider": "gemini",
        "gemini_model": "gemini-2.0-flash",
        "max_retry": 3,
        "request_timeout_seconds": 60,
        "log_level": "INFO",
        "input_dir": tmp_path / "input",
        "output_dir": tmp_path / "output",
        "archive_dir": tmp_path / "output" / "archive",
        "evidence_dir": tmp_path / "output" / "evidence",
        "output_filename_pattern": "{source_name}_ko_v{version}.pdf",
    }

    with pytest.raises(ValueError):
        Settings(
            **base,
            parallel_workers=2,
            glossary_auto_accept_threshold=0.90,
            allow_overwrite=False,
        )

    with pytest.raises(ValueError):
        Settings(
            **base,
            parallel_workers=4,
            glossary_auto_accept_threshold=0.80,
            allow_overwrite=False,
        )

    with pytest.raises(ValueError):
        Settings(
            **base,
            parallel_workers=4,
            glossary_auto_accept_threshold=0.90,
            allow_overwrite=True,
        )
