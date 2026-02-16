# Miro + Remotion PoC Verification Notes (2026-02-16)

## 검증 범위
- Task 8 Verification & Review Gate 수행
- Python 테스트/문법 검증 + Renderer 테스트/타입 빌드 검증

## 실행 명령 및 결과

### 1) Full Python test suite
```bash
PYTHONPATH="/Users/sanguinekim/Documents/3_Code/Vibe/Project/260214_동적이미지생성도구" \
"/Users/sanguinekim/Documents/3_Code/Vibe/Project/260214_동적이미지생성도구/venv/bin/pytest" \
--rootdir "/Users/sanguinekim/Documents/3_Code/Vibe/Project/260214_동적이미지생성도구" \
"/Users/sanguinekim/Documents/3_Code/Vibe/Project/260214_동적이미지생성도구/tests" -v
```
- 결과: `7 passed in 0.14s`

### 2) Renderer tests (Vitest)
```bash
NPM_CONFIG_CACHE=/tmp/claude/npm-cache npm --prefix "/Users/sanguinekim/Documents/3_Code/Vibe/Project/260214_동적이미지생성도구/renderer" test -- --run
```
- 결과: `Test Files 2 passed`, `Tests 2 passed`

### 3) Python syntax check
```bash
python3 -m py_compile "/Users/sanguinekim/Documents/3_Code/Vibe/Project/260214_동적이미지생성도구/src/"*.py
```
- 결과: 에러 출력 없음 (성공)

### 4) Renderer type/build check
```bash
NPM_CONFIG_CACHE=/tmp/claude/npm-cache npm --prefix "/Users/sanguinekim/Documents/3_Code/Vibe/Project/260214_동적이미지생성도구/renderer" run build
```
- 결과: `tsc --noEmit` 정상 종료 (에러 없음)

## 디버깅 메모 (Root Cause)
- 빌드 실패 원인: `renderer/src/index.ts`에 JSX 문법을 사용해 TS 파서 오류(TS1005) 발생
- 조치: `.ts` 파일에서 JSX 대신 `React.createElement(...)`로 Composition 등록
- 재검증: 동일 빌드 명령 재실행 후 통과 확인

## 알려진 제한사항
- Miro API 통합은 현재 보드 구조 수집(`items`) 및 렌더 결과 링크 임베드(`embeds`)까지 검증됨
- Miro 오브젝트 단위의 정교한 타임라인 애니메이션 제어는 본 PoC 범위 밖이며 API 제약이 있음
- `render_url`은 외부 호스팅된 결과 URL을 전제로 하며, 업로드/배포 파이프라인은 미포함
