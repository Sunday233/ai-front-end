# Change: 基于 PRD + UI 自动实现前端

## Why

当前需要从 `docs/prd` 与 `docs/ui` 自动生成前端实现流程，减少人工拆解成本并提升一致性。

## What Changes

- 新增 PRD + UI 语义触发执行链路
- 识别 `docs/ui` 截图、`.pen`、Figma 链接或 Stitch 链接并执行 UI 分析
- 强制 OpenSpec 先行（proposal/tasks/spec）
- 新增多 PRD 批处理与失败续跑机制
- 新增 UI 验收、上线就绪门禁与执行日志

## Impact

- Affected specs: frontend-delivery
- Affected code: `.agents/rules`、`.agents/skills`、`docs/prd`、`docs/ui`、`openspec/templates`
