## Context

目标是让 Agent 在命中 PRD + UI 实现语义时，自动执行从 OpenSpec 到实现与验收的完整流程。

## Goals / Non-Goals

- Goals
  - 统一触发入口
  - 标准化执行顺序
  - 提升可审计性与可复现性
- Non-Goals
  - 本次不包含真实部署流水线

## Decisions

- 决策：采用语义触发，不依赖固定口令。
- 决策：强制 OpenSpec 先行。
- 决策：多 PRD 按 sprint 目录名再按文件名顺序执行。
- 决策：设计源优先级固定为 `figma_links` > `screenshots` > 同 sprint 前缀兜底。
- 决策：代码生成后必须调用 `ui-verification`；有有效 `figma_links` 时以 Figma MCP 取证为验收基线。
- 决策：UI 缺失时继续实现并标记 `UI_PENDING`。
- 决策：自动修复重试上限为 2 次。

## Risks / Trade-offs

- 风险：UI 与 PRD 冲突时可能导致业务偏差。
- 缓解：验收阶段同时核对 design-analysis 清单与 spec 增量，冲突项单独留档。

## Migration Plan

1. 新增自动化规则文件。
2. 新增自动化技能文件。
3. 更新索引与流程文档。
4. 增加 OpenSpec 模板。

## Open Questions

- 是否需要在后续引入部署平台专用模板。
