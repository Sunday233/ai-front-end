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

- [ ] 3.1 创建 change-id 并生成 proposal.md
- [ ] 3.2 生成 tasks.md，并写明依据 UI 分析清单实现
- [ ] 3.3 生成 spec delta（明确影响范围与 UI 验收场景）
- [ ] 3.4 执行 `openspec validate <change-id> --strict`
- [ ] 3.5 Proposal 通过后默认确认进入 Apply（命中高风险时人工确认）

## 4. Apply（开发执行对齐）

- [ ] 4.1 读取当前变更 proposal/tasks/spec 增量与 UI 分析清单
- [ ] 4.2 加载 `.agents/rules`：项目结构、组件、路由、样式、通用约束、测试规范
- [ ] 4.3 加载相关 Skills：create-route、create-component、theme-variables，涉及接口时加载 create-api
- [ ] 4.4 按 PRD 语义拆分页面与组件
- [ ] 4.5 依据 UI 分析清单还原布局、文字、图片、层级与样式
- [ ] 4.6 完成类型、接口、状态与样式实现
- [ ] 4.7 执行类型/lint/测试/构建门禁
- [ ] 4.8 失败自动修复，最多重试 2 次

## 5. UI 验收与归档

- [ ] 5.1 使用 Cursor IDE Browser 打开实现页；不可用时使用 Playwright MCP
- [ ] 5.2 执行 `.agents/skills/ui-verification/SKILL.md`
- [ ] 5.3 与设计稿或 UI 分析清单比对，按 P0/P1/P2 产出 `docs/样式还原/<prd_slug>-UI问题清单.md`
- [ ] 5.4 修复阻断级问题并再次用 Browser 或 Playwright 回归
- [ ] 5.5 记录非阻断问题与风险
- [ ] 5.6 执行 `openspec archive <change-id> --yes`
- [ ] 5.7 将 spec 增量合并到 openspec/specs 对应能力
- [ ] 5.8 归档后执行 `openspec validate --strict`
- [ ] 5.9 输出上线就绪结论（非部署）
