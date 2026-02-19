"""Checkpoint persistence for resumable pipeline runs."""

from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

from pdf_translator.config import Settings


@dataclass(slots=True)
class CheckpointStore:
    settings: Settings

    def run_dir(self, run_id: str) -> Path:
        return self.settings.runs_dir / run_id

    def progress_path(self, run_id: str) -> Path:
        return self.run_dir(run_id) / "progress.json"

    def ensure_run_dir(self, run_id: str) -> Path:
        run_dir = self.run_dir(run_id)
        run_dir.mkdir(parents=True, exist_ok=True)
        return run_dir

    def save(self, run_id: str, payload: dict[str, Any]) -> None:
        self.ensure_run_dir(run_id)
        output = self._json_safe(payload)
        output["updated_at"] = datetime.now(UTC).isoformat()
        self.progress_path(run_id).write_text(
            json.dumps(output, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

    def load(self, run_id: str) -> dict[str, Any]:
        path = self.progress_path(run_id)
        if not path.exists():
            raise FileNotFoundError(f"Checkpoint not found: {path}")
        return json.loads(path.read_text(encoding="utf-8"))

    def exists(self, run_id: str) -> bool:
        return self.progress_path(run_id).exists()

    def latest_run_id(self) -> str | None:
        if not self.settings.runs_dir.exists():
            return None

        run_dirs = [p for p in self.settings.runs_dir.iterdir() if p.is_dir()]
        if not run_dirs:
            return None

        ordered = sorted(run_dirs, key=lambda p: p.stat().st_mtime, reverse=True)
        return ordered[0].name

    def _json_safe(self, value: Any) -> Any:
        if isinstance(value, Path):
            return str(value)
        if isinstance(value, dict):
            return {k: self._json_safe(v) for k, v in value.items()}
        if isinstance(value, list):
            return [self._json_safe(v) for v in value]
        return value
