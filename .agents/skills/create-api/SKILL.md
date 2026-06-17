---
name: create-api
description: 指导在前端项目中按团队规范创建和维护 HTTP 接口，包括页面级 service、axios 请求封装、mock/real 无痛切换、类型定义、API 文档元数据与错误处理。当前端需要新增、调整、mock 或汇总 API 时使用本技能。
---

# 创建与维护 API

## 使用场景

当前端需要：

- 为页面或业务流程新增接口
- 基于 PRD `CHAPTER-06 数据与接口要求` 落地 `api_contract`
- 为已有接口补充类型定义、mock 替换点或文档元数据
- 将前端 mock 改造成后续可无痛切真实接口的请求层方案

必须同时遵守 `.agents/rules/05-API规范.instructions.md` 与 `.agents/rules/03-项目结构.instructions.md`。

---

## 步骤 1：确定页面归属与文件

1. 读取 PRD 或 OpenSpec 中的 `prd_slug` / `page_name`。
2. 优先使用 `prd_slug` 作为 `page-slug`，例如 `object-type-list`。
3. 每个页面必须创建或维护一组文件：

```text
src/services/<page-slug>.ts
src/services/<page-slug>.mock.ts
src/types/<page-slug>/model.ts
src/types/<page-slug>/api.ts
```

4. 若项目尚未有统一请求封装，先创建：

```text
src/services/client.ts
src/services/mock.ts
src/types/api-doc.ts
```

**约束：**

- 页面、组件、store 禁止直接 `import axios`。
- 页面 service 也禁止直接 `import axios`，只能使用 `httpClient`。
- `src/services/mock.ts` 只作为 mock 注册入口，具体页面 mock handler 与 mock 数据放在 `src/services/<page-slug>.mock.ts`。
- 多页面真实复用的接口才允许放入 `src/services/<domain>.ts`，并必须在 OpenSpec 中说明复用原因。

---

## 步骤 2：创建 axios 请求封装

`src/services/client.ts` 是唯一 axios 实例入口，必须包含 Token 请求拦截器、响应解包与统一错误处理。

若当前项目没有 `src/services/client.ts`，必须先创建本文件，再实现任何页面 service 或 mock。禁止只创建 mock 函数、跳过 axios 封装。

```ts
// src/services/client.ts
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type Method,
} from 'axios';

export interface ApiEnvelope<T> {
  code: number;
  msg: string;
  data: T;
}

const isApiEnvelope = <T>(payload: unknown): payload is ApiEnvelope<T> => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'code' in payload &&
    'msg' in payload &&
    'data' in payload
  );
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/backend',
  timeout: 15000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const unwrapResponse = <T>(response: AxiosResponse<ApiEnvelope<T> | T>): T => {
  const payload = response.data;

  if (isApiEnvelope<T>(payload)) {
    if (payload.code !== 0) {
      throw new Error(payload.msg);
    }

    return payload.data;
  }

  return payload;
};

const request = async <T>(method: Method, url: string, config?: AxiosRequestConfig) => {
  try {
    const response = await axiosInstance.request<ApiEnvelope<T> | T>({
      ...config,
      method,
      url,
    });

    return unwrapResponse<T>(response);
  } catch (error) {
    return Promise.reject(error as AxiosError);
  }
};

export const httpClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => {
    return request<T>('GET', url, config);
  },
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return request<T>('POST', url, {...config, data});
  },
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return request<T>('PUT', url, {...config, data});
  },
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => {
    return request<T>('PATCH', url, {...config, data});
  },
  delete: <T>(url: string, config?: AxiosRequestConfig) => {
    return request<T>('DELETE', url, config);
  },
};
```

如项目已有认证 store、错误提示工具或响应 code 约定，沿用现有实现，但仍必须保持 `httpClient` 是唯一请求入口。

---

## 步骤 3：定义模型与请求类型

在 `src/types/<page-slug>/model.ts` 中定义业务模型，在 `src/types/<page-slug>/api.ts` 中定义 Params/Body/Response。

```ts
// src/types/object-type-list/model.ts
export interface ObjectTypeListItem {
  id: string;
  rid: string;
  icon: string;
  name: string;
  status: string;
  visibility: string;
  updatedAt: string;
  operatorPermissions: string[];
}
```

```ts
// src/types/object-type-list/api.ts
import type {ObjectTypeListItem} from './model';

export interface GetObjectTypeListParams {
  pageNo: number;
  pageSize: number;
  keyword?: string;
}

export interface GetObjectTypeListResponse {
  list: ObjectTypeListItem[];
  total: number;
}

export interface GetObjectTypeListPermissionsResponse {
  canCreate: boolean;
}
```

**要求：**

- 字段必须来自 Apifox、后端文档、PRD `data_fields` 或已确认的 OpenSpec 设计，不得凭空扩展。
- 接口未确认的字段标记为可选或在 API 文档中写明“待后端确认”。
- 响应类型默认定义业务 `data` 结构；统一 envelope 由 `client.ts` 处理。

---

## 步骤 4：创建页面 service

页面 service 必须只做三件事：调用 `httpClient`、导出业务请求函数、导出 API 文档元数据。

```ts
// src/services/object-type-list.ts
import {httpClient} from '@/services/client';
import type {ApiDocEntry} from '@/types/api-doc';
import type {
  GetObjectTypeListParams,
  GetObjectTypeListPermissionsResponse,
  GetObjectTypeListResponse,
} from '@/types/object-type-list/api';

export const getObjectTypeList = async (params: GetObjectTypeListParams) => {
  return httpClient.get<GetObjectTypeListResponse>('/object-types', {params});
};

export const searchObjectTypes = async (params: GetObjectTypeListParams) => {
  return httpClient.get<GetObjectTypeListResponse>('/object-types/search', {params});
};

export const refreshObjectTypeList = async (params: GetObjectTypeListParams) => {
  return httpClient.get<GetObjectTypeListResponse>('/object-types', {params});
};

export const getObjectTypeListPermissions = async () => {
  return httpClient.get<GetObjectTypeListPermissionsResponse>('/object-types/permissions');
};

export const objectTypeListApiDocs = [
  {
    module: '对象类型列表',
    page: 'object-type-list',
    service: 'src/services/object-type-list.ts',
    name: 'getObjectTypeList',
    method: 'GET',
    path: '/object-types',
    paramsType: 'GetObjectTypeListParams',
    bodyType: '-',
    responseType: 'GetObjectTypeListResponse',
    params: ['pageNo', 'pageSize', 'keyword'],
    mock: '覆盖默认列表、空列表、搜索无结果、加载失败、无新建权限',
    mockFile: 'src/services/object-type-list.mock.ts',
    replacement: '后端列表接口路径与状态枚举确认后只替换 path/枚举映射',
    source: 'docs/prd/object-type-list.md#api_contract',
  },
] satisfies ApiDocEntry[];
```

`src/types/api-doc.ts` 统一定义元数据类型：

```ts
export interface ApiDocEntry {
  module: string;
  page: string;
  service: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  paramsType: string;
  bodyType: string;
  responseType: string;
  params: string[];
  mock: string;
  mockFile: string;
  replacement: string;
  source: string;
}
```

---

## 步骤 5：实现 mock/real 无痛切换

mock 必须发生在请求层，页面调用层和页面 service 函数签名保持不变。

若项目已有“所有 mock 接口集中在一个 ts 文件”的实现，先执行迁移：

1. 按 PRD `prd_slug` / 页面路由识别每个 mock 接口归属页面。
2. 将页面 mock handler 与 mock 数据移动到 `src/services/<page-slug>.mock.ts`。
3. 保留 `src/services/mock.ts` 作为统一注册入口，只 import 并调用各页面 mock 注册函数。
4. 将原有业务 mock 函数替换为页面 service 中的 `httpClient.get/post/put/delete` 调用。
5. 为每个页面 service 补充 `ApiDocEntry` 元数据，并记录原 mock 的真实接口替换点。

推荐模式：

```ts
// src/services/mock.ts
import MockAdapter from 'axios-mock-adapter';
import {axiosInstance} from '@/services/client';
import {setupObjectTypeListMock} from '@/services/object-type-list.mock';

export const setupApiMock = () => {
  if (import.meta.env.VITE_API_MODE !== 'mock') {
    return;
  }

  const mock = new MockAdapter(axiosInstance, {delayResponse: 300});

  setupObjectTypeListMock(mock);
};
```

```ts
// src/services/object-type-list.mock.ts
import type MockAdapter from 'axios-mock-adapter';

export const setupObjectTypeListMock = (mock: MockAdapter) => {
  mock.onGet('/object-types').reply(200, {
    code: 0,
    msg: 'ok',
    data: {
      list: [],
      total: 0,
    },
  });
};
```

入口处只注册一次：

```ts
import {setupApiMock} from '@/services/mock';

setupApiMock();
```

**禁止：**

- 在页面或组件中用 `if (isMock)` 切换数据
- 在页面 service 中直接返回本地 mock 数据
- 将多个页面的 mock 数据和 handler 堆在同一个业务 ts 文件中
- 在 `src/services/mock.ts` 直接编写具体页面 mock 数据
- 为 mock 创建与真实接口不同的函数名或返回结构

---

## 步骤 6：在业务代码中使用

```ts
import {getObjectTypeList} from '@/services/object-type-list';

const list = await getObjectTypeList({
  pageNo: 1,
  pageSize: 10,
  keyword: '',
});
```

业务侧只处理成功逻辑、页面状态和前端校验错误。接口错误提示由 `httpClient` 统一处理。

---

## 步骤 7：更新 API 汇总文档

新增或调整接口后，必须使用 `.agents/skills/api-doc-summary/SKILL.md` 更新：

```text
docs/api/接口汇总.md
```

文档必须覆盖本次变更涉及的所有页面 service、请求参数、Body、响应类型、mock 覆盖状态与后续替换点。

---

## 快速检查清单

- [ ] 是否每个页面都有独立 `src/services/<page-slug>.ts`？
- [ ] 是否每个含 mock 的页面都有独立 `src/services/<page-slug>.mock.ts`？
- [ ] 是否只有 `src/services/client.ts` 直接创建 axios 实例？
- [ ] 页面、组件、store 是否没有直接调用 `axios`？
- [ ] 页面 service 是否全部通过 `httpClient` 发请求？
- [ ] mock 是否在 axios adapter/handler 层完成，且调用层不变？
- [ ] 是否不存在所有页面 mock 集中在一个 ts 文件中的实现？
- [ ] 是否在 `src/types/<page-slug>/api.ts` 定义 Params/Body/Response？
- [ ] 是否导出了 API 文档元数据？
- [ ] 是否更新了 `docs/api/接口汇总.md`？
