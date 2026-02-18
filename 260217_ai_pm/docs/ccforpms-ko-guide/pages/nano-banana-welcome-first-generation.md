# 3.1.1: 환영 및 첫 이미지 생성
원문: https://ccforpms.com/nano-banana/welcome-first-generation

## 한 줄 요약
Gemini 3 Pro의 API key와 billing을 한 번만 설정하면, 이후에는 Claude Code에서 자연어로 이미지 생성을 빠르게 반복할 수 있다.

## 핵심 내용
- 이 단원은 약 10분 분량이며, Module 3.0에서 받은 Nano Banana 파일이 준비되어 있어야 한다.
- Gemini 3 Pro는 텍스트 기반 생성, reference photo 변환, 텍스트 오버레이, 스타일/인물 일관성 유지에 강하다.
- API 직접 사용의 장점은 유연한 활용 범위, 세부 파라미터 제어, session 기반 반복, 낮은 비용(약 $0.10/image)이다.
- 실제 생성은 `image_gen.py`를 통해 수행되며 Claude가 `generate()`, 세션, 파일 저장을 대신 처리한다.
- 결과 이미지는 `outputs/`에 순번으로 저장되고, 보통 10~15초 내 생성된다.

## 실습/실행 단계
1. Claude Code에서 `/start-3-1-1` 실행.
2. `Google AI Studio`에서 API key 생성 후 복사(`AIza...` 형식).
3. 같은 곳에서 billing을 활성화하고 결제 수단 연결.
4. Claude에게 key를 전달해 `.env` 자동 설정, 또는 `.env.example` → `.env` 복사 후 `GEMINI_API_KEY=YourKeyHere` 입력.
5. 원하는 이미지를 자연어로 요청해 첫 생성 실행.
6. `outputs/`에서 결과를 열어 확인하고, 피드백으로 재생성.
7. 다음 단계는 `/start-3-1-2`로 진행.

## 기억할 포인트
- 인증 오류가 나면 `.env` 존재 여부, key 공백/오타, `AIza` 시작 여부를 먼저 확인.
- billing 활성화 직후에는 반영 지연이 있을 수 있어 잠시 후 재시도 필요.
- 생성 실패가 반복되면 네트워크 점검 후 "Start a new session"으로 초기화.
- API key는 비공개로 관리하고 `.env`는 git에 커밋하지 않는다.
- Terminal 대신 Finder/Explorer 또는 이미지 뷰어로 결과를 확인하는 것이 좋다.
