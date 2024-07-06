<script setup lang="ts">
defineProps<{
  icon?: string;
  color?: string;
}>();
</script>

<template>
  <v-alert :icon="icon" :color="color">
    <slot></slot>
  </v-alert>
</template>
