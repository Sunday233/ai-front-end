# object-type-list 组件拆分清单

## 来源

- PRD：`docs/prd/object-type-list.md`
- UI 分析清单：`docs/样式还原/object-type-list-UI分析清单.md`
- 设计源：Stitch `projects/11214155578152749288`，本地截图 `docs/ui/对象类型列表页.png`
- 目标页面/路由：`/object-types`
- 现状说明：当前仓库没有 `src/` 业务代码目录，现有可复用项不可扫描；以下为本次 Vue 实现层的落地规划。

## 现有可复用项

| 名称 | 路径 | 复用方式 | 说明 |
|------|------|----------|------|
| `AppShell` | `src/layout/app-shell/index.vue` | 公共布局 | 与工作台、创建页共用左侧导航和工作区容器 |

## 页面组件拆分

| 组件 | 类型 | 建议路径 | 职责 | 复用判断 | 对应 UI 区块 |
|------|------|----------|------|----------|--------------|
| `ObjectTypeListPage` | 页面 | `src/views/object-type-list/index.vue` | 查询条件、分页、权限、路由跳转和页面状态 | 页面入口 | 整页 |
| `ObjectTypeListToolbar` | 页面级 | `src/views/object-type-list/components/object-type-list-toolbar/index.vue` | 搜索框、刷新、设置、创建按钮 | 页面专用 | 顶部操作区 |
| `ObjectTypeTable` | 页面级 | `src/views/object-type-list/components/object-type-table/index.vue` | 表格列、行、状态标签、详情操作 | 页面专用 | 表格区 |
| `ObjectTypeStatusTag` | 页面级候选复用 | `src/views/object-type-list/components/object-type-status-tag/index.vue` | 正常/草稿/可见标签样式 | 第二处真实使用后再抽公共 | 表格标签 |
| `ObjectTypePagination` | 页面级 | `src/views/object-type-list/components/object-type-pagination/index.vue` | 分页、每页条数、跳页 | 页面专用 | 分页区 |
| `ObjectTypeEmptyState` | 页面级 | `src/views/object-type-list/components/object-type-empty-state/index.vue` | 空列表/搜索无结果/错误态 | 页面专用 | 空状态区 |

## 关系型 UI 数据契约

| 区域/组件 | 行级数据模型 | 源侧字段 | 目标侧字段 | 状态/操作 | 验收关注点 |
|-----------|--------------|----------|------------|-----------|------------|
| `ObjectTypeTable` | `rows: ObjectTypeListItem[]` | `id`,`rid`,`icon`,`name`,`status`,`visibility`,`updatedAt`,`operatorPermissions` | 类型名称、状态、可见性、修改时间、操作 | 详情、权限隐藏 | 逐行名称、状态、可见性、时间、操作列一致 |
| `ObjectTypeListToolbar` | `queryState` | `keyword`,`canCreate`,`loading` | 搜索框、刷新按钮、创建按钮 | debounce/disabled/hidden | 搜索字数、按钮位置、禁用态一致 |
| `ObjectTypePagination` | `pagination` | `pageNo`,`pageSize`,`total` | 页码、总数、每页条数、跳页 | pageChange | `第1/4，共39条` 与页码一致 |

## 页面组件树

```text
ObjectTypeListPage
└── AppShell
    └── Content
        ├── Breadcrumb
        ├── Title
        ├── ObjectTypeListToolbar
        ├── ObjectTypeTable
        │   └── ObjectTypeStatusTag
        ├── ObjectTypeEmptyState
        └── ObjectTypePagination
```

## Apply 约束

- 实施必须读取 `docs/样式还原/object-type-list-UI分析清单.md`。
- 表格必须按 UI 分析清单行级映射实现，不得改变列顺序。
- 搜索、防抖、分页、刷新必须通过页面 service 发请求，不得在组件内写 mock 分支。
- 页面级组件默认放在 `src/views/object-type-list/components/`。
- 当前仓库无前端应用；本次 apply 需要先创建 Vue 3 + Vite + TypeScript 基础工程。
