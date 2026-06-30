# workbench 组件拆分清单

## 来源

- PRD：`docs/prd/workbench.md`
- UI 分析清单：`docs/样式还原/workbench-UI分析清单.md`
- UI 证据索引：工作台默认态、新建菜单展开态
- 设计源：Stitch `projects/11214155578152749288`
- 目标页面/路由：`/workbench`

## 现有可复用项

| 名称 | 路径 | 复用方式 | 说明 |
|------|------|----------|------|
| AppShell | `src/layout/app-shell/index.vue` | 全局布局 | 左侧导航、底部操作和右侧内容框架 |

## 页面组件拆分

| 组件 | 类型 | 建议路径 | 职责 | 复用判断 | 对应 UI 区块 |
|------|------|----------|------|----------|--------------|
| WorkbenchHeader | 页面级 | `src/views/workbench/components/workbench-header/index.vue` | 面包屑、搜索、新建按钮 | 仅工作台使用 | 顶部工具区 |
| CreateResourceMenu | 页面级 | `src/views/workbench/components/create-resource-menu/index.vue` | 新建菜单选项 | 仅工作台使用 | dropdown_open |
| ObjectTypeCard | 页面级 | `src/views/workbench/components/object-type-card/index.vue` | 对象类型卡片 | 工作台卡片专用 | 最近/收藏对象类型 |

## 关系型 UI 数据契约

| 区域/组件 | 行级数据模型 | 源侧字段 | 目标侧字段 | 状态/操作 | 验收关注点 |
|-----------|--------------|----------|------------|-----------|------------|
| ObjectTypeCard | `WorkbenchObjectTypeCard[]` | 对象类型、对象组标签 | 卡片标题、实例数、应用次数 | 收藏、更多 | 名称、数量、底部标签顺序一致 |

## 页面组件树

```text
AppShell
  WorkbenchPage
    WorkbenchHeader
      CreateResourceMenu
    ObjectTypeCard[]
```

## Apply 约束

- 页面主文件只组织数据加载、搜索和路由跳转。
- 卡片数据必须使用行级 `cards[]`，不得把底部对象组拆成无对应关系数组。
