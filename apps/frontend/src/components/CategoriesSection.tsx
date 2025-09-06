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
    href: `/products?category=${encodeURIComponent("Frites et Appetiziers")}`,
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
    href: "/products?category=Desserts",
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
    href: "/products?category=Conserves",
  },
];

export default function CategoriesSection() {
  return (
    <section className="w-full py-12 bg-gray-100 bg-center bg-cover">
      <div className="container mx-auto flex flex-col items-center gap-8">
        {/* Titre */}
        <Link href="/products">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 hover:text-[#ebc834] transition cursor-pointer">
            NOS PRODUITS
          </h2>
        </Link>

        {/* Flex gauche/droite */}
        <div className="flex flex-col md:flex-row gap-8 w-full px-2">
          {/* Colonne gauche */}
          <div className="flex-1 grid grid-cols-2 gap-2">
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
                  height={400}
                  className="w-full h-50 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/10 transition flex items-center justify-center"></div>
              </Link>
            ))}
          </div>

          {/* Colonne droite */}
          <div className="flex-1 grid grid-cols-2 gap-2">
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
                  height={400}
                  className="w-full h-50 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/10 transition flex items-center justify-center"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
