import { useEffect, useRef } from "react";

export default function ScrollDistortion() {
  const lastScroll = useRef(0);
  const currentSkew = useRef(0);
  const targetSkew = useRef(0);
  const currentChroma = useRef(0);
  const targetChroma = useRef(0);
  const animId = useRef(0);

  useEffect(() => {
    const scrollContent = document.getElementById("scroll-content");
    const skewWrapper = document.getElementById("skew-wrapper");
    const rShift = document.getElementById("r-shift");
    const bShift = document.getElementById("b-shift");
    if (!scrollContent || !skewWrapper || !rShift || !bShift) return;

    // Chromatic on scroll-content (doesn't affect layout)
    scrollContent.style.filter = "url(#chromatic)";

    // Skew wrapper should not affect scroll height
    skewWrapper.style.willChange = "transform";

    let mouseX = window.innerWidth / 2;

    const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; };
    const onTouchStart = (e: TouchEvent) => { mouseX = e.touches[0].clientX; };

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

      const side = (mouseX / window.innerWidth - 0.5) * 2;
      const absDelta = Math.abs(delta);
      const scaled = delta * absDelta * -0.008 * side;
      targetSkew.current = Math.max(-8, Math.min(8, scaled));
      targetChroma.current = Math.min(absDelta * 0.2, 4);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchstart", onTouchStart, { passive: true });

    const animate = () => {
      currentSkew.current += (targetSkew.current - currentSkew.current) * 0.08;
      currentChroma.current += (targetChroma.current - currentChroma.current) * 0.1;
      targetSkew.current *= 0.92;
      targetChroma.current *= 0.75;

      // Skew on inner wrapper only — doesn't affect scroll height
      if (Math.abs(currentSkew.current) > 0.05) {
        skewWrapper.style.transform = `skewY(${currentSkew.current}deg)`;
      } else {
        currentSkew.current = 0;
        skewWrapper.style.transform = "";
      }

      const offset = 1.2 + currentChroma.current;
      rShift.setAttribute("dx", String(offset));
      bShift.setAttribute("dx", String(-offset));

      animId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    animId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchstart", onTouchStart);
      cancelAnimationFrame(animId.current);
      skewWrapper.style.transform = "";
      scrollContent.style.filter = "";
      rShift.setAttribute("dx", "1.2");
      bShift.setAttribute("dx", "-1.2");
    };
  }, []);

  return null;
}
