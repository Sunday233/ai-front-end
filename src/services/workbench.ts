import type {
  GetWorkbenchListParams,
  GetWorkbenchListResponse,
} from '@/types/workbench/api';
import type {WorkbenchCard} from '@/types/workbench/model';

const mockRecentCards: WorkbenchCard[] = [
  {
    id: 'employee',
    name: '员工',
    relationCaseCount: 167,
    appCount: 10,
    description: '这里是对象类型的描述信息，例如这个标记了DCH研发智能体。',
    tags: ['对象组1', '对象组1'],
    color: 'blue',
  },
  {
    id: 'employee-copy',
    name: '员工',
    relationCaseCount: 167,
    appCount: 10,
    description: '这里是对象类型的描述信息，例如这个标记了DCH研发智能体。',
    tags: ['对象组1', '对象组1'],
    color: 'green',
  },
  {
    id: 'car',
    name: '汽车',
    relationCaseCount: 167,
    appCount: 10,
    description: '这里是对象类型的描述信息，例如这个标记了阿尔法实验室。',
    tags: ['对象组1', '对象组1'],
    color: 'blue',
  },
];

const wait = (duration = 160) =>
  new Promise<void>((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, duration);
  });

export const getWorkbenchList = async (
  params: GetWorkbenchListParams
): Promise<GetWorkbenchListResponse> => {
  await wait();

  const keyword = params.keyword?.trim().toLowerCase() ?? '';
  const filteredRecent =
    keyword.length === 0
      ? mockRecentCards
      : mockRecentCards.filter((item) => item.name.toLowerCase().includes(keyword));

  return {
    recent: filteredRecent,
    favorites: [],
    recentTotal: 23,
    favoriteTotal: 0,
  };
};
