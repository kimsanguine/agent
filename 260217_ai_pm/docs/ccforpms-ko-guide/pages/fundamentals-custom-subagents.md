# 1.5: 커스텀 서브 에이전트
원문: https://ccforpms.com/fundamentals/custom-subagents

## 한 줄 요약
`Custom sub-agent`를 `.claude/agents/`에 파일로 정의해, 반복적으로 필요한 전문 관점을 즉시 재사용하는 방법을 익히는 모듈이다.

## 핵심 내용
- Module 1.5는 일회성 `ad-hoc agents`에서 확장해, 상시 호출 가능한 전문가 persona를 만드는 법을 다룬다.
- `ad-hoc agents`는 대량 병렬 처리에, `custom sub-agents`는 정기적인 전문 리뷰에 더 적합하다.
- sub-agent는 Markdown 파일로 관리하며 핵심 구성은 `Emoji+Name`, `Color`, `Persona`, `Expertise`다.
- 저장 위치는 프로젝트의 숨김 폴더 `.claude/agents/`; Mac/Windows에서 hidden files 표시가 필요하다.
- 예시 역할로 `👨‍💻 Engineer`, `💼 Executive`, `👤 User Researcher`가 소개되며 PM 업무에 맞게 확장 가능하다.
- 좋은 persona는 배경·강점·커뮤니케이션 스타일이 구체적이고, 반복 사용되는 역할일수록 효과가 크다.

## 실습/실행 단계
1. Claude Code에서 `/start-1-5`를 실행해 인터랙티브 실습을 시작한다.
2. 프로젝트의 `.claude/agents/` 폴더를 연다. (Finder/File Explorer에서 hidden files 표시)
3. `qa-tester.md`를 생성한다. 규칙: lowercase + hyphen + `.md`.
4. 파일에 `## Color`, `## Persona`, `## Expertise`를 작성해 QA 역할을 정의한다.
5. 터미널에서 `claude` 실행 후 `🔍 QA Tester, ...` 형태로 호출해 동작을 확인한다.
6. `/agents`로 등록 목록을 확인하고, 문제 시 경로/파일명/확장자를 점검한 뒤 `exit` 후 `claude`로 재시작한다.

## 기억할 포인트
- 실무 기준: 병렬 처리면 `ad-hoc`, 반복 전문 관점이면 `custom sub-agent`.
- 호출 정확도를 높이려면 emoji와 이름을 함께 쓰는 습관이 유리하다.
- 다음 Module 1.6의 `CLAUDE.md` Project Memory와 결합하면 역할+맥락을 함께 고정할 수 있다.
