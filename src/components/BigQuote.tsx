import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./BigQuote.module.css";

export default function BigQuote() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.quote}>
      <div ref={ref} className={styles.inner}>
        <blockquote>
          The work is the <span className="accent">argument.</span>
        </blockquote>
      </div>
    </section>
  );
}
