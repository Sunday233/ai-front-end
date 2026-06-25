# object-type-create 组件拆分清单

## 来源

- PRD：`docs/prd/object-type-create.md`
- UI 分析清单：`docs/样式还原/object-type-create-UI分析清单.md`
- 设计源：Stitch `projects/11214155578152749288`，本地截图 `docs/ui/创建对象类型*.png`
- 目标页面/路由：`/object-types/create`
- 现状说明：当前仓库没有 `src/` 业务代码目录，现有可复用项不可扫描；以下为目标 Vue 工程中的落地建议。

## 现有可复用项

| 名称 | 路径 | 复用方式 | 说明 |
|------|------|----------|------|
| 无 | - | - | 当前仓库无业务代码，无法扫描已有组件 |

## 页面组件拆分

| 组件 | 类型 | 建议路径 | 职责 | 复用判断 | 对应 UI 区块 |
|------|------|----------|------|----------|--------------|
| `ObjectTypeCreatePage` | 页面 | `src/views/object-type-create/index.vue` | 四步状态、表单数据、校验、提交、路由返回 | 页面入口 | 整页 |
| `CreateStepHeader` | 页面级 | `src/views/object-type-create/components/create-step-header/index.vue` | 四步步骤条展示 | 页面专用 | 步骤条面板 |
| `DatasourceStep` | 页面级 | `src/views/object-type-create/components/datasource-step/index.vue` | 数据源模式、已选数据集、选择入口 | 页面专用 | 步骤 1 |
| `DatasetSelectModal` | 页面级候选复用 | `src/views/object-type-create/components/dataset-select-modal/index.vue` | 数据集搜索、列表、详情 tab、选择 | 后续多处选择数据集时再抽公共 | 数据集弹窗 |
| `MetadataStep` | 页面级 | `src/views/object-type-create/components/metadata-step/index.vue` | 图标、显示名称、同义词、ID、描述、对象组 | 页面专用 | 步骤 2 |
| `ObjectGroupSelect` | 页面级候选复用 | `src/views/object-type-create/components/object-group-select/index.vue` | 对象组下拉、选择后展示 | 第二处真实使用后再抽公共 | 对象组选择 |
| `AttributeStep` | 页面级 | `src/views/object-type-create/components/attribute-step/index.vue` | 主键、标题键、字段到属性映射、添加/删除属性 | 页面专用 | 步骤 3 |
| `AttributeMappingRow` | 页面级 | `src/views/object-type-create/components/attribute-mapping-row/index.vue` | 单行源字段和目标属性渲染 | 页面专用 | 字段映射行 |
| `ActionStep` | 页面级 | `src/views/object-type-create/components/action-step/index.vue` | 动作类型选择、用户/用户组配置 | 页面专用 | 步骤 4 |
| `PrimaryKeyConfirmModal` | 页面级 | `src/views/object-type-create/components/primary-key-confirm-modal/index.vue` | 主键修改二次确认 | 页面专用 | 主键确认弹窗 |
| `WizardFooter` | 页面级 | `src/views/object-type-create/components/wizard-footer/index.vue` | 上一步、下一步、完成、跳过按钮 | 页面专用 | 底部操作区 |

## 关系型 UI 数据契约

| 区域/组件 | 行级数据模型 | 源侧字段 | 目标侧字段 | 状态/操作 | 验收关注点 |
|-----------|--------------|----------|------------|-----------|------------|
| `DatasetSelectModal` | `datasetRows[]` | `datasetId`,`name`,`path`,`sourceType`,`tableType` | 左侧数据集列表、标签、右侧详情 | selected/search/page | 列表顺序、选中态、tab 内容一致 |
| `DatasetSelectModal` | `datasetColumns[]` | `fieldName`,`fieldType`,`displayName` | 列信息 tab | readonly | `emp_no`,`birth_date`,`first_name`,`last_name`,`gender`,`hight` 顺序一致 |
| `AttributeStep` | `mappingRows[]` | 数据集字段、类型、主键 | 属性类型控件、属性名、字数、主键标签 | delete/disabled/confirm | 不得拆成无对应关系的左右列表；逐行顺序和对齐必须一致 |
| `ActionStep` | `actionRows[]` | `actionType`,`relatedFields` | 动作卡片标题、描述、选中态 | checkbox/selected | 选中动作后展示用户/用户组配置 |
| `ActionStep` | `executorRows[]` | `executableUsers`,`executableGroups` | 多选 tag 与下拉选项 | selected/remove | `chenzhenq5`、`chenzhenq8` 多选展示一致 |

## 页面组件树

```text
ObjectTypeCreatePage
├── WorkbenchSidebar(候选复用，首次可页面级)
├── Breadcrumb
├── CreateStepHeader
├── StepContent
│   ├── DatasourceStep
│   │   └── DatasetSelectModal
│   ├── MetadataStep
│   │   └── ObjectGroupSelect
│   ├── AttributeStep
│   │   └── AttributeMappingRow[]
│   └── ActionStep
└── WizardFooter
    └── PrimaryKeyConfirmModal
```

## Apply 约束

- 实施必须读取 `docs/样式还原/object-type-create-UI分析清单.md`。
- 第 3 步必须以 `mappingRows[]` 承接字段到属性的一一映射，逐行渲染和验收。
- 第 4 步动作和用户权限也必须用行级数据契约，不得把动作选择和权限选择写成无关联状态。
- 页面级组件默认放在 `src/views/object-type-create/components/`。
- 接口未就绪时，页面仍通过 service 调 `httpClient`，mock 只能在请求层拦截。
- 当前仓库无前端应用；若在本仓库继续 apply，需要先创建 Vue 3 + Vite + TypeScript 基础工程。

