"use client";

import ProductForm from '@/components/ProductForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
          className="rounded-full h-12 w-12 text-2xl mb-4"
          variant="outline"
          size="icon"
        >
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <h3 className="text-xl font-bold mb-4">Adicionar Novo Produto</h3>
        <ProductForm
          categories={categories}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}