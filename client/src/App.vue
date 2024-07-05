<script setup lang="ts">
import { RouterView } from 'vue-router';
import { routes } from '@/router/routes';

const links = [
  {
    title: 'Photo',
    name: routes.photo.name
  },
  {
    title: 'Products',
    name: routes.products.name
  },
  {
    title: 'Report',
    name: routes.report.name
  }
];
</script>

<template>
  <div class="bg-grey-darken-4 d-flex justify-center ga-6 pa-4">
    <RouterLink v-for="link in links" class="text-green" :to="{ name: link.name }">
      {{ link.title }}
    </RouterLink>
  </div>
  <RouterView />
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;

  &.router-link-active {
    font-weight: bold;
  }
}
</style>
