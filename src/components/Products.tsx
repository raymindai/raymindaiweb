import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./Products.module.css";

interface Product {
  name: React.ReactNode;
  domains: string[];
  status: string;
  desc: string;
  visualClass: string;
  label: string;
}

const launched: Product[] = [
  {
    name: "pastlife.app",
    domains: ["pastlife.app", "jeonsaeng.com"],
    status: "Launched",
    desc: "I built Mir — an AI seer who reads your soul through tarot and reveals the past life you never knew you lived. Cinematic narratives, painted portraits, and 30-second films of who you used to be.",
    visualClass: styles.visualPastlife,
    label: "pastlife.app",
  },
  {
    name: "screenstyler.ai",
    domains: ["screenstyler.ai"],
    status: "Launched",
    desc: "A Mac app that unlocks peak brightness up to 1600 nits and lets you customize your display like editing a photo. Professional HDR controls, beyond what Apple gives you out of the box.",
    visualClass: styles.visualScreenstyler,
    label: "screenstyler.ai",
  },
];

const inDev: Product[] = [
  {
    name: "stiqs.ai",
    domains: ["stiqs.ai"],
    status: "In Development",
    desc: "An AI-powered sticker system that turns your selfies and pets into expressive, endlessly usable sticker packs. Your face, your cat, your energy — in sticker form.",
    visualClass: styles.visualStiqs,
    label: "stiqs.ai",
  },
  {
    name: "ddalggak.ai",
    domains: ["ddalggak.ai", "taptap.studio"],
    status: "In Development",
    desc: "AI-powered marketing image generator for small business owners. Upload a product photo, pick from 100+ styling presets, and get platform-ready images for Coupang, Instagram, Naver, and more — in under 20 seconds. No photographer, no studio.",
    visualClass: styles.visualDdalggak,
    label: "ddalggak.ai",
  },
];

const ideas = [
  { domain: "mdcore.ai", desc: "AI-first markdown editor that thinks with you. Write, organize, and publish — all from one surface." },
  { domain: "mdfy.cc", desc: "Instant web content to clean markdown. Paste a URL, get structured text. No fluff." },
  { domain: "superplane.ai", desc: "AI-native presentation tool. Think it, say it, present it — slides that build themselves." },
  { domain: "vpn4korean.com", desc: "VPN service built for Koreans abroad. Fast, simple, no-nonsense access to Korean content." },
  { domain: "nkdtxt.com", desc: "Strip it down. Raw text, nothing else." },
];

function ProductCard({ product }: { product: Product }) {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className={styles.section} data-hover>
      <div className={styles.header}>
        <h3>{product.name}</h3>
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
      <div className={styles.body}>
        <p className={styles.desc}>{product.desc}</p>
      </div>
    </section>
  );
}

function IdeaCard({ domain, desc, delay }: { domain: string; desc: string; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={styles.ideaCard} style={{ transitionDelay: `${delay}s` }}>
      <div className={styles.ideaName}>
        <a href={`https://${domain}`}>{domain}</a>
      </div>
      <p className={styles.ideaDesc}>{desc}</p>
    </div>
  );
}

export default function Products() {
  const ideasRef = useScrollReveal<HTMLElement>();

  return (
    <div id="products">
      <div className={styles.stage}><span>Launched</span></div>
      {launched.map((p) => <ProductCard key={p.label} product={p} />)}

      <div className={styles.stage}><span>In Development</span></div>
      {inDev.map((p) => <ProductCard key={p.label} product={p} />)}

      <div className={styles.stage}><span>Ideas / Domains Secured</span></div>
      <section ref={ideasRef} className={styles.section}>
        <div className={styles.ideasGrid}>
          {ideas.map((idea, i) => (
            <IdeaCard key={idea.domain} {...idea} delay={i * 0.06} />
          ))}
          <div className={`${styles.ideaCard} ${styles.ideaMore}`}>
            <p className={styles.ideaDescDim}>More ideas brewing. Always.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
