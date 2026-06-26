import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/workbench",
  },
  {
    path: "/workbench",
    name: "workbench",
    component: () => import("@/views/workbench/index.vue"),
  },
  {
    path: "/object-types",
    name: "object-type-list",
    component: () => import("@/views/object-type-list/index.vue"),
  },
  {
    path: "/object-types/create",
    name: "object-type-create",
    component: () => import("@/views/object-type-create/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
