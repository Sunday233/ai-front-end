import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/workbench',
  },
  {
    path: '/workbench',
    name: 'workbench',
    component: () => import('@/views/workbench/index.vue'),
    meta: {
      title: '工作台',
    },
  },
  {
    path: '/object-type/list',
    name: 'object-type-list',
    component: () => import('@/views/object-type-list/index.vue'),
    meta: {
      title: '对象类型',
    },
  },
  {
    path: '/object-type/create',
    name: 'object-type-create',
    component: () => import('@/views/object-type-create/index.vue'),
    meta: {
      title: '创建对象类型',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
