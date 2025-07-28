"use client";

import AdBar from "@/components/adbar";
import { Footer } from "@/components/footer-section";
import { Navbar } from "@/components/navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);

  const initialActiveProduct = useMemo(() => {
    if (!product) return null;
    if (product.variants && product.variants.length > 0) {
      return product.variants[0];
    }
    return product;
  }, [product]);

  const [activeProduct, setActiveProduct] = useState(initialActiveProduct);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const thumbnailRef = useRef<HTMLDivElement>(null);

  if (!product || !activeProduct) {
    return <div className="text-center py-24">Produit introuvable</div>;
  }

  const showDetailsBox =
    activeProduct.weight ||
    activeProduct.certificate ||
    activeProduct.storage_conditions;

  const scrollLeft = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div>
      <AdBar />
      <Navbar />
      <div className="px-4 md:px-20 py-12 bg-white">
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Accueil</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products">Produits</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{activeProduct.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Image principale + miniatures */}
          <div className="md:w-1/2 w-full">
            <img
              src={activeProduct.images[selectedImageIndex]}
              alt={activeProduct.name}
              className="w-full max-h-[500px] min-h-[500px] object-contain rounded-lg shadow-lg"
            />

            {activeProduct.images.length > 1 && (
              <div className="flex justify-center gap-3 mt-4 overflow-x-auto no-scrollbar">
                {activeProduct.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${activeProduct.name} ${index + 1}`}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`h-20 w-20 object-contain border rounded cursor-pointer transition ${
                      selectedImageIndex === index
                        ? "border-[#ebc834] ring-2 ring-[#ebc834]"
                        : "border-gray-200"
                    }`}
                  />
                ))}
              </div>
            )}

            {product.variants && product.variants.length > 0 && (
              <div className="relative mt-4">
                {/* Bouton gauche */}
                <button
                  onClick={scrollLeft}
                  aria-label="Scroll left"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Miniatures scrollables */}
                <div
                  ref={thumbnailRef}
                  className="flex gap-3 overflow-x-auto no-scrollbar mx-12"
                  style={{ scrollbarWidth: "none" }}
                >
                  {product.variants.map((variant) => (
                    <img
                      key={variant.id}
                      src={variant.images[0]}
                      alt={variant.name}
                      onClick={() => setActiveProduct(variant)}
                      className={`min-w-[80px] h-20 object-contain border rounded cursor-pointer transition ${
                        variant.id === activeProduct.id
                          ? "border-[#ebc834] ring-2 ring-[#ebc834]"
                          : "border-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Bouton droite */}
                <button
                  onClick={scrollRight}
                  aria-label="Scroll right"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ChevronRight size={20} />
                </button>

                <style jsx>{`
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                  .no-scrollbar {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                  }
                `}</style>
              </div>
            )}
          </div>

          {/* Infos produit */}
          <div className="md:w-1/2 w-full space-y-6">
            <h1 className="flex items-center text-2xl font-bold text-[#ebc834] gap-3">
              {activeProduct.name}
              <span className="inline-flex items-center gap-2 px-3 py-1 text-green-600 bg-green-100 rounded-md font-semibold text-sm select-none">
                <span className="w-2 h-2 rounded-full bg-green-600" />
                En stock
              </span>
            </h1>
            <p className="text-gray-600 mb-6">{activeProduct.description}</p>
            <p className="text-gray-600 mb-6">
              Catégorie : <b>{activeProduct.category}</b>
            </p>

            {showDetailsBox && (
              <div className="bg-gray-50 p-6 rounded-xl border mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  {activeProduct.weight && (
                    <div className="flex flex-col items-center">
                      <span className="text-xl mb-2">⚖️</span>
                      <p className="text-sm text-gray-500">Poids</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {activeProduct.weight}
                      </p>
                    </div>
                  )}
                  {activeProduct.certificate && (
                    <div className="flex flex-col items-center">
                      <span className="text-xl mb-2">📜</span>
                      <p className="text-sm text-gray-500">Certificat</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {activeProduct.certificate}
                      </p>
                    </div>
                  )}
                  {activeProduct.storage_conditions && (
                    <div className="flex flex-col items-center">
                      <span className="text-xl mb-2">❄️</span>
                      <p className="text-sm text-gray-500">
                        Conditions de stockage
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {activeProduct.storage_conditions}
                      </p>
                    </div>
                  )}
                  {activeProduct.package && (
                    <div className="flex flex-col items-center">
                      <span className="text-xl mb-2">📦</span>
                      <p className="text-sm text-gray-500">Carton</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {activeProduct.package}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                Ce produit vous intéresse ?
              </p>
              <Link href="">
                <Button className="bg-[#ebc834] hover:bg-[#dfca70] text-black">
                  Contactez-nous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
