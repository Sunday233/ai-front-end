---
alwaysApply: false
description: 项目的 API 规范，包括接口请求封装、函数命名约定、错误处理原则。当新增或修改接口时读取此规则。
---

# API 规范

## 接口请求规范

- 接口请求必须使用 `src/services` 目录下的请求函数
- 使用 `axios` 进行请求封装，且只能在 `src/services/client.ts` 中创建 axios 实例
- 业务接口文件必须 import `httpClient`，禁止在页面、组件、store 或页面 service 中直接 `import axios`
- 每个页面必须有独立接口文件：`src/services/<page-slug>.ts`，`page-slug` 优先使用 PRD 中的 `prd_slug`
- 使用 TS 类型定义 Params/Body/Response，放在 `src/types/<page-slug>/api.ts` 下
- 业务模型类型放在 `src/types/<page-slug>/model.ts` 下
- 接口基于 Token 认证，统一使用 axios 的请求拦截器配置
- 每个页面 service 必须导出 API 文档元数据，供 `api-doc-summary` 汇总到 `docs/api/接口汇总.md`

## axios 封装（NON-NEGOTIABLE）

`src/services/client.ts` 是唯一请求封装入口，至少负责：

- `baseURL`、超时、通用 headers 配置
- Token 认证请求拦截器
- 响应解包与错误码映射提示
- mock/real 模式共用同一套请求函数签名

若项目不存在 `src/services/client.ts`，任何 API 或 mock 实施前必须先创建 axios 封装；不得先生成纯 mock service 或绕过请求层的临时实现。

除 `src/services/client.ts` 和 mock adapter/handler 文件外，其他文件不得直接调用 `axios.get/post/put/delete`。

## 页面 service 约束（NON-NEGOTIABLE）

- 页面接口文件命名：`src/services/<page-slug>.ts`
- 页面 mock 文件命名：`src/services/<page-slug>.mock.ts`
- 页面类型目录命名：`src/types/<page-slug>/`
- 页面 service 内只暴露业务请求函数和 API 文档元数据
- 页面、组件、store 只能调用页面 service 导出的函数
- 多页面真实复用的跨域接口可以放在 `src/services/<domain>.ts`，但必须在 OpenSpec `design.md` 或 `tasks.md` 中说明复用原因

如需查看完整示例与落地步骤，请使用技能文件：

- `.agents/skills/create-api/SKILL.md`
- `.agents/skills/api-doc-summary/SKILL.md`

## 接口函数命名（NON-NEGOTIABLE）

| 操作 | 命名规则 | 示例 |
|---|----|---|
| 获取列表 | getXxxList | `getBannerList` |
| 获取详情 | getXxxDetail | `getBannerDetail` |
| 创建 | createXxx | `createBanner` |
| 更新 | updateXxx | `updateBanner` |
| 删除 | deleteXxx | `deleteBanner` |

**禁止**使用 `fetch` 前缀或匈牙利命名法。

## 接口错误处理（NON-NEGOTIABLE）

axios 的请求封装已包含错误码的映射提示，业务代码中**禁止重复添加** `message.error` 等错误提示：

- 接口错误由 HTTP 拦截器统一处理，业务代码只需处理成功逻辑
- 前端表单验证错误和业务逻辑检查错误可以保留
- 成功提示可以保留（业务逻辑的成功反馈）

## Mock 与真实接口切换（NON-NEGOTIABLE）

前端 mock 必须做到“调用层不变”：

- 页面 service 始终调用 `httpClient.get/post/put/delete`
- mock 只能通过 axios adapter、request handler、MSW 或 `src/services/mock.ts` 等请求层机制拦截
- `src/services/mock.ts` 只能作为统一注册入口；具体页面 mock handler 与 mock 数据必须放在 `src/services/<page-slug>.mock.ts`
- 禁止在页面、组件、store 中写 mock 分支
- 禁止在页面 service 中用 `if (isMock)` 返回本地数据
- 禁止将多个页面的 mock 接口集中堆在一个业务 ts 文件中
- 通过环境变量（如 `VITE_API_MODE=mock|real`）或等价配置切换 mock/real
- mock 数据必须覆盖 PRD `mock_policy` 中声明的状态，并在 API 文档元数据中标记替换点

## API 文档汇总（NON-NEGOTIABLE）

新增或修改接口后，必须使用 `.agents/skills/api-doc-summary/SKILL.md` 更新：

```text
docs/api/接口汇总.md
```

汇总文档至少包含：

- 所属功能模块
- 页面 slug / service 文件
- 接口名称
- 请求方法与路径
- 请求参数类型、Body 类型、响应类型
- 请求参数字段说明
- mock 覆盖状态与后续替换点
- 来源 PRD / OpenSpec 变更
