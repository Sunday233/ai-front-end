## ADDED Requirements

### Requirement: 自动化重实现执行顺序
系统 SHALL 在命中 PRD + UI + 实现语义后，按 `docs/prd` 文件名升序逐个执行 Proposal、Apply、Archive 三阶段。

#### Scenario: 多 PRD 顺序执行
- **WHEN** `docs/prd` 下存在 `object-type-create.md`、`object-type-list.md`、`workbench.md`
- **THEN** 系统按文件名排序依次执行每个 PRD 的 Proposal→Apply→Archive
- **AND** 前一个 PRD 的失败不得阻断后续 PRD 的执行

### Requirement: 质量门禁失败重试策略
系统 SHALL 对质量门禁失败执行自动修复并重试，单个 PRD 的单项检查最多重试 2 次。

#### Scenario: 构建检查首次失败
- **WHEN** 某 PRD 的 typecheck、lint 或 build 首次失败
- **THEN** 系统执行修复并重试
- **AND** 若达到 2 次重试上限仍失败，则标记该 PRD 失败并继续执行下一 PRD

### Requirement: 交付日志与结论输出
系统 SHALL 为本轮重实现输出 PRD 级结论、总汇总结论、归档路径与残余风险清单。

#### Scenario: 全流程完成后输出报告
- **WHEN** 所有 PRD 执行结束
- **THEN** 系统输出每个 PRD 的通过/失败状态、UI_PENDING 项、质量门禁结果
- **AND** 输出每个 change 的归档位置与规格更新说明
