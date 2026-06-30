import type {
  WorkbenchMenuItem,
  WorkbenchObjectTypeCard,
  WorkbenchSummary,
} from "./model";

export interface GetWorkbenchSummaryParams {
  workspaceId: string;
  agentId: string;
}

export interface GetWorkbenchSummaryResponse {
  summary: WorkbenchSummary;
}

export interface GetWorkbenchMenusParams {
  agentId: string;
}

export interface GetWorkbenchMenusResponse {
  menus: WorkbenchMenuItem[];
}

export interface SearchWorkbenchObjectTypesParams {
  agentId: string;
  keyword?: string;
}

export interface SearchWorkbenchObjectTypesResponse {
  list: WorkbenchObjectTypeCard[];
}

export interface GetWorkbenchCreatePermissionsParams {
  agentId: string;
}

export interface GetWorkbenchCreatePermissionsResponse {
  canCreateObjectType: boolean;
  canCreateLink: boolean;
  canCreateAction: boolean;
  canCreateObjectGroup: boolean;
  canManageAgent: boolean;
}
