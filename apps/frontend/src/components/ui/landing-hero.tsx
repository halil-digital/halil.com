"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["alimentaires", "surgelés", "non surgelés"],
    []
  );
  const titleColors = ["green", "blue", "#ebc834"];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div
      className="mx-0 relative flex justify-center items-center bg-no-repeat bg-cover md:bg-center bg-none md:bg-[url('/images/bg-hero.png')]"
      style={{
        height: "calc(100vh - 4rem)",
      }}
    >
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
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
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
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
        </div>
      </div>
    </div>
  );
}

export { Hero };
