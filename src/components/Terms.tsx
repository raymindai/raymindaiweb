import { useKorean } from "../hooks/useKorean";
import styles from "./Legal.module.css";

export default function Terms() {
  const { show } = useKorean();

  return (
    <div className={styles.page}>
      <h1>Terms of Service</h1>
      {show && <p className={styles.ko}>이용약관</p>}
      <p className={styles.updated}>Last updated: March 18, 2026</p>

      <section>
        <h2>1. Agreement</h2>
        {show && <p className={styles.ko}>1. 동의</p>}
        <p>
          By accessing raymind.ai or any of its associated product websites, you agree to these terms.
          If you don't agree, please don't use the site.
        </p>
        {show && (
          <p className={styles.ko}>
            raymind.ai 또는 관련 제품 웹사이트에 접속하면 본 약관에 동의하는 것입니다.
            동의하지 않으면 사이트를 이용하지 마십시오.
          </p>
        )}
      </section>

      <section>
        <h2>2. What We Provide</h2>
        {show && <p className={styles.ko}>2. 제공하는 것</p>}
        <p>
          Raymind.AI builds and operates software products. Some are free, some may be paid.
          Each product may have its own additional terms. This site (raymind.ai) is informational
          and provides a waitlist signup and contact form.
        </p>
        {show && (
          <p className={styles.ko}>
            Raymind.AI는 소프트웨어 제품을 만들고 운영합니다. 일부는 무료, 일부는 유료일 수 있습니다.
            각 제품에는 별도 약관이 적용될 수 있습니다. 본 사이트(raymind.ai)는 정보 제공 및
            대기자 등록, 문의 양식을 제공합니다.
          </p>
        )}
      </section>

      <section>
        <h2>3. Your Responsibilities</h2>
        {show && <p className={styles.ko}>3. 이용자의 책임</p>}
        <ul>
          <li>Provide accurate information when using our forms.</li>
          <li>Don't misuse our services or attempt to interfere with their operation.</li>
          <li>Don't scrape, crawl, or automatically collect data from our sites.</li>
        </ul>
        {show && (
          <ul className={styles.ko}>
            <li>양식 이용 시 정확한 정보를 제공하십시오.</li>
            <li>서비스를 오용하거나 운영을 방해하지 마십시오.</li>
            <li>사이트에서 데이터를 자동 수집하지 마십시오.</li>
          </ul>
        )}
      </section>

      <section>
        <h2>4. Intellectual Property</h2>
        {show && <p className={styles.ko}>4. 지적재산권</p>}
        <p>
          All content on raymind.ai — including text, design, code, and visual elements — is
          owned by Raymind.AI LLC You may not copy, reproduce, or distribute it without permission.
        </p>
        {show && (
          <p className={styles.ko}>
            raymind.ai의 모든 콘텐츠(텍스트, 디자인, 코드, 시각 요소 포함)는
            Raymind.AI LLC의 소유입니다. 허가 없이 복제, 재생산, 배포할 수 없습니다.
          </p>
        )}
      </section>

      <section>
        <h2>5. Limitation of Liability</h2>
        {show && <p className={styles.ko}>5. 책임 제한</p>}
        <p>
          Raymind.AI provides its services "as is." We do our best but make no guarantees about
          availability, accuracy, or fitness for a particular purpose. We are not liable for any
          indirect, incidental, or consequential damages.
        </p>
        {show && (
          <p className={styles.ko}>
            Raymind.AI는 서비스를 "있는 그대로" 제공합니다. 최선을 다하지만 가용성, 정확성,
            특정 목적 적합성에 대해 보장하지 않습니다. 간접적, 부수적, 결과적 손해에 대해
            책임지지 않습니다.
          </p>
        )}
      </section>

      <section>
        <h2>6. Governing Law</h2>
        {show && <p className={styles.ko}>6. 준거법</p>}
        <p>
          These terms are governed by the laws of the Republic of Korea for Korean users,
          and the laws of the State of Wyoming, USA for all other users.
        </p>
        {show && (
          <p className={styles.ko}>
            본 약관은 한국 이용자에게는 대한민국 법률이, 그 외 이용자에게는
            미국 와이오밍주 법률이 적용됩니다.
          </p>
        )}
      </section>

      <section>
        <h2>7. Changes</h2>
        {show && <p className={styles.ko}>7. 변경 사항</p>}
        <p>
          We may update these terms. Continued use of the site after changes constitutes acceptance.
        </p>
        {show && (
          <p className={styles.ko}>
            본 약관은 변경될 수 있습니다. 변경 후 사이트를 계속 이용하면 변경된 약관에 동의하는 것입니다.
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
