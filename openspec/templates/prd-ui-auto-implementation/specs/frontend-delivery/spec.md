## ADDED Requirements

### Requirement: PRD 与 UI 语义触发自动执行

系统 MUST 在识别到 PRD 输入、UI 输入与实现意图同时存在时，进入自动执行流程。

#### Scenario: 命中自动执行语义

- **WHEN** 用户请求基于 docs/prd 与 docs/ui 自动实现
- **THEN** 系统进入自动执行流程而非普通问答流程

### Requirement: OpenSpec 前置治理

系统 MUST 在实现前完成 OpenSpec 变更资产并通过严格校验。

#### Scenario: OpenSpec 校验通过后实现

- **WHEN** proposal/tasks/spec delta 均已生成并通过 strict 校验
- **THEN** 系统才可进入代码实现阶段

### Requirement: 多 PRD 批处理与失败续跑

系统 MUST 先按 sprint 目录名排序，再按 PRD 文件名顺序处理多个 PRD，并在单 PRD 失败后继续后续 PRD。

#### Scenario: 单 PRD 失败不阻断批次

- **WHEN** 当前 PRD 在重试上限后仍失败
- **THEN** 系统记录失败并继续处理下一个 PRD

### Requirement: 上线就绪门禁

系统 MUST 在输出结果前完成类型、lint、测试、构建与 UI 验收门禁；UI 验收 MUST 显式调用 `ui-verification`。

#### Scenario: 门禁通过输出上线就绪结论

- **WHEN** 质量门禁通过且阻断风险关闭
- **THEN** 系统输出上线就绪（非部署）结论

### Requirement: 设计源优先级

系统 MUST 按 `figma_links` > `screenshots` > 同 sprint 前缀兜底 的顺序选择设计源。

#### Scenario: figma_links 优先命中

- **WHEN** PRD frontmatter 中存在至少 1 条有效 `figma_links.url`
- **THEN** 系统优先调用 Figma MCP 并跳过截图匹配

#### Scenario: figma_links 缺失时回退截图

- **WHEN** 无有效 `figma_links`
- **THEN** 系统使用 `screenshots`；若无效再按同 sprint 前缀兜底

### Requirement: UI 验收基线

系统 MUST 在有有效 `figma_links` 时以 Figma MCP 取证作为验收基线；仅在无有效链接时回退 docs/ui 截图。

#### Scenario: Figma 基线验收

- **WHEN** 当前 PRD 存在有效 `figma_links`
- **THEN** ui-verification 使用 Figma MCP 结果进行验收对比

#### Scenario: 截图回退验收

- **WHEN** 当前 PRD 不存在有效 `figma_links`
- **THEN** ui-verification 回退至 docs/ui 截图进行验收对比

### Requirement: 执行可观测性

系统 MUST 记录任务 ID、关键节点日志、错误分类与重试信息。

#### Scenario: 生成可审计执行日志

- **WHEN** 自动执行流程结束
- **THEN** 系统输出包含全链路信息的执行日志
