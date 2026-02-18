# 3.2.2: 전략 및 아키텍처 비주얼
원문: https://ccforpms.com/nano-banana/strategy-architecture-visuals

## 한 줄 요약
CTO, CEO, Board 각각의 질문에 맞춰 system architecture diagram, 2x2 prioritization matrix, product roadmap를 빠르게 만드는 방법을 익히는 모듈이다.

## 핵심 내용
- 이 모듈의 핵심은 복잡한 전략/기술 설명을 청중별 visual로 즉시 이해시키는 것이다.
- 시나리오는 TaskFlow Mobile 후속 미팅 3개로 구성된다: CTO(기술 통합), CEO(우선순위), Board(분기별 계획).
- **System architecture diagrams**는 components, data flow, labels, groupings, colors로 시스템 구조를 설명한다.
- **Prioritization matrices**는 보통 Impact × Effort 2x2를 사용해 Quick Wins, Major Projects, Fill-ins, Avoid로 의사결정을 정리한다.
- **Product roadmaps**는 분기/기간별 themes와 deliverables를 배치해 단계적 진행 방향을 보여준다.
- stakeholder별 초점이 다르다: CTO는 integration/dependencies, CEO는 전략적 trade-off, Board는 timeline/milestones.
- style library를 저장·재사용하면 여러 자료를 일관된 품질로 빠르게 제작할 수 있다.

## 실습/실행 단계
1. Claude Code에서 `/start-3-2-2`를 실행해 실습을 시작한다.
2. 동일한 제품 주제로 CTO용 system architecture diagram prompt를 작성한다(핵심 components, data flow, boundaries 포함).
3. CEO용 2x2 prioritization matrix prompt를 작성한다(X/Y axis, quadrants, 각 항목 배치 명시).
4. Board용 3-quarter product roadmap prompt를 작성한다(분기별 theme, 주요 기능, progression 강조).
5. 생성 결과를 audience 관점으로 수정한다(복잡도 축소, 겹침 제거, 단계적 스토리 강화).
6. 다음 단계로 `/start-3-2-3`를 실행해 marketing/launch asset 모듈로 넘어간다.

## 기억할 포인트
- visual마다 핵심 메시지를 1개로 좁혀야 전달력이 높다.
- 요소가 많아지면 이해도가 급락하므로 보통 5~10개 수준으로 관리한다.
- matrix는 quadrant 이름과 아이템 위치를 명확히 써야 결과가 안정적이다.
- roadmap는 세부 작업 목록보다 phase 간 이야기 흐름(MVP → Growth → Scale)이 중요하다.
- 문제 발생 시 prompt를 구체화해 해결한다: high-level 요청, not overlapping 지시, clear evolution 강조.
