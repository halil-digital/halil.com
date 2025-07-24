import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
}

export function ProductList({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20 text-lg font-medium">
        Aucun résultat.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
