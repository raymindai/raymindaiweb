import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.willChange = "filter, transform, opacity";
            requestAnimationFrame(() => {
              entry.target.classList.add("visible");
            });
            const onEnd = () => {
              el.style.willChange = "";
              el.removeEventListener("transitionend", onEnd);
            };
            el.addEventListener("transitionend", onEnd);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
