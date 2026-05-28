# PRD_TEMPLATE: Matrix 智能体工作台

## CHAPTER-00 文档元信息

- prd_id: workbench
- prd_slug: workbench
- page_name: Matrix 智能体工作台
- template_version: 1.0.0
- ui_prefix: workbench
- pairing_rule: same-prefix
- owner: 产品经理姓名
- last_updated: 2026-05-20

## CHAPTER-01 页面目标与业务流程

### goal

1. 展示当前空间内智能体的全部对象类型与相关资源入口。
2. 支持名称模糊检索，快速定位智能体内对象类型。
3. 提供对象类型、链接、动作等资源列表的快捷跳转。
4. 提供智能体属性配置、权限管控、内部数据编辑与数据清理入口。
5. 支持具备权限的用户从工作台发起新建对象类型、链接、动作流程。

### business_flow

1. 用户进入 Matrix 智能体工作台页面。
2. 页面加载当前空间、智能体名称、资源统计与左侧全局导航菜单。
3. 用户查看顶部快捷入口，切换工作台、智能体探索、分支管理、操作日志。
4. 用户在资源区查看对象类型、共享属性、链接类型、动作类型、动作类型组及对应统计数量。
5. 用户点击资源菜单项，跳转至对应资源列表页面。
6. 具备管理权限的用户查看并进入智能体管理、数据清理页面。
7. 具备新建权限的用户点击顶部「新建」，选择对象类型、链接或动作后进入对应创建流程。
8. 用户可通过全局名称模糊搜索快速筛选智能体内对象类型。

## CHAPTER-02 功能范围边界

### in_scope

1. 工作台首页整体布局与左侧导航菜单展示。
2. 当前空间与智能体名称展示。
3. 工作台、智能体探索、分支管理、操作日志快捷入口。
4. 对象类型、共享属性、链接类型、动作类型、动作类型组资源入口与统计数量展示。
5. 智能体管理、数据清理入口的权限展示控制。
6. 顶部「新建」按钮及对象类型、链接、动作下拉创建入口。
7. 全局名称模糊搜索对象类型。
8. 菜单选中、hover、高亮、跳转加载、权限隐藏等交互状态。

### out_of_scope

1. 资源列表页内部复杂管理能力。
2. 智能体探索、分支管理、操作日志的页面内部实现。
3. 智能体管理、数据清理页面的完整业务逻辑。
4. 新建对象类型、链接、动作的表单详情流程。
5. 后端权限系统扩展与权限配置后台。

## CHAPTER-03 页面结构与关键交互

### layout_sections

1. 页面外层容器：承载工作台整体布局，需按设计稿还原背景、留白、主区域宽高与响应关系。
2. 顶部智能体信息区：展示当前所属空间、智能体名称与快捷导航入口。
3. 左侧导航菜单顶部区：展示智能体名称及工作台、智能体探索、分支管理、操作日志入口。
4. 左侧导航菜单资源区：展示对象类型、共享属性、链接类型、动作类型、动作类型组，格式为「资源名称 + 统计数量」。
5. 左侧导航菜单管理区：展示智能体管理、数据清理入口，仅有权限用户可见。
6. 主内容标题区：展示工作台页面标题、搜索入口与顶部「新建」按钮。
7. 主内容资源区：展示对象类型等资源卡片或列表入口，严格参照设计稿中的文字、数量、图标与层级。
8. 新建下拉菜单：点击「新建」后展示对象类型、链接、动作创建选项。

### key_interactions

1. 页面进入后自动加载左侧全局导航菜单与当前智能体资源统计。
2. 点击顶部快捷入口跳转至对应页面，并显示当前菜单选中状态。
3. 点击资源菜单项直接路由跳转至对应资源列表页面。
4. 点击「新建」按钮弹出下拉菜单。
5. 点击「对象类型」跳转对象类型创建页面。
6. 点击「链接」跳转链接创建页面。
7. 点击「动作」跳转动作创建页面。
8. 在全局搜索框输入名称关键字后，对智能体内对象类型进行模糊筛选。
9. 页面跳转时展示加载态或保持设计稿约定的跳转反馈。

### interaction_rules

1. 页面布局、菜单层级、文字样式、数量角标样式必须严格参照 Figma 设计稿还原。
2. 顶部区包含智能体名称与快捷入口：工作台、智能体探索、分支管理、操作日志。
3. 资源区菜单项格式统一为「资源名称 + 统计数量」。
4. 管理区仅对具备管理权限的用户展示，包含智能体管理、数据清理入口。
5. 统计数量为当前智能体下全状态资源总量，草稿、已发布、废弃均计入。
6. 已通过数据清理彻底删除的数据资源不参与数量统计。
7. 新建下拉菜单仅展示当前登录用户具备新建权限的资源选项。
8. 无新建权限用户隐藏全局「新建」按钮，无法触发新建操作。
9. 菜单选中状态、hover 高亮、权限隐藏显示逻辑统一遵循设计稿交互规范。

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

1. 工作台整体首页：https://www.figma.com/design/81p03H82GOKQXEvBCUh4Ea/testDemo?node-id=0-1&t=Ldxo9JC2ARz60n9V-1

### stitch_links

1. https://stitch.withgoogle.com/projects/11214155578152749288

### ui_analysis_output

1. docs/样式还原/workbench-UI分析清单.md

### ui_verification_output

1. docs/样式还原/workbench-UI问题清单.md

### mapping_rule

1. `primary_design_source=stitch`，优先使用 Stitch MCP 读取设计稿。
2. Stitch 节点为工作台整体首页，需获取截图与布局/节点信息。
3. 当前仓库无 `docs/ui/workbench*.png` 截图，若后续补充截图，文件名前缀必须与 `prd_slug` / `ui_prefix` 一致。
4. Agent 执行 `design-analysis` 时产出 UI 分析清单，再按清单进入开发与验收。

## CHAPTER-05 状态定义

### states

1. default：默认工作台首页，展示菜单、资源统计、搜索与新建入口。
2. loading：进入页面、切换菜单或执行搜索时的数据加载状态。
3. empty：当前智能体无对象类型或搜索无匹配结果。
4. no_permission：用户无管理或新建权限时隐藏对应入口。
5. dropdown_open：点击「新建」后展示创建类型下拉菜单。
6. hover：菜单项、资源入口、新建按钮、下拉选项悬浮态。
7. active：当前菜单或快捷入口选中态。
8. error：资源统计或菜单加载失败状态。

## CHAPTER-06 数据与接口要求

### data_fields

1. workspaceId
2. workspaceName
3. agentId
4. agentName
5. resourceType
6. resourceName
7. resourceCount
8. menuKey
9. menuName
10. routePath
11. permissionCode
12. canCreateObjectType
13. canCreateLink
14. canCreateAction
15. canManageAgent

### api_contract

1. getWorkbenchSummary
2. getWorkbenchMenus
3. searchWorkbenchObjectTypes
4. getWorkbenchCreatePermissions

### mock_policy

1. 接口未完成允许 mock。
2. mock 数据必须覆盖默认态、空态、无权限态、加载失败态。
3. 权限字段需明确标记替换点，便于后续接入真实权限系统。

## CHAPTER-07 验收标准

### functional_acceptance

1. 页面进入后正确展示当前空间、智能体名称、左侧菜单与资源统计。
2. 资源菜单项展示对象类型、共享属性、链接类型、动作类型、动作类型组及数量。
3. 点击资源菜单项可跳转对应资源列表页。
4. 点击顶部快捷入口可跳转工作台、智能体探索、分支管理、操作日志。
5. 具备管理权限时展示智能体管理、数据清理入口；无权限时隐藏。
6. 具备新建权限时展示「新建」按钮，点击后出现对象类型、链接、动作选项。
7. 无新建权限时隐藏「新建」按钮。
8. 搜索框支持按对象类型名称模糊检索。

### ui_acceptance

1. 页面符合 `docs/样式还原/workbench-UI分析清单.md`。
2. 左侧导航菜单层级、数量角标、选中态、hover 态与设计稿一致。
3. 顶部区、资源区、管理区的位置、间距、文字、图标、颜色与设计稿一致。
4. 新建下拉菜单的位置、选项顺序、权限隐藏逻辑与设计稿一致。
5. 实现完成后执行 `ui-verification`，产出 `docs/样式还原/workbench-UI问题清单.md`。
6. P0（布局、层级、文字、图片）问题必须修复并再次用 Browser 或 Playwright 验证。

### quality_gates

1. TypeScript 零错误。
2. ESLint 通过。
3. 构建成功。
4. 权限隐藏逻辑和路由跳转逻辑具备可验证用例或明确自测记录。

## CHAPTER-08 风险与兜底

### risks

1. Figma 设计稿不可访问或节点权限不足。
2. 当前仓库缺少 `docs/ui/workbench*.png` 截图。
3. 资源统计口径与后端接口口径不一致。
4. 权限字段未就绪导致新建入口或管理入口展示不准确。
5. 菜单跳转目标路由未全部实现。

### fallback

1. Figma 不可访问时标记 `UI_PENDING`，并基于 PRD 文字与后续截图补充 UI 分析。
2. 接口未就绪时使用 mock 数据，并标记替换点。
3. 权限接口未就绪时默认按最小权限展示，避免误展示管理入口。
4. 未实现的跳转目标使用占位路由或禁用态，并在 tasks 中记录后续补齐项。

## CHAPTER-09 交付输出

### outputs

1. 页面实现代码。
2. OpenSpec proposal。
3. OpenSpec tasks。
4. OpenSpec spec。
5. UI 分析清单。
6. UI 问题清单。
