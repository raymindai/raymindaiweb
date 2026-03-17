import { useScrollReveal } from "../hooks/useScrollReveal";
import Ko from "./Ko";
import styles from "./BigQuote.module.css";

export default function BigQuote() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.quote}>
      <div ref={ref} className={styles.inner}>
        <blockquote>
          <Ko ko="결과물이 가장 강한 증거다." position="bottom-center" reserve="tight" block>
            The work is the <span className="accent">argument.</span>
          </Ko>
        </blockquote>
      </div>
    </section>
  );
}
