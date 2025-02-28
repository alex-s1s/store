import { ProductFormGroupData } from "@/lib/productSchema";
import { createproduct } from "@/services/api";
import { redirect } from "next/navigation";

export async function saveProduct(data: ProductFormGroupData, id?: string) {
  const res = await createproduct({ ...data });

  if (res.error) {
    console.error("Error creating product:", res.error);
    throw new Error(res.error);
  }

  if (res.ok) {
    console.log("Product created successfully, redirecting to /");
    redirect("/");
  }
}