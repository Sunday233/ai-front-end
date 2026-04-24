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

## 前端项目启动说明

### 环境要求

1. Node.js >= 22.22.0
2. pnpm >= 10.32.0

### 安装依赖

```bash
npx -y -p node@22 -p pnpm@10.32.0 pnpm install
```

### 启动开发服务

```bash
npx -y -p node@22 -p pnpm@10.32.0 pnpm dev --host 127.0.0.1 --port 5173
```

启动后访问：`http://127.0.0.1:5173/`

### 常用命令

```bash
npx -y -p node@22 -p pnpm@10.32.0 pnpm typecheck
npx -y -p node@22 -p pnpm@10.32.0 pnpm lint
npx -y -p node@22 -p pnpm@10.32.0 pnpm build
```

## 项目结构

```text
项目根/
├── .github/
│   ├── copilot-instructions.md
│   ├── instructions/
│   └── skills/
└── openspec/
```
