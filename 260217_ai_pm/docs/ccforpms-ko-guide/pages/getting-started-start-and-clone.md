# 0.2: Claude Code 시작 & 코스 클론
원문: https://ccforpms.com/getting-started/start-and-clone

## 한 줄 요약
Claude Code에서 자연어 지시로 코스 파일을 내려받고, 올바른 폴더 컨텍스트에서 `/start-1-1`까지 실행하는 입문 단계다.

## 핵심 내용
- 목적: PM이 복잡한 git/터미널 절차 대신, 원하는 작업을 말하고 Claude가 실행하게 하는 패턴을 익힌다.
- 기본 흐름: `~/Documents`로 이동 → zip 다운로드 → `claude-code-course`에 압축 해제 → `claude "/start-1-1"` 실행.
- 대안 흐름: 먼저 `claude`를 켜서 다운로드/압축 해제를 요청한 뒤, 폴더로 재진입해 학습을 시작할 수 있다.
- 문제 대응: `curl`/`unzip` 미설치, 다운로드 실패, 저장 위치 변경 시의 대체 절차가 제공된다.
- 검증: Claude에게 모듈/학습목표/persona 질문을 던져 파일 읽기와 컨텍스트 이해를 확인한다.

## 실습/실행 단계
1. 터미널을 연다. (Mac: `Cmd + Space` → Terminal, Windows: PowerShell)
2. 아래 명령을 실행한다.
   ```bash
   cd ~/Documents && \
   curl -L https://github.com/carlvellotti/claude-code-pm-course/releases/latest/download/complete-course.zip -o course.zip && \
   unzip course.zip -d claude-code-course && \
   cd claude-code-course && \
   claude "/start-1-1"
   ```
3. 대안으로 `claude`를 먼저 실행해 다운로드를 요청하고, 종료 후 `cd ~/Documents/claude-code-course && claude`로 다시 시작한다.
4. Claude 실행 후 다음처럼 확인 질문을 보낸다.
   - "Show me all the Level 1 modules."
   - "List the learning objectives for Module 1.3"
   - "What user personas are available in the context folder?"

## 기억할 포인트
- 목표 중심으로 말하고, 세부 명령 조합은 Claude에 맡긴다.
- `claude-code-course` 폴더 안에서 실행해야 `/start` 명령과 파일 컨텍스트가 정확히 동작한다.
- 문제가 생기면 GitHub Releases에서 수동 다운로드 후 압축 해제로 동일하게 진행하면 된다.
