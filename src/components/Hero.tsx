import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left - glow.offsetWidth / 2;
      const y = e.clientY - rect.top - glow.offsetHeight / 2;
      glow.style.transform = `translate(${x}px, ${y}px)`;
    };
    section.addEventListener("mousemove", onMouseMove);

    // Trigger animations
    setTimeout(() => {
      linesRef.current.forEach((el, i) => {
        setTimeout(() => el?.classList.add(styles.slideVisible), i * 120);
      });
      footerRef.current?.classList.add(styles.footerVisible);
    }, 200);

    return () => section.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div ref={glowRef} className={styles.glow} />
      <div className={styles.content}>
        <h1>
          {["What happens", "when one person"].map((text, i) => (
            <span key={i} className={styles.slideLine}>
              <span ref={(el) => { if (el) linesRef.current[i] = el; }} className={styles.slideInner}>
                {text}
              </span>
            </span>
          ))}
          <span className={styles.slideLine}>
            <span ref={(el) => { if (el) linesRef.current[2] = el; }} className={styles.slideInner}>
              <em>refuses</em> to <em className="accent">stop.</em>
            </span>
          </span>
        </h1>
      </div>
      <div ref={footerRef} className={styles.footer}>
        <p className={styles.sub}>I build alone. I don't need permission.</p>
      </div>
    </section>
  );
}
