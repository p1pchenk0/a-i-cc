<script setup lang="ts">
import type { VTooltip } from 'vuetify/components';

defineProps<{
  text: string;
  contentClass?: string;
  width?: number;
  location: VTooltip['location'];
}>();
</script>

<template>
  <v-tooltip :text="text" :content-class="contentClass" :width="width" :location="location">
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind="{ props }"></slot>
    </template>
  </v-tooltip>
</template>
