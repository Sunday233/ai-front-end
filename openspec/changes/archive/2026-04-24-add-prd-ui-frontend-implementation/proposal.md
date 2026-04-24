# Change: 基于 PRD + UI 交付对象管理前端页面

## Why

当前仓库已提供 `docs/prd` 与 `docs/ui` 资产，但缺少可运行的业务前端代码。需要将三份 PRD（工作台、对象类型列表、对象类型创建）与六张 UI 截图落地为 Vue 3 + TypeScript 页面，实现从需求资产到可运行页面的闭环。

## What Changes

- 新建前端运行骨架（Vite + Vue + TypeScript + Router + Pinia + Ant Design Vue）。
- 按 PRD 与 UI 落地 3 个页面：
  - 工作台页面
  - 对象类型列表页面
  - 对象类型创建页面（4 步流程）
- 新增 mock 服务与类型定义，支撑列表、步骤页和交互演示。
- 新增 UI 分析清单与验收问题清单文档，形成设计到验收的可追溯链路。
- 通过质量门禁：TypeScript、ESLint、构建。

## Impact

- Affected specs: prd-ui-frontend
- Affected code:
  - 前端源码目录（src）及构建配置
  - docs/样式还原 分析与验收文档
  - OpenSpec 变更资产（proposal/tasks/spec/design）
