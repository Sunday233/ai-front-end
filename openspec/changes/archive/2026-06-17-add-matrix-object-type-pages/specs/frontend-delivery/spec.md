## ADDED Requirements

### Requirement: Matrix 工作台页面交付

系统 SHALL 提供 Matrix 智能体工作台页面，展示左侧导航、当前智能体资源统计、搜索、新建入口、最近浏览对象类型和收藏对象类型。

#### Scenario: 默认工作台展示

- **WHEN** 用户进入 `/workbench`
- **THEN** 页面展示 `智能体管理Matrix` 左侧导航
- **AND** 展示资源菜单 `对象类型 39`、`链接类型 6`、`动作类型 31`、`对象类型组 17`
- **AND** 展示搜索框、新建按钮、最近浏览对象类型与收藏对象类型卡片
- **AND** 布局、文字、图标、卡片和下拉菜单符合 `docs/样式还原/workbench-UI分析清单.md`

#### Scenario: 新建下拉展示

- **WHEN** 用户点击工作台右上角「新建」
- **THEN** 页面展示对象类型、链接类型、动作类型、对象类型组创建选项
- **AND** 选项顺序、描述文案、弹出位置符合 UI 分析清单

### Requirement: 对象类型列表页面交付

系统 SHALL 提供对象类型列表页面，支持分页展示、关键词搜索、刷新、新建入口、详情入口、权限展示控制和列表状态。

#### Scenario: 默认列表展示

- **WHEN** 用户进入 `/object-types`
- **THEN** 页面展示标题 `对象类型列表 39`
- **AND** 展示搜索框、刷新按钮、设置按钮和 `创建` 按钮
- **AND** 表格列顺序为 `类型名称`、`状态`、`可见性`、`修改时间`、`操作`
- **AND** 默认行数据、状态标签、可见性标签、详情链接和分页符合 `docs/样式还原/object-type-list-UI分析清单.md`

#### Scenario: 搜索与分页

- **WHEN** 用户输入 ID、RID 或名称关键词
- **THEN** 系统按 1 秒内最多一次的防抖策略搜索
- **AND** 搜索结果按最后修改时间降序展示
- **AND** 命中关键字高亮
- **AND** 分页切换保持当前搜索条件

### Requirement: 对象类型创建向导交付

系统 SHALL 提供对象类型创建向导，支持选择数据源、元数据配置、属性配置和动作配置四步流程。

#### Scenario: 四步向导展示

- **WHEN** 用户进入 `/object-types/create`
- **THEN** 页面展示四步步骤条：`选择数据源`、`元数据配置`、`属性配置`、`动作配置`
- **AND** 每一步内容、按钮位置、表单字段和状态符合 `docs/样式还原/object-type-create-UI分析清单.md`

#### Scenario: 选择数据集弹窗

- **WHEN** 用户在步骤 1 点击「选择数据集」
- **THEN** 系统展示选择数据集弹窗
- **AND** 弹窗包含搜索、清空、数据集列表、基本信息、列信息、数据预览、取消和选择按钮
- **AND** 数据集列表、列信息和数据预览逐行符合 UI 分析清单

#### Scenario: 属性映射逐行一致

- **WHEN** 用户进入步骤 3 属性配置
- **THEN** 系统以行级 `mappingRows[]` 渲染数据集字段与属性名称的一一映射
- **AND** `emp_no`、`hight`、`birth_date`、`first_name`、`last_name`、`gender` 的顺序、类型、主键标签、字数和操作符合 UI 分析清单
- **AND** 不得将左侧字段和右侧属性拆成无对应关系的并列列表

#### Scenario: 动作权限配置

- **WHEN** 用户在步骤 4 选择动作类型
- **THEN** 系统展示用户/用户组配置控件
- **AND** 支持选择 `chenzhenq5`、`chenzhenq8` 并以 tag 形式展示
- **AND** 动作卡片和权限控件符合 UI 分析清单

### Requirement: 组件拆分门禁

系统 SHALL 在 UI 类 change validate 与 apply 前完成组件拆分前置检查。

#### Scenario: 组件拆分清单齐备

- **WHEN** 执行 OpenSpec validate 或进入 apply
- **THEN** `docs/组件拆分/workbench-组件拆分清单.md` 存在
- **AND** `docs/组件拆分/object-type-list-组件拆分清单.md` 存在
- **AND** `docs/组件拆分/object-type-create-组件拆分清单.md` 存在
- **AND** `openspec/changes/add-matrix-object-type-pages/design.md` 引用这些清单
- **AND** `tasks.md` 写明按组件拆分清单实施

### Requirement: 页面级 API 契约

系统 SHALL 在目标 Vue 工程中按页面级 service、页面级 mock、类型定义和 API 文档元数据落地三页接口契约。

#### Scenario: API 文件结构符合规范

- **WHEN** 目标 Vue 工程进入 apply
- **THEN** 若缺少 `src/services/client.ts`，系统先创建 axios 请求封装
- **AND** 每个页面创建 `src/services/<page-slug>.ts`
- **AND** 每个含 mock 的页面创建 `src/services/<page-slug>.mock.ts`
- **AND** 每个页面创建 `src/types/<page-slug>/model.ts` 与 `src/types/<page-slug>/api.ts`
- **AND** 页面 service 只通过 `httpClient` 发请求
- **AND** `src/services/mock.ts` 只作为统一注册入口
- **AND** 更新 `docs/api/接口汇总.md`

#### Scenario: 未确认接口不伪造真实路径

- **WHEN** PRD 仅提供接口名称而未提供 method/path
- **THEN** API 文档和 tasks 将 method/path 标记为 `待后端确认`
- **AND** 不得将 mock 路径写成真实后端承诺

### Requirement: 目标工程初始化与实施边界

系统 SHALL 在当前仓库缺少可运行 Vue 应用时，先初始化目标 Vue 工程，再继续真实页面代码实施、质量门禁和 Browser UI 验收。

#### Scenario: 无 `src` 时先初始化目标工程

- **WHEN** 当前仓库不存在 `package.json`、`src/` 或可运行前端入口
- **THEN** 系统先初始化 Vite/Vue 应用入口与工程配置
- **AND** 再实施真实页面代码、质量门禁和 Browser UI 验收
- **AND** 不得在目标工程可运行前声明页面交付完成

### Requirement: UI 验收与问题清单

系统 SHALL 在目标 Vue 工程实现完成后使用 UI 验收流程产出问题清单，并修复 P0/P1/P2 问题后回归。

#### Scenario: 三页 UI 验收

- **WHEN** `/workbench`、`/object-types`、`/object-types/create` 可在浏览器打开
- **THEN** 系统使用 Browser 或 Playwright 对照 UI 分析清单验收
- **AND** 分别产出 `docs/样式还原/workbench-UI问题清单.md`、`docs/样式还原/object-type-list-UI问题清单.md`、`docs/样式还原/object-type-create-UI问题清单.md`
- **AND** P0/P1/P2 问题修复后再次验证
