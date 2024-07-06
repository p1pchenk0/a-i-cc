<script setup lang="ts">
const model = defineModel();

defineProps<{
  options: { label: string; value: string | number }[];
}>();
</script>

<template>
  <v-radio-group v-model="model">
    <v-radio
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </v-radio-group>
</template>
