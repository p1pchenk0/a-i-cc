<script setup lang="ts">
import { t } from '@/localization';
import { AppButton } from '@/components';

defineProps<{
  disabled: boolean;
}>();

const emit = defineEmits<{
  action: [type: 'save' | 'proceed'];
}>();
</script>

<template>
  <AppButton
    :disabled="disabled"
    @click="emit('action', 'proceed')"
    color="success"
    icon="mdi-camera"
    size="large"
  >
    {{ t('photo-booth-page.take-and-proceed') }}
  </AppButton>

  <AppButton :disabled="disabled" @click="emit('action', 'save')" icon="mdi-content-save-outline">
    {{ t('photo-booth-page.save') }}
  </AppButton>
</template>

<style scoped lang="scss"></style>
