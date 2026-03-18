import { useKorean } from "../hooks/useKorean";
import styles from "./Legal.module.css";

export default function Privacy() {
  const { show } = useKorean();

  return (
    <div className={styles.page}>
      <h1>Privacy Policy</h1>
      {show && <p className={styles.ko}>개인정보처리방침</p>}
      <p className={styles.updated}>Last updated: March 18, 2026</p>

      <section>
        <h2>1. Who We Are</h2>
        {show && <p className={styles.ko}>1. 우리는 누구인가</p>}
        <p>
          Raymind.AI LLC ("Raymind.AI," "we," "us") operates raymind.ai and its associated
          product websites. We are incorporated in Wyoming, USA and South Korea
          (주식회사 레이마인드에이아이, representative: Hyunsang Cho, business registration: 492-10-03068).
        </p>
        {show && (
          <p className={styles.ko}>
            Raymind.AI LLC("Raymind.AI", "당사")는 raymind.ai 및 관련 제품 웹사이트를 운영합니다.
            미국 와이오밍주와 대한민국에 법인을 두고 있습니다
            (주식회사 레이마인드에이아이, 대표: 조현상, 사업자등록번호: 492-10-03068).
          </p>
        )}
      </section>

      <section>
        <h2>2. What We Collect</h2>
        {show && <p className={styles.ko}>2. 수집하는 정보</p>}
        <p>We collect only what you give us directly:</p>
        {show && <p className={styles.ko}>당사는 귀하가 직접 제공하는 정보만 수집합니다:</p>}
        <ul>
          <li><strong>Email address</strong> — when you subscribe to our waitlist.</li>
          <li><strong>Name, email, inquiry type, and message</strong> — when you submit the contact form.</li>
        </ul>
        {show && (
          <ul className={styles.ko}>
            <li><strong>이메일 주소</strong> — 뉴스레터 구독 시.</li>
            <li><strong>이름, 이메일, 문의 유형, 메시지</strong> — 문의 양식 제출 시.</li>
          </ul>
        )}
        <p>
          We do not use cookies for tracking. We do not use third-party analytics.
          We do not sell, share, or rent your data to anyone.
        </p>
        {show && (
          <p className={styles.ko}>
            추적 목적의 쿠키를 사용하지 않습니다. 제3자 분석 도구를 사용하지 않습니다.
            귀하의 데이터를 누구에게도 판매, 공유, 대여하지 않습니다.
          </p>
        )}
      </section>

      <section>
        <h2>3. How We Use Your Data</h2>
        {show && <p className={styles.ko}>3. 정보 이용 목적</p>}
        <ul>
          <li>To send product updates to waitlist subscribers.</li>
          <li>To respond to inquiries submitted through the contact form.</li>
        </ul>
        {show && (
          <ul className={styles.ko}>
            <li>구독자에게 제품 업데이트를 보내기 위해.</li>
            <li>문의 양식으로 접수된 문의에 답변하기 위해.</li>
          </ul>
        )}
        <p>That's it. No profiling, no advertising, no secondary use.</p>
        {show && <p className={styles.ko}>그게 전부입니다. 프로파일링, 광고, 2차 이용 없음.</p>}
      </section>

      <section>
        <h2>4. Where We Store Your Data</h2>
        {show && <p className={styles.ko}>4. 데이터 저장 위치</p>}
        <p>
          Your data is stored in Supabase (hosted on AWS). Servers are located in the United States.
          Data is encrypted in transit (TLS) and at rest.
        </p>
        {show && (
          <p className={styles.ko}>
            데이터는 Supabase(AWS 호스팅)에 저장됩니다. 서버는 미국에 위치합니다.
            전송 중(TLS) 및 저장 중 암호화됩니다.
          </p>
        )}
      </section>

      <section>
        <h2>5. Your Rights</h2>
        {show && <p className={styles.ko}>5. 귀하의 권리</p>}
        <p>You can request to:</p>
        {show && <p className={styles.ko}>귀하는 다음을 요청할 수 있습니다:</p>}
        <ul>
          <li>See what data we have about you.</li>
          <li>Correct or update your data.</li>
          <li>Delete your data entirely.</li>
          <li>Unsubscribe from the waitlist at any time.</li>
        </ul>
        {show && (
          <ul className={styles.ko}>
            <li>보유 중인 개인정보 열람.</li>
            <li>개인정보 정정 또는 갱신.</li>
            <li>개인정보 완전 삭제.</li>
            <li>언제든 뉴스레터 구독 해지.</li>
          </ul>
        )}
        <p>
          Email <a href="mailto:hi@raymind.ai">hi@raymind.ai</a> and we'll handle it promptly.
        </p>
        {show && (
          <p className={styles.ko}>
            <a href="mailto:hi@raymind.ai">hi@raymind.ai</a>로 이메일 주시면 신속히 처리합니다.
          </p>
        )}
      </section>

      <section>
        <h2>6. Data Retention</h2>
        {show && <p className={styles.ko}>6. 보유 기간</p>}
        <p>
          Waitlist emails are kept until you unsubscribe or request deletion.
          Contact form submissions are kept for up to 2 years, then deleted.
        </p>
        {show && (
          <p className={styles.ko}>
            뉴스레터 이메일은 구독 해지 또는 삭제 요청 시까지 보관합니다.
            문의 양식 데이터는 최대 2년간 보관 후 삭제합니다.
          </p>
        )}
      </section>

      <section>
        <h2>7. Changes</h2>
        {show && <p className={styles.ko}>7. 변경 사항</p>}
        <p>
          We may update this policy. Changes will be posted on this page with an updated date.
        </p>
        {show && (
          <p className={styles.ko}>
            본 방침은 변경될 수 있으며, 변경 시 이 페이지에 업데이트 날짜와 함께 게시됩니다.
          </p>
        )}
      </section>

      <section>
        <h2>8. Contact</h2>
        {show && <p className={styles.ko}>8. 연락처</p>}
        <p>
          Raymind.AI LLC<br />
          Email: <a href="mailto:hi@raymind.ai">hi@raymind.ai</a>
        </p>
        {show && (
          <p className={styles.ko}>
            (13544) 경기도 성남시 분당구 판교대장로7길 15-15
          </p>
        )}
      </section>
    </div>
  );
}
