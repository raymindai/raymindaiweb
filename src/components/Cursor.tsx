import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.09;
      ringY += (mouseY - ringY) * 0.09;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      animId = requestAnimationFrame(animate);
    };

    const onEnter = () => ring.classList.add(styles.hovering);
    const onLeave = () => ring.classList.remove(styles.hovering);

    document.addEventListener("mousemove", onMouseMove);
    animId = requestAnimationFrame(animate);

    const interactives = document.querySelectorAll("a, button, select, [data-hover]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Re-observe on DOM changes for dynamically added elements
    const mutationObs = new MutationObserver(() => {
      document.querySelectorAll("a, button, select, [data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
      mutationObs.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef} className={styles.dot} />
    </>
  );
}
