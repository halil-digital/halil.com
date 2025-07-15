"use client";

import { Badge } from "./badge";

function Hero() {
  return (
    <div
      className="mx-0 relative bg-cover md:bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/bg-about.png')",
        height: "calc(100vh - 4rem)",
      }}
    >
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <span>
              <Badge className="bg-[#bcbfcf] hover:bg-[#c9ccdd] text-2xl px-4">
                Notre mission
              </Badge>
            </span>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-2xl md:text-5xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">
                Accompagner les professionnels dans l’approvisionnement rapide
                et fiable de produits alimentaires
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Fondée en 1999 à Paris, HALIL distribue des produits alimentaires
              pour les professionnels de la restauration. Son catalogue comprend
              viandes, surgelés, pains et sauces. Fiable et réactive, HALIL est
              un partenaire de confiance en Île-de-France
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
