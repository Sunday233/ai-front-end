import { httpClient } from "@/services/client";
import type { ApiDocEntry } from "@/types/api-doc";
import type {
  GetWorkbenchCreatePermissionsParams,
  GetWorkbenchCreatePermissionsResponse,
  GetWorkbenchMenusParams,
  GetWorkbenchMenusResponse,
  GetWorkbenchSummaryParams,
  GetWorkbenchSummaryResponse,
  SearchWorkbenchObjectTypesParams,
  SearchWorkbenchObjectTypesResponse,
} from "@/types/workbench/api";

export const getWorkbenchSummary = (params: GetWorkbenchSummaryParams) => {
  return httpClient.get<GetWorkbenchSummaryResponse>(
    "/matrix/workbench/summary",
    { params },
  );
};

export const getWorkbenchMenus = (params: GetWorkbenchMenusParams) => {
  return httpClient.get<GetWorkbenchMenusResponse>("/matrix/workbench/menus", {
    params,
  });
};

export const searchWorkbenchObjectTypes = (
  params: SearchWorkbenchObjectTypesParams,
) => {
  return httpClient.get<SearchWorkbenchObjectTypesResponse>(
    "/matrix/workbench/object-types/search",
    { params },
  );
};

export const getWorkbenchCreatePermissions = (
  params: GetWorkbenchCreatePermissionsParams,
) => {
  return httpClient.get<GetWorkbenchCreatePermissionsResponse>(
    "/matrix/workbench/create-permissions",
    { params },
  );
};

export const workbenchApiDocs = [
  {
    module: "Matrix 智能体工作台",
    page: "workbench",
    service: "src/services/workbench.ts",
    name: "getWorkbenchSummary",
    method: "GET",
    path: "/matrix/workbench/summary",
    paramsType: "GetWorkbenchSummaryParams",
    bodyType: "-",
    responseType: "GetWorkbenchSummaryResponse",
    params: ["workspaceId", "agentId"],
    mock: "覆盖默认态、空态、加载失败态",
    mockFile: "src/services/workbench.mock.ts",
    replacement: "路径与统计口径待后端确认",
    source: "docs/prd/workbench.md#api_contract",
  },
  {
    module: "Matrix 智能体工作台",
    page: "workbench",
    service: "src/services/workbench.ts",
    name: "getWorkbenchMenus",
    method: "GET",
    path: "/matrix/workbench/menus",
    paramsType: "GetWorkbenchMenusParams",
    bodyType: "-",
    responseType: "GetWorkbenchMenusResponse",
    params: ["agentId"],
    mock: "覆盖菜单选中、资源数量、管理入口",
    mockFile: "src/services/workbench.mock.ts",
    replacement: "真实菜单权限与资源统计接口待后端确认",
    source: "docs/prd/workbench.md#api_contract",
  },
  {
    module: "Matrix 智能体工作台",
    page: "workbench",
    service: "src/services/workbench.ts",
    name: "searchWorkbenchObjectTypes",
    method: "GET",
    path: "/matrix/workbench/object-types/search",
    paramsType: "SearchWorkbenchObjectTypesParams",
    bodyType: "-",
    responseType: "SearchWorkbenchObjectTypesResponse",
    params: ["agentId", "keyword"],
    mock: "覆盖名称模糊搜索与无结果",
    mockFile: "src/services/workbench.mock.ts",
    replacement: "后端搜索优先级待确认",
    source: "docs/prd/workbench.md#api_contract",
  },
  {
    module: "Matrix 智能体工作台",
    page: "workbench",
    service: "src/services/workbench.ts",
    name: "getWorkbenchCreatePermissions",
    method: "GET",
    path: "/matrix/workbench/create-permissions",
    paramsType: "GetWorkbenchCreatePermissionsParams",
    bodyType: "-",
    responseType: "GetWorkbenchCreatePermissionsResponse",
    params: ["agentId"],
    mock: "覆盖有权限与无权限",
    mockFile: "src/services/workbench.mock.ts",
    replacement: "真实权限码待权限系统确认",
    source: "docs/prd/workbench.md#api_contract",
  },
] satisfies ApiDocEntry[];
