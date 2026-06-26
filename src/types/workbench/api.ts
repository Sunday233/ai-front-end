import type { WorkbenchCreatePermissions, WorkbenchResourceMenu, WorkbenchSummary } from "./model";

export interface SearchWorkbenchObjectTypesParams {
  keyword: string;
}

export type GetWorkbenchSummaryResponse = WorkbenchSummary;

export interface GetWorkbenchMenusResponse {
  menus: WorkbenchResourceMenu[];
}

export interface SearchWorkbenchObjectTypesResponse {
  list: WorkbenchSummary["favoriteObjectTypes"];
}

export type GetWorkbenchCreatePermissionsResponse = WorkbenchCreatePermissions;
