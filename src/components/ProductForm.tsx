"use client";

import { saveProduct } from "@/app/actions/createProduct";
import { putProduct } from "@/app/actions/updateProduct";
import { ProductFormGroupData, productSchema } from "@/lib/productSchema";
import { categoryTranslations } from "@/lib/translateCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface ProductFormProps {
  categories: string[];
  onClose: () => void;
  initialData?: ProductFormGroupData;
  id?: number;
}

export default function ProductForm({ categories, onClose, initialData, id }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<ProductFormGroupData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      price: 0,
      category: "",
      image: "",
    },
  });

  const fetchData = async (data: ProductFormGroupData) => {
    const isCreating = !initialData?.category;
    const action = isCreating ? saveProduct : putProduct;
    const actionName = isCreating ? "criado" : "atualizado";

    try {
      const result = await action(data, isCreating ? undefined : id);
      toast.success(`Produto ${actionName} com sucesso! ✅`, {
        description: `Detalhes:
      Nome: ${data.title}
      Preço: R$${data.price.toFixed(2).replace(".", ",")}
      Categoria: ${data.category}`,
        duration: 3000,
        action: {
          label: "Desfazer",
          onClick: () => console.log(`Tentativa de reverter ${actionName}: ${data.title}`),
        },
      });
      onClose();
      setTimeout(() => redirect("/"), 1000);
    } catch (error: any) {
      console.error(`Erro ao ${isCreating ? "criar" : "atualizar"} produto:`, error);
      toast.error(`Falha ao ${isCreating ? "criar" : "atualizar"} o produto ❌`, {
        description: error.message || `Erro inesperado ao ${isCreating ? "criar" : "atualizar"} o produto`,
        duration: 4000,
        action: {
          label: "Tentar novamente",
          onClick: () => fetchData(data),
        },
      });
    }
  };

  const selectedCategory = watch("category");

  useEffect(() => {
    if (initialData?.category) {
      setValue("category", initialData.category);
    }
  }, [initialData, setValue]);

  return (
    <form onSubmit={handleSubmit(fetchData)} className="space-y-4">
      <div>
        <Label htmlFor="title" className="text-gray-900 dark:text-gray-100">
          Título
        </Label>
        <Input
          id="title"
          type="text"
          {...register("title")}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
        {errors.title && (
          <p className="text-red-500 dark:text-red-400 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description" className="text-gray-900 dark:text-gray-100">
          Descrição
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
        {errors.description && (
          <p className="text-red-500 dark:text-red-400 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="price" className="text-gray-900 dark:text-gray-100">
          Preço
        </Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
        {errors.price && (
          <p className="text-red-500 dark:text-red-400 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="category" className="text-gray-900 dark:text-gray-100">
          Categoria
        </Label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => setValue("category", value)}
        >
          <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            {categories.map((cat) => (
              <SelectItem
                key={cat}
                value={cat}
                className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {categoryTranslations[cat] || cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-red-500 dark:text-red-400 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="image" className="text-gray-900 dark:text-gray-100">
          URL da Imagem
        </Label>
        <Input
          id="image"
          type="text"
          {...register("image")}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
        />
        {errors.image && (
          <p className="text-red-500 dark:text-red-400 text-sm">{errors.image.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}