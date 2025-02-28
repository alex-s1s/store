import { ProductFormGroupData } from "@/lib/productSchema";
import { createproduct } from "@/services/api";

export async function saveProduct(data: ProductFormGroupData) {
  const res = await createproduct({ ...data });
  if (res.error) {
    console.error("Error creating product:", res.error);
    throw new Error(res.error);
  }
  return { success: true, message: "Product created successfully" };
}