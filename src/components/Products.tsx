import { useScrollReveal } from "../hooks/useScrollReveal";
import { useKorean } from "../hooks/useKorean";
import styles from "./Products.module.css";

interface Product {
  name: React.ReactNode;
  domains: string[];
  status: string;
  desc: string;
  descKo: string;
  visualClass: string;
  label: string;
}

const launched: Product[] = [
  {
    name: "pastlife.app",
    domains: ["pastlife.app", "jeonsaeng.com"],
    status: "Launched",
    desc: "I built Mir — an AI seer who reads your soul through tarot and reveals the past life you never knew you lived. Cinematic narratives, painted portraits, and 30-second films of who you used to be.",
    descKo: "Mir는 타로를 바탕으로 당신의 영혼을 읽고, 당신도 몰랐던 전생을 그려 주는 AI 점술가다. 시네마틱 서사, 회화풍 초상, 30초 영상까지 한 번에 만든다.",
    visualClass: styles.visualPastlife,
    label: "pastlife.app",
  },
  {
    name: "screenstyler.ai",
    domains: ["screenstyler.ai"],
    status: "Launched",
    desc: "A Mac app that unlocks peak brightness up to 1600 nits and lets you customize your display like editing a photo. Professional HDR controls, beyond what Apple gives you out of the box.",
    descKo: "Mac 디스플레이의 잠긴 최대 밝기를 1600니트까지 열고, 사진 보정하듯 화면을 세밀하게 조정할 수 있는 앱이다. 애플 기본 설정을 넘어서는 전문가용 HDR 컨트롤을 제공한다.",
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
    descKo: "셀피와 반려동물을 감정이 살아 있는 스티커 팩으로 바꿔 주는 AI 스티커 엔진. 내 얼굴, 내 반려동물, 내 분위기를 그대로 담아낸다.",
    visualClass: styles.visualStiqs,
    label: "stiqs.ai",
  },
  {
    name: "ddalggak.ai",
    domains: ["ddalggak.ai", "taptap.studio"],
    status: "In Development",
    desc: "AI-powered marketing image generator for small business owners. Upload a product photo, pick from 100+ styling presets, and get platform-ready images for Coupang, Instagram, Naver, and more — in under 20 seconds. No photographer, no studio.",
    descKo: "소상공인을 위한 AI 마케팅 이미지 생성기. 제품 사진 한 장을 올리고 100개 이상의 스타일 프리셋에서 고르면, 쿠팡·인스타그램·네이버용 이미지를 20초 안에 만든다. 촬영도 스튜디오도 필요 없다.",
    visualClass: styles.visualDdalggak,
    label: "ddalggak.ai",
  },
];

const ideas = [
  {
    domain: "mdcore.ai",
    desc: "AI-first markdown editor that thinks with you. Write, organize, and publish — all from one surface.",
    descKo: "생각을 함께 정리해 주는 AI 중심 마크다운 에디터. 한 화면에서 작성, 정리, 발행까지 끝낸다.",
  },
  {
    domain: "mdfy.cc",
    desc: "Instant web content to clean markdown. Paste a URL, get structured text. No fluff.",
    descKo: "웹 콘텐츠를 즉시 깔끔한 마크다운으로 바꿔 준다. URL만 붙여 넣으면 구조화된 텍스트가 나온다.",
  },
  {
    domain: "superplane.ai",
    desc: "AI-native presentation tool. Think it, say it, present it — slides that build themselves.",
    descKo: "AI 네이티브 프레젠테이션 툴. 생각을 말하면 슬라이드가 스스로 구성된다.",
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
        {show && <p className={styles.descKo}>{product.descKo}</p>}
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
      <section ref={ideasRef} className={styles.section}>
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
