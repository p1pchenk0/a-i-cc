<script setup lang="ts">
import { t } from '@/localization';
import AppButton from '@/components/AppButton.vue';

const model = defineModel<boolean>();
const emit = defineEmits(['clear-cart']);
</script>

<template>
  <v-dialog v-model="model" width="auto" persistent>
    <v-card max-width="400" :title="t('product-page.sure')">
      <template #text>
        {{ t('product-page.warning-lose-prize') }}
      </template>
      <template v-slot:actions>
        <AppButton color="error" @click="emit('clear-cart')">
          {{ t('product-page.clear-cart') }}
        </AppButton>
        <AppButton @click="model = false">
          {{ t('product-page.keep-cart') }}
        </AppButton>
      </template>
    </v-card>
  </v-dialog>
</template>
