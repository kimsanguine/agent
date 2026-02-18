# 4.4: GitHub 설정과 업로드
원문: https://ccforpms.com/vibe-coding/github

## 한 줄 요약
로컬 프로젝트를 비공개 GitHub repo에 올리고, 다음 Vercel 배포를 위해 Git/`gh` 기본 흐름을 익히는 단계다.

## 핵심 내용
- 목표: 약 15분 안에 프로젝트를 private GitHub repository로 push한다.
- 시작: Claude Code에서 `/start-4-4`를 실행해 인터랙티브 레슨으로 진행한다.
- Version control은 파일 변경 이력을 남겨서 복구, 비교, 실수 되돌리기를 쉽게 한다.
- Git은 로컬 버전 관리 도구, GitHub는 해당 repo를 클라우드에 저장·공유하는 플랫폼이다.
- 핵심 용어:
  - Repository: Git으로 추적되는 프로젝트 폴더
  - Commit: 특정 시점의 저장 스냅샷
  - Push: 로컬 커밋을 GitHub로 업로드
  - Pull: GitHub 변경분을 로컬로 다운로드
- 배포 관점에서 GitHub가 필요한 이유: 코드 백업뿐 아니라 Vercel이 repo에서 코드를 가져와 배포하기 때문이다.
- `gh`(GitHub CLI)로 인증/연동을 진행하며, 브라우저 기반 device code 방식으로 로그인한다.

## 실습/실행 단계
1. Claude Code에서 `/start-4-4` 실행.
2. `gh` 설치 확인:
   - Mac: `brew install gh`
   - 기타 OS: `cli.github.com`에서 설치
3. `gh auth login` 실행 후 브라우저에서 코드 입력 및 Authorize 완료.
4. 프로젝트를 원하는 private GitHub repo로 push.
5. 오류 시 대응:
   - "gh: command not found" → `gh` 설치
   - "Authentication failed" → `gh auth login` 재실행 후 브라우저 단계 완료
   - "Repository already exists" → repo 이름 변경 또는 기존 repo 삭제
   - "Permission denied" → 인증 갱신 위해 `gh auth login` 재실행
   - github.com에서 repo 미확인 → 브라우저 GitHub 계정 확인

## 기억할 포인트
- Git(로컬 도구)과 GitHub(원격 저장소)는 역할이 다르다.
- 배포 자동화의 출발점은 GitHub repo 연결이다.
- 인증 문제는 대부분 `gh auth login` 재실행으로 해결된다.
