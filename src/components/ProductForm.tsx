"use client";

import { saveProduct } from "@/app/actions/createProduct";
import { ProductFormGroupData, productSchema } from "@/lib/productSchema";
import { categoryTranslations } from "@/lib/translateCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface ProductFormProps {
  categories: string[];
  onClose: () => void;
  initialData?: ProductFormGroupData;
  id?: string;
}

export default function ProductForm({ categories, onClose, initialData, id }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<ProductFormGroupData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      price: 0,
      category: "",
      image: ""
    },
  });

  const handleSave = async (data: ProductFormGroupData) => {
    try {
      await saveProduct(data, id);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Falha ao salvar o produto");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input id="title" type="text" {...register("title")} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="price">Preço</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <Label htmlFor="category">Categoria</Label>
        <Select onValueChange={(value) => setValue("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {categoryTranslations[cat] || cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <div>
        <Label htmlFor="image">URL da Imagem</Label>
        <Input id="image" type="text" {...register("image")} />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}