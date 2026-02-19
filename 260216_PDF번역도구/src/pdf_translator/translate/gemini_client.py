"""Gemini translation client with retry/backoff."""

from __future__ import annotations

import json
import re
from typing import Any

from google import genai
from tenacity import retry, stop_after_attempt, wait_exponential

from pdf_translator.config import Settings


class GeminiTranslateClient:
    """Wrapper around google-genai for block translation."""

    def __init__(self, settings: Settings):
        self.settings = settings
        self.client = genai.Client(api_key=settings.gemini_api_key)

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=1, max=8),
        reraise=True,
    )
    def translate_block(self, text: str) -> str:
        """Translate one block EN->KO and return translated text."""

        if not text.strip():
            return ""

        prompt = (
            "Translate the following English academic text into Korean. "
            "Preserve technical meaning and keep equations/tokens unchanged where possible.\n\n"
            f"TEXT:\n{text}\n\n"
            "Return only JSON object: {\"translated\": \"...\"}"
        )

        response = self.client.models.generate_content(
            model=self.settings.gemini_model,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "temperature": 0.2,
                "max_output_tokens": 8192,
            },
        )

        if not response.candidates or not response.candidates[0].content:
            raise RuntimeError("Gemini returned empty response")

        raw = response.candidates[0].content.parts[0].text.strip()
        cleaned = self._clean_json(raw)
        payload = json.loads(cleaned)

        translated = payload.get("translated", "").strip()
        if not translated:
            raise RuntimeError("Gemini response missing translated field")

        return translated

    def _clean_json(self, text: str) -> str:
        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            text = text.rsplit("```", 1)[0]
            text = text.strip()

        text = re.sub(r",\s*([}\]])", r"\1", text)
        text = re.sub(r"//[^\n]*", "", text)
        return text.strip()


def translate_segments(
    segments: list[dict[str, Any]],
    client: GeminiTranslateClient,
) -> list[dict[str, Any]]:
    """Sequential v1 translation (M3 may parallelize)."""

    translated: list[dict[str, Any]] = []
    for seg in segments:
        item = dict(seg)
        item["translated_text"] = client.translate_block(seg["source_text"])
        translated.append(item)
    return translated
