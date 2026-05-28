# object-type-list UI 问题清单

## 验收来源

- 实现页：`http://127.0.0.1:5173/object-types`
- 对照：Stitch screen `对象类型列表页-导航同步` 与 `docs/样式还原/object-type-list-UI分析清单.md`
- 工具：Playwright Chromium，视口 1600x807

## 结论

- P0：无。
- P1：无阻塞项。
- P2：刷新/设置按钮图标样式与截图存在轻微差异，当前使用 Ant Design Vue 默认按钮样式。

## 回归记录

- 页面可渲染左侧导航、标题、搜索框、刷新按钮、设置按钮、创建按钮、表格与分页。
- 表格字段顺序为类型名称、状态、可见性、修改时间、操作，符合 UI 分析清单。
