const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.author = "Claude";
pptx.company = "ESTsoft KDT";
pptx.subject = "협업의 기술 재구성";
pptx.title = "협업의 기술 — Insight Edition";
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
  light: "D7E3FC",
  white: "FFFFFF",
  text: "0F172A",
  muted: "475569",
  line: "D9E2EC",
  coral: "F96167",
  gold: "F9E795",
  softTeal: "EAF8F5",
  softCoral: "FFF1F1"
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
    line: { color: dark ? C.mint : C.teal, transparency: 100 }
  });
}

function title(slide, t, s = "", dark = false) {
  slide.addText(t, {
    x: 0.6,
    y: dark ? 0.65 : 0.42,
    w: 8.8,
    h: 0.72,
    fontFace: FONT_H,
    fontSize: dark ? 36 : 31,
    bold: true,
    color: dark ? C.white : C.text,
    margin: 0
  });
  if (s) {
    slide.addText(s, {
      x: 0.6,
      y: dark ? 1.45 : 1.0,
      w: 8.8,
      h: 0.46,
      fontFace: FONT_B,
      fontSize: dark ? 15 : 14,
      color: dark ? "D5E2FF" : C.muted,
      margin: 0
    });
  }
}

function insight(slide, text, dark = false) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: 4.9,
    w: 8.8,
    h: 0.5,
    rectRadius: 0.08,
    fill: { color: dark ? "29417A" : C.softTeal },
    line: { color: dark ? "35539B" : "BEE9DE", width: 1 }
  });
  slide.addText("한 줄 인사이트", {
    x: 0.8,
    y: 5.07,
    w: 1.2,
    h: 0.2,
    fontFace: FONT_B,
    fontSize: 10,
    bold: true,
    color: dark ? "BEE9DE" : "0F5D50",
    margin: 0
  });
  slide.addText(text, {
    x: 2.05,
    y: 5.03,
    w: 7.1,
    h: 0.22,
    fontFace: FONT_B,
    fontSize: 13,
    bold: true,
    color: dark ? C.white : C.text,
    margin: 0
  });
}

function card(slide, x, y, w, h, fill = C.white) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: C.line, width: 1 }
  });
}

function stat(slide, x, y, value, label) {
  card(slide, x, y, 2.0, 1.35, C.white);
  slide.addText(value, {
    x: x + 0.16,
    y: y + 0.18,
    w: 1.68,
    h: 0.45,
    fontFace: FONT_H,
    fontSize: 26,
    bold: true,
    align: "center",
    color: C.navy2,
    margin: 0
  });
  slide.addText(label, {
    x: x + 0.16,
    y: y + 0.74,
    w: 1.68,
    h: 0.45,
    fontFace: FONT_B,
    fontSize: 11.5,
    color: C.muted,
    align: "center",
    margin: 0
  });
}

// 1. Cover (stage-2 image applied)
{
  const s = pptx.addSlide();
  s.addImage({ path: IMG_TEAM, x: 0, y: 0, w: 10, h: 5.625 });
  s.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 5.625,
    fill: { color: "0B122B", transparency: 33 },
    line: { color: "0B122B", transparency: 100 }
  });
  setBase(s, true);

  title(s, "협업의 기술", "AI 시대 프론트엔드 협업 전략 인사이트 에디션", true);
  s.addText("코드 생산성보다 '판단·협업·전달'이 성과를 결정한다", {
    x: 0.6,
    y: 2.45,
    w: 6.9,
    h: 0.6,
    fontFace: FONT_B,
    fontSize: 21,
    bold: true,
    color: C.white,
    margin: 0
  });

  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: 3.25,
    w: 5.6,
    h: 1.2,
    rectRadius: 0.06,
    fill: { color: "102244", transparency: 20 },
    line: { color: "5074B8", width: 1 }
  });
  s.addText("• 원문 10개 챕터를 13개 슬라이드로 압축\n• 슬라이드별 핵심 문장을 30자 내외로 재구성\n• Gemini Nanabanana 스타일 이미지로 시각 강화", {
    x: 0.85,
    y: 3.55,
    w: 5.1,
    h: 0.74,
    fontFace: FONT_B,
    fontSize: 12,
    color: "DDE8FF",
    margin: 0
  });
}

// 2. Why collaboration now
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "왜 지금 협업을 다시 배워야 하나", "문서 서두의 핵심 지표를 의사결정 언어로 재해석");

  stat(s, 0.8, 1.55, "86%", "실패 원인\n소통/팀워크");
  stat(s, 3.0, 1.55, "3.5x", "소통 우수 조직\n성과 격차");
  stat(s, 5.2, 1.55, "1,650만 원", "1인당 연간\n소통 손실");
  stat(s, 7.4, 1.55, "72%", "비생산 회의\n비율");

  card(s, 0.8, 3.18, 8.6, 1.45, C.white);
  s.addText("핵심 정리", {
    x: 1.05,
    y: 3.42,
    w: 1.4,
    h: 0.25,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0
  });
  s.addText("기술 역량은 기본값이 되었고, 팀 간 의사결정 속도와 정렬 품질이 실제 출시 성패를 좌우한다.", {
    x: 1.05,
    y: 3.78,
    w: 8.0,
    h: 0.62,
    fontFace: FONT_B,
    fontSize: 13.5,
    color: C.text,
    margin: 0
  });

  insight(s, "기술 격차보다 협업 격차가 더 큰 비용을 만든다");
}

// 3. AI-native team shape
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "팀의 크기는 줄고 책임 폭은 넓어진다", "Linear·Anthropic·Vercel 사례를 역할 관점으로 재구성");

  s.addImage({ path: IMG_TEAM, x: 5.55, y: 1.45, w: 3.85, h: 2.65 });
  s.addShape(pptx.ShapeType.roundRect, {
    x: 5.55,
    y: 4.18,
    w: 3.85,
    h: 0.45,
    rectRadius: 0.06,
    fill: { color: "EAF8F5" },
    line: { color: "BEE9DE", width: 1 }
  });
  s.addText("2~5명 + 다수 AI 에이전트 운용 패턴", {
    x: 5.77,
    y: 4.33,
    w: 3.4,
    h: 0.2,
    fontFace: FONT_B,
    fontSize: 11,
    color: "0F5D50",
    margin: 0
  });

  card(s, 0.7, 1.45, 4.6, 3.2, C.white);
  const bullets = [
    "Linear: 소수 인원, 프로젝트 단위 재편성",
    "Anthropic: 연구·엔지니어 경계 최소화",
    "Vercel: 디자인+개발 통합 역할 강화",
    "결론: 역할 정의보다 제품 책임이 핵심"
  ];
  s.addText("조직 변화 요약", {
    x: 1.0,
    y: 1.72,
    w: 2.0,
    h: 0.25,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0
  });
  s.addText(
    bullets.map((b, i) => ({ text: b, options: { bullet: true, breakLine: i < bullets.length - 1 } })),
    {
      x: 1.0,
      y: 2.12,
      w: 4.1,
      h: 2.25,
      fontFace: FONT_B,
      fontSize: 12.8,
      color: C.text,
      margin: 2,
      paraSpaceAfterPt: 8
    }
  );

  insight(s, "작은 팀일수록 기능보다 제품 결과 책임이 커진다");
}

// 4. Methodology in practice
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "방법론의 공통점은 '범위·오너·리듬'", "Shape Up / Linear Method / Continuous Discovery");

  const cols = [
    ["Shape Up", ["시간 고정, 범위 가변", "백로그보다 선택 집중", "핵심 플로우 완성 우선"]],
    ["Linear Method", ["스프린트 피로 대신 모멘텀", "80% 정보로 결정·전진", "모든 이슈에 단일 오너"]],
    ["Discovery", ["매주 사용자 접점 유지", "트리오 단위 학습 루프", "출시 전 가설 검증 습관"]]
  ];

  cols.forEach((col, i) => {
    const x = 0.65 + i * 3.1;
    card(s, x, 1.55, 2.85, 3.15, C.white);
    s.addShape(pptx.ShapeType.rect, {
      x,
      y: 1.55,
      w: 2.85,
      h: 0.52,
      fill: { color: "EAF8F5" },
      line: { color: "EAF8F5", transparency: 100 }
    });
    s.addText(col[0], {
      x: x + 0.14,
      y: 1.72,
      w: 2.55,
      h: 0.24,
      fontFace: FONT_H,
      fontSize: 15,
      bold: true,
      color: "0F5D50",
      align: "center",
      margin: 0
    });
    s.addText(
      col[1].map((b, idx) => ({ text: b, options: { bullet: true, breakLine: idx < col[1].length - 1 } })),
      {
        x: x + 0.16,
        y: 2.24,
        w: 2.5,
        h: 2.3,
        fontFace: FONT_B,
        fontSize: 12.4,
        color: C.text,
        margin: 2,
        paraSpaceAfterPt: 8
      }
    );
  });

  insight(s, "좋은 방법론은 계획 문서가 아니라 실행 리듬을 만든다");
}

// 5. AI tools trade-off (stage-2 image applied)
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "AI 도구는 가속기지만 품질 보증 장치는 아니다", "속도 이득과 검증 비용 증가를 동시에 설계해야 한다");

  s.addImage({ path: IMG_TRADE, x: 0.7, y: 1.5, w: 4.2, h: 2.9 });
  card(s, 5.1, 1.5, 4.2, 2.9, C.white);

  s.addText("현업 수치 해석", {
    x: 5.35,
    y: 1.76,
    w: 1.7,
    h: 0.25,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0
  });

  const points = [
    "코드 작성 속도는 증가 (예: +55%)",
    "완료 작업은 늘지만 리뷰 시간 급증",
    "신뢰도 부족은 디버깅 비용으로 귀결",
    "팀 생산성은 '작성+검증' 합으로 판단"
  ];
  s.addText(
    points.map((p, i) => ({ text: p, options: { bullet: true, breakLine: i < points.length - 1 } })),
    {
      x: 5.35,
      y: 2.16,
      w: 3.7,
      h: 2.1,
      fontFace: FONT_B,
      fontSize: 12.8,
      color: C.text,
      margin: 2,
      paraSpaceAfterPt: 8
    }
  );

  insight(s, "AI는 속도를 준다, 품질 책임은 끝까지 사람 몫이다");
}

// 6. Vibe vs Agentic
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "바이브 코딩을 넘어 에이전틱 엔지니어링으로", "핵심 차이: 생성 자체가 아니라 감독·검증 수준");

  card(s, 0.8, 1.55, 4.1, 3.15, C.softCoral);
  card(s, 5.1, 1.55, 4.1, 3.15, C.softTeal);

  s.addText("Vibe Coding", {
    x: 1.0,
    y: 1.8,
    w: 3.7,
    h: 0.25,
    fontFace: FONT_H,
    fontSize: 16,
    bold: true,
    align: "center",
    color: "9C1D1D",
    margin: 0
  });
  s.addText("Agentic Engineering", {
    x: 5.3,
    y: 1.8,
    w: 3.7,
    h: 0.25,
    fontFace: FONT_H,
    fontSize: 16,
    bold: true,
    align: "center",
    color: "0F5D50",
    margin: 0
  });

  s.addText(["Accept All 의존", "설계 근거 약함", "학습·리뷰 축적 부족"].map((t, i, arr) => ({
    text: t,
    options: { bullet: true, breakLine: i < arr.length - 1 }
  })), {
    x: 1.1,
    y: 2.3,
    w: 3.5,
    h: 2.0,
    fontFace: FONT_B,
    fontSize: 13.2,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8
  });

  s.addText(["에이전트 오케스트레이션", "사람이 품질 게이트 운영", "리뷰·테스트·설명 가능성"].map((t, i, arr) => ({
    text: t,
    options: { bullet: true, breakLine: i < arr.length - 1 }
  })), {
    x: 5.4,
    y: 2.3,
    w: 3.5,
    h: 2.0,
    fontFace: FONT_B,
    fontSize: 13.2,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8
  });

  insight(s, "좋은 개발자는 코드를 쓰는 손보다 품질을 설계하는 눈이다");
}

// 7. Product thinking + stage-2 image
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "코딩 속도보다 프로덕트 판단력이 남는다", "프론트엔드가 제품 중심 역할로 확장되는 이유");

  s.addImage({ path: IMG_FLOW, x: 5.2, y: 1.45, w: 4.2, h: 2.85 });

  const items = [
    ["시스템 씽킹", "데이터 흐름과 렌더링을 한 번에 본다"],
    ["UX 감각", "접근성·반응형·성능을 기본값으로"],
    ["임팩트 판단", "기능보다 사용자 가치 우선순위"],
    ["연결 역량", "디자인·백엔드·배포를 잇는 역할"]
  ];

  items.forEach((it, i) => {
    const x = 0.7 + (i % 2) * 2.15;
    const y = 1.55 + Math.floor(i / 2) * 1.4;
    card(s, x, y, 2.0, 1.18, C.white);
    s.addText(it[0], {
      x: x + 0.14,
      y: y + 0.17,
      w: 1.7,
      h: 0.22,
      fontFace: FONT_H,
      fontSize: 13.5,
      bold: true,
      color: C.navy2,
      margin: 0
    });
    s.addText(it[1], {
      x: x + 0.14,
      y: y + 0.46,
      w: 1.75,
      h: 0.56,
      fontFace: FONT_B,
      fontSize: 11.2,
      color: C.text,
      margin: 0
    });
  });

  insight(s, "제품 맥락을 이해하는 프론트엔드가 AI 시대의 프리미엄이다");
}

// 8. Async-first collaboration
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "하이퍼포밍 팀은 비동기를 기본값으로 둔다", "회의를 줄이고 문서 기반 정렬 품질을 높인다");

  card(s, 0.7, 1.55, 4.3, 3.15, C.white);
  card(s, 5.2, 1.55, 4.1, 3.15, C.white);

  s.addText("실행 원칙", {
    x: 0.95,
    y: 1.8,
    w: 1.5,
    h: 0.25,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0
  });
  s.addText([
    "상태 보고는 회의 대신 텍스트로",
    "브레인스토밍은 사전 문서에서 시작",
    "실시간은 관계·의사결정에 집중",
    "모든 결정에 DRI 단일 책임 지정"
  ].map((t, i, arr) => ({ text: t, options: { bullet: true, breakLine: i < arr.length - 1 } })), {
    x: 0.95,
    y: 2.16,
    w: 3.9,
    h: 2.3,
    fontFace: FONT_B,
    fontSize: 12.8,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8
  });

  s.addText("시간 효과", {
    x: 5.45,
    y: 1.8,
    w: 1.3,
    h: 0.25,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0
  });

  // simple visual bars
  s.addShape(pptx.ShapeType.rect, { x: 5.5, y: 2.2, w: 3.3, h: 0.36, fill: { color: "E2E8F0" }, line: { color: "E2E8F0", transparency: 100 } });
  s.addShape(pptx.ShapeType.rect, { x: 5.5, y: 2.2, w: 0.95, h: 0.36, fill: { color: C.teal }, line: { color: C.teal, transparency: 100 } });
  s.addText("회의 시간 2.5h", { x: 5.62, y: 2.29, w: 1.4, h: 0.16, fontFace: FONT_B, fontSize: 10.5, color: C.white, margin: 0 });

  s.addShape(pptx.ShapeType.rect, { x: 5.5, y: 2.76, w: 3.3, h: 0.36, fill: { color: C.teal }, line: { color: C.teal, transparency: 100 } });
  s.addText("집중 작업 시간 확대", { x: 5.62, y: 2.85, w: 2.0, h: 0.16, fontFace: FONT_B, fontSize: 10.5, color: C.white, margin: 0 });

  s.addText("비동기 전환은 회의 절감 자체보다\n의사결정 문맥을 축적한다는 점이 더 중요하다.", {
    x: 5.5,
    y: 3.45,
    w: 3.3,
    h: 0.9,
    fontFace: FONT_B,
    fontSize: 12.4,
    color: C.text,
    margin: 0
  });

  insight(s, "문서 중심 협업은 속도보다 재사용 가능한 맥락을 남긴다");
}

// 9. Git + RFC operations
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "작은 팀 운영력은 Git·RFC에서 드러난다", "실행 단위와 의사결정 기록이 품질을 만든다");

  card(s, 0.7, 1.55, 4.15, 3.2, C.white);
  card(s, 5.15, 1.55, 4.15, 3.2, C.white);

  s.addText("Git 운영 체크", {
    x: 0.95,
    y: 1.82,
    w: 1.8,
    h: 0.25,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0
  });
  s.addText([
    "작은 PR로 디버깅 비용 최소화",
    "리뷰 지연은 팀 병목으로 직결",
    "커밋 메시지에 변경 이유를 명시",
    "템플릿으로 테스트 근거를 표준화"
  ].map((t, i, arr) => ({ text: t, options: { bullet: true, breakLine: i < arr.length - 1 } })), {
    x: 0.95,
    y: 2.18,
    w: 3.7,
    h: 2.3,
    fontFace: FONT_B,
    fontSize: 12.6,
    color: C.text,
    margin: 2,
    paraSpaceAfterPt: 8
  });

  s.addText("RFC 1페이지 구조", {
    x: 5.4,
    y: 1.82,
    w: 2.0,
    h: 0.25,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0
  });
  s.addText("제안 → 장점/단점 → 대안 →\n미해결 질문 → 결론", {
    x: 5.4,
    y: 2.2,
    w: 3.6,
    h: 0.52,
    fontFace: FONT_B,
    fontSize: 13,
    color: C.text,
    margin: 0
  });

  s.addShape(pptx.ShapeType.roundRect, {
    x: 5.4,
    y: 2.9,
    w: 3.6,
    h: 1.55,
    rectRadius: 0.06,
    fill: { color: "F8FAFF" },
    line: { color: "CBD5E1", width: 1 }
  });
  s.addText("\"이걸 왜 이렇게 결정했지?\"\n라는 질문에 즉시 답할 수 있어야\n팀의 재작업 비용이 줄어든다.", {
    x: 5.65,
    y: 3.25,
    w: 3.2,
    h: 0.9,
    fontFace: FONT_B,
    fontSize: 12.5,
    color: C.text,
    margin: 0
  });

  insight(s, "작은 실행 단위와 기록 문화가 장기 속도를 만든다");
}

// 10. Presentation strategy
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "발표는 기술 소개가 아니라 가치 전달이다", "PSI·SCQA·5분 구조를 하나의 스토리로 통합");

  const steps = [
    ["Problem", "누가 어떤 문제를 겪는지 한 문장"],
    ["Solution", "핵심 기능 데모와 선택 근거"],
    ["Impact", "사용자 변화와 다음 반복 계획"]
  ];

  steps.forEach((st, i) => {
    const x = 0.8 + i * 3.05;
    card(s, x, 1.65, 2.8, 2.95, C.white);
    s.addShape(pptx.ShapeType.ellipse, {
      x: x + 1.1,
      y: 1.88,
      w: 0.58,
      h: 0.58,
      fill: { color: "EAF8F5" },
      line: { color: "BEE9DE", width: 1 }
    });
    s.addText(String(i + 1), {
      x: x + 1.1,
      y: 2.08,
      w: 0.58,
      h: 0.18,
      fontFace: FONT_H,
      fontSize: 12,
      bold: true,
      align: "center",
      color: "0F5D50",
      margin: 0
    });
    s.addText(st[0], {
      x: x + 0.15,
      y: 2.58,
      w: 2.5,
      h: 0.24,
      fontFace: FONT_H,
      fontSize: 15,
      bold: true,
      align: "center",
      color: C.navy2,
      margin: 0
    });
    s.addText(st[1], {
      x: x + 0.2,
      y: 2.95,
      w: 2.4,
      h: 0.95,
      fontFace: FONT_B,
      fontSize: 12.5,
      color: C.text,
      align: "center",
      margin: 0
    });
  });

  insight(s, "발표 품질은 기능 개수보다 문제 해석력에서 갈린다");
}

// 11. README as product deck
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "README를 제품 소개서로 바꿔라", "면접관 30초 시선에 맞춘 포트폴리오 구조");

  card(s, 0.7, 1.55, 8.6, 3.2, C.white);
  s.addShape(pptx.ShapeType.rect, {
    x: 0.7,
    y: 1.55,
    w: 2.25,
    h: 3.2,
    fill: { color: "EAF8F5" },
    line: { color: "EAF8F5", transparency: 100 }
  });

  const left = ["한 줄 소개", "핵심 GIF", "기술 선택 이유", "내 역할", "트러블슈팅", "회고/로드맵"];
  left.forEach((t, i) => {
    s.addText(`${i + 1}. ${t}`, {
      x: 0.95,
      y: 1.9 + i * 0.43,
      w: 1.7,
      h: 0.22,
      fontFace: FONT_H,
      fontSize: 12.5,
      bold: true,
      color: "0F5D50",
      margin: 0
    });
  });

  s.addText("좋은 README는 '무엇을 만들었는가'보다\n'왜 그렇게 결정했는가'를 먼저 보여준다.\n\n특히 개인 확장 기능, 배포 링크, 실패-해결 기록은\n주니어를 제품형 인재로 인식시키는 증거가 된다.", {
    x: 3.25,
    y: 2.05,
    w: 5.7,
    h: 2.15,
    fontFace: FONT_B,
    fontSize: 13.2,
    color: C.text,
    margin: 0
  });

  insight(s, "README는 코드 설명서가 아니라 의사결정 포트폴리오다");
}

// 12. Korea market opportunity
{
  const s = pptx.addSlide();
  setBase(s);
  title(s, "한국 AI 시장, 상용화 갭이 기회다", "기술 역량 대비 제품 경험 전달력이 희소한 구간");

  stat(s, 0.8, 1.55, "6.3조", "AI 산업\n매출(2024)");
  stat(s, 3.0, 1.55, "7.4%", "AI 인력\n부족률");
  stat(s, 5.2, 1.55, "84.5%", "근로자\nChatGPT 사용");
  stat(s, 7.4, 1.55, "1.4조", "GPU 자원\n투자");

  card(s, 0.8, 3.15, 8.6, 1.45, C.white);
  s.addText("포지셔닝 제안", {
    x: 1.05,
    y: 3.4,
    w: 1.6,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0
  });
  s.addText("\"AI 연동 경험이 있는 프론트엔드\"를 명확히 증명하라.\nAPI 통합 + 사용자 흐름 개선 + 배포 운영 경험의 조합이 면접 기회를 키운다.", {
    x: 1.05,
    y: 3.78,
    w: 8.1,
    h: 0.62,
    fontFace: FONT_B,
    fontSize: 13.2,
    color: C.text,
    margin: 0
  });

  insight(s, "한국 시장의 병목은 모델 성능보다 제품화 실행력이다");
}

// 13. Closing + 30-day plan
{
  const s = pptx.addSlide();
  s.addImage({ path: IMG_FLOW, x: 0, y: 0, w: 10, h: 5.625 });
  s.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 5.625,
    fill: { color: "0B122B", transparency: 38 },
    line: { color: "0B122B", transparency: 100 }
  });
  setBase(s, true);

  title(s, "마무리: 여러분의 프로젝트는 첫 번째 제품이다", "빠른 것은 AI의 일, 좋은 것은 여러분의 일", true);

  card(s, 0.8, 2.05, 8.4, 2.35, "132B59");
  s.addText("30일 실행 체크", {
    x: 1.1,
    y: 2.28,
    w: 1.8,
    h: 0.24,
    fontFace: FONT_H,
    fontSize: 14.5,
    bold: true,
    color: "BEE9DE",
    margin: 0
  });
  s.addText(
    "Week1 범위 축소·오너 명확화  |  Week2 README 제품화\nWeek3 AI 연동 기능 완성       |  Week4 5분 발표 리허설",
    {
      x: 1.1,
      y: 2.7,
      w: 7.8,
      h: 0.72,
      fontFace: FONT_B,
      fontSize: 13.2,
      color: "E8EEFF",
      margin: 0
    }
  );
  s.addText("결국 커리어를 바꾸는 건 프레임워크가 아니라,\n매일 1% 더 나아지는 실행 습관이다.", {
    x: 1.1,
    y: 3.55,
    w: 7.8,
    h: 0.55,
    fontFace: FONT_B,
    fontSize: 14,
    bold: true,
    color: C.white,
    margin: 0
  });

  insight(s, "판단력·협업력·지속 실행력이 AI 시대의 실전 경쟁력이다", true);
}

const out = "/Users/sanguinekim/Documents/3_Code/Vibe/Project/260220_theartofcollaboration/협업의_기술_The_Art_of_Collaboration_insight_v2.pptx";

pptx.writeFile({ fileName: out }).then(() => {
  console.log(`PPTX 생성 완료: ${out}`);
}).catch((e) => {
  console.error(e);
  process.exit(1);
});