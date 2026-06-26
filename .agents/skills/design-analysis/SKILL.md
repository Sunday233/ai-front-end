---
name: design-analysis
description: 通用设计稿分析技能。只要需要「分析设计稿、梳理前端 UI 开发任务」，就使用本技能。产出 UI 分析清单，供开发与验收参照。
---

# 设计稿分析

## 使用时机

当满足以下任一情况时使用本技能：

- 需要**分析设计稿**（`.pen`、Figma 链接、Stitch 链接、其它设计图或标注等），把界面结构、样式、元素梳理成可执行的前端任务
- 输入为 `docs/prd/*.md`，需要先识别 PRD 中声明的设计源，再产出 UI 分析清单
- 需要**分析普通 UI 截图**（`png/jpg/jpeg/webp` 等），在缺少可计算节点数据时产出可执行的还原清单
- 需要产出一份**UI 分析清单**文档，供后续开发按清单实现、或供验收时对照

不限定阶段：可在写提案前、写提案中、或单独做一次「只分析不写提案」时使用。

---

## 核心原则

**必须按「从上到下、从左到右、从外到里」的顺序分析，并逐条准确记录文字、图片、布局、层级四类重中之重。**详见 `rules/analysis-order.md` 和 `rules/analysis-priorities.md`。

**关系型 UI 必须结构化记录**：遇到表格、列表、左右两列映射、字段-属性映射、主键/标题键、配置步骤页时，必须输出行级映射表，记录源字段、目标字段/属性、类型、状态标签、操作按钮、字数/校验提示、行顺序和对齐关系。不得只写“左右两列”“字段映射”等概括语。

## 截图模式（PNG/JPG）补充约束

当输入仅为普通截图（无 `.pen` 结构、无 Figma/Stitch 可读节点）时，必须启用“截图模式”：

1. **来源收敛**：优先使用 `docs/ui/` 下截图，并记录文件名与状态（default / hover / active / disabled）。
2. **禁止伪精确**：无法从截图可靠读取的字段不得硬填精确值。
3. **证据等级标注**：关键字段（文字样式、尺寸、间距、层级）必须标注证据等级。
4. **待确认收敛**：所有待确认项统一沉淀到文档末尾，便于后续与设计/产品核对。

证据等级定义：

| 等级 | 含义 | 使用场景 |
|------|------|----------|
| 精确 | 能直接从设计源或截图像素明确读出 | 文案内容、截图像素尺寸、清晰可辨的布局关系 |
| 估算 | 可根据相对比例或已知基准推导 | 字号近似值、间距近似值、对齐方式推断 |
| 待确认 | 当前证据不足，无法可靠判断 | 字体家族、精确字重、复杂阴影参数 |

---

## PRD 输入识别

当输入是 `docs/prd/*.md` 时，先读取 PRD 元信息与 UI 配对章节，再决定设计源工具：

| PRD 字段 | 识别结果 | 处理方式 |
|----------|----------|----------|
| `primary_design_source: docs-ui` | `docs/ui` 截图 | 启用截图模式 |
| `primary_design_source: pen` 或 `design_pen_files` | `.pen` 设计稿 | 使用 Pencil MCP |
| `primary_design_source: figma` 或 `figma_links` | Figma 链接 | 使用 Figma MCP |
| `primary_design_source: stitch` 或 `stitch_links` | Stitch 链接 | 使用 Stitch MCP |
| `required_ui_assets` / `optional_ui_assets` | `docs/ui` 截图 | 校验文件是否存在并按状态分组 |

若 PRD 缺少上述字段，则按以下规则兜底识别：

1. 匹配正文中的 `.pen` 路径。
2. 匹配正文中的 `figma.com` 链接。
3. 匹配正文中的 Stitch 链接或 `Stitch` 关键词。
4. 查找 `docs/ui/<prd_slug>*.(png|jpg|jpeg|webp)`。

识别完成后，必须在 UI 分析清单中写明：

- PRD 路径与 `prd_slug`
- 主设计源类型
- 设计稿路径/链接或截图文件列表
- 使用的 MCP/模式
- UI 分析清单输出路径

---

## 目标产出

| 产出物 | 路径 | 用途 |
|--------|------|------|
| UI 分析清单 | `docs/样式还原/<名称>-UI分析清单.md` | 开发时按此文档精确还原；验收时作为对照基准 |

---

## 工作流程（4步）

1. **建立布局 Map**：若输入为 PRD，先识别设计源；再获取设计稿结构或截图结构，记录页面状态、整体尺寸、区域划分。详见 `rules/workflow-layout-map.md`
2. **区域与元素提取**：对每个区域按「从外到里」逐项提取，确保文字、图片、布局、层级四者均准确记录；含映射/表格/列表的区域必须逐行输出结构化关系；截图模式下同步标注证据等级。详见 `rules/workflow-element-extraction.md`
3. **样式规范汇总**：汇总颜色、字体、圆角、间距、阴影等样式规范。详见 `rules/workflow-style-summary.md`
4. **输出 UI 分析清单文档**：将分析结果输出为文档；截图模式需额外输出待确认项。详见 `rules/workflow-output-checklist.md` 和 `rules/output-analysis-checklist.md`

---

## 快速参考

### Analysis Rules（分析原则与顺序）
- `rules/analysis-order.md` - 分析顺序（必守）
- `rules/analysis-priorities.md` - 文字、图片、布局、层级四类重中之重

### Workflow Rules（工作流程步骤）
- `rules/workflow-layout-map.md` - 第一步：建立布局 Map
- `rules/workflow-element-extraction.md` - 第二步：区域与元素提取
- `rules/workflow-style-summary.md` - 第三步：样式规范汇总
- `rules/workflow-output-checklist.md` - 第四步：输出文档要求

### Output Rules（输出文档模板）
- `rules/output-analysis-checklist.md` - UI 分析清单文档完整模板

### Implementation Rules（实现建议）
- `rules/implementation-guidelines.md` - 主流网页设计常识
- `rules/implementation-common-errors.md` - 常见错误模式与避免方法

### Checklist Rules（检查清单）
- `rules/checklist-common-misses.md` - 常见遗漏检查点

### Tools Rules（工具使用指南）
- `rules/tools-design-guidelines.md` - 设计稿工具使用（Pencil MCP / Figma MCP / Stitch MCP / 普通截图）
- `rules/tools-stitch-mcp-analysis.md` - Stitch MCP 细化调用流程与质量门禁

---

## 与其它技能的关系

- **create-proposal**：若提案涉及「有设计稿或 UI 描述」的页面/组件，必须在开发前产出或引用本技能的 UI 分析清单
- **ui-verification**：以本分析清单为基准做 UI 验收时使用；验收若发现「分析遗漏」或「描述不清」，应将结论反哺本技能
- **create-route / create-component**：开发时若涉及样式还原，应引用本分析清单中的区域与样式规范

---

## 相关规范

- `.agents/rules/09-样式规范.instructions.md` - 设计稿颜色、圆角等提取规范
- `.agents/skills/create-proposal/SKILL.md` - 创建提案（有设计稿时需引用本技能产物）
- `.agents/skills/ui-verification/SKILL.md` - UI 验收（以分析清单为基准做验收）
