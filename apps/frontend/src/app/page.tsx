import AdBar from "@/components/adbar";
import { Faq } from "@/components/faq";
import FeatureHighlights from "@/components/feature-highlights";
import { Footer } from "@/components/footer-section";
import { Navbar } from "@/components/navbar";
import ProductSlider from "@/components/products/ProductSlider";
import { Feature } from "@/components/ui/feature-with-image-carousel";
import { Hero } from "@/components/ui/landing-hero";

export default function Home() {
  return (
    <div>
      <AdBar />
      <Navbar />
      <Hero />
      <ProductSlider />
      <div className="flex flex-col items-center justify-center mx-20">
        <Feature />
        <FeatureHighlights />
        <Faq />
      </div>
      <Footer />
    </div>
  );
}
