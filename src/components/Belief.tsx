import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./Belief.module.css";

const beliefs = [
  {
    num: "01",
    title: <><em>Make</em> it.</>,
    desc: "If an idea sticks around long enough, it earns the right to exist. I'd rather build a rough version today than a perfect pitch deck next quarter.",
  },
  {
    num: "02",
    title: <><em>Kill</em> it.</>,
    desc: "Most of what I start doesn't ship. That's not failure — that's editing. The hard part was never starting. It's knowing when to stop.",
  },
  {
    num: "03",
    title: <><em>Again.</em></>,
    desc: "Every project I finish leaves behind two new questions. I've learned to trust that rhythm. The work feeds the work.",
  },
];

function BeliefItem({ num, title, desc, delay }: { num: string; title: React.ReactNode; desc: string; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={styles.item} style={{ transitionDelay: `${delay}s` }}>
      <div className={styles.number}>{num}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
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
