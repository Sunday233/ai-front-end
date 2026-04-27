---
title: 设计稿工具使用指南
impact: HIGH
impactDescription: 根据设计稿类型选择 Pencil MCP 或 Figma MCP 获取布局与节点信息
tags: tools, design, pencil, figma
---

# 设计稿工具使用指南

## 概述

根据设计稿类型选择相应的工具，获取设计稿的结构、截图、布局和节点信息。

## 设计稿类型与工具选择

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

**示例**：
```javascript
// 从链接解析
// https://www.figma.com/file/{fileKey}/{name}?node-id={nodeId}

// 获取截图
get_screenshot(fileKey, nodeId)

// 获取设计上下文
get_design_context(fileKey, nodeId)
```

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
- 使用 Pencil MCP 或 Figma MCP 时也按此顺序逐层获取布局与节点信息

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
2. **顶层 frame**：确认顶层 frame，确保获取的是正确的设计稿区域
3. **节点 ID**：记录重要节点的 ID，便于后续获取详细信息
4. **截图对比**：使用截图与实现页面对比时，确保截图区域与实现页面区域一致
5. **截图模式禁忌**：仅凭视觉无法确认的字体家族、字重、精确间距等字段，必须标注“待确认”，不可猜测填充

## 相关规则

- `analysis-order.md` - 分析顺序（必守）
- `workflow-layout-map.md` - 第一步：建立布局 Map（使用这些工具）
- `workflow-element-extraction.md` - 第二步：区域与元素提取（使用这些工具）
- `ui-verification` 技能的 `tools-design-guidelines.md`（类似内容，用于验收阶段）
- `docs/ui/README.md` - 普通截图命名与多状态输入规范
