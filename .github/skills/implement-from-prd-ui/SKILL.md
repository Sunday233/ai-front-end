---
name: implement-from-prd-ui
description: 语义触发“基于 docs/prd 与 docs/ui 自动实现前端工程”时使用。强制先走 OpenSpec，再按规则完成实现、校验、验收与汇总。
---

# 从 PRD + UI 自动实现

## 使用时机

当用户表达以下意图时使用本技能：

1. 让 Agent 基于 `docs/prd/` 与 `docs/ui/` 自动实现前端。
2. 希望一条指令触发完整执行链路。
3. 要求产出上线就绪结果（本轮不要求实际部署）。

典型触发语句：

- 帮我实现 docs 文件下的 PRD 和 UI 设计稿截图
- 根据 docs/prd 和 docs/ui 自动落地前端页面

## 输入协议

1. PRD 目录：`docs/prd/`
2. UI 目录：`docs/ui/`
3. 命名规则：功能 `slug` 同名前缀配对
4. 批处理顺序：按 PRD 文件名排序

## 核心约束

1. 必须完整经过 OpenSpec 生命周期：Proposal -> Apply -> Archive。
2. Proposal 阶段必须通过 `openspec validate --strict` 才能进入实现。
3. Proposal 通过后默认确认进入 Apply（除非用户明确拒绝或命中高风险确认）。
4. Apply 阶段全程围绕同一份 `proposal/tasks/spec` 执行，并结合 instructions、相关 Skills 与 MCP 上下文，禁止脱离 spec 盲改。
5. Archive 阶段必须执行并沉淀为后续需求参考上下文。
6. UI 验收以截图为优先基线，并同时核对 design-analysis 清单与 spec 增量。
7. 失败自动修复最多 2 次，单 PRD 失败不阻断后续。
8. 命中高风险操作必须请求人工确认。

## OpenSpec 三环节发力点

1. 需求/变更收敛：先写 OpenSpec 变更（proposal + tasks + spec 增量），把“改什么、影响哪里”说清楚，禁止直接盲改代码。
2. 开发执行对齐：实施阶段统一读取同一份 proposal/tasks/spec 增量，并结合 instructions、Skills、MCP 执行。
3. 验收与归档：UI 验收同时对照 design-analysis 清单与 spec 增量，通过后归档并合并到 specs，沉淀长期上下文。

## OpenSpec 命令映射

1. Proposal（逻辑命令）：`openspec proposal <change-id>`
2. Apply（逻辑命令）：`openspec apply <change-id>`
3. Archive：`openspec archive <change-id> --yes`

若当前 CLI 版本无 `proposal` / `apply` 命令，按等价流程执行：

1. Proposal 等价：`openspec new change <change-id>` + 生成 `proposal/tasks/spec` + `openspec validate <change-id> --strict`
2. Apply 等价：读取 `proposal/tasks/spec` 并按 `tasks.md` 逐项实施

## 执行流程

## 步骤 1：意图识别与输入扫描

1. 判断是否命中 PRD + UI + 实现语义。
2. 扫描 `docs/prd/` 和 `docs/ui/`。
3. 生成 PRD 排序清单与 UI 配对映射。

## 步骤 2：逐 PRD 执行 Proposal 阶段

1. 为当前 PRD 生成 `change-id`。
2. 生成 `proposal.md`、`tasks.md`、`spec delta`。
3. 必要时补充 `design.md`。
4. 执行 `openspec validate --strict` 并修复失败项。
5. Proposal 通过后，默认确认进入 Apply 阶段。

## 步骤 3：执行 Apply 阶段

1. 读取当前变更的 `proposal/tasks/spec` 增量。
2. 加载并应用项目 instructions 与任务相关 Skills（如 create-route/create-api/design-analysis）。
3. 根据任务需要接入 MCP 证据（设计稿、浏览器、接口文档）并按 `tasks.md` 逐项实施。
4. 每完成一项任务就更新任务状态，确保实施始终与 spec 一致。

## 步骤 4：设计分析

1. 基于 UI 截图输出 UI 分析清单。
2. 缺少 UI 时标记 `UI_PENDING` 并继续。

## 步骤 5：实现落地

1. 按 PRD 语义拆分路由、页面组件、通用组件。
2. 按规则实现接口类型、HTTP 封装、状态管理。
3. 接口未就绪时使用 mock 并记录替换点。
4. 样式遵循主题变量与 SCSS Modules 规则。

## 步骤 6：质量门禁

1. TypeScript、ESLint、单测、冒烟、E2E、构建逐项执行。
2. 失败自动修复并重试，最多 2 次。
3. 超限失败后记录并继续后续 PRD。

## 步骤 7：UI 验收

1. 对照截图优先基线执行 UI 验收。
2. 同时核对 design-analysis 产物与 OpenSpec spec 增量，确认满足本次业务与交互预期。
3. 输出 UI 问题清单并修复阻断项。
4. 允许少量非阻断问题并留档。

## 步骤 8：Archive 归档

1. 验收通过后执行 `openspec archive <change-id> --yes`。
2. 将本次变更的 spec 增量合并到 `openspec/specs` 对应能力。
3. 归档后执行 `openspec validate --strict`，确保归档可追溯。

## 步骤 9：最终汇总

1. 汇总通过项、失败项、风险项、待补项。
2. 汇总本轮归档结果（归档路径、specs 合并记录、受影响能力）。
3. 输出执行日志与上线就绪结论（不含部署）。

## 输出物

1. OpenSpec 变更目录内容。
2. 实现代码与检查结果。
3. UI 问题清单。
4. 归档结果与 specs 更新信息（包含增量合并记录）。
5. 执行日志。
6. 上线就绪结论。

## 关联规则与技能

- `.github/instructions/12-自动化执行规范.instructions.md`
- `.github/skills/create-proposal/SKILL.md`
- `.github/skills/design-analysis/SKILL.md`
- `.github/skills/create-route/SKILL.md`
- `.github/skills/create-component/SKILL.md`
- `.github/skills/create-api/SKILL.md`
- `.github/skills/create-store/SKILL.md`
- `.github/skills/theme-variables/SKILL.md`
- `.github/skills/ui-verification/SKILL.md`
