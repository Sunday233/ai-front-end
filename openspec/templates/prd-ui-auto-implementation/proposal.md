# Change: 基于 PRD + UI 自动实现前端

## Why

当前需要从 `docs/prd` 与 `docs/ui` 自动生成前端实现流程，减少人工拆解成本并提升一致性。

## What Changes

- 新增 PRD + UI 语义触发执行链路
- 强制 OpenSpec 先行（proposal/tasks/spec）
- 新增多 PRD 批处理与失败续跑机制
- 新增设计源优先级（`figma_links` > `screenshots` > 同 sprint 前缀兜底）
- 新增“代码生成后必须调用 ui-verification”的验收约束
- 新增上线就绪门禁与执行日志

## Impact

- Affected specs: frontend-delivery
- Affected code: `.github/instructions`、`.github/skills`、`docs/architecture`、`openspec/templates`
