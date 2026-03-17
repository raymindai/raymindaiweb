import { useScrollReveal } from "../hooks/useScrollReveal";
import Ko from "./Ko";
import styles from "./BigQuote.module.css";

export default function BigQuote() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.quote}>
      <div ref={ref} className={styles.inner}>
        <blockquote>
          <Ko ko="작업이 곧 증명이다.">
            The work is the <span className="accent">argument.</span>
          </Ko>
        </blockquote>
      </div>
    </section>
  );
}
