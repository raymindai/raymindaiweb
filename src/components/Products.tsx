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

const isekaiplay: Product = {
  name: "IsekaiPlay",
  domains: ["isekaiplay.com"],
  url: "https://isekaiplay.com",
  status: "Launched",
  desc: "An interactive romance fantasy story you play by talking, not by picking from a menu. You step into a world run by a status window and try to win over the one person it can't measure. Every story has a designed arc, and the characters remember what you said to them. Available in Korean, Japanese, and English.",
  descKo: "이세계플레이는 대화로 플레이하는 인터랙티브 로맨스 판타지 스토리다. 상태창이 있는 이세계에서, 상태창으로도 잴 수 없는 한 사람의 마음을 얻어 간다. 작품마다 설계된 이야기의 흐름이 있고, 인물은 당신이 한 말을 잊지 않는다. 한국어, 일본어, 영어로 즐길 수 있다.",
  visualClass: styles.visualPastlife,
  label: "isekaiplay",
  image: "/productimages/isekaiplay_01.webp",
  imagePosition: "left",
};

const launched: Product[] = [
  {
    name: "memory.wiki",
    domains: ["memory.wiki"],
    url: "https://memory.wiki",
    extraLinks: [
      { href: "https://memory.wiki/about", label: "About", labelKo: "소개" },
    ],
    status: "Launched",
    desc: "Stop re-explaining your context to every AI. Capture from the browser, your editor, the terminal, or MCP, and it all lands in one hub at memory.wiki/@you. Paste that one URL into Claude, ChatGPT, Gemini, Cursor, or Codex, and each of them reads your knowledge the same way, as clean markdown.",
    descKo: "AI마다 내 맥락을 처음부터 다시 설명할 필요가 없다. 브라우저, 에디터, 터미널, MCP 어디서 저장하든 memory.wiki/@you라는 허브 하나에 모인다. 그 URL 하나를 Claude, ChatGPT, Gemini, Cursor, Codex에 붙여넣으면 모두 같은 방식으로 내 지식을 깔끔한 마크다운으로 읽는다.",
    visualClass: styles.visualScreenstyler,
    label: "memory.wiki",
    image: "/productimages/memorywiki_01.webp",
    imagePosition: "left",
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

const dopaplay: Product = {
  name: "DOPAPLAY",
  domains: ["dopaplay.io"],
  url: "https://dopaplay.io",
  status: "Launched",
  desc: "The home for short, thrilling games you can start with one tap. One DOPAPLAY account carries your progress, best scores, and purchases across 3SEC FEED, DOPA DASH, POPCHAIN, and Kai's Greedy Loop, on the web and on phones. Play as a guest right away and sign in only when you want to keep your progress everywhere.",
  descKo: "DOPAPLAY는 누르면 바로 시작하는 짧고 짜릿한 게임을 모은 게임 브랜드다. 계정 하나로 3SEC FEED, DOPA DASH, POPCHAIN, Kai's Greedy Loop의 진행, 최고 기록, 구매를 웹과 휴대폰 어디서나 이어 간다. 처음엔 게스트로 바로 플레이하고, 원할 때만 로그인하면 된다.",
  visualClass: styles.visualPastlife,
  label: "dopaplay",
  image: "/productimages/dopaplay_01.webp",
  imagePosition: "right",
};

const games: Product[] = [
  {
    name: "3SEC FEED",
    domains: ["3sec.io"],
    url: "https://3sec.io",
    extraLinks: [{ href: "https://3sec.io/guide/", label: "Guide", labelKo: "가이드" }],
    status: "Launched",
    desc: "A vertical feed of 3-second clay minigames you swipe up through like shorts. Don't watch, play: every swipe brings a new minigame and gets a little faster, and you never know what comes next. 200 minigames, a 400-stage channel journey, and a daily feed that is the same 20 for everyone, in 22 languages.",
    descKo: "쇼츠처럼 위로 넘기며 즐기는 3초짜리 클레이 미니게임 피드다. 보지 말고, 하자. 넘길 때마다 새 미니게임이 나오고 조금씩 빨라지며, 무엇이 나올지 몰라 더 재밌다. 미니게임 200종, 400단계 채널 여정, 매일 모두에게 같은 20편이 오는 오늘의 피드, 22개 언어.",
    visualClass: styles.visualPastlife,
    label: "3secfeed",
    image: "/productimages/3secfeed_01.webp",
  },
  {
    name: "DOPA DASH",
    domains: ["dopadash.io"],
    url: "https://dopadash.io",
    extraLinks: [{ href: "https://dopadash.io/about.html", label: "About", labelKo: "소개" }],
    status: "Launched",
    desc: "A free color-party rhythm arcade game that runs in the browser. Tap to dash on the beat, boop the bored grey crowd back into neon color, and they join the conga line dancing behind you. Every creature is generated, so you hatch one nobody else has, with no download and no violence.",
    descKo: "브라우저에서 바로 하는 무료 컬러 파티 리듬 아케이드다. 박자에 맞춰 탭한 곳으로 대시해 심심한 회색 친구들을 톡 치면, 형광 물감을 뒤집어쓰고 내 뒤에 줄을 서서 춤춘다. 크리처는 전부 새로 만들어져 나만의 친구가 태어나고, 설치도 폭력도 없다.",
    visualClass: styles.visualPastlife,
    label: "dopadash",
    image: "/productimages/dopadash_01.webp",
  },
  {
    name: "POPCHAIN",
    domains: ["popchain.io"],
    url: "https://www.popchain.io",
    extraLinks: [{ href: "https://www.popchain.io/guide.html", label: "Guide", labelKo: "가이드" }],
    status: "Launched",
    desc: "A jelly-popping puzzle where every run is a live show. Tap groups of three or more same-color jellies, chain quick pops into combos, and watch the viewer count and chat react to every move. 300 hand-made story shows across 20 worlds, an endless marathon, and a new daily show, with a caster who cheers you on in 22 languages.",
    descKo: "한 판 한 판이 라이브 방송인 젤리 퍼즐 게임이다. 같은 색 젤리 3개 이상을 톡 터뜨리고 빠르게 이어 콤보를 쌓으면, 시청자 수와 채팅창이 모든 순간에 반응한다. 20개 월드에 직접 설계한 스토리 방송 300개, 끝없는 마라톤, 매일 새로운 오늘의 쇼가 있고, 캐스터가 22개 언어로 응원한다.",
    visualClass: styles.visualPastlife,
    label: "popchain",
    image: "/productimages/popchain_01.webp",
  },
  {
    name: "Kai's Greedy Loop",
    domains: ["greedyloop.com"],
    url: "https://www.greedyloop.com",
    extraLinks: [{ href: "https://www.greedyloop.com/about", label: "About", labelKo: "소개" }],
    status: "Launched",
    desc: "Kai runs a stone loop that never ends, inside a terrarium, while something outside looks in. Tap to switch lanes. Hold, then let go to dash head first and set your creatures free. The longer the line behind you, the more it pays, and the more one hit takes.",
    descKo: "끝나지 않는 돌 트랙을 도는 작은 순례자, 카이. 이곳은 테라리움이고, 유리 바깥의 무언가가 안을 들여다본다. 탭하면 레인을 바꾸고, 길게 눌렀다 떼면 머리부터 돌진해 뒤따르던 크리쳐들을 풀어준다. 줄이 길수록 더 많이 벌고, 한 번 부딪히면 더 많이 잃는다.",
    visualClass: styles.visualPastlife,
    label: "greedyloop",
    image: "/productimages/greedyloop_01.webp",
  },
];

const inDev: Product[] = [
  {
    name: "jolong.ai",
    domains: ["jolong.ai", "roastengine.ai"],
    url: "https://jolong.ai",
    status: "Beta Launched",
    desc: "A roast training platform. Duolingo for wit. Analyze any content for clichés, pretension, and AI slop, get a score, and train your ability to give and take sharp feedback. Powered by Roast Engine.",
    descKo: "조롱 훈련 플랫폼. 위트의 듀오링고. 콘텐츠의 뻔함, 허세, AI슬롭을 분석하고 점수를 매기며, 날카로운 피드백을 주고받는 능력을 훈련한다. Roast Engine 기반.",
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
    desc: "AI-powered product, marketing image generator for small business owners. Upload a product photo, pick from 100+ styling presets, and get platform-ready images for Coupang, Instagram, Naver, and more in under 20 seconds. No photographer, no studio.",
    descKo: "소상공인을 위한 AI 마케팅 이미지 생성기. 제품 사진 한 장을 올리고 100개 이상의 스타일 프리셋에서 고르면, 쿠팡, 인스타그램, 네이버용 최고 수준의 제품 이미지를 20초 안에 만들어준다.",
    visualClass: styles.visualDdalggak,
    label: "ddalggak.ai",
  },
  {
    name: "stiqs.ai",
    domains: ["stiqs.ai"],
    status: "In Development",
    desc: "A macOS note app that feels like real sticky notes. Toss, crumple, and pin them to your wall. Lay out memos, PDFs, images, code, and to-dos on one canvas, connect ideas visually, and let AI do the rest. No complex tools, just instinct.",
    descKo: "진짜 포스트잇처럼 던지고, 구기고, 벽에 붙이는 macOS 노트 앱. 메모, PDF, 이미지, 코드, 투두, 테이블, 스티커 등 8가지 노트를 하나의 캔버스에 자유롭게 펼치고, 커넥터로 아이디어를 이어 붙이면 AI가 요약, 확장까지 해준다. 복잡한 도구 없이, 손끝 감각만으로 생각을 정리한다.",
    visualClass: styles.visualStiqs,
    label: "stiqs.ai",
    image: "/productimages/stiqsai_01.webp",
    imagePosition: "right",
  },
  {
    name: "mdcore.ai",
    domains: ["mdcore.ai"],
    status: "In Development",
    desc: "Markdown is becoming the language between AI and everything else. mdcore is the engine that makes that language work: parsing every flavor, rendering on any surface, converting both ways. The infrastructure that should exist by now.",
    descKo: "마크다운은 AI 시대의 사실상 교환 포맷이 되었으나, GFM, Obsidian, MDX, Pandoc 등 방언이 파편화되어 있고 양방향 변환을 단일 파이프라인으로 처리하는 인프라는 존재하지 않는다. mdcore는 모든 flavor의 파싱, 임의 런타임 대응 렌더링, 양방향 포맷 변환을 하나의 엔진으로 통합한다. memory.wiki의 기반 기술이자, 오픈소스 엔진 + API 플랫폼으로 확장 예정.",
    visualClass: styles.visualScreenstyler,
    label: "mdcore.ai",
  },
];

const ideas = [
  {
    domain: "superplane.ai",
    desc: "The control layer for AI agents. See what they do, stop what's risky, keep humans in the loop. Not another agent builder. The OS for running an AI workforce accountably.",
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
                {d}{i < product.domains.length - 1 && <span className={styles.domainSep}> / </span>}
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

function GameCard({ game, delay }: { game: Product; delay: number }) {
  const ref = useScrollReveal<HTMLElement>();
  const { show } = useKorean();
  return (
    <article ref={ref} className={styles.gameCard} style={{ transitionDelay: `${delay}s` }} data-hover>
      {game.image && (
        <a href={game.url} target="_blank" rel="noopener noreferrer" className={styles.gameImage}>
          <img src={game.image} alt={game.label} loading="lazy" />
        </a>
      )}
      <div className={styles.gameHead}>
        <h4 className={styles.gameName}>
          <a href={game.url} target="_blank" rel="noopener noreferrer">{game.name}</a>
        </h4>
        <div className={styles.gameMeta}>
          <span className={styles.domain}>{game.domains[0]}</span>
          <span className={styles.status}>{game.status}</span>
        </div>
      </div>
      <p className={styles.gameDesc}>{game.desc}</p>
      {show && <p className={styles.ideaKo}>{game.descKo}</p>}
      <div className={styles.ctaGroup}>
        <a href={game.url} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          {show ? "플레이" : "Play"} →
        </a>
        {game.extraLinks?.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.cta}>
            {show ? link.labelKo : link.label} →
          </a>
        ))}
      </div>
    </article>
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
      <ProductCard product={isekaiplay} />
      <ProductCard product={dopaplay} />
      <div className={styles.gameGrid}>
        {games.map((g, i) => <GameCard key={g.label} game={g} delay={(i % 2) * 0.08} />)}
      </div>
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
