import type { ObjectTypeListItem, ObjectTypeListPermission } from "./model";

export interface GetObjectTypeListParams {
  pageNo: number;
  pageSize: number;
  keyword?: string;
}

export interface GetObjectTypeListResponse {
  list: ObjectTypeListItem[];
  total: number;
}

export type SearchObjectTypesParams = GetObjectTypeListParams;

export type SearchObjectTypesResponse = GetObjectTypeListResponse;

export interface RefreshObjectTypeListParams {
  pageNo: number;
  pageSize: number;
  keyword?: string;
}

export type RefreshObjectTypeListResponse = GetObjectTypeListResponse;

export interface GetObjectTypeListPermissionsResponse {
  permissions: ObjectTypeListPermission;
}
