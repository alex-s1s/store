"use server";

import { getProducts } from "@/services/api";

const ITEMS_PER_PAGE = 8;

export async function getFilteredProducts(
  filters: { category?: string; priceRange?: string; sortOrder?: "asc" | "desc" },
  page: number = 1
) {
  try {
    const allProducts = await getProducts(filters.category || "", filters.priceRange || "");

    let filteredProducts = allProducts;

    // Filtrar por categoria, se aplicável
    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (p: { category: string | undefined }) => p.category === filters.category
      );
    }

    // Priorizar produtos com rate acima de 4.5
    filteredProducts.sort((a: { rating: { rate: number } }, b: { rating: { rate: number } }) => {
      const aPriority = a.rating?.rate > 4.5 ? -1 : 1;
      const bPriority = b.rating?.rate > 4.5 ? -1 : 1;

      return aPriority - bPriority;
    });

    // Ordenar por preço, se necessário
    if (filters.sortOrder) {
      filteredProducts.sort((a: { price: number }, b: { price: number }) => {
        return filters.sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
    }

    // Paginação
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    return {
      products: paginatedProducts,
      totalPages,
      currentPage: page,
      totalItems: filteredProducts.length,
    };
  } catch (error) {
    console.error("Error filtering products:", error);
    return {
      products: [],
      totalPages: 0,
      currentPage: 1,
      totalItems: 0,
    };
  }
}
