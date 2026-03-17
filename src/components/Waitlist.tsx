import { useState, type FormEvent } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { subscribeEmail } from "../lib/supabase";
import Ko from "./Ko";
import styles from "./Waitlist.module.css";

export default function Waitlist() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const koMessage = (() => {
    if (message === "You're in. Welcome.") return "등록 완료. 반가워요.";
    if (message === "This email is already subscribed.") return "이미 구독 중인 이메일입니다.";
    if (message === "Something went wrong." || message === "Something went wrong. Please try again.") {
      return "문제가 생겼습니다. 잠시 후 다시 시도해 주세요.";
    }
    return "알림";
  })();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      await subscribeEmail(email.trim());
      setStatus("success");
      setMessage("You're in. Welcome.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section className={styles.waitlist}>
      <div ref={ref} className={styles.inner}>
        <h2>Stay <em>close.</em></h2>
        <p className={styles.sub}>
          <Ko ko="뭔가를 출시하면 그때 알려드릴게요. 자주 보내진 않습니다." position="bottom-center" block>
            I send updates when there's something worth your time. Rarely. But when I do, it's because something shipped.
          </Ko>
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Subscribe →"}
          </button>
        </form>
        {status !== "idle" && (
          <p className={`${styles.message} ${styles[status]}`}>
            <Ko ko={koMessage}>{message}</Ko>
          </p>
        )}
        <p className={styles.note}>
          <Ko ko="스팸 메일은 보내지 않습니다." position="bottom-center" reserve="tight" nowrap block>We respect your inbox.</Ko>
        </p>
      </div>
    </section>
  );
}
