## ADDED Requirements

### Requirement: 截图模式分析清单与证据等级

系统 SHALL 在输入为普通截图时，输出符合截图模式模板的 UI 分析清单，并对关键字段标注证据等级。

#### Scenario: 截图输入的分析清单生成

- **WHEN** `docs/ui` 仅提供 png/jpg 截图且无结构化设计节点
- **THEN** 输出 `docs/样式还原/对象管理-UI分析清单.md`
- **AND** 文档包含输入资产清单、布局 Map、区域分析、样式汇总、验证检查清单
- **AND** 文档包含“字段证据等级与待确认项”章节

## MODIFIED Requirements

### Requirement: 资产驱动的页面实现入口

系统 SHALL 在接收到 `docs/prd` 与 `docs/ui` 输入后，按同名前缀匹配并执行页面实现；当未找到严格同名资产时，允许按语义近似匹配并记录 `UI_PENDING` 或“映射说明”，不中断后续 PRD。

#### Scenario: 输入资产配对成功

- **WHEN** 存在 `workbench.md`、`object-type-list.md`、`object-type-create.md` 与可映射 UI 截图
- **THEN** 系统生成并实现对应页面与交互结构
- **AND** 在分析清单中记录 PRD 与截图文件映射关系

#### Scenario: 局部配对缺失

- **WHEN** 某个 PRD 缺少严格匹配的 UI 状态图
- **THEN** 实现流程继续执行，不阻断其它 PRD
- **AND** 在分析清单或日志中标记 `UI_PENDING` 与待补状态

### Requirement: 对象类型列表页面实现

系统 SHALL 提供对象类型列表页面，支持关键字筛选、表格浏览、分页操作与页面级动作入口。

#### Scenario: 列表筛选与分页

- **WHEN** 用户输入筛选关键字并执行查询
- **THEN** 列表按条件更新，并可执行分页切换
- **AND** 页面提供刷新与创建入口，与截图主流程一致

### Requirement: 对象类型创建四步流程

系统 SHALL 提供 4 步创建流程：选择数据源、元数据配置、属性配置、动作配置，并在每步执行最小必填校验。

#### Scenario: 步骤切换与完成提交

- **WHEN** 用户按顺序完成步骤并点击完成
- **THEN** 页面生成提交结果反馈并支持返回列表
- **AND** 未满足必填条件时阻止进入下一步并提示

### Requirement: 质量门禁

系统 SHALL 在交付前通过 TypeScript、ESLint、构建检查，并完成基于截图的 UI 验收记录。

#### Scenario: 交付前质量校验

- **WHEN** 执行 typecheck、lint、build 与 UI 验收
- **THEN** 所有命令通过且无阻断错误
- **AND** `docs/样式还原/对象管理-UI问题清单.md` 记录本轮差异结果
