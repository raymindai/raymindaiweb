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

export default function App() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    // Wait for specific fonts to actually load, not just the ready promise
    Promise.all([
      document.fonts.load("300 1em Cormorant Garamond"),
      document.fonts.load("italic 300 1em Cormorant Garamond"),
      document.fonts.load("300 1em Inter"),
      document.fonts.load("500 1em Inter"),
    ]).then(() => setFontsReady(true))
      .catch(() => setFontsReady(true)); // fallback if fonts fail
  }, []);

  if (!fontsReady) return null;

  return (
    <KoreanProvider>
      <FluidBackground />
      <ScrollDistortion />
      <Cursor />
      <Nav />
      <div id="scroll-content">
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
        <Footer />
      </div>
    </KoreanProvider>
  );
}
