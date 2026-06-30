import { httpClient } from "@/services/client";
import type { ApiDocEntry } from "@/types/api-doc";
import type {
  GetObjectTypeListParams,
  GetObjectTypeListPermissionsResponse,
  GetObjectTypeListResponse,
  RefreshObjectTypeListParams,
  RefreshObjectTypeListResponse,
  SearchObjectTypesParams,
  SearchObjectTypesResponse,
} from "@/types/object-type-list/api";

export const getObjectTypeList = (params: GetObjectTypeListParams) => {
  return httpClient.get<GetObjectTypeListResponse>("/matrix/object-types", {
    params,
  });
};

export const searchObjectTypes = (params: SearchObjectTypesParams) => {
  return httpClient.get<SearchObjectTypesResponse>(
    "/matrix/object-types/search",
    { params },
  );
};

export const refreshObjectTypeList = (params: RefreshObjectTypeListParams) => {
  return httpClient.get<RefreshObjectTypeListResponse>(
    "/matrix/object-types/refresh",
    { params },
  );
};

export const getObjectTypeListPermissions = () => {
  return httpClient.get<GetObjectTypeListPermissionsResponse>(
    "/matrix/object-types/permissions",
  );
};

export const objectTypeListApiDocs = [
  {
    module: "对象类型列表",
    page: "object-type-list",
    service: "src/services/object-type-list.ts",
    name: "getObjectTypeList",
    method: "GET",
    path: "/matrix/object-types",
    paramsType: "GetObjectTypeListParams",
    bodyType: "-",
    responseType: "GetObjectTypeListResponse",
    params: ["pageNo", "pageSize", "keyword"],
    mock: "覆盖默认列表、空列表、无新建权限",
    mockFile: "src/services/object-type-list.mock.ts",
    replacement: "真实列表路径、状态枚举待后端确认",
    source: "docs/prd/object-type-list.md#api_contract",
  },
  {
    module: "对象类型列表",
    page: "object-type-list",
    service: "src/services/object-type-list.ts",
    name: "searchObjectTypes",
    method: "GET",
    path: "/matrix/object-types/search",
    paramsType: "SearchObjectTypesParams",
    bodyType: "-",
    responseType: "SearchObjectTypesResponse",
    params: ["pageNo", "pageSize", "keyword"],
    mock: "覆盖精确匹配、前缀匹配、模糊匹配、搜索无结果",
    mockFile: "src/services/object-type-list.mock.ts",
    replacement: "真实搜索排序口径待后端确认",
    source: "docs/prd/object-type-list.md#api_contract",
  },
  {
    module: "对象类型列表",
    page: "object-type-list",
    service: "src/services/object-type-list.ts",
    name: "refreshObjectTypeList",
    method: "GET",
    path: "/matrix/object-types/refresh",
    paramsType: "RefreshObjectTypeListParams",
    bodyType: "-",
    responseType: "RefreshObjectTypeListResponse",
    params: ["pageNo", "pageSize", "keyword"],
    mock: "复用当前筛选条件刷新",
    mockFile: "src/services/object-type-list.mock.ts",
    replacement: "刷新是否独立接口待后端确认",
    source: "docs/prd/object-type-list.md#api_contract",
  },
  {
    module: "对象类型列表",
    page: "object-type-list",
    service: "src/services/object-type-list.ts",
    name: "getObjectTypeListPermissions",
    method: "GET",
    path: "/matrix/object-types/permissions",
    paramsType: "-",
    bodyType: "-",
    responseType: "GetObjectTypeListPermissionsResponse",
    params: [],
    mock: "覆盖可新建与仅可详情",
    mockFile: "src/services/object-type-list.mock.ts",
    replacement: "真实权限字段待权限系统确认",
    source: "docs/prd/object-type-list.md#api_contract",
  },
] satisfies ApiDocEntry[];
