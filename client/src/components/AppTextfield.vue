<script setup lang="ts">
const model = defineModel<string | number>();

defineProps<{
  label: string;
  type?: string;
  hint?: string;
  clearable?: boolean;
  persistentHint?: boolean;
  rules?: ((v: any) => boolean | string)[];
}>();
</script>

<template>
  <v-text-field
    :type="type"
    :label="label"
    :hint="hint"
    :clearable="clearable"
    :persistent-hint="persistentHint"
    :rules="rules"
    v-model="model"
  />
</template>

<style scoped lang="scss"></style>
