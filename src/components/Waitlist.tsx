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
        <h2><Ko ko="가까이.">Stay <em>close.</em></Ko></h2>
        <p className={styles.sub}>
          <Ko ko="뭔가 출시되면 그때 알려드립니다. 자주는 아닙니다.">
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
          <p className={`${styles.message} ${styles[status]}`}>{message}</p>
        )}
        <p className={styles.note}>We respect your inbox.</p>
      </div>
    </section>
  );
}
