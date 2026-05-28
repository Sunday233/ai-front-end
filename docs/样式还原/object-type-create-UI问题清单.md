# object-type-create UI 问题清单

## 验收来源

- 实现页：`http://127.0.0.1:5173/object-types/create`
- 对照：Stitch screens 创建对象类型 step1 至 step4 与 `docs/样式还原/object-type-create-UI分析清单.md`
- 工具：Playwright Chromium，视口 1600x807

## 结论

- P0：无。
- P1：无阻塞项。初次验收发现步骤 1 内容面板偏高，已将 step1 面板高度收敛到接近设计稿。
- P2：图标细节与 Stitch 截图略有差异，当前使用 Ant Design Vue 图标和文本图形占位。

## 回归记录

- 页面可渲染左侧导航、面包屑、四步步骤条、数据源卡片、选择数据集按钮与下一步按钮。
- 向导包含元数据配置、属性配置、动作配置组件；数据集选择弹窗与提交流程可用。
