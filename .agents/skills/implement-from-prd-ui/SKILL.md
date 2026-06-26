---
name: implement-from-prd-ui
description: 当用户输入 docs/prd/*.md 并希望基于 PRD 与 UI 设计稿自动创建提案、实现页面/UI 或验收时使用。本技能串联设计源识别、design-analysis、component-planning、create-proposal、OpenSpec validate、按 tasks 实施与 ui-verification。
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
- Stitch：先读取 `design-analysis/rules/tools-stitch-mcp-analysis.md`，再用 Stitch MCP 按 `get_project`、`list_screens`、逐目标 `get_screen`、`list_design_systems` 的顺序读取项目、screen、状态、截图/结构化上下文与设计系统信息。
- `docs/ui`：按截图模式读取图片尺寸、可见元素、布局与状态。

产出：

```text
docs/样式还原/<prd_slug>-UI分析清单.md
```

质量门禁：
- 若设计稿包含表格、列表、左右列映射、字段-属性映射、主键/标题键等关系型 UI，分析清单必须包含行级映射表。
- 若分析清单只写“左右两列”“字段映射”等概括语，必须先补全分析清单，再进入组件拆分。
- Stitch/Figma/Pencil 节点信息不足时，可结合 `docs/ui` 截图补充，但必须标注证据等级。
- Stitch 主设计源必须在分析清单中包含 `Stitch MCP 调用记录`、`Stitch screen 覆盖矩阵` 和字段证据等级；缺失任一项时不得进入组件拆分。

若设计源缺失，必须在提案与 tasks 中标记 `UI_PENDING`，并说明降级依据。

### 步骤 2：组件拆分规划

执行 `.agents/skills/component-planning/SKILL.md`：

- 基于 PRD、UI 分析清单、设计稿/截图与现有代码识别组件边界。
- 区分页面级组件、公共组件、现有可复用项与候选复用项。
- 页面级组件默认放在 `src/views/<page>/components/`。
- 公共组件只有第二处真实使用后才抽到 `src/components/`。
- 对关系型 UI，组件拆分清单必须写明承接行级映射的数据契约和子组件职责。

产出：

```text
docs/组件拆分/<prd_slug>-组件拆分清单.md
```

该清单是 UI 类 OpenSpec validate 与 apply 的前置门禁。缺失时不得进入提案校验或实施。

### 步骤 2.5：接口契约提取

若 PRD 存在 `CHAPTER-06 数据与接口要求`：

- 提取 `data_fields`、`api_contract`、`mock_policy`。
- 检查是否存在 `src/services/client.ts`；不存在时，必须在 proposal/tasks 中安排先创建 axios 请求封装。
- 以 `prd_slug` 作为 `page-slug`，规划每页一个 `src/services/<page-slug>.ts`。
- 规划每页一个 `src/services/<page-slug>.mock.ts`；`src/services/mock.ts` 只能作为统一注册入口。
- 规划 `src/types/<page-slug>/model.ts` 与 `src/types/<page-slug>/api.ts`。
- 若接口未就绪，mock 必须在 axios 请求层拦截，页面 service 仍通过 `httpClient` 发请求。
- 若现有实现存在集中式 mock ts 文件，必须在 proposal/tasks 中安排按页面拆分，禁止继续沿用集中 mock。
- 记录 API 文档输出：`docs/api/接口汇总.md`。

缺少 method/path 时，不得自行确认为真实后端接口；必须在 proposal/tasks 中标记 `待后端确认`。

### 步骤 3：创建 OpenSpec 提案

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
- 对表格、列表、左右映射、字段属性映射等关系型 UI，按 UI 分析清单的行级映射表实现；不得将源字段与目标属性拆成无显式对应关系的并列列表。
- 读取并遵守 `docs/组件拆分/<prd_slug>-组件拆分清单.md`。
- 若 PRD 包含 `CHAPTER-06`，读取接口契约并按 axios client、页面级 service、页面级 mock 文件、类型定义、mock 替换点和 API 汇总文档实施。
- 按顺序完成页面、组件、接口、样式和质量门禁。
- 涉及接口时，使用 `api-doc-summary` 更新 `docs/api/接口汇总.md`。
- 实现后执行 `ui-verification` 并产出 UI 问题清单。
- 修复 P0/P1/P2 问题后再次用 Browser 或 Playwright 验证。

`design.md` 必须引用：

```text
docs/组件拆分/<prd_slug>-组件拆分清单.md
```

创建后必须执行：

```bash
openspec validate <change-id> --strict
```

校验通过后进入实施；命中高风险项时先人工确认。

### 步骤 4：页面/UI 开发

UI 类 change 在 apply 前必须检查：

- `docs/组件拆分/<prd_slug>-组件拆分清单.md` 存在。
- `design.md` 已引用组件拆分清单。
- `tasks.md` 已写明按组件拆分清单实施。

缺任一项时必须暂停并补齐。

按 `tasks.md` 顺序实施：

- 新增/维护路由：使用 `create-route`。
- 新增/拆分组件：使用 `create-component`。
- 编写样式与主题适配：使用 `theme-variables`。
- 涉及接口：使用 `create-api`。
- 涉及接口文档：使用 `api-doc-summary`。

实现时必须依据 UI 分析清单还原：

- 布局：区域位置、尺寸、间距、对齐。
- 内容：文字、图片、图标、占位元素。
- 层级：外到内结构、父子/兄弟关系、叠放顺序。
- 样式：颜色、字号、字重、圆角、阴影、状态。

接口实现必须满足：

- 每个页面一个 `src/services/<page-slug>.ts`。
- 每个含 mock 的页面一个 `src/services/<page-slug>.mock.ts`。
- 页面 service 只通过 `httpClient` 发请求。
- mock 通过 axios adapter/handler、页面级 mock 文件与 `src/services/mock.ts` 注册入口拦截；具体页面 mock 不得集中在单个业务 ts 文件。
- 页面 service 导出 API 文档元数据。
- `docs/api/接口汇总.md` 已覆盖本次接口。

### 步骤 5：UI 验收与回归

执行 `.agents/skills/ui-verification/SKILL.md`：

1. 在 Codex 中优先按 `browser:control-in-app-browser` 连接 in-app Browser (`iab`) 打开实现页；Cursor 中优先使用 `@Browser`；Browser 运行时或目标 URL 导航失败时才使用 Playwright MCP。
2. 获取实现页截图或快照。
3. 获取设计稿侧截图或节点信息，或读取 UI 分析清单。
4. 按从上到下、从左到右、从外到里比对。
5. 对关系型 UI 逐行比对名称、顺序、状态、操作按钮和对齐关系。
6. 按 P0/P1/P2 产出问题清单；若未使用 Browser 完成验收，必须记录失败阶段、替代工具、视口和证据。
7. 修复后再次用 Browser 或 Playwright 验证。

产出：

```text
docs/样式还原/<prd_slug>-UI问题清单.md
```

---

## 完成标准

- UI 分析清单已产出，或明确记录 `UI_PENDING`。
- 组件拆分清单已产出，OpenSpec `design.md` 已引用，`tasks.md` 已写明按清单实施。
- OpenSpec proposal、tasks、spec delta 已产出并通过 strict validate。
- 代码实现按 tasks 完成。
- 涉及接口时，`src/services/client.ts`、页面 service、页面 mock 文件、类型定义、mock 替换点与 `docs/api/接口汇总.md` 已完成。
- 类型/lint/测试/构建门禁按项目要求通过。
- UI 问题清单已产出，P0 已修复并完成回归验证。
