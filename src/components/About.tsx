import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./About.module.css";

export default function About() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const col1Ref = useScrollReveal<HTMLParagraphElement>();
  const col2Ref = useScrollReveal<HTMLParagraphElement>();

  return (
    <section className={styles.about}>
      <div ref={headerRef} className={styles.header}>
        <h2>I'm not limited.<br />I'm <em>proving something.</em></h2>
      </div>
      <div className={styles.body}>
        <p ref={col1Ref} className={styles.col}>
          20+ years across three continents. I've led product and design at{" "}
          <strong>Humain</strong>, <strong>Saudi Aramco</strong>, <strong>Kakao</strong>, and{" "}
          <strong>Devsisters</strong>. Built experiences for <strong>Nike</strong>,{" "}
          <strong>Volvo</strong>, and <strong>Barclays</strong> at AKQA. Shipped a spatial computing
          product with <strong>Meta</strong>. Studied at <strong>Central Saint Martins</strong> and{" "}
          <strong>Goldsmiths</strong> in London. Then I chose to build alone.{" "}
          <a href="https://hyunsangcho.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            See my earlier work
          </a>.
        </p>
        <p ref={col2Ref} className={styles.col} style={{ transitionDelay: "0.1s" }}>
          Incorporated in both the US and South Korea, global from day one. This isn't about doing
          more with less. It's about{" "}
          <strong>proving that one person with AI can build an entire company.</strong> Products
          launched, more in the pipeline — not because it's easy, but because AI finally let me push
          that far.
        </p>
      </div>
    </section>
  );
}
