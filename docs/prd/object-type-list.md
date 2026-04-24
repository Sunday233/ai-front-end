# PRD_TEMPLATE: 对象类型列表页面

## CHAPTER-00 文档元信息

- prd_id: object-type-list
- prd_slug: object-type-list
- page_name: 对象类型列表页面
- template_version: 1.0.0
- ui_prefix: object-type-list
- pairing_rule: same-prefix
- owner: Matrix
- last_updated: 2026-04-24

## CHAPTER-01 页面目标与业务流程

### goal

1. 支持 对象类型列表页面 核心能力展示。
2. 提供标准查询入口。
3. 提供页面级操作入口。
4. 支持跳转关联页面流程。

### business_flow

1. 用户进入页面。
2. 页面加载默认数据。
3. 用户执行筛选或操作。
4. 页面刷新展示结果。
5. 用户进入下一业务流程页面。

## CHAPTER-02 功能范围边界

### in_scope

1. 页面核心列表或结构展示。
2. 页面筛选能力。
3. 页面跳转入口能力。
4. 页面操作入口能力。

### out_of_scope

1. 子流程复杂业务逻辑实现。
2. 权限系统扩展逻辑。
3. 非 Sprint1 功能。

## CHAPTER-03 页面结构与关键交互

### layout_sections

1. 页面标题区域。
2. 筛选区域。
3. 主列表或主内容区域。
4. 操作入口区域。

### key_interactions

1. 查询刷新数据。
2. 重置筛选条件。
3. 点击进入详情页面。
4. 点击进入创建流程。

## CHAPTER-04 UI 配对映射（docs/ui）

### required_ui_assets

1. object-type-list-main-default.png

### optional_ui_assets

1. object-type-list-main-loading.png
2. object-type-list-main-empty.png
3. object-type-list-main-error.png

### mapping_rule

1. UI 文件存储 docs/ui/
2. 文件名前缀必须一致
3. Agent 自动匹配 prd_slug

## CHAPTER-05 状态定义

### states

1. default
2. loading
3. empty
4. error

## CHAPTER-06 数据与接口要求

### data_fields

1. id
2. name
3. status
4. updatedAt

### api_contract

1. getObjectTypeListList

### mock_policy

1. 接口未完成允许 mock
2. 记录替换点

## CHAPTER-07 验收标准

### functional_acceptance

1. 页面默认加载成功
2. 查询条件生效
3. 页面跳转正确

### ui_acceptance

1. 页面符合 UI default 状态

### quality_gates

1. TypeScript 零错误
2. ESLint 通过
3. 构建成功

## CHAPTER-08 风险与兜底

### risks

1. UI 资产缺失
2. 接口字段变更

### fallback

1. UI_PENDING 标记
2. mock 替代接口

## CHAPTER-09 交付输出

### outputs

1. 页面实现代码
2. OpenSpec proposal
3. OpenSpec tasks
4. OpenSpec spec
