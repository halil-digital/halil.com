"use client";

import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductList } from "@/components/products/ProductList";
import { products } from "@/data/products";
import Link from "next/link";
import { useMemo, useState } from "react";

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
import { useSearchParams } from "next/navigation";

function extractCategories(selectedBrand: string | null) {
  const categorySet = new Set<string>();
  const filteredProducts = selectedBrand
    ? products.filter((p) => {
        const brand = p.name.includes(",")
          ? p.name.split(",")[0].trim()
          : "Autre";
        return brand === selectedBrand;
      })
    : products;

  for (const product of filteredProducts) {
    categorySet.add(product.category);
  }

  return Array.from(categorySet).sort();
}

function extractBrands(selectedCategories: string[]) {
  const brandSet = new Set<string>();
  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((p) => selectedCategories.includes(p.category))
      : products;

  for (const product of filteredProducts) {
    const brand = product.name.includes(",")
      ? product.name.split(",")[0].trim()
      : "Autre";
    brandSet.add(brand);
  }

  return Array.from(brandSet).sort();
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const brandFromUrl = searchParams.get("brand");

  const initialCategories = categoryFromUrl ? categoryFromUrl.split(",") : [];
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandFromUrl
  );

  const availableCategories = useMemo(
    () => extractCategories(selectedBrand),
    [selectedBrand]
  );
  const availableBrands = useMemo(
    () => extractBrands(selectedCategories),
    [selectedCategories]
  );

  const categoryOrder = [
    "Frites",
    "Sauces",
    "Viandes",
    "Volailles",
    "Tortillas et Pains",
    "Appetizers",
    "Spécialités",
    "Dessert",
    "Emballages",
    "Produits Laitiers",
    "Huile",
    "Conserve",
  ];

  const filteredProductsSorted = useMemo(() => {
    // Filtrer selon les catégories/brand sélectionnées
    const filtered = products.filter((product) => {
      const brand = product.name.includes(",")
        ? product.name.split(",")[0].trim()
        : "Autre";

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesBrand = !selectedBrand || brand === selectedBrand;

      return matchesCategory && matchesBrand;
    });

    // Si aucune catégorie sélectionnée, appliquer l'ordre personnalisé
    if (selectedCategories.length === 0) {
      return filtered.sort((a, b) => {
        const idxA = categoryOrder.findIndex((c) => a.category.includes(c));
        const idxB = categoryOrder.findIndex((c) => b.category.includes(c));

        // Si pas trouvé dans categoryOrder, on met à la fin
        const finalIdxA = idxA === -1 ? categoryOrder.length : idxA;
        const finalIdxB = idxB === -1 ? categoryOrder.length : idxB;

        return finalIdxA - finalIdxB;
      });
    }

    return filtered;
  }, [selectedCategories, selectedBrand]);

  return (
    <div className="min-h-screen flex flex-col">
      <AdBar />
      <Navbar />

      <main className="flex-1">
        <div className=" bg-[#faf4ee]">
          <div className="px-4 md:px-20 py-20 bg-[url('/images/banniere-catalogue.png')] bg-cover bg-center text-white">
            <h1 className="text-5xl font-bold text-center mb-4">
              Notre catalogue
            </h1>

            <div className="flex justify-center">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="hover:text-white" asChild>
                      <Link href="/">Accueil</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white">
                      Produits
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 px-4 md:px-20 py-12">
            <div className="md:w-1/4 w-full md:sticky md:top-10 h-fit">
              <ProductFilters
                categories={availableCategories}
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                brands={availableBrands}
                selectedBrand={selectedBrand}
                onBrandChange={setSelectedBrand}
              />
            </div>

            <div className="md:w-3/4 w-full">
              <ProductList products={filteredProductsSorted} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
