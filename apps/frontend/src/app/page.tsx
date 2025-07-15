import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer-section";
import { Navbar } from "@/components/navbar";
import { Feature } from "@/components/ui/feature-with-image-carousel";
import { Hero } from "@/components/ui/landing-hero";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="flex flex-col items-center justify-center mx-20">
        <Feature />
        <Faq />
      </div>
      <Footer />
    </div>
  );
}
