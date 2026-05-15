## 1. 输入资产与规范对齐

- [x] 1.1 规范化 `docs/ui` 截图文件命名，使其与各 PRD 的 `prd_slug` 前缀一致。
- [x] 1.2 更新 `docs/prd` 与 `docs/ui` 说明文档中的截图命名示例与 required 资产引用。
- [x] 1.3 更新 `docs/样式还原/对象管理-UI分析清单.md` 与 `docs/样式还原/对象管理-UI问题清单.md` 的截图路径引用。

## 2. 页面实现与样式变量重对齐

- [x] 2.1 重对齐 `workbench` 页面的工具栏/卡片/新建弹层细节，确保与截图主结构一致。
- [x] 2.2 重对齐 `object-type-list` 页面的筛选、表格状态和分页区域细节。
- [x] 2.3 重对齐 `object-type-create` 四步页面与步骤子组件字段布局。
- [x] 2.4 清理页面样式中的硬编码主题色，统一使用 Antd 或项目 CSS 变量。

## 3. 质量门禁、验收与归档

- [x] 3.1 执行 TypeScript 类型检查并修复阻断问题。
- [x] 3.2 执行 ESLint 检查并修复阻断问题。
- [x] 3.3 执行 Vite 构建并修复阻断问题。
- [x] 3.4 更新 UI 问题清单结论，记录本轮残余风险。
- [x] 3.5 执行 `openspec validate reimplement-prd-ui-with-latest-skills --strict`。
- [x] 3.6 完成实现后归档 change，并执行 `openspec validate --strict`。
