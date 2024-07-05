import type { PhotoPackage } from '@/features/products/types';
import { apiClient } from '@/shared/api/api.client';

export const cartService = {
  async sendOrder(order: { freeItems: PhotoPackage[]; pricedItem: PhotoPackage }) {
    try {
      const payload = [
        ...order.freeItems.map(({ id, price }) => ({ id, price, free: true })),
        { id: order.pricedItem.id, price: order.pricedItem.price }
      ];

      const result = await apiClient.post<{ success: boolean }>('order', payload);

      return result.data;
    } catch (err) {
      return { success: false };
    }
  }
};
