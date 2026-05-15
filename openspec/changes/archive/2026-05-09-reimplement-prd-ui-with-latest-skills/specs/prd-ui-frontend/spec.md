## MODIFIED Requirements

### Requirement: 资产驱动的页面实现入口
系统 SHALL 在接收到 `docs/prd` 与 `docs/ui` 输入后，按同名前缀匹配并执行页面实现；当未找到同名前缀 UI 资产时，系统 SHALL 记录 `UI_PENDING` 并继续后续 PRD，不得阻断执行。

#### Scenario: 输入资产配对成功
- **WHEN** 存在 `workbench.md`、`object-type-list.md`、`object-type-create.md` 与同前缀 UI 截图
- **THEN** 系统生成并实现对应页面与交互结构
- **AND** 在分析清单中记录 PRD 与截图文件映射关系

#### Scenario: 局部配对缺失
- **WHEN** 某个 PRD 缺少同前缀 UI 状态图
- **THEN** 实现流程继续执行，不阻断其它 PRD
- **AND** 在分析清单或日志中标记 `UI_PENDING` 与待补状态

### Requirement: 质量门禁
系统 SHALL 在交付前通过 TypeScript、ESLint、构建检查，并完成基于截图的 UI 验收记录；样式实现 SHALL 符合主题变量规范，不得新增硬编码主题色。

#### Scenario: 交付前质量校验
- **WHEN** 执行 typecheck、lint、build 与 UI 验收
- **THEN** 所有命令通过且无阻断错误
- **AND** `docs/样式还原/对象管理-UI问题清单.md` 记录本轮差异结果

## ADDED Requirements

### Requirement: PRD 与 UI 同前缀命名一致性
系统 SHALL 确保 `docs/prd` 的 `prd_slug` 与 `docs/ui` 文件名前缀一致，以便自动化配对稳定执行。

#### Scenario: 命名规范化后自动匹配
- **WHEN** UI 文件名前缀与对应 PRD 的 `prd_slug` 一致
- **THEN** 系统无需语义近似推断即可完成配对
- **AND** 批处理过程中不会产生命名歧义

### Requirement: 页面主题变量一致性
系统 SHALL 在页面样式中使用主题变量表达主色、文本色、边框色等主题相关属性。

#### Scenario: 样式实现检查
- **WHEN** 页面样式提交到质量门禁
- **THEN** 主题相关颜色来自 `var(--ant-*)` 或项目变量
- **AND** 不存在新增硬编码主色值
