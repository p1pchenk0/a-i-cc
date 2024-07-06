<script setup lang="ts">
defineProps<{
  color?: string;
  content?: string;
}>();
</script>

<template>
  <v-badge :color="color" :content="content" />
</template>

<style scoped lang="scss"></style>
