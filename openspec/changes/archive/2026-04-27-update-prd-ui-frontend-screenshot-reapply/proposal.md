# Change: 按最新技能重执行 PRD + UI 前端实现闭环

## Why

现有 `docs/prd` 与 `docs/ui` 已完成一轮实现，但技能体系已经升级（尤其是 design-analysis 的截图模式与证据等级要求），需要按最新流程重新执行一次 Proposal -> Apply -> Archive，确保实现、分析清单、验收记录三者一致并可追溯。

## What Changes

- 重新执行 `workbench`、`object-type-list`、`object-type-create` 三个 PRD 的实现对齐。
- 按截图模式重建 UI 分析清单，补充输入资产状态、证据等级与待确认项。
- 对现有页面做样式与交互细节修正，使页面与截图更一致。
- 更新 UI 问题清单，记录本轮验收差异与处理结果。
- 执行 TypeScript、ESLint、构建门禁，并完成 OpenSpec 归档。

## Impact

- Affected specs: `prd-ui-frontend`
- Affected code:
  - `src/views/workbench/index.vue`
  - `src/views/object-type-list/index.vue`
  - `src/views/object-type-create/index.vue`
  - `src/views/object-type-create/components/*`
  - `src/layout/console-layout.vue`
  - `docs/样式还原/对象管理-UI分析清单.md`
  - `docs/样式还原/对象管理-UI问题清单.md`
