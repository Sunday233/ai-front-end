# prd-ui-frontend Specification

## Purpose
TBD - created by archiving change add-prd-ui-frontend-implementation. Update Purpose after archive.
## Requirements
### Requirement: 资产驱动的页面实现入口

系统 SHALL 在接收到 `docs/prd` 与 `docs/ui` 输入后，按同名前缀匹配并执行页面实现。

#### Scenario: 输入资产配对成功

- **WHEN** 存在 `workbench.md`、`object-type-list.md`、`object-type-create.md` 及对应 UI 截图
- **THEN** 系统生成并实现对应页面与交互结构

### Requirement: 工作台页面实现

系统 SHALL 提供工作台页面，包含搜索区、最近浏览卡片区与收藏空态区。

#### Scenario: 工作台默认态渲染

- **WHEN** 用户进入工作台路由
- **THEN** 页面显示搜索栏、最近浏览数据卡片和收藏空态占位

### Requirement: 对象类型列表页面实现

系统 SHALL 提供对象类型列表页面，支持关键字筛选、表格浏览与分页操作。

#### Scenario: 列表筛选与分页

- **WHEN** 用户输入筛选关键字并执行查询
- **THEN** 列表按条件更新，并可执行分页切换

### Requirement: 对象类型创建四步流程

系统 SHALL 提供 4 步创建流程：选择数据源、元数据配置、属性配置、动作配置。

#### Scenario: 步骤切换与完成提交

- **WHEN** 用户按顺序完成步骤并点击完成
- **THEN** 页面生成提交结果反馈并支持返回列表

### Requirement: 服务与类型边界

系统 SHALL 使用 `src/services` 提供请求封装，并在 `src/types` 中定义接口与模型类型。

#### Scenario: 页面数据读取

- **WHEN** 页面加载数据
- **THEN** 页面通过服务函数获取 mock 数据并保持类型安全

### Requirement: 质量门禁

系统 SHALL 在交付前通过 TypeScript、ESLint 与构建检查。

#### Scenario: 交付前质量校验

- **WHEN** 执行 typecheck、lint、build
- **THEN** 所有命令通过且无阻断错误

