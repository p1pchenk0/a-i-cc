<script setup lang="ts">
withDefaults(
  defineProps<{
    loading?: boolean;
    disabled?: boolean;
    icon?: string;
    color?: string;
  }>(),
  {
    color: 'primary'
  }
);
</script>

<template>
  <v-btn :disabled="disabled" :color="color" :loading="loading" variant="outlined">
    <v-icon v-if="icon" class="mr-2" :icon="icon" />
    <slot></slot>
  </v-btn>
</template>

<style scoped lang="scss"></style>
