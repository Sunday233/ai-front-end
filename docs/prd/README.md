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
4. 明确验收标准。

## PRD 模板（可识别章节版）

优先使用以下模板：

- `docs/prd/object-type-list-template.md`（对象类型列表示例，固定章节）

可选通用模板：

- `docs/prd/prd-template.md`

可识别模板使用规则：

1. 保留 `CHAPTER-xx` 章节编号与字段键名（如 `prd_slug`、`required_ui_assets`）。
2. `prd_slug` 与 `ui_prefix` 必须一致。
3. `required_ui_assets` 中的文件名必须真实存在于 `docs/ui/`。
4. 新功能建议复制对象列表示例并替换内容，不改结构。

建议做法：

1. 复制模板并重命名为目标功能 `slug`（如 `workbench.md`）。
2. 按章节补齐业务目标、范围边界、页面流程、状态交互、验收标准。
3. 与 `docs/ui/` 使用同名前缀，保证自动配对。

## 与 UI 的配对规则

`docs/ui/` 中的截图文件应与 PRD 使用同名前缀，便于自动匹配。
