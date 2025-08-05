"use client";

import { Boxes, CreditCard, Phone, Truck } from "lucide-react";

export default function FeatureHighlights() {
  return (
    <section className="bg-[#ebc834] py-12 w-full rounded-lg">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 text-white text-center w-full px-4 md:px-20">
        <div className="flex flex-col items-center space-y-4">
          <Truck strokeWidth={1.5} className="text-black size-15 md:size-20" />
          <h3 className="text-md md:text-xl font-bold">Livraison rapide</h3>
          <p>Un service de livraison en 24h sur l’Île-de-France</p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Boxes strokeWidth={1.5} className="text-black size-15 md:size-20" />
          <h3 className="text-md md:text-xl font-bold">Large disponibilité</h3>
          <p>Une large gamme de produits alimentaires</p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Phone strokeWidth={1.5} className="text-black size-15 md:size-20" />
          <h3 className="text-md md:text-xl font-bold">Service client</h3>
          <p>À vos côtés 7j / 7 !</p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <CreditCard
            strokeWidth={1.5}
            className="text-black size-15 md:size-20"
          />
          <h3 className="text-md md:text-xl font-bold">Facilité de paiement</h3>
          <p>Des solutions adaptées à vos besoins</p>
        </div>
      </div>
    </section>
  );
}
