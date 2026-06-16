---
name: create-proposal
description: 通用创建提案技能。根据需求是否有设计稿或 UI 描述、是否有接口、是页面还是功能组件等可选条件，决定设计稿分析、接口与数据层、以及实现后的 UI 还原验收等步骤。适用于各类需求提案，不限于纯 UI 页面。
---

# 创建提案

## 使用时机

当需要为一个**需求**创建 OpenSpec 提案（proposal、tasks、spec）时使用本技能。需求可能是：

- 输入为 `docs/prd/*.md`，需要基于 PRD 创建 SDD/OpenSpec 变更资产
- 新增/改版一个**页面**（有或没有设计稿）
- 开发一系列**功能组件**（有或没有 UI 描述）
- **有接口**或**无接口**（后端未就绪时用 mock）
- 纯逻辑、纯接口、或 UI + 接口 等组合

本技能根据「是否有设计稿/UI 描述」「是否有接口」「交付形态（页面/组件/其它）」等条件，决定执行哪些步骤、产出哪些任务。

---

## 步骤 1：明确需求类型与条件

在写 proposal / tasks / spec 之前，先确认下列条件，以便后续步骤按需执行。

| 条件 | 选项 | 影响 |
|------|------|------|
| **是否有设计稿或 UI 要求描述** | 有 / 无 | 有 → 使用 design-analysis 产出 UI 分析清单；实现后使用 ui-verification 做 UI 还原验收 |
| **是否有接口（已提供或约定）** | 有 / 无 / 未就绪 | 有 → 正常对接；无 → 可不做数据层；未就绪 → mock，见项目 Mock 数据策略 |
| **交付形态** | 新页面 / 功能组件 / 能力模块 / 其它 | 决定目录结构（views vs components）、tasks 模板 |
| **是否仅样式/还原类** | 是 / 否 | 是 → 重点在 design-analysis + 验收 |

---

## 步骤 2：若有设计稿或 UI 描述 —— 设计稿分析

当需求**包含界面**且**有设计稿**（`docs/ui` 截图、`.pen`、Figma 链接、Stitch 链接、设计图、标注）或**有明确 UI 描述**时：

- **使用技能**：`.agents/skills/design-analysis/SKILL.md`
- **产出**：`docs/样式还原/<名称>-UI分析清单.md`

如果输入是 `docs/prd/*.md`，必须先从 PRD 中识别设计源：

- `required_ui_assets` / `optional_ui_assets` → `docs/ui` 截图模式
- `design_pen_files` → Pencil MCP
- `figma_links` → Figma MCP
- `stitch_links` → Stitch MCP

这样后续开发可以依据分析清单精确实现，实现后的验收也以此清单为基准。对于 PRD + UI 自动实现流程，开发前必须有 UI 分析清单；若设计源缺失，必须在 proposal 与 tasks 中标记 `UI_PENDING` 并说明降级依据。

若 UI 包含表格、列表、左右列映射、字段-属性映射、主键/标题键等关系型区域，UI 分析清单必须包含行级映射表。若只有“字段映射/左右两列”这类概述，必须先补分析清单，再写 proposal/tasks。

在 **tasks** 中可写明：页面/组件开发须依据 `docs/样式还原/<名称>-UI分析清单.md` 实现布局与样式。

---

## 步骤 3：组件拆分规划（涉及 UI 时）

若交付形态是**页面**或**功能组件**，必须在 OpenSpec validate 前执行 `.agents/skills/component-planning/SKILL.md`，产出：

```text
docs/组件拆分/<名称>-组件拆分清单.md
```

前置检查必须确认：

- 组件拆分清单存在。
- `design.md` 引用该清单路径。
- `tasks.md` 写明按组件拆分清单实施。
- 关系型 UI 已在组件拆分清单中标明行级数据契约、子组件职责和验收关注点。

缺任一项时，不得执行 `openspec validate <change-id> --strict`。

---

## 步骤 4：定义组件与代码结构（涉及 UI 时）

若交付形态是**页面**或**功能组件**，根据 `.agents/rules/04-组件规范.instructions.md` 判断组件放置位置：

- 多处复用 → `src/components/<name>/`
- 单页或单能力内使用 → `src/views/<page>/components/<name>/` 或对应功能目录下
- 公共组件只有第二处真实使用后才抽到 `src/components/`

涉及页面时，常见约定：

- 页面目录使用 `src/views/<page>/index.vue`
- 样式默认使用 `<style scoped lang="scss">`，样式需要复用时才使用 `.module.scss`
- `src/types/<feature>/` 下为文件夹，含 `model.ts`、`api.ts`
- 图标/图片未定时用占位元素（见 `.agents/rules/08-通用约束.instructions.md`）

---

## 步骤 5：接口与数据层（有接口或需 mock 时）

若需求**涉及接口**（已提供或未就绪）：

- **已提供接口**：按 `.agents/rules/03-项目结构.instructions.md` 等规范，在 tasks 中安排 `src/types/`、`src/services/` 等。
- **未就绪**：按项目 Mock 数据策略，在 `src/types/<feature>/` 下定义 `model.ts`、`api.ts`，在 `src/services/<feature>.ts` 下提供 mock；tasks 中标注「mock，后续替换」。

若不涉及接口，可省略或仅写「无后端依赖」。

---

## 步骤 6：创建提案文档

### 6.1 proposal.md

根据需求类型书写，建议包含：

- **Why**：业务价值或目标
- **What Changes**：改动范围（新页面 / 新组件 / 新接口 / 样式还原等）
- **Impact**：受影响或新增的 capability、目录、文件

若有设计稿或 UI：必须写「开发依据 `docs/样式还原/<名称>-UI分析清单.md`」，并说明设计源类型（`docs-ui` / `pen` / `figma` / `stitch`）。

### 6.2 design.md

UI 类 change 必须在 `design.md` 中引用：

```text
docs/组件拆分/<名称>-组件拆分清单.md
```

建议写明：

- 页面级组件默认放在 `src/views/<page>/components/`。
- 公共组件只有第二处真实使用后才抽到 `src/components/`。
- 实施偏离组件拆分清单时，必须先更新清单或在 tasks 中记录原因。

### 6.3 tasks.md

按**交付形态**与**条件**勾选任务，例如：

- **准备任务**：读取 PRD、UI 分析清单、组件拆分清单、相关 Rules 与 Skills；确认 `change-id`、目标路由、目标页面 URL。
- **新页面**：页面目录、`index.vue`、可选 `components/`、与布局一致的结构；若有分析清单则写「依据 xxx-UI分析清单 实现」。
- **功能组件**：组件目录、`index.vue`、按需 scoped style 或 `index.module.scss`、占位与规范。
- **接口/数据层**：`src/types/<feature>/`、`src/services/<feature>.ts` 或 mock。
- **质量门禁**：类型检查、lint、测试、构建按项目要求执行。
- **UI 还原验收**：若有设计稿且产出了分析清单，必须在 tasks 末尾加「实现后使用 `.agents/skills/ui-verification/SKILL.md` 进行 UI 还原验收，产出问题清单；修复 P0/P1/P2 后再次用 Browser 或 Playwright 验证」。
- **关系型 UI**：若包含表格/列表/左右映射/字段属性映射，必须加任务「按 UI 分析清单逐行实现映射关系，并在验收中逐行核对名称、顺序、状态、操作按钮和对齐」。

PRD + UI 自动实现的 tasks 必须包含以下顺序：

1. 读取 PRD 与 UI 分析清单。
2. 读取组件拆分清单，并按清单创建或复用组件。
3. 读取 `.agents/rules/03-项目结构.instructions.md`、`04-组件规范.instructions.md`、`06-路由规范.instructions.md`、`09-样式规范.instructions.md`、`11-测试规范.instructions.md`。
4. 按需使用 `create-route`、`create-component`、`theme-variables`、`create-api`。
5. 依据 UI 分析清单实现布局、文字、图片、层级与样式。
6. 对关系型 UI 按行级映射表实现，不得用无对应关系的两个并列列表代替。
7. 执行质量门禁。
8. 执行 UI 验收并产出 UI 问题清单；未使用 Browser 时记录降级原因。
9. 修复问题并回归验证。

### 6.4 spec.md

定义需求规格：场景、验收标准、可选的状态与边界。若有 UI，可引用分析清单中的「验证检查清单」作为验收参考。

spec 增量必须包含至少一个 `#### Scenario:`，并覆盖：

- PRD 中的功能验收。
- UI 按分析清单还原的验收。
- 组件拆分清单被读取并执行的验收。
- 质量门禁通过的验收。

### 6.5 validate

创建 proposal、tasks、spec 增量后必须执行：

```bash
openspec validate <change-id> --strict
```

执行 validate 前，UI 类 change 必须先通过组件拆分前置检查：组件拆分清单存在、`design.md` 已引用、`tasks.md` 已写明按清单实施。validate 通过后进入实施；若命中 `.agents/rules/12-自动化执行规范.instructions.md` 中的高风险项，先人工确认。

---

## 步骤 7：实现后的 UI 还原验收

当需求**包含界面**且**有设计稿**并已产出 **UI 分析清单**时，在**实现完成**后需要进行 UI 还原验收时：

- **使用技能**：`.agents/skills/ui-verification/SKILL.md`
- 该技能通用指导如何进行 UI 验收：对照分析清单与设计稿、产出 UI 问题清单、修复与再验证、反思分析不足并反哺 design-analysis。

---

## 样式还原验证检查清单（供 create-route / create-component 引用）

当开发涉及 **UI 还原**（有设计稿或分析清单）时，可对照以下检查项自检；更完整项见 `docs/样式还原/<名称>-UI分析清单.md` 中的「验证检查清单」。

**布局**：区域位置、尺寸、间距是否与分析清单/设计稿一致；对齐方式（如 flex-start vs center）是否正确。  
**样式**：颜色、字体、字号、字重、圆角、边框、阴影、效果（如 backdrop-filter）是否一致。  
**元素**：是否缺少区块、图标、占位图；占位尺寸与比例是否正确。  
**交互**：默认/hover/active 等状态是否还原（若有设计）。
**关系**：表格、列表、左右映射、字段属性映射是否逐行一致，源字段与目标字段/属性不能错位或缺失。

create-route、create-component 等技能中「涉及 UI 还原时」可引用：`.agents/skills/create-proposal/SKILL.md` 中的「样式还原验证检查清单」及对应页面的 `docs/样式还原/<名称>-UI分析清单.md`。

---

## 相关规范与技能

- `.agents/rules/03-项目结构.instructions.md` - 目录结构、Mock 数据策略
- `.agents/rules/04-组件规范.instructions.md` - 组件放置决策
- `.agents/rules/08-通用约束.instructions.md` - 占位元素等
- `.agents/rules/09-样式规范.instructions.md` - 设计稿颜色提取
- `.agents/rules/12-自动化执行规范.instructions.md` - PRD + UI 自动执行闭环
- `.agents/skills/design-analysis/SKILL.md` - 设计稿分析（有设计稿时使用，产出 UI 分析清单）
- `.agents/skills/component-planning/SKILL.md` - 组件拆分规划（UI 类 change apply 前门禁）
- `.agents/skills/ui-verification/SKILL.md` - UI 验收（实现后需验收时使用）
