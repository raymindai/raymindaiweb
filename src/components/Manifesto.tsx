import { useEffect, useRef } from "react";
import Ko from "./Ko";
import styles from "./Manifesto.module.css";

const MANIFESTO_TEXT =
  "I keep making things. Some for clients, some for myself, most because the idea wouldn't leave me alone. AI showed up and the gap between \"I should build that\" and \"it's live\" shrank to almost nothing. That's dangerous for someone like me. I have too many *ideas.* And now, not enough *excuses.*";

const MANIFESTO_KO =
  "나는 계속 만든다. 어떤 건 클라이언트를 위해, 어떤 건 나를 위해, 대부분은 아이디어가 머릿속을 떠나지 않아서. AI가 나타나고 \"이거 만들어야지\"와 \"출시됐다\" 사이의 간극이 거의 사라졌다. 나 같은 사람에게는 위험한 일이다. 아이디어가 너무 많고, 이제 핑계가 부족하다.";

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
      <Ko ko={MANIFESTO_KO} position="bottom-left" font="serif" block>
        <div ref={containerRef} className={styles.text}>
          {words}
        </div>
      </Ko>
    </section>
  );
}
