import type {
  ActionOption,
  DatasetOption,
  ObjectTypeCreateDraft,
} from "./model";

export interface GetObjectTypeCreatePermissionsResponse {
  canCreateObjectType: boolean;
}

export interface GetAvailableDatasetsResponse {
  datasets: DatasetOption[];
}

export interface ValidateDatasetNameBody {
  datasetName: string;
}

export interface ValidateNameResponse {
  valid: boolean;
  message?: string;
}

export interface ValidateObjectTypeNameBody {
  objectTypeName: string;
}

export interface ValidateObjectTypeEnglishNameBody {
  objectTypeEnglishName: string;
}

export interface ValidateObjectTypeIdBody {
  objectTypeId: string;
}

export interface CreateObjectTypeBody {
  draft: ObjectTypeCreateDraft;
}

export interface CreateObjectTypeResponse {
  id: string;
  actions: ActionOption[];
}
