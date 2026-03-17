import { useKorean } from "../hooks/useKorean";
import styles from "./Ko.module.css";

interface KoProps {
  ko: string;
  children: React.ReactNode;
  block?: boolean;
  position?: "bottom-right" | "bottom-left";
  font?: "serif" | "sans" | "inherit";
}

export default function Ko({ ko, children, block, position = "bottom-right", font = "inherit" }: KoProps) {
  const { show } = useKorean();

  const posClass = position === "bottom-left" ? styles.bottomLeft : styles.bottomRight;
  const fontClass = font === "serif" ? styles.serif : font === "sans" ? styles.sans : "";

  return (
    <span className={`${styles.wrap} ${block ? styles.block : ""}`}>
      {children}
      <span className={`${styles.annotation} ${posClass} ${fontClass} ${show ? styles.visible : ""}`}>
        {ko}
      </span>
    </span>
  );
}
