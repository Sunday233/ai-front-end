# object-type-create 组件拆分清单

## 来源

- PRD：`docs/prd/object-type-create.md`
- UI 分析清单：`docs/样式还原/object-type-create-UI分析清单.md`
- UI 证据索引：step1-step4 默认态
- 设计源：Stitch `projects/11214155578152749288`
- 目标页面/路由：`/object-types/create`

## 现有可复用项

| 名称 | 路径 | 复用方式 | 说明 |
|------|------|----------|------|
| AppShell | `src/layout/app-shell/index.vue` | 全局布局 | 统一导航和内容背景 |

## 页面组件拆分

| 组件 | 类型 | 建议路径 | 职责 | 复用判断 | 对应 UI 区块 |
|------|------|----------|------|----------|--------------|
| CreateStepHeader | 页面级 | `src/views/object-type-create/components/create-step-header/index.vue` | 四步步骤条 | 仅创建页使用 | 步骤条区 |
| DatasourceStep | 页面级 | `src/views/object-type-create/components/datasource-step/index.vue` | 数据源选择 | 仅创建页使用 | step1 |
| MetadataStep | 页面级 | `src/views/object-type-create/components/metadata-step/index.vue` | 元数据表单 | 仅创建页使用 | step2 |
| AttributeStep | 页面级 | `src/views/object-type-create/components/attribute-step/index.vue` | 字段到属性映射 | 仅创建页使用 | step3 |
| ActionStep | 页面级 | `src/views/object-type-create/components/action-step/index.vue` | 动作选择 | 仅创建页使用 | step4 |

## 关系型 UI 数据契约

| 区域/组件 | 行级数据模型 | 源侧字段 | 目标侧字段 | 状态/操作 | 验收关注点 |
|-----------|--------------|----------|------------|-----------|------------|
| AttributeStep | `AttributeMappingRow[]` | 数据集字段、类型、主键 | 属性类型、属性名、计数 | 删除、主键标签 | 左右逐行对应，不能用两个无关联数组 |
| ActionStep | `ActionOption[]` | 动作类型 | 动作名称、说明 | checkbox | 三个动作顺序与文案一致 |

## 页面组件树

```text
AppShell
  ObjectTypeCreatePage
    CreateStepHeader
    DatasourceStep
    MetadataStep
    AttributeStep
    ActionStep
```

## Apply 约束

- 页面主文件维护当前 step、表单状态和提交逻辑。
- `AttributeStep` 必须使用 `mappingRows[]` 行级模型。
- 主键修改需弹出确认弹窗，不得只修改状态无提示。
