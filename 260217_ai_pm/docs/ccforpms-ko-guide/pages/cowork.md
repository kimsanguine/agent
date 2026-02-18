# Claude Cowork 완전 가이드
원문: https://ccforpms.com/cowork

## 한 줄 요약
Claude Cowork는 파일·문서 업무를 실제 산출물로 끝내는 AI 에이전트이며, 핵심은 대화보다 위임이다.

## 핵심 내용
- Claude Cowork는 Claude Code의 비개발자용 GUI 형태로, 지정 폴더의 파일을 읽고 편집·생성한다.
- 일반 채팅과 달리 `.xlsx`, `.pptx`, `.docx` 같은 실제 파일을 만들어 바로 활용할 수 있다.
- 시작 조건은 macOS, Claude Desktop, Claude Pro이며, 초반에는 전용 작업 폴더만 연결하는 방식이 권장된다.
- 성과를 높이려면 The “Done” Framework(완료 상태 정의, 필요한 context, constraints 명시)를 먼저 정리해야 한다.
- 파일 정리·리서치 통합·문서 생성·데이터 추출이 핵심 활용 영역이며, 대량 작업은 병렬 처리에 강점이 있다.
- Sub-agents로 분업 처리, Skills로 스타일 규칙 재사용, Claude in Chrome으로 웹 수집 작업 확장이 가능하다.
- 현재는 one folder 중심, session memory 부재, 일부 connector 안정성 한계 등 제약이 있다.
- 안전 운용의 기본은 백업, 민감정보 분리, 삭제 금지 제약의 명시다.

## 실습/실행 단계
1. 코스 폴더를 Cowork에서 열고 `"Read START-HERE.md and start lesson 1"`로 시작한다.
2. 작업 루트에 `inbox`, `processed`, `outputs`, `reference` 구조를 만든다.
3. 첫 프롬프트에 처리 규칙과 제약(예: `"don't delete anything"`)을 분명히 적는다.
4. 단건 요청보다 배치 위임(정리→추출→요약)을 한 번에 지시해 효율을 높인다.
5. 결과 파일과 변경 로그를 검토하고, 수정 지시를 반복해 완성도를 높인다.

## 기억할 포인트
- Cowork는 Q&A 도구보다 “AI coworker”처럼 운영할 때 효과가 크다.
- 출력 품질은 프롬프트의 구체성(완료 기준·맥락·제약)에 크게 좌우된다.
- Browser automation은 유용하지만 trusted sites 중심으로 제한해야 한다.
- Sub-agents + Skills + 배치 지시는 실무 생산성을 높이는 대표 패턴이다.
