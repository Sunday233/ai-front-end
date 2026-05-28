import {
  type RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/workbench",
  },
  {
    path: "/workbench",
    name: "Workbench",
    component: () => import("@/views/workbench/index.vue"),
  },
  {
    path: "/object-types",
    name: "ObjectTypeList",
    component: () => import("@/views/object-type-list/index.vue"),
  },
  {
    path: "/object-types/create",
    name: "ObjectTypeCreate",
    component: () => import("@/views/object-type-create/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
