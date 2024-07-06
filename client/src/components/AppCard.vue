<script setup lang="ts">
defineProps<{
  maxWidth?: string | number;
  title?: string;
  elevation?: string | number;
}>();
</script>

<template>
  <v-card :max-width="maxWidth" :title="title" :elevation="elevation">
    <template v-if="$slots.title?.()" #title>
      <slot name="title"></slot>
    </template>
    <template v-if="$slots.subtitle?.()" #subtitle>
      <slot name="subtitle"></slot>
    </template>
    <template v-if="$slots.text?.()" #text>
      <slot name="text"></slot>
    </template>
    <slot></slot>
    <template v-if="$slots.actions?.()" #actions>
      <slot name="actions"></slot>
    </template>
  </v-card>
</template>

<style scoped lang="scss"></style>
