import { createContext, useContext, useState, type ReactNode } from "react";

const KoreanContext = createContext({ show: false, toggle: () => {} });

export function KoreanProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(() => {
    if (typeof navigator === "undefined") return false;
    // Keep default deterministic: only UI language "ko*" enables KO mode automatically.
    return navigator.language.toLowerCase().startsWith("ko");
  });
  const toggle = () => setShow((s) => !s);
  return (
    <KoreanContext.Provider value={{ show, toggle }}>
      {children}
    </KoreanContext.Provider>
  );
}

export function useKorean() {
  return useContext(KoreanContext);
}
