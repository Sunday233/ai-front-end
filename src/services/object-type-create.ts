import { httpClient } from "@/services/client";
import type { ApiDocEntry } from "@/types/api-doc";
import type {
  CreateObjectTypeBody,
  CreateObjectTypeResponse,
  GetAvailableDatasetsResponse,
  GetObjectGroupsResponse,
  GetObjectTypeCreateDraftResponse,
  GetObjectTypeCreatePermissionsResponse,
  ValidateNameParams,
  ValidateNameResponse,
} from "@/types/object-type-create/api";

const BASE_PATH = "/mock/object-type-create";

export const getObjectTypeCreatePermissions = () => {
  return httpClient.get<GetObjectTypeCreatePermissionsResponse>(`${BASE_PATH}/permissions`);
};

export const getAvailableDatasets = () => {
  return httpClient.get<GetAvailableDatasetsResponse>(`${BASE_PATH}/datasets`);
};

export const getObjectTypeCreateDraft = () => {
  return httpClient.get<GetObjectTypeCreateDraftResponse>(`${BASE_PATH}/draft`);
};

export const getObjectGroups = () => {
  return httpClient.get<GetObjectGroupsResponse>(`${BASE_PATH}/groups`);
};

export const validateDatasetName = (params: ValidateNameParams) => {
  return httpClient.get<ValidateNameResponse>(`${BASE_PATH}/validate-dataset-name`, { params });
};

export const validateObjectTypeName = (params: ValidateNameParams) => {
  return httpClient.get<ValidateNameResponse>(`${BASE_PATH}/validate-object-type-name`, { params });
};

export const validateObjectTypeEnglishName = (params: ValidateNameParams) => {
  return httpClient.get<ValidateNameResponse>(`${BASE_PATH}/validate-object-type-english-name`, { params });
};

export const validateObjectTypeId = (params: ValidateNameParams) => {
  return httpClient.get<ValidateNameResponse>(`${BASE_PATH}/validate-object-type-id`, { params });
};

export const createObjectType = (body: CreateObjectTypeBody) => {
  return httpClient.post<CreateObjectTypeResponse>(`${BASE_PATH}/submit`, body);
};

export const objectTypeCreateApiDocs = [
  {
    module: "对象类型创建",
    page: "object-type-create",
    service: "src/services/object-type-create.ts",
    name: "getObjectTypeCreatePermissions",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}/permissions`,
    paramsType: "-",
    bodyType: "-",
    responseType: "GetObjectTypeCreatePermissionsResponse",
    params: [],
    mock: "覆盖有权限与无权限",
    mockFile: "src/services/object-type-create.mock.ts",
    replacement: "真实权限系统接入后替换",
    source: "docs/prd/object-type-create.md#CHAPTER-06",
  },
  {
    module: "对象类型创建",
    page: "object-type-create",
    service: "src/services/object-type-create.ts",
    name: "getAvailableDatasets",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}/datasets`,
    paramsType: "-",
    bodyType: "-",
    responseType: "GetAvailableDatasetsResponse",
    params: [],
    mock: "覆盖数据集列表、列信息、数据预览",
    mockFile: "src/services/object-type-create.mock.ts",
    replacement: "真实数据集目录接口确认后替换",
    source: "docs/prd/object-type-create.md#CHAPTER-06",
  },
  {
    module: "对象类型创建",
    page: "object-type-create",
    service: "src/services/object-type-create.ts",
    name: "validateDatasetName / validateObjectTypeName / validateObjectTypeEnglishName / validateObjectTypeId",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}/validate-*`,
    paramsType: "ValidateNameParams",
    bodyType: "-",
    responseType: "ValidateNameResponse",
    params: ["value"],
    mock: "覆盖校验成功与重名失败",
    mockFile: "src/services/object-type-create.mock.ts",
    replacement: "后端唯一性校验口径确认后替换",
    source: "docs/prd/object-type-create.md#CHAPTER-06",
  },
  {
    module: "对象类型创建",
    page: "object-type-create",
    service: "src/services/object-type-create.ts",
    name: "createObjectType",
    method: "待后端确认",
    path: `待后端确认；当前 mock path ${BASE_PATH}/submit`,
    paramsType: "-",
    bodyType: "CreateObjectTypeBody",
    responseType: "CreateObjectTypeResponse",
    params: [],
    mock: "覆盖提交成功与提交失败",
    mockFile: "src/services/object-type-create.mock.ts",
    replacement: "后端创建接口确认后替换",
    source: "docs/prd/object-type-create.md#CHAPTER-06",
  },
] satisfies ApiDocEntry[];
