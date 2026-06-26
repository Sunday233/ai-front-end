import { httpClient } from "@/services/client";
import type { ApiDocEntry } from "@/types/api-doc";
import type {
  GetObjectTypeListParams,
  GetObjectTypeListPermissionsResponse,
  GetObjectTypeListResponse,
  RefreshObjectTypeListResponse,
  SearchObjectTypesParams,
  SearchObjectTypesResponse,
} from "@/types/object-type-list/api";

const BASE_PATH = "/mock/object-types";

export const getObjectTypeList = (params: GetObjectTypeListParams) => {
  return httpClient.get<GetObjectTypeListResponse>(BASE_PATH, { params });
};

export const searchObjectTypes = (params: SearchObjectTypesParams) => {
  return httpClient.get<SearchObjectTypesResponse>(`${BASE_PATH}/search`, { params });
};

export const refreshObjectTypeList = (params: GetObjectTypeListParams) => {
  return httpClient.get<RefreshObjectTypeListResponse>(`${BASE_PATH}/refresh`, { params });
};

export const getObjectTypeListPermissions = () => {
  return httpClient.get<GetObjectTypeListPermissionsResponse>(`${BASE_PATH}/permissions`);
};

export const objectTypeListApiDocs = [
  {
    module: "对象类型列表",
    page: "object-type-list",
    service: "src/services/object-type-list.ts",
    name: "getObjectTypeList",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}`,
    paramsType: "GetObjectTypeListParams",
    bodyType: "-",
    responseType: "GetObjectTypeListResponse",
    params: ["pageNo", "pageSize", "keyword"],
    mock: "覆盖默认列表、空列表、搜索无结果、加载失败、无新建权限",
    mockFile: "src/services/object-type-list.mock.ts",
    replacement: "后端列表接口路径、状态枚举和排序口径确认后替换 path 与枚举映射",
    source: "docs/prd/object-type-list.md#CHAPTER-06",
  },
  {
    module: "对象类型列表",
    page: "object-type-list",
    service: "src/services/object-type-list.ts",
    name: "searchObjectTypes",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}/search`,
    paramsType: "SearchObjectTypesParams",
    bodyType: "-",
    responseType: "SearchObjectTypesResponse",
    params: ["pageNo", "pageSize", "keyword"],
    mock: "覆盖精确匹配、前缀匹配、模糊匹配与高亮展示",
    mockFile: "src/services/object-type-list.mock.ts",
    replacement: "后端搜索接口与高亮协议确认后替换",
    source: "docs/prd/object-type-list.md#CHAPTER-06",
  },
  {
    module: "对象类型列表",
    page: "object-type-list",
    service: "src/services/object-type-list.ts",
    name: "refreshObjectTypeList",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}/refresh`,
    paramsType: "GetObjectTypeListParams",
    bodyType: "-",
    responseType: "RefreshObjectTypeListResponse",
    params: ["pageNo", "pageSize", "keyword"],
    mock: "复用当前筛选条件返回列表",
    mockFile: "src/services/object-type-list.mock.ts",
    replacement: "后端刷新语义确认后替换",
    source: "docs/prd/object-type-list.md#CHAPTER-06",
  },
  {
    module: "对象类型列表",
    page: "object-type-list",
    service: "src/services/object-type-list.ts",
    name: "getObjectTypeListPermissions",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}/permissions`,
    paramsType: "-",
    bodyType: "-",
    responseType: "GetObjectTypeListPermissionsResponse",
    params: [],
    mock: "覆盖有新建权限与无新建权限",
    mockFile: "src/services/object-type-list.mock.ts",
    replacement: "真实权限系统接入后替换",
    source: "docs/prd/object-type-list.md#CHAPTER-06",
  },
] satisfies ApiDocEntry[];
