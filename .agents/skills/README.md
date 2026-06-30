---
name: project-skills-index
description: 项目的本地技能索引，帮助代理在具体开发场景下选择合适的技能文件。
---

# 项目技能索引

`.agents/skills` 存放与 `.agents/rules` 配套的执行型技能。Rules 规定不可违反的边界，Skills 负责把边界转成可落地的步骤、模板、检查清单和产出路径。

执行原则：

1. 先匹配并读取相关 `.agents/rules/*.instructions.md`。
2. 再加载与任务匹配的 `SKILL.md`。
3. Rule 与 Skill 冲突时，以 Rule 为准。
4. 涉及 `docs/prd/*.md` + UI 自动实现时，必须使用 `implement-from-prd-ui` 作为总入口，并按 Proposal -> Apply -> Archive 生命周期执行。

## 技能分层

### 1. 总入口

| 技能 | 使用场景 | 关键产出 |
|------|----------|----------|
| `implement-from-prd-ui` | 用户输入 `docs/prd/*.md` 并要求创建提案、实现页面/UI、还原设计稿或验收 | 串联设计源识别、UI 分析、组件拆分、接口契约、OpenSpec、实施与 UI 验收 |

### 2. 探索与提案

| 技能 | 使用场景 | 关键产出 |
|------|----------|----------|
| `openspec-explore` | 需求还不清楚，需要先讨论、调查、比较方案 | 结论、风险、可选择沉淀到 OpenSpec |
| `openspec-propose` | 用户希望快速创建一个完整 OpenSpec change | `openspec/changes/<change-id>/` |
| `create-proposal` | 需要按本项目规则创建 proposal、design、tasks、spec delta | OpenSpec proposal、design、tasks、spec delta |

### 3. UI 分析、组件规划与验收

| 技能 | 使用场景 | 关键产出 |
|------|----------|----------|
| `design-analysis` | 需要分析截图、`.pen`、Figma、Stitch 或 UI 描述 | `docs/样式还原/<prd_slug>-UI分析清单.md` |
| `component-planning` | UI 类 OpenSpec validate/apply 前需要明确组件拆分边界 | `docs/组件拆分/<prd_slug>-组件拆分清单.md` |
| `ui-verification` | 实现完成后需要对照设计稿或分析清单做 UI 验收 | `docs/样式还原/<prd_slug>-UI问题清单.md` |
| `web-design-guidelines` | 需要审查 UI、可访问性、体验或 Web 设计质量 | UI 代码审查发现 |

### 4. 开发实施

| 技能 | 使用场景 | 配套规则 |
|------|----------|----------|
| `openspec-apply-change` | 按 OpenSpec tasks 实施变更 | `12-自动化执行规范` |
| `create-route` | 新增或维护页面路由 | `03-项目结构`、`06-路由规范` |
| `create-component` | 新增或拆分 Vue 组件 | `03-项目结构`、`04-组件规范`、`09-样式规范` |
| `theme-variables` | 编写或修改页面/组件样式 | `04-组件规范`、`09-样式规范` |
| `create-api` | 新增、调整、mock 或接入真实接口 | `03-项目结构`、`05-API规范` |
| `api-doc-summary` | 完成或审查 API 相关变更，更新接口汇总文档 | `05-API规范` |
| `create-store` | 新增或重构 Pinia 全局状态 | `03-项目结构`、`07-状态管理` |

### 5. 归档与技能扩展

| 技能 | 使用场景 | 关键产出 |
|------|----------|----------|
| `openspec-archive-change` | OpenSpec change 已完成，需要归档 | `openspec/changes/archive/YYYY-MM-DD-<change-id>/` |
| `find-skills` | 需要查找或安装外部技能 | 技能候选与安装命令 |
| `skill-creator` | 需要创建或更新本地技能 | 新技能目录与 `SKILL.md` |

## PRD + UI 自动实现主链路

```text
implement-from-prd-ui
  ↓
design-analysis
  ↓
component-planning
  ↓
create-proposal
  ↓
openspec validate <change-id> --strict
  ↓
openspec-apply-change
  ↓
create-route / create-component / theme-variables / create-api / api-doc-summary / create-store
  ↓
ui-verification
  ↓
openspec-archive-change
```

主链路约束：

- `design-analysis` 必须在开发前产出 UI 分析清单；设计源缺失时必须在 proposal/tasks 中标记 `UI_PENDING`。
- UI 分析清单必须包含 `UI 证据索引`，统一记录 Stitch / Figma / `.pen` / `docs-ui` / 截图 / 纯 PRD 的设计源定位、最终证据、必验区域和关系型核对项。
- `component-planning` 必须在 UI 类 change validate/apply 前产出组件拆分清单。
- UI 类 change 的 `design.md` 必须引用组件拆分清单，`tasks.md` 必须写明按组件拆分清单实施。
- 涉及接口时，必须使用 `create-api` 规划 `src/services/client.ts`、页面 service、页面 mock、类型文件与 mock 替换点。
- 涉及接口文档时，必须使用 `api-doc-summary` 更新 `docs/api/接口汇总.md`。
- 实现完成后必须使用 `ui-verification` 进行 UI 还原验收，修复后再次验证；Browser 截图失败时记录失败阶段并降级 Playwright CLI/MCP，验收只保留最终引用证据。
- 质量门禁推荐顺序：`test/typecheck/lint/openspec validate` 可并行，`build` 单独执行，build 后必要时补跑 lint。

## 技能选择速查

| 任务描述 | 应加载技能 |
|----------|------------|
| “根据 docs/prd 实现设计稿” | `implement-from-prd-ui` |
| “分析这个设计稿/截图/Figma/Stitch” | `design-analysis` |
| “先规划页面要拆哪些组件” | `component-planning` |
| “帮我建 OpenSpec proposal/tasks/spec” | `create-proposal` 或 `openspec-propose` |
| “继续/开始实施这个 OpenSpec change” | `openspec-apply-change` |
| “新增页面路由” | `create-route` |
| “拆一个组件/新增组件” | `create-component` |
| “写样式/改样式/适配主题” | `theme-variables` |
| “接接口/mock 接口/切真实接口” | `create-api` |
| “汇总接口文档” | `api-doc-summary` |
| “新增全局状态” | `create-store` |
| “验收 UI 还原度” | `ui-verification` |
| “完成后归档 change” | `openspec-archive-change` |
| “找有没有现成技能” | `find-skills` |
| “创建或更新一个技能” | `skill-creator` |
| “审查 UI 体验或可访问性” | `web-design-guidelines` |

## 产出路径汇总

| 产物 | 路径 |
|------|------|
| UI 分析清单 | `docs/样式还原/<prd_slug>-UI分析清单.md` |
| 组件拆分清单 | `docs/组件拆分/<prd_slug>-组件拆分清单.md` |
| UI 问题清单 | `docs/样式还原/<prd_slug>-UI问题清单.md` |
| API 汇总文档 | `docs/api/接口汇总.md` |
| OpenSpec proposal | `openspec/changes/<change-id>/proposal.md` |
| OpenSpec design | `openspec/changes/<change-id>/design.md` |
| OpenSpec tasks | `openspec/changes/<change-id>/tasks.md` |
| OpenSpec spec delta | `openspec/changes/<change-id>/specs/<capability>/spec.md` |
| OpenSpec archive | `openspec/changes/archive/YYYY-MM-DD-<change-id>/` |

## 新增技能维护要求

新增技能时：

1. 新建 `.agents/skills/<skill-name>/SKILL.md`。
2. 在 frontmatter 中写清 `name` 与 `description`，让 Agent 能按任务自动匹配。
3. 在正文中写清使用场景、必读规则、步骤、产出路径与检查清单。
4. 在本 README 中登记技能分层、选择速查与产出路径。
5. 若技能影响主链路，同步更新 `README.md` 与 `docs/architecture/repository-architecture.md`。
