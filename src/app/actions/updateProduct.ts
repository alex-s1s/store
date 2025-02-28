import { ProductFormGroupData } from "@/lib/productSchema";
import { updateProduct } from "@/services/api";

export async function putProduct(data: ProductFormGroupData, id?: number) {
  const res = await updateProduct({ ...data, id });
  if (res.error) {
    console.error("Error editing product:", res.error);
    throw new Error(res.error);
  }
  return { success: true, message: "Product updated successfully" };
}