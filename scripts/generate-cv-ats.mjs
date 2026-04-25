import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const content = {
  en: {
    lang: 'en',
    title: 'AI Product & Experience Executive',
    summary: "Product and design leader with over 20 years of experience across the UK, Korea, and Saudi Arabia. Enterprise AI platforms, VR, consumer products — I have built the teams, shipped the products, and run the organizations. Currently building Raymind.AI, an independent product studio where I make and ship my own products.",
    sNow: 'Now', sExp: 'Experience', sEarlier: 'Earlier Experience', sExpertise: 'Core Expertise', sEdu: 'Education', sLang: 'Language',
    raymindDesc: 'An independent product studio building consumer apps, developer tools, and AI engines. mdfy.cc, pastlife.app, jolong.ai, screenstyler.ai, and ddalggak.ai are live, with more in development.',
    humainDesc: "Set up the product and experience organization for Humain OS, Saudi Arabia's national AI project. Defined platform direction, governance, and operating model from scratch.",
    humainH: ['Set the product vision and roadmap across the AI platform','Designed governance and review processes that scaled with the program','Led expansion into wearable, ambient, and voice AI experiences','Introduced AI tools into research, design, and documentation workflows','Defined how product, engineering, and leadership teams worked together'],
    devDesc: 'Led the end-to-end creation of a VR title on the CookieRun IP. Assembled the team, secured the Meta platform partnership, and shipped to Quest Store.',
    devH: ['Built a VR product team inside a company with no prior XR experience','Negotiated and closed a strategic platform partnership with Meta','Led product, engineering, art, and marketing as a single integrated team',"Shipped a title featured in Meta's own platform promotions and retail showcases"],
    kakaoDesc: "Started and ran Kakao's first European office in London. Led the European business for KakaoTalk and Kakao Friends IP.",
    kakaoH: ['Built the London office from scratch — legal entity, team, operations','Closed licensing and retail deals in the UK, France, and other European markets','Partnered with IMG to expand IP reach globally','Represented the company at Brand Licensing Europe and industry events'],
    aramcoDesc: "Created the UX standards used across Aramco's digital systems, ahead of the world's largest IPO (2019). Built VR for industrial training.",
    aramcoH: ['Created UX guidelines applied across all corporate digital services','Built VR applications for industrial safety training','Designed digital services aligned with Saudi national policy changes',"Contributed to modernizing Aramco's digital systems during IPO preparation"],
    akqaDesc: "Led UX for Nike (NRC, NTC), Volvo (global web), Barclays (mortgage), and Virgin Atlantic (booking). Built AI recommendation and personalization systems.",
    razorfishDesc: 'Led UX on multi-market digital programs for financial and consumer brands. Ran UX teams across markets.',
    exp1: {t:'Product & Strategy', d:'AI product strategy, platform development, taking products from zero to launch'},
    exp2: {t:'Experience & Design', d:'Human-AI interaction, VR/AR and wearable experiences, design systems'},
    exp3: {t:'Leadership & Scale', d:'Cross-functional leadership, national-scale digital programs, international expansion'},
    langKo: 'Korean', langKoL: 'Native', langEn: 'English', langEnL: 'Full Professional Proficiency',
  },
  ko: {
    lang: 'ko',
    title: 'AI Product & Experience Executive',
    summary: '영국, 한국, 사우디아라비아에서 20년 넘게 제품과 디자인 조직을 이끌어 왔다. 대기업 AI 플랫폼, VR, 소비자 제품까지 — 팀을 만들고, 제품을 출시하고, 조직을 키워왔다. 현재는 직접 제품을 만들어 출시하는 독립 스튜디오 Raymind.AI를 운영하고 있다.',
    sNow: '현재', sExp: '경력', sEarlier: '이전 경력', sExpertise: '핵심 역량', sEdu: '학력', sLang: '언어',
    raymindDesc: '소비자 앱, 개발자 도구, AI 엔진을 자체 기획·개발·출시하는 독립 프로덕트 스튜디오. mdfy.cc, pastlife.app, jolong.ai, screenstyler.ai, ddalggak.ai가 출시되어 운영 중이며, 추가 제품을 개발하고 있다.',
    humainDesc: '사우디 국가 AI 프로젝트 Humain OS의 제품 조직을 처음부터 만들었다. 플랫폼 방향, 거버넌스, 운영 구조를 직접 설계했다.',
    humainH: ['AI 플랫폼 전체의 제품 비전과 로드맵을 수립','프로그램 확장에 맞춰 동작하는 거버넌스·리뷰 체계를 설계','웨어러블, 음성, 앰비언트 AI 경험으로의 확장을 주도','리서치, 디자인, 문서화에 AI 도구를 도입','제품, 개발, 리더십 팀 간의 협업 방식을 정의'],
    devDesc: '쿠키런 IP 기반 VR 타이틀을 처음부터 만들어 출시했다. 팀을 꾸리고, Meta 파트너십을 따내고, Quest Store에 올렸다.',
    devH: ['XR 경험이 없던 회사에서 VR 제품 팀을 만들었다','Meta와의 전략적 플랫폼 파트너십을 체결하고 Quest Store에 출시','프로덕트, 엔지니어링, 아트, 마케팅을 하나의 팀으로 통합 운영','Meta 플랫폼 공식 프로모션 및 리테일 쇼케이스에 선정'],
    kakaoDesc: '카카오의 첫 유럽 법인을 런던에 세우고 운영했다. 카카오톡과 카카오프렌즈의 유럽 사업을 맡았다.',
    kakaoH: ['런던 법인을 처음부터 구축 — 법인 설립, 팀 구성, 운영 체계','영국, 프랑스 등 주요 시장에서 라이선싱·리테일 계약 체결','IMG와 제휴해 IP의 글로벌 입지를 넓혔다','Brand Licensing Europe 등 산업 행사에서 회사 대표'],
    aramcoDesc: '세계 최대 IPO(2019)를 앞두고 아람코 전사 디지털 시스템의 UX 기준을 만들었다. 산업 교육용 VR도 만들었다.',
    aramcoH: ['전사 디지털 서비스에 적용할 UX 가이드라인을 만들었다','산업 안전 교육용 VR 콘텐츠를 제작했다','사우디 정책 변화에 맞춘 디지털 서비스를 설계했다','IPO 준비 과정에서 디지털 시스템 현대화에 기여했다'],
    akqaDesc: 'Nike(NRC, NTC), Volvo(글로벌 웹), Barclays(모기지), Virgin Atlantic(예약)의 UX를 맡았다. AI 추천과 개인화 시스템도 만들었다.',
    razorfishDesc: '금융·소비재 글로벌 브랜드의 여러 시장에 걸친 디지털 프로젝트에서 UX를 이끌었다. 여러 시장의 UX 팀을 운영했다.',
    exp1: {t:'제품 & 전략', d:'AI 제품 전략, 플랫폼 개발, 제품을 처음부터 출시까지'},
    exp2: {t:'경험 & 디자인', d:'사람과 AI의 상호작용, VR/AR·웨어러블 경험, 디자인 시스템'},
    exp3: {t:'리더십 & 확장', d:'부서 간 리더십, 국가 단위 디지털 프로그램, 해외 시장 진출'},
    langKo: '한국어', langKoL: '모국어', langEn: '영어', langEnL: 'Full Professional Proficiency',
  },
};

function hl(arr) { return arr.map(h => `<li>${h}</li>`).join('\n        '); }

function buildHtml(c) {
  return `<!DOCTYPE html>
<html lang="${c.lang}"
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: #fff; -webkit-print-color-adjust: exact; }
  body { font-family: 'Inter', -apple-system, Helvetica Neue, sans-serif; font-size: 9pt; color: #1a1a1a; line-height: 1.5; padding: 48px 56px; text-wrap: pretty; }
  a { color: #1a1a1a; text-decoration: none; }

  h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.03em; margin-bottom: 6px; color: #000; }
  .contact { font-size: 8.5pt; font-weight: 400; color: #555; margin-bottom: 6px; }
  .title { font-size: 9pt; font-weight: 600; color: #1a4a7a; margin-bottom: 18px; }
  .summary { font-size: 9pt; font-weight: 400; color: #222; line-height: 1.6; margin-bottom: 22px; max-width: 520px; }

  .section { margin-bottom: 24px; }
  .section-title { font-size: 8pt; font-weight: 700; text-transform: uppercase; color: #1a4a7a; border-bottom: 1.5px solid #ccc; padding-bottom: 5px; margin-bottom: 14px; }

  .role { display: grid; grid-template-columns: 130px 1fr; gap: 16px; margin-bottom: 14px; page-break-inside: avoid; }
  .role-meta { font-size: 8pt; font-weight: 400; color: #777; line-height: 1.5; padding-top: 2px; }
  .role-date { font-weight: 400; color: #555; }
  .role h3 { font-size: 11.5pt; font-weight: 700; margin-bottom: 1px; color: #000; }
  .role-title { font-size: 8.5pt; font-weight: 600; color: #1a4a7a; margin-bottom: 6px; }
  .role-desc { font-size: 8.5pt; font-weight: 400; color: #222; line-height: 1.6; margin-bottom: 6px; text-wrap: pretty; }

  ul.highlights { list-style: none; padding: 0; margin-top: 2px; }
  ul.highlights li { font-size: 8pt; font-weight: 400; color: #333; line-height: 1.6; padding-left: 12px; position: relative; }
  ul.highlights li::before { content: '•'; position: absolute; left: 0; color: #999; }

  .earlier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 32px; }
  .earlier-role { padding: 4px 0; }
  .earlier-name { font-size: 9pt; font-weight: 700; color: #111; }
  .earlier-meta { font-size: 8pt; font-weight: 400; color: #555; }

  .expertise-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
  .expertise-area h3 { font-size: 9pt; font-weight: 700; margin-bottom: 4px; color: #111; }
  .expertise-area p { font-size: 8pt; font-weight: 400; color: #444; line-height: 1.55; }

  .edu-item { margin-bottom: 10px; }
  .edu-school { font-size: 9pt; font-weight: 700; color: #111; }
  .edu-degree { font-size: 8pt; font-weight: 400; color: #444; }

  .lang-grid { display: flex; gap: 48px; }
  .lang-name { font-size: 9pt; font-weight: 700; color: #111; margin-bottom: 1px; }
  .lang-level { font-size: 8pt; font-weight: 400; color: #444; }

  .page-break-before { page-break-before: always; padding-top: 56px; }

  /* Korean: bump weights + word-break */
  html[lang="ko"] body { font-family: 'Pretendard', -apple-system, sans-serif; font-weight: 500; word-break: keep-all; overflow-wrap: break-word; }
  html[lang="ko"] .summary { font-weight: 500; }
  html[lang="ko"] .role-desc { font-weight: 500; }
  html[lang="ko"] ul.highlights li { font-weight: 500; }
  html[lang="ko"] .earlier-meta { font-weight: 500; }
  html[lang="ko"] .expertise-area p { font-weight: 500; }
  html[lang="ko"] .edu-degree { font-weight: 500; }
  html[lang="ko"] .lang-level { font-weight: 500; }
  html[lang="ko"] .contact { font-weight: 500; }
  html[lang="ko"] .role-meta { font-weight: 500; }
  html[lang="ko"] .title { font-weight: 700; }
  html[lang="ko"] .section-title { font-weight: 800; }
  html[lang="ko"] .role-title { font-weight: 700; }
</style>
</head>
<body>

<h1>Hyunsang Cho</h1>
<div class="contact">hi@raymind.ai &nbsp;&nbsp; raymind.ai &nbsp;&nbsp; hyunsangcho.com</div>
<div class="title">${c.title}</div>
<p class="summary">${c.summary}</p>

<div class="section">
  <div class="section-title">${c.sNow}</div>
  <div class="role">
    <div class="role-meta"><div class="role-date">2025 — Present</div><div>Seoul</div></div>
    <div>
      <h3>Raymind.AI</h3>
      <div class="role-title">Founder</div>
      <p class="role-desc">${c.raymindDesc}</p>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">${c.sExp}</div>
  <div class="role">
    <div class="role-meta"><div class="role-date">Apr 2025 — Apr 2026</div><div>Riyadh, KSA</div></div>
    <div>
      <h3>Humain</h3>
      <div class="role-title">AI Product & Experience Lead</div>
      <p class="role-desc">${c.humainDesc}</p>
      <ul class="highlights">${hl(c.humainH)}</ul>
    </div>
  </div>
  <div class="role">
    <div class="role-meta"><div class="role-date">Sep 2021 — Aug 2024</div><div>Seoul, Korea</div></div>
    <div>
      <h3>Devsisters</h3>
      <div class="role-title">Group Director</div>
      <p class="role-desc">${c.devDesc}</p>
      <ul class="highlights">${hl(c.devH)}</ul>
    </div>
  </div>
  <div class="role">
    <div class="role-meta"><div class="role-date">Oct 2018 — Apr 2021</div><div>London, UK</div></div>
    <div>
      <h3>Kakao IX UK</h3>
      <div class="role-title">Regional Director</div>
      <p class="role-desc">${c.kakaoDesc}</p>
      <ul class="highlights">${hl(c.kakaoH)}</ul>
    </div>
  </div>
  <div class="role page-break-before">
    <div class="role-meta"><div class="role-date">Apr 2017 — Oct 2018</div><div>Dhahran, KSA</div></div>
    <div>
      <h3>Saudi Aramco</h3>
      <div class="role-title">UX Lead</div>
      <p class="role-desc">${c.aramcoDesc}</p>
      <ul class="highlights">${hl(c.aramcoH)}</ul>
    </div>
  </div>
  <div class="role">
    <div class="role-meta"><div class="role-date">Jun 2015 — Feb 2017</div><div>London, UK</div></div>
    <div>
      <h3>AKQA</h3>
      <div class="role-title">Senior UX Architect</div>
      <p class="role-desc">${c.akqaDesc}</p>
    </div>
  </div>
  <div class="role">
    <div class="role-meta"><div class="role-date">Sep 2013 — Jun 2015</div><div>London, UK</div></div>
    <div>
      <h3>Razorfish</h3>
      <div class="role-title">Senior UX Architect</div>
      <p class="role-desc">${c.razorfishDesc}</p>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">${c.sEarlier}</div>
  <div class="earlier-grid">
    <div class="earlier-role"><div class="earlier-name">Cheil UK</div><div class="earlier-meta">Senior Interaction Designer, Dec 2012 — Aug 2013, London</div></div>
    <div class="earlier-role"><div class="earlier-name">Native Design</div><div class="earlier-meta">Senior Interaction Designer, Apr 2012 — Nov 2012, London</div></div>
    <div class="earlier-role"><div class="earlier-name">EY-Seren</div><div class="earlier-meta">Design Consultant, Feb 2010 — Mar 2012, London</div></div>
    <div class="earlier-role"><div class="earlier-name">Vinyl</div><div class="earlier-meta">Interaction Designer, Oct 2005 — May 2006, Seoul</div></div>
    <div class="earlier-role"><div class="earlier-name">D'strict</div><div class="earlier-meta">Interaction Designer, Apr 2004 — Sep 2005, Seoul</div></div>
    <div class="earlier-role"><div class="earlier-name">NHN Corp.</div><div class="earlier-meta">Junior Designer, Oct 2002 — Apr 2004, Seoul</div></div>
  </div>
</div>

<div class="section">
  <div class="section-title">${c.sExpertise}</div>
  <div class="expertise-grid">
    <div class="expertise-area"><h3>${c.exp1.t}</h3><p>${c.exp1.d}</p></div>
    <div class="expertise-area"><h3>${c.exp2.t}</h3><p>${c.exp2.d}</p></div>
    <div class="expertise-area"><h3>${c.exp3.t}</h3><p>${c.exp3.d}</p></div>
  </div>
</div>

<div class="section">
  <div class="section-title">${c.sEdu}</div>
  <div class="edu-item"><div class="edu-school">Goldsmiths, University of London, UK</div><div class="edu-degree">MFA Computational Studio Arts — Pass with Merit, 2009 — 2011</div></div>
  <div class="edu-item"><div class="edu-school">Central Saint Martins, University of the Arts London, UK</div><div class="edu-degree">BA Hons Graphic Design, Interaction Design — 1st Class Honours, 2007 — 2009</div></div>
  <div class="edu-item"><div class="edu-school">Hongik University, South Korea</div><div class="edu-degree">Visual Arts (incomplete), 2001 — 2002</div></div>
</div>

<div class="section">
  <div class="section-title">${c.sLang}</div>
  <div class="lang-grid">
    <div><div class="lang-name">${c.langKo}</div><div class="lang-level">${c.langKoL}</div></div>
    <div><div class="lang-name">${c.langEn}</div><div class="lang-level">${c.langEnL}</div></div>
  </div>
</div>

</body>
</html>`;
}

const variants = [
  { name: 'ats-en', content: content.en, file: 'HyunsangCho_CV_En.pdf' },
  { name: 'ats-ko', content: content.ko, file: 'HyunsangCho_CV_Ko.pdf' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  for (const v of variants) {
    const page = await browser.newPage();
    await page.setContent(buildHtml(v.content), { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 2000));
    const out = resolve(__dirname, '../public', v.file);
    await page.pdf({ path: out, format: 'A4', margin: { top: '0', bottom: '0', left: '0', right: '0' }, printBackground: true });
    await page.close();
    console.log(`${v.name}: ${out}`);
  }
  await browser.close();
})();
