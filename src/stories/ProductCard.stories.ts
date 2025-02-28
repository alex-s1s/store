import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  args: {
    id: 1,
    title: "Produto de Exemplo",
    description: "Uma descrição curta do produto para exibição.",
    price: 199.99,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    category: "Example Category",
    rating: {
      rate: 4.5,
    },
  } as Product,
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {};
