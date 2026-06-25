# Design: Matrix 工作台与对象类型页面

## Context

本变更覆盖 3 份 PRD：

- `docs/prd/workbench.md`
- `docs/prd/object-type-list.md`
- `docs/prd/object-type-create.md`

主设计源为 Stitch 项目 `https://stitch.withgoogle.com/projects/11214155578152749288`，本地 `docs/ui` 截图作为兜底证据。

## Component Plan

UI 类 change 的组件拆分清单如下，apply 前必须存在并被读取：

- `docs/组件拆分/workbench-组件拆分清单.md`
- `docs/组件拆分/object-type-list-组件拆分清单.md`
- `docs/组件拆分/object-type-create-组件拆分清单.md`

实施必须按组件拆分清单实施。若实现偏离清单，必须先更新清单或在 `tasks.md` 中记录原因。

## UI Analysis Inputs

- `docs/样式还原/workbench-UI分析清单.md`
- `docs/样式还原/object-type-list-UI分析清单.md`
- `docs/样式还原/object-type-create-UI分析清单.md`

实现时以 UI 分析清单还原布局、文字、图片、层级与样式。关系型 UI 必须按行级映射表实现。

## Technical Decisions

- 页面目录使用 PRD slug：
  - `src/views/workbench/index.vue`
  - `src/views/object-type-list/index.vue`
  - `src/views/object-type-create/index.vue`
- 页面级组件默认放在 `src/views/<page>/components/`。
- 公共组件只有第二处真实使用后才抽到 `src/components/`。
- 左侧导航在三页均出现；首次实施可作为候选复用组件，真实第二处使用后再抽到 `src/layout` 或 `src/components`，并记录原因。
- 对象类型创建第 3 步必须用 `mappingRows[]` 承接字段到属性的一一映射，不得使用无对应关系的 `leftItems` + `rightItems`。
- API 未给出 method/path，真实接口接入前统一标记为 `待后端确认`。
- mock 必须通过 axios adapter/handler、页面级 `.mock.ts` 与 `src/services/mock.ts` 注册入口完成，页面和 service 调用层不写 mock 分支。

## Current Repository Boundary

当前仓库没有根目录 `package.json`、没有 `src/`、没有可运行 Vite/Vue 应用入口。本次 change 先完成 PRD + UI 的治理资产、规格和实施清单。若继续在本仓库实施真实页面代码，需新增“初始化 Vue 3 + Vite + TypeScript 应用”的前置任务；若迁移到业务仓库，则按本 design 与 tasks 直接 apply。

## Risks

- Stitch 与本地截图存在分辨率差异：以 Stitch 结构和本地截图可见内容共同校验。
- 后端接口 method/path 未确认：不得自行承诺真实路径。
- 左侧导航跨三页复用：抽公共组件前必须有第二处真实使用，避免过早公共化。
- 当前无运行应用：Browser UI 验收需等目标应用可启动后执行。

