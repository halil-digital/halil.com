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

function extractBrands(selectedCategory: string | null) {
  const brandSet = new Set<string>();
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const availableCategories = useMemo(
    () => extractCategories(selectedBrand),
    [selectedBrand]
  );
  const availableBrands = useMemo(
    () => extractBrands(selectedCategory),
    [selectedCategory]
  );

  const filteredProducts = products.filter((product) => {
    const brand = product.name.includes(",")
      ? product.name.split(",")[0].trim()
      : "Autre";

    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesBrand = !selectedBrand || brand === selectedBrand;

    return matchesCategory && matchesBrand;
  });

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
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                brands={availableBrands}
                selectedBrand={selectedBrand}
                onBrandChange={setSelectedBrand}
              />
            </div>

            <div className="md:w-3/4 w-full">
              <ProductList products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
