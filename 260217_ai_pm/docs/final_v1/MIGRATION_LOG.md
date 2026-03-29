# Migration Log: Part 1-8 → Part 2-9 내부 링크 수정

**Date**: 2026-03-29
**Backup**: `_backup_before_migration/`

## Summary

파일명은 이전 마이그레이션에서 이미 Part 2-9로 변경 완료 상태였으나, 파일 내부의 Part 참조 텍스트가 일괄 "Part 9"로 잘못 변환된 상태를 수정함.

| Metric | Count |
|--------|-------|
| 파일명 변경 | 0 (이미 완료 상태) |
| 내부 텍스트 수정 파일 | 8 |
| 전체 링크 검증 | 190개 |
| 깨진 링크 (기존) | 2개 (pre-existing) |
| 깨진 링크 (신규 Part 0) | 2개 (01-harness-engineering-guide.md 미생성) |

## 수정된 파일

### 00-index.md
- 모든 `### Part 9:` 섹션 헤더 → 올바른 Part 2-9 번호로 수정
- 테이블 `| 9.X |` → `| 2.X |` ~ `| 9.X |` 올바른 번호로 수정
- 대상 독자 권장 경로 업데이트
- "Part 1의 설치부터 Part 8의 전략" → "Part 2의 설치부터 Part 9의 전략"
- (이후 team-lead에 의해 v1.1 하네스 구조로 추가 업데이트됨)

### 2.1-why-now.md
- 코스 구조 다이어그램: Part 9 x8 → Part 2~9 올바른 번호
- J/P/L 레벨별 추천 경로: Part 9.X 참조 → 올바른 Part 번호
- "Part 9.3에서 프로젝트 메모리" → "Part 3.3에서 프로젝트 메모리"

### 2.3-install-and-first-run.md
- "Part 9: 데이터 정리 워크플로" → "Part 3: 데이터 정리 워크플로"

### 3.3-project-memory.md
- "## Part 9: Claude Memory" → "## Part 3 보너스: Claude Memory"

### 9.2-growth-path.md
- "Part 9~3" → "Part 5~8" (6회)
- "Part 9~5" → "Part 7~9" (3회)

### A.1-running-scenario.md
- "Part 9.1 기법" → "Part 6.1 기법"

### bridge-modules.md (전체 재작성)
- Mermaid 다이어그램: Part 9 x8 → Part 2~9 올바른 번호
- 3가지 읽기 경로: 모든 Part 참조 수정
- FAQ: 모든 Part 참조 수정
- Part 간 연결 상세: 섹션 번호 수정

### dependency-map.md
- Part 1-8 → Part 2-9 전체 변환 (자동 스크립트 + 수동 보정)
- 서브섹션 범위 헤더 수정 (Part X.Y-Z.W 패턴)
- 결론 섹션 Part 배치 수정
- Tier 매핑 테이블 수정

## 기존 깨진 링크 (이번 마이그레이션과 무관)

| 파일 | 깨진 링크 | 원인 |
|------|----------|------|
| 3.3-project-memory.md | 2.1-claude-code-basics.md | 존재하지 않는 파일 참조 |
| 8.5-marketplace-strategy.md | 2.1-claude-code-basics.md | 존재하지 않는 파일 참조 |
| 00-index.md | 01-harness-engineering-guide.md | Part 0 파일 아직 미생성 |

## 검증 결과

- Part 1 참조: 0개 (모두 제거 완료)
- Part 9 참조: 정상 (Part 9 파일에서의 자기 참조 + 타 파일의 정당한 Part 9 참조만 존재)
- 파일 링크 정합성: 186/190 정상 (4개 기존 이슈)
