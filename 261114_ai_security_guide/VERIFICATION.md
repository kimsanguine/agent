# 교차검증 기록 (기준일 2026-11-14)

## 1차 출처로 직접 확인
| 항목 | 확인 내용 | 출처 |
|---|---|---|
| CVE-2025-32711 (EchoLeak) | 2025-06-11 공개, CVSS 3.1 9.3, Microsoft 365 Copilot | CVE 레코드(cveawg.mitre.org) |
| CVE-2025-48757 (Lovable) | 2025-05-30 공개, CVSS 9.3, **공급사가 이의 제기(disputed)** | CVE 레코드 |
| 환각 패키지 논문 | 16개 모델, 57.6만 샘플, 고유 환각명 205,474, 최소 5.2%(상용)/21.7%(오픈소스) | arXiv:2406.10279 초록 |
| Claude Code 설정 키 | permissions allow/deny/ask 평가 순서(deny→ask→allow), `Read(./.env)` deny, `.claudeignore` 무효, `disableBypassPermissionsMode`, 권한 모드 6종, `sandbox.*` 키, `failIfUnavailable`, PreToolUse 훅(exit 2 차단) | code.claude.com 공식 문서 |
| Replit 사건 | 코드 동결 지시 위반, 1,200+ 임원/1,190+ 기업 레코드, CEO의 DB 분리·롤백 개선·planning-only 모드 | Fortune(2025.7.23) |
| npm 토큰 정책 | classic 토큰 2025-12-09 폐기, 쓰기 granular 토큰 최대 90일 | GitHub Changelog |

## 다수의 2차 출처로 교차 확인 (원문 미열람)
Nx s1ngularity(GitGuardian 1,346 저장소·2,349 시크릿), Amazon Q 1.84.0/AWS-2025-015, postmark-mcp(v1.0.16, Koi Security),
Trivy Action/LiteLLM(2026.3), Mini Shai-Hulud(2026.5), Supabase MCP 시연, OWASP Agentic Top 10 항목명(ASI01~10), Anthropic 2025.11 보고서,
개인정보보호법 개정(2026.9.11 시행, 72시간 통지, 과징금 상한 매출 10%), EU AI Act 고위험 일정 연기(Annex III 2027-12-02 / Annex I 2028-08-02),
OpenAI의 promptfoo 인수 발표(2026-03, 완료 여부 미확인).

## 이번 검증에서 원고를 고친 곳
- Part 06: Replit "롤백으로 데이터 복구"를 단정하던 문장 → 보도 기준으로 완화, 근거 없는 날짜·"원클릭 복원" 삭제
- Part 09: 개인정보보호법·EU AI Act·ISMS-P 서술을 검색 결과 기준으로 갱신
- Part 02/03: Lovable CVE의 "공급사 이의 제기" 단서 추가, 환각 패키지 수치를 논문 초록 값으로 교체
- Part 04: Trivy/LiteLLM 날짜·수치의 매체별 차이를 명시
- Part 07: `allowedDomains`는 차단 목록이 아니라 "사전 허용"이라는 한계 추가

## 아직 남은 불확실성 (강의 전 확인 권장)
- 법령은 뉴스·법률 매체 기준이다. 조문·시행령 원문 대조 필요.
- EU AI Act: 공식 채택 보도는 확인했으나 관보 게재는 미확인.
- Copilot agentic autofix GA 여부, promptfoo 인수 완료 여부, pnpm/npm 쿨다운 기본값.
- Part 10 참고 URL은 접속(HTTP 200)만 확인했고 내용 대조는 하지 않음.
