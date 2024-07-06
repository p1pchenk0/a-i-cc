<script setup lang="ts">
import { t } from '@/localization';
import { AppButton, AppCard, AppModal } from '@/components';

const model = defineModel<boolean>();
const emit = defineEmits(['clear-cart']);
</script>

<template>
  <AppModal v-model="model" width="auto" persistent>
    <AppCard max-width="400" :title="t('product-page.sure')">
      <template #text>
        {{ t('product-page.warning-lose-prize') }}
      </template>
      <template #actions>
        <AppButton color="error" @click="emit('clear-cart')">
          {{ t('product-page.clear-cart') }}
        </AppButton>
        <AppButton @click="model = false">
          {{ t('product-page.keep-cart') }}
        </AppButton>
      </template>
    </AppCard>
  </AppModal>
</template>
