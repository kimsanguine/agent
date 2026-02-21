"""CLI for PDF translation pipeline."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from pdf_translator.config import get_settings
from pdf_translator.pipeline.orchestrator import PdfTranslationOrchestrator


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="pdf-translator")
    subparsers = parser.add_subparsers(dest="command", required=True)

    run_parser = subparsers.add_parser("run", help="Run translation pipeline")
    run_parser.add_argument("--input", help="Input PDF path")
    run_parser.add_argument(
        "--stop-after",
        choices=["review1"],
        default=None,
        help="Stop after a checkpoint stage",
    )
    run_parser.add_argument(
        "--resume",
        action="store_true",
        help="Resume from latest or given run id",
    )
    run_parser.add_argument("--run-id", help="Target run id for resume/verify")

    verify_parser = subparsers.add_parser("verify-run", help="Verify run artifacts")
    verify_parser.add_argument("--run-id", required=True, help="Run id to verify")

    return parser


def cmd_run(args: argparse.Namespace) -> int:
    if not args.resume and not args.input:
        raise SystemExit("--input is required unless --resume is used")

    settings = get_settings(reload=True)
    orchestrator = PdfTranslationOrchestrator(settings)

    input_pdf = Path(args.input).expanduser().resolve() if args.input else Path(".")
    result = orchestrator.run(
        input_pdf=input_pdf,
        stop_after=args.stop_after,
        resume=args.resume,
        run_id=args.run_id,
    )
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


def cmd_verify(args: argparse.Namespace) -> int:
    settings = get_settings(reload=True)
    orchestrator = PdfTranslationOrchestrator(settings)
    result = orchestrator.verify_run(args.run_id)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["ok"] else 1


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.command == "run":
        return cmd_run(args)
    if args.command == "verify-run":
        return cmd_verify(args)

    parser.error(f"Unknown command: {args.command}")
    return 2


if __name__ == "__main__":
    sys.exit(main())
