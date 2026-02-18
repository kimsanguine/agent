# 0.1: 설치 및 사전 준비
원문: https://ccforpms.com/getting-started/installation

## 한 줄 요약
Claude Code는 Node.js v18+와 Claude Pro/Max가 필요하며, 설치→버전 확인→인증→`/doctor` 점검 순서로 진행하면 된다.

## 핵심 내용
- 완료 시간은 약 15분이며, 무료 Claude 플랜으로는 사용할 수 없다.
- 필수 조건은 Claude Pro 또는 Max, Node.js 18 이상, macOS/Windows 10+ 환경이다.
- 모든 과정은 터미널(또는 PowerShell)에서 명령어로 수행한다.
- 첫 실행 로그인에서 "Claude account with subscription"을 선택해야 정상 인증된다.
- `/doctor`는 설치 상태, 구독 연결, 시스템 설정, 일반 오류를 한 번에 확인하는 진단 명령이다.
- 자주 겪는 문제는 `claude` 미인식, 구독 미연결, 오래된 Node 버전, 권한 부족이다.

## 실습/실행 단계
1. 터미널에서 Node 버전 확인: `node --version`
2. v18 미만이면 Node.js 설치
   - macOS: `brew install node`
   - Windows: `choco install nodejs`
3. 터미널을 완전히 닫고 다시 열어 PATH 반영
4. Claude Code 설치
   - macOS: `curl -fsSL https://claude.ai/install.sh | bash`
   - Windows (PowerShell): `irm https://claude.ai/install.ps1 | iex`
5. 설치 확인: `claude --version`
6. 실행 및 인증: `claude`
7. Claude Code 내부에서 점검: `/doctor`

## 기억할 포인트
- 설치 직후 `claude`가 안 잡히면 터미널 재시작을 먼저 시도한다.
- macOS PATH 문제 시 `~/.bashrc` 또는 `~/.zshrc`에 `export PATH=$HOME/.local/bin:$PATH` 추가가 필요할 수 있다.
- 권한 오류 시 macOS는 `sudo curl -fsSL https://claude.ai/install.sh | bash`, Windows는 관리자 권한 PowerShell을 사용한다.
- 다음 학습은 Module 0.2(Claude Code 시작 및 저장소 클론)로 이어진다.
