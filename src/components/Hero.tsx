import { useEffect, useRef, useCallback } from "react";
import Ko from "./Ko";
import styles from "./Hero.module.css";

const MAX_DISPLACE = 60;
const HERO_KO = "한 사람이 멈추지 않는다면, 어떤 일이 벌어질까.";

export default function Hero() {
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const resetTimerRef = useRef<number | null>(null);

  const shuffleBlur = useCallback(() => {
    for (const char of charsRef.current) {
      if (!char) continue;
      const blur = Math.random() > 0.35 ? 0 : 0.5 + Math.random() * 2.5;
      char.style.filter = `blur(${blur}px)`;
      char.style.transition = `filter ${2 + Math.random() * 3}s var(--ease)`;
    }
  }, []);

  useEffect(() => {
    // Initial random blur (before slide-up, already on chars)
    for (const char of charsRef.current) {
      if (!char) continue;
      const blur = Math.random() > 0.4 ? 0 : 0.5 + Math.random() * 2;
      char.style.filter = `blur(${blur}px)`;
    }

    setTimeout(() => {
      linesRef.current.forEach((el, i) => {
        setTimeout(() => el?.classList.add(styles.slideVisible), i * 180);
      });
    }, 300);

    // Continuously reshuffle blur
    const interval = setInterval(shuffleBlur, 4000);
    return () => clearInterval(interval);
  }, [shuffleBlur]);

  const applyTransform = (char: HTMLSpanElement) => {
    const tx = parseFloat(char.dataset.tx || "0");
    const ty = parseFloat(char.dataset.ty || "0");
    const rot = parseFloat(char.dataset.rot || "0");
    char.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    const chars = charsRef.current;
    if (!chars.length) return;

    const radius = 100;
    const strength = 8;

    for (const char of chars) {
      if (!char) continue;
      const rect = char.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const force = (1 - dist / radius) * strength;
        const angle = Math.atan2(dy, dx);

        let tx = parseFloat(char.dataset.tx || "0") + Math.cos(angle) * force * 0.12;
        let ty = parseFloat(char.dataset.ty || "0") + Math.sin(angle) * force * 0.12;
        let rot = parseFloat(char.dataset.rot || "0") + (Math.random() - 0.5) * force * 0.4;

        // Clamp displacement
        const totalDisp = Math.sqrt(tx * tx + ty * ty);
        if (totalDisp > MAX_DISPLACE) {
          const scale = MAX_DISPLACE / totalDisp;
          tx *= scale;
          ty *= scale;
        }
        rot = Math.max(-25, Math.min(25, rot));

        char.dataset.tx = String(tx);
        char.dataset.ty = String(ty);
        char.dataset.rot = String(rot);
        char.style.transition = "transform 0.05s linear";
        applyTransform(char);
      }
    }
  }, []);

  const explodeChars = useCallback(() => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    for (const char of charsRef.current) {
      if (!char) continue;
      const tx = (Math.random() - 0.5) * 300;
      const ty = (Math.random() - 0.5) * 200;
      const rot = (Math.random() - 0.5) * 90;
      const blur = 1 + Math.random() * 4;
      char.dataset.tx = String(tx);
      char.dataset.ty = String(ty);
      char.dataset.rot = String(rot);
      char.style.transition = "transform 0.8s var(--ease), filter 0.8s var(--ease), opacity 0.8s";
      char.style.filter = `blur(${blur}px)`;
      char.style.opacity = String(0.2 + Math.random() * 0.5);
      applyTransform(char);
    }

    resetTimerRef.current = window.setTimeout(() => {
      for (const char of charsRef.current) {
        if (!char) continue;
        char.dataset.tx = "0";
        char.dataset.ty = "0";
        char.dataset.rot = "0";
        char.style.transition = "transform 1.2s var(--ease), filter 1.2s var(--ease), opacity 1.2s var(--ease)";
        char.style.opacity = "";
        applyTransform(char);
      }
      // Restore random blur after return
      setTimeout(shuffleBlur, 1300);
      resetTimerRef.current = null;
    }, 2000);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("click", explodeChars);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", explodeChars);
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, [onMouseMove, explodeChars]);

  let charIdx = 0;

  function renderText(text: string) {
    return text.split(" ").map((word, wordIdx) => (
      <span key={wordIdx} className={styles.word}>
        {word.split("").map((char) => {
          const idx = charIdx++;
          return (
            <span
              key={idx}
              ref={(el) => { if (el) charsRef.current[idx] = el; }}
              className={styles.char}
            >
              {char}
            </span>
          );
        })}
      </span>
    ));
  }

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.content}>
        <h1>
          <span className={styles.line}>
            <span ref={(el) => { if (el) linesRef.current[0] = el; }} className={styles.lineInner}>
              {renderText("What happens")}
            </span>
          </span>
          <span className={styles.line}>
            <span ref={(el) => { if (el) linesRef.current[1] = el; }} className={styles.lineInner}>
              {renderText("when one person")}
            </span>
          </span>
          <Ko ko={renderText(HERO_KO)} position="bottom-left" block>
            <span className={styles.line}>
              <span ref={(el) => { if (el) linesRef.current[2] = el; }} className={styles.lineInner}>
                <em>{renderText("refuses to")}</em> <em className="accent">{renderText("stop.")}</em>
              </span>
            </span>
          </Ko>
        </h1>
      </div>
    </section>
  );
}
