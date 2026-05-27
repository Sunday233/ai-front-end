---
name: implement-from-prd-ui
description: 当用户输入 docs/prd/*.md 并希望基于 PRD 与 UI 设计稿自动创建提案、实现页面/UI 或验收时使用。本技能串联设计源识别、design-analysis、create-proposal、OpenSpec validate、按 tasks 实施与 ui-verification。
---

# 基于 PRD + UI 的自动实现

## 使用时机

当用户提供或引用 `docs/prd/*.md`，并要求创建提案、实现页面、还原 UI、根据设计稿开发、或完成 UI 验收时，必须使用本技能。

本技能是总入口，执行时必须先遵守 `.agents/rules/12-自动化执行规范.instructions.md`。

---

## 输入识别

### 1. PRD 范围

- 若用户给出具体 PRD 路径，只处理该文件。
- 若用户只说 `docs/prd`，按文件名顺序扫描 `docs/prd/*.md`，跳过 `README.md`。
- 每个 PRD 以 `prd_slug` 为主键；若缺失则使用文件名去掉 `.md`。

### 2. 设计源类型

按以下优先级识别：

1. 读取 PRD 的 `primary_design_source`。
2. 读取 `design_pen_files`、`figma_links`、`stitch_links`、`required_ui_assets`。
3. 根据正文自动匹配 `.pen`、`figma.com`、`stitch`、`docs/ui/<prd_slug>*`。
4. 若没有结构化设计源但有 `docs/ui` 截图，进入截图模式。

设计源映射：

| 设计源 | 工具/模式 |
|--------|-----------|
| `docs-ui` | design-analysis 截图模式 |
| `pen` | Pencil MCP |
| `figma` | Figma MCP |
| `stitch` | Stitch MCP |

---

## 工作流程

### 步骤 1：设计稿分析

执行 `.agents/skills/design-analysis/SKILL.md`：

- `.pen`：用 Pencil MCP 读取结构、截图与节点。
- Figma：用 Figma MCP 读取截图与设计上下文。
- Stitch：用 Stitch MCP 读取页面/画板/节点、截图与结构化上下文。
- `docs/ui`：按截图模式读取图片尺寸、可见元素、布局与状态。

产出：

```text
docs/样式还原/<prd_slug>-UI分析清单.md
```

若设计源缺失，必须在提案与 tasks 中标记 `UI_PENDING`，并说明降级依据。

### 步骤 2：创建 OpenSpec 提案

执行 `.agents/skills/create-proposal/SKILL.md`，产出 SDD 变更资产：

```text
openspec/changes/<change-id>/
├── proposal.md
├── tasks.md
├── design.md              # 需要时
└── specs/<capability>/spec.md
```

`tasks.md` 必须包含：

- 读取并遵守相关 Rules 与 Skills。
- 依据 UI 分析清单实现布局与样式。
- 按顺序完成页面、组件、接口、样式和质量门禁。
- 实现后执行 `ui-verification` 并产出 UI 问题清单。
- 修复 P0/P1/P2 问题后再次用 Browser 或 Playwright 验证。

创建后必须执行：

```bash
openspec validate <change-id> --strict
```

校验通过后进入实施；命中高风险项时先人工确认。

### 步骤 3：页面/UI 开发

按 `tasks.md` 顺序实施：

- 新增/维护路由：使用 `create-route`。
- 新增/拆分组件：使用 `create-component`。
- 编写样式与主题适配：使用 `theme-variables`。
- 涉及接口：使用 `create-api`。

实现时必须依据 UI 分析清单还原：

- 布局：区域位置、尺寸、间距、对齐。
- 内容：文字、图片、图标、占位元素。
- 层级：外到内结构、父子/兄弟关系、叠放顺序。
- 样式：颜色、字号、字重、圆角、阴影、状态。

### 步骤 4：UI 验收与回归

执行 `.agents/skills/ui-verification/SKILL.md`：

1. 使用 Cursor IDE Browser 打开实现页；不可用时使用 Playwright MCP。
2. 获取实现页截图或快照。
3. 获取设计稿侧截图或节点信息，或读取 UI 分析清单。
4. 按从上到下、从左到右、从外到里比对。
5. 按 P0/P1/P2 产出问题清单。
6. 修复后再次用 Browser 或 Playwright 验证。

产出：

```text
docs/样式还原/<prd_slug>-UI问题清单.md
```

---

## 完成标准

- UI 分析清单已产出，或明确记录 `UI_PENDING`。
- OpenSpec proposal、tasks、spec delta 已产出并通过 strict validate。
- 代码实现按 tasks 完成。
- 类型/lint/测试/构建门禁按项目要求通过。
- UI 问题清单已产出，P0 已修复并完成回归验证。
