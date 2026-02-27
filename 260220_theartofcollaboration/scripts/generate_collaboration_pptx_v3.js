const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.author = "Claude";
pptx.company = "ESTsoft KDT";
pptx.subject = "협업의 기술 확장판";
pptx.title = "협업의 기술 — Insight Expanded";
pptx.lang = "ko-KR";

const IMG_TEAM = "/Users/sanguinekim/Documents/3_Code/Vibe/Project/260220_theartofcollaboration/assets/nanabanana_team.png";
const IMG_TRADE = "/Users/sanguinekim/Documents/3_Code/Vibe/Project/260220_theartofcollaboration/assets/nanabanana_tradeoff.png";
const IMG_FLOW = "/Users/sanguinekim/Documents/3_Code/Vibe/Project/260220_theartofcollaboration/assets/nanabanana_flow.png";

const C = {
  bg: "F5F8FC",
  navy: "1E2761",
  navy2: "2F3C7E",
  teal: "028090",
  mint: "02C39A",
  white: "FFFFFF",
  text: "0F172A",
  muted: "475569",
  line: "D9E2EC",
  softTeal: "EAF8F5",
  softCoral: "FFF1F1",
  softBlue: "EEF2FF",
};

const FONT_H = "Malgun Gothic";
const FONT_B = "Malgun Gothic";

function setBase(slide, dark = false) {
  slide.background = { color: dark ? C.navy : C.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.12,
    fill: { color: dark ? C.mint : C.teal },
    line: { color: dark ? C.mint : C.teal, transparency: 100 },
  });
}

function title(slide, t, s = "", dark = false) {
  slide.addText(t, {
    x: 0.6,
    y: dark ? 0.65 : 0.42,
    w: 8.8,
    h: 0.74,
    fontFace: FONT_H,
    fontSize: dark ? 35 : 30,
    bold: true,
    color: dark ? C.white : C.text,
    margin: 0,
  });
  if (s) {
    slide.addText(s, {
      x: 0.6,
      y: dark ? 1.45 : 0.98,
      w: 8.8,
      h: 0.5,
      fontFace: FONT_B,
      fontSize: dark ? 14.5 : 13.5,
      color: dark ? "D5E2FF" : C.muted,
      margin: 0,
    });
  }
}

function card(slide, x, y, w, h, fill = C.white) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: C.line, width: 1 },
  });
}

function stat(slide, x, y, value, label) {
  card(slide, x, y, 2.0, 1.38, C.white);
  slide.addText(value, {
    x: x + 0.15,
    y: y + 0.18,
    w: 1.7,
    h: 0.45,
    fontFace: FONT_H,
    fontSize: 26,
    bold: true,
    align: "center",
    color: C.navy2,
    margin: 0,
  });
  slide.addText(label, {
    x: x + 0.15,
    y: y + 0.75,
    w: 1.7,
    h: 0.45,
    fontFace: FONT_B,
    fontSize: 11,
    color: C.muted,
    align: "center",
    margin: 0,
  });
}

function insight(slide, text, dark = false) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: 4.9,
    w: 8.8,
    h: 0.5,
    rectRadius: 0.08,
    fill: { color: dark ? "29417A" : C.softTeal },
    line: { color: dark ? "35539B" : "BEE9DE", width: 1 },
  });
  slide.addText("한 줄 인사이트", {
    x: 0.8,
    y: 5.06,
    w: 1.2,
    h: 0.2,
    fontFace: FONT_B,
    fontSize: 10,
    bold: true,
    color: dark ? "BEE9DE" : "0F5D50",
    margin: 0,
  });
  slide.addText(text, {
    x: 2.02,
    y: 5.02,
    w: 7.2,
    h: 0.24,
    fontFace: FONT_B,
    fontSize: 13,
    bold: true,
    color: dark ? C.white : C.text,
    margin: 0,
  });
}

function glossaryRow(slide, y, term, desc) {
  card(slide, 0.9, y, 8.2, 0.7, C.white);
  slide.addText(term, {
    x: 1.15,
    y: y + 0.21,
    w: 2.9,
    h: 0.22,
    fontFace: FONT_H,
    fontSize: 13,
    bold: true,
    color: C.navy2,
    margin: 0,
  });
  slide.addText(desc, {
    x: 3.25,
    y: y + 0.2,
    w: 5.55,
    h: 0.24,
    fontFace: FONT_B,
    fontSize: 12,
    color: C.text,
    margin: 0,
  });
}

// 1) Cover
{
  const s = pptx.addSlide();
  s.addImage({ path: IMG_TEAM, x: 0, y: 0, w: 10, h: 5.625 });
  s.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 5.625,
    fill: { color: "0B122B", transparency: 33 },
    line: { color: "0B122B", transparency: 100 },
  });
  setBase(s, true);
  title(s, "협업의 기술", "AI 시대 프론트엔드 협업 전략 · 확장판", true);
  s.addText("코드 생산성보다 판단·협업·전달이 성과를 만든다", {
    x: 0.6,
    y: 2.42,
    w: 7.0,
    h: 0.58,
    fontFace: FONT_B,
    fontSize: 21,
    bold: true,
    color: C.white,
    margin: 0,
  });
  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: 3.2,
    w: 6.0,
    h: 1.24,
    rectRadius: 0.06,
    fill: { color: "102244", transparency: 20 },
    line: { color: "5074B8", width: 1 },
  });
  s.addText("• 원문 10개 챕터를 18장으로 확장\n• 영어 축약어를 중간중간 쉽게 풀이\n• Nanabanana 스타일 이미지로 시각 고도화", {
    x: 0.86,
    y: 3.52,
    w: 5.55,
    h: 0.78,
    fontFace: FONT_B,
    fontSize: 12,
    color: "DDE8FF",
    margin: 0,
  });
}

// 2) Agenda + reading guide
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "구성 안내", "핵심 주장 + 용어 풀이 + 실행 체크 순서로 진행");

  card(s, 0.75, 1.5, 5.25, 2.95, C.white);
  s.addText("오늘의 흐름", {
    x: 1.0,
    y: 1.78,
    w: 1.6,
    h: 0.25,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0,
  });
  s.addText([
    "1) 협업이 성과를 가르는 이유",
    "2) AI 네이티브 팀의 운영 방식",
    "3) 도구 활용의 이익과 비용",
    "4) 발표·포트폴리오 전략",
    "5) 한국 시장 기회와 30일 플랜",
  ].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1 } })), {
    x: 1.0,
    y: 2.16,
    w: 4.8,
    h: 2.05,
    fontFace: FONT_B,
    fontSize: 12.8,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8,
  });

  card(s, 6.2, 1.5, 3.05, 2.95, C.softBlue);
  s.addText("영어 축약어 읽는 법", {
    x: 6.45,
    y: 1.78,
    w: 2.6,
    h: 0.25,
    fontFace: FONT_H,
    fontSize: 14,
    bold: true,
    color: C.navy2,
    margin: 0,
  });
  s.addText("예) PR\nPull Request\n코드 변경 검토 요청", {
    x: 6.45,
    y: 2.2,
    w: 2.4,
    h: 0.95,
    fontFace: FONT_B,
    fontSize: 12.5,
    color: C.text,
    margin: 0,
  });
  s.addText("슬라이드 안에서 첫 등장 시\n항상 한글 뜻을 함께 표기합니다.", {
    x: 6.45,
    y: 3.35,
    w: 2.5,
    h: 0.72,
    fontFace: FONT_B,
    fontSize: 11.8,
    color: C.muted,
    margin: 0,
  });

  insight(s, "용어 이해가 되면 전략 문장이 훨씬 선명해진다");
}

// 3) Why collaboration now
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "왜 지금 협업을 다시 배워야 하나", "기술보다 팀 정렬 품질이 실패 비용을 키운다");
  stat(s, 0.8, 1.52, "86%", "프로젝트 실패\n소통·팀워크 요인");
  stat(s, 3.0, 1.52, "3.5x", "소통 우수 조직\n성과 우위");
  stat(s, 5.2, 1.52, "1,650만", "1인당 연간\n소통 손실(원)");
  stat(s, 7.4, 1.52, "72%", "비생산 회의\n비율");

  card(s, 0.8, 3.12, 8.6, 1.48, C.white);
  s.addText("핵심 해석", {
    x: 1.05,
    y: 3.38,
    w: 1.5,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0,
  });
  s.addText("코드 품질은 일정 수준에서 평준화되고, 팀의 의사결정 속도와 문맥 공유 능력이 출시 경쟁력을 좌우한다.", {
    x: 1.05,
    y: 3.76,
    w: 8.1,
    h: 0.66,
    fontFace: FONT_B,
    fontSize: 13.2,
    color: C.text,
    margin: 0,
  });
  insight(s, "협업 격차가 기술 격차보다 더 큰 손실을 만든다");
}

// 4) Team shape
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "AI 네이티브 팀: 작지만 넓게 책임진다", "Linear·Anthropic·Vercel 사례를 역할 관점으로 요약");

  s.addImage({ path: IMG_TEAM, x: 5.52, y: 1.45, w: 3.9, h: 2.68 });
  card(s, 0.7, 1.45, 4.65, 3.2, C.white);

  s.addText([
    "Linear: 소수 인원, 프로젝트 단위 재편",
    "Anthropic: 연구·엔지니어 경계 축소",
    "Vercel: 디자인 엔지니어 역할 강화",
    "공통점: 팀 크기보다 제품 책임이 우선",
  ].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1 } })), {
    x: 1.0,
    y: 1.92,
    w: 4.1,
    h: 2.35,
    fontFace: FONT_B,
    fontSize: 12.8,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8,
  });

  card(s, 5.52, 4.22, 3.9, 0.4, C.softTeal);
  s.addText("2~5명 + AI 에이전트 다수 운용 구조", {
    x: 5.75,
    y: 4.34,
    w: 3.45,
    h: 0.2,
    fontFace: FONT_B,
    fontSize: 11,
    color: "0F5D50",
    margin: 0,
  });

  insight(s, "작은 팀일수록 한 사람의 제품 책임 폭이 커진다");
}

// 5) Glossary A
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "용어 풀이 A — 조직/역할", "영어 축약어·직무 용어를 쉬운 언어로 정리");

  glossaryRow(s, 1.48, "AI-native", "AI 도구를 기본 업무 흐름으로 쓰는 팀 문화");
  glossaryRow(s, 2.26, "PM (Product Manager)", "제품 목표·우선순위를 정렬하는 역할");
  glossaryRow(s, 3.04, "Product Engineer", "기능 구현부터 사용자 전달까지 책임지는 개발자");
  glossaryRow(s, 3.82, "Design Engineer", "디자인과 프론트엔드 구현을 함께 다루는 역할");
  glossaryRow(s, 4.6, "Agentic Organization", "사람이 여러 AI 에이전트를 지휘해 성과를 내는 조직");

  insight(s, "용어를 이해하면 조직 변화의 본질이 더 빨리 읽힌다");
}

// 6) Methodologies
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "방법론의 공통점은 범위·오너·리듬", "Shape Up / Linear Method / Continuous Discovery");

  const cols = [
    ["Shape Up", ["시간 고정, 범위 가변", "백로그(Backlog) 과잉 억제", "핵심 플로우 완성 우선"]],
    ["Linear Method", ["스프린트(Sprint) 피로 감소", "80% 정보로 결정·전진", "모든 이슈에 단일 오너"]],
    ["Discovery", ["주간 사용자 접점 루프", "트리오(3인) 학습 구조", "출시 전 가설 검증 습관"]],
  ];

  cols.forEach((col, i) => {
    const x = 0.65 + i * 3.1;
    card(s, x, 1.53, 2.86, 3.15, C.white);
    s.addShape(pptx.ShapeType.rect, {
      x,
      y: 1.53,
      w: 2.86,
      h: 0.52,
      fill: { color: C.softTeal },
      line: { color: C.softTeal, transparency: 100 },
    });
    s.addText(col[0], {
      x: x + 0.14,
      y: 1.7,
      w: 2.56,
      h: 0.24,
      fontFace: FONT_H,
      fontSize: 15,
      bold: true,
      align: "center",
      color: "0F5D50",
      margin: 0,
    });

    s.addText(col[1].map((b, j, a) => ({ text: b, options: { bullet: true, breakLine: j < a.length - 1 } })), {
      x: x + 0.16,
      y: 2.2,
      w: 2.5,
      h: 2.3,
      fontFace: FONT_B,
      fontSize: 12.2,
      color: C.text,
      margin: 2,
      paraSpaceAfterPt: 8,
    });
  });

  insight(s, "좋은 방법론은 문서보다 실행 리듬을 먼저 만든다");
}

// 7) Glossary B
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "용어 풀이 B — 실행/프로세스", "현업 협업에서 자주 등장하는 축약어");

  glossaryRow(s, 1.48, "MVP (Minimum Viable Product)", "핵심 가치 검증에 필요한 최소 기능 제품");
  glossaryRow(s, 2.26, "DRI (Directly Responsible Individual)", "해당 의사결정의 최종 책임자 1인");
  glossaryRow(s, 3.04, "RFC (Request for Comments)", "기술 제안을 문서로 공개 검토하는 방식");
  glossaryRow(s, 3.82, "Backlog", "향후 검토할 일감 목록(우선순위 관리 대상)");
  glossaryRow(s, 4.6, "Sprint", "보통 1~2주 단위의 개발 반복 주기");

  insight(s, "축약어를 모르면 실행 규칙도 흐릿해진다");
}

// 8) AI tools landscape
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "AI 도구 채택은 이미 기본값이 되었다", "문제는 도입 여부가 아니라 운영 방식의 성숙도");

  card(s, 0.75, 1.48, 4.35, 3.18, C.white);
  s.addText("채택 지표", {
    x: 1.0,
    y: 1.76,
    w: 1.5,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0,
  });
  s.addText([
    "개발자 84%: AI 도구 사용/도입 계획",
    "Copilot 누적 사용자 2,000만+",
    "Cursor ARR(연간 반복 매출) 급성장",
    "v0 사용자 400만+, 프로토타이핑 확장",
  ].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1 } })), {
    x: 1.0,
    y: 2.12,
    w: 3.95,
    h: 2.28,
    fontFace: FONT_B,
    fontSize: 12.6,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8,
  });

  s.addChart(pptx.ChartType.bar, [{
    name: "비율",
    labels: ["AI 사용/계획", "Copilot 사용", "매일 사용"],
    values: [84, 68, 51],
  }], {
    x: 5.3,
    y: 1.72,
    w: 4.0,
    h: 2.85,
    barDir: "col",
    chartColors: [C.teal],
    showLegend: false,
    showValue: true,
    catAxisLabelColor: C.muted,
    valAxisLabelColor: C.muted,
    valGridLine: { color: "E2E8F0", size: 1 },
  });

  insight(s, "도구 격차는 줄었고 운영 체계 격차가 커지고 있다");
}

// 9) Trade-off
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "속도 이득과 검증 비용을 함께 설계하라", "AI는 작성 속도를 높이지만 리뷰·전환 비용을 키울 수 있다");

  s.addImage({ path: IMG_TRADE, x: 0.7, y: 1.48, w: 4.2, h: 2.9 });
  card(s, 5.08, 1.48, 4.25, 2.9, C.white);
  s.addText([
    "작업 완료량 +21% (팀 단위)",
    "PR(Pull Request) 리뷰 시간 +91%",
    "컨텍스트 전환 +47%",
    "RCT(Randomized Controlled Trial) 일부 결과:\n실작업 시간 +19% 보고",
  ].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1 } })), {
    x: 5.32,
    y: 1.92,
    w: 3.8,
    h: 2.3,
    fontFace: FONT_B,
    fontSize: 12.5,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8,
  });

  insight(s, "AI 생산성은 작성과 검증을 합쳐서 평가해야 정확하다");
}

// 10) Glossary C metrics
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "용어 풀이 C — 지표/리뷰", "숫자를 읽기 위한 최소 용어 세트");

  glossaryRow(s, 1.48, "ARR (Annual Recurring Revenue)", "구독형 비즈니스의 연간 반복 매출");
  glossaryRow(s, 2.26, "DAU/MAU", "일간/월간 활성 사용자 수 지표");
  glossaryRow(s, 3.04, "PR (Pull Request)", "코드 변경을 병합 전 리뷰 요청하는 단위");
  glossaryRow(s, 3.82, "CI/CD", "지속 통합·지속 배포 자동화 파이프라인");
  glossaryRow(s, 4.6, "RCT", "무작위 대조 실험으로 효과를 비교 검증하는 방법");

  insight(s, "지표 용어를 알면 데이터 해석 오류가 크게 줄어든다");
}

// 11) Vibe vs Agentic
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "Vibe Coding에서 Agentic Engineering으로", "차이는 코드 생성량이 아니라 감독·품질 기준의 유무");

  card(s, 0.8, 1.52, 4.1, 3.18, C.softCoral);
  card(s, 5.1, 1.52, 4.1, 3.18, C.softTeal);

  s.addText("Vibe Coding", {
    x: 1.0,
    y: 1.8,
    w: 3.7,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 16,
    bold: true,
    align: "center",
    color: "9C1D1D",
    margin: 0,
  });
  s.addText("Agentic Engineering", {
    x: 5.3,
    y: 1.8,
    w: 3.7,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 16,
    bold: true,
    align: "center",
    color: "0F5D50",
    margin: 0,
  });

  s.addText(["Accept All 의존", "설계 근거 부족", "학습·검증 축적 약함"].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1 } })), {
    x: 1.1,
    y: 2.25,
    w: 3.5,
    h: 2.0,
    fontFace: FONT_B,
    fontSize: 13.1,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8,
  });

  s.addText(["에이전트 오케스트레이션", "사람이 품질 게이트 운영", "리뷰·테스트·설명 가능성 확보"].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1 } })), {
    x: 5.4,
    y: 2.25,
    w: 3.5,
    h: 2.0,
    fontFace: FONT_B,
    fontSize: 13.1,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8,
  });

  insight(s, "좋은 개발자는 생성 속도보다 품질 기준을 설계한다");
}

// 12) Product thinking
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "코딩 속도보다 프로덕트 판단력이 남는다", "프론트엔드는 제품 흐름을 연결하는 역할로 확장된다");

  s.addImage({ path: IMG_FLOW, x: 5.15, y: 1.45, w: 4.25, h: 2.85 });

  const items = [
    ["시스템 씽킹", "데이터·API·렌더링을 한 흐름으로 이해"],
    ["UX 감각", "a11y(접근성)·반응형·성능을 함께 설계"],
    ["임팩트 판단", "기능보다 사용자 가치와 우선순위"],
    ["연결 역량", "디자인·백엔드·배포까지 연결 운영"],
  ];

  items.forEach((it, i) => {
    const x = 0.7 + (i % 2) * 2.15;
    const y = 1.55 + Math.floor(i / 2) * 1.38;
    card(s, x, y, 2.0, 1.15, C.white);
    s.addText(it[0], {
      x: x + 0.14,
      y: y + 0.17,
      w: 1.72,
      h: 0.22,
      fontFace: FONT_H,
      fontSize: 13.2,
      bold: true,
      color: C.navy2,
      margin: 0,
    });
    s.addText(it[1], {
      x: x + 0.14,
      y: y + 0.46,
      w: 1.72,
      h: 0.52,
      fontFace: FONT_B,
      fontSize: 11.2,
      color: C.text,
      margin: 0,
    });
  });

  insight(s, "제품 맥락을 읽는 프론트엔드가 시장에서 더 희소하다");
}

// 13) Collaboration stack
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "하이퍼포밍 팀의 협업 스택", "Slack·Linear·Notion·Figma·GitHub의 역할 분담");

  card(s, 0.7, 1.5, 4.7, 3.2, C.white);
  s.addTable([
    ["도구", "핵심 용도"],
    ["Slack", "실시간 커뮤니케이션"],
    ["Linear/GitHub", "이슈 추적·우선순위"],
    ["Notion", "스펙·회의록·위키"],
    ["Figma", "디자인 협업·핸드오프"],
    ["GitHub", "버전관리·PR 리뷰·CI/CD"],
  ], {
    x: 0.95,
    y: 1.85,
    w: 4.2,
    h: 2.65,
    border: { pt: 1, color: C.line },
    fontFace: FONT_B,
    fontSize: 11.8,
    color: C.text,
    fill: C.white,
    valign: "middle",
    align: "left",
  });

  card(s, 5.6, 1.5, 3.7, 3.2, C.white);
  s.addText("운영 원칙", {
    x: 5.85,
    y: 1.8,
    w: 1.5,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0,
  });
  s.addText([
    "상태 공유는 비동기 텍스트 우선",
    "회의는 결정·관계 형성에 집중",
    "DRI(단일 책임자) 명확화",
    "작은 PR로 병목 최소화",
  ].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1 } })), {
    x: 5.85,
    y: 2.15,
    w: 3.2,
    h: 2.2,
    fontFace: FONT_B,
    fontSize: 12.5,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8,
  });

  insight(s, "도구보다 중요한 것은 팀이 공유하는 운영 규칙이다");
}

// 14) Async-first deep dive
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "비동기(Async-first) 운영의 실제 효과", "회의 시간 절감보다 문맥 축적 효과가 더 크다");

  card(s, 0.8, 1.55, 8.4, 3.15, C.white);

  s.addShape(pptx.ShapeType.rect, { x: 1.1, y: 2.0, w: 3.4, h: 0.36, fill: { color: "E2E8F0" }, line: { color: "E2E8F0", transparency: 100 } });
  s.addShape(pptx.ShapeType.rect, { x: 1.1, y: 2.0, w: 1.0, h: 0.36, fill: { color: C.teal }, line: { color: C.teal, transparency: 100 } });
  s.addText("회의 2.5h/주", { x: 1.2, y: 2.08, w: 1.2, h: 0.18, fontFace: FONT_B, fontSize: 10.5, color: C.white, margin: 0 });

  s.addShape(pptx.ShapeType.rect, { x: 1.1, y: 2.58, w: 3.4, h: 0.36, fill: { color: C.teal }, line: { color: C.teal, transparency: 100 } });
  s.addText("집중 작업 시간 확대", { x: 1.2, y: 2.66, w: 1.8, h: 0.18, fontFace: FONT_B, fontSize: 10.5, color: C.white, margin: 0 });

  s.addText("실무 해석", {
    x: 5.15,
    y: 1.95,
    w: 1.2,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0,
  });
  s.addText("비동기 전환은 단순히 회의를 줄이는 기술이 아니다.\n결정 근거를 문서화하고, 신규 인원의 온보딩 속도와\n재작업 방지율을 높이는 운영 시스템이다.", {
    x: 5.15,
    y: 2.3,
    w: 3.7,
    h: 1.35,
    fontFace: FONT_B,
    fontSize: 12.8,
    color: C.text,
    margin: 0,
  });

  s.addText("DRI(Directly Responsible Individual) 지정은\n비동기 환경에서 의사결정 지연을 줄이는 핵심 장치다.", {
    x: 1.1,
    y: 3.35,
    w: 7.7,
    h: 0.7,
    fontFace: FONT_B,
    fontSize: 12.5,
    color: C.muted,
    margin: 0,
  });

  insight(s, "비동기 문화의 진짜 성과는 의사결정 재사용성이다");
}

// 15) Git + RFC
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "작은 팀 운영력은 Git·RFC에서 드러난다", "실행 단위와 의사결정 기록의 품질이 곧 생산성");

  card(s, 0.7, 1.5, 4.2, 3.2, C.white);
  card(s, 5.1, 1.5, 4.2, 3.2, C.white);

  s.addText("Git 운영 체크", {
    x: 0.95,
    y: 1.8,
    w: 1.8,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0,
  });
  s.addText([
    "PR(Pull Request)은 작게 유지",
    "리뷰 SLA(응답 목표) 24시간 내",
    "커밋 메시지에 '왜'를 명시",
    "CI/CD 결과를 PR 본문에 연결",
  ].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1 } })), {
    x: 0.95,
    y: 2.16,
    w: 3.8,
    h: 2.25,
    fontFace: FONT_B,
    fontSize: 12.4,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8,
  });

  s.addText("RFC 1페이지 템플릿", {
    x: 5.35,
    y: 1.8,
    w: 2.0,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0,
  });
  s.addText("제안 → 장점/단점 → 대안 →\n미해결 질문 → 결론", {
    x: 5.35,
    y: 2.18,
    w: 3.7,
    h: 0.55,
    fontFace: FONT_B,
    fontSize: 13,
    color: C.text,
    margin: 0,
  });
  card(s, 5.35, 2.95, 3.7, 1.45, "F8FAFF");
  s.addText("'왜 이 결정을 했는가'를\n3개월 후에도 설명 가능해야\n재작업 비용이 줄어든다.", {
    x: 5.58,
    y: 3.3,
    w: 3.2,
    h: 0.85,
    fontFace: FONT_B,
    fontSize: 12.5,
    color: C.text,
    margin: 0,
  });

  insight(s, "작은 실행 단위와 기록 문화가 장기 속도를 만든다");
}

// 16) Presentation framework
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "발표는 기술 소개가 아니라 가치 전달이다", "PSI·SCQA 프레임으로 문제-해결-임팩트를 연결");

  const blocks = [
    ["PSI", "Problem-Solution-Impact\n문제·해결·성과"],
    ["SCQA", "Situation-Complication-\nQuestion-Answer"],
    ["5분 구조", "Hook→문제→데모→\n기술결정→다음단계"],
  ];

  blocks.forEach((b, i) => {
    const x = 0.75 + i * 3.1;
    card(s, x, 1.65, 2.85, 3.0, C.white);
    s.addShape(pptx.ShapeType.rect, {
      x,
      y: 1.65,
      w: 2.85,
      h: 0.5,
      fill: { color: C.softTeal },
      line: { color: C.softTeal, transparency: 100 },
    });
    s.addText(b[0], {
      x: x + 0.14,
      y: 1.81,
      w: 2.55,
      h: 0.24,
      fontFace: FONT_H,
      fontSize: 16,
      bold: true,
      align: "center",
      color: "0F5D50",
      margin: 0,
    });
    s.addText(b[1], {
      x: x + 0.2,
      y: 2.45,
      w: 2.45,
      h: 1.2,
      fontFace: FONT_B,
      fontSize: 12.5,
      align: "center",
      color: C.text,
      margin: 0,
    });
  });

  insight(s, "좋은 발표는 기능 나열보다 문제 해석력을 증명한다");
}

// 17) README + Market
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "README 전략 + 한국 시장 기회", "문서 품질과 시장 포지셔닝을 한 장에서 연결");

  card(s, 0.7, 1.5, 4.25, 3.2, C.white);
  s.addText("README 체크리스트", {
    x: 0.95,
    y: 1.8,
    w: 2.0,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0,
  });
  s.addText([
    "한 줄 소개 + 핵심 GIF",
    "기술 선택 이유(Why)",
    "내 역할(구체 기능 단위)",
    "트러블슈팅(문제→해결)",
    "회고 + 다음 로드맵",
  ].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1 } })), {
    x: 0.95,
    y: 2.16,
    w: 3.85,
    h: 2.3,
    fontFace: FONT_B,
    fontSize: 12.4,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8,
  });

  card(s, 5.15, 1.5, 4.15, 3.2, C.white);
  s.addText("한국 시장 포지셔닝", {
    x: 5.4,
    y: 1.8,
    w: 2.1,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0,
  });
  s.addText("기술 역량은 높지만 상용화 갭이 존재한다.\n'AI 연동 경험이 있는 프론트엔드'로\nAPI 통합·UX 개선·배포 운영을 묶어 증명하면\n면접 기회와 설득력이 함께 올라간다.", {
    x: 5.4,
    y: 2.15,
    w: 3.65,
    h: 1.55,
    fontFace: FONT_B,
    fontSize: 12.4,
    color: C.text,
    margin: 0,
  });
  s.addText("핵심 지표: AI 산업 6.3조, 인력 부족 7.4%", {
    x: 5.4,
    y: 3.95,
    w: 3.6,
    h: 0.25,
    fontFace: FONT_B,
    fontSize: 11.5,
    color: C.muted,
    margin: 0,
  });

  insight(s, "문서 품질과 시장 포지셔닝이 취업 경쟁력을 만든다");
}

// 18) Closing
{
  const s = pptx.addSlide();
  s.addImage({ path: IMG_FLOW, x: 0, y: 0, w: 10, h: 5.625 });
  s.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 5.625,
    fill: { color: "0B122B", transparency: 38 },
    line: { color: "0B122B", transparency: 100 },
  });
  setBase(s, true);

  title(s, "마무리: 과제가 아니라 제품을 만든다", "빠른 것은 AI의 일, 좋은 것은 여러분의 일", true);

  card(s, 0.8, 2.0, 8.4, 2.42, "132B59");
  s.addText("30일 실행 플랜", {
    x: 1.1,
    y: 2.25,
    w: 1.8,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 14.5,
    bold: true,
    color: "BEE9DE",
    margin: 0,
  });
  s.addText("Week1 범위 축소·DRI 지정\nWeek2 README 제품화 개편\nWeek3 AI 연동 기능 1개 완성\nWeek4 5분 발표 리허설", {
    x: 1.1,
    y: 2.63,
    w: 3.9,
    h: 1.45,
    fontFace: FONT_B,
    fontSize: 12.6,
    color: "E8EEFF",
    margin: 0,
  });
  s.addText("결국 커리어를 바꾸는 건\n매일 1% 더 나아지는 실행 습관이다.", {
    x: 5.25,
    y: 2.75,
    w: 3.6,
    h: 1.0,
    fontFace: FONT_B,
    fontSize: 15,
    bold: true,
    color: C.white,
    margin: 0,
    align: "center",
    valign: "mid",
  });

  insight(s, "판단력·협업력·실행력이 AI 시대의 실전 경쟁력이다", true);
}

const out = "/Users/sanguinekim/Documents/3_Code/Vibe/Project/260220_theartofcollaboration/협업의_기술_The_Art_of_Collaboration_insight_v3_expanded.pptx";

pptx.writeFile({ fileName: out })
  .then(() => console.log(`PPTX 생성 완료: ${out}`))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });