<script setup lang="ts">
import type { PhotoPackage } from '@/features/products/types';
import { CartActions, CartSummary, ClearCartDialog } from '@/features/cart/components';
import { LotteryHint, Package, Tweaker } from '@/features/products/components';
import { PageLayout } from '@/layouts';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { t } from '@/localization';
import { useCartStore } from '@/features/cart/cart.store';
import { useLottery } from '@/features/lottery';
import { usePhotoStore } from '@/features/photo/photo.store';
import { useProductsStore } from '@/features/products/products.store';
import { AppSkeleton, AppSnackbar } from '@/components';

const productsStore = useProductsStore();
const { products, isLoading, isError } = storeToRefs(productsStore);
const photoStore = usePhotoStore();
const { lastPhotoUrl } = storeToRefs(photoStore);
const cartStore = useCartStore();
const { cartTotal, isEmptyCart, hasFreeItems, isPaymentInProgress, isPaymentSuccessful } =
  storeToRefs(cartStore);

const { selectedLotteryInterval, resetLottery, attemptLotteryPlay } = useLottery();

const isPaymentDone = ref(false);
const dialog = ref(false);

const paymentResultText = computed(() => {
  return isPaymentSuccessful.value
    ? t('product-page.payment-success')
    : t('product-page.payment-error');
});

const makeOrder = (photoPackage: PhotoPackage) => {
  if (isPaymentInProgress.value) return;

  cartStore.initCart(photoPackage);

  const prize = attemptLotteryPlay(
    products.value
      .filter((otherPackage) => photoPackage.id !== otherPackage.id)
      .map((otherPackage) => ({ ...otherPackage, free: true }))
  );

  if (prize) cartStore.addToCart(prize);
};

const pay = async () => {
  isPaymentDone.value = false;

  await cartStore.payForCart();

  isPaymentDone.value = true;

  if (isPaymentSuccessful.value) resetLottery();
};

const clearCart = () => {
  if (!hasFreeItems.value || dialog.value) {
    dialog.value = false;
    cartStore.clearCart();

    return;
  }

  dialog.value = true;
};

const onCartAction = (type: string) => {
  if (type === 'pay') {
    pay();

    return;
  }

  clearCart();
};

onMounted(() => {
  productsStore.initProducts();
});
</script>

<template>
  <PageLayout>
    <template #title>{{ t('product-page.title') }}</template>
    <template #subtitle>{{ t('product-page.subtitle') }}</template>
    <template #text>
      <LotteryHint />

      <div class="justify-center d-flex ga-6 mt-6 flex-column flex-md-row">
        <div v-if="isLoading" class="w-100">
          <AppSkeleton class="w-100 ga-4 flex-nowrap" type="image@3" />
        </div>
        <template v-if="!isLoading && !isError">
          <Package
            v-for="photoPackage in products"
            v-bind="{ ...photoPackage, photoUrl: lastPhotoUrl }"
            :key="photoPackage.id"
            @click="makeOrder(photoPackage)"
          />
        </template>
      </div>

      <CartSummary
        :free-items="cartTotal.freeItems"
        :total="cartTotal.total"
        :priced-item="cartTotal.pricedItem"
        :is-empty="isEmptyCart"
        :photo-url="lastPhotoUrl"
      />
    </template>

    <template #actions v-if="!isEmptyCart">
      <CartActions :loading="isPaymentInProgress" @action="onCartAction" />
    </template>
  </PageLayout>

  <Tweaker v-model="selectedLotteryInterval" />

  <AppSnackbar
    :model-value="isPaymentDone"
    :timeout="1000"
    :color="isPaymentSuccessful ? 'success' : 'error'"
  >
    <div class="text-center">
      {{ paymentResultText }}
    </div>
  </AppSnackbar>

  <AppSnackbar :model-value="isError" color="error" :timeout="2000">
    <div class="text-center">{{ t('product-page.products-load-error') }}</div>
  </AppSnackbar>

  <ClearCartDialog v-model="dialog" @clear-cart="clearCart" />
</template>
