import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store/user';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard/index.vue'),
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: '登录',
    },
  },
];

const Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default Router;
