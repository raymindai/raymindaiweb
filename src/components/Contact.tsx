import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { submitInquiry } from "../lib/supabase";
import styles from "./Contact.module.css";

export default function Contact() {
  const leftRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLFormElement>();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.type || !form.message) {
      setStatus("error");
      setMessage("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    try {
      await submitInquiry(form);
      setStatus("success");
      setMessage("Sent. We'll be in touch.");
      setForm({ name: "", email: "", type: "", message: "" });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.grid}>
        <div ref={leftRef} className={styles.left}>
          <h2>Say <em>hello.</em></h2>
          <p>
            Whether you're an investor, a potential partner, or someone who looked at this
            and thought — I want to do something like this too. Let's talk.
          </p>
          <a href="mailto:hi@raymind.ai" className={styles.email}>hi@raymind.ai</a>
        </div>
        <form ref={formRef} className={styles.form} style={{ transitionDelay: "0.1s" }} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.field}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label>Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="" disabled>Select</option>
              <option value="Investment">Investment</option>
              <option value="Partnership">Partnership</option>
              <option value="Press">Press</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Message</label>
            <textarea
              rows={3}
              placeholder="Tell us what's on your mind..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button
            type="button"
            className={styles.submit}
            onClick={handleSubmit}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send inquiry"}
          </button>
          {status !== "idle" && (
            <p className={`${styles.msg} ${styles[status]}`}>{message}</p>
          )}
        </form>
      </div>
    </section>
  );
}
