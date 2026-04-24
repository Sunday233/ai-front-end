## Context

本次实现基于 `docs/prd/*.md` 与 `docs/ui/*.png`，目标是交付可运行、可验收的前端页面，并保证后续可通过 OpenSpec 归档沉淀为长期上下文。

## Goals / Non-Goals

- Goals
  - 完成三页面实现并可通过路由访问。
  - 视觉结构尽量贴近截图（布局、层级、关键交互）。
  - 建立 mock 服务与类型定义，保证页面数据闭环。
  - 保证 typecheck、lint、build 全部通过。
- Non-Goals
  - 本次不接入真实后端服务。
  - 本次不实现权限系统和复杂业务流程引擎。

## Decisions

- 技术栈采用 Vue 3 + TS + Vue Router + Pinia + Ant Design Vue。
- 路由目录遵循规则：`src/views/*` + 全局路由入口 `src/router/index.ts`。
- 接口调用遵循规则：`src/services/*` + `src/types/*`。
- 创建页采用 4 步 Stepper，与设计稿步骤一致。
- 页面级样式优先使用 SFC scoped scss；可复用样式再抽取模块。

## Risks / Trade-offs

- 风险：PRD 中 required_ui_assets 命名与现有截图文件名不完全一致。
- 缓解：以实际存在截图为基准配对，并在验收文档记录映射。

- 风险：主机 Node 版本为 16，不满足工程要求。
- 缓解：执行命令统一使用 Node 22 + pnpm 10.32.0 shim。

## Validation Plan

1. `pnpm typecheck`
2. `pnpm lint`
3. `pnpm build`
4. 根据 UI 分析清单进行页面比对并输出问题清单
