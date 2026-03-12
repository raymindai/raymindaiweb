import { useEffect, useRef } from "react";
import styles from "./Manifesto.module.css";

const MANIFESTO_TEXT =
  "A year ago, shipping this many projects alone would have been *delusional.* Now it's just how I work. AI changed the math. Not by replacing humans — by removing the walls around what one person can do. I design, I code, I ship. The only bottleneck left is *how fast I can think.*";

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const update = () => {
      const threshold = window.innerHeight * 0.75;
      wordsRef.current.forEach((span) => {
        if (span && span.getBoundingClientRect().top < threshold) {
          span.classList.add(styles.lit);
        }
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const words = MANIFESTO_TEXT.split(" ").map((word, i) => {
    const isEmphasis = word.startsWith("*") && word.endsWith("*");
    const clean = isEmphasis ? word.replace(/\*/g, "") : word;
    const className = `${styles.word}${isEmphasis ? ` ${styles.emphasis}` : ""}`;

    return (
      <span
        key={i}
        ref={(el) => { if (el) wordsRef.current[i] = el; }}
        className={className}
      >
        {clean}{" "}
      </span>
    );
  });

  return (
    <section className={styles.manifesto} id="manifesto">
      <div ref={containerRef} className={styles.text}>
        {words}
      </div>
    </section>
  );
}
