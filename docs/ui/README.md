# UI 截图输入目录说明

## 目录用途

本目录用于存放页面或组件设计稿截图，供 Agent 自动分析与 UI 验收。

## 命名规范

采用与 PRD 一致的功能 `slug` 作为前缀：

- `order-center-home.png`
- `order-center-detail.png`
- `user-profile-main.png`

推荐通用格式：

- `<slug>-<page-or-step>-<state>.png`

## 质量建议

1. 图片清晰，避免压缩模糊。
2. 优先提供完整页面截图。
3. 涉及多状态时提供多张截图（默认态/悬浮态/激活态）。
4. 文件名保持语义可读。

## 多 PRD + 多状态命名示例

假设有 3 个功能：工作台、对象类型列表、创建对象类型。

对应 PRD 文件（`docs/prd/`）：

- `workbench.md`
- `object-type-list.md`
- `object-type-create.md`

对应 UI 截图（`docs/ui/`）：

工作台（多状态）：

- `workbench-main-default.png`
- `workbench-main-hover-card.png`
- `workbench-main-active-tab.png`

对象类型列表（多状态）：

- `object-type-list-main-default.png`
- `object-type-list-main-hover-row.png`
- `object-type-list-main-active-filter.png`

创建对象类型（4 步，4 张截图）：

- `object-type-create-step-01-basic-info.png`
- `object-type-create-step-02-field-config.png`
- `object-type-create-step-03-rule-config.png`
- `object-type-create-step-04-confirm-submit.png`

## 配对失败策略

若某 PRD 找不到对应 UI，流程会继续执行，但会在日志中标记 `UI_PENDING`。
