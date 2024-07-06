<script setup lang="ts">
import { t } from '@/localization';
import AppButton from '@/components/AppButton.vue';

defineProps<{
  loading: boolean;
}>();

const emit = defineEmits<{
  action: [type: 'pay' | 'clear'];
}>();
</script>

<template>
  <AppButton
    :loading="loading"
    :disabled="loading"
    @click="emit('action', 'pay')"
    size="large"
    icon="mdi-credit-card-outline"
  >
    {{ t('product-page.pay') }}
  </AppButton>

  <AppButton :disabled="loading" color="error" @click="emit('action', 'clear')">
    {{ t('product-page.clear-cart') }}
  </AppButton>
</template>
