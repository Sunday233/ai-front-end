# Tasks

## 1. 准备与设计分析

- [x] 1.1 读取 `docs/prd/workbench.md`、`docs/prd/object-type-list.md`、`docs/prd/object-type-create.md`。
- [x] 1.2 读取 `.agents/rules/12-自动化执行规范.instructions.md` 与 `.agents/skills/implement-from-prd-ui/SKILL.md`。
- [x] 1.3 使用 Stitch MCP 读取项目 `11214155578152749288`，确认工作台、对象类型列表、对象类型创建相关 screens。
- [x] 1.4 读取本地 `docs/ui` 截图作为兜底证据。
- [x] 1.5 产出 `docs/样式还原/workbench-UI分析清单.md`。
- [x] 1.6 产出 `docs/样式还原/object-type-list-UI分析清单.md`。
- [x] 1.7 产出 `docs/样式还原/object-type-create-UI分析清单.md`。

## 2. 组件拆分规划

- [x] 2.1 按组件拆分清单实施，读取 `docs/样式还原/workbench-UI分析清单.md` 并产出 `docs/组件拆分/workbench-组件拆分清单.md`。
- [x] 2.2 按组件拆分清单实施，读取 `docs/样式还原/object-type-list-UI分析清单.md` 并产出 `docs/组件拆分/object-type-list-组件拆分清单.md`。
- [x] 2.3 按组件拆分清单实施，读取 `docs/样式还原/object-type-create-UI分析清单.md` 并产出 `docs/组件拆分/object-type-create-组件拆分清单.md`。
- [x] 2.4 在组件拆分清单中区分页面级组件、候选复用项、现有可复用项。
- [x] 2.5 对表格、数据集弹窗、属性映射、动作权限配置写明行级数据契约。

## 3. API 契约与文档

- [x] 3.1 从三份 PRD `CHAPTER-06 数据与接口要求` 提取 `data_fields`、`api_contract`、`mock_policy`。
- [x] 3.2 使用 `api-doc-summary` 产出 `docs/api/接口汇总.md`。
- [x] 3.3 将 method/path 标记为 `待后端确认`，不自行创造真实接口路径。
- [x] 3.4 记录目标实现需要 `src/services/client.ts`、页面级 service、页面级 mock、类型定义与 mock 注册入口。

## 4. OpenSpec 资产

- [x] 4.1 创建 change-id `add-matrix-object-type-pages`。
- [x] 4.2 创建 `proposal.md`。
- [x] 4.3 创建设计文档 `design.md`，引用三份组件拆分清单。
- [x] 4.4 创建 `tasks.md`，写明依据 UI 分析清单和组件拆分清单实施。
- [x] 4.5 创建 `specs/frontend-delivery/spec.md`。
- [x] 4.6 执行 `openspec validate add-matrix-object-type-pages --strict` 并修复问题。

## 5. 目标 Vue 工程 Apply（当前仓库无 `src/`，需迁移或初始化后执行）

- [x] 5.1 读取 `.agents/rules/03-项目结构.instructions.md`、`04-组件规范.instructions.md`、`05-API规范.instructions.md`、`06-路由规范.instructions.md`、`08-通用约束.instructions.md`、`09-样式规范.instructions.md`、`11-测试规范.instructions.md`。
- [x] 5.2 使用 `create-route` 创建 `/workbench`、`/object-types`、`/object-types/create` 路由。
- [x] 5.3 使用 `create-component` 按三份组件拆分清单创建页面级组件。
- [x] 5.4 使用 `theme-variables` 按 UI 分析清单还原颜色、字体、间距、圆角、状态。
- [x] 5.5 使用 `create-api` 创建 `src/services/client.ts`、`src/services/mock.ts`、`src/types/api-doc.ts`。
- [x] 5.6 为 `workbench`、`object-type-list`、`object-type-create` 创建页面级 service、mock、types。
- [x] 5.7 工作台实现左侧导航、搜索、新建下拉、最近浏览与收藏对象类型卡片。
- [x] 5.8 对象类型列表实现搜索、防抖、刷新、分页、权限隐藏、详情跳转和表格状态。
- [x] 5.9 对象类型创建实现四步向导、数据集弹窗、元数据表单、属性映射、动作权限配置、校验和提交。
- [x] 5.10 对关系型 UI 按 UI 分析清单逐行实现映射关系，不得用无对应关系的并列列表替代。
- [x] 5.11 更新 `docs/api/接口汇总.md`，用 service 导出的 `ApiDocEntry` 元数据替换当前 PRD 规划状态。

## 6. 质量门禁与 UI 验收（目标 Vue 工程可运行后执行）

- [x] 6.1 执行 TypeScript 类型检查。
- [x] 6.2 执行 lint / Biome 检查。
- [x] 6.3 执行测试或记录自测覆盖。
- [x] 6.4 执行构建。
- [x] 6.5 使用 `ui-verification`，优先通过 Browser 打开实现页并产出 `docs/样式还原/workbench-UI问题清单.md`。
- [x] 6.6 使用 `ui-verification`，优先通过 Browser 打开实现页并产出 `docs/样式还原/object-type-list-UI问题清单.md`。
- [x] 6.7 使用 `ui-verification`，优先通过 Browser 打开实现页并产出 `docs/样式还原/object-type-create-UI问题清单.md`。
- [x] 6.8 修复 P0/P1/P2 问题后再次用 Browser 或 Playwright 回归。
