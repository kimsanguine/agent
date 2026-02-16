# Recommended Targets API Spec (v0.1)

기준 코드/계약:
- Backend API 패턴: `api/server.py`
- Frontend 데이터 훅 패턴: `dashboard/src/hooks/useLinkedInData.ts`
- 기존 타입 스타일: `dashboard/src/types/index.ts`
- 기존 타겟 모델: `engagement/target_manager.py`

목표:
- `참여` 탭의 **추천 타겟(Connect/Follow)** 패널을 위한 API 스펙 정의
- 기존 계약(`targets`, `comments`, `analytics`)은 깨지지 않도록 신규 read model 중심으로 확장

---

## 1) Endpoint Summary

### 1.1 추천 목록 조회
- **Method**: `GET`
- **Path**: `/api/targets/recommendations`
- **Description**: 사용자 기준 추천 타겟 목록 조회 (점수/사유/추천 액션 포함)

### 1.2 추천 계산 강제 재실행
- **Method**: `POST`
- **Path**: `/api/targets/recommendations/refresh`
- **Description**: 최신 데이터로 추천 점수 재계산 트리거

### 1.3 추천 상태 업데이트 (숨김/보류/타겟추가)
- **Method**: `POST`
- **Path**: `/api/targets/recommendations/{candidate_id}/action`
- **Description**: 추천 후보에 대한 사용자 액션 반영

---

## 2) Data Model

## 2.1 Profile DNA

```json
{
  "profile_dna": {
    "type": "builder",
    "scores": {
      "content_fit": 78.4,
      "interaction_style": 64.2,
      "operating_rhythm": 71.5
    },
    "window_days": 30,
    "updated_at": "2026-02-15T14:00:00"
  }
}
```

- `type`: `builder | insight | connector | storyteller`
- `scores`: 0~100

### 2.2 Popularity Index (PI)

```json
{
  "popularity": {
    "pi": 67.3,
    "grade": "growing",
    "components": {
      "reach_score": 70.0,
      "engagement_quality_score": 65.0,
      "growth_velocity_score": 63.0
    }
  }
}
```

- `grade`: `seed | rising | growing | authority`

### 2.3 Recommendation Candidate

```json
{
  "candidate_id": "cand_2nd_9281",
  "name": "Product Leader A",
  "profile_url": "https://linkedin.com/in/example",
  "headline": "AI Product Lead",
  "topics": ["AI", "Growth"],
  "network_distance": 2,
  "mutual_count": 5,
  "recent_activity": {
    "posts_30d": 6,
    "avg_engagement_rate": 5.8,
    "last_posted_at": "2026-02-13T09:30:00"
  },
  "scores": {
    "trs": 82.6,
    "topic_fit": 88.0,
    "response_probability": 74.0,
    "popularity_fit": 80.0,
    "network_distance_fit": 79.0,
    "recent_activity": 90.0,
    "penalty": 3.4
  },
  "recommended_action": "connect",
  "reasons": [
    "내 상위 주제(AI/Growth)와 높은 유사도",
    "2촌 + 공통 연결 5명",
    "최근 30일 활동 지속"
  ],
  "state": "active"
}
```

- `recommended_action`: `connect | follow | watch | skip`
- `state`: `active | hidden | snoozed | converted`

---

## 3) API Contracts

### 3.1 GET /api/targets/recommendations

#### Query Params
- `user_id` (string, optional, default: `mock-user`)
- `limit` (number, optional, default: `10`, max: `50`)
- `min_score` (number, optional, default: `0`)
- `distance` (number, optional; `1 | 2 | 3`)
- `action` (string, optional; `connect | follow | watch | skip`)
- `state` (string, optional; `active | hidden | snoozed | converted`)
- `refresh` (boolean, optional, default: `false`)

#### 200 Response

```json
{
  "user_id": "mock-user",
  "generated_at": "2026-02-15T14:00:00",
  "window_days": 30,
  "profile_dna": {
    "type": "builder",
    "scores": {
      "content_fit": 78.4,
      "interaction_style": 64.2,
      "operating_rhythm": 71.5
    }
  },
  "popularity": {
    "pi": 67.3,
    "grade": "growing",
    "components": {
      "reach_score": 70.0,
      "engagement_quality_score": 65.0,
      "growth_velocity_score": 63.0
    }
  },
  "weights": {
    "topic_fit": 0.3,
    "response_probability": 0.25,
    "popularity_fit": 0.2,
    "network_distance_fit": 0.15,
    "recent_activity": 0.1
  },
  "candidates": [
    {
      "candidate_id": "cand_2nd_9281",
      "name": "Product Leader A",
      "profile_url": "https://linkedin.com/in/example",
      "headline": "AI Product Lead",
      "topics": ["AI", "Growth"],
      "network_distance": 2,
      "mutual_count": 5,
      "recent_activity": {
        "posts_30d": 6,
        "avg_engagement_rate": 5.8,
        "last_posted_at": "2026-02-13T09:30:00"
      },
      "scores": {
        "trs": 82.6,
        "topic_fit": 88.0,
        "response_probability": 74.0,
        "popularity_fit": 80.0,
        "network_distance_fit": 79.0,
        "recent_activity": 90.0,
        "penalty": 3.4
      },
      "recommended_action": "connect",
      "reasons": [
        "내 상위 주제(AI/Growth)와 높은 유사도",
        "2촌 + 공통 연결 5명",
        "최근 30일 활동 지속"
      ],
      "state": "active"
    }
  ],
  "meta": {
    "total": 24,
    "returned": 10,
    "cached": true
  }
}
```

#### Error Responses
- `400`: invalid query (`limit`, `min_score`, enum 값 오류)
- `404`: user not found
- `500`: recommendation engine failure

---

### 3.2 POST /api/targets/recommendations/refresh

#### Body

```json
{
  "user_id": "mock-user",
  "window_days": 30,
  "limit": 20,
  "force": true
}
```

#### 202 Response

```json
{
  "ok": true,
  "job_id": "reco_job_20260215_140100",
  "status": "queued"
}
```

#### 200 Response (동기 처리 모드)

```json
{
  "ok": true,
  "user_id": "mock-user",
  "generated_at": "2026-02-15T14:01:10",
  "total_candidates": 24
}
```

---

### 3.3 POST /api/targets/recommendations/{candidate_id}/action

#### Body

```json
{
  "user_id": "mock-user",
  "action": "add_target",
  "note": "AI 주제 협업 가능성 높음",
  "snooze_days": 14
}
```

#### Allowed `action`
- `connect` : connect 시도 기록
- `follow` : follow 시도 기록
- `add_target` : 추천 후보를 기존 타겟 목록으로 변환
- `hide` : 추천 목록에서 숨김
- `snooze` : 일정 기간 보류
- `skip` : 이번 사이클 제외

#### 200 Response

```json
{
  "ok": true,
  "candidate_id": "cand_2nd_9281",
  "action": "add_target",
  "state": "converted",
  "target_id": "target-12",
  "updated_at": "2026-02-15T14:05:00"
}
```

#### 404 Response

```json
{
  "ok": false,
  "error": "candidate_not_found"
}
```

---

## 4) Score Rules (문서 기준)

### 4.1 PI 공식

```text
PI = 0.45*ReachScore + 0.35*EngagementQualityScore + 0.20*GrowthVelocityScore
```

### 4.2 TRS 공식

```text
TRS = 0.30*TopicFit + 0.25*ResponseProbability + 0.20*PopularityFit + 0.15*NetworkDistanceFit + 0.10*RecentActivity - Penalty
```

### 4.3 Action Mapping
- `TRS >= 80` → `connect`
- `65 <= TRS < 80` → `follow`
- `50 <= TRS < 65` → `watch`
- `< 50` → `skip`

---

## 5) Frontend Hook/Type 제안

### 5.1 Hook
- 신규 훅: `useTargetRecommendations()`
- 파일 위치: `dashboard/src/hooks/useLinkedInData.ts`
- 반환 형태:
  - `data`, `loading`, `refresh`
  - `runRefresh()`
  - `applyAction(candidateId, action)`

### 5.2 Types
- 파일 위치: `dashboard/src/types/index.ts`
- 신규 타입 제안:
  - `ProfileDNA`
  - `PopularityIndex`
  - `TargetRecommendationCandidate`
  - `TargetRecommendationsResponse`

---

## 6) Backward Compatibility

- 기존 API (`/api/targets`, `/api/comments/queue`, `/api/analytics/*`) 동작 변경 없음
- 추천 API는 신규 namespace(`/api/targets/recommendations`)로 분리
- 기존 `Target` 모델 유지, `add_target` 액션 시에만 기존 저장소로 변환

---

## 7) Mock Response Example (QA/E2E용)

```json
{
  "user_id": "mock-user",
  "generated_at": "2026-02-15T14:00:00",
  "window_days": 30,
  "profile_dna": {
    "type": "builder",
    "scores": {
      "content_fit": 78.4,
      "interaction_style": 64.2,
      "operating_rhythm": 71.5
    }
  },
  "popularity": {
    "pi": 67.3,
    "grade": "growing",
    "components": {
      "reach_score": 70.0,
      "engagement_quality_score": 65.0,
      "growth_velocity_score": 63.0
    }
  },
  "weights": {
    "topic_fit": 0.3,
    "response_probability": 0.25,
    "popularity_fit": 0.2,
    "network_distance_fit": 0.15,
    "recent_activity": 0.1
  },
  "candidates": [
    {
      "candidate_id": "cand_2nd_9281",
      "name": "Product Leader A",
      "profile_url": "https://example.com/a",
      "headline": "AI Product Lead",
      "topics": ["AI", "Growth"],
      "network_distance": 2,
      "mutual_count": 5,
      "recent_activity": {
        "posts_30d": 6,
        "avg_engagement_rate": 5.8,
        "last_posted_at": "2026-02-13T09:30:00"
      },
      "scores": {
        "trs": 82.6,
        "topic_fit": 88.0,
        "response_probability": 74.0,
        "popularity_fit": 80.0,
        "network_distance_fit": 79.0,
        "recent_activity": 90.0,
        "penalty": 3.4
      },
      "recommended_action": "connect",
      "reasons": [
        "내 상위 주제와 높은 유사도",
        "2촌 + 공통 연결 5명",
        "최근 활동 활발"
      ],
      "state": "active"
    }
  ],
  "meta": {
    "total": 1,
    "returned": 1,
    "cached": true
  }
}
```

---

## 8) Open Questions (추가 결정 필요)

- `network_distance` 데이터 소스 확정 (LinkedIn API 제약 고려)
- `ResponseProbability` 피처 정의(댓글 응답 여부, 프로필 방문 등)
- `Penalty` 정책 세부값(최근 접촉 N일, 중복 임계치)
- 비동기 refresh(job queue) 도입 여부

---

문서 버전: `v0.1`
작성일: `2026-02-15`
