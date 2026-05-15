## Why

当前仓库虽然已完成三页核心实现，但与“最新 skills + 自动化执行规范”的要求仍存在偏差：`docs/prd` 与 `docs/ui` 的同前缀配对不严格、样式存在硬编码颜色、以及本轮重实现缺少新的 OpenSpec 变更留痕。需要通过一次规范化重实现，确保 PRD/UI 输入、代码实现、验收输出和归档链路一致。

## What Changes

- 重新执行 `docs/prd` 与 `docs/ui` 的同前缀配对，修正截图命名或映射，确保配对规则可自动解析。
- 按最新 skills 重做三页（`workbench`、`object-type-list`、`object-type-create`）的 UI 细节对齐，保持关键交互与截图一致。
- 清理页面样式中的硬编码主题色，统一使用主题变量或项目变量，满足样式规范与主题一致性。
- 更新 UI 分析清单与 UI 问题清单，记录本轮截图基线、差异结论与待确认项。
- 执行 TypeScript、ESLint、Vite build 质量门禁，并完成归档。

## Capabilities

### New Capabilities

- `prd-ui-delivery-latest-skills`: 规范化执行 PRD+UI 重实现流程，覆盖输入配对、实现、验收与归档输出。

### Modified Capabilities

- `prd-ui-frontend`: 调整输入资产配对、样式规范与验收要求，使其与最新 skills 和项目规则一致。

## Impact

- 受影响文档：`docs/prd/*.md`、`docs/ui/*`、`docs/样式还原/*.md`。
- 受影响代码：`src/views/**`、`src/layout/console-layout.vue`、`src/styles/variables.scss`、`src/main.ts`（如需主题 token 对齐）。
- 受影响规范资产：`openspec/specs/prd-ui-frontend/spec.md` 与本次新增 capability 规格。
