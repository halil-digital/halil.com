"use client";

import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductList } from "@/components/products/ProductList";
import { products } from "@/data/products";
import Link from "next/link";
import { useState } from "react";

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

function extractBrands() {
  const brandSet = new Set<string>();
  for (const product of products) {
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

  const categories = [...new Set(products.map((p) => p.category))];
  const brands = extractBrands();

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
      <Navbar />

      <main className="flex-1">
        <div className="px-4 md:px-20 py-12 bg-white">
          <h1 className="text-4xl font-bold text-center mb-4">
            Tous nos produits
          </h1>

          <div className="flex justify-center mb-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Accueil</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Produits</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4 w-full">
              <ProductFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                brands={brands}
                selectedBrand={selectedBrand}
                onBrandChange={setSelectedBrand}
              />
            </div>

            <div className="md:w-3/4 w-full max-h-[calc(100vh-4rem)] overflow-y-auto">
              <ProductList products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
