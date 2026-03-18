import { useEffect, useState } from "react";
import { KoreanProvider } from "./hooks/useKorean";
import FluidBackground from "./components/FluidBackground";
import ScrollDistortion from "./components/ScrollDistortion";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Belief from "./components/Belief";
import Products from "./components/Products";
import BigQuote from "./components/BigQuote";
import About from "./components/About";
import Waitlist from "./components/Waitlist";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  };
  return { path, navigate };
}

export default function App() {
  const [fontsReady, setFontsReady] = useState(false);
  const { path, navigate } = useRoute();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href === "/privacy" || href === "/terms") {
        e.preventDefault();
        navigate(href);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  useEffect(() => {
    Promise.all([
      document.fonts.load("300 1em Cormorant Garamond"),
      document.fonts.load("italic 300 1em Cormorant Garamond"),
      document.fonts.load("300 1em Inter"),
      document.fonts.load("500 1em Inter"),
    ]).then(() => setFontsReady(true))
      .catch(() => setFontsReady(true));
  }, []);

  if (!fontsReady) return null;

  const isLegal = path === "/privacy" || path === "/terms";

  return (
    <KoreanProvider>
      <FluidBackground />
      {!isLegal && <ScrollDistortion />}
      <Cursor />
      <Nav />
      <div id="scroll-content">
        <div id="skew-wrapper">
          {path === "/privacy" ? (
            <Privacy />
          ) : path === "/terms" ? (
            <Terms />
          ) : (
            <>
              <Hero />
              <Manifesto />
              <Belief />
              <div className="divider" />
              <Products />
              <BigQuote />
              <div className="divider" />
              <About />
              <Waitlist />
              <div className="divider" />
              <Contact />
            </>
          )}
          <Footer />
        </div>
      </div>
    </KoreanProvider>
  );
}
