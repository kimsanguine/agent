# DoD 진행 현황 (PRD v1.2 기준)

- 기준 문서: `prd.md`
- 프로젝트: `260214_동적이미지생성도구`
- 마지막 기술 검증: 2026-02-18
  - Python test suite: 25 passed
  - Renderer Vitest: 2 passed
  - Renderer build(`tsc --noEmit`): pass
  - 상세: `docs/plans/2026-02-17-stage1-verification-notes.md`

---

## 1) PRD Definition of Done 체크리스트

### DoD-1 입력 3종 중 최소 2종 동작
- 상태: 완료
- 현재 근거:
  - Prompt / Prompt-file / Graph JSON / Miro-board 입력 채널 통합 로더: `src/input_loader.py`, `src/cli.py`
  - Prompt → PromptSpec → Graph 변환 경로: `src/prompt_parser.py`, `src/prompt_to_graph.py`
  - 회귀/계약 검증: `tests/test_input_loader.py`, `tests/test_cli_input_channels.py`, `tests/test_prompt_parser.py`, `tests/test_prompt_to_graph.py`

### DoD-2 Draft 3개 생성 + 선택 후 Final 렌더
- 상태: 미완료
- 현재 근거:
  - Final 렌더 엔진(단일 흐름): `renderer/render.mjs`, `src/remotion_bridge.py`
- 갭:
  - 3-way draft 생성, 선택 로직 미구현

### DoD-3 출력 포맷 MP4/WebM/GIF 제공
- 상태: 미완료
- 현재 근거:
  - MP4(h264) 렌더 경로: `renderer/render.mjs`
- 갭:
  - WebM, GIF 미구현

### DoD-4 Guardrail(비용/시간/출력/품질) 정책 적용
- 상태: 미완료
- 갭:
  - 비용 상한, timeout/fallback, 품질 필터 미구현

### DoD-5 핵심 메트릭 대시보드 수집 시작
- 상태: 미완료
- 갭:
  - 지표 수집/저장/리포트 경로 미구현

### DoD-6 PM 시나리오 3개 재사용 검증
- 상태: 미완료
- 갭:
  - 시나리오 기반 결과 검증 문서/테스트 미구현

---

## 2) PRD 정렬 개발 단계 (Stage Plan)

### Stage 0 — Integration PoC Baseline (완료)
- 범위: Miro 구조 수집 → 정규화 → Remotion 렌더 → Miro embed
- 종료 조건:
  - Python/Renderer 테스트 통과
  - 빌드 통과
  - 검증 노트 문서화 완료

### Stage 1 — Input Expansion & Prompt Path (완료)
- 범위:
  - 입력 채널 표준화: `prompt`, `prompt-file`, `graph-json`, `miro-board`
  - Prompt → Graph 변환 경로 추가
- 종료 조건:
  - Prompt 입력으로 graph 생성 후 렌더 1회 성공
  - 기존 Miro 입력 경로 회귀 테스트 통과
- 완료 근거:
  - Python test suite: 25 passed
  - Renderer Vitest: 2 passed
  - Renderer build(`tsc --noEmit`): pass
  - 검증 노트: `docs/plans/2026-02-17-stage1-verification-notes.md`

### Stage 2 — Draft 3-Way Generation & Selection
- 범위:
  - 요청 1건당 draft 3개 생성
  - draft 선택 후 final 렌더 실행
- 종료 조건:
  - draft 3개 생성/목록화/선택 플로우 동작
  - 선택된 draft 기준 final 렌더 성공

### Stage 3 — Output Format Expansion
- 범위:
  - MP4 외 WebM/GIF 출력 경로 추가
- 종료 조건:
  - 동일 입력에 대해 MP4/WebM/GIF 산출 확인

### Stage 4 — Guardrails & Failure Handling
- 범위:
  - 비용 상한, timeout, fallback, 출력 정규화, 품질 필터
- 종료 조건:
  - 실패 주입 테스트에서 fallback 정책 동작 확인

### Stage 5 — Metrics & PM Scenario Validation
- 범위:
  - 핵심 메트릭 수집
  - PM 시나리오 3건 재사용 검증
- 종료 조건:
  - 최소 대시보드/리포트 출력
  - 시나리오 3건 검증 기록 완료

---

## 3) Prompt 입력 설계 제안 (권장안)

권장: **Hybrid Guided Prompt**

1. **입력 UX**
   - 자유 텍스트: 사용자가 자연어로 흐름 설명
   - 최소 구조 슬롯: `목표`, `주요 단계(3~7개)`, `강조 포인트`, `출력 톤`

2. **처리 파이프라인**
   - (a) Prompt 정규화: 불필요 문장 제거, 단계 후보 추출
   - (b) PromptSpec 생성: 내부 스키마(`title`, `steps[]`, `emphasis[]`)로 변환
   - (c) Graph 변환: `node/edge/timeline` 생성

3. **품질 안정화 장치**
   - 단계 개수 제한(예: 3~7)
   - 필수 필드 누락 시 기본값 적용
   - 파싱 신뢰도 낮을 때는 템플릿 기반 fallback graph 생성

4. **초기 구현 원칙(MVP)**
   - 1차는 rule-based + 경량 파서로 시작
   - 2차에서 LLM 기반 고도화(스타일 다양화) 추가

---

## 4) 운영 규칙

1. Stage 완료 시 이 문서 상태를 즉시 업데이트한다.
2. Stage 전환 전, 테스트/빌드/검증 노트를 남긴다.
3. `prd.md`는 요구사항 원본으로 유지하고, 진행 상태는 `dod.md`를 단일 진실 원천으로 사용한다.
