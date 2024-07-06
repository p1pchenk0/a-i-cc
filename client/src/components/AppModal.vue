<script setup lang="ts">
const model = defineModel<boolean>();

defineProps<{
  width?: string;
  persistent?: boolean;
}>();
</script>

<template>
  <v-dialog v-model="model" :width="width" :persistent="persistent">
    <slot></slot>
  </v-dialog>
</template>

<style scoped lang="scss"></style>
