import dayjs from 'dayjs';

import type {
  CreateObjectTypePayload,
  CreateObjectTypeResponse,
  GetObjectTypeListParams,
  GetObjectTypeListResponse,
} from '@/types/object-type/api';
import type {ObjectTypeItem} from '@/types/object-type/model';

const mockObjectTypeList: ObjectTypeItem[] = [
  {id: '1', name: 'T恤衫', status: 'active', visibility: 'public', date: '2024-11-24'},
  {id: '2', name: '沙滩拖鞋', status: 'active', visibility: 'private', date: '2024-10-11'},
  {id: '3', name: '手机壳', status: 'active', visibility: 'public', date: '2024-09-17'},
  {id: '4', name: '水杯', status: 'active', visibility: 'public', date: '2024-08-22'},
  {id: '5', name: '运动鞋', status: 'active', visibility: 'public', date: '2024-07-24'},
  {id: '6', name: '运动裤', status: 'active', visibility: 'public', date: '2024-06-21'},
  {id: '7', name: 'USB线', status: 'building', visibility: 'public', date: '2024-05-10'},
  {id: '8', name: '耳机', status: 'building', visibility: 'public', date: '2024-04-11'},
  {id: '9', name: '运动相机', status: 'building', visibility: 'private', date: '2024-03-22'},
  {id: '10', name: '泳衣', status: 'active', visibility: 'public', date: '2024-02-16'},
  {id: '11', name: '太阳眼镜', status: 'active', visibility: 'public', date: '2024-01-24'},
];

const wait = (duration = 140) =>
  new Promise<void>((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, duration);
  });

export const getObjectTypeList = async (
  params: GetObjectTypeListParams
): Promise<GetObjectTypeListResponse> => {
  await wait();

  const keyword = params.keyword?.trim().toLowerCase() ?? '';
  const filtered =
    keyword.length === 0
      ? mockObjectTypeList
      : mockObjectTypeList.filter((item) => item.name.toLowerCase().includes(keyword));

  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;

  return {
    list: filtered.slice(startIndex, endIndex),
    total: filtered.length,
  };
};

export const createObjectType = async (
  payload: CreateObjectTypePayload
): Promise<CreateObjectTypeResponse> => {
  await wait(260);

  const id = `new-${Date.now()}`;
  mockObjectTypeList.unshift({
    id,
    name: payload.metadata.objectTypeName || '未命名对象类型',
    status: 'building',
    visibility: 'public',
    date: dayjs().format('YYYY-MM-DD'),
  });

  return {id};
};
