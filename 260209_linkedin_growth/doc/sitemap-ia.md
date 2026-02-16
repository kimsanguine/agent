# LinkedIn Growth Dashboard IA (업데이트)

기준: `dashboard/src/components/layout/Dashboard.tsx`, `CommentQueuePanel.tsx`, `TargetProfilesList.tsx`, `PostPerformanceTable.tsx`

- 현재 구현 상태(As-Is)와 요구사항 보강안(To-Be)을 함께 정리했습니다.
- 확인 결과, 말씀하신 **"어떤 사람과 connect/follow 해야 하는지 추천" 기능은 현재 IA에 없음**이 맞습니다.
- 아래는 해당 누락 기능을 반영한 IA + 점수화 기준입니다.

---

## 1) 현재 구현 IA (As-Is)

### Root
- LinkedIn Growth Dashboard

### Global Navigation
- 상단 탭 (3)
  - 대시보드
  - 포스트
  - 참여

### 대시보드 탭
- KPI 카드
  - 총 팔로워
  - 평균 노출
  - 평균 참여율
  - 총 포스트
- 차트
  - 인게이지먼트 트렌드
  - 팔로워 성장 추이
- AI 콘텐츠 인사이트 패널
- 4주 성장 추세 텍스트

### 포스트 탭
- 포스트 성과 테이블
  - 컬럼: 포스트, 노출, 참여율, 반응, 댓글, 날짜
  - 정렬: 노출/참여율/반응/댓글/날짜

### 참여 탭
- 댓글 큐 패널
  - 상태 필터: 대기/승인/게시/전체
  - 댓글 아이템 액션: 승인/수정/거부/복사/게시 완료
- 타겟 프로필 패널
  - 타겟 목록
  - 우선순위/토픽/참여 횟수/최근 참여일
  - 외부 프로필 링크

---

## 2) 요구사항 반영 IA (To-Be)

> 누락된 핵심 기능 추가: **네트워크 추천 (Connect/Follow Recommendation)**

### Root
- LinkedIn Growth Dashboard

### Global Navigation
- 상단 탭 (3)
  - 대시보드
  - 포스트
  - 참여

### 참여 탭 (강화)
- 댓글 큐 패널
- 타겟 프로필 패널
- **[신규] 추천 타겟 패널 (Connect/Follow)**
  - 추천 리스트 (Top N)
  - 카드 정보
    - 이름/직함
    - 연결 거리(1촌/2촌)
    - 공통 관심사/주제
    - 최근 활동 신호(게시 빈도/반응)
    - 추천 사유
    - 추천 점수
  - 액션
    - Connect
    - Follow
    - 타겟 목록에 추가
    - 숨김/보류

---

## 3) 추천 점수/분류 기준 (Scoring Model v0.1)

### 3.1 내 LinkedIn 프로필 DNA 분류

최근 30일 데이터를 3축으로 계산해 프로필 타입을 정의합니다.

- **콘텐츠 축(Content Fit)**: 어떤 포스트 타입/주제가 성과를 내는지
- **상호작용 축(Interaction Style)**: 반응 대비 댓글 비율, 대화 유도력
- **운영 축(Operating Rhythm)**: 발행 빈도, 일관성, 성장 유지력

타입 예시:
- **Builder**: 실무/빌드 로그형 강세
- **Insight**: 분석/인사이트형 강세
- **Connector**: 대화/관계형 강세
- **Storyteller**: 경험/서사형 강세

### 3.2 내 인기도 지수 (PI: Popularity Index, 0~100)

```text
PI = 0.45 * ReachScore
   + 0.35 * EngagementQualityScore
   + 0.20 * GrowthVelocityScore
```

- `ReachScore`: 평균 노출의 상대 백분위
- `EngagementQualityScore`: 참여율 + 댓글율 기반 품질
- `GrowthVelocityScore`: 주간 팔로워 순증 속도

등급:
- 0~39: Seed
- 40~59: Rising
- 60~79: Growing
- 80~100: Authority

### 3.3 추천 타겟 점수 (TRS: Target Recommendation Score, 0~100)

```text
TRS = 0.30 * TopicFit
    + 0.25 * ResponseProbability
    + 0.20 * PopularityFit
    + 0.15 * NetworkDistanceFit
    + 0.10 * RecentActivity
    - Penalty
```

세부 항목:
- `TopicFit`: 내 핵심 주제와 타겟 주제 유사도
- `ResponseProbability`: 과거 상호작용 기반 반응 가능성
- `PopularityFit`: 내 PI와 타겟 영향력의 적정 매칭
- `NetworkDistanceFit`: 1촌/2촌, 공통 연결/공통 커뮤니티
- `RecentActivity`: 최근 게시/활동 신호
- `Penalty`: 최근 접촉 과다, 중복 타겟, 비활성 계정 등

### 3.4 액션 매핑 (운영 규칙)

- **80+**: Connect 추천
- **65~79**: Follow + 댓글 워밍업 추천
- **50~64**: 관찰 리스트 유지
- **49 이하**: 제외/보류

---

## 4) Gap 정리

- 현재 UI는 **타겟 관리(목록)** 까지는 제공하지만,
  **"누구와 연결/팔로우할지 추천" 결정 지원 레이어가 비어 있음**.
- 따라서 major design check 기준에서 이 기능은 **누락 항목**으로 보는 것이 맞습니다.

---

## 5) 권장 IA 반영 위치

- 기본 권장 위치: `참여 탭` 내 우측 컬럼(타겟 프로필 패널 위 또는 하위 섹션)
- 이유:
  - 현재 사용자가 댓글 실행/타겟 탐색을 같은 맥락에서 수행 중
  - 실행 액션(Connect/Follow/추가)까지 한 흐름으로 연결 가능

---

## 6) 구현 메모 (계약 보존)

- 기존 상태 키(`pending/approved/posted/all`)와 기존 대시보드 탭 구조는 유지
- 추천 기능은 신규 read 모델(추천 목록)로 추가하여 기존 API 계약 영향 최소화
