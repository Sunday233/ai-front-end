---
name: design-analysis
description: 通用设计稿分析技能。支持按 sprint 扫描 PRD，优先按 figma_links 调用 mcp-figma-toolkit，缺失时按 screenshots 识别截图并产出多 PRD UI 分析清单。
---

# 设计稿分析

## 使用时机

当满足以下任一情况时使用本技能：

- 需要**分析设计稿**（`.pen`、Figma 链接、其它设计图或标注等），把界面结构、样式、元素梳理成可执行的前端任务
- 需要**分析普通 UI 截图**（`png/jpg/jpeg/webp` 等），在缺少可计算节点数据时产出可执行的还原清单
- 需要产出一份**UI 分析清单**文档，供后续开发按清单实现、或供验收时对照
- 需要按 `docs/prd/` 下的 sprint 批量扫描多个 PRD，并按每个 PRD 独立产出分析清单

不限定阶段：可在写提案前、写提案中、或单独做一次「只分析不写提案」时使用。

---

## PRD + UI 输入协议（批量模式）

当输入来源是 `docs/prd/` 与 `docs/ui/` 时，按以下协议执行：

1. **扫描范围**：扫描 `docs/prd/` 下所有 sprint 子目录中的 `.md`，排除 `README.md`。
2. **执行顺序**：先按 sprint 目录名排序，再按 PRD 文件名排序。
3. **PRD 识别**：以 PRD 文件名（不含 `.md`）作为 `<prd名称>`。
4. **设计源优先级**：
	- 若 `figma_links` 存在且至少 1 条 `url` 有效：**直接调用 `mcp-figma-toolkit`**（Figma MCP），并**跳过截图匹配**。
	- 若无有效 `figma_links`：按 `screenshots` 配置解析截图。
5. **screenshots 路径规则**：`screenshots[].path` 按“相对 `docs/`”解析，例如 `ui/sprint1/a.png` → `docs/ui/sprint1/a.png`。
6. **截图兜底**：若 `screenshots` 缺失或无效，允许在同 sprint 下按 PRD 文件名前缀兜底匹配截图；若仍找不到，标记 `UI_PENDING`。
7. **输出路径**：每个 PRD 独立输出到 `docs/样式还原/<prd下一级目录名称>/<prd名称>-UI分析清单.md`。

## Figma MCP 前置要求（mcp-figma-toolkit）

1. 工作区需配置 `.vscode/mcp.json`：
	- `servers.figma.command = "mcp-figma-toolkit"`
2. 本机需安装 `mcp-figma-toolkit`（建议全局安装）。
3. 需在 Figma Desktop 导入并运行 `MCP Figma Toolkit` 插件。
4. 若当前环境无法建立 mcp-figma-toolkit 连接：
	- 记录“Figma MCP 不可用”原因。
	- 回退到 `screenshots` / 同 sprint 前缀兜底流程，不阻断批处理。

---

## 核心原则

**必须按「从上到下、从左到右、从外到里」的顺序分析，并逐条准确记录文字、图片、布局、层级四类重中之重。**详见 `rules/analysis-order.md` 和 `rules/analysis-priorities.md`。

## 截图模式（PNG/JPG）补充约束

当输入仅为普通截图（无 `.pen` 结构、无 Figma 可读节点）时，必须启用“截图模式”：

1. **来源收敛**：优先使用 PRD `screenshots` 字段中声明的截图，并记录文件名与状态（default / hover / active / disabled）。
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

## 目标产出

| 产出物 | 路径 | 用途 |
|--------|------|------|
| UI 分析清单 | `docs/样式还原/<prd下一级目录名称>/<prd名称>-UI分析清单.md` | 按 PRD 独立输出，开发与验收按对应 PRD 对照 |

---

## 工作流程（4步）

1. **扫描 PRD 并确定批次**：按 sprint 和文件名排序，逐个读取 PRD frontmatter（`figma_links`、`screenshots`）。
2. **选择设计源并取证**：有有效 `figma_links` 时按链接顺序调用 `mcp-figma-toolkit`；否则按 `screenshots` 读取截图并进入截图模式；必要时执行同 sprint 前缀兜底并记录 `UI_PENDING`。
3. **建立布局 Map + 区域提取**：按「从上到下、从左到右、从外到里」提取布局、文字、图片、层级。详见 `rules/workflow-layout-map.md` 与 `rules/workflow-element-extraction.md`
4. **样式汇总并输出文档**：汇总样式规范，按 PRD 独立输出分析清单；截图模式必须输出证据等级与待确认项。详见 `rules/workflow-style-summary.md`、`rules/workflow-output-checklist.md` 和 `rules/output-analysis-checklist.md`

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
- `rules/tools-design-guidelines.md` - 设计稿工具使用（Pencil MCP / mcp-figma-toolkit / 普通截图）

---

## 与其它技能的关系

- **create-proposal**：若提案涉及「有设计稿或 UI 描述」的页面/组件，可先或同步使用本技能产出按 PRD 分类的分析清单
- **ui-verification**：以本技能产出的按 PRD 分类分析清单为基准做 UI 验收；验收若发现「分析遗漏」或「描述不清」，应将结论反哺本技能
- **create-route / create-component**：开发时若涉及样式还原，应引用本分析清单中的区域与样式规范

---

## 相关规范

- `.github/instructions/09-样式规范.instructions.md` - 设计稿颜色、圆角等提取规范
- `.github/skills/create-proposal/SKILL.md` - 创建提案（有设计稿时可先或同步使用本技能）
- `.github/skills/ui-verification/SKILL.md` - UI 验收（以分析清单为基准做验收）
