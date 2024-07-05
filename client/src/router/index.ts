import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/router/routes';
import { ro } from 'vuetify/locale';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: { name: routes.photo.name }
    },
    {
      path: routes.photo.path,
      name: routes.photo.name,
      component: () => import('@/features/photo/PhotoView.vue')
    },
    {
      path: routes.products.path,
      name: routes.products.name,
      component: () => import('@/features/products/ProductsView.vue')
    },
    {
      path: routes.report.path,
      name: routes.report.name,
      component: () => import('@/features/report/ReportView.vue')
    }
  ]
});

export default router;
