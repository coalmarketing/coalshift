import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { metadataFor } from "./lib/seo";
import Hero from "./components/home/Hero";
import Capabilities from "./components/home/Capabilities";
import FunctionsBrowser from "./components/home/FunctionsBrowser";
import ProductGallery from "./components/home/ProductGallery";
import Pricing from "./components/home/Pricing";
import Industries from "./components/home/Industries";
import Faq from "./components/home/Faq";
import Contact from "./components/home/Contact";

export const metadata: Metadata = metadataFor("/");

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Capabilities />
        <FunctionsBrowser />
        <ProductGallery />
        <Pricing />
        <Industries />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
