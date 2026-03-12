import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./Belief.module.css";

const beliefs = [
  {
    num: "01",
    title: <>AI is not a tool.<br />It's a <em>co-founder.</em></>,
    desc: "I don't use AI to speed things up. I use it to do things that were never possible alone. Strategy, design, engineering, marketing — the entire stack, reimagined for a team of one.",
  },
  {
    num: "02",
    title: <>Experience is the<br /><em>unfair advantage.</em></>,
    desc: "Two decades of building products across three continents taught me what matters. AI handles the execution. I bring the taste, the instinct, and the scars from shipping real things to real people.",
  },
  {
    num: "03",
    title: <>Ship it. Learn.<br /><em>Ship again.</em></>,
    desc: "Every product starts as a question: what if one person could? No pitch decks, no committees, no waiting. An idea in the morning, a prototype by night, users by the weekend.",
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
