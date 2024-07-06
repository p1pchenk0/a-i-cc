<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { routes } from '@/router/routes';
import { computed, ref, watch } from 'vue';
import { PageLayout } from '@/layouts';

const route = useRoute();
const currentLayout = ref('');

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

const layoutMap = {
  page: PageLayout
};

const layoutComponent = computed(() => {
  return layoutMap[currentLayout.value as keyof typeof layoutMap] || layoutMap.page;
});

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

    currentLayout.value = route.meta.layout as string;
  }
);
</script>

<template>
  <div class="bg-grey-darken-4 d-flex justify-center ga-6 pa-4">
    <RouterLink v-for="link in links" class="text-green" :to="{ name: link.name }">
      {{ link.title }}
    </RouterLink>
  </div>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;

  &.router-link-active {
    font-weight: bold;
  }
}
</style>
