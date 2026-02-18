# 1.6: 프로젝트 메모리 (CLAUDE.md)
원문: https://ccforpms.com/fundamentals/project-memory

## 한 줄 요약
`CLAUDE.md`를 프로젝트의 영구 규칙 문서로 관리하면, Claude가 모든 세션에서 제품 맥락과 팀 기준을 일관되게 적용한다.

## 핵심 내용
- 이 모듈은 약 20~25분 분량이며, `CLAUDE.md`를 프로젝트 메모리로 쓰는 방법을 다룬다.
- `CLAUDE.md`는 세션 시작 시 자동 로드되고, 해당 디렉터리의 모든 대화에 지속 적용되며, git으로 팀 공유가 가능하다.
- 우선순위는 `CLAUDE.md`가 프롬프트보다 높다. 충돌 시 프롬프트가 아니라 `CLAUDE.md` 기준이 적용된다.
- `#`으로 시작하는 규칙은 현재 세션에만 적용되는 임시 규칙이다. 효과가 좋으면 `CLAUDE.md`로 옮겨 영구화한다.
- `CLAUDE.md`에 적합한 내용: 제품/회사 컨텍스트, 사용자 페르소나, 글쓰기 스타일, 용어 표준, ALWAYS/NEVER 형태의 불변 규칙.
- 부적합한 내용: 스프린트 단기 정보, 자주 바뀌는 목표, 민감 정보(API keys 등).
- 계층은 `~/.claude/CLAUDE.md`(Global) → `/project-root/CLAUDE.md`(Project) → `/project-root/frontend/CLAUDE.md`(Directory) → `/project-root/CLAUDE.local.md`(Personal)로 구성되며, 더 구체적인 위치가 우선한다.
- 권장 운영: 문서는 50~200줄로 유지하고, 분기별 점검 및 PR 리뷰로 최신 상태를 유지한다.

## 실습/실행 단계
1. Claude Code에서 `/start-1-6`를 실행해 인터랙티브 모듈을 시작한다.
2. 프로젝트 루트에 `CLAUDE.md`를 만들고 기본 섹션(제품 설명, 페르소나, 스타일, 용어, 불변 규칙)을 채운다.
3. 임시 실험 규칙은 대화에서 `#`로 테스트하고, 장기적으로 필요하면 `CLAUDE.md`에 반영한다.
4. 개인 전용 설정은 `CLAUDE.local.md`에 작성하고 `.gitignore`에 `CLAUDE.local.md`를 추가한다.
5. 로딩/구조를 점검한다: `ls CLAUDE.md`, `ls -la CLAUDE.md`, `find . -name CLAUDE.md`.
6. 최종 확인으로 Claude에게 `CLAUDE.md` 내용을 요약해보게 해 규칙 반영 여부를 검증한다.

## 기억할 포인트
- 6개월 뒤에도 유효한 정보는 `CLAUDE.md`, 다음 주 바뀔 가능성이 큰 정보는 프롬프트에 둔다.
- 규칙은 모호하게 쓰지 말고 ALWAYS/NEVER 형태로 명확히 작성한다.
- 용어 표준은 특히 강력하다. 문서 전반의 표현 일관성을 강제하는 핵심 장치다.
- 다음 모듈은 `/start-1-7`로 이어지며 Planning Mode를 학습한다.
