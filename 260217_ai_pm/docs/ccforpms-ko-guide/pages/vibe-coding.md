# 모듈 4: Vibe Coding (모듈 개요)
원문: https://ccforpms.com/vibe-coding

## 한 줄 요약
Claude Code로 웹앱을 기획·구현·개선하고, GitHub와 Vercel까지 연결해 실제 URL로 배포하는 1~2시간 실습입니다.

## 핵심 내용
- 이 모듈의 목표는 처음부터 웹앱을 만들어 공개 배포까지 완료하는 것입니다.
- 예시 결과물은 personality quiz app이며, 질문별 로직·답변 기반 성격 유형 결과·공유 가능한 live URL을 포함합니다.
- 학습 구성:
  - 4.1 Setup: vibecoding mindset, project folder setup
  - 4.2 Plan: 인터뷰 방식으로 요구사항 정리
  - 4.3 Build & Iterate: scaffold 후 screenshot 기반 반복 개선
  - 4.4 GitHub: version control, backup
  - 4.5 Go Live: Vercel 배포
- Modules 1~3 선행 학습이 권장되며, Claude Code 미설치 시 0.1 Installation을 먼저 진행합니다.

## 실습/실행 단계
1. 터미널을 열고 작업 위치를 Documents로 맞춘 뒤 `claude-code-course` 폴더를 준비합니다.
2. 자료를 받는 방법 3가지 중 하나를 선택합니다.
   - **Option 1 (Mac/Linux, 권장)**
     ```bash
     cd ~/Documents && \
     curl -L https://github.com/carlvellotti/claude-code-pm-course/releases/latest/download/complete-course.zip -o claude-code-course.zip && \
     unzip -o claude-code-course.zip && \
     cd claude-code-course && \
     claude
     ```
   - **Option 2**: `claude` 실행 후 zip 다운로드/압축해제를 Claude에게 요청
   - **Option 3**: `complete-course.zip` 수동 다운로드 후 Documents에 압축 해제
3. `claude-code-course` 폴더에서 Module 4를 시작하고 4.1 Setup으로 이동합니다.

## 기억할 포인트
- 핵심 흐름은 설명(의도) → 생성(구현) → 반복(수정)입니다.
- 코딩 경험이 없어도 실습 가능하도록 단계가 설계되어 있습니다.
- 최종 완성 기준은 기능 구현뿐 아니라 GitHub 관리와 Vercel 공개 배포까지입니다.
