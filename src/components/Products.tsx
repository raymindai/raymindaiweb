import { useScrollReveal } from "../hooks/useScrollReveal";
import { useKorean } from "../hooks/useKorean";
import styles from "./Products.module.css";

interface ProductLink {
  href: string;
  label: string;
  labelKo: string;
}

interface Product {
  name: React.ReactNode;
  domains: string[];
  url?: string;
  extraLinks?: ProductLink[];
  status: string;
  desc: string;
  descKo: string;
  visualClass: string;
  label: string;
  image?: string;
  imagePosition?: "left" | "right";
}

const launched: Product[] = [
  {
    name: "mdfy.cc",
    domains: ["mdfy.cc"],
    url: "https://mdfy.cc",
    extraLinks: [
      { href: "https://mdfy.cc/about", label: "About", labelKo: "소개" },
    ],
    status: "Launched",
    desc: "You've seen what AI writes. You've also seen what it looks like when you paste it somewhere. mdfy.cc fixes that — paste any Markdown, from any AI, and get a document that looks like someone actually designed it. One link, zero friction.",
    descKo: "모든 LLM의 기본 출력 포맷은 마크다운이다. 그러나 마크다운 원문은 비개발자에게 전달할 수 없고, 플랫폼마다 렌더링이 다르며, 수식·다이어그램·코드 하이라이팅을 일관되게 처리하는 도구가 없다. mdfy.cc는 임의의 마크다운을 붙여넣으면 MD flavor를 자동 감지하고 완전한 렌더링을 수행하여, 단일 공유 URL로 제공한다. 계정 불필요.",
    visualClass: styles.visualScreenstyler,
    label: "mdfy.cc",
    image: "/productimages/mdfycc_01.webp",
    imagePosition: "right",
  },
  {
    name: "pastlife.app",
    domains: ["pastlife.app", "jeonsaeng.com"],
    url: "https://pastlife.app",
    status: "Launched",
    desc: "I built Mir, an AI seer who reads your soul through tarot and reveals the past life you never knew you lived. Cinematic narratives, painted portraits, and 30-second films of who you used to be.",
    descKo: "미르는 타로를 바탕으로 당신의 영혼을 읽고, 당신도 몰랐던 전생을 그려 주는 AI 점술가다. 시네마틱 서사, 회화풍 초상, 30초 영상까지 한 번에 만들고 당신의 전생과 대화를 통해 미래를 볼수 있도록 돕는다.",
    visualClass: styles.visualPastlife,
    label: "pastlife.app",
    image: "/productimages/pastlifeapp_01.webp",
    imagePosition: "right",
  },
  {
    name: "screenstyler.ai",
    domains: ["screenstyler.ai"],
    url: "https://screenstyler.ai",
    status: "Launched",
    desc: "A Mac app that unlocks peak brightness up to 1600 nits and lets you customize your display like editing a photo. Professional HDR controls, beyond what Apple gives you out of the box.",
    descKo: "맥북이나 일부 애플 디스플레이의 잠긴 최대 밝기를 1600니트까지 열고, 사진 보정하듯 화면을 세밀하게 조정할 수 있는 앱이다. 애플 기본 설정에서 불가능한 전문가수준의 HDR 컨트롤을 제공한다.",
    visualClass: styles.visualScreenstyler,
    label: "screenstyler.ai",
    image: "/productimages/screenstyler_01.webp",
    imagePosition: "left",
  },
];

const inDev: Product[] = [
  {
    name: "jolong.ai",
    domains: ["jolong.ai", "roastengine.ai"],
    url: "https://jolong.ai",
    status: "Beta Launched",
    desc: "A roast training platform — Duolingo for wit. Analyze any content for clichés, pretension, and AI slop, get a score, and train your ability to give and take sharp feedback. Powered by Roast Engine.",
    descKo: "조롱 훈련 플랫폼 — 위트의 듀오링고. 콘텐츠의 뻔함, 허세, AI슬롭을 분석하고 점수를 매기며, 날카로운 피드백을 주고받는 능력을 훈련한다. Roast Engine 기반.",
    visualClass: styles.visualStiqs,
    label: "jolong.ai",
    image: "/productimages/jolongai_01.webp",
    imagePosition: "left",
  },
  {
    name: "ddalggak.ai",
    domains: ["ddalggak.ai", "taptap.studio"],
    url: "https://ddalggak.ai",
    status: "In Development",
    desc: "AI-powered product, marketing image generator for small business owners. Upload a product photo, pick from 100+ styling presets, and get platform-ready images for Coupang, Instagram, Naver, and more — in under 20 seconds. No photographer, no studio.",
    descKo: "소상공인을 위한 AI 마케팅 이미지 생성기. 제품 사진 한 장을 올리고 100개 이상의 스타일 프리셋에서 고르면, 쿠팡·인스타그램·네이버용 최고 수준의 제품 이미지를 20초 안에 만들어준다.",
    visualClass: styles.visualDdalggak,
    label: "ddalggak.ai",
  },
  {
    name: "stiqs.ai",
    domains: ["stiqs.ai"],
    status: "In Development · Site Pending",
    desc: "A macOS note app that feels like real sticky notes — toss, crumple, and pin them to your wall. Lay out memos, PDFs, images, code, and to-dos on one canvas, connect ideas visually, and let AI do the rest. No complex tools, just instinct.",
    descKo: "진짜 포스트잇처럼 던지고, 구기고, 벽에 붙이는 macOS 노트 앱. 메모, PDF, 이미지, 코드, 투두, 테이블, 스티커 등 8가지 노트를 하나의 캔버스에 자유롭게 펼치고, 커넥터로 아이디어를 이어 붙이면 AI가 요약, 확장까지 해준다. 복잡한 도구 없이, 손끝 감각만으로 생각을 정리한다.",
    visualClass: styles.visualStiqs,
    label: "stiqs.ai",
    image: "/productimages/stiqsai_01.webp",
    imagePosition: "right",
  },
  {
    name: "mdcore.ai",
    domains: ["mdcore.ai"],
    status: "In Development · Site Pending",
    desc: "Markdown is becoming the language between AI and everything else. mdcore is the engine that makes that language work — parsing every flavor, rendering on any surface, converting both ways. The infrastructure that should exist by now.",
    descKo: "마크다운은 AI 시대의 사실상 교환 포맷이 되었으나, GFM·Obsidian·MDX·Pandoc 등 방언이 파편화되어 있고 양방향 변환을 단일 파이프라인으로 처리하는 인프라는 존재하지 않는다. mdcore는 모든 flavor의 파싱, 임의 런타임 대응 렌더링, 양방향 포맷 변환을 하나의 엔진으로 통합한다. mdfy.cc의 기반 기술이자, 오픈소스 엔진 + API 플랫폼으로 확장 예정.",
    visualClass: styles.visualScreenstyler,
    label: "mdcore.ai",
  },
];

const ideas = [
  {
    domain: "superplane.ai",
    desc: "The control layer for AI agents. See what they do, stop what's risky, keep humans in the loop. Not another agent builder — the OS for running an AI workforce accountably.",
    descKo: "AI 에이전트 위에 얹히는 통제 레이어. 에이전트가 뭘 하는지 보여주고, 위험하면 멈추고, 사람을 끼워넣는다. 에이전트를 만드는 도구가 아니라, AI 조직을 책임지고 운영하기 위한 OS.",
  },
  {
    domain: "nkdtxt.com",
    desc: "Strip it down. Raw text, nothing else.",
    descKo: "군더더기를 모두 걷어낸, 텍스트만을 위한 도구.",
  },
];

function ProductCard({ product }: { product: Product }) {
  const ref = useScrollReveal<HTMLElement>();
  const { show } = useKorean();
  return (
    <section ref={ref} className={styles.section} data-hover>
      <div className={styles.header}>
        <h3>{product.url ? <a href={product.url} target="_blank" rel="noopener noreferrer">{product.name}</a> : product.name}</h3>
        <div className={styles.meta}>
          <div className={styles.domains}>
            {product.domains.map((d, i) => (
              <span key={d} className={styles.domain}>
                {d}{i < product.domains.length - 1 && <span className={styles.domainSep}> · </span>}
              </span>
            ))}
          </div>
          <div className={styles.status}>{product.status}</div>
        </div>
      </div>
      <div className={`${styles.body} ${product.image ? (product.imagePosition === "left" ? styles.bodyImageLeft : styles.bodyImageRight) : ""}`}>
        {product.image && product.imagePosition === "left" && (
          <div className={styles.productImage}>
            <img src={product.image} alt={product.label} />
          </div>
        )}
        <div>
          <p className={styles.desc}>{product.desc}</p>
          {show && <p className={styles.descKo}>{product.descKo}</p>}
          {product.url && (
            <div className={styles.ctaGroup}>
              <a href={product.url} target="_blank" rel="noopener noreferrer" className={styles.cta}>
                {show ? "방문하기" : "Visit"} →
              </a>
              {product.extraLinks?.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.cta}>
                  {show ? link.labelKo : link.label} →
                </a>
              ))}
            </div>
          )}
        </div>
        {product.image && product.imagePosition !== "left" && (
          <div className={`${styles.productImage} ${styles.productImageRight}`}>
            <img src={product.image} alt={product.label} />
          </div>
        )}
      </div>
    </section>
  );
}

function IdeaCard({ domain, desc, descKo, delay }: { domain: string; desc: string; descKo: string; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  const { show } = useKorean();
  return (
    <div ref={ref} className={styles.ideaCard} style={{ transitionDelay: `${delay}s` }}>
      <div className={styles.ideaName}>
        <a href={`https://${domain}`}>{domain}</a>
      </div>
      <p className={styles.ideaDesc}>{desc}</p>
      {show && <p className={styles.ideaKo}>{descKo}</p>}
    </div>
  );
}

export default function Products() {
  const ideasRef = useScrollReveal<HTMLElement>();
  const { show } = useKorean();

  return (
    <div id="products">
      <div className={styles.stage}><span>Launched</span></div>
      {launched.map((p) => <ProductCard key={p.label} product={p} />)}

      <div className={styles.stage}><span>In Development</span></div>
      {inDev.map((p) => <ProductCard key={p.label} product={p} />)}

      <div className={styles.stage}><span>Ideas / Domains Secured</span></div>
      <section ref={ideasRef} className={`${styles.section} ${styles.ideasSection}`}>
        <div className={styles.ideasGrid}>
          {ideas.map((idea, i) => (
            <IdeaCard key={idea.domain} {...idea} delay={i * 0.06} />
          ))}
          <div className={`${styles.ideaCard} ${styles.ideaMore}`}>
            <p className={styles.ideaDescDim}>More ideas brewing. Always.</p>
            {show && <p className={styles.ideaKo}>더 많은 아이디어가 계속 쌓이고 있다.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
