import { useScrollReveal } from "../hooks/useScrollReveal";
import { useKorean } from "../hooks/useKorean";
import Ko from "./Ko";
import styles from "./Method.module.css";

interface Step {
  num: string;
  title: React.ReactNode;
  titleKo: string;
  desc: string;
  descKo: string;
}

const groups: { label: string; labelKo: string; steps: Step[] }[] = [
  {
    label: "Building in the AI era",
    labelKo: "AI 시대에 만드는 방식",
    steps: [
      {
        num: "01",
        title: <><em>One</em> person, a company of agents.</>,
        titleKo: "사람은 하나, 회사는 에이전트로.",
        desc: "Each product has its own team: a CEO agent that sets priorities, a COO that ships, and agents for finance, data, funnel, pricing, retention and marketing. I set the direction and keep three calls for myself: prices, new paid channels, and bigger budgets.",
        descKo: "제품마다 팀이 따로 있다. 우선순위를 정하는 CEO 에이전트, 배포를 맡는 COO, 그리고 재무, 데이터, 퍼널, 가격, 리텐션, 마케팅 에이전트. 나는 방향을 정하고, 가격, 새 유료 채널, 예산 증액 세 가지만 직접 정한다.",
      },
      {
        num: "02",
        title: <><em>Written</em> down, then reviewed.</>,
        titleKo: "글로 넘기고, 사람이 본다.",
        desc: "Work moves between agents as writing: briefs, handoff notes, decision logs. Anything people will see comes to me as a review page, and I answer on the page itself. One week that was 255 notes to 28 agents.",
        descKo: "에이전트 사이의 일은 글로 오간다. 지시서, 인수인계 노트, 결정 기록. 사람에게 보일 것은 리뷰 페이지로 나에게 오고, 나는 그 페이지에서 바로 답한다. 어느 한 주에는 28개 에이전트에게 255건을 남겼다.",
      },
      {
        num: "03",
        title: <><em>One</em> door to production.</>,
        titleKo: "배포하는 문은 하나.",
        desc: "Only one agent per product can deploy, and a budget can only move so far in a day. When agents began shipping fifty to a hundred and forty times a day, the first to notice was the bill. Now releases go out in batches.",
        descKo: "제품마다 배포할 수 있는 에이전트는 하나뿐이고, 예산이 하루에 움직일 수 있는 폭도 정해 두었다. 에이전트들이 하루 50번에서 140번까지 배포하기 시작했을 때 제일 먼저 알아챈 건 청구서였다. 지금은 묶어서 내보낸다.",
      },
    ],
  },
  {
    label: "Designing with numbers",
    labelKo: "숫자로 디자인하기",
    steps: [
      {
        num: "04",
        title: <>The <em>number</em> comes first.</>,
        titleKo: "숫자를 먼저 적는다.",
        desc: "Before anything changes, we write down which number it should move and the day we will judge it. In Paldo Saju's first two weeks, that ledger filled with 623 changes and 59 experiments.",
        descKo: "무엇이든 바꾸기 전에 어떤 숫자가 움직여야 하는지, 언제 판정할지를 먼저 적는다. 팔도사주 출시 첫 2주 동안 이 장부에 변경 623건, 실험 59건이 쌓였다.",
      },
      {
        num: "05",
        title: <><em>Kill</em> rules, set in advance.</>,
        titleKo: "끄는 기준은 미리 정한다.",
        desc: "Every test gets its bar before it starts. We once added a friendly hint in the middle of a reading. Taps on the pay button went down, so it was gone that night. If it looks good and the number drops, it goes.",
        descKo: "시험마다 시작 전에 기준을 정해 둔다. 상담 중간에 친절한 안내를 하나 넣은 적이 있다. 결제 버튼 누름이 떨어졌고, 그날 밤 바로 껐다. 보기 좋아도 숫자가 떨어지면 뺀다.",
      },
      {
        num: "06",
        title: <><em>Cost</em> is part of the design.</>,
        titleKo: "비용도 디자인이다.",
        desc: "A free reading is only free for the reader. Caching the parts of each prompt that never change cut the cost of every free call by 19.5%. Mornings start with one decision, evenings end with a scorecard, and Mondays turn what we learned into next week's plan.",
        descKo: "무료 풀이는 읽는 사람에게만 무료다. 프롬프트에서 바뀌지 않는 부분을 캐시에 올려 무료 호출 한 번의 비용을 19.5% 줄였다. 아침은 결정 하나로 시작하고, 저녁은 성적표로 끝나고, 월요일마다 배운 것을 다음 주 계획으로 옮긴다.",
      },
    ],
  },
];

// Korean sits in its own lines under the English (as in About); these blocks are too long for Ko annotations.
function StepItem({ num, title, titleKo, desc, descKo, delay }: Step & { delay: number }) {
  const { show } = useKorean();
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={styles.item} style={{ transitionDelay: `${delay}s` }}>
      <div className={styles.number}>{num}</div>
      <h3>{title}</h3>
      {show && <div className={styles.titleKo}>{titleKo}</div>}
      <p>{desc}</p>
      {show && <p className={styles.koCopy}>{descKo}</p>}
    </div>
  );
}

export default function Method() {
  const { show } = useKorean();
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.method} id="method">
      <div ref={headerRef} className={styles.header}>
        <h2><Ko ko="만드는 방식" position="bottom-left">How it gets <em>made</em>.</Ko></h2>
        <div className={styles.lede}>
          <p>
            AI made building cheap. It didn't make judgment cheap. So Raymind runs like a small
            company: about fifty agents do the work, numbers make the calls, and I keep the few
            decisions that matter.
          </p>
          {show && (
            <p className={styles.koCopy}>
              AI 덕분에 만드는 건 싸졌다. 판단까지 싸진 건 아니다. 그래서 Raymind는 작은 회사처럼 돌아간다. 일은 에이전트 50여 개가 하고, 판정은 숫자가 하고, 나는 꼭 필요한 몇 가지만 정한다.
            </p>
          )}
        </div>
      </div>
      {groups.map((g) => (
        <div key={g.label} className={styles.group}>
          <div className={`${styles.groupLabel} ${show ? styles.groupLabelKo : ""}`}>{show ? g.labelKo : g.label}</div>
          <div className={styles.grid}>
            {g.steps.map((s, i) => <StepItem key={s.num} {...s} delay={i * 0.1} />)}
          </div>
        </div>
      ))}
    </section>
  );
}
