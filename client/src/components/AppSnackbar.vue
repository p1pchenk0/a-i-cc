<script setup lang="ts">
const model = defineModel<boolean>();

defineProps<{
  color?: string;
  timeout?: number;
}>();
</script>

<template>
  <v-snackbar v-model="model" :color="color" :timeout="timeout">
    <slot></slot>
  </v-snackbar>
</template>

<style scoped lang="scss"></style>
