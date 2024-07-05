<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { routes } from '@/router/routes';
import { watch } from 'vue';

const route = useRoute();

const links = [
  {
    title: 'Photo booth',
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

function changeFavicon(faviconURL: string) {
  let link = document.getElementById('dynamic-favicon') as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.id = 'dynamic-favicon';
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  link.href = faviconURL;
}

watch(
  () => route.name,
  () => {
    const newTitle = links.find((el) => el.name === route.name)?.title;

    if (newTitle) document.title = newTitle;

    changeFavicon(`${route.name?.toString()}.ico`);
  }
);
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
