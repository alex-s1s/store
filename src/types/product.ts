export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: Rate;
}

interface Rate {
  rate: number;
  count: number;
}

