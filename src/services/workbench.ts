import { httpClient } from "@/services/client";
import type { ApiDocEntry } from "@/types/api-doc";
import type {
  GetWorkbenchCreatePermissionsResponse,
  GetWorkbenchMenusResponse,
  GetWorkbenchSummaryResponse,
  SearchWorkbenchObjectTypesParams,
  SearchWorkbenchObjectTypesResponse,
} from "@/types/workbench/api";

const BASE_PATH = "/mock/workbench";

export const getWorkbenchSummary = () => {
  return httpClient.get<GetWorkbenchSummaryResponse>(`${BASE_PATH}/summary`);
};

export const getWorkbenchMenus = () => {
  return httpClient.get<GetWorkbenchMenusResponse>(`${BASE_PATH}/menus`);
};

export const searchWorkbenchObjectTypes = (params: SearchWorkbenchObjectTypesParams) => {
  return httpClient.get<SearchWorkbenchObjectTypesResponse>(`${BASE_PATH}/search-object-types`, { params });
};

export const getWorkbenchCreatePermissions = () => {
  return httpClient.get<GetWorkbenchCreatePermissionsResponse>(`${BASE_PATH}/create-permissions`);
};

export const workbenchApiDocs = [
  {
    module: "Matrix 智能体工作台",
    page: "workbench",
    service: "src/services/workbench.ts",
    name: "getWorkbenchSummary",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}/summary`,
    paramsType: "-",
    bodyType: "-",
    responseType: "GetWorkbenchSummaryResponse",
    params: [],
    mock: "覆盖默认态、空态、无权限态、加载失败态",
    mockFile: "src/services/workbench.mock.ts",
    replacement: "后端工作台汇总接口确认后替换",
    source: "docs/prd/workbench.md#CHAPTER-06",
  },
  {
    module: "Matrix 智能体工作台",
    page: "workbench",
    service: "src/services/workbench.ts",
    name: "getWorkbenchMenus",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}/menus`,
    paramsType: "-",
    bodyType: "-",
    responseType: "GetWorkbenchMenusResponse",
    params: [],
    mock: "覆盖资源菜单数量与权限隐藏",
    mockFile: "src/services/workbench.mock.ts",
    replacement: "后端菜单与数量接口确认后替换",
    source: "docs/prd/workbench.md#CHAPTER-06",
  },
  {
    module: "Matrix 智能体工作台",
    page: "workbench",
    service: "src/services/workbench.ts",
    name: "searchWorkbenchObjectTypes",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}/search-object-types`,
    paramsType: "SearchWorkbenchObjectTypesParams",
    bodyType: "-",
    responseType: "SearchWorkbenchObjectTypesResponse",
    params: ["keyword"],
    mock: "覆盖名称模糊搜索与空结果",
    mockFile: "src/services/workbench.mock.ts",
    replacement: "后端全局搜索接口确认后替换",
    source: "docs/prd/workbench.md#CHAPTER-06",
  },
  {
    module: "Matrix 智能体工作台",
    page: "workbench",
    service: "src/services/workbench.ts",
    name: "getWorkbenchCreatePermissions",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}/create-permissions`,
    paramsType: "-",
    bodyType: "-",
    responseType: "GetWorkbenchCreatePermissionsResponse",
    params: [],
    mock: "覆盖对象类型、链接、动作、管理入口权限",
    mockFile: "src/services/workbench.mock.ts",
    replacement: "真实权限系统接入后替换",
    source: "docs/prd/workbench.md#CHAPTER-06",
  },
] satisfies ApiDocEntry[];
