
import { getCategories, getProductById } from "@/services/api";
import { Product } from "@/types/product";
import ProductDetails from "../components/ProducDetails";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product: Product = await getProductById(params.id);
  const categories = await getCategories();

  return <ProductDetails product={product} categories={categories} />;
}