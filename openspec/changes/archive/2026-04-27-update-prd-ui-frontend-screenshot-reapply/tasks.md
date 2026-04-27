## 1. 输入与 Proposal

- [x] 1.1 扫描 `docs/prd` 与 `docs/ui`，完成 slug 配对与状态识别
- [x] 1.2 创建 `update-prd-ui-frontend-screenshot-reapply` proposal / tasks / spec delta
- [x] 1.3 执行 `openspec validate update-prd-ui-frontend-screenshot-reapply --strict`

## 2. Apply：实现对齐

- [x] 2.1 工作台页面对齐截图（工具栏、卡片区、收藏空态、创建入口）
- [x] 2.2 对象类型列表页面对齐截图（筛选区、表格、分页扩展控件）
- [x] 2.3 创建对象类型四步页对齐截图（步骤条、字段区、按钮区、交互限制）
- [x] 2.4 布局壳层对齐截图（左侧导航层级与顶部面包屑视觉）
- [x] 2.5 接口与类型保持规范命名并维持 mock 可替换边界

## 3. 文档与验收

- [x] 3.1 按截图模式模板重写 `docs/样式还原/对象管理-UI分析清单.md`
- [x] 3.2 基于浏览器验收更新 `docs/样式还原/对象管理-UI问题清单.md`
- [x] 3.3 标记未确认项并给出后续确认动作

## 4. 质量门禁与归档

- [x] 4.1 执行 `pnpm typecheck`
- [x] 4.2 执行 `pnpm lint`
- [x] 4.3 执行 `pnpm build`
- [x] 4.4 完成 UI 验收并确认 P0/P1 收敛
- [x] 4.5 执行 `openspec archive update-prd-ui-frontend-screenshot-reapply --yes`
- [x] 4.6 执行 `openspec validate --strict`
