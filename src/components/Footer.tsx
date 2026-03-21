import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <div className={styles.logo}>Raymind.AI</div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Products</div>
          <a href="https://pastlife.app">pastlife.app</a>
          <a href="https://screenstyler.ai">screenstyler.ai</a>
          <a href="https://mdfy.cc">mdfy.cc</a>
          <a href="https://mdcore.ai">mdcore.ai</a>
          <a href="https://stiqs.ai">stiqs.ai</a>
          <a href="https://ddalggak.ai">ddalggak.ai</a>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Ideas</div>
          <a href="https://superplane.ai">superplane.ai</a>
          <a href="https://nkdtxt.com">nkdtxt.com</a>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Connect</div>
          <a href="mailto:hi@raymind.ai">hi@raymind.ai</a>
          <a href="https://hyunsangcho.com" target="_blank" rel="noopener noreferrer">hyunsangcho.com</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.legal}>
          <p>&copy; 2026 Raymind.AI LLC All rights reserved.</p>
        </div>
        <div className={styles.links}>
          <a href="/privacy">Privacy Policy</a>
          <span className={styles.sep}>&middot;</span>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>

      <div className={styles.bizInfo}>
        <p>Raymind.AI LLC &middot; Wyoming, USA</p>
        <p>주식회사 레이마인드에이아이 &middot; 대표: 조현상 &middot; 사업자등록번호: 492-10-03068 &middot; (13544) 경기도 성남시 분당구 판교대장로7길 15-15</p>
      </div>
    </footer>
  );
}
