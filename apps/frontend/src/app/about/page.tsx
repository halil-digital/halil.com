import AdBar from "@/components/adbar";
import { Footer } from "@/components/footer-section";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/ui/about-hero";

export default function Home() {
  return (
    <div>
      <AdBar />
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
