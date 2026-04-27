import { useKorean } from "../hooks/useKorean";
import styles from "./Footer.module.css";

export default function Footer() {
  const { show } = useKorean();
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <img src="/logo.svg" alt="Raymind.AI" className={styles.logoImg} />
          <img src="/logo-circle.png" alt="Raymind.AI" className={styles.logoCircle} />
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Products</div>
          <a href="https://pastlife.app">pastlife.app</a>
          <a href="https://screenstyler.ai">screenstyler.ai</a>
          <a href="https://mdfy.cc">mdfy.cc</a>
          <a href="https://ddalggak.ai">{show ? "ddalggak.ai" : "taptap.studio"}</a>
          <a href="https://jolong.ai">jolong.ai</a>
          <span className={styles.comingSoon}>mdcore.ai — coming soon</span>
          <span className={styles.comingSoon}>stiqs.ai — coming soon</span>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Ideas</div>
          <span className={styles.comingSoon}>superplane.ai — coming soon</span>
          <span className={styles.comingSoon}>nkdtxt.com — coming soon</span>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Connect</div>
          <a href="mailto:hi@raymind.ai">hi@raymind.ai</a>
          <a href="https://hyunsangcho.com" target="_blank" rel="noopener noreferrer">hyunsangcho.com</a>
          <a href="/cv">CV</a>
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
