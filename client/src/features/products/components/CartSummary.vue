<script setup lang="ts">
import { c, t } from '@/localization';
import Package from '@/features/products/components/Package.vue';
import type { PhotoPackage } from '@/features/products/types';
import { computed } from 'vue';

const props = defineProps<{
  isEmpty: boolean;
  total: number;
  pricedItem: PhotoPackage;
  freeItems: PhotoPackage[];
  photoUrl?: string;
}>();

const formattedTotal = computed(() => c(props.total));

const formattedPricedItem = computed(() => ({
  ...props.pricedItem,
  scale: 40,
  photoUrl: props.photoUrl,
  still: true,
  hidePrice: true
}));

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
    <v-alert v-if="isEmpty" class="text-center justify-center" icon="mdi-cart-remove">
      {{ t('product-page.empty-cart') }}
    </v-alert>
    <template v-else>
      <div>{{ t('product-page.pay-for') }}</div>
      <Package class="justify-center mb-4" v-bind="formattedPricedItem" />
      <v-alert v-if="freeItems.length" color="success" class="text-center mb-2">
        <div class="mb-4">
          <v-icon icon="mdi-emoticon-cool" />
          {{ t('product-page.win') }}
        </div>
        <div class="d-flex ga-8 justify-center flex-column flex-md-row">
          <Package
            v-for="freeItem in formattedFreeItems"
            class="justify-center mb-4"
            v-bind="freeItem"
          />
        </div>
      </v-alert>
      <v-chip class="mt-2">
        {{ t('product-page.total', { total: formattedTotal }) }}
      </v-chip>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
