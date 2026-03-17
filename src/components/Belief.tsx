import { useScrollReveal } from "../hooks/useScrollReveal";
import Ko from "./Ko";
import styles from "./Belief.module.css";

const beliefs = [
  {
    num: "01",
    title: <><em>Make</em> it.</>,
    titleKo: "만들어.",
    desc: "If an idea sticks around long enough, it earns the right to exist. I'd rather build a rough version today than a perfect pitch deck next quarter.",
    descKo: "아이디어가 충분히 오래 남아있으면, 존재할 자격이 생긴다.",
  },
  {
    num: "02",
    title: <><em>Kill</em> it.</>,
    titleKo: "죽여.",
    desc: "Most of what I start doesn't ship. That's not failure — that's editing. The hard part was never starting. It's knowing when to stop.",
    descKo: "시작한 것 대부분은 출시되지 않는다. 그건 실패가 아니라 편집이다.",
  },
  {
    num: "03",
    title: <><em>Again.</em></>,
    titleKo: "다시.",
    desc: "Every project I finish leaves behind two new questions. I've learned to trust that rhythm. The work feeds the work.",
    descKo: "끝낸 프로젝트마다 두 개의 새로운 질문이 남는다.",
  },
];

function BeliefItem({ num, title, titleKo, desc, descKo, delay }: {
  num: string; title: React.ReactNode; titleKo: string; desc: string; descKo: string; delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={styles.item} style={{ transitionDelay: `${delay}s` }}>
      <div className={styles.number}>{num}</div>
      <h3><Ko ko={titleKo}>{title}</Ko></h3>
      <p><Ko ko={descKo}>{desc}</Ko></p>
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
