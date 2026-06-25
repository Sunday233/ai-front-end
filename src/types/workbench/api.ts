import type {
  WorkbenchCreatePermissions,
  WorkbenchObjectTypeCard,
  WorkbenchResourceMenu,
} from './model';

export interface WorkbenchBaseParams {
  workspaceId: string;
  agentId: string;
}

export interface SearchWorkbenchObjectTypesParams extends WorkbenchBaseParams {
  keyword?: string;
}

export interface GetWorkbenchSummaryResponse {
  workspaceId: string;
  workspaceName: string;
  agentId: string;
  agentName: string;
  recentObjectTypes: WorkbenchObjectTypeCard[];
  favoriteObjectTypes: WorkbenchObjectTypeCard[];
}

export interface GetWorkbenchMenusResponse {
  menus: WorkbenchResourceMenu[];
}

export interface SearchWorkbenchObjectTypesResponse {
  list: WorkbenchObjectTypeCard[];
}

export interface GetWorkbenchCreatePermissionsResponse
  extends WorkbenchCreatePermissions {}
