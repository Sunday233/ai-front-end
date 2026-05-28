# PRD_TEMPLATE: 对象类型列表页面

## CHAPTER-00 文档元信息

- prd_id: object-type-list
- prd_slug: object-type-list
- page_name: 对象类型列表页面
- template_version: 1.0.0
- ui_prefix: object-type-list
- pairing_rule: same-prefix
- owner: 产品经理姓名
- last_updated: 2026-05-20

## CHAPTER-01 页面目标与业务流程

### goal

1. 展示智能体 EDA 内所有对象类型数据。
2. 支持分页展示、关键词检索、列表刷新、新建入口与详情查看。
3. 支持不同权限用户查询与管理对象类型。
4. 提供对象类型创建流程入口。
5. 对加载中、无数据、搜索无结果等状态提供完整 UI 还原依据。

### business_flow

1. 用户进入对象类型列表页面。
2. 页面默认分页加载全部对象类型数据。
3. 用户在顶部搜索框输入关键词，筛选匹配的对象类型。
4. 用户点击刷新按钮，重新拉取最新列表数据。
5. 用户点击右上角「新建」按钮，跳转对象类型创建页面。
6. 用户点击列表操作栏「详情」按钮，进入对应对象类型详情页。
7. 页面根据权限展示或隐藏新建与操作入口。

## CHAPTER-02 功能范围边界

### in_scope

1. 对象类型列表默认数据展示。
2. 对象类型关键词搜索。
3. 搜索结果高亮展示。
4. 列表刷新。
5. 分页展示与分页切换。
6. 新建对象类型入口。
7. 对象类型详情查看入口。
8. 加载中、无数据、搜索无结果、按钮禁用等状态。
9. 不同权限用户的新建与操作入口展示控制。

### out_of_scope

1. 对象类型详情页内部实现。
2. 对象类型创建页内部表单流程。
3. 对象类型编辑、删除、发布等复杂操作。
4. 权限系统后台配置能力。
5. 后端搜索排序算法实现。

## CHAPTER-03 页面结构与关键交互

### layout_sections

1. 页面外层容器：承载对象类型列表整体页面，需按设计稿还原宽度、边距、背景与内容区域。
2. 页面标题区：展示对象类型列表标题、说明或面包屑（以设计稿为准）。
3. 顶部操作区：包含搜索框、刷新按钮、右上角「新建」按钮。
4. 列表表格区：展示对象类型图标、名称、状态、可见性、最后修改时间、操作列。
5. 分页区：展示总数、页码、每页条数与翻页控件。
6. 空状态区：无数据或搜索无结果时展示空状态图标、提示文案与可能的操作入口。
7. 加载状态区：页面初次加载、刷新和搜索时展示加载反馈。

### key_interactions

1. 页面进入后默认分页加载全部对象类型数据。
2. 搜索框输入关键词后触发防抖搜索。
3. 搜索为空时恢复展示全量数据。
4. 搜索命中后匹配关键字高亮展示。
5. 点击刷新按钮重新请求当前筛选条件下的最新数据。
6. 点击「新建」按钮跳转对象类型创建页面。
7. 点击操作列「详情」按钮跳转对象类型详情页。
8. 切换分页时按当前搜索条件请求对应页数据。
9. 加载中禁用重复刷新、重复搜索提交等高频操作。

### interaction_rules

1. 页面布局、表格样式、按钮位置、页面 UI 状态严格参照 Figma 设计稿还原。
2. 搜索框输入限制 1-50 个字符。
3. 搜索框支持中英文、数字。
4. 搜索字段支持 ID、RID、名称。
5. 搜索采用防抖处理，输入过程每秒最多触发一次搜索请求。
6. 检索匹配优先级为：精确匹配 > 前缀匹配 > 全字段模糊匹配。
7. 搜索结果按最后修改时间降序排序。
8. 搜索为空时默认展示全量数据。
9. 检索命中关键字需要高亮显示。
10. 操作列默认仅展示「详情」按钮，根据用户权限开放对应操作权限。
11. 分页、筛选、功能按钮禁用/启用状态统一对齐设计交互规范。

## CHAPTER-04 UI 配对映射（设计稿）

### primary_design_source

1. stitch

### required_ui_assets

1. （无）

### optional_ui_assets

1. （无）

### design_pen_files

1. （无）

### figma_links

1. 对象类型列表主页：https://www.figma.com/design/81p03H82GOKQXEvBCUh4Ea/testDemo?node-id=28-1261&t=Ldxo9JC2ARz60n9V-1

### stitch_links

1. https://stitch.withgoogle.com/projects/11214155578152749288

### ui_analysis_output

1. docs/样式还原/object-type-list-UI分析清单.md

### ui_verification_output

1. docs/样式还原/object-type-list-UI问题清单.md

### mapping_rule

1. `primary_design_source=stitch`，优先使用 Stitch MCP 读取设计稿。
2. Stitch 节点为对象类型列表页，需获取截图与布局/节点信息。
3. 当前仓库无 `docs/ui/object-type-list*.png` 截图，若后续补充截图，文件名前缀必须与 `prd_slug` / `ui_prefix` 一致。
4. Agent 执行 `design-analysis` 时产出 UI 分析清单，再按清单进入开发与验收。

## CHAPTER-05 状态定义

### states

1. default：默认分页列表，展示对象类型数据。
2. loading：页面初次加载、刷新、搜索或分页切换中的加载状态。
3. empty：无对象类型数据。
4. search_empty：搜索无匹配结果。
5. error：列表数据加载失败。
6. no_permission：用户无新建权限或部分操作权限。
7. hover：表格行、按钮、操作入口悬浮态。
8. active：筛选项、分页项、按钮按下态。
9. disabled：搜索条件不合法、重复请求或无权限时的禁用态。

## CHAPTER-06 数据与接口要求

### data_fields

1. id
2. rid
3. icon
4. name
5. status
6. visibility
7. updatedAt
8. operatorPermissions
9. pageNo
10. pageSize
11. total
12. keyword

### api_contract

1. getObjectTypeList
2. searchObjectTypes
3. refreshObjectTypeList
4. getObjectTypeListPermissions

### mock_policy

1. 接口未完成允许 mock。
2. mock 数据必须覆盖默认列表、空列表、搜索无结果、加载失败、无新建权限。
3. 搜索 mock 需覆盖精确匹配、前缀匹配、模糊匹配与高亮展示。

## CHAPTER-07 验收标准

### functional_acceptance

1. 页面默认加载成功并展示分页对象类型数据。
2. 搜索框支持 ID、RID、名称检索。
3. 搜索输入符合 1-50 字符限制，不合法输入有明确提示或禁用反馈。
4. 搜索请求具备防抖处理。
5. 搜索结果按最后修改时间降序展示，并高亮命中关键字。
6. 搜索为空时恢复全量列表。
7. 刷新按钮可重新拉取最新列表数据。
8. 新建按钮可跳转对象类型创建页面。
9. 详情按钮可跳转对象类型详情页。
10. 加载中、无数据、搜索无结果状态展示正确。

### ui_acceptance

1. 页面符合 `docs/样式还原/object-type-list-UI分析清单.md`。
2. 表格字段、列顺序、按钮位置、分页区布局与设计稿一致。
3. 搜索框、刷新按钮、新建按钮的默认/hover/active/disabled 状态与设计稿一致。
4. 空状态、加载态、搜索无结果状态与设计稿一致。
5. 实现完成后执行 `ui-verification`，产出 `docs/样式还原/object-type-list-UI问题清单.md`。
6. P0（布局、层级、文字、图片）问题必须修复并再次用 Browser 或 Playwright 验证。

### quality_gates

1. TypeScript 零错误。
2. ESLint 通过。
3. 构建成功。
4. 搜索、防抖、分页、刷新和权限展示逻辑具备可验证用例或明确自测记录。

## CHAPTER-08 风险与兜底

### risks

1. Figma 设计稿不可访问或节点权限不足。
2. 当前仓库缺少 `docs/ui/object-type-list*.png` 截图。
3. 搜索接口与排序口径未最终确定。
4. 权限字段未就绪导致操作列展示不准确。
5. 对象类型状态、可见性枚举与后端不一致。

### fallback

1. Figma 不可访问时标记 `UI_PENDING`，并基于 PRD 文字与后续截图补充 UI 分析。
2. 接口未完成时使用 mock 数据，并标记替换点。
3. 权限接口未就绪时默认仅展示「详情」操作。
4. 枚举字段未稳定时在 model 中保留兼容类型并记录待替换项。

## CHAPTER-09 交付输出

### outputs

1. 页面实现代码。
2. OpenSpec proposal。
3. OpenSpec tasks。
4. OpenSpec spec。
5. UI 分析清单。
6. UI 问题清单。
