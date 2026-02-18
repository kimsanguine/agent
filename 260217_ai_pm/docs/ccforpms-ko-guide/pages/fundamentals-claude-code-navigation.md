# 1.7: Claude Code 내비게이션
원문: https://ccforpms.com/fundamentals/claude-code-navigation

## 한 줄 요약
Claude Code를 제대로 쓰려면 작업 성격에 맞춰 입력 모드를 바꾸고, think 키워드와 권한 스킵 옵션을 전략적으로 써야 한다.

## 핵심 내용
- 이 모듈의 핵심은 세 가지: 입력 모드 선택, 분석 깊이 제어, 실행 속도 최적화.
- 입력 모드는 `Edit`(기본), `Auto-Accept`, `Plan`이며 `Shift+Tab`으로 순환 전환한다.
- `Edit`: 변경 diff를 확인하고 승인하므로 중요 파일·학습·안전성이 필요한 작업에 적합.
- `Auto-Accept`: 승인 없이 즉시 반영되어 단순하고 명확한 작업에서 빠르다.
- `Plan`: 실행 전 todo 계획을 먼저 만들며, 3단계 이상 복합 작업(조사→종합→산출물)에 강하다.
- 모드 선택 기준: 복잡하면 `Plan`, 단순·저위험이면 `Auto-Accept`, 애매하면 `Edit`.
- 분석 깊이 키워드: `think about X`(기본), `think harder about X`(심화), `ultrathink about X`(최대).
- 속도 가속 옵션: `claude --dangerously-skip-permissions`는 권한 확인을 모두 생략해 매우 빠르지만 리스크가 커진다.
- 자주 쓰면 `alias cc="claude --dangerously-skip-permissions"`로 실행 단축 가능.
- 실행 중에는 `Esc`로 즉시 중단할 수 있고, 그 시점까지 생성된 파일은 유지된다.

## 실습/실행 단계
1. `/start-1-7`로 모듈을 시작한다.
2. 같은 작업을 `Edit`/`Auto-Accept`/`Plan`으로 각각 실행해 차이를 비교한다 (`Shift+Tab` 사용).
3. 복잡한 과제에서 `Plan` + `think harder about ...` 또는 `ultrathink about ...`를 적용한다.
4. 반복 승인으로 흐름이 끊기면 `claude --dangerously-skip-permissions` 또는 `cc` alias를 테스트한다.
5. 진행을 멈추고 싶을 때 `Esc`를 눌러 중단 후 결과물을 검토한다.
6. 기초 완료 후 `/start-2-1`로 다음 레벨(실전 PM 워크플로)로 넘어간다.

## 기억할 포인트
- `Plan`은 다단계 업무에서 가시성과 품질을 높여준다.
- 속도와 안전은 트레이드오프이므로 production code에서는 권한 스킵을 신중히 사용한다.
- 초반엔 `Edit` 중심으로 익히고, 숙련되면 상황별 모드 전환이 가장 효율적이다.
- `Esc`는 항상 쓸 수 있는 즉시 중단 장치다.
