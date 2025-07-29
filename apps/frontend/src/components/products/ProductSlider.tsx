"use client";

import { Product, products } from "@/data/products";
import Image from "next/image";
import { useEffect, useState } from "react";

const productNamesToShow = [
  "Excellence, Frites 9/9 mm",
  "Ekin, Frites 6/6 mm",
  "Lamb Weston, Frites 6/6 mm",
  "Nubi, Tiramisu Caramel Spéculoos",
  "Maestrella, Mozarella 100%",
  "Les Broches de Poulet et Dinde",
  "Harissa",
  "Excellence, Huile de Tournesol",
  "Colona, Sauce Pimentée",
  "Antalya, 18 Dürüm 30 CM",
  "Factory, Algérienne",
  "Factory, Samouraï",
  "Factory, Sweet Barbecue",
  "Factory, BIG BURGER",
  "Filets de Poulet (Frais)",
];

function findProductByName(
  name: string,
  products: Product[]
): Product | undefined {
  const keywords = name.toLowerCase().split(/[, ]+/).filter(Boolean);
  return products.find((prod) =>
    keywords.every((kw) => prod.name.toLowerCase().includes(kw))
  );
}

export default function DoubleLineProductSlider() {
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const matchedProducts = productNamesToShow
    .map((name) => findProductByName(name, products))
    .filter(Boolean) as Product[];

  if (!matchedProducts.length) return null;

  const half = Math.ceil(matchedProducts.length / 2);
  const line1 = matchedProducts.slice(0, half);
  const line2 = matchedProducts.slice(half);

  const repeat = (arr: Product[]) => [...arr, ...arr];

  const repeatedLine1 = repeat(line1);
  const repeatedLine2 = repeat(line2);

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="space-y-8">
        {/* LIGNE SUPÉRIEURE - Défilement de droite à gauche */}
        <article className="relative overflow-hidden whitespace-nowrap">
          {/* Gradient gauche pour effet de fondu */}
          <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"></div>

          <div
            className={`flex items-center gap-8 ${
              isEntering
                ? "animate-[slideInFromRight_2s_ease-out_forwards]"
                : "animate-[scrollLeft_30s_linear_infinite]"
            }`}
            style={{
              transform: isEntering ? "translateX(100%)" : "translateX(0)",
              width: `${repeatedLine1.length * 200}px`,
            }}
          >
            {repeatedLine1.map((product, idx) => (
              <div
                key={`${product.id}-line1-${idx}`}
                className="inline-block flex-shrink-0 w-44 h-44 rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={150}
                  height={150}
                  layout="fixed"
                />
              </div>
            ))}
          </div>

          {/* Gradient droit pour effet de fondu */}
          <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"></div>
        </article>

        {/* LIGNE INFÉRIEURE - Défilement de gauche à droite */}
        <article className="relative overflow-hidden whitespace-nowrap">
          {/* Gradient gauche pour effet de fondu */}
          <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"></div>

          <div
            className={`flex items-center gap-8 ${
              isEntering
                ? "animate-[slideInFromLeft_2s_ease-out_forwards]"
                : "animate-[scrollRight_25s_linear_infinite]"
            }`}
            style={{
              transform: isEntering ? "translateX(-100%)" : "translateX(0)",
              width: `${repeatedLine2.length * 200}px`,
            }}
          >
            {repeatedLine2.map((product, idx) => (
              <div
                key={`${product.id}-line2-${idx}`}
                className="flex justify-center items-center flex-shrink-0 w-44 h-44 rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={150}
                  height={150}
                  layout="fixed"
                />
              </div>
            ))}
          </div>

          {/* Gradient droit pour effet de fondu */}
          <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"></div>
        </article>
      </div>

      {/* STYLES CSS PERSONNALISÉS POUR LES ANIMATIONS */}
      <style jsx>{``}</style>
    </div>
  );
}
