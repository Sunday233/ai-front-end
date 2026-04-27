## Context

本次变更不是新增业务能力，而是按最新技能重新执行一轮实现闭环。核心差异在于：

1. 输入是普通截图，不是结构化设计源。
2. design-analysis 新规则要求输出证据等级（精确/估算/待确认）。
3. 需要以同一套 proposal/tasks/spec 为锚点完成代码、文档、验收。

## Goals / Non-Goals

- Goals
  - 三个 PRD 页面继续保持可运行，并对齐当前截图视觉与交互。
  - 输出符合截图模式模板的 UI 分析清单。
  - 质量门禁（typecheck/lint/build）与 UI 验收通过后归档。
- Non-Goals
  - 不接入真实后端服务。
  - 不做权限与复杂流程引擎扩展。

## Decisions

- 继续使用 Vue 3 + TS + Ant Design Vue + Pinia + mock 服务。
- 保留 `src/views` 路由实现，不引入新目录。
- 允许按截图可读信息做估算，但必须显式标注证据等级。
- UI 资产命名不完全等同 PRD 的 required_ui_assets 时，按 slug 最佳匹配并记录映射。

## Risks / Trade-offs

- 风险：截图缺少 hover/active 等完整多状态，导致细节不可精确。
- 缓解：在分析清单与问题清单中标记“待确认”，不伪造精确值。

- 风险：设计图有完整左侧导航与顶部布局，页面实现可能出现间距细节偏差。
- 缓解：优先修正 P0/P1 视觉偏差，P2 留档。

## Validation Plan

1. `npx -y -p node@22 -p pnpm@10.32.0 pnpm typecheck`
2. `npx -y -p node@22 -p pnpm@10.32.0 pnpm lint`
3. `npx -y -p node@22 -p pnpm@10.32.0 pnpm build`
4. 浏览器对照 `docs/ui/*.png` 做 UI 验收并更新问题清单
