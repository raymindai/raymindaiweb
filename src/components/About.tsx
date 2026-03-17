import { useScrollReveal } from "../hooks/useScrollReveal";
import styles from "./About.module.css";

export default function About() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const col1Ref = useScrollReveal<HTMLParagraphElement>();
  const col2Ref = useScrollReveal<HTMLParagraphElement>();

  return (
    <section className={styles.about} id="about">
      <div ref={headerRef} className={styles.header}>
        <h2>About <em>Raymind.AI</em></h2>
      </div>
      <div className={styles.body}>
        <p ref={col1Ref} className={styles.col}>
          Raymind.AI is just me. <strong>Ray</strong> is how I see things.{" "}
          <strong>Mind</strong> is what I can't turn off. <strong>AI</strong> is what finally let me
          keep up with my own head. I've spent most of my career building products — sometimes for
          others, sometimes with others, always learning what works and what just looks like it does.
          This is where all of that goes now.{" "}
          <a href="https://hyunsangcho.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Previous work
          </a>.
        </p>
        <p ref={col2Ref} className={styles.col} style={{ transitionDelay: "0.1s" }}>
          Incorporated in the US and South Korea. Open to the right conversation — whether
          that's a partnership, a project, or something I haven't thought of yet.
        </p>
      </div>
    </section>
  );
}
