## Context

目标是让 Agent 在命中 PRD + UI 实现语义时，自动执行从 OpenSpec 到实现与验收的完整流程。

## Goals / Non-Goals

- Goals
  - 统一触发入口
  - 标准化执行顺序
  - 在 apply 前明确每个页面的组件拆分与复用边界
  - 提升可审计性与可复现性
- Non-Goals
  - 本次不包含真实部署流水线

## Decisions

- 决策：采用语义触发，不依赖固定口令。
- 决策：强制 OpenSpec 先行。
- 决策：UI 类 change 在 OpenSpec validate 与 apply 前必须完成组件拆分前置检查。
- 决策：组件拆分清单长期沉淀在 `docs/组件拆分/<prd_slug>-组件拆分清单.md`，并由本 design.md 引用。
- 决策：页面级组件默认放在 `src/views/<page>/components/`。
- 决策：公共组件只有第二处真实使用后才抽到 `src/components/`。
- 决策：多 PRD 按文件名顺序执行。
- 决策：UI 缺失时继续实现并标记待补。
- 决策：自动修复重试上限为 2 次。

## Risks / Trade-offs

- 风险：UI 与 PRD 冲突时可能导致业务偏差。
- 缓解：UI 优先实现，冲突项单独留档。
- 风险：过早抽公共组件会把业务耦合扩散到 `src/components/`。
- 缓解：仅第二处真实使用后抽公共组件，首次出现先保留页面级组件。

## Migration Plan

1. 新增自动化规则文件。
2. 新增自动化技能文件。
3. 新增组件拆分清单并在 design.md 中引用。
4. 更新索引与流程文档。
5. 增加 OpenSpec 模板。

## Component Plan

- 组件拆分清单：`docs/组件拆分/<prd_slug>-组件拆分清单.md`
- apply 前必须确认该文件存在，且 tasks.md 已写明按清单实施。

## Open Questions

- 是否需要在后续引入 OpenSpec 原生 schema 校验。
