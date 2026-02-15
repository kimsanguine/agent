# SkyWings Flight Booking Landing

비행기 예약 서비스 컨셉의 랜딩 페이지 프로젝트입니다.
Vite + React 기반으로 제작되었고, 메인 랜딩 UI와 Snake 미니게임 섹션이 포함되어 있습니다.

## 구현된 내용

- 고정 헤더 + 섹션 앵커 내비게이션 (`#hero`, `#destinations`, `#features`, `#snake`, `#footer`)
- 히어로 섹션 항공권 검색 위젯
  - Round Trip / One Way / Multi-City 탭
  - 출발지/도착지/날짜/인원 입력
  - 제출 시 유효성 검사 및 검색 요약 결과 표시
- 추천 여행지 카드 그리드 (호버 인터랙션)
- Features 섹션 (가격 보장/유연한 예약/24시간 지원)
- Snake 미니게임
  - 방향키/WASD 이동, 일시정지/재시작
  - 모바일용 온스크린 컨트롤
- 푸터 링크/연락처/저작권 UI

## 기술 스택

- React 19
- Vite 7
- ESLint 9
- Node built-in test runner (`node --test`) for game logic

## 실행 방법

```bash
npm install
npm run dev
```

기본 개발 서버: `http://localhost:5173`

## 사용 가능한 스크립트

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # ESLint 검사
npm run test     # Snake 로직 테스트 실행
```

## 프로젝트 구조

```text
src/
  components/
    Header.jsx
    Hero.jsx
    Destinations.jsx
    SnakeGame.jsx
    SnakeGame.css
    Footer.jsx
  game/
    snakeLogic.js
    snakeLogic.test.js
  App.jsx
  main.jsx
  index.css
```

## 현재 진행 상태

- 기본 랜딩 페이지 UI: 완료
- Hero 검색 폼 동작 연결: 완료
- Features(이용 안내/특장점) 전용 섹션: 완료
- 반응형/애니메이션 최종 점검: 완료

세부 체크리스트는 `todo.md`를 참고하세요.
