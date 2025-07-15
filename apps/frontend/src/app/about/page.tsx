import { Footer } from "@/components/footer-section";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/ui/about-hero";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
