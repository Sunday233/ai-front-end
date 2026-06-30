---
title: 设计稿工具使用指南
impact: HIGH
impactDescription: 根据设计稿类型选择 Pencil MCP、Figma MCP 或 Stitch MCP 获取布局与节点信息
tags: tools, design, pencil, figma, stitch
---

# 设计稿工具使用指南

## 概述

根据设计稿类型选择相应的工具，获取设计稿的结构、截图、布局和节点信息。

## 设计稿类型与工具选择

### 统一 UI 证据索引（所有设计源必填）

先识别设计源，再把证据归一成同一张索引，后续分析、组件拆分、实现和验收都引用它，避免重复回源读取。

| 页面/状态 | 设计源类型 | 设计源定位 | 本地证据 | 必验区域 | 关系型核对 |
|-----------|------------|------------|----------|----------|------------|
|  | Stitch / Figma / Pencil / docs-ui / screenshot / PRD-only | project+screen / fileKey+nodeId / filePath+nodeId / 图片路径 / PRD 章节 | 截图、快照、节点信息或 UI_PENDING |  | 表格/列表/字段映射等 |

**原则**：
- Stitch、Figma、Pencil 只影响“证据采集方式”，不影响后续输出结构。
- 如果结构化节点不足，用截图补充并标注证据等级。
- 若只有 PRD 无设计图，记录 `UI_PENDING`、假设和风险，不伪造设计证据。

### .pen（Pencil 设计稿）

**工具**：Pencil MCP

**可用功能**：
- `snapshot_layout` - 获取布局快照
- `get_screenshot` - 获取截图
- `batch_get` - 批量获取节点信息
- `get_variables` - 获取变量和主题

**使用步骤**：
1. 打开 `.pen` 文件
2. 使用 `snapshot_layout` 获取整体布局结构
3. 使用 `get_screenshot` 获取页面截图
4. 使用 `batch_get` 获取具体节点的详细信息

**示例**：
```javascript
// 获取布局快照
snapshot_layout(filePath)

// 获取截图
get_screenshot(nodeId)

// 批量获取节点
batch_get(patterns, nodeIds)
```

### Figma 链接

**工具**：Figma MCP

**可用功能**：
- `get_screenshot` - 获取截图
- `get_design_context` - 获取设计上下文
- 从链接中解析 file key / node id

**使用步骤**：
1. 从 Figma 链接中解析 file key 和 node id
2. 使用 `get_screenshot` 获取对应节点的截图
3. 使用 `get_design_context` 获取布局与节点信息
4. 使用 `get_variable_defs` 获取变量和主题

**示例**：
```javascript
// 从链接解析
// https://www.figma.com/file/{fileKey}/{name}?node-id={nodeId}

// 获取截图
get_screenshot(fileKey, nodeId)

// 获取设计上下文
get_design_context(fileKey, nodeId)
```

### Stitch 链接

**工具**：Stitch MCP

**适用场景**：
- 输入为 Stitch 设计链接、分享链接、节点链接或项目页链接
- 需要从 Stitch 中读取页面/画板结构、节点层级、样式属性或导出截图
- 后续要以 Stitch 设计稿作为 UI 验收基准

**可用功能**：
- 获取链接对应的页面、画板或节点信息
- 获取设计稿截图或指定节点截图
- 获取布局、文字、图片、层级、样式变量等结构化上下文
- 识别多页面、多状态或多断点设计稿

**必须遵循**：读取 `rules/tools-stitch-mcp-analysis.md`，按其中的「项目定位 -> screen 候选池 -> 逐 screen 详情 -> 设计系统 -> 区域复核」流程执行。

**使用步骤**：
1. 解析 Stitch 链接中的 `projectId`、页面、画板、screen 或节点定位信息。
2. 调用 `get_project` 读取项目上下文；若没有项目 ID，先用 `list_projects` 定位项目。
3. 调用 `list_screens` 建立 screen 候选池，并与 PRD 页面、状态、`docs/ui` 截图交叉匹配。
4. 对每个目标页面/状态调用 `get_screen`，不得只读取项目概览后直接分析。
5. 调用 `list_design_systems` 获取设计系统或记录不可用原因。
6. 输出 Stitch MCP 调用记录、screen 覆盖矩阵和字段证据等级。
7. 按「从上到下、从左到右、从外到里」记录布局、文字、图片和层级。
8. 若 Stitch MCP 返回信息不足，则使用 `docs/ui` 截图兜底并标注“估算”或“待确认”。

**记录要求**：
- 在分析清单中记录原始 Stitch 链接、页面/画板名称、节点 ID（如有）和截图导出范围。
- 多状态设计稿必须分别记录状态名称与对应链接或节点 ID。
- 对 Stitch MCP 返回的结构化属性按“精确”证据等级记录；对仅凭截图判断的字段标注“估算”或“待确认”。
- 分析清单必须包含 `Stitch MCP 调用记录` 和 `Stitch screen 覆盖矩阵`；缺失时不得进入组件拆分。

### 普通截图（PNG/JPG/JPEG/WEBP）

**工具**：图片查看工具（IDE 图片预览、浏览器预览或等效工具）

**可用能力**：
- 读取截图像素尺寸（宽、高）
- 识别可见文案与主要视觉元素
- 提取区域划分与相对布局关系
- 对多状态截图做差异比对（default / hover / active / disabled）

**使用步骤**：
1. 从 `docs/ui/` 收集同一功能 slug 的截图，按状态分组。
2. 以截图像素尺寸建立坐标基准（左上角为原点）。
3. 按「从上到下、从左到右、从外到里」扫描并记录四类重中之重。
4. 对无法可靠读取的字段标注为“待确认”，禁止伪精确。

**建议**：截图命名和多状态组织优先遵循 `docs/ui/README.md`。

## 扫描顺序

**按「从上到下、再从左到右」扫描**：
- 先按 y 从大到小（或从 0 起向下）确定所有横向区域顺序
- 再在同一行内按 x 从左到右读取
- 使用 Pencil MCP、Figma MCP 或 Stitch MCP 时也按此顺序逐层获取布局与节点信息

详见 `analysis-order.md`。

## 获取内容

使用工具时，需要获取以下内容：

### 布局信息
- 整体尺寸（宽度、高度）
- 区域列表（x, y, w, h）
- 区域间间距

### 节点信息
- 文字内容、字体、字号、字重、颜色、行高
- 图片尺寸、位置、比例、圆角
- 布局参数（padding, gap, margin, align-items, justifyContent）
- 层级关系（嵌套、父子、兄弟）

详见 `workflow-layout-map.md` 和 `workflow-element-extraction.md`。

## 注意事项

1. **多状态设计稿**：如有多个 frame（如「有数据 / 无数据」），分别获取每个状态的布局和节点信息
2. **顶层 frame/画板**：确认顶层 frame、画板或页面，确保获取的是正确的设计稿区域
3. **节点 ID**：记录重要节点的 ID，便于后续获取详细信息
4. **截图对比**：使用截图与实现页面对比时，确保截图区域与实现页面区域一致
5. **截图模式禁忌**：仅凭视觉无法确认的字体家族、字重、精确间距等字段，必须标注“待确认”，不可猜测填充

## 相关规则

- `analysis-order.md` - 分析顺序（必守）
- `workflow-layout-map.md` - 第一步：建立布局 Map（使用这些工具）
- `workflow-element-extraction.md` - 第二步：区域与元素提取（使用这些工具）
- `ui-verification` 技能的 `tools-design-guidelines.md`（类似内容，用于验收阶段）
- `docs/ui/README.md` - 普通截图命名与多状态输入规范
