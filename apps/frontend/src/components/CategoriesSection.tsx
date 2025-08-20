"use client";

import Image from "next/image";
import Link from "next/link";

type Category = {
  name: string;
  image: string;
  href: string;
};

const categoriesLeft: Category[] = [
  {
    name: "Viandes et Volailles",
    image: "/images/categories/viandes-et-volailles.png",
    href: "/products?category=Viandes,Volailles",
  },
  {
    name: "Frites et Appetizers",
    image: "/images/categories/frites-et-appetizers.png",
    href: "/products?category=Frites,Appetizers,Spécialités,Huile",
  },
  {
    name: "Pain et Tortillas",
    image: "/images/categories/pain-et-tortillas.png",
    href: `/products?category=${encodeURIComponent("Tortillas et Pains")}`,
  },
  {
    name: "Produits Laitiers et Epicerie",
    image: "/images/categories/produits-laitiers-et-epicerie.png",
    href: `/products?category=${encodeURIComponent("Produits Laitiers")}`,
  },
];

const categoriesRight: Category[] = [
  {
    name: "Tartes et Desserts",
    image: "/images/categories/tartes-et-desserts.png",
    href: "/products?category=Dessert",
  },
  {
    name: "Sauces",
    image: "/images/categories/sauces.png",
    href: "/products?category=Sauces",
  },
  {
    name: "Emballages et Packaging",
    image: "/images/categories/emballages-et-packaging.png",
    href: "/products?category=Emballages",
  },
  {
    name: "Conserves et Legumes",
    image: "/images/categories/conserves-et-legumes.png",
    href: "/products?category=Conserve",
  },
];

export default function CategoriesSection() {
  return (
    <section className="w-full pt-12 bg-white">
      <div className="container mx-auto flex flex-col items-center gap-8">
        {/* Titre */}
        <Link href="/products">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 hover:text-[#ebc834] transition cursor-pointer">
            Nos Produits
          </h2>
        </Link>

        {/* Flex gauche/droite */}
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Colonne gauche */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {categoriesLeft.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="relative group rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-40 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Colonne droite */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {categoriesRight.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="relative group rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-40 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
