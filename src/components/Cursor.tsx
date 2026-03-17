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
      ringX += (mouseX - ringX) * 0.25;
      ringY += (mouseY - ringY) * 0.25;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      animId = requestAnimationFrame(animate);
    };

    const onEnter = () => ring.classList.add(styles.hovering);
    const onLeave = () => ring.classList.remove(styles.hovering);

    // Use event delegation instead of MutationObserver
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", (e) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, select, [data-hover]")) onEnter();
    });
    document.addEventListener("mouseout", (e) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, select, [data-hover]")) onLeave();
    });

    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef} className={styles.dot} />
    </>
  );
}
