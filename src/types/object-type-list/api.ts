import type { ObjectTypeListItem, ObjectTypeListPermissions } from "./model";

export interface GetObjectTypeListParams {
  pageNo: number;
  pageSize: number;
  keyword?: string;
}

export type SearchObjectTypesParams = GetObjectTypeListParams;

export interface GetObjectTypeListResponse {
  list: ObjectTypeListItem[];
  total: number;
  pageNo: number;
  pageSize: number;
}

export type SearchObjectTypesResponse = GetObjectTypeListResponse;
export type RefreshObjectTypeListResponse = GetObjectTypeListResponse;
export type GetObjectTypeListPermissionsResponse = ObjectTypeListPermissions;
