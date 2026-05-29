# AI Coding Project

这是一个面向 AI Coding 场景的前端工程治理仓库。它的核心不是提供一个可直接 `pnpm dev` 启动的业务应用，而是沉淀一套可迁移、可审计的「规则约束 + 技能执行 + OpenSpec/SDD 变更治理 + PRD/UI 输入资产」流程。

输入“实现docs/prd的需求还原设计稿”或相似语义的任务时，Agent 会自动调用 `design-analysis` 技能分析设计稿，产出 UI 分析清单；再调用 `create-proposal` 技能创建 OpenSpec 变更提案和任务；开发完成后调用 `ui-verification` 技能做 UI 验收，并产出 UI 问题清单；最后执行归档。

当前仓库真实主线是：

1. 用 `docs/prd/` 承载需求输入。
2. 用 `docs/ui/` 或 PRD 中声明的 Pencil/Figma/Stitch 设计源承载设计输入。
3. 用 `.agents/rules/` 定义不可违反的项目规范。
4. 用 `.agents/skills/` 指导 Agent 执行设计分析、提案、开发、验收、归档。
5. 用 `openspec/` 管理 proposal、tasks、spec delta、validate 与 archive。
6. 用 `docs/样式还原/` 沉淀 UI 分析清单和 UI 问题清单。

更完整的架构说明见：[docs/architecture/repository-architecture.md](docs/architecture/repository-architecture.md)。

## 当前仓库状态

当前工作区保留的是治理资产、输入资产、分析验收资产和 OpenSpec 模板，不包含可直接运行的前端应用入口：

- 当前没有根目录 `package.json`。
- 当前没有 `src/` 业务代码目录。
- 当前没有 Vite、Vue Router、Pinia 等运行时代码文件。

`.agents/rules/01-项目概述.instructions.md` 描述的是目标业务仓库或后续实现阶段应遵守的前端技术栈：Vue 3、TypeScript、Vite、Vue Router、Pinia、Ant Design Vue、axios、Biome 等。也就是说，本仓库目前更像一套 AI Coding 前端交付流程资产，而不是完整应用工程。

## 核心模块

| 模块 | 目录 | 作用 |
| --- | --- | --- |
| Rules | `.agents/rules/` | 规定项目结构、组件、路由、API、状态、样式、测试和自动化执行边界 |
| Skills | `.agents/skills/` | 指导 Agent 如何创建提案、分析设计稿、开发页面/组件、接 API、做 UI 验收 |
| PRD 输入 | `docs/prd/` | 存放可被 Agent 识别的 PRD 文档 |
| UI 输入 | `docs/ui/` | 存放设计稿截图；PRD 也可声明 Pencil/Figma/Stitch 链接 |
| UI 分析/验收 | `docs/样式还原/` | 存放 UI 分析清单和 UI 问题清单 |
| OpenSpec | `openspec/` | 管理变更提案、任务、规格增量、校验和归档 |
| 架构文档 | `docs/architecture/` | 说明仓库结构、链路流程与治理设计 |

## 目录结构

```text
.
├── .agents/
│   ├── rules/                         # 规则文件，按场景读取
│   └── skills/                        # 技能文件，每个技能目录包含 SKILL.md
├── .codex/                            # Codex 内部 rules、skills 软链到 .agents
│   ├── AGENTS.md                      # Codex 本地说明
│   └── prompts/                       # OpenSpec 相关提示词
├── docs/
│   ├── architecture/                  # 架构与流程文档
│   ├── prd/                           # PRD 输入
│   ├── ui/                            # UI 截图输入
│   └── 样式还原/                       # UI 分析清单与问题清单
├── openspec/
│   ├── AGENTS.md                      # OpenSpec 工作流说明
│   ├── project.md                     # 项目上下文
│   ├── changes/                       # 活跃变更
│   ├── specs/                         # 当前规格
│   └── templates/                     # PRD + UI 自动实现模板
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── README.md
```

## 从需求到归档的链路

```text
需求输入
  ↓
明确是否有设计稿、是否有接口、交付形态
  ↓
有设计稿时执行 design-analysis
  ↓
产出 docs/样式还原/<prd_slug>-UI分析清单.md
  ↓
执行 create-proposal
  ↓
生成 openspec/changes/<change-id>/proposal.md、tasks.md、spec delta
  ↓
openspec validate <change-id> --strict
  ↓
按 tasks 开发页面/UI、接口、状态与样式
  ↓
执行 ui-verification，用 Browser 或 Playwright 做 UI 验收
  ↓
产出 docs/样式还原/<prd_slug>-UI问题清单.md
  ↓
修复并回归验证
  ↓
tasks 全部勾选
  ↓
openspec archive <change-id> --yes
  ↓
更新 specs，变更进入 archive
```

## 关键规则

`.agents/rules/` 是执行时的权威约束来源：

| 文件 | 用途 |
| --- | --- |
| `01-项目概述.instructions.md` | 目标技术栈与项目背景 |
| `02-编码规范.instructions.md` | 编码与审查规范 |
| `03-项目结构.instructions.md` | 代码目录放置规则 |
| `04-组件规范.instructions.md` | 通用组件与页面级组件规范 |
| `05-API规范.instructions.md` | 接口请求、命名与错误处理 |
| `06-路由规范.instructions.md` | 页面目录与路由集中管理 |
| `07-状态管理.instructions.md` | Pinia store 规则 |
| `08-通用约束.instructions.md` | 通用边界与占位策略 |
| `09-样式规范.instructions.md` | 燕云 infinity Web 端设计规范 |
| `10-文档规范.instructions.md` | 注释与文档规则 |
| `11-测试规范.instructions.md` | 类型、lint、测试门禁 |
| `12-自动化执行规范.instructions.md` | PRD + UI 自动实现闭环 |

## 关键技能

`.agents/skills/` 是执行步骤的落地说明：

| 技能 | 用途 |
| --- | --- |
| `implement-from-prd-ui` | PRD + UI 自动实现总入口 |
| `design-analysis` | 分析截图、Pencil、Figma 或 Stitch，产出 UI 分析清单 |
| `create-proposal` | 创建 OpenSpec proposal、tasks 和 spec delta |
| `create-route` | 新增或维护页面路由 |
| `create-component` | 创建或拆分 Vue 组件 |
| `theme-variables` | 使用主题变量编写样式 |
| `create-api` | 创建接口类型与请求封装 |
| `create-store` | 创建 Pinia store |
| `ui-verification` | 用 Browser 或 Playwright 做 UI 还原验收 |
| `openspec-apply-change` | 按 OpenSpec tasks 执行变更 |
| `openspec-archive-change` | 完成后归档 OpenSpec 变更 |

## 当前示例资产

### PRD

当前 `docs/prd/` 中有 3 份示例需求：

- `docs/prd/workbench.md`
- `docs/prd/object-type-list.md`
- `docs/prd/object-type-create.md`

这些 PRD 使用固定章节描述页面目标、功能边界、关键交互、UI 配对、接口要求、验收标准和风险兜底。

### UI 截图

当前 `docs/ui/` 中包含工作台、对象类型列表页、对象类型创建流程的截图资产，例如：

- `docs/ui/工作台默认状态.png`
- `docs/ui/工作台-点击新建按钮.png`
- `docs/ui/对象类型列表页.png`
- `docs/ui/创建对象类型第1步-默认状态.png`
- `docs/ui/创建对象类型第4步-默认状态.png`

PRD 当前主设计源声明为 Stitch，同时仓库也保留了本地截图，可用于截图模式分析或验收兜底。

### UI 分析与问题清单

当前 `docs/样式还原/` 中已有：

- `workbench-UI分析清单.md`
- `workbench-UI问题清单.md`
- `object-type-list-UI分析清单.md`
- `object-type-list-UI问题清单.md`
- `object-type-create-UI分析清单.md`
- `object-type-create-UI问题清单.md`

## OpenSpec 使用

OpenSpec 是本仓库的变更治理主线。

常用命令：

```bash
openspec list
openspec list --specs
openspec validate <change-id> --strict
openspec archive <change-id> --yes
openspec validate --strict
```

PRD + UI 自动实现的模板位于：

```text
openspec/templates/prd-ui-auto-implementation/
├── proposal.md
├── tasks.md
├── design.md
└── specs/frontend-delivery/spec.md
```

## 使用方式

### 方式 A：作为 AI Coding 治理模板迁移到业务仓库

1. 复制 `.agents/rules/`。
2. 复制 `.agents/skills/`。
3. 复制或改写 `openspec/AGENTS.md`、`openspec/project.md`。
4. 按业务仓库技术栈修正规则中的目录、脚本、API 和测试门禁。

### 方式 B：作为 PRD + UI 自动实现演练仓库

1. 在 `docs/prd/` 新增或更新 PRD。
2. 在 PRD 中声明 `primary_design_source`、`required_ui_assets`、`stitch_links` 等字段。
3. 在 `docs/ui/` 补充截图资产，或提供 Pencil/Figma/Stitch 设计源。
4. 触发 Agent 按 `implement-from-prd-ui`、`design-analysis`、`create-proposal`、`ui-verification` 链路执行。

### 方式 C：仅使用 OpenSpec 治理流程

1. 创建 `openspec/changes/<change-id>/proposal.md`。
2. 创建 `tasks.md` 与 `specs/<capability>/spec.md`。
3. 执行 `openspec validate <change-id> --strict`。
4. 实施完成后执行 `openspec archive <change-id> --yes`。

## 人工确认边界

以下情况应先人工确认，再继续自动实施：

1. 删除或大范围重构既有业务代码。
2. 修改认证、权限、支付、数据迁移、安全策略等高风险能力。
3. PRD 与设计稿存在 P0 冲突，且无法自行判断优先级。
4. 缺少关键设计源，且 PRD 未提供可执行 UI 描述。
5. 修改 `.agents/rules/` 或 `.agents/skills/` 中关键治理规则。

## 相关文档

- 架构设计：[docs/architecture/repository-architecture.md](docs/architecture/repository-architecture.md)
- PRD 输入说明：[docs/prd/README.md](docs/prd/README.md)
- UI 截图说明：[docs/ui/README.md](docs/ui/README.md)
- Rules 索引：[.agents/rules/README.md](.agents/rules/README.md)
- Skills 索引：[.agents/skills/README.md](.agents/skills/README.md)
- OpenSpec 说明：[openspec/AGENTS.md](openspec/AGENTS.md)
- 项目上下文：[openspec/project.md](openspec/project.md)

## 协作说明

- 贡献流程：`CONTRIBUTING.md`
- 行为规范：`CODE_OF_CONDUCT.md`
- 安全报告：`SECURITY.md`

仓库当前未内置 LICENSE。若要对外开源发布，请先补充许可证文件。
