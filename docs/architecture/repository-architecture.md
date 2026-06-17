# 仓库架构与执行链路

本文说明本仓库的「规则 + 技能 + OpenSpec + PRD/UI 资产」协作方式，用于帮助 Agent 和维护者理解：不同目录分别负责什么、各技能如何协同、一次需求从输入到归档应如何执行。

## 仓库定位

本仓库当前不是一个可直接启动的 Vue 业务应用，而是一套面向 AI Coding 的前端交付治理资产。它沉淀了：

- `.agents/rules/`：不可违反的项目规则。
- `.agents/skills/`：面向具体任务的执行步骤。
- `docs/prd/`：需求输入。
- `docs/ui/`：UI 截图输入。
- `docs/样式还原/`：UI 分析与验收输出。
- `docs/组件拆分/`：UI 类需求在实施前的组件边界输出。
- `docs/api/`：API 汇总文档输出位置。
- `openspec/`：proposal、design、tasks、spec delta、validate 与 archive 的变更治理层。

`.agents/rules/01-项目概述.instructions.md` 中描述的 Vue 3、TypeScript、Vite、Vue Router、Pinia、Ant Design Vue、axios、Biome 等技术栈，是后续迁移到真实业务工程或生成业务代码时的目标约束。

## 分层架构

```text
用户意图 / PRD / UI 设计源
        ↓
规则层 .agents/rules
        ↓
技能层 .agents/skills
        ↓
OpenSpec 变更层 openspec/changes
        ↓
实现层 src/（当前仓库未内置业务代码）
        ↓
验收与沉淀 docs/样式还原、docs/组件拆分、docs/api、openspec/archive
```

| 层级 | 目录 | 职责 | 主要产物 |
|------|------|------|----------|
| 规则层 | `.agents/rules/` | 定义结构、组件、API、路由、状态、样式、测试、自动化执行边界 | `.instructions.md` |
| 技能层 | `.agents/skills/` | 将规则转成可执行工作流和检查清单 | `SKILL.md` |
| 输入层 | `docs/prd/`、`docs/ui/` | 承载需求和设计输入 | PRD、截图、设计源链接 |
| 规划层 | `docs/样式还原/`、`docs/组件拆分/` | 承载 UI 分析、组件拆分与验收记录 | UI 分析清单、组件拆分清单、UI 问题清单 |
| API 文档层 | `docs/api/` | 汇总页面 service、类型、mock 与替换点 | `接口汇总.md` |
| 变更治理层 | `openspec/` | 管理提案、设计、任务、规格增量、校验与归档 | proposal、design、tasks、spec delta、archive |

## Rules 与 Skills 的关系

Rules 是边界，Skills 是动作。执行时先匹配相关 Rule，再加载对应 Skill。

| Rule | 约束方向 | 常配套 Skills |
|------|----------|---------------|
| `01-项目概述` | 目标技术栈与工程定位 | 所有开发类技能 |
| `03-项目结构` | 目录放置、mock 策略、禁止非标准目录 | `create-route`、`create-component`、`create-api`、`create-store` |
| `04-组件规范` | 通用组件与页面级组件边界 | `component-planning`、`create-component` |
| `05-API规范` | axios 封装、service、mock/real 切换、API 文档 | `create-api`、`api-doc-summary` |
| `06-路由规范` | `src/views` 与 `src/router` 集中管理 | `create-route` |
| `07-状态管理` | Pinia store 组织与持久化 | `create-store` |
| `09-样式规范` | 主题变量、样式还原、暗浅色一致性 | `theme-variables`、`design-analysis`、`ui-verification` |
| `11-测试规范` | 类型、lint、测试、构建门禁 | `openspec-apply-change` |
| `12-自动化执行规范` | PRD + UI 自动实现完整生命周期 | `implement-from-prd-ui`、`design-analysis`、`component-planning`、`create-proposal`、`ui-verification` |

如 Rule 与 Skill 冲突，以 Rule 为准。

## Skills 分层

### 总入口技能

| 技能 | 触发场景 | 关键产出 |
|------|----------|----------|
| `implement-from-prd-ui` | 用户输入 `docs/prd/*.md` 并要求创建提案、实现 UI、还原设计稿或验收 | 串联 UI 分析、组件拆分、接口契约、OpenSpec、实施、验收 |

### 需求探索与提案技能

| 技能 | 触发场景 | 关键产出 |
|------|----------|----------|
| `openspec-explore` | 需求还不清楚，需要先讨论、比较方案或调查现有上下文 | 结论、风险、可选择地沉淀到 OpenSpec |
| `openspec-propose` | 需要快速创建 OpenSpec change 与必要 artifacts | `openspec/changes/<change-id>/` |
| `create-proposal` | 需要按项目规则创建 proposal、design、tasks、spec | OpenSpec proposal、design、tasks、spec delta |

### UI 分析、组件规划与验收技能

| 技能 | 触发场景 | 关键产出 |
|------|----------|----------|
| `design-analysis` | 需要分析截图、Pencil、Figma、Stitch 或 UI 描述 | `docs/样式还原/<prd_slug>-UI分析清单.md` |
| `component-planning` | UI 类 change 在 validate/apply 前需要明确组件边界 | `docs/组件拆分/<prd_slug>-组件拆分清单.md` |
| `ui-verification` | 实现完成后需要对照设计稿或分析清单验收 | `docs/样式还原/<prd_slug>-UI问题清单.md` |
| `web-design-guidelines` | 审查 UI、可访问性、体验或通用 Web 设计质量 | UI 代码审查发现 |

### 实施技能

| 技能 | 触发场景 | 关键约束 |
|------|----------|----------|
| `openspec-apply-change` | 按 OpenSpec tasks 实施变更 | 先通过 UI 组件拆分门禁与 API 门禁 |
| `create-route` | 新增或维护页面路由 | 页面放在 `src/views/<view>/index.vue`，路由集中注册 |
| `create-component` | 新增或拆分 Vue 组件 | 页面级组件留在页面目录，第二处真实复用后再抽公共组件 |
| `theme-variables` | 编写或修改样式 | 颜色与主题相关值使用 CSS 变量，避免硬编码 |
| `create-api` | 新增、调整、mock 或接入真实接口 | `httpClient` 唯一入口，每页 service 与 mock 独立 |
| `api-doc-summary` | 完成或审查 API 相关变更 | 更新 `docs/api/接口汇总.md` |
| `create-store` | 新增或重构 Pinia 全局状态 | store 放在 `src/stores`，导出 `useXxxStore` |

### 归档与能力扩展技能

| 技能 | 触发场景 | 关键产出 |
|------|----------|----------|
| `openspec-archive-change` | 变更完成后归档 | `openspec/changes/archive/YYYY-MM-DD-<change-id>/` |
| `find-skills` | 需要查找或安装外部技能 | 技能候选与安装命令 |
| `skill-creator` | 需要创建或更新技能 | 新的技能目录与 `SKILL.md` |

## PRD + UI 自动实现流程

当用户引用 `docs/prd/*.md` 并要求自动实现、还原设计稿、创建提案或验收时，执行链路固定为 Proposal -> Apply -> Archive。

```text
1. 读取 PRD
2. 识别设计源
3. 产出 UI 分析清单
4. 产出组件拆分清单
5. 提取接口契约
6. 创建 OpenSpec proposal/design/tasks/spec
7. validate 前置检查与 strict validate
8. 按 tasks 实施页面、组件、样式、接口、状态
9. 执行质量门禁
10. 执行 UI 验收并产出问题清单
11. 修复并回归验证
12. tasks 全部勾选
13. archive 归档
```

### 1. 读取 PRD

优先读取用户指定的 `docs/prd/<prd_slug>.md`。若用户只说 `docs/prd`，按文件名顺序扫描 `docs/prd/*.md`，跳过 `README.md`。

PRD 中的 `prd_slug` 是后续文件命名、组件拆分、API 文档和验收文档的主键。

### 2. 识别设计源

按以下优先级识别：

1. `primary_design_source`
2. `design_pen_files`、`figma_links`、`stitch_links`、`required_ui_assets`
3. 正文中的 `.pen`、`figma.com`、`stitch`、`docs/ui/<prd_slug>*`
4. `docs/ui` 下与 `prd_slug` 匹配的截图

设计源映射如下：

| 设计源 | 工具或模式 |
|--------|------------|
| `docs-ui` | `design-analysis` 截图模式 |
| `pen` | Pencil MCP |
| `figma` | Figma MCP |
| `stitch` | Stitch MCP |

### 3. UI 分析

使用 `design-analysis` 产出：

```text
docs/样式还原/<prd_slug>-UI分析清单.md
```

分析必须从上到下、从左到右、从外到里记录布局、文字、图片、层级与样式。若 UI 包含表格、列表、左右映射、字段属性映射、主键/标题键等关系型区域，必须输出行级映射表。

### 4. 组件拆分

使用 `component-planning` 产出：

```text
docs/组件拆分/<prd_slug>-组件拆分清单.md
```

该清单必须区分：

- 现有可复用项。
- 页面级组件。
- 公共组件。
- 候选复用项。
- 关系型 UI 的行级数据契约。

UI 类 change 在 validate/apply 前必须满足：

- 组件拆分清单存在。
- `openspec/changes/<change-id>/design.md` 引用该清单。
- `openspec/changes/<change-id>/tasks.md` 写明按组件拆分清单实施。

### 5. 接口契约提取

若 PRD 包含 `CHAPTER-06 数据与接口要求`，必须提取：

- `data_fields`
- `api_contract`
- `mock_policy`

并在 proposal/tasks 中规划：

- `src/services/client.ts`
- `src/services/<page-slug>.ts`
- `src/services/<page-slug>.mock.ts`
- `src/services/mock.ts`
- `src/types/<page-slug>/model.ts`
- `src/types/<page-slug>/api.ts`
- `docs/api/接口汇总.md`

接口未确认 method/path 时，不得自行承诺为真实后端接口，必须标记为待后端确认。

### 6. 创建 OpenSpec 资产

使用 `create-proposal` 或 `openspec-propose` 创建：

```text
openspec/changes/<change-id>/
├── proposal.md
├── design.md
├── tasks.md
└── specs/<capability>/spec.md
```

`tasks.md` 必须写明读取相关 Rules 与 Skills、依据 UI 分析清单和组件拆分清单实施、涉及接口时使用 `create-api` 与 `api-doc-summary`、实现后执行 `ui-verification`。

### 7. Validate

执行：

```bash
openspec validate <change-id> --strict
```

validate 前必须通过 UI 组件拆分前置检查。API 相关 change 在 apply 前还必须通过 API 门禁，确保 tasks 中已写明请求封装、页面 service、页面 mock、类型文件、`httpClient`、mock 注册入口与 API 汇总文档。

### 8. Apply 实施

使用 `openspec-apply-change` 按 tasks 顺序实施。

实施时按需加载：

- `create-route`：页面与路由。
- `create-component`：页面级组件与公共组件。
- `theme-variables`：主题变量与样式。
- `create-api`：接口、类型、mock/real 切换。
- `api-doc-summary`：API 汇总文档。
- `create-store`：Pinia 全局状态。

每完成一个 task，立即将 `tasks.md` 中对应项从 `- [ ]` 改为 `- [x]`。

### 9. 质量门禁

按项目实际脚本执行类型检查、lint、测试与构建。当前仓库本身不包含业务 `src/` 与根 `package.json`，迁移到业务工程后应以业务工程脚本为准。

### 10. UI 验收

使用 `ui-verification`，在 Codex 中优先使用 in-app Browser 打开实现页；不可用时才降级到 Playwright 或其它工具，并在问题清单中记录降级原因、视口与证据。

产出：

```text
docs/样式还原/<prd_slug>-UI问题清单.md
```

P0 问题必须修复并回归验证；P1/P2 按任务要求处理。

### 11. Archive 归档

所有 tasks 完成后，使用 `openspec-archive-change` 归档：

```text
openspec/changes/archive/YYYY-MM-DD-<change-id>/
```

若存在 spec delta，应先评估是否同步到 `openspec/specs/`。

## 高风险暂停点

出现以下情况时，不自动继续：

1. 删除或大范围重构既有业务代码。
2. 修改认证、权限、支付、数据迁移、安全策略。
3. PRD 与设计稿存在 P0 冲突且无法判断优先级。
4. 缺少关键设计源且 PRD 没有可执行 UI 描述。
5. UI 类 change 缺少组件拆分清单、design 引用或 tasks 约束。
6. API 类 change 缺少 `client.ts`、页面 service、页面 mock、类型文件或 API 汇总任务。

## 扩展新技能的流程

当需要新增实践能力时：

1. 判断是否应先新增 Rule；如果是不可违反的长期约束，放入 `.agents/rules/*.instructions.md`。
2. 判断是否应新增 Skill；如果是可复用执行流程，放入 `.agents/skills/<skill-name>/SKILL.md`。
3. 在 `.agents/skills/README.md` 中登记技能触发场景、配套规则与产出。
4. 如影响主执行链，更新本架构文档与根 `README.md`。

技能应保持短小、可执行、可验证；细节过多时使用附属规则文件或模板做渐进披露。
