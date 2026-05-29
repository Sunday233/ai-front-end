# AI Coding Project

一个面向 AI Coding 场景的治理型仓库模板，核心目标是把「规则约束 + 技能执行 + OpenSpec 变更治理」串成可复用的工程化流程。

本仓库重点不是业务代码，而是沉淀可迁移到任何前端项目的规范资产。

## 核心能力

| 模块 | 作用 | 代表目录 |
| --- | --- | --- |
| Rules | 约束做什么、不能做什么（目录、命名、样式、测试、流程门禁） | `.agents/rules/` |
| Skills | 指导怎么做（API、组件、路由、UI 分析、验收） | `.agents/skills/` |
| OpenSpec | 变更提案、任务执行、归档追踪的治理主线 | `openspec/` |
| 输入资产 | PRD 与 UI 截图驱动自动实现 | `docs/prd/`、`docs/ui/` |

## 仓库结构

```text
.
├── .agents/
│   ├── rules/                         # 规则（.instructions.md）
│   ├── prompts/                       # OpenSpec 提示词
│   └── skills/                        # 技能（每个目录一个 SKILL.md）
├── docs/
│   ├── architecture/                  # 架构与流程说明
│   ├── prd/                           # PRD 输入
│   ├── ui/                            # 设计稿截图输入
│   └── 样式还原/                       # UI 分析清单输出
├── openspec/                          # OpenSpec 规范与模板
├── CONTRIBUTING.md                    # 贡献指南
├── CODE_OF_CONDUCT.md                 # 社区行为准则
├── SECURITY.md                        # 安全漏洞报告流程
└── README.md
```

## 快速开始

### 1. 环境准备

- Node.js >= 22.22.0
- pnpm >= 10.32.0
- 本地可执行 `openspec` 命令（用于 proposal/apply/archive 流程）

### 2. 准备输入资产

1. 在 `docs/prd/` 放入 PRD 文档（建议使用 `slug.md` 命名）。
2. 在 `docs/ui/` 放入同名前缀截图（例如 `object-type-create-step1.png`）。
3. 目录命名与配对规则见 `docs/README.md`。

### 3. 触发自动实现

在 Copilot 中使用类似语句触发：

- 帮我实现 docs 文件下的 PRD 和 UI 设计稿截图
- 根据 docs/prd 与 docs/ui 自动落地前端页面

### 4. 执行流程

命中语义后应强制按以下顺序执行：

1. Proposal：生成 `proposal.md`、`tasks.md`、`spec delta`
2. Validate：执行 `openspec validate <change-id> --strict`
3. Apply：按 `tasks.md` 实施并更新状态
4. Archive：执行 `openspec archive <change-id> --yes`

## 使用方式

### 方式 A：作为规范模板复制到业务仓库

1. 复制 `.github/instructions/` 与 `.github/skills/`。
2. 复制 `.github/copilot-instructions.md` 作为统一入口。
3. 按团队技术栈调整规则与技能描述。

### 方式 B：以本仓库作为 PRD + UI 自动实现演练场

1. 保持 `docs/prd/` 与 `docs/ui/` 输入协议。
2. 触发实现语义，由 Agent 自动进入 OpenSpec 生命周期。
3. 以 `openspec/changes/` 与 `openspec/specs/` 作为执行审计输出。

### 方式 C：仅使用 OpenSpec 治理流程

常用命令：

- `openspec list`
- `openspec list --specs`
- `openspec new change <change-id>`
- `openspec validate <change-id> --strict`
- `openspec archive <change-id> --yes`

## 重点目录说明

- Skills 索引：`.github/skills/README.md`
- Rules 索引：`.github/instructions/README.md`
- docs 索引：`docs/README.md`
- OpenSpec 说明：`openspec/AGENTS.md`、`openspec/project.md`

## 当前示例输入资产

### PRD

- `docs/prd/object-type-create.md`

### UI

- `docs/ui/object-type-create-step1.png`
- `docs/ui/object-type-create-step2.png`
- `docs/ui/object-type-create-step3.png`
- `docs/ui/object-type-create-step4.png`

## 开源协作

- 贡献流程：`CONTRIBUTING.md`
- 行为规范：`CODE_OF_CONDUCT.md`
- 安全报告：`SECURITY.md`

> 说明：仓库未内置许可证文件。若对外开源发布，请先补充 LICENSE。

## FAQ

### 1. 只有 PRD，没有 UI，可以执行吗？

可以。流程会继续执行，并标记 `UI_PENDING`，后续补图后再进行 UI 复验。

### 2. OpenSpec 没有 proposal/apply 子命令怎么办？

按等价流程执行：

1. `openspec new change <change-id>`
2. 手工生成 proposal/tasks/spec delta
3. `openspec validate <change-id> --strict`
4. 按 tasks 实施并归档

### 3. 哪些操作必须人工确认？

1. 跨模块大规模重构
2. 删除或重命名核心文件
3. 修改 `.github/instructions` 或 `.github/skills` 关键治理文件
4. 主版本升级或核心依赖变更