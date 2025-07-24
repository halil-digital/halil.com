"use client";

import { Product, products } from "@/data/products";
import { useEffect, useRef } from "react";

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

export default function HorizontalProductSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const matchedProducts = productNamesToShow
    .map((name) => findProductByName(name, products))
    .filter(Boolean) as Product[];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId: number;
    let scrollLeft = 0;
    const speed = 0.8;

    function animate() {
      scrollLeft += speed;
      if (scrollLeft >= (slider as HTMLDivElement).scrollWidth / 2) {
        scrollLeft = 0;
      }
      (slider as HTMLDivElement).scrollLeft = scrollLeft;
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (matchedProducts.length === 0) return <p>Chargement...</p>;

  const productsToShow = [...matchedProducts, ...matchedProducts];

  return (
    <div
      ref={sliderRef}
      className="flex overflow-x-hidden w-full gap-4 md:gap-20 xl:gap-40 py-20 box-border"
    >
      {productsToShow.map((product, idx) => (
        <div
          key={idx + product.id}
          className="flex-shrink-0 w-[150px] h-[150px]"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
