import { getFilteredProducts } from "@/app/actions/getFilteredProducts";
import { Product } from "@/types/product";
import { Suspense } from "react";
import { CustomPagination } from "./CustomPagination";
import ProductCard from "./ProductCard";

export default async function ProductList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { page, category, sortOrder } = await searchParams;

  const { products, totalPages } = await getFilteredProducts(
    { category, sortOrder: sortOrder as "asc" | "desc" },
    Number(page || 1)
  );

  return (
    <section className="">
      <ul aria-label="product list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <Suspense>
          <CustomPagination totalPages={totalPages} />
        </Suspense>
      </div>
    </section>
  );
}