# Runbook — 협업의 기술 발표 패키지 재생성

## 개요
이 문서는 `260220_theartofcollaboration` 폴더 내 발표 산출물을 재생성/갱신하는 절차를 정리한다.

## 필수 경로
- 프로젝트 루트: `/Users/sanguinekim/Documents/3_Code/Vibe/Project/260220_theartofcollaboration`
- 이미지 생성 프로젝트: `/Users/sanguinekim/Documents/3_Code/Vibe/Project/260206_gemini_image_gen`

## 전제 조건
- Node.js 사용 가능
- `pptxgenjs` 사용 가능 (또는 `NODE_PATH=/tmp/node_modules`로 로컬 설치 경로 지정)
- Bun 사용 가능 (Nanabanana 스타일 이미지 생성 스크립트 실행 시)
- `.env`에 `GEMINI_API_KEY` 설정

## 1) Nanabanana 스타일 이미지 생성
스크립트:
- `scripts/generate_nanabanana_images.ts`

출력:
- 이미지 생성 프로젝트의 `output/`에 PNG 생성 후
- 본 프로젝트 `assets/`에 복사

현재 사용 파일:
- `assets/nanabanana_team.png`
- `assets/nanabanana_tradeoff.png`
- `assets/nanabanana_flow.png`

## 2) PPTX 생성
스크립트:
- `scripts/generate_collaboration_pptx_v1.js`
- `scripts/generate_collaboration_pptx_v2.js`
- `scripts/generate_collaboration_pptx_v3.js`

주요 결과물:
- `협업의_기술_The_Art_of_Collaboration.pptx`
- `협업의_기술_The_Art_of_Collaboration_insight_v2.pptx`
- `협업의_기술_The_Art_of_Collaboration_insight_v3_expanded.pptx`

## 3) 발표 대본/노트
- 30분 대본: `협업의_기술_원문기반_발표대본_30분.md`
- 60분 대본: `협업의_기술_원문충실형_발표대본_60분.md`
- 슬라이드별 노트: `협업의_기술_슬라이드별_발표자노트_60분.md`

## 4) 품질 점검 체크리스트
- [ ] PPTX 파일 열림/폰트 깨짐 여부 확인
- [ ] 이미지 해상도/배치 확인
- [ ] 대본의 슬라이드 번호와 메시지 매칭 확인
- [ ] 축약어(영문) 첫 등장 시 설명 포함 여부 확인

## 5) Git 커밋 권장 단위
1. 에셋/스크립트 반영
2. PPTX 결과물 반영
3. 대본/노트 문서 반영
4. PRD/Runbook 문서 반영
