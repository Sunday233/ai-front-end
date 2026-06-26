## 1. Preparation

- [x] 1.1 读取 `docs/prd/workbench.md`、`docs/prd/object-type-list.md`、`docs/prd/object-type-create.md`。
- [x] 1.2 读取 `docs/样式还原/workbench-UI分析清单.md`、`docs/样式还原/object-type-list-UI分析清单.md`、`docs/样式还原/object-type-create-UI分析清单.md`。
- [x] 1.3 读取并按组件拆分清单实施：`docs/组件拆分/workbench-组件拆分清单.md`、`docs/组件拆分/object-type-list-组件拆分清单.md`、`docs/组件拆分/object-type-create-组件拆分清单.md`。
- [x] 1.4 读取 Rules：项目结构、组件、API、路由、样式、通用约束、测试规范。
- [x] 1.5 加载 Skills：`create-route`、`create-component`、`theme-variables`、`create-api`、`api-doc-summary`、`openspec-apply-change`、`ui-verification`。

## 2. Application Foundation

- [x] 2.1 新增 Vue 3 + Vite + TypeScript 工程基座：`package.json`、`vite.config.ts`、`tsconfig*.json`、`index.html`、`src/main.ts`、`src/App.vue`。
- [x] 2.2 新增 Biome、样式入口、主题变量、reset，确保主色、背景、字体、边框、状态色来自设计规范。
- [x] 2.3 新增 `src/router/index.ts` 并集中配置 `/workbench`、`/object-types`、`/object-types/create`，根路径重定向到 `/workbench`。
- [x] 2.4 新增公共布局 `src/layout/app-shell/index.vue`，承接三页左侧导航、数量标签、底部保存区和内容工作区。

## 3. Data And API Layer

- [x] 3.1 创建 `src/services/client.ts`，唯一封装 axios 实例、Token 拦截、响应解包、错误处理与 mock adapter。
- [x] 3.2 创建 `src/services/mock.ts`，仅注册页面级 mock handler。
- [x] 3.3 创建 workbench 页面类型、service 与 mock：`src/types/workbench/model.ts`、`src/types/workbench/api.ts`、`src/services/workbench.ts`、`src/services/workbench.mock.ts`。
- [x] 3.4 创建 object-type-list 页面类型、service 与 mock：`src/types/object-type-list/model.ts`、`src/types/object-type-list/api.ts`、`src/services/object-type-list.ts`、`src/services/object-type-list.mock.ts`。
- [x] 3.5 创建 object-type-create 页面类型、service 与 mock：`src/types/object-type-create/model.ts`、`src/types/object-type-create/api.ts`、`src/services/object-type-create.ts`、`src/services/object-type-create.mock.ts`。
- [x] 3.6 所有页面请求必须通过 `httpClient`；不得在页面、组件或 service 内写 mock 分支。
- [x] 3.7 PRD 未提供 method/path，所有 API 文档元数据必须标记 `path/method 待后端确认` 和 mock 替换点。
- [x] 3.8 使用 `api-doc-summary` 更新 `docs/api/接口汇总.md`。

## 4. Workbench Page

- [x] 4.1 按 `docs/组件拆分/workbench-组件拆分清单.md` 创建 `src/views/workbench/index.vue` 与页面级组件。
- [x] 4.2 依据 `docs/样式还原/workbench-UI分析清单.md` 实现左侧菜单、顶部搜索、新建按钮、最近浏览与收藏对象类型卡片。
- [x] 4.3 实现新建下拉菜单 `dropdown_open` 状态，选项顺序为对象类型、链接类型、动作类型、对象类型组。
- [x] 4.4 实现搜索过滤、权限隐藏、卡片星标与更多按钮的可验证状态。

## 5. Object Type List Page

- [x] 5.1 按 `docs/组件拆分/object-type-list-组件拆分清单.md` 创建 `src/views/object-type-list/index.vue` 与页面级组件。
- [x] 5.2 依据 `docs/样式还原/object-type-list-UI分析清单.md` 实现标题、搜索、刷新、设置、创建按钮、表格和分页。
- [x] 5.3 表格必须按 UI 分析清单的行级映射表实现 9 行默认数据，不得改变列顺序、名称、状态、可见性、时间和操作按钮。
- [x] 5.4 实现搜索防抖、高亮、刷新加载、分页切换、空态、搜索无结果、错误态、无权限隐藏创建按钮。

## 6. Object Type Create Page

- [x] 6.1 按 `docs/组件拆分/object-type-create-组件拆分清单.md` 创建 `src/views/object-type-create/index.vue` 与页面级组件。
- [x] 6.2 依据 `docs/样式还原/object-type-create-UI分析清单.md` 实现四步步骤条、步骤内容面板和底部按钮。
- [x] 6.3 步骤 1 实现数据源卡片、选择数据集弹窗、三类 tab、选择后摘要。
- [x] 6.4 步骤 2 实现元数据表单、字数计数、对象组下拉与已选对象组状态。
- [x] 6.5 步骤 3 必须使用 `mappingRows[]` 实现字段到属性一一映射，不得用无显式对应关系的左右并列列表替代。
- [x] 6.6 步骤 4 必须使用 `actionRows[]` 与 `executorRows[]` 实现动作与用户/用户组权限映射。
- [x] 6.7 实现必填校验、下一步禁用、主键修改二次确认、提交成功返回列表、提交失败状态。

## 7. Quality Gates And UI Verification

- [x] 7.1 执行 `pnpm typecheck`。
- [x] 7.2 执行 `pnpm lint`。
- [x] 7.3 执行 `pnpm build`。
- [x] 7.4 启动本地 dev server，用 Browser 或 Playwright 打开 `/workbench`、`/object-types`、`/object-types/create`。
- [x] 7.5 执行 `ui-verification`，分别产出 `docs/样式还原/workbench-UI问题清单.md`、`docs/样式还原/object-type-list-UI问题清单.md`、`docs/样式还原/object-type-create-UI问题清单.md`。
- [x] 7.6 修复 P0/P1/P2 问题后再次使用 Browser 或 Playwright 回归验证；若未使用 Browser，问题清单必须记录失败阶段、替代工具、视口和证据。
- [x] 7.7 完成后将本 tasks.md 勾选为已完成，并执行 OpenSpec archive。
