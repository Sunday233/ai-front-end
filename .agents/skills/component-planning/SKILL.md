---
name: component-planning
description: 在 UI 类 OpenSpec apply 前生成和检查页面组件拆分清单。用于基于 PRD、UI 分析清单、设计稿或现有代码判断页面级组件、公共组件、可复用组件，并产出 docs/组件拆分/prd_slug-组件拆分清单.md。
---

# 组件拆分规划

## 使用时机

当需求涉及页面、组件、设计稿、UI 还原、`docs/ui`、Figma、Stitch、Pencil 或 `docs/样式还原` 时，必须在 OpenSpec apply 前使用本技能。

本技能用于产出轻量版组件拆分清单，解决“实现前不知道哪些组件该复用、哪些该页面内拆分、哪些不能提前公共化”的问题。

---

## UI 类 Change 判定

命中任一条件即视为 UI 类 change：

- PRD、proposal、design 或 tasks 中出现 `docs/样式还原`、UI 分析清单、页面、组件、设计稿、UI 还原、Figma、Stitch、Pencil、`docs/ui`。
- 影响代码包含 `src/views`、`src/components`、`src/layout`。
- 交付物包含页面实现、功能组件、样式还原或 UI 验收。

UI 类 change 必须满足：

- 已产出 `docs/组件拆分/<prd_slug>-组件拆分清单.md`。
- `openspec/changes/<change-id>/design.md` 已引用该清单路径。
- `openspec/changes/<change-id>/tasks.md` 已写明“按组件拆分清单实施”。

缺任一项时，不得进入 `openspec validate --strict`，也不得进入 apply。

---

## 输入

优先读取：

1. `docs/prd/<prd_slug>.md`
2. `docs/样式还原/<prd_slug>-UI分析清单.md`
3. `docs/ui/` 中与 `prd_slug` 或 PRD 声明匹配的截图
4. 现有代码目录：`src/components`、`src/layout`、`src/views`

若当前仓库没有业务代码目录，只基于 PRD、UI 分析清单与截图给出建议，并在清单中说明“现有代码不可扫描”。

---

## 拆分原则

- 页面主文件只负责组织数据、状态与页面骨架，不堆叠大段重复 UI。
- 页面级组件默认放在 `src/views/<page>/components/`。
- 公共组件只有在第二处真实使用后才抽到 `src/components/`。
- `src/components/` 只能放跨页面复用且业务耦合低的组件。
- 已存在的 `src/layout`、`src/components` 优先复用。
- 拆分依据必须来自 PRD、UI 分析清单、截图或现有代码，不凭空制造抽象。

---

## 输出路径

```text
docs/组件拆分/<prd_slug>-组件拆分清单.md
```

OpenSpec change 的 `design.md` 必须引用该路径。

---

## 输出模板

````markdown
# <prd_slug> 组件拆分清单

## 来源

- PRD：
- UI 分析清单：
- 设计源：
- 目标页面/路由：

## 现有可复用项

| 名称 | 路径 | 复用方式 | 说明 |
|------|------|----------|------|

## 页面组件拆分

| 组件 | 类型 | 建议路径 | 职责 | 复用判断 | 对应 UI 区块 |
|------|------|----------|------|----------|--------------|

## 页面组件树

```text
<Page>
  <... />
```

## Apply 约束

- 实施必须优先复用“现有可复用项”。
- 页面级组件默认放在 `src/views/<page>/components/`。
- 公共组件只有第二处真实使用后才抽到 `src/components/`。
- 若实现偏离本清单，必须先更新本清单或在 tasks 中记录原因。
````

---

## 与其它技能的关系

- **design-analysis**：本技能依赖 UI 分析清单识别页面区域、状态与元素层级。
- **create-proposal**：创建 OpenSpec 时必须在 `design.md` 引用组件拆分清单，并在 `tasks.md` 写入实施约束。
- **openspec-apply-change**：apply 前必须检查组件拆分清单、design 引用和 tasks 约束。
- **create-component / create-route**：实施时按组件拆分清单创建页面与组件。
