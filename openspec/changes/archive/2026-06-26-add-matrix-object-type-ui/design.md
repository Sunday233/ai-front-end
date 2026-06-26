## Context

当前仓库是 AI Coding 前端交付治理资产，不包含可运行的前端应用入口。本次变更在同一仓库内新增实现层，用 Vue 3 + TypeScript + Vite 承接 3 份 PRD，目标是让页面可以本地启动、交互可验证、UI 可验收。

## Goals / Non-Goals

Goals:

- 实现 Matrix 智能体工作台、对象类型列表、对象类型创建向导三页。
- 以 Stitch MCP 调用记录和 `docs/ui` 截图作为 UI 证据链。
- 保持页面通过 service 调用 `httpClient`，mock 只在请求层拦截。
- 产出 API 汇总和 UI 问题清单。

Non-Goals:

- 不实现真实后端、真实权限系统、详情页内部、链接/动作创建流程。
- 不接入真实 iconfont 或图片切图；缺失资源按占位规范处理并记录替换点。

## Component Plan

UI 类 change 的组件拆分清单如下，apply 前必须确认存在，并按组件拆分清单实施：

- `docs/组件拆分/workbench-组件拆分清单.md`
- `docs/组件拆分/object-type-list-组件拆分清单.md`
- `docs/组件拆分/object-type-create-组件拆分清单.md`

## Decisions

- 决策：创建一个轻量 Vue 3 SPA 基座，因为当前仓库无 `src/` 与 `package.json`，否则无法完成“实现”和 UI 验收。
- 决策：公共左侧导航与工作区容器在三页真实复用，放入 `src/layout/app-shell/index.vue`；页面内部区块仍放在各自 `src/views/<page>/components/`。
- 决策：三页 API path/method 当前 PRD 未提供，service 使用待后端确认的 mock path，并在 API 文档标记替换点，不承诺为真实后端接口。
- 决策：mock 使用 axios adapter 请求层拦截，页面和组件不写 mock 分支。
- 决策：关系型 UI 使用行级数据模型：列表页 `rows[]`、创建页 `mappingRows[]`、`datasetRows[]`、`datasetColumns[]`、`actionRows[]`、`executorRows[]`。
- 决策：样式使用全局 CSS 变量和 SFC scoped SCSS，颜色来源于 Stitch design system 与 `.agents/rules/09-样式规范.instructions.md`。

## Data / API Plan

- `src/services/client.ts`：唯一 axios 实例与 mock adapter 挂载入口。
- `src/services/mock.ts`：仅统一注册页面 mock。
- `src/services/workbench.ts` + `src/services/workbench.mock.ts`
- `src/services/object-type-list.ts` + `src/services/object-type-list.mock.ts`
- `src/services/object-type-create.ts` + `src/services/object-type-create.mock.ts`
- `src/types/<page-slug>/model.ts` 与 `src/types/<page-slug>/api.ts`
- `docs/api/接口汇总.md` 覆盖接口名称、待确认 method/path、参数类型、响应类型、mock 状态与替换点。

## Risks / Trade-offs

- 风险：设计源节点细节不完整。缓解：UI 分析清单已记录 Stitch 调用、screen 覆盖矩阵和截图兜底证据。
- 风险：仓库新增应用基座会扩大变更面。缓解：当前无可运行代码，新增基座是完成实现和验收的必要前置，目录按规则放置。
- 风险：Ant Design Vue 依赖可能增加安装时间。缓解：仅使用基础组件和 CSS 变量，必要交互保持原生降级可运行。

## Validation

- `openspec validate add-matrix-object-type-ui --strict`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`
- 浏览器打开 `/workbench`、`/object-types`、`/object-types/create` 做 UI 验收并产出问题清单。
