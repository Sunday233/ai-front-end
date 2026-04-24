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
2. 按目标 PRD 填充 Why/What/Impact 与任务清单。
3. 保留 spec 中的要求结构并补充场景。
4. 执行 `openspec validate <change-id> --strict`。
