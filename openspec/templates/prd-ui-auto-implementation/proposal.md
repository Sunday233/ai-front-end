# Change: 基于 PRD + UI 自动实现前端

## Why

当前需要从 `docs/prd` 与 `docs/ui` 自动生成前端实现流程，减少人工拆解成本并提升一致性。

## What Changes

- 新增 PRD + UI 语义触发执行链路
- 强制 OpenSpec 先行（proposal/tasks/spec）
- 新增多 PRD 批处理与失败续跑机制
- 新增上线就绪门禁与执行日志

## Impact

- Affected specs: frontend-delivery
- Affected code: `.github/instructions`、`.github/skills`、`docs/architecture`、`openspec/templates`
