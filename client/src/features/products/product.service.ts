import axios from 'axios';
import type { PhotoPackage, RawPackage } from '@/features/products/types';
import { apiClient } from '@/shared/api/api.client';

export const productService = {
  async getProducts(): Promise<PhotoPackage[]> {
    try {
      const result = await apiClient.get<RawPackage[]>('products');

      return result.data.map((el) => ({
        id: el.id,
        width: el.width,
        height: el.height,
        price: el.price,
        minAmount: el.minAmount || 1,
        photosPerItem: el.photosPerItem || 1
      }));
    } catch (err) {
      return [];
    }
  }
};
