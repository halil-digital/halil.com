import type { Metadata } from "next";
import ProductsPage from "./ProductsPage";

export const metadata: Metadata = {
  title: "Produits | HALIL",
  description:
    "Découvrez tous les produits proposés par HALIL, votre grossiste alimentaire.",
};

export default function Page() {
  return <ProductsPage />;
}
