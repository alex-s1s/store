
import { getCategories, getProductById } from "@/services/api";
import { Product } from "@/types/product";
import ProductDetails from "../components/ProducDetails";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product: Product = await getProductById(id);
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product: Product = await getProductById(id);
  const categories = await getCategories();

  return <ProductDetails product={product} categories={categories} />;
}