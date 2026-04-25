import { useKorean } from "../hooks/useKorean";
import styles from "./CV.module.css";

export default function CV() {
  const { show } = useKorean();

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.name}>Hyunsang Cho</h1>
        <div className={styles.links}>
          <a href="mailto:hi@raymind.ai">hi@raymind.ai</a>
          <a href="https://raymind.ai">raymind.ai</a>
          <a href="https://hyunsangcho.com" target="_blank" rel="noopener noreferrer">hyunsangcho.com</a>
          <a href={show ? "/HyunsangCho_CV_Ko.pdf" : "/HyunsangCho_CV_En.pdf"} target="_blank" rel="noopener noreferrer" className={styles.downloadLink}>
            {show ? "PDF 다운로드" : "Download PDF"}
          </a>
        </div>
        <p className={styles.title}>AI Product & Experience Executive</p>
        <div className={styles.summary}>
          <p>
            I don't just design for AI — I build with it, ship with it, and run a company on it. 20+ years of product leadership across London, Seoul, and Riyadh. Enterprise AI platforms, spatial computing, consumer products, and everything in between.
          </p>
          <p>
            Every company is about to become an AI company. Most don't have anyone who's actually shipped AI products, built the teams, defined the governance, and operated at national scale. I've done all four — across three countries, in both enterprise and consumer, and I'm still building.
          </p>
          {show && (
            <p className={styles.summaryKo}>
              AI에 대해 말하는 사람이 아니라, AI로 직접 만들고 출시하는 사람이다. 런던, 서울, 리야드에서 20년 넘게 제품을 만들어 왔다. 대기업 AI 플랫폼부터 공간 컴퓨팅, 소비자 제품까지. 모든 회사가 곧 AI 회사가 된다. 그런데 AI 제품을 실제로 출시해 보고, 팀을 꾸리고, 운영 체계를 세우고, 국가 단위로 돌려본 사람은 거의 없다. 나는 세 나라에서 그 네 가지를 다 해봤고, 지금도 계속 만들고 있다.
            </p>
          )}
        </div>
      </header>

      {/* Now */}
      <section className={styles.now}>
        <h2 className={styles.sectionTitle}>Now</h2>
        <p className={styles.nowText}>
          Founder of <strong>Raymind.AI</strong> — an independent AI product studio shipping consumer apps, developer tools, and AI engines. Products in market include mdfy.cc, pastlife.app, jolong.ai, and screenstyler.ai.
        </p>
        {show && (
          <p className={styles.nowTextKo}>
            Raymind.AI를 만들어서 운영하고 있다. 소비자 앱, 개발자 도구, AI 엔진을 직접 만들어 출시하는 독립 스튜디오다. mdfy.cc, pastlife.app, jolong.ai, screenstyler.ai 등이 이미 시장에 나와 있다.
          </p>
        )}
      </section>

      {/* Experience */}
      <section className={styles.experience}>
        <h2 className={styles.sectionTitle}>Experience</h2>

        <div className={styles.role}>
          <div className={styles.roleMeta}>
            <div className={styles.roleDate}>Apr 2025 — Apr 2026</div>
            <div className={styles.roleLocation}>Riyadh, KSA</div>
          </div>
          <div className={styles.roleBody}>
            <h3><a href="https://humain.ai" target="_blank" rel="noopener noreferrer">Humain</a></h3>
            <p className={styles.roleTitle}>AI Product & Experience Lead</p>
            <p className={styles.roleDesc}>
              Built and scaled the product and experience function for Humain OS — Saudi Arabia's flagship AI initiative. Defined platform vision, enterprise governance, and operating models from scratch.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                사우디 국가 AI 프로젝트 Humain OS의 제품과 경험 조직을 처음부터 만들었다. 플랫폼 비전, 운영 체계, 거버넌스를 직접 설계했다.
              </p>
            )}
            <ul className={styles.highlights}>
              <li>Defined platform-level product vision across enterprise AI initiatives</li>
              <li>Established governance and review frameworks ensuring scalability and consistency</li>
              <li>Shaped multimodal AI expansion including wearable and ambient interaction models</li>
              <li>Embedded AI-assisted workflows across research, design, and documentation</li>
            </ul>
          </div>
        </div>

        <div className={styles.role}>
          <div className={styles.roleMeta}>
            <div className={styles.roleDate}>Sep 2021 — Aug 2024</div>
            <div className={styles.roleLocation}>Seoul, Korea</div>
          </div>
          <div className={styles.roleBody}>
            <h3><a href="https://devsisters.com" target="_blank" rel="noopener noreferrer">Devsisters</a></h3>
            <p className={styles.roleTitle}>Group Director</p>
            <p className={styles.roleDesc}>
              Led 0-to-1 development of a spatial computing product on CookieRun IP. Built the team, secured the Meta partnership, shipped to Quest Store.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                쿠키런 IP로 공간 컴퓨팅 제품을 처음부터 끝까지 만들었다. 팀을 꾸리고, Meta와 파트너십을 맺고, Quest Store에 출시했다.
              </p>
            )}
            <ul className={styles.highlights}>
              <li>Built spatial computing capability and product pipeline within a non-XR-native organization</li>
              <li>Secured strategic platform partnership with Meta, full lifecycle launch to Quest Store</li>
              <li>Directed cross-functional teams across product, engineering, art, and marketing</li>
            </ul>
          </div>
        </div>

        <div className={styles.role}>
          <div className={styles.roleMeta}>
            <div className={styles.roleDate}>Oct 2018 — Apr 2021</div>
            <div className={styles.roleLocation}>London, UK</div>
          </div>
          <div className={styles.roleBody}>
            <h3><a href="https://kakaocorp.com" target="_blank" rel="noopener noreferrer">Kakao IX UK</a></h3>
            <p className={styles.roleTitle}>Regional Director</p>
            <p className={styles.roleDesc}>
              Established and led Kakao's first European subsidiary from zero. Drove international expansion for KakaoTalk and Kakao Friends IP across Europe.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                카카오의 첫 유럽 법인을 직접 세우고 이끌었다. 카카오톡과 카카오프렌즈의 유럽 진출을 총괄했다. IMG와 손잡고 IP의 글로벌 입지를 넓혔다.
              </p>
            )}
            <ul className={styles.highlights}>
              <li>Built European operational foundation and localization strategy</li>
              <li>Forged strategic alliance with IMG to expand IP footprint internationally</li>
              <li>Represented the organization at major global trade events and enterprise negotiations</li>
            </ul>
          </div>
        </div>

        <div className={styles.role}>
          <div className={styles.roleMeta}>
            <div className={styles.roleDate}>Apr 2017 — Oct 2018</div>
            <div className={styles.roleLocation}>Dhahran, KSA</div>
          </div>
          <div className={styles.roleBody}>
            <h3><a href="https://aramco.com" target="_blank" rel="noopener noreferrer">Saudi Aramco</a></h3>
            <p className={styles.roleTitle}>UX Lead</p>
            <p className={styles.roleDesc}>
              Defined enterprise UX standards adopted across Aramco's entire digital ecosystem — ahead of the world's largest IPO (2019). Built immersive VR for industrial education.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                세계 최대 IPO(2019)를 앞두고 아람코 전체 디지털 시스템에 적용할 UX 표준을 만들었다. 산업 교육용 VR도 구축했다.
              </p>
            )}
          </div>
        </div>

        <div className={styles.role}>
          <div className={styles.roleMeta}>
            <div className={styles.roleDate}>Jun 2015 — Feb 2017</div>
            <div className={styles.roleLocation}>London, UK</div>
          </div>
          <div className={styles.roleBody}>
            <h3><a href="https://akqa.com" target="_blank" rel="noopener noreferrer">AKQA</a></h3>
            <p className={styles.roleTitle}>Senior UX Architect</p>
            <p className={styles.roleDesc}>
              Led strategic UX programs for Nike, Volvo, Barclays, and Virgin Atlantic. Delivered AI-powered recommendation and data-driven personalization systems.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                Nike, Volvo, Barclays, Virgin Atlantic 등의 UX를 이끌었다. AI 추천 시스템과 데이터 기반 개인화 경험을 만들었다.
              </p>
            )}
          </div>
        </div>

        <div className={styles.role}>
          <div className={styles.roleMeta}>
            <div className={styles.roleDate}>Sep 2013 — Jun 2015</div>
            <div className={styles.roleLocation}>London, UK</div>
          </div>
          <div className={styles.roleBody}>
            <h3><a href="https://razorfish.com" target="_blank" rel="noopener noreferrer">Razorfish</a></h3>
            <p className={styles.roleTitle}>Senior UX Architect</p>
            <p className={styles.roleDesc}>
              Led UX delivery across multi-market digital programs for financial and consumer brands at enterprise scale.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                금융·소비재 브랜드의 여러 시장에 걸친 디지털 프로젝트에서 UX를 이끌었다.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Earlier */}
      <section className={styles.earlier}>
        <h2 className={styles.sectionTitle}>Earlier</h2>
        <div className={styles.earlierGrid}>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>Cheil UK</p>
            <p className={styles.earlierMeta}>Senior Interaction Designer, 2012 — 2013</p>
          </div>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>Native Design</p>
            <p className={styles.earlierMeta}>Senior Interaction Designer, 2012</p>
          </div>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>EY-Seren</p>
            <p className={styles.earlierMeta}>Design Consultant, 2010 — 2012</p>
          </div>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>Vinyl</p>
            <p className={styles.earlierMeta}>Interaction Designer, 2005 — 2006</p>
          </div>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>D'strict</p>
            <p className={styles.earlierMeta}>Interaction Designer, 2004 — 2005</p>
          </div>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>NHN Corp.</p>
            <p className={styles.earlierMeta}>Junior Designer, 2002 — 2004</p>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className={styles.expertise}>
        <h2 className={styles.sectionTitle}>Core Expertise</h2>
        <div className={styles.expertiseGrid}>
          <div className={styles.expertiseArea}>
            <h3>Product & Strategy</h3>
            <p>AI-native product strategy, enterprise AI platform development, zero-to-one product incubation</p>
            {show && <p className={styles.expertiseAreaKo}>AI 중심 제품 전략, 대규모 AI 플랫폼 개발, 0→1 제품 인큐베이션</p>}
          </div>
          <div className={styles.expertiseArea}>
            <h3>Experience & Design</h3>
            <p>Human-AI & multimodal interaction, spatial computing & wearable, design governance & system architecture</p>
            {show && <p className={styles.expertiseAreaKo}>사람과 AI의 상호작용 설계, 공간 컴퓨팅·웨어러블, 디자인 체계 및 시스템 설계</p>}
          </div>
          <div className={styles.expertiseArea}>
            <h3>Leadership & Scale</h3>
            <p>Cross-functional executive leadership, national-scale digital transformation, international market expansion</p>
            {show && <p className={styles.expertiseAreaKo}>부서를 넘나드는 경영 리더십, 국가 단위 디지털 전환, 해외 시장 개척</p>}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className={styles.education}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.eduItem}>
          <p className={styles.eduSchool}>Goldsmiths, University of London</p>
          <p className={styles.eduDegree}>MFA Computational Studio Arts — Pass with Merit, 2009 — 2011</p>
        </div>
        <div className={styles.eduItem}>
          <p className={styles.eduSchool}>Central Saint Martins, UAL</p>
          <p className={styles.eduDegree}>BA Hons Graphic Design, Interaction Design — 1st Class Honours, 2007 — 2009</p>
        </div>
        <div className={styles.eduItem}>
          <p className={styles.eduSchool}>Hongik University</p>
          <p className={styles.eduDegree}>Visual Arts (incomplete), 2001 — 2002</p>
        </div>
      </section>

      {/* Language */}
      <section className={styles.language}>
        <h2 className={styles.sectionTitle}>Language</h2>
        <div className={styles.langGrid}>
          <div>
            <p className={styles.langName}>Korean</p>
            <p className={styles.langLevel}>Native</p>
          </div>
          <div>
            <p className={styles.langName}>English</p>
            <p className={styles.langLevel}>Full Professional Proficiency</p>
          </div>
        </div>
      </section>
    </div>
  );
}
