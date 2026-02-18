# 4.3: 빌드 & 반복 개선
원문: https://ccforpms.com/vibe-coding/build-iterate

## 한 줄 요약
Claude Code로 로컬에서 앱을 만들고, 스크린샷 기반 피드백으로 빠르게 반복 개선하는 방법을 익히는 수업입니다.

## 핵심 내용
- 권장 학습 시간은 30~40분이며, 시작은 Claude Code에서 `/start-4-3` 실행입니다.
- Development Server는 내 컴퓨터에서만 동작하고, 미리보기 중에는 계속 실행되어야 하며 종료는 `Ctrl+C`로 합니다.
- `localhost`는 내 컴퓨터를 서버처럼 가리키는 주소이고, `localhost:3000`은 3000번 포트를 뜻합니다.
- Plan Mode는 실행 전에 계획을 먼저 보여주는 기능으로, `Shift+Tab`으로 전환해 검토 후 진행할 수 있습니다.
- 개발은 반복 개선이 핵심이며, AI를 활용하면 수정 주기를 크게 단축할 수 있습니다.
- `Ctrl+V`로 이미지를 Claude Code에 붙일 수 있습니다. 시각적으로 수정 요청하면 커뮤니케이션 효율이 높아집니다.
- 다음 단계는 4.4 GitHub로, 코드 백업과 배포 준비를 진행합니다.

## 실습/실행 단계
1. Claude Code에서 `/start-4-3`를 실행해 프로젝트 생성 및 초기 빌드를 시작합니다.
2. dev server를 실행한 뒤 브라우저에서 `http://localhost:3000`으로 결과를 확인합니다.
3. 큰 작업은 Plan Mode(`Shift+Tab`)로 계획을 먼저 확인·수정한 뒤 실행합니다.
4. UI/동작 문제가 보이면 스크린샷을 찍어 `Ctrl+V`로 붙여넣고 원하는 변경사항을 설명합니다.
5. 수정→확인 과정을 반복하고, 완료 후 4.4 GitHub 단계로 이동합니다.

## 기억할 포인트
- `"npm: command not found"`: Node.js 설치 후 터미널을 다시 시작합니다.
- `"Port 3000 already in use"`: 기존 서버를 종료하거나 다른 포트를 사용합니다.
- 브라우저가 자동으로 안 열리면 `http://localhost:3000`을 직접 입력합니다.
- 빈 화면이면 터미널 build 에러와 브라우저 Console(F12)을 함께 확인합니다.
- 변경이 반영되지 않으면 새로고침과 dev server 실행 상태를 점검합니다.
- 스타일이 이상하면 강력 새로고침(`Cmd+Shift+R`/`Ctrl+Shift+R`)이나 incognito 창을 사용합니다.
