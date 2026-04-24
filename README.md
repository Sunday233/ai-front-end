# AI Coding Project

本项目是 AI Coding 落地架构的参考项目，支持主流支持 Skills 的 Agent/AI Coding IDE。

## 技术栈基线

- Vue 3 + TypeScript
- Vite 5/6
- Vue Router 4
- Pinia
- Ant Design Vue
- SCSS Modules + Tailwind CSS
- axios

## 开发环境要求

- Node.js >= 22.22.0
- pnpm >= 10.32.0

## 使用说明

- GitHub Copilot 使用入口：`.github/copilot-instructions.md`
- 文件级规则目录：`.github/instructions/*.instructions.md`
- 技能目录：`.github/skills/*/SKILL.md`
- OpenSpec 流程说明：`openspec/`

## 项目结构

```text
项目根/
├── .github/
│   ├── copilot-instructions.md
│   ├── instructions/
│   └── skills/
└── openspec/
```
