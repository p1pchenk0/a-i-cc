import type { PhotoPackage } from '@/features/products/types';
import { computed, readonly, ref } from 'vue';
import { defineStore } from 'pinia';
import { useLoader } from '@/shared/utils/load';
import { cartService } from '@/features/cart/cart.service';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<PhotoPackage[]>([]);
  const { load, isLoading, isError } = useLoader(payForCart);

  const cartTotal = computed(() => {
    const { freeItems, pricedItem } = cart.value.reduce(
      (acc, curr) => {
        if (curr.free) {
          acc.freeItems.push(curr);
        } else {
          acc.pricedItem = curr;
        }

        return acc;
      },
      { freeItems: [] as PhotoPackage[], pricedItem: null as PhotoPackage | null }
    );

    return {
      total: pricedItem?.price || 0,
      freeItems,
      pricedItem
    };
  });

  const isEmptyCart = computed(() => !cart.value.length);

  const hasFreeItems = computed(() => !!cartTotal.value.freeItems.length);

  const isPaymentSuccessful = computed(() => !isError.value);

  function clearCart() {
    cart.value = [];
  }

  function initCart(photoPackage: PhotoPackage) {
    cart.value = [photoPackage];
  }

  function addToCart(photoPackages: PhotoPackage[]) {
    cart.value.push(...photoPackages);
  }

  async function payForCart() {
    const { success } = await cartService.sendOrder({
      freeItems: cartTotal.value.freeItems,
      pricedItem: cartTotal.value.pricedItem!
    });

    if (success) clearCart();

    return success;
  }

  return {
    addToCart,
    cartTotal,
    clearCart,
    hasFreeItems,
    initCart,
    isEmptyCart,
    isPaymentInProgress: isLoading,
    isPaymentSuccessful,
    payForCart: load
  };
});
