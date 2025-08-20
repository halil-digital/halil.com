import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Produits | HALIL",
  description:
    "Découvrez tous les produits proposés par HALIL, votre grossiste alimentaire.",
};

const ProductsPageClient = dynamic(() => import("./ProductsPage"), {
  ssr: false, // important !
});

export default function Page() {
  return <ProductsPageClient />;
}
