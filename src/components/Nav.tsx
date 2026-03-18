import { useEffect, useState } from "react";
import { useKorean } from "../hooks/useKorean";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { show, toggle } = useKorean();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLogo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <a href="/" className={styles.logo} onClick={handleLogo}>Raymind.AI</a>
      <div className={styles.links}>
        <a href="#products" onClick={(e) => handleClick(e, "#products")}>Products</a>
        <a href="#about" onClick={(e) => handleClick(e, "#about")}>About</a>
        <a href="#contact" onClick={(e) => handleClick(e, "#contact")}>Contact</a>
        <button className={`${styles.langToggle} ${show ? styles.langActive : ""}`} onClick={toggle}>
          KO
        </button>
      </div>
    </nav>
  );
}
