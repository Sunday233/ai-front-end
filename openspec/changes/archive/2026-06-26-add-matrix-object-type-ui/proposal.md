# Change: 实现 Matrix 对象类型三页 UI

## Why

`docs/prd` 中的工作台、对象类型列表、对象类型创建向导需要从 PRD 与 Stitch/本地截图设计源落地为可运行的 Vue 3 前端实现，并完成 UI 还原验收。

## What Changes

- 新增 Vue 3 + Vite + TypeScript 应用基座，补齐当前仓库缺失的 `src/` 实现层。
- 实现 `/workbench`、`/object-types`、`/object-types/create` 三个页面。
- 依据 `docs/样式还原/*-UI分析清单.md` 还原布局、文案、卡片、表格、步骤向导、弹窗和多选状态。
- 按 `docs/组件拆分/*-组件拆分清单.md` 创建公共布局与页面级组件。
- 按 PRD `CHAPTER-06` 建立 `src/services/client.ts`、页面级 service、页面级 mock、类型定义和 mock/real 切换。
- 更新 `docs/api/接口汇总.md`，产出三页 UI 问题清单并回归验证。

## Impact

- Affected specs: `matrix-object-types`
- Affected code: `package.json`、`vite.config.ts`、`src/**`、`docs/api/接口汇总.md`、`docs/样式还原/*-UI问题清单.md`
- Source PRDs: `docs/prd/workbench.md`、`docs/prd/object-type-list.md`、`docs/prd/object-type-create.md`
- UI evidence: Stitch `projects/11214155578152749288`、`docs/ui/*.png`
