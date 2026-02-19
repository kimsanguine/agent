"""Pipeline orchestrator for PDF translation v1 (M1+M2)."""

from __future__ import annotations

import json
import re
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from pdf_translator.compose.pdf_composer import compose_translated_pdf
from pdf_translator.compose.versioning import next_output_path
from pdf_translator.config import Settings
from pdf_translator.extract.layout_segmenter import segment_layout_blocks
from pdf_translator.extract.object_extractor import extract_objects
from pdf_translator.extract.validator import validate_input_pdf
from pdf_translator.pipeline.checkpoint import CheckpointStore
from pdf_translator.translate.gemini_client import GeminiTranslateClient, translate_segments
from pdf_translator.translate.glossary import build_glossary, summarize_glossary


class PdfTranslationOrchestrator:
    """Stateful orchestrator with progress.json checkpointing."""

    def __init__(self, settings: Settings):
        self.settings = settings
        self.checkpoints = CheckpointStore(settings)

    def run(
        self,
        input_pdf: Path,
        *,
        stop_after: str | None = None,
        resume: bool = False,
        run_id: str | None = None,
    ) -> dict[str, Any]:
        """Run pipeline from start or resume existing run."""

        if resume:
            target_run_id = run_id or self.checkpoints.latest_run_id()
            if not target_run_id:
                raise ValueError("No existing run found to resume")
            progress = self.checkpoints.load(target_run_id)
            run_id = target_run_id
            input_pdf = Path(progress["input_pdf"])

            if stop_after == "review1" and progress.get("status") != "REVIEW1":
                return progress
        else:
            run_id = run_id or datetime.now(UTC).strftime("%Y%m%d_%H%M%S")
            progress = {
                "run_id": run_id,
                "input_pdf": str(input_pdf),
                "status": "NEW",
                "completed_steps": [],
                "created_at": datetime.now(UTC).isoformat(),
            }

        run_dir = self.checkpoints.ensure_run_dir(run_id)

        if "validate_input" not in progress["completed_steps"]:
            meta = validate_input_pdf(input_pdf)
            progress["input_meta"] = meta
            progress["status"] = "EXTRACTING"
            progress["completed_steps"].append("validate_input")
            self.checkpoints.save(run_id, progress)

        if "extract_objects" not in progress["completed_steps"]:
            assets = extract_objects(input_pdf, run_dir)
            progress["assets_count"] = len(assets)
            progress["status"] = "EXTRACTING"
            progress["completed_steps"].append("extract_objects")
            self.checkpoints.save(run_id, progress)

        if "segment_layout" not in progress["completed_steps"]:
            segments = segment_layout_blocks(input_pdf, run_dir)
            progress["segments_count"] = len(segments)
            progress["status"] = "REVIEW1"
            progress["completed_steps"].append("segment_layout")
            self._write_review1_package(run_dir, progress)
            self.checkpoints.save(run_id, progress)

        if stop_after == "review1":
            return self.checkpoints.load(run_id)

        if "translate" not in progress["completed_steps"]:
            segments = self._load_json(run_dir / "segments.json")
            glossary = build_glossary(
                segments,
                threshold=self.settings.glossary_auto_accept_threshold,
                run_dir=run_dir,
            )
            progress["glossary_summary"] = summarize_glossary(glossary)

            client = GeminiTranslateClient(self.settings)
            translated_segments = translate_segments(segments, client)
            (run_dir / "translated_segments.json").write_text(
                json.dumps(translated_segments, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )

            progress["status"] = "TRANSLATING"
            progress["completed_steps"].append("translate")
            self.checkpoints.save(run_id, progress)

        if "compose" not in progress["completed_steps"]:
            translated_segments = self._load_json(run_dir / "translated_segments.json")
            output_path = next_output_path(
                source_pdf=input_pdf,
                output_dir=self.settings.output_dir,
                pattern=self.settings.output_filename_pattern,
                allow_overwrite=self.settings.allow_overwrite,
            )
            compose_translated_pdf(input_pdf, translated_segments, output_path)
            progress["output_pdf"] = str(output_path)
            progress["status"] = "COMPOSING"
            progress["completed_steps"].append("compose")
            self.checkpoints.save(run_id, progress)

        progress["status"] = "ARCHIVED"
        if "archived" not in progress["completed_steps"]:
            progress["completed_steps"].append("archived")
        self.checkpoints.save(run_id, progress)

        return self.checkpoints.load(run_id)

    def verify_run(self, run_id: str) -> dict[str, Any]:
        progress = self.checkpoints.load(run_id)
        run_dir = self.checkpoints.run_dir(run_id)

        required_files = [
            run_dir / "asset_manifest.json",
            run_dir / "segments.json",
            run_dir / "review1_checklist.md",
            run_dir / "review1_asset_index.md",
            run_dir / "progress.json",
        ]

        if "translate" in progress.get("completed_steps", []):
            required_files.extend([
                run_dir / "glossary.json",
                run_dir / "translated_segments.json",
            ])

        missing = [str(path) for path in required_files if not path.exists()]

        output_pdf = progress.get("output_pdf")
        if output_pdf and not Path(output_pdf).exists():
            missing.append(output_pdf)

        if output_pdf:
            file_name = Path(output_pdf).name
            source_name = Path(progress["input_pdf"]).stem
            pattern = re.compile(rf"^{re.escape(source_name)}_ko_v\d+\.pdf$")
            if not pattern.match(file_name):
                missing.append(f"invalid_output_name:{file_name}")

        return {
            "run_id": run_id,
            "status": progress.get("status"),
            "missing": missing,
            "ok": len(missing) == 0,
        }

    def _write_review1_package(self, run_dir: Path, progress: dict[str, Any]) -> None:
        manifest = self._load_json(run_dir / "asset_manifest.json")
        by_type: dict[str, int] = {}
        for item in manifest:
            by_type[item["type"]] = by_type.get(item["type"], 0) + 1

        checklist = "\n".join(
            [
                "# Review1 Checklist",
                "",
                "- [ ] 표/그림/다이어그램/수식 누락이 없는지 확인",
                "- [ ] 수식(복합식 포함)이 이미지로 추출되어 보존 가능한지 확인",
                "- [ ] 페이지별 자산 수가 기대치와 일치하는지 확인",
                "- [ ] 누락 발견 시 재추출 요청",
                "",
                f"- Assets total: {progress.get('assets_count', 0)}",
                f"- Segments total: {progress.get('segments_count', 0)}",
            ]
        )
        (run_dir / "review1_checklist.md").write_text(checklist, encoding="utf-8")

        lines = ["# Review1 Asset Index", "", "| Type | Count |", "|---|---|"]
        for key in sorted(by_type.keys()):
            lines.append(f"| {key} | {by_type[key]} |")
        if not by_type:
            lines.append("| (none) | 0 |")

        (run_dir / "review1_asset_index.md").write_text("\n".join(lines), encoding="utf-8")

    def _load_json(self, path: Path) -> list[dict[str, Any]]:
        return json.loads(path.read_text(encoding="utf-8"))
