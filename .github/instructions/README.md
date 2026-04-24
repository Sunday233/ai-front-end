# 项目规范索引

本目录包含项目开发规范（`.instructions.md`），供 GitHub Copilot 自动加载与按需引用。

## 规范模块列表

### 📋 [01-项目概述](./01-项目概述.instructions.md)

- 项目定位
- Vue 3 技术栈

### 💻 [02-编码规范](./02-编码规范.instructions.md)

- TypeScript 规范
- 命名规范（文件夹、变量、常量、接口、组件等）
- 业务函数命名（事件处理、内部处理）

### 📁 [03-项目结构](./03-项目结构.instructions.md)

- 目录结构概览
- 各目录使用约束（禁止新建非标准目录）

### 🧩 [04-组件规范](./04-组件规范.instructions.md)

- 组件结构规范
- 组件层级规划（通用 vs 页面级）

### 🌐 [05-API规范](./05-API规范.instructions.md)

- 接口请求规范
- 接口函数命名（NON-NEGOTIABLE）
- 接口错误处理（NON-NEGOTIABLE）

### 🛣️ [06-路由规范](./06-路由规范.instructions.md)

- 路由结构规范
- 路由与菜单规范（NON-NEGOTIABLE）

### 🗄️ [07-状态管理](./07-状态管理.instructions.md)

- Pinia 使用规范
- Store 组织规范
- 持久化策略

### ⚙️ [08-通用约束](./08-通用约束.instructions.md)

- 语言规范（中文注释）
- 可观测性与兜底
- 约束汇总

### 🎨 [09-样式规范](./09-样式规范.instructions.md)

- SCSS Modules 与 Tailwind 使用规范
- 主题变量（NON-NEGOTIABLE）

### 📝 [10-文档规范](./10-文档规范.instructions.md)

- 注释规范
- JSDoc 使用

### ✅ [11-测试规范](./11-测试规范.instructions.md)

- 测试覆盖要求
- 质量门禁

### 🤖 [12-自动化执行规范](./12-自动化执行规范.instructions.md)

- PRD + UI 自动实现语义触发
- OpenSpec 生命周期（Proposal / Apply / Archive）
- 默认确认与高风险确认边界

## 使用说明

1. 根据需求读取对应规则文件
2. 规则按 `applyTo` 自动参与 Copilot 上下文
3. 详细落地步骤见 `.github/skills/` 目录下技能文件
