# object-type-create UI 问题清单

> **页面**：对象类型创建页面
> **设计稿**：Stitch `projects/11214155578152749288`；`docs/ui/创建对象类型第1步-默认状态.png` 至 `docs/ui/创建对象类型第4步-默认状态.png`
> **实现页与视口**：`http://127.0.0.1:5174/object-types/create`，1600 x 807
> **浏览器工具**：Codex in-app Browser 工具未暴露；按规则降级 Playwright CLI
> **验收证据**：`docs/样式还原/验收截图/pw-object-type-create-step1.png`、`docs/样式还原/验收截图/pw-object-type-create-step2.png`、`docs/样式还原/验收截图/pw-object-type-create-step3.png`、`docs/样式还原/验收截图/pw-object-type-create-step4.png`
> **证据保留策略**：仅保留最终引用截图；Playwright 中间快照位于 `.playwright-cli/`
> **轻量流程度量**：设计源类型 Stitch + docs-ui；最终证据 4 张；Browser 已降级；P0/P1/P2 当前剩余 0/0/0；验证命令通过

## 一、按区域列问题

| 优先级 | 区域 | 问题 | 状态 | 证据 |
|--------|------|------|------|------|
| P2 | step2 元数据 | 对象组下拉仅保留入口，不展开完整对象组管理能力。 | 符合 PRD out_of_scope，记录为占位 | `pw-object-type-create-step2.png` |
| P2 | step4 动作配置 | 用户/用户组选择器未接入真实资源。 | 符合 PRD fallback，使用 mock 占位 | `pw-object-type-create-step4.png` |

## 二、回归结论

- 四步步骤条、当前步骤高亮、上一/下一步/完成按钮完整。
- step1 数据源卡片与选择数据集入口完整。
- step2 元数据字段顺序、字数计数、对象组入口完整。
- step3 字段到属性逐行映射完整，主键标签和删除按钮位置正确。
- step4 三个动作卡片顺序和说明完整。
- 当前无 P0 阻断问题。
