# PRD + UI 自动实现模板

## 用途

本模板用于快速创建“基于 PRD 与 UI 自动实现”的 OpenSpec 变更骨架。

## 目录结构

```text
openspec/templates/prd-ui-auto-implementation/
├── proposal.md
├── tasks.md
├── design.md
└── specs/
    └── frontend-delivery/
        └── spec.md
```

## 使用建议

1. 复制模板到 `openspec/changes/<change-id>/`。
2. 先从目标 PRD 识别设计源：`docs/ui` 截图、`.pen`、Figma 链接或 Stitch 链接。
3. 执行 `design-analysis` 并产出 `docs/样式还原/<prd_slug>-UI分析清单.md`。
4. 执行 `component-planning` 并产出 `docs/组件拆分/<prd_slug>-组件拆分清单.md`。
5. 在 `design.md` 中引用组件拆分清单，并在 `tasks.md` 中写明按清单实施。
6. 按目标 PRD、UI 分析清单与组件拆分清单填充 Why/What/Impact 与任务清单。
7. 保留 spec 中的要求结构并补充场景。
8. 执行 validate 前置检查后，再执行 `openspec validate <change-id> --strict`。
