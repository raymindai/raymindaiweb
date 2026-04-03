import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../public/HyunsangCho_CV.pdf');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    background: #0b0c10;
    -webkit-print-color-adjust: exact;
  }

  body {
    font-family: 'Inter', -apple-system, Helvetica Neue, sans-serif;
    font-size: 9.5pt;
    color: #D5D8E0;
    line-height: 1.5;
    padding: 52px 64px;
  }

  a { color: #D5D8E0; text-decoration: none; }

  /* Header */
  .header { margin-bottom: 6px; border-bottom: none; padding-bottom: 0; }
  .header h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 24pt;
    font-weight: 300;
    letter-spacing: -0.02em;
    margin-bottom: 2px;
    color: #D5D8E0;
  }
  .header .title { font-size: 9.5pt; font-weight: 300; color: #7B9FD4; letter-spacing: 0.04em; margin-bottom: 8px; }
  .header .contact { font-size: 8pt; color: rgba(213,216,224,0.5); display: flex; gap: 16px; }
  .header .contact a { color: rgba(213,216,224,0.5); }

  .summary { font-size: 9.5pt; color: rgba(213,216,224,0.7); line-height: 1.55; margin-bottom: 14px; max-width: 580px; font-weight: 300; }

  /* Section */
  .section { margin-bottom: 22px; }
  .section-title {
    font-size: 7.5pt;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #7B9FD4;
    border-bottom: 1px solid rgba(213,216,224,0.08);
    padding-bottom: 4px;
    margin-bottom: 12px;
  }

  /* Role */
  .role { display: grid; grid-template-columns: 115px 1fr; gap: 14px; margin-bottom: 16px; padding-top: 2px; page-break-inside: avoid; page-break-before: auto; }
  .role-meta { font-size: 8pt; color: rgba(213,216,224,0.35); line-height: 1.5; }
  .role-date { color: rgba(213,216,224,0.5); font-weight: 400; }
  .role h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 12.5pt;
    font-weight: 400;
    margin-bottom: 0;
    color: #D5D8E0;
  }
  .role-title-text { font-size: 8.5pt; font-weight: 400; color: #7B9FD4; margin-bottom: 4px; letter-spacing: 0.02em; }
  .role-desc { font-size: 9pt; color: rgba(213,216,224,0.7); line-height: 1.5; margin-bottom: 4px; font-weight: 300; }

  ul.highlights { list-style: none; padding: 0; }
  ul.highlights li {
    font-size: 8.5pt;
    color: rgba(213,216,224,0.55);
    line-height: 1.5;
    padding-left: 10px;
    position: relative;
    font-weight: 300;
  }
  ul.highlights li::before { content: '·'; position: absolute; left: 0; color: rgba(213,216,224,0.25); }

  /* Earlier */
  .earlier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px 28px; page-break-inside: avoid; }
  .earlier-role { padding: 2px 0; }
  .earlier-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 10pt;
    font-weight: 400;
    color: #D5D8E0;
  }
  .earlier-title { font-size: 8pt; color: rgba(213,216,224,0.5); font-weight: 300; }

  /* Expertise */
  .expertise-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; page-break-inside: avoid; }
  .expertise-area h3 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 10pt;
    font-weight: 400;
    margin-bottom: 3px;
    color: #D5D8E0;
  }
  .expertise-area p { font-size: 8.5pt; color: rgba(213,216,224,0.55); line-height: 1.5; font-weight: 300; }

  /* Education */
  .edu-item { margin-bottom: 4px; }
  .edu-school {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 10pt;
    font-weight: 400;
    color: #D5D8E0;
  }
  .edu-degree { font-size: 8.5pt; color: rgba(213,216,224,0.55); font-weight: 300; }

  /* Signal */
  .signal {
    background: rgba(123,159,212,0.06);
    padding: 10px 14px;
    margin-bottom: 18px;
    border-left: 2px solid #7B9FD4;
  }
  .signal-label { font-size: 7pt; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: #7B9FD4; margin-bottom: 4px; }
  .signal-text { font-size: 9pt; color: rgba(213,216,224,0.8); line-height: 1.55; font-weight: 300; }

  /* Languages */
  .lang-text { font-size: 9.5pt; color: rgba(213,216,224,0.7); font-weight: 300; }
  .lang-text strong { color: #D5D8E0; font-weight: 400; }

  /* Page break control */
  .page-break-before { page-break-before: always; padding-top: 52px; }

  /* Hero quote */
  .hero-quote {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 11pt;
    font-weight: 300;
    font-style: italic;
    color: rgba(213,216,224,0.55);
    line-height: 1.6;
    padding: 14px 0;
    margin-bottom: 14px;
    border-top: 1px solid rgba(213,216,224,0.12);
    border-bottom: 1px solid rgba(213,216,224,0.12);
  }
</style>
</head>
<body>

<div class="header">
  <h1>Hyunsang Cho</h1>
  <div class="title">AI Product & Experience Executive</div>
  <div class="contact">
    <a href="mailto:hi@raymind.ai">hi@raymind.ai</a>
    <a href="https://raymind.ai">raymind.ai</a>
    <a href="https://hyunsangcho.com">hyunsangcho.com</a>
  </div>
</div>

<p class="hero-quote">
  AI-first product and experience executive with 20+ years of international leadership across the UK, Korea, and Saudi Arabia. Built and scaled design and product organizations for enterprise AI platforms, spatial computing initiatives, and global digital ecosystems. Specialized in operationalizing AI across product strategy, multimodal experience design, and cross-functional workflows.
</p>

<div class="signal">
  <div class="signal-label">Why this matters now</div>
  <div class="signal-text">
    Every company is about to become an AI company. Most don't have anyone who's actually shipped AI products, built the teams, defined the governance, and operated at national scale. I've done all four — across three countries, in both enterprise and consumer, and I'm still building.
  </div>
</div>

<div class="section">
  <div class="section-title">Current</div>

  <div class="role">
    <div class="role-meta">
      <div class="role-date">2025 — Present</div>
      <div>Seoul / Remote</div>
    </div>
    <div>
      <h3>Raymind.AI</h3>
      <div class="role-title-text">Founder</div>
      <p class="role-desc">Independent AI product studio. Not consulting, not advising. Shipping real products: consumer apps, developer tools, AI engines. Multiple products launched and in market.</p>
    </div>
  </div>

  <div class="role">
    <div class="role-meta">
      <div class="role-date">Apr 2025 — Present</div>
      <div>Riyadh, KSA</div>
    </div>
    <div>
      <h3>Humain</h3>
      <div class="role-title-text">AI Product & Experience Lead</div>
      <p class="role-desc">Built and scaled the product and experience function for Humain OS — Saudi Arabia's flagship AI initiative. Defined platform vision, enterprise governance, and operating models from scratch.</p>
      <ul class="highlights">
        <li>Defined platform-level product vision across enterprise AI initiatives</li>
        <li>Established governance and review frameworks ensuring scalability and consistency</li>
        <li>Shaped multimodal AI expansion including wearable and ambient interaction models</li>
        <li>Embedded AI-assisted workflows across research, design, and documentation</li>
        <li>Structured cross-functional operating cadence across product, engineering, and leadership</li>
      </ul>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">Experience</div>

  <div class="role">
    <div class="role-meta">
      <div class="role-date">Sep 2021 — Aug 2024</div>
      <div>Seoul, Korea</div>
    </div>
    <div>
      <h3>Devsisters</h3>
      <div class="role-title-text">Group Director</div>
      <p class="role-desc">Led 0-to-1 development of a spatial computing product on CookieRun IP. Built the team, secured the Meta partnership, shipped to Quest Store.</p>
      <ul class="highlights">
        <li>Built spatial computing capability and product pipeline within a non-XR-native organization</li>
        <li>Secured strategic platform partnership with Meta, full lifecycle launch to Quest Store</li>
        <li>Directed cross-functional teams across product, engineering, art, and marketing</li>
        <li>Delivered production-ready immersive experience featured in platform promotions</li>
      </ul>
    </div>
  </div>

  <div class="role">
    <div class="role-meta">
      <div class="role-date">Oct 2018 — Apr 2021</div>
      <div>London, UK</div>
    </div>
    <div>
      <h3>Kakao IX UK</h3>
      <div class="role-title-text">Regional Director</div>
      <p class="role-desc">Established and led Kakao's first European subsidiary from zero. Drove international expansion for KakaoTalk and Kakao Friends IP across Europe.</p>
      <ul class="highlights">
        <li>Built European operational foundation and localization strategy</li>
        <li>Launched licensing and retail partnerships across key European markets</li>
        <li>Forged strategic alliance with IMG to expand IP footprint internationally</li>
        <li>Represented the organization at major global trade events and enterprise negotiations</li>
      </ul>
    </div>
  </div>

  <div class="role page-break-before">
    <div class="role-meta">
      <div class="role-date">Apr 2017 — Oct 2018</div>
      <div>Dhahran, KSA</div>
    </div>
    <div>
      <h3>Saudi Aramco</h3>
      <div class="role-title-text">UX Lead</div>
      <p class="role-desc">Defined enterprise UX standards adopted across Aramco's entire digital ecosystem ahead of the world's largest IPO (2019).</p>
      <ul class="highlights">
        <li>Defined enterprise UX standards across corporate digital ecosystem</li>
        <li>Delivered immersive VR applications supporting industrial education and communication</li>
        <li>Designed digital infrastructure supporting national policy shifts</li>
        <li>Contributed to corporate digital modernization during IPO preparation phase</li>
      </ul>
    </div>
  </div>

  <div class="role">
    <div class="role-meta">
      <div class="role-date">Jun 2015 — Feb 2017</div>
      <div>London, UK</div>
    </div>
    <div>
      <h3>AKQA</h3>
      <div class="role-title-text">Senior UX Architect</div>
      <p class="role-desc">Led strategic UX programs for Nike (NRC, NTC), Volvo (Global Web), Barclays (Mortgage), and Virgin Atlantic (Online Booking). Delivered AI-powered recommendation experiences and data-driven personalization systems.</p>
    </div>
  </div>

  <div class="role">
    <div class="role-meta">
      <div class="role-date">Sep 2013 — Jun 2015</div>
      <div>London, UK</div>
    </div>
    <div>
      <h3>Razorfish</h3>
      <div class="role-title-text">Senior UX Architect</div>
      <p class="role-desc">Led UX delivery across multi-market digital programs for financial and consumer brands. Managed UX teams and cross-functional collaboration at enterprise scale.</p>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">Earlier Experience</div>
  <div class="earlier-grid">
    <div class="earlier-role">
      <div class="earlier-name">Cheil UK</div>
      <div class="earlier-title">Senior Interaction Designer · Dec 2012 — Aug 2013, London</div>
    </div>
    <div class="earlier-role">
      <div class="earlier-name">Native Design</div>
      <div class="earlier-title">Senior Interaction Designer · Apr 2012 — Nov 2012, London</div>
    </div>
    <div class="earlier-role">
      <div class="earlier-name">EY-Seren</div>
      <div class="earlier-title">Design Consultant · Feb 2010 — Mar 2012, London</div>
    </div>
    <div class="earlier-role">
      <div class="earlier-name">Vinyl</div>
      <div class="earlier-title">Interaction Designer · Oct 2005 — May 2006, Seoul</div>
    </div>
    <div class="earlier-role">
      <div class="earlier-name">D'strict</div>
      <div class="earlier-title">Interaction Designer · Apr 2004 — Sep 2005, Seoul</div>
    </div>
    <div class="earlier-role">
      <div class="earlier-name">NHN Corp.</div>
      <div class="earlier-title">Junior Designer · Oct 2002 — Apr 2004, Seoul</div>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">Core Expertise</div>
  <div class="expertise-grid">
    <div class="expertise-area">
      <h3>Product & Strategy</h3>
      <p>AI-native product strategy, Enterprise AI platform development, Zero-to-one product incubation</p>
    </div>
    <div class="expertise-area">
      <h3>Experience & Design</h3>
      <p>Human-AI & multimodal interaction, Spatial computing & wearable, Design governance & system architecture</p>
    </div>
    <div class="expertise-area">
      <h3>Leadership & Scale</h3>
      <p>Cross-functional executive leadership, National-scale digital transformation, International market expansion</p>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-title">Education</div>
  <div class="edu-item">
    <div class="edu-school">Goldsmiths, University of London, UK</div>
    <div class="edu-degree">MFA Computational Studio Arts — Pass with Merit · 2009 — 2011</div>
  </div>
  <div class="edu-item">
    <div class="edu-school">Central Saint Martins, University of the Arts London, UK</div>
    <div class="edu-degree">BA Hons Graphic Design, Interaction Design — 1st Class Honours · 2007 — 2009</div>
  </div>
  <div class="edu-item">
    <div class="edu-school">Hongik University, South Korea</div>
    <div class="edu-degree">Visual Arts (incomplete) · 2001 — 2002</div>
  </div>
  <div style="margin-top: 16px; padding-top: 10px; border-top: 1px solid rgba(213,216,224,0.08);">
    <p class="lang-text"><strong>Korean</strong> Native &nbsp;&nbsp;&nbsp; <strong>English</strong> Full Professional Proficiency</p>
  </div>
</div>

</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
    printBackground: true,
  });
  await browser.close();
  console.log(`PDF generated: ${outputPath}`);
})();
