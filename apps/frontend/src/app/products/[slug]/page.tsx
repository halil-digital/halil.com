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
import Link from "next/link";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <div>
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
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2 w-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[500px] min-h-[500px] object-contain rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 w-full space-y-6">
            {/* Nom du produit */}
            <h1 className="text-2xl font-bold text-[#ebc834]">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-gray-600 mb-6">
              Catégorie : <b>{product.category}</b>
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {product.weight && (
                  <div className="flex flex-col items-center">
                    <span className="text-xl mb-2">⚖️</span>
                    <p className="text-sm text-gray-500">Poids</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {product.weight}
                    </p>
                  </div>
                )}
                {product.certificate && (
                  <div className="flex flex-col items-center">
                    <span className="text-xl mb-2">📜</span>
                    <p className="text-sm text-gray-500">Certificat</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {product.certificate}
                    </p>
                  </div>
                )}
                {product.storage_conditions && (
                  <div className="flex flex-col items-center">
                    <span className="text-xl mb-2">❄️</span>
                    <p className="text-sm text-gray-500">
                      Conditions de stockage
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {product.storage_conditions}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                Ce produit vous intéresse ?
              </p>
              <Link href={""}>
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
