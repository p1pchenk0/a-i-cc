<script setup lang="ts">
withDefaults(
  defineProps<{
    loading?: boolean;
    disabled?: boolean;
    icon?: string;
    color?: string;
    size?: 'small' | 'medium' | 'large';
  }>(),
  {
    color: 'primary',
    size: undefined
  }
);
</script>

<template>
  <v-btn
    :disabled="disabled"
    :color="color"
    :loading="loading"
    :elevation="6"
    :size="size"
    class="font-weight-bold"
    variant="outlined"
  >
    <div :class="['px-2 d-flex align-center', `text-${color}`]">
      <v-icon v-if="icon" class="mr-2" :icon="icon" />
      <slot></slot>
    </div>
  </v-btn>
</template>

<style scoped lang="scss">
button {
  border: none;
}
</style>
