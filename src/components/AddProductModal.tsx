"use client";

import ProductForm from '@/components/ProductForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';

interface AddProductModalProps {
  categories: string[];
}

export default function AddProductModal({ categories }: AddProductModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full h-10 w-10 md:h-12 md:w-12 text-2xlflex items-center justify-center bg-gray-900 hover:bg-gray-700 text-white"
          variant="default"
          size="icon"
        >
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogTitle className="text-xl font-bold mb-4">Adicionar Novo Produto</DialogTitle>
        <ProductForm
          categories={categories}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}