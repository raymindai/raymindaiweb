import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#" className={styles.logo}>Raymind.AI</a>
      <div className={styles.links}>
        <a href="#products" onClick={(e) => handleClick(e, "#products")}>Products</a>
        <a href="#about" onClick={(e) => handleClick(e, "#about")}>About</a>
        <a href="#contact" onClick={(e) => handleClick(e, "#contact")}>Contact</a>
      </div>
    </nav>
  );
}
