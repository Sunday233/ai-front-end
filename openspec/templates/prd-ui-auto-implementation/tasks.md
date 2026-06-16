## 1. 输入与触发

- [ ] 1.1 识别 PRD + UI + 实现语义
- [ ] 1.2 读取目标 `docs/prd/*.md`
- [ ] 1.3 识别设计源类型：`docs-ui` / `pen` / `figma` / `stitch`
- [ ] 1.4 扫描 `docs/ui` 截图、`.pen` 路径、Figma 链接、Stitch 链接
- [ ] 1.5 生成 PRD 排序与 UI 配对映射

## 2. Design Analysis（设计稿分析）

- [ ] 2.1 按设计源选择工具：截图模式 / Pencil MCP / Figma MCP / Stitch MCP
- [ ] 2.2 执行 `.agents/skills/design-analysis/SKILL.md`
- [ ] 2.3 产出 `docs/样式还原/<prd_slug>-UI分析清单.md`
- [ ] 2.4 在分析清单中记录 PRD 路径、设计源、截图/链接、证据等级与待确认项

## 3. Proposal（需求/变更收敛）

## 3. Component Planning（组件拆分规划）

- [ ] 3.1 执行 `.agents/skills/component-planning/SKILL.md`
- [ ] 3.2 基于 PRD、UI 分析清单、设计稿/截图与现有代码识别组件边界
- [ ] 3.3 产出 `docs/组件拆分/<prd_slug>-组件拆分清单.md`
- [ ] 3.4 清单中区分页面级组件、公共组件、现有可复用项与候选复用项
- [ ] 3.5 确认页面级组件默认放在 `src/views/<page>/components/`，公共组件只有第二处真实使用后才抽到 `src/components/`

## 4. Proposal（需求/变更收敛）

- [ ] 4.1 创建 change-id 并生成 proposal.md
- [ ] 4.2 生成 design.md，并引用 `docs/组件拆分/<prd_slug>-组件拆分清单.md`
- [ ] 4.3 生成 tasks.md，并写明依据 UI 分析清单和组件拆分清单实现
- [ ] 4.4 生成 spec delta（明确影响范围、组件拆分门禁与 UI 验收场景）
- [ ] 4.5 执行 validate 前置检查：组件拆分清单存在、design.md 已引用、tasks.md 已写明按清单实施
- [ ] 4.6 执行 `openspec validate <change-id> --strict`
- [ ] 4.7 Proposal 通过后默认确认进入 Apply（命中高风险时人工确认）

## 5. Apply（开发执行对齐）

- [ ] 5.1 读取当前变更 proposal/design/tasks/spec 增量、UI 分析清单与组件拆分清单
- [ ] 5.2 apply 前置检查：组件拆分清单存在、design.md 已引用、tasks.md 已写明按清单实施；缺任一项则暂停
- [ ] 5.3 加载 `.agents/rules`：项目结构、组件、路由、样式、通用约束、测试规范
- [ ] 5.4 加载相关 Skills：create-route、create-component、theme-variables，涉及接口时加载 create-api
- [ ] 5.5 按组件拆分清单创建或复用页面、布局、公共组件与页面级组件
- [ ] 5.6 依据 UI 分析清单还原布局、文字、图片、层级与样式
- [ ] 5.7 完成类型、接口、状态与样式实现
- [ ] 5.8 执行类型/lint/测试/构建门禁
- [ ] 5.9 失败自动修复，最多重试 2 次

## 6. UI 验收与归档

- [ ] 6.1 在 Codex 或 Cursor 中优先使用 `@Browser` 打开实现页；不可用时使用 Playwright MCP
- [ ] 6.2 执行 `.agents/skills/ui-verification/SKILL.md`
- [ ] 6.3 与设计稿或 UI 分析清单比对，按 P0/P1/P2 产出 `docs/样式还原/<prd_slug>-UI问题清单.md`
- [ ] 6.4 修复阻断级问题并再次用 Browser 或 Playwright 回归
- [ ] 6.5 记录非阻断问题与风险
- [ ] 6.6 执行 `openspec archive <change-id> --yes`
- [ ] 6.7 将 spec 增量合并到 openspec/specs 对应能力
- [ ] 6.8 归档后执行 `openspec validate --strict`
- [ ] 6.9 输出上线就绪结论（非部署）
