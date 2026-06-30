# workbench UI 问题清单

> **页面**：Matrix 智能体工作台
> **设计稿**：Stitch `projects/11214155578152749288`；`docs/ui/工作台默认状态.png`；`docs/ui/工作台-点击新建按钮.png`
> **实现页与视口**：`http://127.0.0.1:5174/workbench`，1600 x 807
> **浏览器工具**：Codex in-app Browser 工具未暴露；按规则降级 Playwright CLI
> **验收证据**：`docs/样式还原/验收截图/pw-workbench-default.png`、`docs/样式还原/验收截图/pw-workbench-create-menu.png`
> **证据保留策略**：仅保留最终引用截图；Playwright 中间快照位于 `.playwright-cli/`
> **轻量流程度量**：设计源类型 Stitch + docs-ui；最终证据 2 张；Browser 已降级；P0/P1/P2 当前剩余 0/0/0；验证命令通过

## 一、按区域列问题

| 优先级 | 区域 | 问题 | 状态 | 证据 |
|--------|------|------|------|------|
| P1 | 设计差异 | 顶部浅色科技背景为 CSS 近似还原，未使用设计原图资源。 | 已接受为占位兜底 | `pw-workbench-default.png` |

## 二、回归结论

- 左侧导航、工作台选中态、资源数量、底部保存区完整。
- 搜索栏、新建按钮、新建浮层顺序与截图一致。
- 最近浏览与收藏卡片的标题、数量、描述、对象组标签、更多按钮和星标完整。
- 当前无 P0 阻断问题。
