# PRD 输入目录说明

## 目录用途

本目录用于存放可被 Agent 自动读取的 PRD 文档。

## 目录结构约定

PRD 需按 sprint 分目录组织，推荐结构如下：

- `docs/prd/<sprint>/<prd-name>.md`

示例：

- `docs/prd/sprint1/object-type-list.md`
- `docs/prd/sprint1/object-type-create.md`
- `docs/prd/sprint1/workbench.md`

## 扫描与执行顺序

自动化流程按以下规则读取 PRD：

1. 扫描 `docs/prd/` 下所有 sprint 子目录中的 `.md` 文件。
2. 忽略 `README.md`。
3. 先按 sprint 目录名排序，再按 PRD 文件名排序。

## PRD 文件格式（推荐）

推荐使用 YAML Frontmatter + Markdown 正文：

```md
---
module: object-type-create
title: 对象类型列表-创建对象功能
version: 1.0
owner: 产品经理姓名
last_updated: 2026-05-20
figma_links:
  - name: 步骤1
	 url: https://www.figma.com/design/...
screenshots:
  - name: 步骤1
	 path: ui/sprint1/object-type-create-step1.png
---

# 功能概述
...
```

## 关键字段约定

1. PRD 名称来源：以 PRD 文件名（不含 `.md`）作为 `<prd-name>`。
2. `figma_links` 优先级：
	- 当 `figma_links` 存在且至少 1 条 `url` 有效时，流程直接走 Figma MCP。
	- 此时跳过截图匹配流程。
3. `screenshots` 兜底：
	- 当无有效 `figma_links` 时，使用 `screenshots`。
	- `screenshots[].path` 必须是相对 `docs/` 的路径，如 `ui/sprint1/xxx.png`。
4. `screenshots` 缺失或无效时：
	- 允许在同 sprint 下按 PRD 文件名前缀兜底匹配截图。
	- 仍匹配失败则标记 `UI_PENDING`，流程不中断。

## 命名规范

采用功能名命名（通常为 kebab-case），建议：

- `order-center.md`
- `user-profile.md`
- `ai-editor-home.md`

## 编写建议

1. 明确页面目标与业务流程。
2. 明确功能边界与不做项。
3. 明确关键交互与状态变化。
4. 明确验收标准。

## 输出产物对应关系

每个 PRD 独立输出到对应 sprint 分类目录：

- UI 分析清单：`docs/样式还原/<sprint>/<prd-name>-UI分析清单.md`
- UI 问题清单：`docs/样式还原/<sprint>/<prd-name>-UI问题清单.md`
