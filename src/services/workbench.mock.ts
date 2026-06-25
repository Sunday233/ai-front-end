import type MockAdapter from 'axios-mock-adapter';
import type { ApiEnvelope } from '@/services/client';
import type {
  GetWorkbenchCreatePermissionsResponse,
  GetWorkbenchMenusResponse,
  GetWorkbenchSummaryResponse,
  SearchWorkbenchObjectTypesParams,
  SearchWorkbenchObjectTypesResponse,
} from '@/types/workbench/api';
import type { WorkbenchObjectTypeCard } from '@/types/workbench/model';

const objectTypeCards: WorkbenchObjectTypeCard[] = [
  {
    id: 'ot-regression',
    name: '回归测试1',
    description: '3333',
    instanceCount: 25,
    appCount: 1,
    favorite: false,
    tags: [{ label: '222', count: 1 }],
  },
  {
    id: 'ot-4444',
    name: '4444',
    description: '3333',
    instanceCount: 3,
    appCount: 1,
    favorite: true,
    tags: [{ label: 'OTG202509...', count: 5 }],
  },
  {
    id: 'ot-sfa22',
    name: 'sfa22',
    description: '3333',
    instanceCount: 3,
    appCount: 1,
    favorite: true,
    tags: [{ label: '工时', count: 4 }],
  },
  {
    id: 'ot-kejie222',
    name: 'kejie222',
    description: '3333',
    instanceCount: 3,
    appCount: 1,
    favorite: true,
    tags: [{ label: 'OTG202509...', count: 5 }],
  },
  {
    id: 'ot-kejie22',
    name: 'kejie22',
    description: '3333',
    instanceCount: 3,
    appCount: 1,
    favorite: true,
    tags: [{ label: '工时', count: 4 }],
  },
];

const ok = <T>(data: T): [number, ApiEnvelope<T>] => [
  200,
  { code: 0, msg: 'ok', data },
];

export const setupWorkbenchMock = (mock: MockAdapter) => {
  mock.onGet('/mock/workbench/summary').reply(() => {
    return ok<GetWorkbenchSummaryResponse>({
      workspaceId: 'workspace-matrix',
      workspaceName: '返回首页',
      agentId: 'agent-rrr',
      agentName: 'rrr',
      recentObjectTypes: [objectTypeCards[0]],
      favoriteObjectTypes: objectTypeCards.slice(1, 5),
    });
  });

  mock.onGet('/mock/workbench/menus').reply(() => {
    return ok<GetWorkbenchMenusResponse>({
      menus: [
        {
          resourceType: 'object-type',
          resourceName: '对象类型',
          resourceCount: 39,
          menuKey: 'object-types',
          routePath: '/object-types',
        },
        {
          resourceType: 'link-type',
          resourceName: '链接类型',
          resourceCount: 6,
          menuKey: 'links',
          routePath: '/workbench',
        },
        {
          resourceType: 'action-type',
          resourceName: '动作类型',
          resourceCount: 31,
          menuKey: 'actions',
          routePath: '/workbench',
        },
        {
          resourceType: 'object-type-group',
          resourceName: '对象类型组',
          resourceCount: 17,
          menuKey: 'groups',
          routePath: '/workbench',
        },
      ],
    });
  });

  mock.onGet('/mock/workbench/object-types/search').reply((config) => {
    const params = config.params as
      | SearchWorkbenchObjectTypesParams
      | undefined;
    const keyword = params?.keyword?.trim().toLowerCase();
    const list = keyword
      ? objectTypeCards.filter((item) =>
          item.name.toLowerCase().includes(keyword),
        )
      : objectTypeCards;

    return ok<SearchWorkbenchObjectTypesResponse>({ list });
  });

  mock.onGet('/mock/workbench/create-permissions').reply(() => {
    return ok<GetWorkbenchCreatePermissionsResponse>({
      canCreateObjectType: true,
      canCreateLink: true,
      canCreateAction: true,
      canCreateObjectGroup: true,
      canManageAgent: true,
    });
  });
};
