import AddProductModal from "@/components/AddProductModal";
import Filters from "@/components/filters";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/skeleton";
import { getCategories } from "@/services/api";
import { Suspense } from "react";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const categories = await getCategories();

  return (
    <div className="min-h-screen gap-16 sm:px-20 ibm-plex-sans sm:mb-5">
      <div className="flex justify-between items-center mt-3">
        <h2 className="font-bebas-neue md:text-4xl text-light-100 dark:text-dark-100 text-2xl">
          Lista de Produtos
        </h2>
        <AddProductModal categories={categories} />
      </div>
      <Suspense>
        <Filters />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}