import { Product } from "@/data/products";
import Link from "next/link";
import { Fragment } from "react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group bg-white text-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center w-full">
        {/* Zone image */}
        <div className="bg-white rounded-xl w-full p-4 flex items-center justify-center h-[250px] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Titre produit */}
        <h2 className="text-black mt-4 text-xs xl:text-sm font-bold text-center leading-tight uppercase px-2 min-h-[2rem]">
          {product.name.split("\n").map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
        </h2>
      </div>
    </Link>
  );
}
