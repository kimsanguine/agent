# 1.2: 작업 공간 시각화하기
원문: https://ccforpms.com/fundamentals/visualizing-files

## 한 줄 요약
Claude Code를 터미널만 쓰지 말고 에디터를 함께 열어 파일 생성·수정을 실시간으로 확인하라는 실전 설정 가이드입니다.

## 핵심 내용
- 목표는 Claude Code 작업을 눈으로 검증할 수 있는 시각적 워크스페이스를 만드는 것입니다(약 15–20분).
- 추천 도구는 **Nimbalyst**로, WYSIWYG markdown, file diffs, `.claude/` 가시성, 세션 관리, Claude Code 통합이 강점입니다.
- **Obsidian**은 문서 중심 사용에 좋지만 `.claude/`를 직접 보여주지 않아 Finder/Explorer 보조 확인이 필요합니다.
- **VS Code / Cursor**는 hidden folders 확인과 코드 편집에 강하지만 PM 문서 작업만 할 때는 다소 복잡할 수 있습니다.
- `.claude/`에는 agents, commands, settings가 들어 있으며, 도구별로 접근 방식이 다릅니다.
- 핵심 작업 방식은 split-screen(터미널 + 에디터)이며, 이 방식이 진행 투명성과 품질 확인 속도를 높입니다.

## 실습/실행 단계
1. Claude Code에서 `/start-1-2`를 실행합니다.
2. Nimbalyst 또는 Obsidian(또는 VS Code/Cursor)을 설치하고 프로젝트 폴더를 엽니다.
3. 터미널과 에디터를 나란히 배치해 split-screen 환경을 만듭니다.
4. Claude Code에 `test-visualization.md` 파일 생성을 요청해 실시간 반영을 확인합니다.
5. 생성된 파일을 열어 내용·위치·구조를 점검합니다.
6. 문제가 있으면 올바른 프로젝트 경로를 다시 열고, 필요 시 파일 재열기/에디터 재시작을 수행합니다.

## 기억할 포인트
- 터미널 단독 작업보다 split-screen이 훨씬 안전하고 빠릅니다.
- 파일이 안 보이면 상위 폴더를 연 경우가 많으니 프로젝트 폴더 자체를 열어야 합니다.
- Obsidian은 `.claude/`를 숨기므로 Finder/Explorer에서 hidden files를 켜서 확인합니다.
- 자주 쓰는 단축키: Obsidian `Cmd/Ctrl + O`, `Cmd/Ctrl + Shift + F`, `Cmd/Ctrl + E`; VS Code `Cmd/Ctrl + P`.
