"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const sliderImages = [
  "/images/landing-image-3.png",
  "/images/landing-image-1.png",
];

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["alimentaires", "surgelés", "non surgelés"],
    []
  );
  const titleColors = ["green", "blue", "#ebc834"];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const sliderInterval = useRef<NodeJS.Timeout | null>(null);

  const startSliderTimer = () => {
    if (sliderInterval.current) clearInterval(sliderInterval.current);
    sliderInterval.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % sliderImages.length;
        setProgressKey((k) => k + 1);
        return next;
      });
    }, 10000);
  };

  useEffect(() => {
    startSliderTimer();
    return () => {
      if (sliderInterval.current) clearInterval(sliderInterval.current);
    };
  }, []);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setProgressKey((k) => k + 1);
    startSliderTimer();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber]);

  return (
    <div
      className="relative flex justify-center items-center bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${sliderImages[currentSlide]})`,
        height: "calc(100vh - 20rem)",
      }}
    >
      {/* Barre de progression */}
      <div className="absolute top-0 left-0 w-full h-1 bg-transparent z-20 overflow-hidden">
        <motion.div
          key={progressKey}
          className="h-full bg-[#ebc834]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 10, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto z-10">
        <div className="flex gap-8 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Bienvenue sur notre site
            </Button>
          </div>
          <div className="flex gap-4 flex-col px-4">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">
                Distribution de produits
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    style={{ color: titleColors[index % titleColors.length] }}
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight max-w-2xl text-center text-white">
              HALIL, commerce de gros de produits alimentaire, aide les
              professionnels à simplifier leur approvisionnement avec une
              distribution efficace et adaptée à leurs besoins en Île‑de‑France
            </p>
          </div>

          <div className="flex flex-row gap-3">
            <Button size="lg" variant="outline">
              <Link href={"about"} className="flex items-center gap-2">
                En savoir plus
                <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-[#ebc834] hover:bg-[#dfca70] text-black"
            >
              <Link href={"products"}>Voir nos produits</Link>
            </Button>
          </div>

          {/* Points de navigation */}
          <div className="flex gap-2 mt-6">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Overlay de fond pour meilleur contraste */}
    </div>
  );
}

export { Hero };
