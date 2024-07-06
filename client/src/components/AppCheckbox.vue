<script setup lang="ts">
const model = defineModel<boolean>();

defineProps<{
  label: string;
  hideDetails?: boolean;
}>();
</script>

<template>
  <v-checkbox :hide-details="hideDetails" :label="label" v-model="model" />
</template>
