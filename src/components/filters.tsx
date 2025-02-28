"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categoryTranslations } from "@/lib/translateCategories";
import { getCategories } from "@/services/api";
import { Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

let cachedCategories: string[] | null = null;

export default function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const category = searchParams.get("category") || "";
  const sortOrder = searchParams.get("sortOrder") || "";

  useEffect(() => {
    const loadCategories = async () => {
      try {
        if (cachedCategories) {
          setCategories(cachedCategories);
          return;
        }
        setIsLoading(true);
        const data = await getCategories();
        cachedCategories = data;
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleApplyFilters = (newCategory: string, newSortOrder: string) => {
    const params = new URLSearchParams();
    if (newCategory) params.set("category", newCategory);
    if (newSortOrder) params.set("sortOrder", newSortOrder);
    router.push(`/?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push("/");
  };

  return (
    <div className="mb-8">
      <Button
        onClick={() => router.push("/?filtersOpen=true")}
        className="sm:hidden flex items-center gap-2"
      >
        <Filter size={18} />
        Filtros
      </Button>
      <div
        className={`${searchParams.get("filtersOpen") ? "block" : "hidden"} sm:flex sm:flex-row sm:items-end gap-4 mt-4 sm:mt-0`}
      >
        <div className="flex-1">
          <Label htmlFor="category">Categoria</Label>
          <Select
            value={category}
            onValueChange={(value) => handleApplyFilters(value, sortOrder)}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={isLoading ? "Carregando categorias..." : "Todas as Categorias"}
              />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {categoryTranslations[cat] || cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Label htmlFor="sortOrder">Ordenar por Preço</Label>
          <Select
            value={sortOrder}
            onValueChange={(value) => handleApplyFilters(category, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ordem Padrão" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800">
              <SelectItem value="default">Ordem Padrão</SelectItem>
              <SelectItem value="asc">Menor para Maior</SelectItem>
              <SelectItem value="desc">Maior para Menor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-0">
          <Button
            onClick={() => handleApplyFilters(category, sortOrder)}
            className="flex-1 sm:flex-none"
            disabled={isLoading}
          >
            {isLoading ? "Aplicando..." : "Aplicar"}
          </Button>
          {searchParams.size !== 0 && (
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              Limpar
            </Button>
          )}
          <Button
            onClick={() => router.push("/")}
            variant="destructive"
            className="sm:hidden flex items-center justify-center"
          >
            <X size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}