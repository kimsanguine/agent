"""Runtime configuration for PDF translator."""

from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel, Field, field_validator, model_validator

PROJECT_ROOT = Path(__file__).resolve().parents[2]


def _parse_bool(value: str | bool | None, *, default: bool = False) -> bool:
    if value is None:
        return default
    if isinstance(value, bool):
        return value

    normalized = value.strip().lower()
    if normalized in {"1", "true", "yes", "y", "on"}:
        return True
    if normalized in {"0", "false", "no", "n", "off"}:
        return False
    raise ValueError(f"Invalid boolean value: {value}")


def _resolve_path(value: str | None, fallback: str) -> Path:
    raw = value.strip() if value else fallback
    path = Path(raw)
    if not path.is_absolute():
        path = PROJECT_ROOT / path
    return path


class Settings(BaseModel):
    """Validated application settings."""

    gemini_api_key: str = Field(default="")
    translation_provider: str = Field(default="gemini")
    gemini_model: str = Field(default="gemini-2.0-flash")

    parallel_workers: int = Field(default=4)
    glossary_auto_accept_threshold: float = Field(default=0.90)
    max_retry: int = Field(default=3)
    request_timeout_seconds: int = Field(default=60)

    log_level: str = Field(default="INFO")

    input_dir: Path = Field(default=PROJECT_ROOT / "input")
    output_dir: Path = Field(default=PROJECT_ROOT / "output")
    archive_dir: Path = Field(default=PROJECT_ROOT / "output" / "archive")
    evidence_dir: Path = Field(default=PROJECT_ROOT / "output" / "evidence")

    output_filename_pattern: str = Field(default="{source_name}_ko_v{version}.pdf")
    allow_overwrite: bool = Field(default=False)

    @property
    def runs_dir(self) -> Path:
        return self.output_dir / "runs"

    @field_validator("translation_provider")
    @classmethod
    def validate_translation_provider(cls, value: str) -> str:
        provider = value.strip().lower()
        if provider != "gemini":
            raise ValueError("v1 only supports translation_provider=gemini")
        return provider

    @field_validator("parallel_workers")
    @classmethod
    def validate_parallel_workers(cls, value: int) -> int:
        if value != 4:
            raise ValueError("PARALLEL_WORKERS must be fixed to 4 for v1")
        return value

    @field_validator("glossary_auto_accept_threshold")
    @classmethod
    def validate_glossary_threshold(cls, value: float) -> float:
        if abs(value - 0.90) > 1e-9:
            raise ValueError("GLOSSARY_AUTO_ACCEPT_THRESHOLD must be fixed to 0.90")
        return value

    @field_validator("max_retry")
    @classmethod
    def validate_retry(cls, value: int) -> int:
        if value < 1 or value > 10:
            raise ValueError("MAX_RETRY must be within 1..10")
        return value

    @field_validator("request_timeout_seconds")
    @classmethod
    def validate_timeout(cls, value: int) -> int:
        if value < 1 or value > 600:
            raise ValueError("REQUEST_TIMEOUT_SECONDS must be within 1..600")
        return value

    @field_validator("allow_overwrite")
    @classmethod
    def validate_overwrite_policy(cls, value: bool) -> bool:
        if value:
            raise ValueError("ALLOW_OVERWRITE must remain false in v1")
        return value

    @model_validator(mode="after")
    def validate_required_fields(self) -> "Settings":
        if self.translation_provider == "gemini" and not self.gemini_api_key.strip():
            raise ValueError("GEMINI_API_KEY is required")

        try:
            self.output_filename_pattern.format(source_name="sample", version=1)
        except Exception as exc:
            raise ValueError(
                "OUTPUT_FILENAME_PATTERN must support {source_name} and {version}"
            ) from exc

        return self

    @classmethod
    def from_env(cls) -> "Settings":
        load_dotenv(PROJECT_ROOT / ".env")

        return cls(
            gemini_api_key=os.getenv("GEMINI_API_KEY", ""),
            translation_provider=os.getenv("TRANSLATION_PROVIDER", "gemini"),
            gemini_model=os.getenv("GEMINI_MODEL", "gemini-2.0-flash"),
            parallel_workers=int(os.getenv("PARALLEL_WORKERS", "4")),
            glossary_auto_accept_threshold=float(
                os.getenv("GLOSSARY_AUTO_ACCEPT_THRESHOLD", "0.90")
            ),
            max_retry=int(os.getenv("MAX_RETRY", "3")),
            request_timeout_seconds=int(os.getenv("REQUEST_TIMEOUT_SECONDS", "60")),
            log_level=os.getenv("LOG_LEVEL", "INFO"),
            input_dir=_resolve_path(os.getenv("INPUT_DIR"), "./input"),
            output_dir=_resolve_path(os.getenv("OUTPUT_DIR"), "./output"),
            archive_dir=_resolve_path(os.getenv("ARCHIVE_DIR"), "./output/archive"),
            evidence_dir=_resolve_path(os.getenv("EVIDENCE_DIR"), "./output/evidence"),
            output_filename_pattern=os.getenv(
                "OUTPUT_FILENAME_PATTERN", "{source_name}_ko_v{version}.pdf"
            ),
            allow_overwrite=_parse_bool(os.getenv("ALLOW_OVERWRITE"), default=False),
        )


def ensure_runtime_dirs(settings: Settings) -> None:
    settings.input_dir.mkdir(parents=True, exist_ok=True)
    settings.output_dir.mkdir(parents=True, exist_ok=True)
    settings.archive_dir.mkdir(parents=True, exist_ok=True)
    settings.evidence_dir.mkdir(parents=True, exist_ok=True)
    settings.runs_dir.mkdir(parents=True, exist_ok=True)


@lru_cache(maxsize=1)
def _load_settings_cached() -> Settings:
    settings = Settings.from_env()
    ensure_runtime_dirs(settings)
    return settings


def get_settings(*, reload: bool = False) -> Settings:
    if reload:
        _load_settings_cached.cache_clear()
    return _load_settings_cached()
