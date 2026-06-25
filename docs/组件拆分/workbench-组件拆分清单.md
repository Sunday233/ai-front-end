# workbench 组件拆分清单

## 来源

- PRD：`docs/prd/workbench.md`
- UI 分析清单：`docs/样式还原/workbench-UI分析清单.md`
- 设计源：Stitch `projects/11214155578152749288`，本地截图 `docs/ui/工作台*.png`
- 目标页面/路由：`/workbench`
- 现状说明：当前仓库没有 `src/` 业务代码目录，现有可复用项不可扫描；以下为目标 Vue 工程中的落地建议。

## 现有可复用项

| 名称 | 路径 | 复用方式 | 说明 |
|------|------|----------|------|
| 无 | - | - | 当前仓库无业务代码，无法扫描已有组件 |

## 页面组件拆分

| 组件 | 类型 | 建议路径 | 职责 | 复用判断 | 对应 UI 区块 |
|------|------|----------|------|----------|--------------|
| `WorkbenchPage` | 页面 | `src/views/workbench/index.vue` | 组织页面数据、权限、搜索、新建下拉状态 | 页面入口 | 整页 |
| `WorkbenchSidebar` | 页面级候选复用 | `src/views/workbench/components/workbench-sidebar/index.vue` | 左侧品牌、菜单、资源数量、底部保存区 | 首次落地先页面级；第二处真实复用后再抽公共/布局 | 左侧固定导航 |
| `WorkbenchHeader` | 页面级 | `src/views/workbench/components/workbench-header/index.vue` | 面包屑、搜索框、新建按钮、下拉菜单 | 页面专用 | 顶部操作区 |
| `CreateResourceMenu` | 页面级候选复用 | `src/views/workbench/components/create-resource-menu/index.vue` | 新建对象类型/链接/动作/对象类型组选项 | 可被列表页复用时再抽公共 | 新建下拉菜单 |
| `ObjectTypeSection` | 页面级 | `src/views/workbench/components/object-type-section/index.vue` | 最近浏览、收藏对象类型分区 | 页面专用 | 卡片分组 |
| `ObjectTypeCard` | 页面级候选复用 | `src/views/workbench/components/object-type-card/index.vue` | 对象类型卡片渲染、星标、标签、更多操作 | 列表页若卡片化再抽公共 | 单张对象类型卡片 |

## 关系型 UI 数据契约

| 区域/组件 | 行级数据模型 | 源侧字段 | 目标侧字段 | 状态/操作 | 验收关注点 |
|-----------|--------------|----------|------------|-----------|------------|
| `WorkbenchSidebar` | `resourceMenus[]` | `resourceType`,`resourceCount`,`permissionCode` | 菜单文案、数量标签、路由 | active/hover/hidden | 菜单顺序、数量、选中态一致 |
| `CreateResourceMenu` | `createOptions[]` | `canCreateObjectType`,`canCreateLink`,`canCreateAction` | 选项标题、描述、跳转路由 | hidden/click | 选项顺序、权限隐藏、弹出位置一致 |
| `ObjectTypeSection` | `objectTypeCards[]` | `id`,`name`,`instanceCount`,`tags`,`favorite` | 卡片标题、指标、标签、星标 | favorite/more | 卡片列数、标签行和更多按钮一致 |

## 页面组件树

```text
WorkbenchPage
├── WorkbenchSidebar
└── MainArea
    ├── WorkbenchHeader
    │   └── CreateResourceMenu
    ├── ObjectTypeSection(recent)
    │   └── ObjectTypeCard[]
    └── ObjectTypeSection(favorite)
        └── ObjectTypeCard[]
```

## Apply 约束

- 实施必须读取 `docs/样式还原/workbench-UI分析清单.md`。
- 页面级组件默认放在 `src/views/workbench/components/`。
- `WorkbenchSidebar`、`ObjectTypeCard`、`CreateResourceMenu` 只有第二处真实使用后才抽到公共目录。
- 权限隐藏逻辑必须通过数据驱动，不得用 CSS 仅隐藏占位。
- 当前仓库无前端应用；若在本仓库继续 apply，需要先创建 Vue 3 + Vite + TypeScript 基础工程。

