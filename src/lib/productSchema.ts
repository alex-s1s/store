// lib/productSchema.ts
import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "O título é obrigatário").max(100, "O título não pode ter mais de 100 caracteres"),
  description: z.string().min(1, "A descrição é obrigatória").max(500, "A descrição não pode ter mais de 500 caracteres"),
  price: z.number().min(0, "O preço deve ser maior ou igual a 0").positive("O preço deve ser positivo"),
  category: z.string().min(1, "A categoria é obrigatória"),
  image: z.string().url("A imagem deve ser uma URL válida"),
});

export type ProductFormGroupData = z.infer<typeof productSchema>;