import { defineStore } from 'pinia';
import type { PhotoPackage } from '@/features/products/types';
import { productService } from '@/features/products/product.service';
import { ref } from 'vue';

export const useProductsStore = defineStore('products', () => {
  const products = ref<PhotoPackage[]>([]);
  async function initProducts() {
    products.value = await productService.getProducts();
  }

  return { initProducts, products };
});
