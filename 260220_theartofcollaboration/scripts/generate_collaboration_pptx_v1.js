const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.author = "Claude";
pptx.company = "ESTsoft KDT";
pptx.subject = "협업의 기술";
pptx.title = "협업의 기술 (The Art of Collaboration)";
pptx.lang = "ko-KR";

const C = {
  navy: "1E2761",
  navy2: "2F3C7E",
  teal: "028090",
  mint: "02C39A",
  light: "F8FAFC",
  white: "FFFFFF",
  text: "0F172A",
  muted: "475569",
  line: "D9E2EC",
  coral: "F96167",
  amber: "F9E795"
};

const FONT = "Malgun Gothic";

function styleSlide(slide, dark = false) {
  if (dark) {
    slide.background = { color: C.navy };
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.14,
      fill: { color: C.mint },
      line: { color: C.mint, transparency: 100 }
    });
  } else {
    slide.background = { color: C.light };
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.12,
      fill: { color: C.teal },
      line: { color: C.teal, transparency: 100 }
    });
  }
}

function addTitle(slide, title, subtitle = "", dark = false) {
  slide.addText(title, {
    x: 0.6,
    y: dark ? 0.8 : 0.45,
    w: 8.8,
    h: 0.8,
    fontFace: FONT,
    fontSize: dark ? 40 : 30,
    bold: true,
    color: dark ? C.white : C.text,
    margin: 0
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6,
      y: dark ? 1.7 : 1.05,
      w: 8.8,
      h: dark ? 0.85 : 0.6,
      fontFace: FONT,
      fontSize: dark ? 17 : 15,
      color: dark ? "D7E3FC" : C.muted,
      margin: 0
    });
  }
}

function statCard(slide, x, y, w, h, value, label) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.line, width: 1 }
  });
  slide.addText(value, {
    x: x + 0.2,
    y: y + 0.22,
    w: w - 0.4,
    h: 0.55,
    fontFace: FONT,
    fontSize: 28,
    bold: true,
    color: C.navy2,
    align: "center",
    margin: 0
  });
  slide.addText(label, {
    x: x + 0.2,
    y: y + 0.86,
    w: w - 0.4,
    h: 0.6,
    fontFace: FONT,
    fontSize: 13,
    color: C.muted,
    align: "center",
    margin: 0
  });
}

// 1. Title
{
  const s = pptx.addSlide();
  styleSlide(s, true);
  addTitle(
    s,
    "협업의 기술",
    "AI 시대, 프론트엔드 개발자가 알아야 할\n현업의 협업 방식",
    true
  );

  s.addText(
    "\"코드를 짜는 것과 제품을 만드는 것은 다릅니다.\n개발자의 가치는 판단력과 협업에서 나옵니다.\"",
    {
      x: 0.8,
      y: 3.0,
      w: 8.4,
      h: 1.2,
      fontFace: FONT,
      fontSize: 18,
      italic: true,
      color: "E2E8F0",
      align: "center",
      valign: "middle",
      margin: 0
    }
  );

  s.addText("기반 문서: 협업의_기술_The_Art_of_Collaboration.md", {
    x: 0.6,
    y: 5.0,
    w: 8.8,
    h: 0.3,
    fontFace: FONT,
    fontSize: 11,
    color: "AFC7EA",
    align: "right",
    margin: 0
  });
}

// 2. Why collaboration now
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "왜 지금 '협업'인가", "현업에서 프로젝트 성패를 가르는 핵심 변수");

  statCard(s, 0.7, 1.6, 4.1, 1.45, "86%", "프로젝트 실패 원인이\n기술보다 팀워크/소통 문제");
  statCard(s, 5.2, 1.6, 4.1, 1.45, "3.5배", "소통 우수 조직의\n성과 우위");
  statCard(s, 0.7, 3.25, 4.1, 1.45, "약 1,650만 원", "잘못된 소통으로 인한\n1인당 연간 손실");
  statCard(s, 5.2, 3.25, 4.1, 1.45, "72%", "비생산적 회의 비율");
}

// 3. AI-native organizations
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "팀의 모양이 바뀌고 있다", "AI 네이티브 조직은 작고 유동적이다");

  const cards = [
    {
      x: 0.6,
      title: "Linear",
      body: "직원 약 50명\n20,000+ 기업 서비스\n프로젝트 단위로 팀 구성·해체"
    },
    {
      x: 3.45,
      title: "Anthropic",
      body: "연구/엔지니어 구분 최소화\n2~4명 소규모 문제 해결\n빠른 프로토타이핑 중심"
    },
    {
      x: 6.3,
      title: "Vercel",
      body: "디자인 엔지니어 직무\n디자인+프론트엔드 통합\n제품 전달 중심 역할"
    }
  ];

  cards.forEach((c) => {
    s.addShape(pptx.ShapeType.roundRect, {
      x: c.x,
      y: 1.65,
      w: 2.95,
      h: 2.95,
      rectRadius: 0.08,
      fill: { color: C.white },
      line: { color: C.line, width: 1 }
    });
    s.addText(c.title, {
      x: c.x + 0.2,
      y: 1.9,
      w: 2.55,
      h: 0.45,
      fontFace: FONT,
      fontSize: 20,
      bold: true,
      color: C.navy2,
      align: "center",
      margin: 0
    });
    s.addText(c.body, {
      x: c.x + 0.2,
      y: 2.45,
      w: 2.55,
      h: 1.9,
      fontFace: FONT,
      fontSize: 13,
      color: C.text,
      align: "center",
      valign: "mid",
      margin: 0
    });
  });

  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: 4.8,
    w: 8.8,
    h: 0.55,
    rectRadius: 0.06,
    fill: { color: "EAF8F5" },
    line: { color: "BEE9DE", width: 1 }
  });
  s.addText("핵심: 팀이 작아질수록 개인의 역할 범위는 넓어지고, 제품 전체를 보는 능력이 중요해진다.", {
    x: 0.8,
    y: 4.98,
    w: 8.4,
    h: 0.26,
    fontFace: FONT,
    fontSize: 13,
    color: "0F5D50",
    align: "center",
    margin: 0
  });
}

// 4. Junior opportunity
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "주니어에게는 오히려 기회", "AI 도구는 주니어 생산성 향상 폭이 더 크다");

  s.addChart(
    pptx.ChartType.bar,
    [
      {
        name: "생산성 향상",
        labels: ["주니어", "시니어"],
        values: [32, 12]
      }
    ],
    {
      x: 0.8,
      y: 1.6,
      w: 4.6,
      h: 2.8,
      barDir: "col",
      chartColors: [C.teal],
      showLegend: false,
      showValue: true,
      catAxisLabelColor: C.muted,
      valAxisLabelColor: C.muted,
      valGridLine: { color: "E2E8F0", size: 1 }
    }
  );

  s.addShape(pptx.ShapeType.roundRect, {
    x: 5.7,
    y: 1.7,
    w: 3.6,
    h: 2.65,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.line, width: 1 }
  });
  s.addText("현업 메시지", {
    x: 6.0,
    y: 2.0,
    w: 3.0,
    h: 0.35,
    fontFace: FONT,
    fontSize: 16,
    bold: true,
    color: C.navy2,
    margin: 0
  });
  s.addText(
    "\"주니어를 뽑지 않겠다는 건\n가장 어리석은 말이다.\"\n\n— Matt Garman (AWS CEO)",
    {
      x: 6.0,
      y: 2.45,
      w: 3.0,
      h: 1.6,
      fontFace: FONT,
      fontSize: 13,
      color: C.text,
      margin: 0
    }
  );

  s.addText("* 문서 내 인용 데이터를 바탕으로 단순화한 비교", {
    x: 0.8,
    y: 4.55,
    w: 4.5,
    h: 0.2,
    fontFace: FONT,
    fontSize: 10,
    color: C.muted,
    margin: 0
  });
}

// 5. Methodologies
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "진짜 동작하는 개발 방법론", "공통점: 작은 범위, 명확한 오너, 빠른 반복");

  const cols = [
    {
      x: 0.6,
      title: "Shape Up",
      points: ["시간 고정(예: 6주)", "범위는 유연하게 축소", "백로그 최소화"]
    },
    {
      x: 3.45,
      title: "Linear Method",
      points: ["모멘텀 중심 2주 리듬", "바쁜 일에 No", "80% 정보로 결정+전진"]
    },
    {
      x: 6.3,
      title: "Continuous Discovery",
      points: ["PM·디자이너·엔지니어 트리오", "매주 사용자 접점", "채택률 개선"]
    }
  ];

  cols.forEach((c) => {
    s.addShape(pptx.ShapeType.rect, {
      x: c.x,
      y: 1.6,
      w: 2.95,
      h: 3.15,
      fill: { color: C.white },
      line: { color: C.line, width: 1 }
    });
    s.addShape(pptx.ShapeType.rect, {
      x: c.x,
      y: 1.6,
      w: 2.95,
      h: 0.5,
      fill: { color: "E9F5F4" },
      line: { color: "E9F5F4", transparency: 100 }
    });
    s.addText(c.title, {
      x: c.x + 0.15,
      y: 1.75,
      w: 2.65,
      h: 0.25,
      fontFace: FONT,
      fontSize: 16,
      bold: true,
      color: C.navy2,
      align: "center",
      margin: 0
    });

    const bulletRuns = c.points.map((p, i) => ({
      text: p,
      options: { bullet: true, breakLine: i < c.points.length - 1 }
    }));

    s.addText(bulletRuns, {
      x: c.x + 0.2,
      y: 2.25,
      w: 2.55,
      h: 2.2,
      fontFace: FONT,
      fontSize: 13,
      color: C.text,
      margin: 2,
      paraSpaceAfterPt: 10
    });
  });
}

// 6. AI tools reality
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "AI 도구의 현실", "속도는 빨라졌지만, 검증 비용과 리뷰 부담도 함께 증가");

  s.addShape(pptx.ShapeType.rect, {
    x: 0.6,
    y: 1.55,
    w: 4.2,
    h: 1.8,
    fill: { color: "EAF8F5" },
    line: { color: "BEE9DE", width: 1 }
  });
  s.addText("장점", {
    x: 0.85,
    y: 1.75,
    w: 3.7,
    h: 0.3,
    fontFace: FONT,
    fontSize: 16,
    bold: true,
    color: "0F5D50",
    margin: 0
  });
  s.addText(
    [
      { text: "Copilot 사용 시 작업 완료 속도 최대 55% 향상", options: { bullet: true, breakLine: true } },
      { text: "Cursor/v0로 프로토타이핑 속도 급증", options: { bullet: true, breakLine: true } },
      { text: "주니어 생산성 향상 폭이 특히 큼", options: { bullet: true } }
    ],
    {
      x: 0.85,
      y: 2.12,
      w: 3.8,
      h: 1.1,
      fontFace: FONT,
      fontSize: 12.5,
      color: C.text,
      margin: 2
    }
  );

  s.addShape(pptx.ShapeType.rect, {
    x: 5.2,
    y: 1.55,
    w: 4.2,
    h: 1.8,
    fill: { color: "FFF1F1" },
    line: { color: "FFD2D2", width: 1 }
  });
  s.addText("주의", {
    x: 5.45,
    y: 1.75,
    w: 3.7,
    h: 0.3,
    fontFace: FONT,
    fontSize: 16,
    bold: true,
    color: "9C1D1D",
    margin: 0
  });
  s.addText(
    [
      { text: "AI 다용 팀의 PR 리뷰 시간 91% 증가", options: { bullet: true, breakLine: true } },
      { text: "컨텍스트 전환 47% 증가", options: { bullet: true, breakLine: true } },
      { text: "AI 결과물 신뢰 비율 33%", options: { bullet: true } }
    ],
    {
      x: 5.45,
      y: 2.12,
      w: 3.8,
      h: 1.1,
      fontFace: FONT,
      fontSize: 12.5,
      color: C.text,
      margin: 2
    }
  );

  s.addChart(
    pptx.ChartType.bar,
    [
      {
        name: "변화율(%)",
        labels: ["완료 작업", "PR 리뷰 시간", "컨텍스트 전환"],
        values: [21, 91, 47]
      }
    ],
    {
      x: 0.8,
      y: 3.55,
      w: 8.4,
      h: 1.7,
      barDir: "col",
      chartColors: [C.navy2],
      showLegend: false,
      showValue: true,
      catAxisLabelColor: C.muted,
      valAxisLabelColor: C.muted,
      valGridLine: { color: "E2E8F0", size: 1 }
    }
  );
}

// 7. Vibe vs Agentic
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "바이브 코딩 vs 에이전틱 엔지니어링", "차이는 '코드를 누가 쓰는가'가 아니라 '누가 책임지는가'");

  s.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.6,
    w: 4.1,
    h: 3.2,
    fill: { color: C.white },
    line: { color: C.line, width: 1 }
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 5.1,
    y: 1.6,
    w: 4.1,
    h: 3.2,
    fill: { color: C.white },
    line: { color: C.line, width: 1 }
  });

  s.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.6,
    w: 4.1,
    h: 0.55,
    fill: { color: "FFF1F1" },
    line: { color: "FFF1F1", transparency: 100 }
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 5.1,
    y: 1.6,
    w: 4.1,
    h: 0.55,
    fill: { color: "EAF8F5" },
    line: { color: "EAF8F5", transparency: 100 }
  });

  s.addText("Vibe Coding", {
    x: 1.0,
    y: 1.78,
    w: 3.7,
    h: 0.24,
    fontFace: FONT,
    fontSize: 16,
    bold: true,
    color: "9C1D1D",
    align: "center",
    margin: 0
  });
  s.addText("Agentic Engineering", {
    x: 5.3,
    y: 1.78,
    w: 3.7,
    h: 0.24,
    fontFace: FONT,
    fontSize: 16,
    bold: true,
    color: "0F5D50",
    align: "center",
    margin: 0
  });

  s.addText(
    [
      { text: "Accept All 중심", options: { bullet: true, breakLine: true } },
      { text: "설계/검증이 약함", options: { bullet: true, breakLine: true } },
      { text: "속도는 빠르나 리스크 큼", options: { bullet: true } }
    ],
    {
      x: 1.0,
      y: 2.35,
      w: 3.6,
      h: 2.2,
      fontFace: FONT,
      fontSize: 14,
      color: C.text,
      margin: 2,
      paraSpaceAfterPt: 10
    }
  );

  s.addText(
    [
      { text: "에이전트를 오케스트레이션", options: { bullet: true, breakLine: true } },
      { text: "사람이 아키텍처/품질 책임", options: { bullet: true, breakLine: true } },
      { text: "리뷰·테스트·이해가 필수", options: { bullet: true } }
    ],
    {
      x: 5.3,
      y: 2.35,
      w: 3.6,
      h: 2.2,
      fontFace: FONT,
      fontSize: 14,
      color: C.text,
      margin: 2,
      paraSpaceAfterPt: 10
    }
  );
}

// 8. Product thinking
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "코딩 속도보다 프로덕트 씽킹", "AI 시대 프론트엔드 핵심 역량 4가지");

  const items = [
    ["시스템 씽킹", "데이터·API·렌더링\n전체 흐름 이해"],
    ["UX 감각", "접근성, 반응형,\nCore Web Vitals"],
    ["비즈니스 임팩트", "기능의 가치와\n우선순위 판단"],
    ["연결 역량", "디자인↔개발,\n프론트↔백엔드 연결"]
  ];

  items.forEach((it, i) => {
    const x = 0.8 + (i % 2) * 4.3;
    const y = 1.65 + Math.floor(i / 2) * 1.65;
    s.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 4.0,
      h: 1.35,
      rectRadius: 0.08,
      fill: { color: C.white },
      line: { color: C.line, width: 1 }
    });

    s.addShape(pptx.ShapeType.ellipse, {
      x: x + 0.2,
      y: y + 0.35,
      w: 0.5,
      h: 0.5,
      fill: { color: "DFF5F2" },
      line: { color: "DFF5F2", transparency: 100 }
    });

    s.addText(String(i + 1), {
      x: x + 0.2,
      y: y + 0.47,
      w: 0.5,
      h: 0.2,
      fontFace: FONT,
      fontSize: 12,
      bold: true,
      color: C.teal,
      align: "center",
      margin: 0
    });

    s.addText(it[0], {
      x: x + 0.85,
      y: y + 0.24,
      w: 2.9,
      h: 0.3,
      fontFace: FONT,
      fontSize: 16,
      bold: true,
      color: C.navy2,
      margin: 0
    });
    s.addText(it[1], {
      x: x + 0.85,
      y: y + 0.6,
      w: 2.9,
      h: 0.55,
      fontFace: FONT,
      fontSize: 12.5,
      color: C.text,
      margin: 0
    });
  });
}

// 9. Hyper-performing collaboration stack
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "하이퍼포밍 팀의 협업 시스템", "도구 스택 + 비동기 우선 문화");

  s.addTable(
    [
      ["도구", "용도"],
      ["Slack", "실시간 커뮤니케이션"],
      ["Linear / GitHub Projects", "이슈 트래킹·프로젝트 관리"],
      ["Notion", "스펙·회의록·위키"],
      ["Figma", "디자인 협업"],
      ["GitHub", "버전관리·코드리뷰·CI/CD"]
    ],
    {
      x: 0.7,
      y: 1.6,
      w: 4.8,
      h: 3.5,
      border: { pt: 1, color: C.line },
      fontFace: FONT,
      fontSize: 12,
      color: C.text,
      fill: C.white,
      valign: "middle",
      align: "left"
    }
  );

  s.addShape(pptx.ShapeType.rect, {
    x: 5.8,
    y: 1.6,
    w: 3.5,
    h: 3.5,
    fill: { color: C.white },
    line: { color: C.line, width: 1 }
  });

  s.addText("Async-First 원칙", {
    x: 6.05,
    y: 1.85,
    w: 3.0,
    h: 0.35,
    fontFace: FONT,
    fontSize: 16,
    bold: true,
    color: C.navy2,
    margin: 0
  });

  s.addText(
    [
      { text: "상태 보고는 글로", options: { bullet: true, breakLine: true } },
      { text: "회의 전 사전 문서 공유", options: { bullet: true, breakLine: true } },
      { text: "실시간 시간은 의사결정에 집중", options: { bullet: true, breakLine: true } },
      { text: "모든 결정에 DRI 명시", options: { bullet: true } }
    ],
    {
      x: 6.05,
      y: 2.3,
      w: 3.0,
      h: 2.2,
      fontFace: FONT,
      fontSize: 13,
      color: C.text,
      margin: 2,
      paraSpaceAfterPt: 10
    }
  );
}

// 10. Git + RFC
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "작은 팀을 위한 Git & RFC 실전", "작은 PR, 빠른 리뷰, 문서 기반 의사결정");

  s.addShape(pptx.ShapeType.rect, {
    x: 0.7,
    y: 1.6,
    w: 4.25,
    h: 3.5,
    fill: { color: C.white },
    line: { color: C.line, width: 1 }
  });

  s.addText("GitHub Flow 체크리스트", {
    x: 1.0,
    y: 1.9,
    w: 3.7,
    h: 0.35,
    fontFace: FONT,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0
  });

  s.addText(
    [
      { text: "feature 브랜치 → PR → 리뷰 → main 머지", options: { bullet: true, breakLine: true } },
      { text: "PR은 작게 유지 (작은 diff)", options: { bullet: true, breakLine: true } },
      { text: "리뷰 SLA: 24시간 이내", options: { bullet: true, breakLine: true } },
      { text: "커밋 메시지는 '무엇+왜'를 명확히", options: { bullet: true } }
    ],
    {
      x: 1.0,
      y: 2.35,
      w: 3.7,
      h: 2.5,
      fontFace: FONT,
      fontSize: 13,
      color: C.text,
      margin: 2,
      paraSpaceAfterPt: 10
    }
  );

  s.addShape(pptx.ShapeType.rect, {
    x: 5.15,
    y: 1.6,
    w: 4.15,
    h: 3.5,
    fill: { color: C.white },
    line: { color: C.line, width: 1 }
  });

  s.addText("RFC 한 장 템플릿", {
    x: 5.45,
    y: 1.9,
    w: 3.55,
    h: 0.35,
    fontFace: FONT,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0
  });
  s.addText(
    "제목: [기술 선택]\n제안: 무엇을 채택할지\n장점/단점: 트레이드오프\n대안: 비교 후보\n미해결 질문\n결론",
    {
      x: 5.45,
      y: 2.35,
      w: 3.55,
      h: 2.3,
      fontFace: "Consolas",
      fontSize: 12,
      color: C.text,
      margin: 0
    }
  );
}

// 11. Presentation framework
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "기술 성과를 설득력 있게 발표하는 법", "Problem-Solution-Impact + SCQA + 5분 구조");

  const boxW = 2.75;
  const titles = ["PSI", "SCQA", "5분 발표 구조"];
  const bodies = [
    "문제 제시\n→ 한 일\n→ 결과/임팩트",
    "Situation\nComplication\nQuestion\nAnswer",
    "Hook(30초)\n문제 정의\n데모\n기술 결정\n교훈/다음 단계"
  ];

  for (let i = 0; i < 3; i++) {
    const x = 0.65 + i * 3.05;
    s.addShape(pptx.ShapeType.roundRect, {
      x,
      y: 1.7,
      w: boxW,
      h: 3.2,
      rectRadius: 0.08,
      fill: { color: C.white },
      line: { color: C.line, width: 1 }
    });
    s.addShape(pptx.ShapeType.rect, {
      x,
      y: 1.7,
      w: boxW,
      h: 0.55,
      fill: { color: "EAF8F5" },
      line: { color: "EAF8F5", transparency: 100 }
    });

    s.addText(titles[i], {
      x: x + 0.15,
      y: 1.87,
      w: boxW - 0.3,
      h: 0.25,
      fontFace: FONT,
      fontSize: 16,
      bold: true,
      color: "0F5D50",
      align: "center",
      margin: 0
    });

    s.addText(bodies[i], {
      x: x + 0.2,
      y: 2.45,
      w: boxW - 0.4,
      h: 2.2,
      fontFace: FONT,
      fontSize: 13,
      color: C.text,
      align: "center",
      valign: "mid",
      margin: 0
    });
  }
}

// 12. README strategy
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "README를 '제품 소개서'로", "면접관이 30초 안에 이해할 수 있는 구조");

  s.addShape(pptx.ShapeType.rect, {
    x: 0.7,
    y: 1.6,
    w: 8.6,
    h: 3.55,
    fill: { color: C.white },
    line: { color: C.line, width: 1 }
  });

  s.addText(
    [
      { text: "한 줄 소개", options: { bullet: true, breakLine: true } },
      { text: "핵심 기능 스크린샷/GIF", options: { bullet: true, breakLine: true } },
      { text: "기술 선택 이유(Why)", options: { bullet: true, breakLine: true } },
      { text: "내 역할(구체 기능 단위)", options: { bullet: true, breakLine: true } },
      { text: "트러블슈팅(문제→해결)", options: { bullet: true, breakLine: true } },
      { text: "회고 + 다음 로드맵", options: { bullet: true } }
    ],
    {
      x: 1.0,
      y: 1.95,
      w: 3.8,
      h: 2.9,
      fontFace: FONT,
      fontSize: 14,
      color: C.text,
      margin: 2,
      paraSpaceAfterPt: 10
    }
  );

  s.addShape(pptx.ShapeType.roundRect, {
    x: 5.2,
    y: 2.0,
    w: 3.7,
    h: 2.7,
    rectRadius: 0.08,
    fill: { color: "EAF8F5" },
    line: { color: "BEE9DE", width: 1 }
  });
  s.addText("차별화 포인트", {
    x: 5.45,
    y: 2.25,
    w: 3.2,
    h: 0.35,
    fontFace: FONT,
    fontSize: 15,
    bold: true,
    color: "0F5D50",
    margin: 0
  });
  s.addText(
    "• 부트캠프 프로젝트를 개인 확장\n• 배포 링크 + 테스트 계정 제공\n• 내가 겪는 문제를 직접 해결한 사례",
    {
      x: 5.45,
      y: 2.7,
      w: 3.2,
      h: 1.7,
      fontFace: FONT,
      fontSize: 13,
      color: C.text,
      margin: 0
    }
  );
}

// 13. Korea AI ecosystem
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "한국 AI 생태계와 기회", "기술 역량 대비 상용화 갭이 큰 시장");

  statCard(s, 0.8, 1.75, 2.7, 1.35, "6.3조 원", "AI 산업 매출 (2024)");
  statCard(s, 3.65, 1.75, 2.7, 1.35, "7.4%", "AI 인력 부족률");
  statCard(s, 6.5, 1.75, 2.7, 1.35, "1.4조 원", "정부 GPU 자원 투자");

  s.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 3.35,
    w: 8.4,
    h: 1.65,
    fill: { color: C.white },
    line: { color: C.line, width: 1 }
  });

  s.addText("핵심 인사이트", {
    x: 1.05,
    y: 3.6,
    w: 2.2,
    h: 0.3,
    fontFace: FONT,
    fontSize: 15,
    bold: true,
    color: C.navy2,
    margin: 0
  });

  s.addText(
    "한국은 글로벌 AI 지수 6위지만 상용화 18위권.\n즉, 'AI를 유저 경험으로 연결하는 프론트엔드'가 가장 큰 기회 영역이다.",
    {
      x: 1.05,
      y: 3.95,
      w: 7.9,
      h: 0.8,
      fontFace: FONT,
      fontSize: 14,
      color: C.text,
      margin: 0
    }
  );
}

// 14. Data summary
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "핵심 데이터 요약", "면접/발표에서 바로 쓸 수 있는 숫자");

  s.addTable(
    [
      ["카테고리", "핵심 수치"],
      ["AI 도구 채택", "개발자 84% 사용/도입 계획, Copilot 사용자 2,000만+"],
      ["생산성", "코드 작성 속도 향상 vs 리뷰 부담 증가(PR 리뷰 +91%)"],
      ["협업", "소통 우수 조직 성과 3.5배, 실패 원인 86%가 소통/팀워크"],
      ["한국 시장", "AI 산업 6.3조 원, 인력 부족 7.4%, 근로자 ChatGPT 사용 84.5%"]
    ],
    {
      x: 0.65,
      y: 1.6,
      w: 8.7,
      h: 3.55,
      border: { pt: 1, color: C.line },
      fontFace: FONT,
      fontSize: 12.5,
      color: C.text,
      fill: C.white,
      valign: "middle",
      colW: [2.0, 6.7]
    }
  );
}

// 15. 30-day action plan
{
  const s = pptx.addSlide();
  styleSlide(s);
  addTitle(s, "입사 전 30일 실행 플랜", "협업형 AI-네이티브 개발자로 포지셔닝하기");

  const steps = [
    ["Week 1", "핵심 유저 플로우 3개로 범위 축소\n모든 태스크에 오너 지정"],
    ["Week 2", "README를 제품 소개서 구조로 개편\n트러블슈팅 2개 문서화"],
    ["Week 3", "AI 연동 기능 1개 완성\n(PR 작은 단위로 운영)"],
    ["Week 4", "5분 발표 스크립트 완성\nSCQA/PSI 프레임으로 리허설"]
  ];

  steps.forEach((st, idx) => {
    const y = 1.6 + idx * 0.9;
    s.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y,
      w: 8.4,
      h: 0.72,
      rectRadius: 0.06,
      fill: { color: C.white },
      line: { color: C.line, width: 1 }
    });

    s.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y,
      w: 1.35,
      h: 0.72,
      fill: { color: "EAF8F5" },
      line: { color: "EAF8F5", transparency: 100 }
    });

    s.addText(st[0], {
      x: 0.9,
      y: y + 0.22,
      w: 1.1,
      h: 0.3,
      fontFace: FONT,
      fontSize: 13,
      bold: true,
      color: "0F5D50",
      align: "center",
      margin: 0
    });
    s.addText(st[1], {
      x: 2.3,
      y: y + 0.15,
      w: 6.7,
      h: 0.45,
      fontFace: FONT,
      fontSize: 12.5,
      color: C.text,
      margin: 0
    });
  });
}

// 16. Closing
{
  const s = pptx.addSlide();
  styleSlide(s, true);
  addTitle(s, "마무리", "여러분의 프로젝트를 '과제'가 아니라 '제품'으로 바라보세요.", true);

  s.addText("빠른 것은 AI의 일입니다.\n좋은 것은 여러분의 일입니다.", {
    x: 1.2,
    y: 2.4,
    w: 7.6,
    h: 1.0,
    fontFace: FONT,
    fontSize: 32,
    bold: true,
    color: C.white,
    align: "center",
    valign: "middle",
    margin: 0
  });

  s.addText("— Chapter 4 인용 요지", {
    x: 0.6,
    y: 4.9,
    w: 8.8,
    h: 0.25,
    fontFace: FONT,
    fontSize: 12,
    color: "BFD2EE",
    align: "center",
    margin: 0
  });
}

const outputPath = "/Users/sanguinekim/Documents/3_Code/Vibe/Project/260220_theartofcollaboration/협업의_기술_The_Art_of_Collaboration.pptx";

pptx.writeFile({ fileName: outputPath }).then(() => {
  console.log(`PPTX 생성 완료: ${outputPath}`);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});