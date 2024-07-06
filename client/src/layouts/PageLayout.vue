<script setup lang="ts">
import { AppCard } from '@/components';
</script>

<template>
  <AppCard class="page-container my-10 mx-auto" elevation="16">
    <template #title>
      <slot name="title"></slot>
    </template>

    <template #subtitle>
      <slot name="subtitle"></slot>
    </template>

    <template #text>
      <slot name="text"></slot>
    </template>

    <slot></slot>

    <template v-if="$slots.actions?.()" #actions>
      <div class="pa-4">
        <slot name="actions"></slot>
      </div>
    </template>
  </AppCard>
</template>

<style scoped lang="scss">
.page-container {
  max-width: 750px;
  width: 50%;
  min-width: 300px;
}
</style>
