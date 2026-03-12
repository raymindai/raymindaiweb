import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./Products.module.css";

interface Product {
  name: React.ReactNode;
  domain: string;
  status: string;
  desc: string;
  visualClass: string;
  label: string;
}

const launched: Product[] = [
  {
    name: "PastLife",
    domain: "pastlife.app",
    status: "Launched",
    desc: "I built Mir — an AI seer who reads your soul through tarot and reveals the past life you never knew you lived. Cinematic narratives, painted portraits, and 30-second films of who you used to be.",
    visualClass: styles.visualPastlife,
    label: "PastLife",
  },
  {
    name: <>Screen<em>Styler</em></>,
    domain: "screenstyler.ai",
    status: "Launched",
    desc: "An AI tool for crafting phone wallpapers that actually feel like yours. Describe your mood, your aesthetic, your vibe — and get gallery-worthy results in seconds.",
    visualClass: styles.visualScreenstyler,
    label: "ScreenStyler",
  },
];

const inDev: Product[] = [
  {
    name: "Stiqs",
    domain: "stiqs.ai",
    status: "In Development",
    desc: "An AI-powered sticker system that turns your selfies and pets into expressive, endlessly usable sticker packs. Your face, your cat, your energy — in sticker form.",
    visualClass: styles.visualStiqs,
    label: "Stiqs",
  },
  {
    name: <><em>Ddal</em>ggak</>,
    domain: "ddalggak.ai",
    status: "In Development",
    desc: "AI that transforms chicken breast into something you actually want to eat. Korean-rooted, health-first recipes that make meal prep feel like cooking, not surviving.",
    visualClass: styles.visualDdalggak,
    label: "Ddalggak",
  },
];

const ideas = [
  { domain: "mdcore.ai", desc: "AI-first markdown editor that thinks with you. Write, organize, and publish — all from one surface." },
  { domain: "mdfy.cc", desc: "Instant web content to clean markdown. Paste a URL, get structured text. No fluff." },
  { domain: "superplane.ai", desc: "AI-native presentation tool. Think it, say it, present it — slides that build themselves." },
  { domain: "castiq.ai", desc: "AI podcast production. Script, voice, edit, publish — a full studio in a single interface." },
  { domain: "storiq.ai", desc: "AI interactive children's books. Stories that adapt, illustrations that evolve, endings your child chooses." },
  { domain: "kairoscore.ai", desc: "AI personal time auditor. Understand where your hours go and reclaim the ones that matter." },
];

function ProductCard({ product }: { product: Product }) {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className={styles.section} data-hover>
      <div className={styles.header}>
        <h3>{product.name}</h3>
        <div className={styles.meta}>
          <div className={styles.domain}>{product.domain}</div>
          <div className={styles.status}>{product.status}</div>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.desc}>{product.desc}</p>
        <div className={`${styles.visual} ${product.visualClass}`}>
          <div className={styles.visualLabel}>{product.label}</div>
        </div>
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
