---
name: create-route
description: 指导在前端项目中按团队规范创建和维护路由，包括 src/views 页面目录、index.vue 页面文件与 src/router 集中配置。当前端需要新增或重构页面路由时使用本技能。
---

# 创建与维护路由

## 重要提示

在开始创建之前，请务必阅读以下关键规范：

**必读规范**：
- `.agents/rules/03-项目结构.instructions.md` - 目录结构要求（特别是 `index.module.scss`）
- `.agents/rules/06-路由规范.instructions.md` - 路由配置约束

**常见错误警告**：
- 页面目录必须放在 `src/views/<view-name>/`
- 页面样式默认写在 `index.vue` 的 `<style scoped lang="scss">` 中；仅样式需要复用时使用 `.module.scss`
- 页面目录名使用 `kebab-case`，例如 `login`、`ai-editor`
- 必须在全局唯一路由入口注册，禁止多处维护同一条路由

---

## 标准路由目录结构

每个路由对应 `src/views/<view-name>/` 目录：

```text
src/views/login/
  └─ index.vue             # 页面主组件，样式默认写 scoped style
```

**关键要求**：
- 页面文件名：`index.vue`
- 目录名：`kebab-case`
- 路由配置统一写在 `src/router/index.ts`

---

## 步骤 1：创建页面组件

```vue
<!-- src/views/login/index.vue -->
<template>
  <div class="login-page">LoginPage</div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.login-page {
  min-height: 100%;
}
</style>
```

**验证点**：
- [ ] 文件名为 `index.vue`
- [ ] 页面样式默认使用 `<style scoped lang="scss">`
- [ ] 未在页面内写路由配置

---

## 步骤 2：在全局路由中注册

在 `src/router/index.ts` 中注册：

```ts
import type {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {requiresAuth: true},
  },
  // ...
];

export default routes;
```

**验证点**：
- [ ] 只在唯一路由入口注册
- [ ] 使用 `import()` 懒加载 `src/views/<view-name>/index.vue`

---

## 步骤 3：验证文件结构

创建完成后，检查目录结构是否符合规范：

```text
src/views/<view-name>/
  └─ index.vue             ✓
```

**快速验证命令**：

```bash
ls -la src/views/<view-name>/
```

应该看到 `index.vue`，如有页面专用组件再检查 `components/` 目录。

---

## 页面级组件放置

如果页面需要专用组件，创建 `components/` 目录：

```text
src/views/ai-editor/
  ├─ index.vue
  └─ components/           # 页面专用组件
      └─ xxx/
          └─ index.vue
```

**组件放置规则**（详见 `.agents/rules/04-组件规范.instructions.md`）：
- 页面级组件（仅当前页面使用）→ `src/views/<view>/components/`
- 通用组件（多处复用）→ `src/components/`

---

## 快速检查清单

创建完成后，逐项核对：

- [ ] 路由目录名为 `kebab-case`
- [ ] 存在 `index.vue`
- [ ] 页面样式默认使用 `<style scoped lang="scss">`
- [ ] 路由在唯一入口文件注册
- [ ] 组件放置位置正确（通用 vs 页面级）

**样式还原检查**：涉及 UI 还原的样式开发，请参考 `.agents/skills/create-proposal/SKILL.md` 中的「样式还原验证检查清单」及对应页面的 `docs/样式还原/<名称>-UI分析清单.md`。
