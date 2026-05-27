# PRD 输入目录说明

## 目录用途

本目录用于存放可被 Agent 自动读取的 PRD 文档。

## 命名规范

采用功能 `slug` 命名，建议：

- `order-center.md`
- `user-profile.md`
- `ai-editor-home.md`

## 编写建议

1. 明确页面目标与业务流程。
2. 明确功能边界与不做项。
3. 明确关键交互与状态变化。
4. 明确设计稿来源与 UI 资产。
5. 明确验收标准。

## 自动执行识别规则

当 Agent 输入 `docs/prd/*.md` 时，会先读取 PRD 中的 UI 配对章节，并按以下字段识别设计稿来源：

| 字段 | 必填 | 说明 |
|------|------|------|
| `primary_design_source` | 是 | 主设计源：`docs-ui` / `pen` / `figma` / `stitch` |
| `ui_prefix` | 是 | 与 `docs/ui` 截图前缀匹配，通常等于 `prd_slug` |
| `required_ui_assets` | 条件必填 | `primary_design_source=docs-ui` 时必填，列出 `docs/ui` 下必须存在的截图 |
| `optional_ui_assets` | 否 | 补充状态截图，如 hover / active / empty |
| `design_pen_files` | 条件必填 | `primary_design_source=pen` 时必填，列出 `.pen` 文件路径 |
| `figma_links` | 条件必填 | `primary_design_source=figma` 时必填，列出 Figma frame 或节点链接 |
| `stitch_links` | 条件必填 | `primary_design_source=stitch` 时必填，列出 Stitch 页面、画板或节点链接 |
| `ui_analysis_output` | 推荐 | UI 分析清单目标路径：`docs/样式还原/<prd_slug>-UI分析清单.md` |
| `ui_verification_output` | 推荐 | UI 问题清单目标路径：`docs/样式还原/<prd_slug>-UI问题清单.md` |

设计源对应工具：

| 主设计源 | 工具/流程 |
|----------|-----------|
| `docs-ui` | `design-analysis` 截图模式，读取 `docs/ui` |
| `pen` | Pencil MCP 读稿，再执行 `design-analysis` |
| `figma` | Figma MCP 读稿，再执行 `design-analysis` |
| `stitch` | Stitch MCP 读稿，再执行 `design-analysis` |

识别后流程固定为：

1. 执行 `design-analysis`，产出 UI 分析清单。
2. 执行 `create-proposal`，产出 OpenSpec proposal、tasks、spec 增量，并运行 `openspec validate <change-id> --strict`。
3. 按 tasks 顺序实施页面/UI，依据 UI 分析清单还原布局与样式。
4. 执行 `ui-verification`，用 Browser 或 Playwright 打开实现页，与设计稿或分析清单比对，产出 UI 问题清单。

## PRD 模板（可识别章节版）

优先使用以下模板：

- `docs/prd/object-type-list-template.md`（对象类型列表示例，固定章节）

可选通用模板：

- `docs/prd/prd-template.md`

可识别模板使用规则：

1. 保留 `CHAPTER-xx` 章节编号与字段键名（如 `prd_slug`、`required_ui_assets`）。
2. `prd_slug` 与 `ui_prefix` 必须一致。
3. `primary_design_source=docs-ui` 时，`required_ui_assets` 中的文件名必须真实存在于 `docs/ui/`。
4. `primary_design_source=pen/figma/stitch` 时，必须填写对应的 `design_pen_files`、`figma_links` 或 `stitch_links`。
5. 新功能建议复制对象列表示例并替换内容，不改结构。

建议做法：

1. 复制模板并重命名为目标功能 `slug`（如 `workbench.md`）。
2. 按章节补齐业务目标、范围边界、页面流程、状态交互、验收标准。
3. 与 `docs/ui/` 使用同名前缀，保证自动配对。

## 与 UI 的配对规则

`docs/ui/` 中的截图文件应与 PRD 使用同名前缀，便于自动匹配。

## UI 配对章节模板

```markdown
## CHAPTER-04 UI 配对映射（设计稿）

### primary_design_source

1. docs-ui

### required_ui_assets

1. <prd_slug>-main-default.png

### optional_ui_assets

1. <prd_slug>-main-hover.png

### design_pen_files

1. （无）

### figma_links

1. （无）

### stitch_links

1. （无）

### ui_analysis_output

1. docs/样式还原/<prd_slug>-UI分析清单.md

### ui_verification_output

1. docs/样式还原/<prd_slug>-UI问题清单.md
```
