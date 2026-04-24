# Copilot Workspace Instructions

本仓库采用「规则 + 技能」双层结构：

- 规则（Rules）：放在 `.github/instructions/*.instructions.md`。
- 技能（Skills）：放在 `.github/skills/*/SKILL.md`。

请始终遵循以下原则：

1. 先匹配并应用 `.github/instructions` 中相关规则，再开始实现。
2. 当任务与某个技能描述匹配时，优先加载对应 `SKILL.md` 执行。
3. 如规则与技能存在冲突，以规则为准。
4. 如需新增规范或技能：
   - 规则直接维护在 `.github/instructions/*.instructions.md`。
   - 技能直接维护在 `.github/skills/<skill-name>/SKILL.md`。
5. 当任务命中“PRD + UI 自动实现”语义时，必须先加载：
   - `.github/instructions/12-自动化执行规范.instructions.md`
   - `.github/skills/implement-from-prd-ui/SKILL.md`
   并强制按 OpenSpec 生命周期执行：Proposal -> Apply -> Archive（命中高风险时再人工确认）。

## 直接引用源目录（用于问答上下文增强）

如环境开启 `chat.includeReferencedInstructions`，请优先读取以下源目录文档作为补充上下文：

- 规则索引：[`../.github/instructions/README.md`](../.github/instructions/README.md)
- 技能索引：[`../.github/skills/README.md`](../.github/skills/README.md)

说明：

- 技能是否可被自动调用，仍以技能目录发现机制为准（`.github/skills` 下的 `SKILL.md`）。
- 规则是否自动应用，仍以 `.instructions.md` 机制为准（`.github/instructions`）。
