from __future__ import annotations

import json

from pdf_translator.pipeline.orchestrator import PdfTranslationOrchestrator


class StubGeminiClient:
    def __init__(self, settings):
        self.settings = settings

    def translate_block(self, text: str) -> str:
        return f"[KO]{text}"



def test_smoke_run_review1_and_resume(monkeypatch, settings_factory, sample_pdf):
    settings = settings_factory()
    settings.input_dir.mkdir(parents=True, exist_ok=True)
    settings.output_dir.mkdir(parents=True, exist_ok=True)

    orchestrator = PdfTranslationOrchestrator(settings)

    review1 = orchestrator.run(sample_pdf, stop_after="review1")
    run_id = review1["run_id"]
    run_dir = settings.runs_dir / run_id

    assert review1["status"] == "REVIEW1"
    assert (run_dir / "review1_checklist.md").exists()
    assert (run_dir / "review1_asset_index.md").exists()

    monkeypatch.setattr(
        "pdf_translator.pipeline.orchestrator.GeminiTranslateClient",
        StubGeminiClient,
    )

    resumed = orchestrator.run(sample_pdf, resume=True, run_id=run_id)

    assert resumed["status"] == "ARCHIVED"
    assert "compose" in resumed["completed_steps"]
    assert "output_pdf" in resumed

    output_pdf = settings.output_dir / "sample_ko_v1.pdf"
    assert output_pdf.exists()

    progress = json.loads((run_dir / "progress.json").read_text(encoding="utf-8"))
    assert progress["status"] == "ARCHIVED"
