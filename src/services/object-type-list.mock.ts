import type MockAdapter from 'axios-mock-adapter';
import type { ApiEnvelope } from '@/services/client';
import type {
  GetObjectTypeListParams,
  GetObjectTypeListPermissionsResponse,
  GetObjectTypeListResponse,
} from '@/types/object-type-list/api';
import type { ObjectTypeListItem } from '@/types/object-type-list/model';
import { filterObjectTypeRows } from '@/utils/object-type-list';

export const objectTypeRows: ObjectTypeListItem[] = [
  {
    id: 'ot-regression-1',
    rid: 'RID-2026010641',
    icon: 'object',
    name: '回归测试1',
    status: 'normal',
    visibility: 'visible',
    updatedAt: '2026-01-06 16:41:43',
    operatorPermissions: ['detail'],
  },
  {
    id: 'ot-employee',
    rid: 'RID-2025112752',
    icon: 'object',
    name: 'employee',
    status: 'normal',
    visibility: 'visible',
    updatedAt: '2025-11-27 17:52:56',
    operatorPermissions: ['detail'],
  },
  {
    id: 'ot-eeww3',
    rid: 'RID-2025112531',
    icon: 'object',
    name: 'eeww3',
    status: 'draft',
    visibility: 'visible',
    updatedAt: '2025-11-25 18:12:31',
    operatorPermissions: ['detail'],
  },
  {
    id: 'ot-work-hour',
    rid: 'RID-2025112533',
    icon: 'object',
    name: '工时统计',
    status: 'normal',
    visibility: 'visible',
    updatedAt: '2025-11-25 11:33:33',
    operatorPermissions: ['detail'],
  },
  {
    id: 'ot-part',
    rid: 'RID-2025112429',
    icon: 'object',
    name: '部件',
    status: 'normal',
    visibility: 'visible',
    updatedAt: '2025-11-24 18:20:29',
    operatorPermissions: ['detail'],
  },
  {
    id: 'ot-aa11',
    rid: 'RID-2025092202',
    icon: 'object',
    name: 'aa11',
    status: 'draft',
    visibility: 'visible',
    updatedAt: '2025-09-22 17:01:02',
    operatorPermissions: ['detail'],
  },
  {
    id: 'ot-rrr',
    rid: 'RID-2025091904',
    icon: 'object',
    name: 'rrr',
    status: 'draft',
    visibility: 'visible',
    updatedAt: '2025-09-19 16:47:04',
    operatorPermissions: ['detail'],
  },
  {
    id: 'ot-kejie222',
    rid: 'RID-2025091916',
    icon: 'object',
    name: 'kejie222',
    status: 'draft',
    visibility: 'visible',
    updatedAt: '2025-09-19 15:34:16',
    operatorPermissions: ['detail'],
  },
  {
    id: 'ot-kejie22',
    rid: 'RID-2025091911',
    icon: 'object',
    name: 'kejie22',
    status: 'draft',
    visibility: 'visible',
    updatedAt: '2025-09-19 11:02:13',
    operatorPermissions: ['detail'],
  },
];

const ok = <T>(data: T): [number, ApiEnvelope<T>] => [
  200,
  { code: 0, msg: 'ok', data },
];

const getPagedRows = (params?: GetObjectTypeListParams) => {
  const pageNo = params?.pageNo ?? 1;
  const pageSize = params?.pageSize ?? 10;
  const filteredRows = filterObjectTypeRows(
    objectTypeRows,
    params?.keyword ?? '',
  );
  const start = (pageNo - 1) * pageSize;

  return {
    list: filteredRows.slice(start, start + pageSize),
    total: params?.keyword ? filteredRows.length : 39,
  };
};

export const setupObjectTypeListMock = (mock: MockAdapter) => {
  mock.onGet('/mock/object-types').reply((config) => {
    return ok<GetObjectTypeListResponse>(
      getPagedRows(config.params as GetObjectTypeListParams | undefined),
    );
  });

  mock.onGet('/mock/object-types/search').reply((config) => {
    return ok<GetObjectTypeListResponse>(
      getPagedRows(config.params as GetObjectTypeListParams | undefined),
    );
  });

  mock.onGet('/mock/object-types/refresh').reply((config) => {
    return ok<GetObjectTypeListResponse>(
      getPagedRows(config.params as GetObjectTypeListParams | undefined),
    );
  });

  mock.onGet('/mock/object-types/permissions').reply(() => {
    return ok<GetObjectTypeListPermissionsResponse>({
      canCreate: true,
      canViewDetail: true,
    });
  });
};
