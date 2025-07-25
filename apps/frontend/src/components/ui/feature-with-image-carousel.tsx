import { Badge } from "@/components/ui/badge";
import Image from "next/image";

function Feature() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-end items-end  gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge className="bg-[#ebc834] hover:bg-[#ebc834]">
                HALIL Distribution
              </Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                À Propos de HALIL – Votre Grossiste Alimentaire de Confiance
              </h2>
              <p className="text-lg max-w-xl lg:max-w-full leading-relaxed tracking-tight text-muted-foreground  text-left">
                Découvrez HALIL, un acteur majeur en Île‑de‑France dans la
                distribution alimentaire spécialisée pour la restauration.
                Fondée en 1998, HALIL Distribution ne cesse de croître pour
                mieux répondre aux besoins de ses clients.
              </p>
            </div>
          </div>
          <div className="w-full max-w-full px-6">
            <div className="flex rounded-md aspect-video items-center justify-center px-6 pt-6">
              <Image
                src={"/images/halil-truck.png"}
                alt="halil truck"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
