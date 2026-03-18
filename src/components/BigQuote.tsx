import { useCallback, useEffect, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Ko from "./Ko";
import styles from "./BigQuote.module.css";

const MAX_DISPLACE = 40;

export default function BigQuote() {
  const ref = useScrollReveal<HTMLDivElement>();
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const resetTimerRef = useRef<number | null>(null);

  const applyTransform = (char: HTMLSpanElement) => {
    const tx = parseFloat(char.dataset.tx || "0");
    const ty = parseFloat(char.dataset.ty || "0");
    const rot = parseFloat(char.dataset.rot || "0");
    char.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
  };

  const shuffleBlur = useCallback(() => {
    for (const char of charsRef.current) {
      if (!char) continue;
      const blur = Math.random() > 0.45 ? 0 : 0.4 + Math.random() * 2;
      char.style.filter = `blur(${blur}px)`;
      char.style.transition = `filter ${1.8 + Math.random() * 2.5}s var(--ease)`;
    }
  }, []);

  useEffect(() => {
    for (const char of charsRef.current) {
      if (!char) continue;
      const blur = Math.random() > 0.5 ? 0 : 0.4 + Math.random() * 1.8;
      char.style.filter = `blur(${blur}px)`;
    }
    const interval = setInterval(shuffleBlur, 4000);
    return () => clearInterval(interval);
  }, [shuffleBlur]);

  const onPointerMove = useCallback((e: PointerEvent) => {
    const quote = quoteRef.current;
    if (!quote) return;

    const quoteRect = quote.getBoundingClientRect();
    if (e.clientX < quoteRect.left - 40 || e.clientX > quoteRect.right + 40 || e.clientY < quoteRect.top - 40 || e.clientY > quoteRect.bottom + 40) {
      return;
    }

    const radius = 95;
    const strength = 7;
    for (const char of charsRef.current) {
      if (!char) continue;
      const rect = char.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= radius) continue;

      const force = (1 - dist / radius) * strength;
      const angle = Math.atan2(dy, dx);
      let tx = parseFloat(char.dataset.tx || "0") + Math.cos(angle) * force * 0.1;
      let ty = parseFloat(char.dataset.ty || "0") + Math.sin(angle) * force * 0.1;
      let rot = parseFloat(char.dataset.rot || "0") + (Math.random() - 0.5) * force * 0.35;

      const totalDisp = Math.sqrt(tx * tx + ty * ty);
      if (totalDisp > MAX_DISPLACE) {
        const scale = MAX_DISPLACE / totalDisp;
        tx *= scale;
        ty *= scale;
      }
      rot = Math.max(-18, Math.min(18, rot));

      char.dataset.tx = String(tx);
      char.dataset.ty = String(ty);
      char.dataset.rot = String(rot);
      char.style.transition = "transform 0.06s linear";
      applyTransform(char);
    }
  }, []);

  const explodeChars = useCallback(() => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    for (const char of charsRef.current) {
      if (!char) continue;
      const tx = (Math.random() - 0.5) * 180;
      const ty = (Math.random() - 0.5) * 120;
      const rot = (Math.random() - 0.5) * 70;
      const blur = 0.8 + Math.random() * 3;
      char.dataset.tx = String(tx);
      char.dataset.ty = String(ty);
      char.dataset.rot = String(rot);
      char.style.transition = "transform 0.7s var(--ease), filter 0.7s var(--ease), opacity 0.7s";
      char.style.filter = `blur(${blur}px)`;
      char.style.opacity = String(0.25 + Math.random() * 0.5);
      applyTransform(char);
    }

    resetTimerRef.current = window.setTimeout(() => {
      for (const char of charsRef.current) {
        if (!char) continue;
        char.dataset.tx = "0";
        char.dataset.ty = "0";
        char.dataset.rot = "0";
        char.style.transition = "transform 1.1s var(--ease), filter 1.1s var(--ease), opacity 1.1s var(--ease)";
        char.style.opacity = "";
        applyTransform(char);
      }
      setTimeout(shuffleBlur, 1200);
      resetTimerRef.current = null;
    }, 1700);
  }, [shuffleBlur]);

  useEffect(() => {
    const quote = quoteRef.current;
    if (!quote) return;
    quote.addEventListener("pointermove", onPointerMove);
    quote.addEventListener("click", explodeChars);
    return () => {
      quote.removeEventListener("pointermove", onPointerMove);
      quote.removeEventListener("click", explodeChars);
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, [onPointerMove, explodeChars]);

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
    <section className={styles.quote}>
      <div ref={ref} className={styles.inner}>
        <blockquote ref={quoteRef}>
          <Ko ko="결과물이 곧 증명이다." position="bottom-center" reserve="tight" block>
            {renderText("The work is the")} <span className="accent">{renderText("argument.")}</span>
          </Ko>
        </blockquote>
      </div>
    </section>
  );
}
