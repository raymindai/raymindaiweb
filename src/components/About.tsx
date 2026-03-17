import { useScrollReveal } from "../hooks/useScrollReveal";
import Ko from "./Ko";
import styles from "./About.module.css";

export default function About() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const col1Ref = useScrollReveal<HTMLParagraphElement>();
  const col2Ref = useScrollReveal<HTMLParagraphElement>();

  return (
    <section className={styles.about} id="about">
      <div ref={headerRef} className={styles.header}>
        <h2><Ko ko="Raymind.AI에 대하여">About <em>Raymind.AI</em></Ko></h2>
      </div>
      <div className={styles.body}>
        <p ref={col1Ref} className={styles.col}>
          <Ko ko="Raymind.AI는 나 혼자다. 여기 있는 모든 것은 자발적으로 시작한 프로젝트다. 클라이언트도, 브리프도, 요청한 사람도 없다.">
            Raymind.AI is just me. <strong>Ray</strong> is how I see things.{" "}
            <strong>Mind</strong> is what I can't turn off. <strong>AI</strong> is what finally let me
            keep up with my own head. Everything here is self-initiated — no clients, no briefs,
            no one asking for it. Just things I wanted to exist.
          </Ko>
        </p>
        <p ref={col2Ref} className={styles.col} style={{ transitionDelay: "0.1s" }}>
          <Ko ko="오랫동안 다른 사람들의 제품을 만들어왔다. 이제는 내 것을 만든다. 같이 만들 수도 있다.">
            I've spent most of my career building products for others — sometimes for big names,
            sometimes for small ones. That work still lives somewhere.{" "}
            <a href="https://hyunsangcho.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
              See it if you're curious
            </a>.{" "}
            Now I build my own — incorporated in the US and South Korea, open to the right
            conversation if you have one.
          </Ko>
        </p>
      </div>
    </section>
  );
}
