import { useKorean } from "../hooks/useKorean";
import styles from "./Ko.module.css";

interface KoProps {
  ko: React.ReactNode;
  children: React.ReactNode;
  block?: boolean;
  position?: "bottom-right" | "bottom-left" | "bottom-center" | "right";
  reserve?: "auto" | "tight" | "loose" | "none";
  nowrap?: boolean;
}

export default function Ko({ ko, children, block, position = "bottom-right", reserve = "auto", nowrap = false }: KoProps) {
  const { show } = useKorean();

  const posClass = position === "bottom-left"
    ? styles.bottomLeft
    : position === "bottom-center"
      ? styles.bottomCenter
    : position === "right"
      ? styles.right
      : styles.bottomRight;

  const reserveClass = show && block
    ? reserve === "none"
      ? ""
      : reserve === "loose"
        ? styles.reserveLoose
      : reserve === "tight"
        ? styles.reserveTight
        : position === "bottom-center"
          ? styles.reserveTight
          : position !== "right"
            ? styles.reserve
            : ""
    : "";

  const nowrapClass = nowrap ? styles.nowrap : "";

  return (
    <span className={`${styles.wrap} ${block ? styles.block : ""} ${reserveClass}`}>
      {children}
      <span className={`${styles.annotation} ${posClass} ${nowrapClass} ${show ? styles.visible : ""}`}>
        {ko}
      </span>
    </span>
  );
}
