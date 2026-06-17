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

### Requirement: UI 类 Change 组件拆分门禁

系统 MUST 在 UI 类 OpenSpec validate 与 apply 前完成组件拆分前置检查。

#### Scenario: 组件拆分清单齐备后进入实施

- **WHEN** change 涉及页面、组件、设计稿、UI 还原、`docs/ui`、Figma、Stitch、Pencil 或 `docs/样式还原`
- **THEN** 系统确认 `docs/组件拆分/<prd_slug>-组件拆分清单.md` 已存在
- **AND** `design.md` 已引用该组件拆分清单
- **AND** `tasks.md` 已写明按组件拆分清单实施
- **AND** 缺任一项时暂停，不进入 validate 或 apply

### Requirement: PRD 设计源识别与 UI 分析

系统 MUST 从 `docs/prd/*.md` 中识别 `docs/ui` 截图、`.pen`、Figma 链接或 Stitch 链接，并在实现前产出 UI 分析清单。

#### Scenario: 识别设计源并产出分析清单

- **WHEN** PRD 声明 `primary_design_source` 或包含可识别设计源
- **THEN** 系统选择截图模式、Pencil MCP、Figma MCP 或 Stitch MCP 读取设计稿
- **AND** 产出 `docs/样式还原/<prd_slug>-UI分析清单.md`

### Requirement: 基于 UI 分析清单实施

系统 MUST 在页面/UI 开发时依据 UI 分析清单还原布局、文字、图片、层级与样式。

#### Scenario: 按分析清单实现 UI

- **WHEN** tasks 进入页面/UI 开发阶段
- **THEN** 系统读取 UI 分析清单、组件拆分清单与相关 Rules/Skills
- **AND** 按 tasks 顺序完成路由、组件、样式、接口与质量门禁

### Requirement: 页面级 API 与文档汇总

系统 MUST 在 PRD 声明接口契约时，按页面级 service、axios 请求封装、mock 替换点与 API 汇总文档实施。

#### Scenario: 接口契约落地到页面 service

- **WHEN** PRD 包含 `CHAPTER-06 数据与接口要求`
- **THEN** 系统提取 `data_fields`、`api_contract` 与 `mock_policy`
- **AND** 若项目缺少 `src/services/client.ts`，先创建 axios 请求封装
- **AND** 每个页面使用 `src/services/<page-slug>.ts`
- **AND** 每个含 mock 的页面使用 `src/services/<page-slug>.mock.ts`
- **AND** 类型定义位于 `src/types/<page-slug>/model.ts` 与 `src/types/<page-slug>/api.ts`
- **AND** 请求通过 `src/services/client.ts` 的 `httpClient` 发起
- **AND** mock 通过 axios adapter/handler、页面级 mock 文件与 `src/services/mock.ts` 注册入口拦截
- **AND** 不得将多个页面的 mock handler / mock 数据集中保留在单个业务 ts 文件中
- **AND** 更新 `docs/api/接口汇总.md`

### Requirement: 多 PRD 批处理与失败续跑

系统 MUST 按文件名顺序处理多个 PRD，并在单 PRD 失败后继续后续 PRD。

#### Scenario: 单 PRD 失败不阻断批次

- **WHEN** 当前 PRD 在重试上限后仍失败
- **THEN** 系统记录失败并继续处理下一个 PRD

### Requirement: 上线就绪门禁

系统 MUST 在输出结果前完成类型、lint、测试、构建与 UI 验收门禁。

#### Scenario: 门禁通过输出上线就绪结论

- **WHEN** 质量门禁通过且阻断风险关闭
- **THEN** 系统输出上线就绪（非部署）结论

### Requirement: UI 验收与问题回归

系统 MUST 在 Codex 或 Cursor 中优先使用 `@Browser` 打开实现页，与设计稿或 UI 分析清单比对，并按 P0/P1/P2 产出问题清单；不可用时使用 Playwright。

#### Scenario: 产出并回归 UI 问题清单

- **WHEN** 页面/UI 实现完成
- **THEN** 系统执行 ui-verification
- **AND** 产出 `docs/样式还原/<prd_slug>-UI问题清单.md`
- **AND** 修复 P0 问题后再次使用 Browser 或 Playwright 验证

### Requirement: 执行可观测性

系统 MUST 记录任务 ID、关键节点日志、错误分类与重试信息。

#### Scenario: 生成可审计执行日志

- **WHEN** 自动执行流程结束
- **THEN** 系统输出包含全链路信息的执行日志
