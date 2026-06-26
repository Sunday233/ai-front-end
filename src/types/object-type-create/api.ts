import type { DatasetDetail, DatasetRow, ObjectGroupOption, ObjectTypeCreateDraft } from "./model";

export interface ValidateNameParams {
  value: string;
}

export interface ValidateNameResponse {
  valid: boolean;
  message?: string;
}

export interface GetObjectTypeCreatePermissionsResponse {
  canCreate: boolean;
}

export interface GetAvailableDatasetsResponse {
  datasets: DatasetRow[];
  detail: DatasetDetail;
}

export interface GetObjectGroupsResponse {
  groups: ObjectGroupOption[];
}

export interface CreateObjectTypeBody {
  datasetName?: string;
  datasetPath?: string;
  existingDatasetId?: string;
  objectTypeName: string;
  objectTypeEnglishName?: string;
  objectTypeId: string;
  description?: string;
  objectGroupId?: string;
}

export interface CreateObjectTypeResponse {
  id: string;
  name: string;
}

export type GetObjectTypeCreateDraftResponse = ObjectTypeCreateDraft;
