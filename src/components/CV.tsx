import { useKorean } from "../hooks/useKorean";
import styles from "./CV.module.css";

export default function CV() {
  const { show } = useKorean();

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.name}>Hyunsang Cho</h1>
        <p className={styles.title}>AI Product & Experience Executive</p>
        <p className={styles.summary}>
          I don't just design for AI — I build with it, ship with it, and run a company on it. 20+ years of product leadership across London, Seoul, and Riyadh. Enterprise AI platforms, spatial computing, consumer products, and everything in between. Now building Raymind.AI — where AI isn't the feature, it's the method.
        </p>
        {show && (
          <p className={styles.summaryKo}>
            AI를 위해 디자인하는 것이 아니라, AI로 직접 만들고, 출시하고, 회사를 운영한다. 런던, 서울, 리야드를 넘나들며 20년 이상 프로덕트 리더십을 쌓아왔다. 엔터프라이즈 AI 플랫폼, 공간 컴퓨팅, 소비자 제품, 그 사이의 모든 것. 지금은 Raymind.AI를 운영한다 — AI가 기능이 아니라, 방법 그 자체인 곳.
          </p>
        )}
        <div className={styles.links}>
          <a href="mailto:hi@raymind.ai">hi@raymind.ai</a>
          <a href="https://raymind.ai">raymind.ai</a>
          <a href="https://hyunsangcho.com" target="_blank" rel="noopener noreferrer">hyunsangcho.com</a>
        </div>
      </header>

      {/* Signal */}
      <div className={styles.signal}>
        <p className={styles.signalLabel}>Why this matters now</p>
        <p className={styles.signalText}>
          Every company is about to become an AI company. Most don't have anyone who's actually shipped AI products, built the teams, defined the governance, and operated at national scale. I've done all four — across three countries, in both enterprise and consumer, and I'm still building.
        </p>
        {show && (
          <p className={styles.signalTextKo}>
            모든 기업이 곧 AI 기업이 된다. 하지만 실제로 AI 제품을 출시하고, 팀을 만들고, 거버넌스를 정의하고, 국가 규모로 운영해본 사람은 거의 없다. 나는 세 나라에서, 엔터프라이즈와 소비자 양쪽 모두에서 네 가지를 전부 해봤다. 그리고 지금도 만들고 있다.
          </p>
        )}
      </div>

      {/* Now */}
      <div className={styles.now}>
        <p className={styles.nowLabel}>Now</p>
        <p className={styles.nowText}>
          Founder of <strong>Raymind.AI</strong> — an independent AI product studio. Not consulting, not advising. Shipping real products: consumer apps, developer tools, AI engines. Multiple products launched and in market. Simultaneously serving as AI Product & Experience Lead at <strong>Humain</strong>, Saudi Arabia's sovereign AI initiative, where I define platform vision and enterprise governance for Humain OS.
        </p>
        {show && (
          <p className={styles.nowTextKo}>
            Raymind.AI 설립자 — 독립 AI 프로덕트 스튜디오. 컨설팅도, 자문도 아니다. 실제 제품을 출시한다: 소비자 앱, 개발자 도구, AI 엔진. 여러 제품이 이미 시장에 나와 있다. 동시에 사우디아라비아 국가 AI 이니셔티브인 Humain에서 AI Product & Experience Lead로 Humain OS의 플랫폼 비전과 엔터프라이즈 거버넌스를 정의하고 있다.
          </p>
        )}
      </div>

      {/* Experience */}
      <section className={styles.experience}>
        <h2 className={styles.sectionTitle}>Experience</h2>

        <div className={styles.role}>
          <div className={styles.roleMeta}>
            <div className={styles.roleDate}>Apr 2025 — Present</div>
            <div className={styles.roleLocation}>Riyadh, KSA</div>
          </div>
          <div className={styles.roleBody}>
            <h3><a href="https://humain.ai" target="_blank" rel="noopener noreferrer">Humain</a></h3>
            <p className={styles.roleTitle}>AI Product & Experience Lead</p>
            <p className={styles.roleDesc}>
              Built and scaled the product and experience function for Humain OS — Saudi Arabia's flagship AI initiative. Defined platform vision, enterprise governance, and operating models from scratch. This isn't a startup; it's national-scale AI infrastructure.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                사우디아라비아의 국가 AI 이니셔티브인 Humain OS의 프로덕트 및 경험 조직을 처음부터 구축하고 확장했다. 플랫폼 비전, 엔터프라이즈 거버넌스, 운영 모델을 정의했다. 스타트업이 아니라, 국가 규모의 AI 인프라다.
              </p>
            )}
            <ul className={styles.highlights}>
              <li>Defined platform-level product vision across enterprise AI initiatives</li>
              <li>Established governance and review frameworks ensuring scalability and consistency</li>
              <li>Shaped multimodal AI expansion including wearable and ambient interaction models</li>
              <li>Embedded AI-assisted workflows across research, design, and documentation</li>
              <li>Structured cross-functional operating cadence across product, engineering, and leadership</li>
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
              Led 0-to-1 development of a spatial computing product on CookieRun IP. Built the team, secured the Meta partnership, shipped to Quest Store. Took a non-XR company into XR and delivered a production-ready product.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                쿠키런 IP 기반 공간 컴퓨팅 제품을 0에서 1까지 주도했다. 팀을 만들고, Meta 파트너십을 확보하고, Quest Store에 출시했다. XR 경험이 전무한 회사를 XR 시장에 진입시키고 프로덕션 레벨의 제품을 완성했다.
              </p>
            )}
            <ul className={styles.highlights}>
              <li>Built spatial computing capability and product pipeline within a non-XR-native organization</li>
              <li>Secured strategic platform partnership with Meta, full lifecycle launch to Quest Store</li>
              <li>Directed cross-functional teams across product, engineering, art, and marketing</li>
              <li>Delivered production-ready immersive experience featured in platform promotions and retail showcases</li>
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
              Established and led Kakao's first European subsidiary from zero. Drove international expansion for KakaoTalk and Kakao Friends IP across Europe — licensing, retail, strategic partnerships.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                카카오 최초의 유럽 법인을 처음부터 설립하고 이끌었다. 카카오톡과 카카오프렌즈 IP의 유럽 확장 — 라이선싱, 리테일, 전략적 파트너십을 총괄했다. IMG와의 전략적 제휴로 IP 글로벌 풋프린트를 확장했다.
              </p>
            )}
            <ul className={styles.highlights}>
              <li>Built European operational foundation and localization strategy</li>
              <li>Launched licensing and retail partnerships across key European markets</li>
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
              Defined enterprise UX standards adopted across Aramco's entire digital ecosystem — ahead of the world's largest IPO (2019). Built immersive VR for industrial education. Digital infrastructure at the scale of a country's economy.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                세계 최대 IPO(2019)를 앞두고 아람코 전사 디지털 생태계에 적용된 엔터프라이즈 UX 표준을 정의했다. 산업 교육용 몰입형 VR을 구축했다. 한 나라의 경제 규모에 해당하는 디지털 인프라를 다뤘다.
              </p>
            )}
            <ul className={styles.highlights}>
              <li>Defined enterprise UX standards across corporate digital ecosystem</li>
              <li>Delivered immersive VR applications supporting industrial education and communication</li>
              <li>Designed digital infrastructure supporting national policy shifts</li>
              <li>Contributed to corporate digital modernization during IPO preparation phase</li>
            </ul>
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
              Led strategic UX programs for Nike (NRC, NTC), Volvo (Global Web), Barclays (Mortgage), and Virgin Atlantic (Online Booking). Delivered AI-powered recommendation experiences and data-driven personalization systems.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                Nike(NRC, NTC), Volvo(글로벌 웹), Barclays(모기지), Virgin Atlantic(온라인 예약) 등 전략적 UX 프로그램을 이끌었다. AI 기반 추천 경험과 데이터 기반 개인화 시스템을 구현했다.
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
              Led UX delivery across multi-market digital programs for financial and consumer brands. Managed UX teams and cross-functional collaboration at enterprise scale.
            </p>
            {show && (
              <p className={styles.roleDescKo}>
                금융 및 소비자 브랜드의 다중 시장 디지털 프로그램에서 UX 딜리버리를 주도했다. 엔터프라이즈 규모의 UX 팀 관리와 크로스펑셔널 협업을 이끌었다.
              </p>
            )}
          </div>
        </div>

        {/* Earlier */}
        <h2 className={styles.sectionTitle} style={{ marginTop: "4rem" }}>Earlier</h2>
        <div className={styles.earlierGrid}>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>Cheil UK</p>
            <p className={styles.earlierTitle}>Senior Interaction Designer</p>
            <p className={styles.earlierDate}>Dec 2012 — Aug 2013, London</p>
          </div>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>Native Design</p>
            <p className={styles.earlierTitle}>Senior Interaction Designer</p>
            <p className={styles.earlierDate}>Apr 2012 — Nov 2012, London</p>
          </div>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>EY-Seren</p>
            <p className={styles.earlierTitle}>Design Consultant</p>
            <p className={styles.earlierDate}>Feb 2010 — Mar 2012, London</p>
          </div>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>Vinyl</p>
            <p className={styles.earlierTitle}>Interaction Designer</p>
            <p className={styles.earlierDate}>Oct 2005 — May 2006, Seoul</p>
          </div>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>D'strict</p>
            <p className={styles.earlierTitle}>Interaction Designer</p>
            <p className={styles.earlierDate}>Apr 2004 — Sep 2005, Seoul</p>
          </div>
          <div className={styles.earlierRole}>
            <p className={styles.earlierName}>NHN Corp.</p>
            <p className={styles.earlierTitle}>Junior Designer</p>
            <p className={styles.earlierDate}>Oct 2002 — Apr 2004, Seoul</p>
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
            {show && <p className={styles.expertiseAreaKo}>AI 네이티브 프로덕트 전략, 엔터프라이즈 AI 플랫폼 개발, 제로투원 프로덕트 인큐베이션</p>}
          </div>
          <div className={styles.expertiseArea}>
            <h3>Experience & Design</h3>
            <p>Human-AI & multimodal interaction, spatial computing & wearable, design governance & system architecture</p>
            {show && <p className={styles.expertiseAreaKo}>인간-AI 및 멀티모달 인터랙션, 공간 컴퓨팅 및 웨어러블, 디자인 거버넌스 및 시스템 아키텍처</p>}
          </div>
          <div className={styles.expertiseArea}>
            <h3>Leadership & Scale</h3>
            <p>Cross-functional executive leadership, national-scale digital transformation, international market expansion</p>
            {show && <p className={styles.expertiseAreaKo}>크로스펑셔널 경영 리더십, 국가 규모 디지털 전환, 해외 시장 확장</p>}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className={styles.education}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <div className={styles.eduItem}>
          <p className={styles.eduSchool}>Goldsmiths, University of London</p>
          <p className={styles.eduDegree}>MFA Computational Studio Arts — Pass with Merit</p>
          <p className={styles.eduYear}>2009 — 2011</p>
        </div>
        <div className={styles.eduItem}>
          <p className={styles.eduSchool}>Central Saint Martins, UAL</p>
          <p className={styles.eduDegree}>BA Hons Graphic Design, Interaction Design — 1st Class Honours</p>
          <p className={styles.eduYear}>2007 — 2009</p>
        </div>
        <div className={styles.eduItem}>
          <p className={styles.eduSchool}>Hongik University</p>
          <p className={styles.eduDegree}>Visual Arts (incomplete)</p>
          <p className={styles.eduYear}>2001 — 2002</p>
        </div>
      </section>
    </div>
  );
}
