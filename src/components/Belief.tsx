import { useScrollReveal } from "../hooks/useScrollReveal";
import Ko from "./Ko";
import styles from "./Belief.module.css";

const beliefs = [
  {
    num: "01",
    title: <><em>Make</em> it.</>,
    titleKo: "일단 만들어.",
    desc: "If an idea sticks around long enough, it earns the right to exist. I'd rather build a rough version today than a perfect pitch deck next quarter.",
    descKo: "머릿속에서 오래 버티는 아이디어라면 일단 만들어볼 가치가 있다. 다음 분기에 완벽한 기획서를 쓰기보다 오늘 투박한 프로토타입을 내는 쪽을 택한다.",
  },
  {
    num: "02",
    title: <><em>Kill</em> it.</>,
    titleKo: "과감히 접어.",
    desc: "Most of what I start doesn't ship. That's not failure — that's editing. The hard part was never starting. It's knowing when to stop.",
    descKo: "시작한 것 대부분은 출시까지 가지 않는다. 실패라기보다 편집에 가깝다. 진짜 어려운 건 시작이 아니라 멈출 타이밍을 아는 일이다.",
  },
  {
    num: "03",
    title: <><em>Again.</em></>,
    titleKo: "그리고 다시.",
    desc: "Every project I finish leaves behind two new questions. I've learned to trust that rhythm. The work feeds the work.",
    descKo: "하나를 끝내면 늘 새로운 질문 두 개가 남는다. 나는 그 리듬을 믿는다. 작업은 다음 작업을 부른다.",
  },
];

function BeliefItem({ num, title, titleKo, desc, descKo, delay }: {
  num: string; title: React.ReactNode; titleKo: string; desc: string; descKo: string; delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={styles.item} style={{ transitionDelay: `${delay}s` }}>
      <div className={styles.number}>{num}</div>
      <h3><Ko ko={titleKo} position="right" nowrap>{title}</Ko></h3>
      <p><Ko ko={descKo} position="bottom-left" reserve="loose" block>{desc}</Ko></p>
    </div>
  );
}

export default function Belief() {
  return (
    <section className={styles.belief}>
      <div className={styles.grid}>
        {beliefs.map((b, i) => (
          <BeliefItem key={b.num} {...b} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
