import { createContext, useContext, useState, type ReactNode } from "react";

const KoreanContext = createContext({ show: false, toggle: () => {} });

export function KoreanProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(() => {
    if (typeof navigator === "undefined") return false;
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    return langs.some((lang) => lang.toLowerCase().startsWith("ko"));
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
