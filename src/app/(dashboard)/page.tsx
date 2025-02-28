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
    <div className="min-h-screen gap-16 sm:px-20 sm:py-8 ibm-plex-sans">
      <div className="flex justify-between items-center">
        <h2 className="font-bebas-neue text-4xl text-light-100 dark:text-dark-100">
          Lista de Produtos
        </h2>
        <AddProductModal categories={categories} />
      </div>

      <Filters />
      <Suspense fallback={<Skeleton />}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}