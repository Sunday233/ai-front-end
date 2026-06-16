---
name: ui-verification
description: 通用 UI 验收技能。验收必须以「实际页面效果 vs 设计稿」为准，必须使用浏览器工具 (Browser) 查看目标页面，通过页面截图与设计稿截图比对、或页面元素与结构化设计稿元素比对等落地方式完成验收，并产出问题清单与反思。
---

# UI 验收

## 核心原则

**最终验收标准**：以**实际运行页面的效果**与 **UI 稿（.pen、Figma 或 Stitch）** 进行比对得出结论，而不是仅凭代码或分析清单推断。

**工具选择**：当运行环境是 Codex 时，必须优先使用 `browser:control-in-app-browser` 连接 Codex in-app Browser（选择 `iab`）打开目标页面，并获取页面截图/快照完成验收比对；Cursor 环境优先使用 `@Browser`。仅当 Browser skill/运行时不可用、`iab` 连接失败、或目标 URL 被 Browser 策略/客户端拦截时，才使用 Playwright MCP 或其它替代工具。详见 `rules/tools-browser-navigation.md`。

**降级留痕**：如果未使用 Codex in-app Browser / `@Browser` 完成验收，必须在 UI 问题清单中写明具体失败阶段（skill 缺失、脚本缺失、JS 执行工具不可用、`iab` 连接失败、目标 URL 导航被拦截等）、实际替代工具、视口、截图/快照文件或证据来源。只写“Playwright 验收”不算完成留痕。

**比对方式**：必须进行可落地的比对之一或组合：页面截图 vs 设计稿截图，或页面元素 vs 设计稿元素。详见 `rules/tools-design-guidelines.md`。

**验收顺序**：从上到下 → 从左到右 → 从外到里。先按顺序过一遍 P0（布局、层级、内容-文字与图片），再逐项比对 P1/P2 维度。详见 `rules/comparison-*.md`。

**关系型 UI 必查**：遇到表格、列表、左右两列映射、字段-属性映射、主键/标题键、步骤配置页等结构时，必须逐行比对“源字段 → 目标字段/属性”的名称、顺序、状态、操作按钮和视觉对齐；不得只验证页面可渲染或可点击。

---

## 使用时机

当需要做「UI 还原验收」时使用本技能：
- 实现完成后，需要对照设计稿检查还原度
- 需要产出一份可追踪的 **UI 问题清单**，并据此修复与再验证
- 需要做「分析不足反思」，反哺设计稿分析（design-analysis）

---

## 前置条件

- **有可访问的实现页面**：本地或目标环境已启动；在 Codex 中优先用 in-app Browser (`iab`) 打开目标 URL、截图并验收比对；Cursor 中优先用 `@Browser`
- **有设计稿可对照**：`.pen`（Pencil 设计稿）、Figma 链接或 Stitch 链接可访问
- **有分析清单（推荐）**：`docs/样式还原/<名称>-UI分析清单.md` 可作为比对时的检查项

若尚未有分析清单但已有设计稿，可先使用 `.agents/skills/design-analysis/SKILL.md` 产出分析清单。

---

## 目标产出

- **UI 问题清单**：`docs/样式还原/<名称>-UI问题清单.md`（详见 `rules/workflow-problem-list.md`）
- **分析不足反思（可选）**：反哺 design-analysis（详见 `rules/workflow-reflection.md`）

---

## 工作流程（5步）

1. **确认浏览器工具与留痕**：在 Codex 中先加载并执行 `browser:control-in-app-browser`，通过 in-app Browser 的 `iab` 打开目标页面，获取实际页面截图/快照；Cursor 中优先使用 `@Browser`。Browser 运行时或目标 URL 导航失败时才降级，并记录失败阶段、替代工具、视口和证据。详见 `rules/tools-browser-navigation.md` 和 `rules/tools-design-guidelines.md`
2. **实际页面与设计稿/分析清单比对**：截图比对或元素级比对，按 P0/P1/P2 维度逐项比对；设计稿不可直接访问时，必须以 UI 分析清单为基准并记录风险。含映射关系的区域必须逐行比对名称、顺序、状态与对齐。详见 `rules/comparison-*.md`
3. **产出 UI 问题清单**：将差异点记录到问题清单。详见 `rules/workflow-problem-list.md`
4. **修复与再验证**：先修 P0，再 P1，再 P2；修复后必须再次使用 Browser 或 Playwright 验证。详见 `rules/tools-browser-navigation.md`
5. **反思分析不足（可选）**：将「哪些问题是因为分析没做到位」总结下来，反哺 design-analysis。详见 `rules/workflow-reflection.md`

---

## 快速参考

### 编写时的设计常识（应在实现阶段遵循）
- `rules/writing-page-container-width.md` - 页面容器宽度规则
- `rules/writing-list-layout.md` - 横向列表布局规则
- `rules/writing-element-completeness.md` - 元素展示完整性规则
- `rules/writing-alignment.md` - 对齐方式规则

### 常见错误模式（验收时特别关注）
- `rules/errors-page-container-width.md` - 页面容器宽度限制
- `rules/errors-grid-container-width.md` - Grid 容器宽度问题
- `rules/errors-css-priority.md` - CSS 优先级覆盖
- `rules/errors-flex-layout.md` - Flex 布局问题
- `rules/errors-flex-column-width.md` - 换行后列宽不一致
- `rules/errors-alignment.md` - 对齐方式错误
- `rules/errors-button-dimensions.md` - 按钮尺寸问题
- `rules/errors-button-position.md` - 按钮定位问题

### 比对维度（P0 级，验收时不得遗漏）
- `rules/comparison-layout.md` - 布局比对
- `rules/comparison-hierarchy.md` - 层级比对
- `rules/comparison-content-text.md` - 文字内容比对
- `rules/comparison-content-image.md` - 图片内容比对

### 工具使用指南
- `rules/tools-browser-navigation.md` - 浏览器工具打开页面
- `rules/tools-design-guidelines.md` - 设计稿工具使用（Pencil/Figma/Stitch）

### 工作流程模板
- `rules/workflow-problem-list.md` - UI 问题清单文档结构
- `rules/workflow-reflection.md` - 反思分析不足模板
- `rules/workflow-checklist.md` - 快速检查清单

---

## 与其它技能的关系

- **design-analysis**：依赖其产出的「UI 分析清单」；验收后的反思用于完善该技能
- **create-proposal**：提案中若包含「实现后进行 UI 还原验收」，可引用本技能执行验收
- **create-route / create-component**：修复问题时可能涉及路由或组件的样式与结构修改

---

## 相关规范

- `.agents/skills/design-analysis/SKILL.md` - 设计稿分析（产出分析清单）
- `.agents/skills/create-proposal/SKILL.md` - 创建提案（可引用本技能做实现后验收）
- `.agents/rules/09-样式规范.instructions.md` - 设计稿颜色提取
