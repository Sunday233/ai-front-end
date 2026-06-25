import { httpClient } from '@/services/client';
import type { ApiDocEntry } from '@/types/api-doc';
import type {
  CreateObjectTypeRequest,
  CreateObjectTypeResponse,
  GetAvailableDatasetsParams,
  GetAvailableDatasetsResponse,
  GetObjectTypeCreatePermissionsResponse,
  ValidateDatasetNameParams,
  ValidateObjectTypeEnglishNameParams,
  ValidateObjectTypeIdParams,
  ValidateObjectTypeNameParams,
  ValidationResponse,
} from '@/types/object-type-create/api';

const objectTypeCreatePaths = {
  permissions: '/mock/object-type-create/permissions',
  datasets: '/mock/object-type-create/datasets',
  validateDatasetName: '/mock/object-type-create/validate-dataset-name',
  validateObjectTypeName: '/mock/object-type-create/validate-name',
  validateObjectTypeEnglishName:
    '/mock/object-type-create/validate-english-name',
  validateObjectTypeId: '/mock/object-type-create/validate-id',
  create: '/mock/object-type-create',
};

export const getObjectTypeCreatePermissions = async () => {
  return httpClient.get<GetObjectTypeCreatePermissionsResponse>(
    objectTypeCreatePaths.permissions,
  );
};

export const getAvailableDatasets = async (
  params: GetAvailableDatasetsParams,
) => {
  return httpClient.get<GetAvailableDatasetsResponse>(
    objectTypeCreatePaths.datasets,
    { params },
  );
};

export const validateDatasetNameRequest = async (
  params: ValidateDatasetNameParams,
) => {
  return httpClient.get<ValidationResponse>(
    objectTypeCreatePaths.validateDatasetName,
    { params },
  );
};

export const validateObjectTypeNameRequest = async (
  params: ValidateObjectTypeNameParams,
) => {
  return httpClient.get<ValidationResponse>(
    objectTypeCreatePaths.validateObjectTypeName,
    { params },
  );
};

export const validateObjectTypeEnglishNameRequest = async (
  params: ValidateObjectTypeEnglishNameParams,
) => {
  return httpClient.get<ValidationResponse>(
    objectTypeCreatePaths.validateObjectTypeEnglishName,
    { params },
  );
};

export const validateObjectTypeIdRequest = async (
  params: ValidateObjectTypeIdParams,
) => {
  return httpClient.get<ValidationResponse>(
    objectTypeCreatePaths.validateObjectTypeId,
    { params },
  );
};

export const createObjectType = async (body: CreateObjectTypeRequest) => {
  return httpClient.post<CreateObjectTypeResponse>(
    objectTypeCreatePaths.create,
    body,
  );
};

export const objectTypeCreateApiDocs = [
  {
    module: '对象类型创建',
    page: 'object-type-create',
    service: 'src/services/object-type-create.ts',
    name: 'getObjectTypeCreatePermissions',
    method: 'GET',
    path: objectTypeCreatePaths.permissions,
    paramsType: '-',
    bodyType: '-',
    responseType: 'GetObjectTypeCreatePermissionsResponse',
    params: [],
    mock: '覆盖有创建权限、无权限；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/object-type-create.mock.ts',
    replacement: '真实权限接口待后端权限系统确认',
    source: 'docs/prd/object-type-create.md#CHAPTER-06',
  },
  {
    module: '对象类型创建',
    page: 'object-type-create',
    service: 'src/services/object-type-create.ts',
    name: 'getAvailableDatasets',
    method: 'GET',
    path: objectTypeCreatePaths.datasets,
    paramsType: 'GetAvailableDatasetsParams',
    bodyType: '-',
    responseType: 'GetAvailableDatasetsResponse',
    params: ['keyword', 'pageNo', 'pageSize'],
    mock: '覆盖数据集列表、列信息、数据预览；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/object-type-create.mock.ts',
    replacement: '真实数据集目录接口待后端确认',
    source: 'docs/prd/object-type-create.md#CHAPTER-06',
  },
  {
    module: '对象类型创建',
    page: 'object-type-create',
    service: 'src/services/object-type-create.ts',
    name: 'validateDatasetNameRequest',
    method: 'GET',
    path: objectTypeCreatePaths.validateDatasetName,
    paramsType: 'ValidateDatasetNameParams',
    bodyType: '-',
    responseType: 'ValidationResponse',
    params: ['datasetName'],
    mock: '覆盖合法、重名、格式错误；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/object-type-create.mock.ts',
    replacement: '真实唯一性校验接口待后端确认',
    source: 'docs/prd/object-type-create.md#CHAPTER-06',
  },
  {
    module: '对象类型创建',
    page: 'object-type-create',
    service: 'src/services/object-type-create.ts',
    name: 'validateObjectTypeNameRequest',
    method: 'GET',
    path: objectTypeCreatePaths.validateObjectTypeName,
    paramsType: 'ValidateObjectTypeNameParams',
    bodyType: '-',
    responseType: 'ValidationResponse',
    params: ['objectTypeName'],
    mock: '覆盖合法、重名、长度错误；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/object-type-create.mock.ts',
    replacement: '真实对象类型名称唯一性接口待后端确认',
    source: 'docs/prd/object-type-create.md#CHAPTER-06',
  },
  {
    module: '对象类型创建',
    page: 'object-type-create',
    service: 'src/services/object-type-create.ts',
    name: 'validateObjectTypeEnglishNameRequest',
    method: 'GET',
    path: objectTypeCreatePaths.validateObjectTypeEnglishName,
    paramsType: 'ValidateObjectTypeEnglishNameParams',
    bodyType: '-',
    responseType: 'ValidationResponse',
    params: ['objectTypeEnglishName'],
    mock: '覆盖合法、重名、格式错误；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/object-type-create.mock.ts',
    replacement: '真实英文名唯一性接口待后端确认',
    source: 'docs/prd/object-type-create.md#CHAPTER-06',
  },
  {
    module: '对象类型创建',
    page: 'object-type-create',
    service: 'src/services/object-type-create.ts',
    name: 'validateObjectTypeIdRequest',
    method: 'GET',
    path: objectTypeCreatePaths.validateObjectTypeId,
    paramsType: 'ValidateObjectTypeIdParams',
    bodyType: '-',
    responseType: 'ValidationResponse',
    params: ['objectTypeId'],
    mock: '覆盖合法、重名、风险提示；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/object-type-create.mock.ts',
    replacement: '真实对象类型 ID 校验接口待后端确认',
    source: 'docs/prd/object-type-create.md#CHAPTER-06',
  },
  {
    module: '对象类型创建',
    page: 'object-type-create',
    service: 'src/services/object-type-create.ts',
    name: 'createObjectType',
    method: 'POST',
    path: objectTypeCreatePaths.create,
    paramsType: '-',
    bodyType: 'CreateObjectTypeRequest',
    responseType: 'CreateObjectTypeResponse',
    params: [],
    mock: '覆盖提交成功、提交失败；当前 path 仅为前端 mock 拦截路径',
    mockFile: 'src/services/object-type-create.mock.ts',
    replacement: '真实创建接口 path 与返回结构待后端确认',
    source: 'docs/prd/object-type-create.md#CHAPTER-06',
  },
] satisfies ApiDocEntry[];
