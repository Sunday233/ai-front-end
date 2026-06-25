import type MockAdapter from 'axios-mock-adapter';
import type { ApiEnvelope } from '@/services/client';
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
import type { DatasetListItem } from '@/types/object-type-create/model';
import {
  validateDatasetName,
  validateObjectTypeId,
  validateObjectTypeName,
} from '@/utils/object-type-create';

export const employeeDataset: DatasetListItem = {
  datasetId: 'dataset-employees',
  name: 'employees',
  path: 'yyy == 444',
  sourceType: 'integration',
  tableType: 'table',
  columns: [
    {
      fieldName: 'emp_no',
      displayName: 'emp_no',
      fieldType: 'int',
      primary: true,
    },
    { fieldName: 'birth_date', displayName: 'birth_date', fieldType: 'date' },
    { fieldName: 'first_name', displayName: 'first_name', fieldType: 'string' },
    { fieldName: 'last_name', displayName: 'last_name', fieldType: 'string' },
    { fieldName: 'gender', displayName: 'gender', fieldType: 'string' },
    { fieldName: 'hight', displayName: 'hight', fieldType: 'float' },
  ],
  previewRows: [
    {
      emp_no: '10002',
      birth_date: '1964-06-02',
      first_name: 'Bezalel',
      last_name: 'Simmel',
      gender: 'F',
      hight: '172.3',
    },
    {
      emp_no: '10006',
      birth_date: '1953-04-20',
      first_name: 'Anneke',
      last_name: 'Preusig',
      gender: 'M',
      hight: '168.2',
    },
    {
      emp_no: '10017',
      birth_date: '1958-07-06',
      first_name: 'Cristinel',
      last_name: 'Bouloucos',
      gender: 'F',
      hight: '181.1',
    },
    {
      emp_no: '10025',
      birth_date: '1958-10-31',
      first_name: 'Prasadra',
      last_name: 'Heyers',
      gender: 'M',
      hight: '176.5',
    },
    {
      emp_no: '10035',
      birth_date: '1953-02-08',
      first_name: 'Alain',
      last_name: 'Chappelet',
      gender: 'M',
      hight: '170.6',
    },
    {
      emp_no: '10037',
      birth_date: '1963-07-22',
      first_name: 'Pradeep',
      last_name: 'Makrucki',
      gender: 'M',
      hight: '174.9',
    },
  ],
};

const datasets: DatasetListItem[] = [
  {
    datasetId: 'dataset-as',
    name: 'as',
    path: '陈珍的第八个账号的个人项目',
    sourceType: 'manual',
    tableType: 'table',
    columns: employeeDataset.columns,
    previewRows: employeeDataset.previewRows,
  },
  employeeDataset,
  {
    datasetId: 'dataset-work-report',
    name: '报工数据',
    path: 'yyy == 444',
    sourceType: 'manual',
    tableType: 'table',
    columns: employeeDataset.columns,
    previewRows: employeeDataset.previewRows,
  },
  {
    datasetId: 'dataset-parts',
    name: '零件信息',
    path: 'yyy == 444',
    sourceType: 'manual',
    tableType: 'table',
    columns: employeeDataset.columns,
    previewRows: employeeDataset.previewRows,
  },
  {
    datasetId: 'dataset-kejie',
    name: '调整后kejie',
    path: 'yyy == 444',
    sourceType: 'manual',
    tableType: 'table',
    columns: employeeDataset.columns,
    previewRows: employeeDataset.previewRows,
  },
];

const ok = <T>(data: T): [number, ApiEnvelope<T>] => [
  200,
  { code: 0, msg: 'ok', data },
];

const toValidationResponse = (message: string | null): ValidationResponse => {
  return message ? { valid: false, message } : { valid: true };
};

export const setupObjectTypeCreateMock = (mock: MockAdapter) => {
  mock.onGet('/mock/object-type-create/permissions').reply(() => {
    return ok<GetObjectTypeCreatePermissionsResponse>({
      canCreateObjectType: true,
    });
  });

  mock.onGet('/mock/object-type-create/datasets').reply((config) => {
    const params = config.params as GetAvailableDatasetsParams | undefined;
    const keyword = params?.keyword?.trim().toLowerCase();
    const list = keyword
      ? datasets.filter((item) => item.name.toLowerCase().includes(keyword))
      : datasets;

    return ok<GetAvailableDatasetsResponse>({
      list,
      total: 14,
    });
  });

  mock
    .onGet('/mock/object-type-create/validate-dataset-name')
    .reply((config) => {
      const params = config.params as ValidateDatasetNameParams | undefined;
      return ok<ValidationResponse>(
        toValidationResponse(validateDatasetName(params?.datasetName ?? '')),
      );
    });

  mock.onGet('/mock/object-type-create/validate-name').reply((config) => {
    const params = config.params as ValidateObjectTypeNameParams | undefined;
    const localMessage = validateObjectTypeName(params?.objectTypeName ?? '');
    const response = localMessage
      ? { valid: false, message: localMessage }
      : params?.objectTypeName === '回归测试1'
        ? { valid: false, message: '对象类型显示名称已存在' }
        : { valid: true };

    return ok<ValidationResponse>(response);
  });

  mock
    .onGet('/mock/object-type-create/validate-english-name')
    .reply((config) => {
      const params = config.params as
        | ValidateObjectTypeEnglishNameParams
        | undefined;
      const value = params?.objectTypeEnglishName ?? '';
      const valid = /^[A-Za-z0-9-]{1,64}$/.test(value);

      return ok<ValidationResponse>(
        valid
          ? { valid: true }
          : { valid: false, message: '英文名称仅支持英文、数字、短横线' },
      );
    });

  mock.onGet('/mock/object-type-create/validate-id').reply((config) => {
    const params = config.params as ValidateObjectTypeIdParams | undefined;
    return ok<ValidationResponse>(
      toValidationResponse(validateObjectTypeId(params?.objectTypeId ?? '')),
    );
  });

  mock.onPost('/mock/object-type-create').reply((config) => {
    const body = JSON.parse(config.data as string) as CreateObjectTypeRequest;

    return ok<CreateObjectTypeResponse>({
      id: body.objectTypeId || 'object-type-created',
      name: body.objectTypeName || '新对象类型',
    });
  });
};
