import { products } from "@/data/products";
import type { Metadata } from "next";
import ProductPage from "./ProductPage";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Produit introuvable | HALIL",
      description: "Ce produit n'existe pas ou a été retiré du catalogue.",
    };
  }

  return {
    title: `${product.name} | HALIL`,
    description: product.description || `Découvrez ${product.name} chez HALIL.`,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProductPage slug={params.slug} />;
}
