---
title: Stitch MCP 设计稿分析细化流程
impact: CRITICAL
impactDescription: 规范 Stitch MCP 的调用顺序、证据记录与质量门禁，提升 UI 还原度
tags: tools, design, stitch, mcp, analysis
---

# Stitch MCP 设计稿分析细化流程

## 核心原则

使用 Stitch 作为主设计源时，不能只读取项目概览或只凭本地截图分析。必须用 Stitch MCP 建立「项目 -> screen / screenInstance -> 设计状态 -> UI 分析清单」的证据链，并在分析清单中记录调用结果、覆盖范围和降级依据。

分析阶段只使用读取类 MCP 工具。不要调用 `generate_screen_from_text`、`edit_screens`、`generate_variants`、`apply_design_system`、`create_design_system` 等生成或修改类工具来补全设计稿。

## 必须调用顺序

### 1. 链接解析与项目定位

从 PRD 的 `stitch_links` 或正文 Stitch 链接中解析：

- `projectId`：如 `11214155578152749288`
- screen 或节点线索：链接、PRD 章节、截图文件名、页面标题、状态名
- 目标页面 slug：如 `workbench`、`object-type-list`、`object-type-create`

若链接只给出项目地址，不能直接进入分析，必须继续读取项目与 screen 列表。

### 2. 读取项目上下文

先调用：

```text
mcp__stitch_2.get_project({
  name: "projects/<projectId>"
})
```

记录：

- 项目标题与项目 ID
- project 中的 screen instances、source screen、deviceType、当前选中或最近 screen
- 可用于定位的页面标题、screen 名称、缩略图/预览信息（若返回）

如果 PRD 未给 `projectId`，先调用：

```text
mcp__stitch_2.list_projects({
  filter: "view=owned"
})
```

必要时再查 `view=shared`，但要在分析清单中记录筛选依据。

### 3. 建立 screen 候选池

调用：

```text
mcp__stitch_2.list_screens({
  projectId: "<projectId>"
})
```

将返回结果与以下来源交叉匹配：

- PRD 的页面名、slug、章节标题与交互状态
- `docs/ui/` 截图文件名和截图中的可见标题
- Stitch project 的 screen instance 名称、source screen、deviceType

输出「screen 覆盖矩阵」：

| PRD 页面/状态 | Stitch screen | screenId | screenInstanceId | deviceType | 本地截图兜底 | 覆盖结论 |
|---------------|---------------|----------|------------------|------------|--------------|----------|
| workbench default | 工作台默认态 | xxx | yyy | DESKTOP | docs/ui/工作台默认状态.png | 已覆盖 |

若一个 PRD 页面包含弹窗、下拉、hover、empty、step1-step4 等状态，必须为每个状态找到 Stitch screen 或本地截图兜底。

### 4. 逐 screen 读取详细信息

对覆盖矩阵中的每一个候选 screen 调用：

```text
mcp__stitch_2.get_screen({
  name: "projects/<projectId>/screens/<screenId>",
  projectId: "<projectId>",
  screenId: "<screenId>"
})
```

每个 screen 至少提取：

- screen 名称、screenId、sourceScreen、screenInstanceId（如有）
- 画布尺寸、设备类型、整体背景
- 顶层区域：导航、头部、内容区、弹窗、浮层、底部等
- 可见文本：完整文案、数量、占位符、按钮/链接文案
- 关系型区域：表格行、列表项、字段映射、左右联动、步骤配置
- 交互状态：selected、hover、disabled、empty、loading、error、modal open、dropdown open

若 `get_screen` 返回的信息不足以判断细节，必须记录为 `待确认`，并使用 `docs/ui` 截图或后续 Browser 验收补证，不得写成精确值。

### 5. 读取设计系统信息

调用：

```text
mcp__stitch_2.list_design_systems({
  projectId: "<projectId>"
})
```

记录可用的设计系统或主题信息：

- 颜色、字体、圆角、阴影、背景模式
- 是否有 light/dark 或设备类型差异
- 分析清单中哪些样式字段来自 Stitch design system，哪些来自 screen 节点或截图估算

若设计系统不可用，样式仍应从 `get_screen` 和截图中提取，并在证据等级中说明来源。

### 6. 区域级复核与二次读取

完成首次 `get_screen` 后，按「从上到下、从左到右、从外到里」列出区域。若某个区域存在以下情况，必须二次复核对应 screen 或状态：

- 表格、列表、卡片网格、分页、筛选、搜索
- 下拉菜单、弹窗、抽屉、悬浮提示
- 四步/多步向导、tab、折叠面板
- 字段到属性、左侧到右侧、行到详情的映射关系
- 设计稿与本地截图不一致

复核后在 UI 分析清单记录「复核结论」：已确认 / 截图兜底 / 待确认。

## UI 分析清单必须新增的 Stitch 证据章节

使用 Stitch MCP 时，UI 分析清单必须包含以下章节。

### Stitch MCP 调用记录

| 顺序 | MCP 工具 | 输入摘要 | 输出摘要 | 用途 | 结论 |
|------|----------|----------|----------|------|------|
| 1 | get_project | projects/xxx | screenInstances: n | 定位项目 | 成功 |
| 2 | list_screens | projectId=xxx | screens: n | 建立候选池 | 成功 |
| 3 | get_screen | screenId=xxx | 页面 default | 分析布局 | 成功 |
| 4 | list_design_systems | projectId=xxx | designSystems: n | 样式来源 | 成功 |

### Stitch screen 覆盖矩阵

| PRD 页面/状态 | Stitch screen | screenId | screenInstanceId | 本地截图兜底 | 覆盖结论 |
|---------------|---------------|----------|------------------|--------------|----------|
|  |  |  |  |  |  |

### Stitch 证据等级

| 区域 | 字段 | 当前值 | 来源 | 证据等级 | 备注 |
|------|------|--------|------|----------|------|
| 顶部搜索 | 高度 | 32px | Stitch screen 节点 | 精确 |  |
| 卡片阴影 | shadow | 待确认 | 截图视觉判断 | 待确认 | 需验收补证 |

## 质量门禁

使用 Stitch MCP 分析设计稿时，满足以下条件后才允许进入组件拆分：

- [ ] 已调用 `get_project` 并记录项目上下文。
- [ ] 已调用 `list_screens` 并建立 screen 覆盖矩阵。
- [ ] 每个 PRD 页面/状态均有 Stitch screen 或 `docs/ui` 兜底证据。
- [ ] 已对每个目标 screen 调用 `get_screen`。
- [ ] 已调用 `list_design_systems` 或记录无法获取设计系统的原因。
- [ ] UI 分析清单包含 MCP 调用记录、screen 覆盖矩阵和证据等级。
- [ ] 表格、列表、左右映射、字段属性映射已输出行级映射表。
- [ ] 无法从 Stitch 获取的关键字段已标注 `待确认`，没有伪精确值。

任一项不满足时，不得进入 `component-planning`；必须先补充 Stitch MCP 调用或截图兜底证据。
