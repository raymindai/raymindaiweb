import { createContext, useContext, useState, type ReactNode } from "react";

const KoreanContext = createContext({ show: false, toggle: () => {} });

export function KoreanProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
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
