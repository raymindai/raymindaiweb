import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./BigQuote.module.css";

export default function BigQuote() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.quote}>
      <div ref={ref} className={styles.inner}>
        <blockquote>
          I stopped waiting for a<br />team. AI <span className="accent">is</span> the team.
        </blockquote>
      </div>
    </section>
  );
}
