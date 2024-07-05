import { defineStore } from 'pinia';
import type { PhotoPackage } from '@/features/products/types';
import { productService } from '@/features/products/product.service';
import { ref } from 'vue';
import { useLoader } from '@/shared/utils/load';

export const useProductsStore = defineStore('products', () => {
  const products = ref<PhotoPackage[]>([]);
  const { isError, load, isLoading } = useLoader(initProducts);

  async function initProducts() {
    products.value = await productService.getProducts();

    return !!products.value.length;
  }

  return { initProducts: load, products, isLoading, isError };
});
