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
    name: "workbench",
    component: () => import("@/views/workbench/index.vue"),
    meta: { title: "工作台" },
  },
  {
    path: "/object-types",
    name: "object-types",
    component: () => import("@/views/object-type-list/index.vue"),
    meta: { title: "对象类型" },
  },
  {
    path: "/object-types/create",
    name: "object-type-create",
    component: () => import("@/views/object-type-create/index.vue"),
    meta: { title: "创建对象类型" },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/workbench",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
