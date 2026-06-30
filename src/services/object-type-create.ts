import { httpClient } from "@/services/client";
import type { ApiDocEntry } from "@/types/api-doc";
import type {
  CreateObjectTypeBody,
  CreateObjectTypeResponse,
  GetAvailableDatasetsResponse,
  GetObjectTypeCreatePermissionsResponse,
  ValidateDatasetNameBody,
  ValidateNameResponse,
  ValidateObjectTypeEnglishNameBody,
  ValidateObjectTypeIdBody,
  ValidateObjectTypeNameBody,
} from "@/types/object-type-create/api";

export const getObjectTypeCreatePermissions = () => {
  return httpClient.get<GetObjectTypeCreatePermissionsResponse>(
    "/matrix/object-types/create-permissions",
  );
};

export const getAvailableDatasets = () => {
  return httpClient.get<GetAvailableDatasetsResponse>(
    "/matrix/object-types/available-datasets",
  );
};

export const validateDatasetName = (body: ValidateDatasetNameBody) => {
  return httpClient.post<ValidateNameResponse>(
    "/matrix/object-types/validate-dataset-name",
    body,
  );
};

export const validateObjectTypeName = (body: ValidateObjectTypeNameBody) => {
  return httpClient.post<ValidateNameResponse>(
    "/matrix/object-types/validate-name",
    body,
  );
};

export const validateObjectTypeEnglishName = (
  body: ValidateObjectTypeEnglishNameBody,
) => {
  return httpClient.post<ValidateNameResponse>(
    "/matrix/object-types/validate-english-name",
    body,
  );
};

export const validateObjectTypeId = (body: ValidateObjectTypeIdBody) => {
  return httpClient.post<ValidateNameResponse>(
    "/matrix/object-types/validate-id",
    body,
  );
};

export const createObjectType = (body: CreateObjectTypeBody) => {
  return httpClient.post<CreateObjectTypeResponse>(
    "/matrix/object-types/create",
    body,
  );
};

export const objectTypeCreateApiDocs = [
  {
    module: "对象类型创建",
    page: "object-type-create",
    service: "src/services/object-type-create.ts",
    name: "getObjectTypeCreatePermissions",
    method: "GET",
    path: "/matrix/object-types/create-permissions",
    paramsType: "-",
    bodyType: "-",
    responseType: "GetObjectTypeCreatePermissionsResponse",
    params: [],
    mock: "覆盖可创建与无权限",
    mockFile: "src/services/object-type-create.mock.ts",
    replacement: "真实权限字段待权限系统确认",
    source: "docs/prd/object-type-create.md#api_contract",
  },
  {
    module: "对象类型创建",
    page: "object-type-create",
    service: "src/services/object-type-create.ts",
    name: "getAvailableDatasets",
    method: "GET",
    path: "/matrix/object-types/available-datasets",
    paramsType: "-",
    bodyType: "-",
    responseType: "GetAvailableDatasetsResponse",
    params: [],
    mock: "覆盖已有数据集与字段列表",
    mockFile: "src/services/object-type-create.mock.ts",
    replacement: "真实数据集目录接口待确认",
    source: "docs/prd/object-type-create.md#api_contract",
  },
  {
    module: "对象类型创建",
    page: "object-type-create",
    service: "src/services/object-type-create.ts",
    name: "validateDatasetName",
    method: "POST",
    path: "/matrix/object-types/validate-dataset-name",
    paramsType: "-",
    bodyType: "ValidateDatasetNameBody",
    responseType: "ValidateNameResponse",
    params: ["datasetName"],
    mock: "覆盖合法名称与重复名称",
    mockFile: "src/services/object-type-create.mock.ts",
    replacement: "唯一性校验口径待后端确认",
    source: "docs/prd/object-type-create.md#api_contract",
  },
  {
    module: "对象类型创建",
    page: "object-type-create",
    service: "src/services/object-type-create.ts",
    name: "validateObjectTypeName",
    method: "POST",
    path: "/matrix/object-types/validate-name",
    paramsType: "-",
    bodyType: "ValidateObjectTypeNameBody",
    responseType: "ValidateNameResponse",
    params: ["objectTypeName"],
    mock: "覆盖合法名称与重复名称",
    mockFile: "src/services/object-type-create.mock.ts",
    replacement: "真实校验接口待后端确认",
    source: "docs/prd/object-type-create.md#api_contract",
  },
  {
    module: "对象类型创建",
    page: "object-type-create",
    service: "src/services/object-type-create.ts",
    name: "validateObjectTypeEnglishName",
    method: "POST",
    path: "/matrix/object-types/validate-english-name",
    paramsType: "-",
    bodyType: "ValidateObjectTypeEnglishNameBody",
    responseType: "ValidateNameResponse",
    params: ["objectTypeEnglishName"],
    mock: "覆盖合法英文名与重复英文名",
    mockFile: "src/services/object-type-create.mock.ts",
    replacement: "真实校验接口待后端确认",
    source: "docs/prd/object-type-create.md#api_contract",
  },
  {
    module: "对象类型创建",
    page: "object-type-create",
    service: "src/services/object-type-create.ts",
    name: "validateObjectTypeId",
    method: "POST",
    path: "/matrix/object-types/validate-id",
    paramsType: "-",
    bodyType: "ValidateObjectTypeIdBody",
    responseType: "ValidateNameResponse",
    params: ["objectTypeId"],
    mock: "覆盖合法 ID 与重复 ID",
    mockFile: "src/services/object-type-create.mock.ts",
    replacement: "真实校验接口待后端确认",
    source: "docs/prd/object-type-create.md#api_contract",
  },
  {
    module: "对象类型创建",
    page: "object-type-create",
    service: "src/services/object-type-create.ts",
    name: "createObjectType",
    method: "POST",
    path: "/matrix/object-types/create",
    paramsType: "-",
    bodyType: "CreateObjectTypeBody",
    responseType: "CreateObjectTypeResponse",
    params: ["draft"],
    mock: "覆盖提交成功与提交失败",
    mockFile: "src/services/object-type-create.mock.ts",
    replacement: "真实创建接口和返回 ID 待后端确认",
    source: "docs/prd/object-type-create.md#api_contract",
  },
] satisfies ApiDocEntry[];
