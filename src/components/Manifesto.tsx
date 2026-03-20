import { useEffect, useRef } from "react";
import Ko from "./Ko";
import styles from "./Manifesto.module.css";

const MANIFESTO_TEXT =
  "I keep making things. Some for clients, some for myself, most because the idea wouldn't leave me alone. AI showed up and the gap between \"I should build that\" and \"it's live\" shrank to almost nothing. That's dangerous for someone like me. I have too many *ideas.* And now, not enough *excuses.*";

const MANIFESTO_KO =
  "나는 계속 뭔가를 만든다. 어떤 건 클라이언트를 위한 것이고, 어떤 것은 나를 위해. 나를 위한 것의 대부분은 아이디어가 머릿속에서 떠나지 않아서 만든다. AI가 등장한 이후로 \"이거 만들어야지!\"와 \"출시했다!\" 사이의 거리는 거의 사라져버렸다. 나 같은 사람에게는 꽤 위험한 변화다. 아이디어는 넘치는데, 이제는 핑계가 없다.";

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
      <Ko ko={MANIFESTO_KO} position="bottom-left" block koStyle={{ maxWidth: "60rem" }}>
        <div ref={containerRef} className={styles.text}>
          {words}
        </div>
      </Ko>
    </section>
  );
}
