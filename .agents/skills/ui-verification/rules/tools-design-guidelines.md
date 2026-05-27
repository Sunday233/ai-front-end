---
title: 设计稿工具使用指南（Pencil/Figma/Stitch）
impact: HIGH
impactDescription: 使用设计稿工具获取可比对信息
tags: tools, design, pencil, figma, stitch, mcp
---

## 设计稿工具使用指南（Pencil/Figma/Stitch）

**核心原则**：验收时必须获取设计稿侧的可比对信息，与实现页进行对比。

### 设计稿类型与工具选择

验收时：用 **Cursor Browser**（优先）或 **Playwright MCP**（无 Browser 时）获取实际页面截图/快照，再根据设计稿来源选择：

- 设计稿为 `.pen` 时，用 **Pencil MCP** 获取设计稿截图或节点信息
- 设计稿为 Figma 链接时，用 **Figma MCP** 获取对应截图或节点信息
- 设计稿为 Stitch 链接时，用 **Stitch MCP** 获取对应截图或节点信息
- 将设计稿侧信息与实现页比对得出结论

### 设计稿为 .pen（Pencil 设计稿）

**工具**：**Pencil MCP**

**操作**：
- 对指定节点或画布截图（`get_screenshot`）
- 获取布局结构（`snapshot_layout`）
- 与实现页的截图或快照对应比对

**工具说明**：
- **.pen** 是 **Pencil** 的设计稿文件后缀
- **Pencil MCP**：用于 `.pen` 设计稿，可查看设计稿细节、对指定节点或画布截图（如 `get_screenshot`）、获取布局结构（如 `snapshot_layout`）等，与实现页截图或快照对照

### 设计稿为 Figma 链接

**工具**：**Figma MCP**

**操作**：
- 从链接中解析 file key / node id
- 对指定 frame 或节点调用 `get_screenshot`、`get_design_context` 等
- 获取截图或布局/样式信息
- 与实现页的截图或快照对应比对

**工具说明**：
- **Figma 链接**：如 `https://www.figma.com/design/<fileKey>/<fileName>?node-id=...`
- **Figma MCP**：用于 Figma 设计稿，可从链接中解析 file key / node id，获取指定 frame 或节点的截图与布局/节点信息（如 `get_screenshot`、`get_design_context` 等）

### 设计稿为 Stitch 链接

**工具**：**Stitch MCP**

**操作**：
- 从 Stitch 链接中定位项目、页面、画板或节点
- 获取设计稿整体截图、指定区域截图或节点截图
- 获取结构化布局、节点层级、文字、图片和样式信息
- 与实现页的截图或快照按区域对应比对

**验收要求**：
- 记录原始 Stitch 链接、页面/画板名称、节点 ID（如有）和截图导出范围。
- 优先使用 Stitch MCP 的结构化节点信息做元素级比对；节点信息不足时，使用 Stitch MCP 截图与 Browser 截图做截图比对。
- 多状态、多断点或多页面设计必须逐一获取对应 Stitch 设计源信息，不得只验收默认状态。

**工具说明**：
- **Stitch 链接**：指 Stitch 设计稿的分享链接、项目页链接或节点链接。
- **Stitch MCP**：用于 Stitch 设计稿，可从链接定位页面/画板/节点，获取截图、布局结构、节点层级与样式上下文，并与实现页截图或快照对照。

### 设计稿为其它静态图片

**操作**：
- 直接使用设计稿图片与 `browser_take_screenshot` 的截图并排或叠放对比

**相关规则**：
- `tools-browser-navigation.md` - 浏览器工具打开页面指南
