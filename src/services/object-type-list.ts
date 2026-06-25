import { httpClient } from '@/services/client';
import type { ApiDocEntry } from '@/types/api-doc';
import type {
  GetObjectTypeListParams,
  GetObjectTypeListPermissionsResponse,
  GetObjectTypeListResponse,
  RefreshObjectTypeListResponse,
  SearchObjectTypesResponse,
} from '@/types/object-type-list/api';

const objectTypeListPaths = {
  list: '/mock/object-types',
  search: '/mock/object-types/search',
  refresh: '/mock/object-types/refresh',
  permissions: '/mock/object-types/permissions',
};

export const getObjectTypeList = async (params: GetObjectTypeListParams) => {
  return httpClient.get<GetObjectTypeListResponse>(objectTypeListPaths.list, {
    params,
  });
};

export const searchObjectTypes = async (params: GetObjectTypeListParams) => {
  return httpClient.get<SearchObjectTypesResponse>(objectTypeListPaths.search, {
    params,
  });
};

export const refreshObjectTypeList = async (
  params: GetObjectTypeListParams,
) => {
  return httpClient.get<RefreshObjectTypeListResponse>(
    objectTypeListPaths.refresh,
    { params },
  );
};

export const getObjectTypeListPermissions = async () => {
  return httpClient.get<GetObjectTypeListPermissionsResponse>(
    objectTypeListPaths.permissions,
  );
};

export const objectTypeListApiDocs = [
  {
    module: '对象类型列表',
    page: 'object-type-list',
    service: 'src/services/object-type-list.ts',
    name: 'getObjectTypeList',
    method: 'GET',
    path: objectTypeListPaths.list,
    paramsType: 'GetObjectTypeListParams',
    bodyType: '-',
    responseType: 'GetObjectTypeListResponse',
    params: ['pageNo', 'pageSize', 'keyword'],
    mock: '覆盖默认列表、空列表；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/object-type-list.mock.ts',
    replacement: '真实后端列表 path 和状态枚举待确认后替换 path',
    source: 'docs/prd/object-type-list.md#CHAPTER-06',
  },
  {
    module: '对象类型列表',
    page: 'object-type-list',
    service: 'src/services/object-type-list.ts',
    name: 'searchObjectTypes',
    method: 'GET',
    path: objectTypeListPaths.search,
    paramsType: 'GetObjectTypeListParams',
    bodyType: '-',
    responseType: 'SearchObjectTypesResponse',
    params: ['pageNo', 'pageSize', 'keyword'],
    mock: '覆盖精确匹配、前缀匹配、模糊匹配、高亮展示；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/object-type-list.mock.ts',
    replacement: '真实搜索接口与排序算法待确认后替换 path',
    source: 'docs/prd/object-type-list.md#CHAPTER-06',
  },
  {
    module: '对象类型列表',
    page: 'object-type-list',
    service: 'src/services/object-type-list.ts',
    name: 'refreshObjectTypeList',
    method: 'GET',
    path: objectTypeListPaths.refresh,
    paramsType: 'GetObjectTypeListParams',
    bodyType: '-',
    responseType: 'RefreshObjectTypeListResponse',
    params: ['pageNo', 'pageSize', 'keyword'],
    mock: '覆盖刷新成功、加载失败；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/object-type-list.mock.ts',
    replacement: '真实刷新接口是否复用列表接口待后端确认',
    source: 'docs/prd/object-type-list.md#CHAPTER-06',
  },
  {
    module: '对象类型列表',
    page: 'object-type-list',
    service: 'src/services/object-type-list.ts',
    name: 'getObjectTypeListPermissions',
    method: 'GET',
    path: objectTypeListPaths.permissions,
    paramsType: '-',
    bodyType: '-',
    responseType: 'GetObjectTypeListPermissionsResponse',
    params: [],
    mock: '覆盖有新建权限、无新建权限；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/object-type-list.mock.ts',
    replacement: '真实权限字段待后端权限系统确认',
    source: 'docs/prd/object-type-list.md#CHAPTER-06',
  },
] satisfies ApiDocEntry[];
