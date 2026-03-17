import { useEffect, useRef } from "react";
import styles from "./Manifesto.module.css";

const MANIFESTO_TEXT =
  "I keep making things. Some for clients, some for myself, most because the idea wouldn't leave me alone. AI showed up and the gap between \"I should build that\" and \"it's live\" shrank to almost nothing. That's dangerous for someone like me. I have too many *ideas.* And now, not enough *excuses.*";

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const threshold = window.innerHeight * 0.75;
      wordsRef.current.forEach((span) => {
        if (span && span.getBoundingClientRect().top < threshold) {
          span.classList.add(styles.lit);
        }
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
