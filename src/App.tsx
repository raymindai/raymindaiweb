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
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Manifesto />
      <div className="divider" />
      <Belief />
      <div className="divider" />
      <Products />
      <div className="divider" />
      <BigQuote />
      <div className="divider" />
      <About />
      <div className="divider" style={{ marginTop: "16rem" }} />
      <Waitlist />
      <div className="divider" />
      <Contact />
      <Footer />
    </>
  );
}
