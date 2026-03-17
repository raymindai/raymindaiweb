import { useEffect, useRef } from "react";

export default function ScrollDistortion() {
  const lastScroll = useRef(0);
  const currentSkew = useRef(0);
  const targetSkew = useRef(0);
  const currentChroma = useRef(0);
  const targetChroma = useRef(0);
  const animId = useRef(0);

  useEffect(() => {
    const wrapper = document.getElementById("scroll-content");
    const rShift = document.getElementById("r-shift");
    const bShift = document.getElementById("b-shift");
    if (!wrapper || !rShift || !bShift) return;

    // Base chromatic always on
    wrapper.style.filter = "url(#chromatic)";

    const onScroll = () => {
      const current = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const delta = current - lastScroll.current;
      lastScroll.current = current;

      if (current < 10 || current > maxScroll - 10) {
        targetSkew.current *= 0.3;
        targetChroma.current *= 0.3;
        return;
      }

      const absDelta = Math.abs(delta);
      const scaled = delta * absDelta * 0.008;
      targetSkew.current = Math.max(-8, Math.min(8, scaled));
      targetChroma.current = Math.min(absDelta * 0.2, 4);
    };

    const animate = () => {
      currentSkew.current += (targetSkew.current - currentSkew.current) * 0.08;
      currentChroma.current += (targetChroma.current - currentChroma.current) * 0.1;
      targetSkew.current *= 0.92;
      targetChroma.current *= 0.75;

      // Skew
      if (Math.abs(currentSkew.current) > 0.05) {
        wrapper.style.transform = `skewY(${currentSkew.current}deg)`;
      } else {
        currentSkew.current = 0;
        wrapper.style.transform = "";
      }

      // Chromatic: base 1.2 + scroll-based boost
      const offset = 1.2 + currentChroma.current;
      rShift.setAttribute("dx", String(offset));
      bShift.setAttribute("dx", String(-offset));

      animId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    animId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId.current);
      wrapper.style.transform = "";
      wrapper.style.filter = "";
      rShift.setAttribute("dx", "1.2");
      bShift.setAttribute("dx", "-1.2");
    };
  }, []);

  return null;
}
