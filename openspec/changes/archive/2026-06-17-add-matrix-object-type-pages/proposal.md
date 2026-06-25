# Change: 实现 Matrix 工作台与对象类型页面

## Why

`docs/prd` 中已定义 Matrix 智能体工作台、对象类型列表、对象类型创建三页，且 Stitch 与 `docs/ui` 已提供设计依据。需要将 PRD、UI 分析、组件拆分、接口契约和后续实现任务收敛成可验证的 OpenSpec change。

## What Changes

- 新增工作台页面、对象类型列表页面、对象类型创建向导的前端交付规格。
- 以 Stitch 为主设计源、本地截图为兜底证据，产出 UI 分析清单。
- 为三页产出组件拆分清单，明确页面级组件、候选复用项和关系型 UI 数据契约。
- 规划页面级 service、mock、类型定义与 API 文档汇总。
- 明确当前仓库无 `src/` 可运行应用，因此真实 Vue 代码实施前需先初始化目标前端工程或迁移到业务仓库。

## Impact

- Affected specs: `frontend-delivery`
- Affected docs:
  - `docs/样式还原/workbench-UI分析清单.md`
  - `docs/样式还原/object-type-list-UI分析清单.md`
  - `docs/样式还原/object-type-create-UI分析清单.md`
  - `docs/组件拆分/workbench-组件拆分清单.md`
  - `docs/组件拆分/object-type-list-组件拆分清单.md`
  - `docs/组件拆分/object-type-create-组件拆分清单.md`
  - `docs/api/接口汇总.md`
- Affected target code in downstream Vue project:
  - `src/views/workbench/`
  - `src/views/object-type-list/`
  - `src/views/object-type-create/`
  - `src/router/index.ts`
  - `src/services/client.ts`
  - `src/services/workbench.ts`
  - `src/services/object-type-list.ts`
  - `src/services/object-type-create.ts`
  - `src/services/*.mock.ts`
  - `src/types/<page-slug>/`

