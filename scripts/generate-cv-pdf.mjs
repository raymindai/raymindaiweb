import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const colors = {
  dark: {
    bg: '#0b0c10', text: '#D5D8E0', accent: '#7B9FD4',
    dim: 'rgba(213,216,224,0.7)', muted: 'rgba(213,216,224,0.5)',
    subtle: 'rgba(213,216,224,0.35)', faint: 'rgba(213,216,224,0.25)',
    border: 'rgba(213,216,224,0.08)', highlight: 'rgba(213,216,224,0.55)',
    signalBg: 'rgba(123,159,212,0.06)', link: '#D5D8E0',
    contactColor: 'rgba(213,216,224,0.5)', quoteBorder: 'rgba(213,216,224,0.12)',
    langBorder: 'rgba(213,216,224,0.08)',
  },
  light: {
    bg: '#ffffff', text: '#0a0a0a', accent: '#1a4268',
    dim: '#222222', muted: '#333333',
    subtle: '#444444', faint: '#888888',
    border: 'rgba(0,0,0,0.2)', highlight: '#2a2a2a',
    signalBg: 'rgba(26,66,104,0.05)', link: '#0a0a0a',
    contactColor: '#444444', quoteBorder: 'rgba(0,0,0,0.22)',
    langBorder: 'rgba(0,0,0,0.18)',
    weightBoost: true,
  },
};

const content = {
  en: {
    heroQuote: 'AI-first product and experience executive with 20+ years of international leadership across the UK, Korea, and Saudi Arabia. Built and scaled design and product organizations for enterprise AI platforms, spatial computing initiatives, and global digital ecosystems. Specialized in operationalizing AI across product strategy, multimodal experience design, and cross-functional workflows.',
    signalLabel: 'Why this matters now',
    signalText: "Every company is about to become an AI company. Most don't have anyone who's actually shipped AI products, built the teams, defined the governance, and operated at national scale. I've done all four — across three countries, in both enterprise and consumer, and I'm still building.",
    sectionExp: 'Experience',
    sectionEarlier: 'Earlier Experience',
    sectionExpertise: 'Core Expertise',
    sectionEdu: 'Education',
    raymindDesc: 'Independent AI product studio. Not consulting, not advising. Shipping real products: consumer apps, developer tools, AI engines. Multiple products launched and in market.',
    humainDesc: "Built and scaled the product and experience function for Humain OS — Saudi Arabia's flagship AI initiative. Defined platform vision, enterprise governance, and operating models from scratch.",
    humainHighlights: [
      'Defined platform-level product vision across enterprise AI initiatives',
      'Established governance and review frameworks ensuring scalability and consistency',
      'Shaped multimodal AI expansion including wearable and ambient interaction models',
      'Embedded AI-assisted workflows across research, design, and documentation',
      'Structured cross-functional operating cadence across product, engineering, and leadership',
    ],
    devDesc: 'Led 0-to-1 development of a spatial computing product on CookieRun IP. Built the team, secured the Meta partnership, shipped to Quest Store.',
    devHighlights: [
      'Built spatial computing capability and product pipeline within a non-XR-native organization',
      'Secured strategic platform partnership with Meta, full lifecycle launch to Quest Store',
      'Directed cross-functional teams across product, engineering, art, and marketing',
      'Delivered production-ready immersive experience featured in platform promotions',
    ],
    kakaoDesc: "Established and led Kakao's first European subsidiary from zero. Drove international expansion for KakaoTalk and Kakao Friends IP across Europe.",
    kakaoHighlights: [
      'Built European operational foundation and localization strategy',
      'Launched licensing and retail partnerships across key European markets',
      'Forged strategic alliance with IMG to expand IP footprint internationally',
      'Represented the organization at major global trade events and enterprise negotiations',
    ],
    aramcoDesc: "Defined enterprise UX standards adopted across Aramco's entire digital ecosystem ahead of the world's largest IPO (2019).",
    aramcoHighlights: [
      'Defined enterprise UX standards across corporate digital ecosystem',
      'Delivered immersive VR applications supporting industrial education and communication',
      'Designed digital infrastructure supporting national policy shifts',
      'Contributed to corporate digital modernization during IPO preparation phase',
    ],
    akqaDesc: 'Led strategic UX programs for Nike (NRC, NTC), Volvo (Global Web), Barclays (Mortgage), and Virgin Atlantic (Online Booking). Delivered AI-powered recommendation experiences and data-driven personalization systems.',
    razorfishDesc: 'Led UX delivery across multi-market digital programs for financial and consumer brands. Managed UX teams and cross-functional collaboration at enterprise scale.',
    expertise1: { title: 'Product & Strategy', desc: 'AI-native product strategy, Enterprise AI platform development, Zero-to-one product incubation' },
    expertise2: { title: 'Experience & Design', desc: 'Human-AI & multimodal interaction, Spatial computing & wearable, Design governance & system architecture' },
    expertise3: { title: 'Leadership & Scale', desc: 'Cross-functional executive leadership, National-scale digital transformation, International market expansion' },
    langText: '<strong>Korean</strong> Native &nbsp;&nbsp;&nbsp; <strong>English</strong> Full Professional Proficiency',
  },
  ko: {
    heroQuoteClass: 'hero-quote-ko',
    heroQuote: 'AI 중심의 프로덕트 및 경험 리더. 영국, 한국, 사우디아라비아를 넘나들며 20년 이상 국제적 리더십을 쌓아왔다. 엔터프라이즈 AI 플랫폼, 공간 컴퓨팅, 글로벌 디지털 생태계를 위한 디자인 및 프로덕트 조직을 구축하고 확장했다. 프로덕트 전략, 멀티모달 경험 설계, 조직 간 협업 전반에 AI를 실전 적용하는 데 특화되어 있다.',
    signalLabel: '왜 지금 이것이 중요한가',
    signalText: '모든 기업이 곧 AI 기업이 된다. 하지만 실제로 AI 제품을 출시하고, 팀을 만들고, 거버넌스를 정의하고, 국가 규모로 운영해본 사람은 거의 없다. 나는 세 나라에서, 엔터프라이즈와 소비자 양쪽 모두에서 네 가지를 전부 해봤다. 그리고 지금도 만들고 있다.',
    sectionExp: '경력',
    sectionEarlier: '이전 경력',
    sectionExpertise: '핵심 전문성',
    sectionEdu: '학력',
    raymindDesc: '독립 AI 프로덕트 스튜디오. 컨설팅도, 자문도 아니다. 실제 제품을 출시한다: 소비자 앱, 개발자 도구, AI 엔진. 여러 제품이 이미 시장에 나와 있다.',
    humainDesc: '사우디아라비아 국가 AI 이니셔티브인 Humain OS의 프로덕트 및 경험 조직을 처음부터 구축하고 확장했다. 플랫폼 비전, 엔터프라이즈 거버넌스, 운영 모델을 정의했다.',
    humainHighlights: [
      '엔터프라이즈 AI 전반의 플랫폼 단위 프로덕트 비전 수립',
      '확장성과 일관성을 보장하는 거버넌스 및 리뷰 체계 구축',
      '웨어러블·앰비언트 인터랙션을 포함한 멀티모달 AI 확장 주도',
      '리서치, 디자인, 문서화 전반에 AI 기반 워크플로우 정착',
      '프로덕트, 엔지니어링, 리더십 간 협업 운영 체계 설계',
    ],
    devDesc: '쿠키런 IP 기반 공간 컴퓨팅 제품을 0에서 1까지 주도했다. 팀을 만들고, Meta 파트너십을 확보하고, Quest Store에 출시했다.',
    devHighlights: [
      'XR 경험이 없던 조직에서 공간 컴퓨팅 역량 및 제품 파이프라인 구축',
      'Meta 전략 파트너십 확보, Quest Store 출시까지 전 과정 주도',
      '프로덕트, 엔지니어링, 아트, 마케팅 전 부문 팀 총괄',
      '플랫폼 공식 프로모션에 선정된 몰입형 경험 출시',
    ],
    kakaoDesc: '카카오 최초의 유럽 법인을 처음부터 설립하고 이끌었다. 카카오톡과 카카오프렌즈 IP의 유럽 확장을 추진했다.',
    kakaoHighlights: [
      '유럽 운영 기반 및 현지화 전략 수립',
      '유럽 주요 시장에서 라이선싱 및 리테일 파트너십 체결',
      'IMG와의 전략적 제휴로 IP 글로벌 입지 확장',
      '주요 글로벌 전시회 및 기업 협상 대표',
    ],
    aramcoDesc: '세계 최대 IPO(2019)를 앞두고 아람코 전사 디지털 생태계에 적용된 엔터프라이즈 UX 표준을 정의했다.',
    aramcoHighlights: [
      '전사 디지털 생태계에 적용되는 UX 표준 수립',
      '산업 교육용 몰입형 VR 애플리케이션 구축',
      '국가 정책 전환에 대응하는 디지털 인프라 설계',
      'IPO 준비 과정의 기업 디지털 현대화 기여',
    ],
    akqaDesc: 'Nike(NRC, NTC), Volvo(글로벌 웹), Barclays(모기지), Virgin Atlantic(온라인 예약)의 전략적 UX 프로그램을 주도. AI 기반 추천 경험과 데이터 기반 개인화 시스템을 구현했다.',
    razorfishDesc: '금융 및 소비자 브랜드의 다중 시장 디지털 프로그램에서 UX를 주도. 엔터프라이즈 규모의 UX 팀 운영과 부서 간 협업을 이끌었다.',
    expertise1: { title: '프로덕트 & 전략', desc: 'AI 네이티브 프로덕트 전략, 엔터프라이즈 AI 플랫폼 개발, 0→1 프로덕트 인큐베이션' },
    expertise2: { title: '경험 & 디자인', desc: '인간-AI 및 멀티모달 인터랙션, 공간 컴퓨팅 및 웨어러블, 디자인 거버넌스 및 시스템 설계' },
    expertise3: { title: '리더십 & 확장', desc: '부서 간 경영 리더십, 국가 규모 디지털 전환, 해외 시장 확장' },
    langText: '<strong>한국어</strong> 모국어 &nbsp;&nbsp;&nbsp; <strong>영어</strong> 업무 능통',
  },
};

function highlights(arr) {
  return arr.map(h => `<li>${h}</li>`).join('\n        ');
}

function buildHtml(t, c) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body { background: ${t.bg}; -webkit-print-color-adjust: exact; }

  body {
    font-family: 'Inter', -apple-system, Helvetica Neue, sans-serif;
    font-size: 9.5pt; color: ${t.text}; line-height: 1.5; padding: 52px 64px; font-weight: ${t.weightBoost ? 400 : 300};
  }

  a { color: ${t.link}; text-decoration: none; }

  .header { margin-bottom: 6px; }
  .header h1 { font-family: 'Cormorant Garamond', 'Noto Serif KR', Georgia, serif; font-size: 24pt; font-weight: ${t.weightBoost ? 400 : 300}; letter-spacing: -0.02em; margin-bottom: 2px; color: ${t.text}; }
  .header .title-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
  .header .title { font-size: 9.5pt; font-weight: ${t.weightBoost ? 400 : 300}; color: ${t.accent}; letter-spacing: 0.04em; }
  .header .contact { font-size: 8pt; font-weight: ${t.weightBoost ? 400 : 300}; color: ${t.contactColor}; display: flex; gap: 16px; }
  .header .contact a { color: ${t.contactColor}; }

  .section { margin-bottom: 22px; }
  .section-title { font-size: 7.5pt; font-weight: ${t.weightBoost ? 600 : 500}; letter-spacing: 0.15em; text-transform: uppercase; color: ${t.accent}; border-bottom: 1px solid ${t.border}; padding-bottom: 4px; margin-bottom: 12px; }

  .role { display: grid; grid-template-columns: 115px 1fr; gap: 14px; margin-bottom: 16px; padding-top: 2px; page-break-inside: avoid; }
  .role-meta { font-size: 8pt; color: ${t.subtle}; line-height: 1.5; font-weight: ${t.weightBoost ? 400 : 300}; }
  .role-date { color: ${t.muted}; font-weight: ${t.weightBoost ? 500 : 400}; }
  .role h3 { font-family: 'Cormorant Garamond', 'Noto Serif KR', Georgia, serif; font-size: 12.5pt; font-weight: ${t.weightBoost ? 500 : 400}; margin-bottom: 0; color: ${t.text}; }
  .role-title-text { font-size: 8.5pt; font-weight: ${t.weightBoost ? 500 : 400}; color: ${t.accent}; margin-bottom: 4px; letter-spacing: 0.02em; }
  .role-desc { font-size: 9pt; color: ${t.dim}; line-height: 1.5; margin-bottom: 4px; font-weight: ${t.weightBoost ? 400 : 300}; }

  ul.highlights { list-style: none; padding: 0; }
  ul.highlights li { font-size: 8.5pt; color: ${t.highlight}; line-height: 1.5; padding-left: 10px; position: relative; font-weight: ${t.weightBoost ? 400 : 300}; }
  ul.highlights li::before { content: '·'; position: absolute; left: 0; color: ${t.faint}; }

  .earlier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px 28px; page-break-inside: avoid; }
  .earlier-role { padding: 2px 0; }
  .earlier-name { font-family: 'Cormorant Garamond', 'Noto Serif KR', Georgia, serif; font-size: 10pt; font-weight: ${t.weightBoost ? 500 : 400}; color: ${t.text}; }
  .earlier-title { font-size: 8pt; color: ${t.muted}; font-weight: ${t.weightBoost ? 400 : 300}; }

  .expertise-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; page-break-inside: avoid; }
  .expertise-area h3 { font-family: 'Cormorant Garamond', 'Noto Serif KR', Georgia, serif; font-size: 10pt; font-weight: ${t.weightBoost ? 500 : 400}; margin-bottom: 3px; color: ${t.text}; }
  .expertise-area p { font-size: 8.5pt; color: ${t.highlight}; line-height: 1.5; font-weight: ${t.weightBoost ? 400 : 300}; }

  .edu-item { margin-bottom: 10px; }
  .edu-school { font-family: 'Cormorant Garamond', 'Noto Serif KR', Georgia, serif; font-size: 10pt; font-weight: ${t.weightBoost ? 500 : 400}; color: ${t.text}; }
  .edu-degree { font-size: 8.5pt; color: ${t.highlight}; font-weight: ${t.weightBoost ? 400 : 300}; }

  .signal { background: ${t.signalBg}; padding: 10px 14px; margin-bottom: 18px; border-left: none; }
  .signal-label { font-size: 7pt; font-weight: ${t.weightBoost ? 600 : 500}; letter-spacing: 0.12em; text-transform: uppercase; color: ${t.accent}; margin-bottom: 4px; }
  .signal-text { font-size: 9pt; color: ${t.dim}; line-height: 1.55; font-weight: ${t.weightBoost ? 400 : 300}; }

  .lang-text { font-size: 9.5pt; color: ${t.dim}; font-weight: ${t.weightBoost ? 400 : 300}; }
  .lang-text strong { color: ${t.text}; font-weight: ${t.weightBoost ? 500 : 400}; }

  .page-break-before { page-break-before: always; padding-top: 80px; margin-top: 0; }

  .hero-quote { font-family: 'Cormorant Garamond', 'Noto Serif KR', Georgia, serif; font-size: 13pt; font-weight: ${t.weightBoost ? 400 : 300}; font-style: italic; color: ${t.highlight}; line-height: 1.6; padding: 14px 0; margin-bottom: 8px; border-top: 1px solid ${t.quoteBorder}; border-bottom: none; }
  .hero-quote-ko { font-family: 'Noto Serif KR', Georgia, serif; font-size: 11pt; font-weight: ${t.weightBoost ? 400 : 300}; font-style: italic; color: ${t.highlight}; line-height: 1.75; padding: 14px 0; margin-bottom: 8px; border-top: 1px solid ${t.quoteBorder}; border-bottom: none; word-break: keep-all; }
</style>
</head>
<body>

<div class="header">
  <h1>Hyunsang Cho</h1>
  <div class="title-row">
    <div class="title">AI Product & Experience Executive</div>
    <div class="contact">
      <a href="mailto:hi@raymind.ai">hi@raymind.ai</a>
      <a href="https://raymind.ai">raymind.ai</a>
      <a href="https://hyunsangcho.com">hyunsangcho.com</a>
    </div>
  </div>
</div>

<p class="${c.heroQuoteClass || 'hero-quote'}">${c.heroQuote}</p>

<div class="signal">
  <div class="signal-label">${c.signalLabel}</div>
  <div class="signal-text">${c.signalText}</div>
</div>

<div class="section">
  <div class="section-title">${c.sectionExp}</div>

  <div class="role">
    <div class="role-meta"><div class="role-date">2025 — Present</div><div>Seoul / Remote</div></div>
    <div>
      <h3>Raymind.AI</h3>
      <div class="role-title-text">Founder</div>
      <p class="role-desc">${c.raymindDesc}</p>
    </div>
  </div>

  <div class="role">
    <div class="role-meta"><div class="role-date">Apr 2025 — Present</div><div>Riyadh, KSA</div></div>
    <div>
      <h3>Humain</h3>
      <div class="role-title-text">AI Product & Experience Lead</div>
      <p class="role-desc">${c.humainDesc}</p>
      <ul class="highlights">${highlights(c.humainHighlights)}</ul>
    </div>
  </div>

  <div class="role">
    <div class="role-meta"><div class="role-date">Sep 2021 — Aug 2024</div><div>Seoul, Korea</div></div>
    <div>
      <h3>Devsisters</h3>
      <div class="role-title-text">Group Director</div>
      <p class="role-desc">${c.devDesc}</p>
      <ul class="highlights">${highlights(c.devHighlights)}</ul>
    </div>
  </div>

  <div class="role">
    <div class="role-meta"><div class="role-date">Oct 2018 — Apr 2021</div><div>London, UK</div></div>
    <div>
      <h3>Kakao IX UK</h3>
      <div class="role-title-text">Regional Director</div>
      <p class="role-desc">${c.kakaoDesc}</p>
      <ul class="highlights">${highlights(c.kakaoHighlights)}</ul>
    </div>
  </div>

  <div class="role page-break-before">
    <div class="role-meta"><div class="role-date">Apr 2017 — Oct 2018</div><div>Dhahran, KSA</div></div>
    <div>
      <h3>Saudi Aramco</h3>
      <div class="role-title-text">UX Lead</div>
      <p class="role-desc">${c.aramcoDesc}</p>
      <ul class="highlights">${highlights(c.aramcoHighlights)}</ul>
    </div>
  </div>

  <div class="role">
    <div class="role-meta"><div class="role-date">Jun 2015 — Feb 2017</div><div>London, UK</div></div>
    <div>
      <h3>AKQA</h3>
      <div class="role-title-text">Senior UX Architect</div>
      <p class="role-desc">${c.akqaDesc}</p>
    </div>
  </div>

  <div class="role">
    <div class="role-meta"><div class="role-date">Sep 2013 — Jun 2015</div><div>London, UK</div></div>
    <div>
      <h3>Razorfish</h3>
      <div class="role-title-text">Senior UX Architect</div>
      <p class="role-desc">${c.razorfishDesc}</p>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">${c.sectionEarlier}</div>
  <div class="earlier-grid">
    <div class="earlier-role"><div class="earlier-name">Cheil UK</div><div class="earlier-title">Senior Interaction Designer · Dec 2012 — Aug 2013, London</div></div>
    <div class="earlier-role"><div class="earlier-name">Native Design</div><div class="earlier-title">Senior Interaction Designer · Apr 2012 — Nov 2012, London</div></div>
    <div class="earlier-role"><div class="earlier-name">EY-Seren</div><div class="earlier-title">Design Consultant · Feb 2010 — Mar 2012, London</div></div>
    <div class="earlier-role"><div class="earlier-name">Vinyl</div><div class="earlier-title">Interaction Designer · Oct 2005 — May 2006, Seoul</div></div>
    <div class="earlier-role"><div class="earlier-name">D'strict</div><div class="earlier-title">Interaction Designer · Apr 2004 — Sep 2005, Seoul</div></div>
    <div class="earlier-role"><div class="earlier-name">NHN Corp.</div><div class="earlier-title">Junior Designer · Oct 2002 — Apr 2004, Seoul</div></div>
  </div>
</div>

<div class="section">
  <div class="section-title">${c.sectionExpertise}</div>
  <div class="expertise-grid">
    <div class="expertise-area"><h3>${c.expertise1.title}</h3><p>${c.expertise1.desc}</p></div>
    <div class="expertise-area"><h3>${c.expertise2.title}</h3><p>${c.expertise2.desc}</p></div>
    <div class="expertise-area"><h3>${c.expertise3.title}</h3><p>${c.expertise3.desc}</p></div>
  </div>
</div>

<div class="section">
  <div class="section-title">${c.sectionEdu}</div>
  <div class="edu-item"><div class="edu-school">Goldsmiths, University of London, UK</div><div class="edu-degree">MFA Computational Studio Arts — Pass with Merit · 2009 — 2011</div></div>
  <div class="edu-item"><div class="edu-school">Central Saint Martins, University of the Arts London, UK</div><div class="edu-degree">BA Hons Graphic Design, Interaction Design — 1st Class Honours · 2007 — 2009</div></div>
  <div class="edu-item"><div class="edu-school">Hongik University, South Korea</div><div class="edu-degree">Visual Arts (incomplete) · 2001 — 2002</div></div>
  <div style="margin-top: 16px; padding-top: 10px; border-top: 1px solid ${t.langBorder};"><p class="lang-text">${c.langText}</p></div>
</div>

</body>
</html>`;
}

const variants = [
  { name: 'dark-en',    theme: colors.dark,  content: content.en, file: 'HyunsangCho_CV.pdf' },
  { name: 'light-en',   theme: colors.light, content: content.en, file: 'HyunsangCho_CV_Light.pdf' },
  { name: 'dark-ko',    theme: colors.dark,  content: content.ko, file: 'HyunsangCho_CV_Ko.pdf' },
  { name: 'light-ko',   theme: colors.light, content: content.ko, file: 'HyunsangCho_CV_Light_Ko.pdf' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  for (const v of variants) {
    const page = await browser.newPage();
    await page.setContent(buildHtml(v.theme, v.content), { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 2000));
    const out = resolve(__dirname, '../public', v.file);
    await page.pdf({ path: out, format: 'A4', margin: { top: '0', bottom: '0', left: '0', right: '0' }, printBackground: true });
    await page.close();
    console.log(`${v.name}: ${out}`);
  }

  await browser.close();
})();
