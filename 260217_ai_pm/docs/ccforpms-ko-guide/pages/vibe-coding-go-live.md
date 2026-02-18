# 4.5: Go Live (배포하기)
원문: https://ccforpms.com/vibe-coding/go-live

## 한 줄 요약
로컬 프로젝트를 Vercel에 배포하고, GitHub 연동으로 push마다 자동 배포되는 운영 흐름을 익히는 단계입니다.

## 핵심 내용
- 목표는 프로젝트를 인터넷에 공개해 공유 가능한 실제 URL을 만드는 것.
- Deployment는 내 PC의 코드를 외부 서버로 올려 공개 상태로 전환하는 과정이다.
- Hosting은 서버 운영(상시 실행, 트래픽 처리)을 플랫폼이 대신 담당하는 방식이다.
- Vercel은 Next.js와 궁합이 좋고, GitHub 연동 시 자동 배포 구성이 간단하다.
- 기본 자동 배포 흐름은 GitHub push → 변경 감지 → 재빌드/재배포 → 수분 내 반영이다.
- Vercel CLI를 사용하면 터미널(Claude Code 포함)에서 직접 배포할 수 있다.
- 배포 후에는 모바일 테스트, 링크 공유, 반복 개선-배포 사이클이 핵심이다.

## 실습/실행 단계
1. Claude Code에서 `/start-4-5`로 인터랙티브 레슨을 시작한다.
2. 프로젝트를 GitHub repo에 준비하고 Vercel에 연결한다.
3. 필요하면 Vercel CLI를 설치한다: `npm i -g vercel`
4. 인증 실패 시 `vercel login`을 다시 실행하고 브라우저 인증을 완료한다.
5. 배포 후 생성된 `*.vercel.app` URL에서 실제 동작을 확인한다.
6. 코드 수정 후 GitHub에 push하여 자동 재배포가 되는지 검증한다.
7. 문제 발생 시 Vercel dashboard의 build logs를 먼저 확인하고 오류를 수정한다.

## 기억할 포인트
- `vercel: command not found`는 CLI 미설치 이슈일 가능성이 크다.
- `Project not found`는 잘못된 프로젝트 폴더에서 실행한 경우가 많다.
- 로컬 정상/배포 실패는 환경 차이 문제일 수 있으므로 build logs 확인이 우선이다.
- 전체 루프는 Plan → Build → Iterate → Save → Go Live이며, 다른 프로젝트에도 동일하게 적용된다.
