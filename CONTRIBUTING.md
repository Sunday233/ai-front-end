# 贡献指南

感谢你为本仓库贡献内容。

本仓库是治理型资产仓库，提交前请优先保证规则一致性、技能可执行性和文档可追溯性。

## 贡献范围

欢迎以下类型贡献：

1. 新增/优化 Rules（`.github/instructions/`）
2. 新增/优化 Skills（`.github/skills/`）
3. 补充 PRD、UI、架构文档（`docs/`）
4. 优化 OpenSpec 模板与流程文档（`openspec/`）

## 提交流程

1. 创建分支

建议命名：

- `feat/<topic>`
- `fix/<topic>`
- `docs/<topic>`
- `chore/<topic>`

2. 开发与自检

提交前建议执行：

- `openspec validate --strict`（涉及 OpenSpec 变更时）
- 文档链接与目录索引完整性检查
- 规则与技能引用关系检查（Rules 与 Skills 不冲突）

3. 提交 PR

PR 描述建议包含：

1. 变更背景
2. 影响范围
3. 验证方式
4. 风险与回滚方案（如适用）

## PR 检查清单

- [ ] 修改内容与仓库定位一致（治理资产优先）
- [ ] 已同步更新相关索引文档（如 README、docs/README、skills/README）
- [ ] 新增技能目录符合 `<skill-name>/SKILL.md` 结构
- [ ] 新增规则文件使用 `.instructions.md` 后缀
- [ ] OpenSpec 变更可通过 strict 校验（如适用）

## 规范优先级

规则冲突时，按以下顺序处理：

1. `.github/instructions/*.instructions.md`
2. `.github/skills/*/SKILL.md`
3. 其他说明文档

## 沟通建议

如果改动涉及以下高风险操作，建议先开 Issue 讨论后再提交 PR：

1. 大范围目录重构
2. 修改自动化执行主流程
3. 删除或重命名核心规则/技能文件
4. 主版本或核心依赖策略变更
