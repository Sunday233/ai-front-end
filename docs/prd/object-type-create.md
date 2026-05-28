# PRD_TEMPLATE: 对象类型创建页面

## CHAPTER-00 文档元信息

- prd_id: object-type-create
- prd_slug: object-type-create
- page_name: 对象类型创建页面
- template_version: 1.0.0
- ui_prefix: object-type-create
- pairing_rule: same-prefix
- owner: 产品经理姓名
- last_updated: 2026-05-20

## CHAPTER-01 页面目标与业务流程

### goal

1. 支持用户从 Matrix 工作台或对象类型列表页进入对象类型创建向导。
2. 通过分步流程完成数据源选择、元数据配置、属性配置、动作配置。
3. 创建完整对象类型及配套属性信息，满足业务自定义对象类型搭建需求。
4. 支持必填校验、格式校验、唯一性校验、主键修改确认与权限控制。
5. 为设计稿还原提供分步骤页面结构、交互状态与验收依据。

### business_flow

1. 用户在 Matrix 工作台或对象类型列表页点击「新建」进入对象类型创建向导。
2. 第一步选择数据源：新建数据集或选用已有数据集。
3. 用户完成数据源必填项后点击下一步。
4. 第二步配置对象类型元数据：图标、名称、英文名称、描述、对象组、对象类型 ID。
5. 元数据校验通过后进入属性配置。
6. 第三步新增并配置对象属性，设置标题键与主键规则。
7. 属性配置满足条件后进入动作配置。
8. 第四步按需配置对象动作类型和可执行用户/用户组。
9. 用户可跳过动作配置，直接点击完成提交创建。
10. 创建成功后自动返回对象类型列表页，并展示最新创建的数据。

## CHAPTER-02 功能范围边界

### in_scope

1. 对象类型创建入口承接。
2. 四步创建向导页面结构与步骤条展示。
3. 数据源选择与配置。
4. 对象类型元数据表单。
5. 属性新增、编辑、标题键、主键配置。
6. 动作类型选择与执行用户/用户组配置。
7. 上一步、下一步、完成、跳过等流程按钮。
8. 表单实时校验、唯一性校验、错误提示与按钮禁用。
9. 主键修改二次确认弹窗。
10. 创建成功后返回对象类型列表。

### out_of_scope

1. 对象组管理能力。
2. 数据集目录管理与存储平台管理。
3. 图标库后台维护。
4. 动作类型后台配置能力。
5. 权限系统扩展逻辑。
6. 已创建对象类型的详情、编辑、删除、发布流程。

## CHAPTER-03 页面结构与关键交互

### layout_sections

1. 页面外层容器：承载创建向导整体布局，需按设计稿还原背景、内容宽度、顶部留白与主容器层级。
2. 页面标题区：展示对象类型创建标题、返回入口或辅助说明（以设计稿为准）。
3. 步骤条区：展示选择数据源、元数据配置、属性配置、动作配置四个步骤。
4. 步骤 1 数据源区：展示新建数据集、已有数据集选项及名称、路径等配置字段。
5. 步骤 2 元数据表单区：展示对象类型图标、对象类型名称、英文名称、描述、所在对象组、对象类型 ID。
6. 步骤 3 属性配置区：展示属性列表、添加属性入口、属性类型、字段关联、标题键、主键配置。
7. 步骤 4 动作配置区：展示可选动作类型、动作权限用户/用户组配置与跳过提示。
8. 底部操作区：展示上一步、下一步、完成、跳过等按钮。
9. 弹窗区：主键修改确认弹窗、风险提示弹窗、选择器弹窗等。
10. 提示区：字段错误提示、唯一性冲突提示、创建成功或失败提示。

### key_interactions

1. 点击工作台或列表页「新建」后进入创建向导首页。
2. 步骤 1 选择新建数据集或已有数据集。
3. 新建数据集时填写数据集名称并选择合规平台存储路径。
4. 已有数据集时从目录内选择存量数据集，名称与路径只读。
5. 每一步所有必填项填写完整后才允许点击下一步。
6. 点击下一步时执行当前步骤字段格式校验与唯一性校验。
7. 点击上一步返回前一步，已填写数据保持不丢失。
8. 步骤 2 选择对象类型图标，并填写对象类型名称、英文名称、描述、对象组、对象类型 ID。
9. 步骤 3 新增至少 1 条属性，并配置属性名称、属性类型、字段关联。
10. 步骤 3 从已添加属性中单选标题键。
11. 步骤 3 从已添加属性中单选主键；修改主键时弹出确认弹窗。
12. 步骤 4 可选择创建、编辑、删除三类动作。
13. 选择动作后展示可执行操作的用户/用户组字段，支持配置多个用户/用户组。
14. 步骤 4 可跳过动作配置，直接点击完成提交创建。
15. 创建成功后返回对象类型列表页。

### interaction_rules

1. 全流程分步页面布局、表单样式、按钮排布、弹窗样式必须严格对齐 Figma 设计稿与截图。
2. 每一步所有必填项填写完整才可点击下一步，未填必填项时下一步按钮置灰禁用。
3. 字段格式校验需实时反馈，错误文案靠近对应字段展示。
4. 唯一性重名校验需给出明确冲突提示。
5. 支持上一步返回修改表单，返回后保留已填写内容。
6. 无智能体修改权限用户隐藏新建按钮，无法进入创建流程。
7. 对象类型 ID 手动修改时，若可能影响依赖，前端需要展示修改风险提示。
8. 修改主键时弹出确认弹窗，提示替换原有主键并要求二次确认。
9. 动作配置非必填，跳过动作配置不阻断创建提交。

### validation_rules

1. 新建数据集名称必填，项目目录下唯一。
2. 新建数据集名称仅支持字母、数字、下划线，首字符为字母，最长 128 字符。
3. 新建数据集必须选择合规平台存储路径。
4. 已有数据集仅支持目录内选择存量数据集，不可自定义编辑名称与路径。
5. 对象类型图标仅从系统预设图标库选择，由底色和预设图标组合生成。
6. 对象类型名称必填，组织空间内全局唯一，支持中英文、数字、短横线，最长 64 字符。
7. 英文名称必填，全局唯一，仅支持英文、数字、短横线，最长 64 字符。
8. 描述非必填，支持纯文本和标点，最大 256 字符。
9. 所在对象组为二期迭代实现，仅可选已存在分组，分组删除后自动归为未分组。
10. 对象类型 ID 系统默认生成，支持手动修改；仅支持小写字母、数字、短横线，首字符为小写字母。
11. 对象类型至少配置 1 条属性，无属性无法发布对象类型。
12. 属性名称在当前对象内唯一，支持中英文、数字、下划线，最长 64 字符。
13. 属性类型必填，默认 string，可选 string、int、float、boolean、datetime。
14. 新建数据集时字段关联可自定义字段名。
15. 已有数据集字段只读不可编辑。
16. 标题键从已添加属性中单选指定，作为对象默认展示名称。
17. 主键从已添加属性中单选指定。

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

1. 步骤1-选择数据源：https://www.figma.com/design/81p03H82GOKQXEvBCUh4Ea/testDemo?node-id=33-2990&t=Ldxo9JC2ARz60n9V-1
2. 步骤2-元数据配置：https://www.figma.com/design/81p03H82GOKQXEvBCUh4Ea/testDemo?node-id=33-2991&t=Ldxo9JC2ARz60n9V-1
3. 步骤3-属性配置：https://www.figma.com/design/81p03H82GOKQXEvBCUh4Ea/testDemo?node-id=33-2992&t=Ldxo9JC2ARz60n9V-1
4. 步骤4-动作配置：https://www.figma.com/design/81p03H82GOKQXEvBCUh4Ea/testDemo?node-id=33-2875&t=Ldxo9JC2ARz60n9V-1

### stitch_links

1. https://stitch.withgoogle.com/projects/11214155578152749288

### ui_analysis_output

1. docs/样式还原/object-type-create-UI分析清单.md

### ui_verification_output

1. docs/样式还原/object-type-create-UI问题清单.md

### mapping_rule

1. `primary_design_source=stitch`，优先读取 `required_ui_assets` 与 `optional_ui_assets`。
2. Stitch 节点为创建对象类型页，包含step1至step4，需获取截图与布局/节点信息。
3. 当前仓库无 `docs/ui/object-type-create*.png` 截图，若后续补充截图，文件名前缀必须与 `prd_slug` / `ui_prefix` 一致。
4. Agent 执行 `design-analysis` 时产出 UI 分析清单，再按清单进入开发与验收。

## CHAPTER-05 状态定义

### states

1. step1_default：步骤 1 选择数据源默认态。
2. step2_default：步骤 2 元数据配置默认态。
3. step3_default：步骤 3 属性配置默认态。
4. step4_default：步骤 4 动作配置默认态。
5. loading：页面进入、校验、提交创建中的加载状态。
6. validation_error：字段格式错误、必填缺失、唯一性冲突。
7. disabled_next：当前步骤未满足必填项时下一步按钮禁用。
8. confirm_primary_key：修改主键时展示二次确认弹窗。
9. submit_success：创建成功并准备返回列表页。
10. submit_error：创建失败并展示错误提示。
11. no_permission：用户无智能体修改权限，无法进入创建流程。

## CHAPTER-06 数据与接口要求

### data_fields

1. datasourceMode
2. datasetName
3. datasetPath
4. existingDatasetId
5. objectTypeIcon
6. objectTypeName
7. objectTypeEnglishName
8. description
9. objectGroupId
10. objectTypeId
11. attributes
12. attributeName
13. attributeType
14. fieldName
15. titleKey
16. primaryKey
17. actions
18. actionType
19. executableUsers
20. executableGroups

### api_contract

1. getObjectTypeCreatePermissions
2. getAvailableDatasets
3. validateDatasetName
4. validateObjectTypeName
5. validateObjectTypeEnglishName
6. validateObjectTypeId
7. createObjectType

### mock_policy

1. 接口未完成允许 mock。
2. mock 数据必须覆盖四个步骤默认态、校验失败态、提交成功态、提交失败态。
3. 唯一性校验接口未就绪时使用本地 mock 规则，并记录替换点。
4. 权限接口未就绪时默认隐藏创建入口，避免误开放创建能力。

## CHAPTER-07 验收标准

### functional_acceptance

1. 用户从工作台或对象类型列表页点击「新建」可进入创建向导。
2. 四步步骤条按顺序展示：选择数据源、元数据配置、属性配置、动作配置。
3. 每一步必填项未完成时下一步按钮禁用。
4. 步骤 1 支持新建数据集和已有数据集两种模式。
5. 新建数据集名称和路径规则校验正确。
6. 已有数据集模式下名称与路径只读。
7. 步骤 2 元数据字段格式、长度和唯一性校验正确。
8. 步骤 3 至少添加 1 条属性后才能继续。
9. 属性类型、字段关联、标题键、主键配置交互正确。
10. 修改主键时展示二次确认弹窗。
11. 步骤 4 可配置创建、编辑、删除动作及可执行用户/用户组。
12. 未配置动作时可跳过并完成创建。
13. 创建成功后返回对象类型列表，并展示最新创建数据。
14. 无智能体修改权限用户无法进入创建流程。

### ui_acceptance

1. 页面符合 `docs/样式还原/object-type-create-UI分析清单.md`。
2. 四步页面分别对应 `object-type-create-step1.png` 至 `object-type-create-step4.png`。
3. 步骤条、表单项、按钮排布、弹窗样式、错误提示位置与设计稿一致。
4. disabled、loading、validation_error、confirm_primary_key 等状态与设计稿一致。
5. 实现完成后执行 `ui-verification`，产出 `docs/样式还原/object-type-create-UI问题清单.md`。
6. P0（布局、层级、文字、图片）问题必须修复并再次用 Browser 或 Playwright 验证。

### quality_gates

1. TypeScript 零错误。
2. ESLint 通过。
3. 构建成功。
4. 分步表单、字段校验、主键确认、提交成功/失败逻辑具备可验证用例或明确自测记录。

## CHAPTER-08 风险与兜底

### risks

1. Figma 设计稿不可访问或节点权限不足。
2. 接口字段和唯一性校验口径变更。
3. 所在对象组为二期能力，当前实现可能需要占位或禁用。
4. 图标库、用户/用户组选择器资源未就绪。
5. 主键修改风险提示文案需产品确认。
6. 权限接口未就绪导致入口展示不准确。

### fallback

1. Figma 不可访问时以 `docs/ui` 截图为主完成 UI 分析，并标记需补充节点信息。
2. 接口未完成时使用 mock 数据，并记录替换点。
3. 二期对象组能力未就绪时展示禁用态或占位说明。
4. 图标库未就绪时按通用约束使用占位元素并标记 TODO。
5. 用户/用户组选择器未就绪时使用 mock 选择器并标记替换点。
6. 权限接口未就绪时默认隐藏创建入口，避免误开放创建能力。

## CHAPTER-09 交付输出

### outputs

1. 页面实现代码。
2. OpenSpec proposal。
3. OpenSpec tasks。
4. OpenSpec spec。
5. UI 分析清单。
6. UI 问题清单。
