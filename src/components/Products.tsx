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
  cta?: string;
  ctaKo?: string;
}

const paldosaju: Product = {
  name: "Paldo Saju",
  domains: ["paldosaju.com"],
  url: "https://paldosaju.com",
  extraLinks: [
    { href: "https://paldosaju.com/en", label: "English", labelKo: "영어판" },
    { href: "https://paldosaju.com/en/learn", label: "What Is Saju?", labelKo: "사주란?" },
  ],
  status: "Launched",
  desc: "Paldo Saju is a Korean fortune telling service where you pick a reader from fifty-four characters across Korea's eight provinces. Each one listens to your story, then reads your saju from a birth chart calculated on the Korean calendar. Readings cover love, work, money, compatibility, face and palm. The first reading is free, in Korean, English or Japanese.",
  descKo: "팔도사주는 전국 팔도 동네마다 다른 말투의 사주 마스터 쉰네 명이 모인 사주 서비스다. 고른 마스터가 먼저 사연을 끝까지 듣고, 만세력으로 세운 여덟 글자로 짚어 준다. 사주, 궁합, 관상, 손금, 꿈해몽, 오늘의 운세를 볼 수 있다. 첫 풀이는 무료이고 한국어, 영어, 일본어로 볼 수 있다.",
  visualClass: styles.visualPastlife,
  label: "paldosaju",
  image: "/productimages/paldosaju_01.webp",
  imagePosition: "right",
};

const tarotmasters: Product = {
  name: "TarotMasters",
  domains: ["tarotmasters.app"],
  url: "https://tarotmasters.app",
  extraLinks: [
    { href: "https://tarotmasters.app/en/cards", label: "Card Meanings", labelKo: "카드 의미" },
    { href: "https://tarotmasters.app/en/horoscope", label: "Horoscope", labelKo: "별자리 운세" },
  ],
  status: "Launched",
  desc: "TarotMasters is a tarot reading service where you choose one of fourteen tarot masters, each with a voice of their own. Tell them what is on your mind, draw your cards on the table, and read them together in a conversation. The first card opens free. It runs in Korean, English, Japanese, Spanish, Portuguese and Traditional Chinese.",
  descKo: "타로마스터즈는 열네 명의 타로 마스터 가운데 한 명을 골라 고민을 털어놓고 카드를 함께 읽는 타로 서비스다. 마스터마다 말투와 보는 방식이 달라서 같은 고민도 다르게 짚어 준다. 연애, 재회, 그 사람의 속마음부터 오늘의 카드와 별자리 운세까지 볼 수 있고, 첫 카드는 무료로 펼쳐진다. 한국어, 영어, 일본어, 스페인어, 포르투갈어, 대만 중국어로 운영한다.",
  visualClass: styles.visualPastlife,
  label: "tarotmasters",
  image: "/productimages/tarotmasters_01.webp",
  imagePosition: "left",
};

const isekaiplay: Product = {
  name: "IsekaiPlay",
  domains: ["isekaiplay.com"],
  url: "https://isekaiplay.com",
  status: "Launched",
  desc: "IsekaiPlay is a home for isekai stories. Hear them on FM, read them on Story, and live them on Chat. All three run in Korean, Japanese, and English.",
  descKo: "이세계플레이는 이세계 이야기만 다루는 곳이다. FM으로 듣고, Story로 읽고, Chat으로 직접 살아 본다. 세 가지 모두 한국어, 일본어, 영어로 즐길 수 있다.",
  visualClass: styles.visualPastlife,
  label: "isekaiplay",
  image: "/productimages/isekaiplay_01.webp",
  imagePosition: "right",
};

const isekaiServices: Product[] = [
  {
    name: "FM",
    domains: ["isekaiplay.com/fm"],
    url: "https://isekaiplay.com/fm",
    extraLinks: [{ href: "https://isekaiplay.com/fm/en/monster-interpreter/1", label: "Episode 1", labelKo: "1화 듣기" }],
    status: "Launched",
    desc: "isekaiFM is an audio drama station that only airs stories from other worlds. Each series comes out in episodes, with a distinct voice for every character, sound design and scene art, in Korean, English and Japanese. The first three episodes are free. After an episode, you can talk one on one with a character who remembers what you heard.",
    descKo: "isekaiFM은 이세계 이야기만 방송하는 오디오 드라마 방송국이다. 작품은 한 화씩 연재되고, 인물마다 다른 목소리와 효과음, 장면 그림이 함께 나온다. 한국어, 영어, 일본어로 들을 수 있고 모든 작품의 1화부터 3화까지는 무료다. 한 화를 다 들으면 방금 들은 이야기를 기억하는 인물과 일대일로 대화할 수 있다.",
    visualClass: styles.visualPastlife,
    label: "isekaifm",
    image: "/productimages/isekaifm_01.webp",
    cta: "Listen",
    ctaKo: "듣기",
  },
  {
    name: "Story",
    domains: ["isekaiplay.com/story"],
    url: "https://isekaiplay.com/ko/story",
    extraLinks: [{ href: "https://isekaiplay.com/ko/story/schedule", label: "Schedule", labelKo: "연재표" }],
    status: "Launched",
    desc: "IsekaiPlay Story publishes isekai romance fantasy web novels in Korean and Japanese. Ten original series come out one chapter at a time, with the first three chapters free. When you finish a chapter, you can talk to one of its characters in IsekaiPlay Chat. Several series also have audio drama versions on IsekaiPlay FM.",
    descKo: "이세계플레이 Story는 이세계 로맨스 판타지 웹소설만 연재하는 서비스다. 한국어와 일본어로 오리지널 작품 10편을 한 화씩 공개하고, 작품마다 첫 세 화는 무료다. 한 화를 다 읽으면 그 이야기 속 인물에게 이세계플레이 Chat에서 말을 걸 수 있다. 몇몇 작품은 이세계플레이 FM에서 오디오 드라마로도 들을 수 있다.",
    visualClass: styles.visualPastlife,
    label: "isekaistory",
    image: "/productimages/isekaistory_01.webp",
    cta: "Read",
    ctaKo: "읽기",
  },
  {
    name: "Chat",
    domains: ["isekaiplay.com/chat"],
    url: "https://isekaiplay.com/en/chat",
    extraLinks: [{ href: "https://isekaiplay.com/en/stories", label: "All Stories", labelKo: "전체 작품" }],
    status: "Launched",
    desc: "Isekai Chat is a romance fantasy you play by talking. You enter an isekai story and speak to its characters in your own words, and they answer in character. A status window shows the relationship changing, and the story remembers what you said yesterday. Free to start, in Korean, Japanese and English.",
    descKo: "이세계챗은 말로 플레이하는 로맨스 판타지다. 이세계 이야기 속에 들어가 등장인물에게 내 말로 말을 걸면, 그 인물이 자기답게 대답한다. 상태창에는 관계가 달라지는 모습이 보이고, 이야기는 어제 내가 한 말을 기억한다. 무료로 시작할 수 있고 한국어, 일본어, 영어로 즐길 수 있다.",
    visualClass: styles.visualPastlife,
    label: "isekaichat",
    image: "/productimages/isekaichat_01.webp",
  },
];

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
          {show ? (game.ctaKo ?? "플레이") : (game.cta ?? "Play")} →
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

export default function Products() {
  return (
    <div id="products">
      <div className={styles.stage}><span>Launched</span></div>
      <ProductCard product={paldosaju} />
      <ProductCard product={tarotmasters} />
      <ProductCard product={isekaiplay} />
      <div className={`${styles.gameGrid} ${styles.gameGrid3}`}>
        {isekaiServices.map((g, i) => <GameCard key={g.label} game={g} delay={i * 0.08} />)}
      </div>
      <ProductCard product={dopaplay} />
      <div className={styles.gameGrid}>
        {games.map((g, i) => <GameCard key={g.label} game={g} delay={(i % 2) * 0.08} />)}
      </div>
      {launched.map((p) => <ProductCard key={p.label} product={p} />)}

      <div className={styles.stage}><span>In Development</span></div>
      {inDev.map((p) => <ProductCard key={p.label} product={p} />)}
    </div>
  );
}
