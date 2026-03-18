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
              Raymind.AI는 개인의 작업들이다. Ray는 내가 보는 방식, Mind는 꺼지지 않는 나의 생각들, AI는 그 속도를 따라잡게 해준 것. 여기 있는 건 전부 그렇게 시작한 것 들이다. 클라이언트도, 브리프도, 부탁도 없다. 그냥 존재했으면 하는 것들이다.
            </p>
          )}
        </div>
        <div ref={col2Ref} className={styles.col} style={{ transitionDelay: "0.1s" }}>
          <p>
            I've spent most of my career building products for others, sometimes for big names,
            sometimes for small ones. That work still lives somewhere.{" "}
            <a href="https://hyunsangcho.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
              See it if you're curious
            </a>.{" "}
            Now I build my own — incorporated in the US and South Korea, open to the right
            conversation if you have one.
          </p>
          {show && (
            <p className={styles.koCopy}>
              오랜시간 다양한 팀과 회사를 위해 제품을 만들어 왔다. 그 중 일부는 알려진 제품이기도 하고 그렇지 않은 것들도 있다. 일부는 아직 사용되고 있기도 하다. 궁금하면 내가 AI를 본격적으로 사용하기 이전 작업들을 확인해봐. 이제는 미국과 한국에 법인을 두고 나의 작업들을 하고있다. 결이 맞다고 생각되면 이야기 해보자.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
