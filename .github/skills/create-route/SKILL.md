---
name: create-route
description: 指导在前端项目中按团队规范创建和维护路由，包括目录结构、Page 与 Loader 职责划分及懒加载用法。当前端需要新增或重构页面路由时使用本技能。
---

# 创建与维护路由

## 重要提示

在开始创建之前，请务必阅读以下关键规范：

**必读规范**：
- `.github/instructions/03-项目结构.instructions.md` - 目录结构要求（特别是 `index.module.scss`）
- `.github/instructions/06-路由规范.instructions.md` - 路由配置约束

**常见错误警告**：
- 样式文件必须使用 `.module.scss` 后缀，禁止使用 `.scss`
- 路由目录名使用 `kebab-case`，例如 `login`、`ai-editor`
- 必须在全局唯一路由入口注册，禁止多处维护同一条路由

---

## 标准路由目录结构

每个路由对应 `src/routes/<route-name>/` 目录：

```text
src/routes/login/
  ├─ Page.vue              # 页面主组件
  ├─ Loader.ts             # 懒加载包装
  └─ index.module.scss     # 样式文件（必须是 .module.scss）
```

**关键要求**：
- 样式文件后缀：`index.module.scss`（非 `.scss`）
- 组件导出：默认导出 `Page` 组件
- 目录名：`kebab-case`

---

## 步骤 1：创建 Page 组件

```vue
<!-- src/routes/login/Page.vue -->
<template>
  <div :class="styles.loginPage">LoginPage</div>
</template>

<script setup lang="ts">
import styles from './index.module.scss';
</script>
```

**验证点**：
- [ ] 文件名为 `Page.vue`
- [ ] 样式导入为 `./index.module.scss`
- [ ] 默认导出组件

---

## 步骤 2：创建 Loader 组件（懒加载）

```ts
// src/routes/login/Loader.ts
const Loader = () => import('./Page.vue');

export default Loader;
```

**验证点**：
- [ ] 文件名为 `Loader.ts`
- [ ] 使用动态 `import()` 懒加载 Page
- [ ] 不在 Loader 中声明路由

---

## 步骤 3：在全局路由中注册

在 `src/routes/index.ts` 中注册：

```ts
import type {RouteRecordRaw} from 'vue-router';
import LoginLoader from './login/Loader';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: LoginLoader,
    meta: {requiresAuth: true},
  },
  // ...
];

export default routes;
```

**验证点**：
- [ ] 只在唯一路由入口注册
- [ ] 导入路径正确 `./login/Loader`

---

## 步骤 4：验证文件结构

创建完成后，检查目录结构是否符合规范：

```text
src/routes/<route-name>/
  ├─ Page.vue              ✓
  ├─ Loader.ts             ✓
  └─ index.module.scss     ✓（必须是 .module.scss）
```

**快速验证命令**：

```bash
ls -la src/routes/<route-name>/
```

应该看到三个文件，且样式文件后缀为 `.module.scss`。

---

## 页面级组件放置

如果页面需要专用组件，创建 `components/` 目录：

```text
src/routes/ai-editor/
  ├─ Page.vue
  ├─ Loader.ts
  ├─ index.module.scss
  └─ components/           # 页面专用组件
      └─ xxx/
          ├─ index.vue
          └─ index.module.scss
```

**组件放置规则**（详见 `.github/instructions/04-组件规范.instructions.md`）：
- 页面级组件（仅当前页面使用）→ `src/routes/<route>/components/`
- 通用组件（多处复用）→ `src/components/`

---

## 快速检查清单

创建完成后，逐项核对：

- [ ] 路由目录名为 `kebab-case`
- [ ] 存在 `Page.vue`
- [ ] 存在 `Loader.ts`
- [ ] 存在 `index.module.scss`（非 `.scss`）
- [ ] Page 中样式导入为 `./index.module.scss`
- [ ] Loader 只负责懒加载 Page
- [ ] 路由在唯一入口文件注册
- [ ] 组件放置位置正确（通用 vs 页面级）

**样式还原检查**：涉及 UI 还原的样式开发，请参考 `.github/skills/create-proposal/SKILL.md` 中的「样式还原验证检查清单」及对应页面的 `docs/样式还原/<名称>-UI分析清单.md`。
