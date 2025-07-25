"use client";

import { Product, products } from "@/data/products";
import Image from "next/image";

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
  const matchedProducts = productNamesToShow
    .map((name) => findProductByName(name, products))
    .filter(Boolean) as Product[];

  if (!matchedProducts.length) return null;

  const half = Math.ceil(matchedProducts.length / 2);
  const line1 = matchedProducts.slice(0, half);
  const line2 = matchedProducts.slice(half);

  const repeat = (arr: Product[]) => [...arr, ...arr];

  return (
    <div>
      <article className="relative overflow-hidden whitespace-nowrap bg-white py-4">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-l from-transparentBlack to-fullBlack pointer-events-none"></div>
        <div className="flex items-center animate-forward gap-16">
          {repeat(line1).map((product, idx) => (
            <div
              key={`${product.id}-line1-${idx}`}
              className="inline-block flex-shrink-0"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={150}
                height={150}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-r from-transparentBlack to-fullBlack z-10 pointer-events-none"></div>
      </article>

      <article className="relative overflow-hidden whitespace-nowrap bg-white py-4">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-l from-transparentBlack to-fullBlack pointer-events-none"></div>
        <div className="flex items-center animate-backward gap-16 overflow-hidden">
          {repeat(line2).map((product, idx) => (
            <div
              key={`${product.id}-line2-${idx}`}
              className="inline-block flex-shrink-0"
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
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-r from-transparentBlack to-fullBlack z-10 pointer-events-none"></div>
      </article>
    </div>
  );
}
