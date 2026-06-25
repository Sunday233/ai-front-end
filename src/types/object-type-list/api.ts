import type { ObjectTypeListItem } from './model';

export interface GetObjectTypeListParams {
  pageNo: number;
  pageSize: number;
  keyword?: string;
}

export interface GetObjectTypeListResponse {
  list: ObjectTypeListItem[];
  total: number;
}

export interface SearchObjectTypesResponse extends GetObjectTypeListResponse {}

export interface RefreshObjectTypeListResponse
  extends GetObjectTypeListResponse {}

export interface GetObjectTypeListPermissionsResponse {
  canCreate: boolean;
  canViewDetail: boolean;
}
