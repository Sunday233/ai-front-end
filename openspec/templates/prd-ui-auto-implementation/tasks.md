## 1. 输入与触发

- [ ] 1.1 识别 PRD + UI + 实现语义
- [ ] 1.2 扫描 docs/prd 与 docs/ui
- [ ] 1.3 生成 PRD 排序与 UI 配对映射

## 2. Proposal（需求/变更收敛）

- [ ] 2.1 创建 change-id 并生成 proposal.md
- [ ] 2.2 生成 tasks.md
- [ ] 2.3 生成 spec delta（明确影响范围）
- [ ] 2.4 执行 openspec validate --strict
- [ ] 2.5 Proposal 通过后默认确认进入 Apply（命中高风险时人工确认）

## 3. Apply（开发执行对齐）

- [ ] 3.1 读取当前变更 proposal/tasks/spec 增量
- [ ] 3.2 加载 instructions + 相关 Skills + MCP 上下文
- [ ] 3.3 按 PRD 语义拆分页面与组件
- [ ] 3.4 完成类型、接口、状态与样式实现
- [ ] 3.5 执行类型/lint/测试/构建门禁
- [ ] 3.6 失败自动修复，最多重试 2 次

## 4. 验收与归档

- [ ] 4.1 基于截图优先执行 UI 验收
- [ ] 4.2 同时核对 design-analysis 清单与 spec 增量
- [ ] 4.3 修复阻断级问题并回归
- [ ] 4.4 记录非阻断问题与风险
- [ ] 4.5 执行 openspec archive <change-id> --yes
- [ ] 4.6 将 spec 增量合并到 openspec/specs 对应能力
- [ ] 4.7 归档后执行 openspec validate --strict
- [ ] 4.8 输出上线就绪结论（非部署）
