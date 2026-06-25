import { httpClient } from '@/services/client';
import type { ApiDocEntry } from '@/types/api-doc';
import type {
  GetWorkbenchCreatePermissionsResponse,
  GetWorkbenchMenusResponse,
  GetWorkbenchSummaryResponse,
  SearchWorkbenchObjectTypesParams,
  SearchWorkbenchObjectTypesResponse,
  WorkbenchBaseParams,
} from '@/types/workbench/api';

const workbenchPaths = {
  summary: '/mock/workbench/summary',
  menus: '/mock/workbench/menus',
  search: '/mock/workbench/object-types/search',
  permissions: '/mock/workbench/create-permissions',
};

export const getWorkbenchSummary = async (params: WorkbenchBaseParams) => {
  return httpClient.get<GetWorkbenchSummaryResponse>(workbenchPaths.summary, {
    params,
  });
};

export const getWorkbenchMenus = async (params: WorkbenchBaseParams) => {
  return httpClient.get<GetWorkbenchMenusResponse>(workbenchPaths.menus, {
    params,
  });
};

export const searchWorkbenchObjectTypes = async (
  params: SearchWorkbenchObjectTypesParams,
) => {
  return httpClient.get<SearchWorkbenchObjectTypesResponse>(
    workbenchPaths.search,
    { params },
  );
};

export const getWorkbenchCreatePermissions = async (
  params: WorkbenchBaseParams,
) => {
  return httpClient.get<GetWorkbenchCreatePermissionsResponse>(
    workbenchPaths.permissions,
    { params },
  );
};

export const workbenchApiDocs = [
  {
    module: 'Matrix 智能体工作台',
    page: 'workbench',
    service: 'src/services/workbench.ts',
    name: 'getWorkbenchSummary',
    method: 'GET',
    path: workbenchPaths.summary,
    paramsType: 'WorkbenchBaseParams',
    bodyType: '-',
    responseType: 'GetWorkbenchSummaryResponse',
    params: ['workspaceId', 'agentId'],
    mock: '覆盖默认态、空态、加载失败；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/workbench.mock.ts',
    replacement:
      '真实后端 method/path 与统计口径待确认后替换 path，调用层保持不变',
    source: 'docs/prd/workbench.md#CHAPTER-06',
  },
  {
    module: 'Matrix 智能体工作台',
    page: 'workbench',
    service: 'src/services/workbench.ts',
    name: 'getWorkbenchMenus',
    method: 'GET',
    path: workbenchPaths.menus,
    paramsType: 'WorkbenchBaseParams',
    bodyType: '-',
    responseType: 'GetWorkbenchMenusResponse',
    params: ['workspaceId', 'agentId'],
    mock: '覆盖资源菜单数量、管理权限显示；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/workbench.mock.ts',
    replacement: '真实菜单接口待后端确认后替换 path 与枚举映射',
    source: 'docs/prd/workbench.md#CHAPTER-06',
  },
  {
    module: 'Matrix 智能体工作台',
    page: 'workbench',
    service: 'src/services/workbench.ts',
    name: 'searchWorkbenchObjectTypes',
    method: 'GET',
    path: workbenchPaths.search,
    paramsType: 'SearchWorkbenchObjectTypesParams',
    bodyType: '-',
    responseType: 'SearchWorkbenchObjectTypesResponse',
    params: ['workspaceId', 'agentId', 'keyword'],
    mock: '覆盖搜索命中与搜索无结果；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/workbench.mock.ts',
    replacement: '真实搜索接口与排序规则待确认后替换 path',
    source: 'docs/prd/workbench.md#CHAPTER-06',
  },
  {
    module: 'Matrix 智能体工作台',
    page: 'workbench',
    service: 'src/services/workbench.ts',
    name: 'getWorkbenchCreatePermissions',
    method: 'GET',
    path: workbenchPaths.permissions,
    paramsType: 'WorkbenchBaseParams',
    bodyType: '-',
    responseType: 'GetWorkbenchCreatePermissionsResponse',
    params: ['workspaceId', 'agentId'],
    mock: '覆盖有新建权限、无新建权限；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/workbench.mock.ts',
    replacement: '真实权限字段与路径待后端权限系统确认',
    source: 'docs/prd/workbench.md#CHAPTER-06',
  },
] satisfies ApiDocEntry[];
