## 1. 输入与配对

- [x] 1.1 扫描 `docs/prd` 与 `docs/ui` 输入资产
- [x] 1.2 生成配对映射：workbench / object-type-list / object-type-create(step1-4)
- [x] 1.3 输出 UI 分析清单文档

## 2. Proposal（需求 / 变更收敛）

- [x] 2.1 创建 change：`add-prd-ui-frontend-implementation`
- [x] 2.2 编写 `proposal.md`
- [x] 2.3 编写 `design.md`
- [x] 2.4 编写 `spec delta`
- [x] 2.5 执行 `openspec validate add-prd-ui-frontend-implementation --strict`

## 3. Apply（开发执行对齐）

- [x] 3.1 初始化前端入口与构建配置（main/router/App/tsconfig/eslint）
- [x] 3.2 实现工作台页面（搜索、最近浏览卡片、收藏空态）
- [x] 3.3 实现对象类型列表页面（筛选、表格、分页）
- [x] 3.4 实现对象类型创建页面（4 步流程与表单交互）
- [x] 3.5 实现 `src/services` mock 请求与 `src/types` 类型定义
- [x] 3.6 必要时使用 Pinia 管理跨步骤状态

## 4. 质量门禁

- [x] 4.1 执行 `pnpm typecheck`
- [x] 4.2 执行 `pnpm lint`
- [x] 4.3 执行 `pnpm build`

## 5. 验收与归档

- [x] 5.1 产出 UI 问题清单（P0/P1/P2）
- [x] 5.2 修复阻断问题并回归确认
- [x] 5.3 执行 `openspec archive add-prd-ui-frontend-implementation --yes`
- [x] 5.4 归档后执行 `openspec validate --strict`
