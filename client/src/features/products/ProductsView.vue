<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import LotteryHint from '@/features/products/components/LotteryHint.vue';
import Package from '@/features/products/components/Package.vue';
import PageLayout from '@/layouts/PageLayout.vue';
import Tweaker from '@/features/products/components/Tweaker.vue';
import type { PhotoPackage } from '@/features/products/types';
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { useLottery } from '@/features/lottery';
import { usePhotoStore } from '@/features/photo/photo.store';
import { useProductsStore } from '@/features/products/products.store';
import { c, t } from '@/localization';

const productsStore = useProductsStore();
const { products, isLoading, isError } = storeToRefs(productsStore);
const photoStore = usePhotoStore();
const { lastPhotoUrl } = storeToRefs(photoStore);
const cartStore = useCartStore();
const { cart, cartTotal, hasFreeItems, pricedItem, isPaymentInProgress, isPaymentSuccessful } =
  storeToRefs(cartStore);

const { selectedLotteryInterval, resetLottery, attemptLotteryPlay } = useLottery();

const isPaymentDone = ref(false);
const dialog = ref(false);

const formattedTotal = computed(() => {
  return {
    ...cartTotal.value,
    total: c(cartTotal.value.total)
  };
});

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
          <v-skeleton-loader class="w-100 ga-4 flex-nowrap" type="image@3"></v-skeleton-loader>
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

      <div class="mt-6">
        <v-alert v-if="!cart.length" class="text-center justify-center" icon="mdi-cart-remove">
          {{ t('product-page.empty-cart') }}
        </v-alert>
        <template v-else>
          <div>{{ t('product-page.pay-for') }}</div>
          <Package
            class="justify-center mb-4"
            v-bind="{
              ...pricedItem!,
              scale: 40,
              photoUrl: lastPhotoUrl,
              still: true,
              hidePrice: true
            }"
          />
          <v-alert v-if="hasFreeItems" color="success" class="text-center mb-2">
            <div class="mb-4">
              <v-icon icon="mdi-emoticon-cool" />
              {{ t('product-page.win') }}
            </div>
            <div class="d-flex ga-8 justify-center flex-column flex-md-row">
              <Package
                v-for="free in formattedTotal.freeItems"
                class="justify-center mb-4"
                v-bind="{
                  ...free,
                  price: 0,
                  photoUrl: lastPhotoUrl,
                  still: true
                }"
              />
            </div>
          </v-alert>
          <v-chip class="mt-2">
            {{ t('product-page.total', { total: formattedTotal.total }) }}
          </v-chip>
        </template>
      </div>
    </template>

    <template #actions v-if="cart.length">
      <AppButton
        :loading="isPaymentInProgress"
        :disabled="isPaymentInProgress"
        @click="pay"
        size="large"
        icon="mdi-credit-card-outline"
      >
        {{ t('product-page.pay') }}
      </AppButton>

      <AppButton :disabled="isPaymentInProgress" color="error" @click="clearCart">
        {{ t('product-page.clear-cart') }}
      </AppButton>
    </template>
  </PageLayout>

  <Tweaker v-model="selectedLotteryInterval" />

  <v-snackbar
    v-model="isPaymentDone"
    :timeout="1000"
    :color="isPaymentSuccessful ? 'success' : 'error'"
  >
    <div class="text-center">
      {{ paymentResultText }}
    </div>
  </v-snackbar>

  <v-snackbar :model-value="isError" color="error" :timeout="2000">
    <div class="text-center">{{ t('product-page.products-load-error') }}</div>
  </v-snackbar>

  <v-dialog v-model="dialog" width="auto" persistent>
    <v-card max-width="400" :title="t('product-page.sure')">
      <template #text>
        {{ t('product-page.warning-lose-prize') }}
      </template>
      <template v-slot:actions>
        <AppButton color="error" @click="clearCart">{{ t('product-page.clear-cart') }}</AppButton>
        <AppButton @click="dialog = false">{{ t('product-page.keep-cart') }}</AppButton>
      </template>
    </v-card>
  </v-dialog>
</template>
