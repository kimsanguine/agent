# LinkedIn Growth Dashboard Mermaid Sitemap

아래는 현재 구현(As-Is), 요구사항 반영(To-Be), 그리고 추천 점수 계산 흐름입니다.

---

## 1) As-Is Sitemap

```mermaid
flowchart TD
  A[LinkedIn Growth Dashboard]

  A --> B[대시보드 탭]
  A --> C[포스트 탭]
  A --> D[참여 탭]

  B --> B1[KPI 카드]
  B --> B2[인게이지먼트 트렌드 차트]
  B --> B3[팔로워 성장 차트]
  B --> B4[AI 콘텐츠 인사이트]
  B --> B5[4주 성장 추세]

  C --> C1[포스트 성과 테이블]
  C1 --> C2[정렬: 노출]
  C1 --> C3[정렬: 참여율]
  C1 --> C4[정렬: 반응]
  C1 --> C5[정렬: 댓글]
  C1 --> C6[정렬: 날짜]

  D --> D1[댓글 큐]
  D --> D2[타겟 프로필]

  D1 --> D1A[필터: 대기/승인/게시/전체]
  D1 --> D1B[액션: 승인/수정/거부/복사/게시완료]

  D2 --> D2A[우선순위]
  D2 --> D2B[토픽]
  D2 --> D2C[참여횟수/최근참여]
  D2 --> D2D[외부프로필링크]
```

---

## 2) To-Be Sitemap (네트워크 추천 기능 포함)

```mermaid
flowchart TD
  A[LinkedIn Growth Dashboard]

  A --> B[대시보드 탭]
  A --> C[포스트 탭]
  A --> D[참여 탭]

  B --> B1[KPI 카드]
  B --> B2[인게이지먼트 트렌드 차트]
  B --> B3[팔로워 성장 차트]
  B --> B4[AI 콘텐츠 인사이트]
  B --> B5[4주 성장 추세]

  C --> C1[포스트 성과 테이블]
  C1 --> C2[정렬: 노출]
  C1 --> C3[정렬: 참여율]
  C1 --> C4[정렬: 반응]
  C1 --> C5[정렬: 댓글]
  C1 --> C6[정렬: 날짜]

  D --> D1[댓글 큐]
  D --> D2[타겟 프로필]
  D --> D3[추천 타겟 Connect/Follow]

  D1 --> D1A[필터: 대기/승인/게시/전체]
  D1 --> D1B[액션: 승인/수정/거부/복사/게시완료]

  D2 --> D2A[우선순위]
  D2 --> D2B[토픽]
  D2 --> D2C[참여횟수/최근참여]
  D2 --> D2D[외부프로필링크]

  D3 --> D3A[내 프로필 DNA 분류]
  D3 --> D3B[내 인기도 지수 PI]
  D3 --> D3C[추천 점수 TRS]
  D3 --> D3D[추천 사유]
  D3 --> D3E[연결거리 1촌/2촌]
  D3 --> D3F[액션: Connect]
  D3 --> D3G[액션: Follow]
  D3 --> D3H[액션: 타겟목록 추가]
  D3 --> D3I[액션: 숨김/보류]
```

---

## 3) 추천 점수 계산 흐름

```mermaid
flowchart LR
  A1[내 데이터: 최근 30일 포스트/반응/성장] --> A2[내 프로필 DNA 분류]
  A2 --> A3[내 인기도 지수 PI 계산]

  B1[타겟 데이터: 주제/활동/연결거리/과거상호작용] --> B2[후보 타겟 특징 추출]

  P1[패널티: 최근접촉 과다/중복타겟/비활성] --> C1
  A3 --> C1[TRS 추천 점수 계산]
  B2 --> C1

  C1 --> C2{점수 구간}
  C2 -->|80+| D1[Connect 추천]
  C2 -->|65-79| D2[Follow + 댓글 워밍업]
  C2 -->|50-64| D3[관찰 리스트]
  C2 -->|0-49| D4[제외/보류]
```

### TRS 공식

```text
TRS = 0.30*TopicFit + 0.25*ResponseProbability + 0.20*PopularityFit + 0.15*NetworkDistanceFit + 0.10*RecentActivity - Penalty
```
