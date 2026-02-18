# 3.0: 설정 및 다운로드
원문: https://ccforpms.com/nano-banana/setup

## 한 줄 요약
Nano Banana 시작 전, Claude Code 기반 이미지 생성 환경을 약 5분 안에 세팅하고 `/start-3-1-1`로 첫 레슨을 연다.

## 핵심 내용
- 이 페이지의 목적은 이미지 프롬프트 자체보다, Claude Code로 운영하는 실무형 생성 워크플로를 준비하는 것이다.
- 사용 모델은 **Gemini 3 Pro Preview (Nano Banana Pro)**이며, 생성 실행·배치 생성·파일 관리·스타일 라이브러리화·반복 개선을 다룬다.
- 준비물: Claude Code, Google account, Google Cloud billing 결제수단.
- 비용 안내: 이미지당 약 $0.10 수준, 전체 모듈 진행 비용은 대략 $5 이하.
- 이후 학습은 3.1(기초/스타일) → 3.2(PM 활용 시각화) 순으로 진행된다.

## 실습/실행 단계
1. `~/Documents`에 코스 압축 파일을 내려받아 풀고 `claude-code-pm-course` 폴더를 준비한다.
2. 해당 폴더에서 Claude Code를 실행한 뒤 `/start-3-1-1`을 입력한다.
3. 자동 다운로드가 실패하면 최신 릴리즈 zip을 수동 다운로드/압축해제 후 아래 명령으로 시작한다.
   `cd ~/Documents/claude-code-pm-course && claude`
4. Claude 안내에 따라 Gemini API key 발급, billing 설정, 첫 이미지 생성까지 완료한다.

## 기억할 포인트
- `/start-...` 명령은 반드시 `claude-code-pm-course` 폴더 내부에서 실행해야 동작한다.
- `curl` 또는 `unzip` 문제가 있으면 Mac은 `xcode-select --install`, Windows는 수동 다운로드 방식 사용.
- 핵심은 결과물 1회 생성이 아니라, 재사용 가능한 PM용 이미지 제작 파이프라인 구축이다.
