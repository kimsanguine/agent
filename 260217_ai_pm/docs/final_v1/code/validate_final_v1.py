"""
validate_final_v1.py — final_v1 문서 정합성 검증 스크립트
크로스링크, 메타데이터, 구조, 단어 수를 검증하고 리포트를 생성한다.

사용법:
    python validate_final_v1.py

과제 5: 최종 정합성 검증
"""
import os
import re
from pathlib import Path
from dataclasses import dataclass, field


DOCS_DIR = Path(__file__).parent.parent  # docs/final_v1/

EXPECTED_FILES = [
    "00-index.md",
    "1.1-why-now.md", "1.2-what-is-claude-code.md", "1.3-install-and-first-run.md",
    "2.1-files-and-input.md", "2.2-modes-and-depth.md", "2.3-project-memory.md",
    "2.4-custom-subagents.md", "2.5-agent-teams.md", "2.6-human-in-the-loop.md",
    "3.1-mcp-integration.md", "3.2-claude-md-deep-dive.md", "3.3-slash-commands.md",
    "3.4-custom-skills.md", "3.5-automation-n8n.md", "3.6-multimodel-routing.md",
    "4.1-discovery-user-research.md", "4.2-discovery-competitive-analysis.md",
    "5.1-definition-write-prd.md", "5.2-definition-product-strategy.md",
    "6.1-delivery-vibe-coding.md", "6.2-delivery-visual-assets.md",
    "6.3-delivery-github-deploy.md",
    "7.1-growth-experiment-analysis.md", "7.2-growth-kpi-dashboard.md",
    "7.3-ai-observability.md", "7.4-1m-context-cost-strategy.md",
    "8.1-ai-product-strategy.md", "8.2-growth-path.md",
    "bridge-modules.md",
]

COPYRIGHT_PATTERN = r"© 2026 김생근"


@dataclass
class ValidationResult:
    file: str
    word_count: int = 0
    h1_count: int = 0
    h2_count: int = 0
    h3_count: int = 0
    mermaid_count: int = 0
    code_block_count: int = 0
    has_copyright: bool = False
    cross_links: list[str] = field(default_factory=list)
    broken_links: list[str] = field(default_factory=list)
    issues: list[str] = field(default_factory=list)


def validate_file(filepath: Path) -> ValidationResult:
    """단일 파일의 정합성을 검증한다."""
    result = ValidationResult(file=filepath.name)

    if not filepath.exists():
        result.issues.append("파일 없음")
        return result

    content = filepath.read_text(encoding="utf-8")
    lines = content.split("\n")

    # 단어 수
    result.word_count = len(content.split())

    # 헤딩 계층 (코드 블록 내부 제외)
    in_code_block = False
    for line in lines:
        if line.startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue
        if line.startswith("# ") and not line.startswith("## "):
            result.h1_count += 1
        elif line.startswith("## ") and not line.startswith("### "):
            result.h2_count += 1
        elif line.startswith("### "):
            result.h3_count += 1

    # Mermaid 블록
    result.mermaid_count = content.count("```mermaid")

    # 코드 블록
    result.code_block_count = content.count("```") // 2  # 열기/닫기 쌍

    # 저작권
    result.has_copyright = bool(re.search(COPYRIGHT_PATTERN, content))

    # 크로스링크 검증
    link_pattern = re.compile(r'\[.*?\]\(\./(.+?\.md)\)')
    for match in link_pattern.finditer(content):
        target = match.group(1)
        result.cross_links.append(target)
        target_path = DOCS_DIR / target
        if not target_path.exists():
            result.broken_links.append(target)

    # H1 검증
    if result.h1_count == 0:
        result.issues.append("H1 제목 없음")
    elif result.h1_count > 1:
        result.issues.append(f"H1 제목 {result.h1_count}개 (1개 권장)")

    # 저작권 검증
    if not result.has_copyright:
        result.issues.append("저작권 표시 없음")

    # 깨진 링크
    if result.broken_links:
        result.issues.append(f"깨진 링크 {len(result.broken_links)}개: {', '.join(result.broken_links)}")

    return result


def validate_all() -> list[ValidationResult]:
    """모든 파일을 검증한다."""
    results = []

    # 파일 존재 확인
    for filename in EXPECTED_FILES:
        filepath = DOCS_DIR / filename
        result = validate_file(filepath)
        results.append(result)

    return results


def generate_report(results: list[ValidationResult]) -> str:
    """VALIDATION_REPORT.md 내용을 생성한다."""
    lines = [
        "# VALIDATION REPORT — final_v1 문서 정합성 검증",
        "",
        f"**검증 일시**: 2026-03-24",
        f"**검증 대상**: {len(results)}개 파일",
        f"**검증 도구**: validate_final_v1.py",
        "",
        "---",
        "",
        "## 1. 파일 존재 확인",
        "",
    ]

    missing = [r for r in results if "파일 없음" in [i for i in r.issues]]
    present = [r for r in results if "파일 없음" not in [i for i in r.issues]]

    lines.append(f"- [{'x' if not missing else ' '}] 모든 예상 파일 존재: {len(present)}/{len(results)}")
    if missing:
        for r in missing:
            lines.append(f"  - 누락: `{r.file}`")
    lines.append("")

    # 크로스링크
    lines.extend([
        "## 2. 크로스링크 검증",
        "",
    ])
    total_links = sum(len(r.cross_links) for r in present)
    total_broken = sum(len(r.broken_links) for r in present)
    lines.append(f"- 총 크로스링크: {total_links}개")
    lines.append(f"- 깨진 링크: {total_broken}개")
    if total_broken == 0:
        lines.append(f"- [x] **모든 크로스링크 유효**")
    else:
        lines.append(f"- [ ] 깨진 링크 발견:")
        for r in present:
            for bl in r.broken_links:
                lines.append(f"  - `{r.file}` -> `{bl}`")
    lines.append("")

    # 구조적 일관성
    lines.extend([
        "## 3. 구조적 일관성",
        "",
        "| 파일 | H1 | H2 | H3 | Mermaid | Code | 저작권 | 이슈 |",
        "|------|----|----|-----|---------|------|--------|------|",
    ])
    for r in present:
        copyright_mark = "O" if r.has_copyright else "X"
        issues_str = "; ".join(r.issues) if r.issues else "-"
        lines.append(
            f"| {r.file} | {r.h1_count} | {r.h2_count} | {r.h3_count} "
            f"| {r.mermaid_count} | {r.code_block_count} | {copyright_mark} | {issues_str} |"
        )
    lines.append("")

    # 단어 수
    lines.extend([
        "## 4. 단어 수 검증",
        "",
        "| 파일 | 단어 수 | 범위 판정 |",
        "|------|---------|----------|",
    ])

    new_files = ["3.6-multimodel-routing.md", "6.1-delivery-vibe-coding.md",
                 "7.4-1m-context-cost-strategy.md", "bridge-modules.md"]

    for r in present:
        if r.file in new_files:
            if r.word_count < 1200:
                verdict = "부족"
            elif r.word_count > 2500:
                verdict = "초과"
            else:
                verdict = "적정"
        else:
            verdict = "-"
        lines.append(f"| {r.file} | {r.word_count} | {verdict} |")
    lines.append("")

    # 저작권 검증
    lines.extend([
        "## 5. 저작권 표시",
        "",
    ])
    no_copyright = [r for r in present if not r.has_copyright]
    if not no_copyright:
        lines.append("- [x] **모든 파일에 저작권 표시 완료**")
    else:
        lines.append(f"- [ ] 저작권 미표시 파일 {len(no_copyright)}개:")
        for r in no_copyright:
            lines.append(f"  - `{r.file}`")
    lines.append("")

    # 신규 콘텐츠 (이번 작업 산출물) 요약
    lines.extend([
        "## 6. 신규 콘텐츠 요약 (2026-03-24 작성)",
        "",
        "| 파일 | 유형 | 단어 수 | Mermaid | Python |",
        "|------|------|---------|---------|--------|",
    ])

    for fname in new_files:
        r = next((x for x in present if x.file == fname), None)
        if r:
            ftype = "재작성" if fname == "6.1-delivery-vibe-coding.md" else "신규"
            py_files = {
                "3.6-multimodel-routing.md": "model_router.py",
                "6.1-delivery-vibe-coding.md": "vibe_workflow.py",
                "7.4-1m-context-cost-strategy.md": "roi_calculator.py",
                "bridge-modules.md": "part_navigator.py",
            }
            py = py_files.get(fname, "-")
            lines.append(f"| {fname} | {ftype} | {r.word_count} | {r.mermaid_count} | {py} |")
    lines.append("")

    # 총평
    total_issues = sum(len(r.issues) for r in present)
    lines.extend([
        "## 7. 총평",
        "",
        f"- 검증 파일: {len(present)}/{len(results)}개 존재",
        f"- 크로스링크: {total_links}개 중 {total_links - total_broken}개 유효",
        f"- 이슈 총합: {total_issues}건",
        f"- 깨진 링크: {total_broken}건",
        "",
    ])

    if total_issues == 0 and total_broken == 0:
        lines.append("**결론: 모든 검증 항목 PASS**")
    else:
        lines.append(f"**결론: {total_issues}건의 이슈 발견 — 아래 수정 권고 참조**")

    lines.extend([
        "",
        "---",
        "",
        "> 이 리포트는 `validate_final_v1.py`에 의해 자동 생성되었습니다.",
    ])

    return "\n".join(lines)


if __name__ == "__main__":
    print("=" * 60)
    print("  final_v1 문서 정합성 검증")
    print("=" * 60)

    results = validate_all()

    # 콘솔 요약
    present = [r for r in results if "파일 없음" not in [i for i in r.issues]]
    missing = [r for r in results if "파일 없음" in [i for i in r.issues]]

    print(f"\n  파일 존재: {len(present)}/{len(results)}")
    if missing:
        for r in missing:
            print(f"    누락: {r.file}")

    total_links = sum(len(r.cross_links) for r in present)
    total_broken = sum(len(r.broken_links) for r in present)
    print(f"  크로스링크: {total_links}개 (깨진: {total_broken}개)")

    issues_count = sum(len(r.issues) for r in present)
    print(f"  이슈: {issues_count}건")

    if issues_count > 0:
        print(f"\n  [이슈 목록]")
        for r in present:
            if r.issues:
                for issue in r.issues:
                    print(f"    {r.file}: {issue}")

    # 리포트 생성
    report = generate_report(results)
    report_path = DOCS_DIR / "VALIDATION_REPORT.md"
    report_path.write_text(report, encoding="utf-8")
    print(f"\n  리포트 저장: {report_path}")
    print(f"\n  검증 완료.")
