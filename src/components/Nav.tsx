import styles from "./Nav.module.css";

export default function Nav() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={styles.nav}>
      <a href="#" className={styles.logo}>Raymind.AI</a>
      <div className={styles.links}>
        <a href="#products" onClick={(e) => handleClick(e, "#products")}>Products</a>
        <a href="#contact" onClick={(e) => handleClick(e, "#contact")}>Inquiries</a>
        <div className={styles.pulse} />
      </div>
    </nav>
  );
}
