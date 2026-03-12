import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <div className={styles.logo}>Raymind.AI</div>
          <p className={styles.tagline}>Vision &middot; Mind &middot; AI</p>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Products</div>
          <a href="https://pastlife.app">PastLife</a>
          <a href="https://screenstyler.ai">ScreenStyler</a>
          <a href="https://stiqs.ai">Stiqs</a>
          <a href="https://ddalggak.ai">Ddalggak</a>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Ideas</div>
          <a href="https://mdcore.ai">mdcore.ai</a>
          <a href="https://mdfy.cc">mdfy.cc</a>
          <a href="https://superplane.ai">superplane.ai</a>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Connect</div>
          <a href="mailto:hi@raymind.ai">hi@raymind.ai</a>
          <a href="https://hyunsangcho.com" target="_blank" rel="noopener noreferrer">hyunsangcho.com</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.legal}>
          <p>&copy; 2026 Raymind.AI Inc. All rights reserved.</p>
          <p>Registered in the United States and South Korea.</p>
        </div>
      </div>
    </footer>
  );
}
