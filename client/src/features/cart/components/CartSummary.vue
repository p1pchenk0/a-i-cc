<script setup lang="ts">
import { c, t } from '@/localization';
import type { PhotoPackage } from '@/features/products/types';
import { computed } from 'vue';
import { AppAlert, AppChip, AppIcon } from '@/components';
import { Package } from '@/features/products/components';

const props = defineProps<{
  isEmpty: boolean;
  total: number;
  pricedItem: PhotoPackage | null;
  freeItems: PhotoPackage[];
  photoUrl?: string;
}>();

const formattedTotal = computed(() => c(props.total));

const formattedPricedItem = computed(() => {
  if (!props.pricedItem) return null;

  return {
    ...props.pricedItem,
    scale: 40,
    photoUrl: props.photoUrl,
    still: true,
    hidePrice: true
  };
});

const formattedFreeItems = computed(() => {
  return props.freeItems.map((item) => {
    return {
      ...item,
      price: 0,
      photoUrl: props.photoUrl,
      still: true
    };
  });
});
</script>

<template>
  <div class="mt-6">
    <AppAlert v-if="isEmpty" class="text-center justify-center" icon="mdi-cart-remove">
      {{ t('product-page.empty-cart') }}
    </AppAlert>
    <template v-else>
      <div>{{ t('product-page.pay-for') }}</div>
      <Package
        v-if="formattedPricedItem"
        class="justify-center mb-4"
        v-bind="formattedPricedItem"
      />
      <AppAlert v-if="freeItems.length" color="success" class="text-center mb-2">
        <div class="mb-4">
          <AppIcon name="mdi-emoticon-cool" />
          {{ t('product-page.win') }}
        </div>
        <div class="d-flex ga-8 justify-center flex-column flex-md-row">
          <Package
            v-for="freeItem in formattedFreeItems"
            class="justify-center mb-4"
            v-bind="freeItem"
          />
        </div>
      </AppAlert>
      <AppChip class="mt-2">
        {{ t('product-page.total', { total: formattedTotal }) }}
      </AppChip>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
