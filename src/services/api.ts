import { ProductFormGroupData } from '@/lib/productSchema';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const getProducts = async (category?: string, price?: string) => {
  const response = await api.get(`/products?&category=${category}&price=${price}`);
  return response.data;
};

export const createproduct = async (products: ProductFormGroupData) => {
  const response = await api.post('/products', products);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};



export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};