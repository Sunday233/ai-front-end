# docs 目录索引

本目录用于承载 PRD、UI、架构说明与 UI 分析产物，是“PRD + UI 自动实现”流程的输入与过程文档中心。

## 目录结构

```text
docs/
├── architecture/        # 架构设计与端到端流程说明
├── prd/                 # PRD 输入文档
├── ui/                  # 设计稿截图输入
└── 样式还原/             # UI 分析清单与验收辅助文档
```

## 子目录说明

| 子目录 | 说明 | 当前索引文件 |
| --- | --- | --- |
| `architecture/` | 自动实现总体架构与流程定义 | `总体架构设计.md`、`端到端流程图.md` |
| `prd/` | PRD 输入目录，按 `slug.md` 命名 | `prd/README.md` |
| `ui/` | UI 截图输入目录，按 PRD 前缀配对 | `ui/README.md` |
| `样式还原/` | 设计分析输出目录（可为空） | 无（按任务生成） |

## PRD 与 UI 配对规则

1. PRD 位于 `docs/prd/`，文件名建议 `功能-slug.md`。
2. UI 位于 `docs/ui/`，截图前缀需与 PRD 的 slug 一致。
3. 推荐命名格式：`<slug>-<page-or-step>-<state>.png`。
4. 缺失配对 UI 时流程不阻断，但需记录 `UI_PENDING`。

## 使用步骤

### 场景一：新增一个自动实现任务

1. 在 `docs/prd/` 新增 PRD 文档，例如 `my-feature.md`。
2. 在 `docs/ui/` 新增截图，例如 `my-feature-main-default.png`。
3. 在 Copilot 中输入实现语句（例如“帮我实现 docs 文件下的 PRD 和 UI 设计稿截图”）。
4. Agent 进入 OpenSpec 生命周期并输出变更与实现结果。

### 场景二：仅做设计分析

1. 准备 `docs/ui/` 截图。
2. 触发设计分析技能。
3. 在 `docs/样式还原/` 查看生成的 UI 分析清单。

## 当前示例资产

### PRD

- `prd/object-type-create.md`

### UI

- `ui/object-type-create-step1.png`
- `ui/object-type-create-step2.png`
- `ui/object-type-create-step3.png`
- `ui/object-type-create-step4.png`

## 维护建议

1. PRD 与 UI 文件名保持同前缀，避免配对歧义。
2. 大改动前先更新 `architecture/` 文档，确保流程可追溯。
3. 对每次重要实现，在 `样式还原/` 留存分析清单，便于回归验收。
