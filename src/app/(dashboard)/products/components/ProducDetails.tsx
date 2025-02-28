'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/product";
import dynamic from "next/dynamic";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "./ConfirmDialog";
const ProductForm = dynamic(() => import("@/components/ProductForm"), { ssr: false });

export default function ProductDetails({ product, categories }: { product: Product, categories: string[] }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    toast.info('Produto excluído com sucesso!', {
      description: `Produto: ${product.title}`,
      duration: 3000,
    });
    setTimeout(() => redirect("/"), 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg shadow-lg object-cover dark:shadow-gray-800"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center mb-6">
            <span className="text-2xl font-semibold text-green-600 dark:text-green-400">
              ${product.price}
            </span>
            <span className="ml-4 text-yellow-500 dark:text-yellow-400 font-medium">
              ★ {product.rating.rate} / 5
            </span>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700"
              onClick={() => setOpen(true)}
            >
              Editar
            </Button>

            <Button
              className="bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800"
              onClick={() => setShowConfirm(true)}
            >
              Excluir
            </Button>
          </div>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Editar Produto
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            categories={categories}
            onClose={() => setOpen(false)}
            initialData={product}
            id={product.id}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}