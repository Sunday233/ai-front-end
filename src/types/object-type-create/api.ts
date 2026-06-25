import type { DatasetListItem, ObjectTypeCreateDraft } from './model';

export interface GetAvailableDatasetsParams {
  keyword?: string;
  pageNo: number;
  pageSize: number;
}

export interface GetObjectTypeCreatePermissionsResponse {
  canCreateObjectType: boolean;
}

export interface GetAvailableDatasetsResponse {
  list: DatasetListItem[];
  total: number;
}

export interface ValidateDatasetNameParams {
  datasetName: string;
}

export interface ValidateObjectTypeNameParams {
  objectTypeName: string;
}

export interface ValidateObjectTypeEnglishNameParams {
  objectTypeEnglishName: string;
}

export interface ValidateObjectTypeIdParams {
  objectTypeId: string;
}

export interface ValidationResponse {
  valid: boolean;
  message?: string;
}

export type CreateObjectTypeRequest = ObjectTypeCreateDraft;

export interface CreateObjectTypeResponse {
  id: string;
  name: string;
}
