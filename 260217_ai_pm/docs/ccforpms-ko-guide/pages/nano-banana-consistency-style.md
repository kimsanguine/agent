# 3.1.3: 일관성과 스타일
원문: https://ccforpms.com/nano-banana/consistency-style

## 한 줄 요약
Gemini 이미지 생성은 키워드 트릭보다 명확한 브리핑, reference images, Iteration으로 품질과 일관성을 높인다.

## 핵심 내용
- 이 모듈의 초점은 프롬프트 품질을 높여 결과물의 스타일·캐릭터 일관성을 유지하는 것.
- Golden Rules 4가지:
  - 처음부터 재생성보다 기존 결과를 구체적으로 수정.
  - tag soup 대신 자연어 문장 사용.
  - subject, setting, lighting, mood, textures, colors, composition을 상세히 지정.
  - 용도와 대상(맥락)을 함께 전달.
- reference images 활용법:
  - Style reference: 시각적 톤/분위기 복제.
  - Subject reference: 인물·제품 동일성 유지(권장 3~5장).
  - Composition reference: 구도/배치 안내.
  - style과 subject를 섞어 원하는 결과로 조합 가능.
- Grids는 한 장에 여러 뷰를 만들 때 유용하며, 크기(예: 3x3), 셀별 내용, 일관성 조건을 명시해야 함.
- Variants는 방향 탐색용(2~3개 생성), Iteration은 선택안 정제용.
- 문제 해결 포인트:
  - 스타일 미스매치: 더 단순한 참조 + 색/조명 일치 조건 명시.
  - 캐릭터 불일치: 참조 이미지 추가 + 식별 특징 고정.
  - grid 불균일: 공통 요소와 일관성 지시 강화.
  - 변형안이 비슷함: "meaningfully different creative interpretations"처럼 차별화 지시.

## 실습/실행 단계
1. 자연어로 상세 프롬프트 작성(맥락 포함).
2. 가능하면 Style/Subject reference images 첨부.
3. 탐색이 필요하면 variants 2~3개 생성.
4. 가장 좋은 안을 고른 뒤 작은 수정 단위로 Iteration.
5. 최종본을 2K 등 원하는 해상도로 재생성.
6. 모듈 시작 명령: `/start-3-1-3`
7. 다음 모듈 명령: `/start-3-1-4`

## 기억할 포인트
- 핵심은 “다시 뽑기”가 아니라 “수정하며 완성하기”.
- 좋은 결과는 마법 키워드가 아니라 구체성+맥락에서 나온다.
- 탐색은 Variants, 완성은 Iteration으로 분리하면 효율적이다.
- 일관성 품질은 reference images 품질과 지시 명확성에 비례한다.
