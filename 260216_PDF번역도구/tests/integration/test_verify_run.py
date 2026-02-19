from __future__ import annotations

from pdf_translator.pipeline.orchestrator import PdfTranslationOrchestrator


class StubGeminiClient:
    def __init__(self, settings):
        self.settings = settings

    def translate_block(self, text: str) -> str:
        return f"번역:{text}"



def test_verify_run_reports_ok(monkeypatch, settings_factory, sample_pdf):
    settings = settings_factory()
    orchestrator = PdfTranslationOrchestrator(settings)

    monkeypatch.setattr(
        "pdf_translator.pipeline.orchestrator.GeminiTranslateClient",
        StubGeminiClient,
    )

    result = orchestrator.run(sample_pdf)
    verify = orchestrator.verify_run(result["run_id"])

    assert verify["ok"] is True
    assert verify["missing"] == []
