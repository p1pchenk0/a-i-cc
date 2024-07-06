<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <v-icon :icon="name" />
</template>
