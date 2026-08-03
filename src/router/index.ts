import { createRouter, createWebHistory } from 'vue-router';
import useUserStore from '@/store/modules/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/',
      component: () => import('../layouts/DefaultLayout.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/dashboard/index.vue'),
          meta: { title: '工作台' },
        },
      ],
    },
  ],
});

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.name !== 'login' && !userStore.token) {
    next({ name: 'login' });
  } else if (to.name === 'login' && userStore.token) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router;
