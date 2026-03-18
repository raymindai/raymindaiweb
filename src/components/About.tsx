import { useScrollReveal } from "../hooks/useScrollReveal";
import { useKorean } from "../hooks/useKorean";
import Ko from "./Ko";
import styles from "./About.module.css";

export default function About() {
  const { show } = useKorean();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const col1Ref = useScrollReveal<HTMLDivElement>();
  const col2Ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.about} id="about">
      <div ref={headerRef} className={styles.header}>
        <h2><Ko ko="Raymind.AI 소개" position="bottom-left">About <em>Raymind.AI</em></Ko></h2>
      </div>
      <div className={styles.body}>
        <div ref={col1Ref} className={styles.col}>
          <p>
            Raymind.AI is just me. <strong>Ray</strong> is how I see things.{" "}
            <strong>Mind</strong> is what I can't turn off. <strong>AI</strong> is what finally let me
            keep up with my own head. Everything here is self-initiated — no clients, no briefs,
            no one asking for it. Just things I wanted to exist.
          </p>
          {show && (
            <p className={styles.koCopy}>
              Raymind.AI는 결국 나 혼자 운영하는 작업실이다. 이곳의 모든 프로젝트는 누가 시켜서가 아니라, 내가 존재하길 바랐기 때문에 시작됐다. 클라이언트도, 브리프도, 요청도 없다.
            </p>
          )}
        </div>
        <div ref={col2Ref} className={styles.col} style={{ transitionDelay: "0.1s" }}>
          <p>
            I've spent most of my career building products for others — sometimes for big names,
            sometimes for small ones. That work still lives somewhere.{" "}
            <a href="https://hyunsangcho.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
              See it if you're curious
            </a>.{" "}
            Now I build my own — incorporated in the US and South Korea, open to the right
            conversation if you have one.
          </p>
          {show && (
            <p className={styles.koCopy}>
              오랫동안 다양한 팀과 회사를 위해 제품을 만들어 왔다. 이제는 내 이름으로 만든다. 맥이 맞는 대화라면 언제든 함께할 수 있다.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
