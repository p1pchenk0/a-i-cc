import axios from 'axios';
import type { PhotoPackage } from '@/features/products/types';

export const cartService = {
  async sendOrder(order: { freeItems: PhotoPackage[]; pricedItem: PhotoPackage }) {
    try {
      const payload = [
        ...order.freeItems.map(({ id, price }) => ({ id, price, free: true })),
        { id: order.pricedItem.id, price: order.pricedItem.price }
      ];

      const result = await axios.post<{ success: boolean }>('http://127.0.0.1:3000/order', payload);

      return result.data;
    } catch (err) {
      return { success: false };
    }
  }
};
