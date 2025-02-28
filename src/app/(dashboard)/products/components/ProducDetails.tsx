'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/product";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
const ProductForm = dynamic(() => import("@/components/ProductForm"), { ssr: false });

export default async function ProductDetails({ product }: { product: Product }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const handleDelete = () => {
    console.log("Produto excluído:", product.title);
    setShowConfirm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center mb-6">
            <span className="text-2xl font-semibold text-green-600">
              ${product.price}
            </span>
            <span className="ml-4 text-yellow-500 font-medium">
              ★ {product.rating.rate} / 5
            </span>
          </div>
          <div className="flex gap-4">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setEditDialogOpen(true)}
            >
              Editar
            </button>
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              onClick={() => setShowConfirm(true)}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
      {showConfirm && (
        <ConfirmDialog
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {/*  <ProductForm initialData={product} id={product.id.toString()} onClose={() => setEditDialogOpen(false)} /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}