# 1.3: 첫 PM 실무 작업
원문: https://ccforpms.com/fundamentals/first-tasks

## 한 줄 요약
이 모듈은 Claude Code에서 `@` 파일 참조, `Ctrl+V` 이미지 분석, output style 재사용으로 PM 반복 업무를 빠르게 처리하는 실습이다.

## 핵심 내용
- 학습 분량은 약 30분이며, 선행으로 Module 1.1·1.2가 필요하고 시작 명령은 `/start-1-3`이다.
- 핵심 역량은 5가지: File Reading/Writing, Content Analysis, Image Pasting, Visual Analysis, Output Styles.
- `@`는 파일 지정의 기본 규칙이며, 단일 파일·복수 파일·폴더 단위 작업을 한 번에 지시할 수 있다.
- 자주 쓰는 포맷은 `.md`, `.txt`, `.csv`, `.json`, `.pdf`, 이미지(`.png/.jpg/.gif`)까지 포함된다.
- 이미지 붙여넣기는 OS와 무관하게 터미널에서 `Ctrl+V`를 사용한다(Mac도 동일).
- 같은 원본 내용을 Slack/Email/Notion 등 대상별 톤과 깊이로 변환해 커뮤니케이션 효율을 높인다.
- output style을 만들어 두면 Executive Briefing, User Story, Weekly Update 같은 문서를 반복 생성하기 쉽다.
- 회의 정리·리서치 합성·이해관계자 업데이트에서 수작업 대비 큰 시간 절감 효과를 기대할 수 있다.

## 실습/실행 단계
1. `/start-1-3`로 인터랙티브 실습을 시작한다.
2. `@`를 써서 입력 파일을 명시하고 결과 파일까지 지정한다. (예: `Read @input.txt and create @summary.md`)
3. 여러 문서/폴더를 함께 읽게 하여 공통 패턴, 액션 아이템, 우선순위를 추출한다.
4. 스크린샷 또는 복사한 이미지를 터미널에 `Ctrl+V`로 붙여넣고 UX/기술/접근성 관점 분석을 요청한다.
5. 동일한 소스를 Slack/Stakeholder Email/Notion Document 형태로 각각 변환한다.
6. `Create output style ...`로 템플릿을 만들고, 이후 문서에 반복 적용해 작성 시간을 줄인다.
7. 오류 시 파일명 대소문자, 경로, 이미지 크기, 저장 위치를 먼저 점검한다.

## 기억할 포인트
- 파일 작업은 `@filename`을 명확히 써야 정확도가 높다.
- Mac 터미널에서도 이미지 붙여넣기는 `Ctrl+V`가 정답이다.
- 결과는 파일로 저장해야 다음 작업에서 재참조할 수 있다.
- output style은 작게 시작해 점진적으로 확장하는 편이 안정적이다.
- 다음 학습은 Module 1.4이며 시작 명령은 `/start-1-4`이다.
