---
title: 浏览器工具打开页面指南
impact: HIGH
impactDescription: 使用浏览器工具查看实际页面效果
tags: tools, browser, navigation, playwright, codex, cursor
---

## 浏览器工具打开页面指南

**核心原则**：验收必须以「实际页面效果 vs 设计稿」为准，必须使用浏览器工具查看目标页面。

### 在 Codex 中优先使用 in-app Browser

当 Browser 插件在会话中可用时，必须先读取并遵守 `browser:control-in-app-browser`。不要因为工具列表里没有单独的 Browser namespace 就判断 Browser 不可用；Codex in-app Browser 的正确入口是通过 Browser skill 指定的浏览器运行时连接 `iab`。

**操作步骤（Codex）**：
1. 读取完整的 `browser:control-in-app-browser` skill。
2. 确认 Browser 插件根目录下存在 `scripts/browser-client.mjs`。
3. 使用可用的 JavaScript 执行工具按该 skill 的 bootstrap 方式初始化 Browser runtime。
4. 通过 `agent.browsers.get("iab")` 选择 Codex in-app Browser，并创建或选择 tab。
5. 使用 `tab.goto(<目标 URL>)` 打开页面，等待加载完成。
6. 使用 `tab.screenshot(...)` 和/或 `tab.playwright.domSnapshot()` 获取截图/快照，作为实际页面与设计稿/分析清单比对依据。

### 在 Cursor 中优先使用 `@Browser`

**操作步骤（Cursor）**：
1. 使用 `@Browser` 的导航能力前往目标 URL（例如 `http://localhost:5222/craft-sheet`）
2. 等待页面加载完成
3. 确认页面已加载完成、无报错，能够看到需要验收的区域
4. 使用 `@Browser` 获取页面截图或页面快照，作为实际页面与设计稿/分析清单比对的依据

**可用性留痕**：
- 在 Codex 中，不能仅因没有 `@Browser` namespace 就记录“Browser 不可用”；必须先尝试 `browser:control-in-app-browser` 的 `iab` 工作流。
- 若 Browser skill 或 `scripts/browser-client.mjs` 缺失，记录“Browser 插件/脚本缺失”。
- 若 JavaScript 执行工具不可用，记录“Browser runtime 无法初始化”。
- 若 `iab` 连接失败，记录“Codex in-app Browser 连接失败”。
- 若 `iab` 已连接但目标 URL 打开失败（如 `ERR_BLOCKED_BY_CLIENT`、安全策略拦截、路由 404、服务未启动），记录为“Browser 导航目标失败”，而不是“Browser 不可用”。
- 降级到 Playwright MCP 或其它浏览器自动化工具时，必须记录替代工具名称、视口尺寸、截图/快照路径或证据来源。
- UI 问题清单不能只写“工具：Playwright”，必须说明为什么没有使用 Browser 完成验收。

**工具说明**：
- **Codex in-app Browser**（`browser:control-in-app-browser`，Codex 优先）：用于打开目标页面、截取页面截图、获取页面快照（DOM/元素）等；在 Codex 中必须优先使用。
- **Browser**（`@Browser`，Cursor 优先）：在 Cursor 中用于打开目标页面、截取页面截图、获取页面快照等。

### 仅当 Browser 无法完成验收时，使用 Playwright MCP

在 Codex 中，这里的“Browser 不可用”必须指 `browser:control-in-app-browser` 无法按上方流程完成验收，而不是“看不到 Browser namespace”。

**操作步骤**：
1. 调用 Playwright MCP 提供的导航工具（如 `browser_navigate`）前往目标 URL
2. 等待页面加载完成
3. 获取截图或快照后，在问题清单中写明降级原因与证据位置

**工具说明**：
- **Playwright MCP**：用于在 Browser skill/运行时不可用、`iab` 连接失败、目标 URL 导航被拦截、或 Cursor `@Browser` 不可用时打开目标页面、截图、获取页面快照和执行交互；也可在需要时配合设置 cookies/localStorage 或模拟登录来访问受保护页面。**仅作为 Browser 无法完成验收后的降级工具使用**。

### 获取实际页面的可比对信息

**截图比对**：
- 在 Codex 中优先用 in-app Browser 对目标页面（或关键区域）截图；在 Cursor 中优先用 `@Browser`
- 无 Browser 时用 Playwright MCP 的截图工具
- 用途：与设计稿同区域截图并排对比

**元素/快照比对**：
- 在 Codex 中优先用 in-app Browser 获取页面结构、元素位置与尺寸；在 Cursor 中优先用 `@Browser`
- 无 Browser 时用 Playwright MCP 的快照/可访问性树工具
- 用途：与设计稿（.pen/Figma）中对应节点坐标、尺寸、样式逐项对比

**建议**：先做**整体或分区域截图**，与设计稿截图对比，发现差异后再用**元素快照**精确定位（如某块 padding、某字体大小）。

**验收时检查**：
- [ ] **按钮高度、宽度**：必须用浏览器工具实际查看渲染效果，不能仅凭代码推测
- [ ] **对齐效果**：必须用浏览器查看实际对齐效果
- [ ] **hover/active 状态**：必须用浏览器实际触发查看
- [ ] **响应式表现**：必须用浏览器在不同视口下查看
- [ ] **映射关系**：字段、属性、主键、标题键、左右列对应关系必须逐行查看，不能只做页面烟测

**相关规则**：
- `errors-button-dimensions.md` - 按钮尺寸问题
- `tools-design-guidelines.md` - 设计稿工具使用指南
