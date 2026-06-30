# object-type-list 组件拆分清单

## 来源

- PRD：`docs/prd/object-type-list.md`
- UI 分析清单：`docs/样式还原/object-type-list-UI分析清单.md`
- UI 证据索引：对象类型列表默认态
- 设计源：Stitch `projects/11214155578152749288`
- 目标页面/路由：`/object-types`

## 现有可复用项

| 名称 | 路径 | 复用方式 | 说明 |
|------|------|----------|------|
| AppShell | `src/layout/app-shell/index.vue` | 全局布局 | 统一左侧导航与内容背景 |

## 页面组件拆分

| 组件 | 类型 | 建议路径 | 职责 | 复用判断 | 对应 UI 区块 |
|------|------|----------|------|----------|--------------|
| ObjectTypeListToolbar | 页面级 | `src/views/object-type-list/components/object-type-list-toolbar/index.vue` | 搜索、刷新、设置、创建按钮 | 仅列表页使用 | 顶部操作区 |
| ObjectTypeTable | 页面级 | `src/views/object-type-list/components/object-type-table/index.vue` | 表格行、状态标签、分页 | 仅列表页使用 | 表格与分页 |

## 关系型 UI 数据契约

| 区域/组件 | 行级数据模型 | 源侧字段 | 目标侧字段 | 状态/操作 | 验收关注点 |
|-----------|--------------|----------|------------|-----------|------------|
| ObjectTypeTable | `ObjectTypeListItem[]` | id、rid、name、status、visibility、updatedAt | 类型名称、状态、可见性、修改时间、操作 | 详情 | 逐行名称、状态标签、时间、操作列一致 |

## 页面组件树

```text
AppShell
  ObjectTypeListPage
    ObjectTypeListToolbar
    ObjectTypeTable
```

## Apply 约束

- 搜索、分页和刷新逻辑保留在页面主文件。
- 表格组件只接收 `rows` 和分页数据，不直接写 mock 分支。
