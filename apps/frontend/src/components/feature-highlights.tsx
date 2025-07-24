"use client";

import { Boxes, Star, Truck } from "lucide-react";

export default function FeatureHighlights() {
  return (
    <section className="bg-[#ebc834] py-12 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center w-full px-4 md:px-20">
        {/* 1 - Livraison rapide */}
        <div className="flex flex-col items-center space-y-4">
          <Truck size={80} strokeWidth={1.5} />
          <h3 className="text-3xl font-bold">Livraison rapide</h3>
          <p>Un service de livraison en 24h sur l’Île-de-France</p>
        </div>

        {/* 2 - Beaucoup de stock */}
        <div className="flex flex-col items-center space-y-4">
          <Boxes size={80} strokeWidth={1.5} />
          <h3 className="text-3xl font-bold">Beaucoup de stock</h3>
          <p>Une large gamme de produits alimentaires</p>
        </div>

        {/* 3 - Top budget top qualité */}
        <div className="flex flex-col items-center space-y-4">
          <Star size={80} strokeWidth={1.5} />
          <h3 className="text-3xl font-bold">Top budget top qualité</h3>
          <p>Des articles de qualité à prix attractifs</p>
        </div>
      </div>
    </section>
  );
}
