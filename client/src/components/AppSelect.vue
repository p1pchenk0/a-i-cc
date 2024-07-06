<script setup lang="ts">
const model = defineModel<string>();

defineProps<{
  label: string;
  items: string[];
}>();
</script>

<template>
  <v-select v-model="model" :label="label" :items="items" />
</template>

<style scoped lang="scss"></style>
