import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/home/Hero";
import Capabilities from "./components/home/Capabilities";
import FunctionsBrowser from "./components/home/FunctionsBrowser";
import Pricing from "./components/home/Pricing";
import Industries from "./components/home/Industries";
import Faq from "./components/home/Faq";
import Contact from "./components/home/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Capabilities />
        <FunctionsBrowser />
        <Pricing />
        <Industries />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
