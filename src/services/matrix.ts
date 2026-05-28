import type {
  CreateObjectTypeResponse,
  DatasetListResponse,
  ObjectTypeListParams,
  ObjectTypeListPermissionsResponse,
  ObjectTypeListResponse,
  WorkbenchSummaryResponse,
} from "@/types/matrix/api";
import type {
  CreateObjectTypePayload,
  DatasetSummary,
  NavigationItem,
  ObjectTypeRow,
} from "@/types/matrix/model";
import dayjs from "dayjs";

const delay = async (ms = 180): Promise<void> => {
  await new Promise((resolve) => window.setTimeout(resolve, ms));
};

const navigationItems: NavigationItem[] = [
  { key: "workbench", label: "工作台", route: "/workbench" },
  { key: "objectType", label: "对象类型", count: 39, route: "/object-types" },
  { key: "linkType", label: "链接类型", count: 6 },
  { key: "actionType", label: "动作类型", count: 31 },
  { key: "objectTypeGroup", label: "对象类型组", count: 17 },
  { key: "agentManage", label: "智能体管理" },
  { key: "dataClean", label: "数据清理" },
  { key: "knowledge", label: "知识库" },
];

const objectTypeRows: ObjectTypeRow[] = [
  {
    id: "ot_001",
    rid: "OTG20250905172508",
    name: "回归测试1",
    status: "normal",
    visibility: "visible",
    updatedAt: "2026-01-06 16:41:43",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot_002",
    rid: "employee",
    name: "employee",
    status: "normal",
    visibility: "visible",
    updatedAt: "2025-11-27 17:52:56",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot_003",
    rid: "eeww3",
    name: "eeww3",
    status: "draft",
    visibility: "visible",
    updatedAt: "2025-11-25 18:12:31",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot_004",
    rid: "OTG20251125113333",
    name: "工时统计",
    status: "normal",
    visibility: "visible",
    updatedAt: "2025-11-25 11:33:33",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot_005",
    rid: "mail",
    name: "邮件",
    status: "normal",
    visibility: "visible",
    updatedAt: "2025-11-24 18:20:29",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot_006",
    rid: "aa11",
    name: "aa11",
    status: "draft",
    visibility: "visible",
    updatedAt: "2025-09-22 17:01:02",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot_007",
    rid: "rrr",
    name: "rrr",
    status: "draft",
    visibility: "visible",
    updatedAt: "2025-09-19 16:47:04",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot_008",
    rid: "kejie222",
    name: "kejie222",
    status: "draft",
    visibility: "visible",
    updatedAt: "2025-09-19 15:34:16",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot_009",
    rid: "kejie22",
    name: "kejie22",
    status: "draft",
    visibility: "visible",
    updatedAt: "2025-09-19 11:02:13",
    operatorPermissions: ["detail"],
  },
];

const datasets: DatasetSummary[] = [
  {
    id: "ds_employees",
    name: "employees",
    path: "yyy >= 444",
    mode: "access",
    type: "table",
    version: "snapshot-1",
    updatedAt: "1764237019723",
    fields: [
      { name: "emp_no", type: "Int", isPrimary: true },
      { name: "hight", type: "Float" },
      { name: "birth_date", type: "Date" },
      { name: "first_name", type: "String" },
      { name: "last_name", type: "String" },
      { name: "gender", type: "String" },
    ],
  },
  {
    id: "ds_as",
    name: "as",
    path: "陈珍的第八个账号的个人项目",
    mode: "manual",
    type: "table",
    version: "snapshot-2",
    updatedAt: "1764237011111",
    fields: [],
  },
  {
    id: "ds_report",
    name: "报工数据",
    path: "yyy == 444",
    mode: "manual",
    type: "table",
    version: "snapshot-3",
    updatedAt: "1764237012222",
    fields: [],
  },
  {
    id: "ds_part",
    name: "零件信息",
    path: "yyy == 444",
    mode: "manual",
    type: "table",
    version: "snapshot-4",
    updatedAt: "1764237013333",
    fields: [],
  },
];

export async function getWorkbenchSummary(): Promise<WorkbenchSummaryResponse> {
  await delay();
  return {
    agentName: "rrr",
    menus: navigationItems,
    canCreateObjectType: true,
    canCreateLink: true,
    canCreateAction: true,
    recentCards: [
      {
        id: "recent-1",
        name: "回归测试1",
        instanceCount: 25,
        usageLabel: "应用-次",
        description: "3333",
        tags: [
          { label: "222", count: 1 },
          { label: "OTG20250...", count: 5 },
        ],
      },
    ],
    favoriteCards: [
      {
        id: "fav-1",
        name: "4444",
        instanceCount: 25,
        usageLabel: "应用-次",
        favorite: true,
        tags: [{ label: "OTG20250905172508", count: 10 }],
      },
      {
        id: "fav-2",
        name: "sfa22",
        instanceCount: 3,
        usageLabel: "应用-次",
        favorite: true,
        tags: [
          { label: "OTG2025090...", count: 6 },
          { label: "OTG202509...", count: 10 },
        ],
      },
      {
        id: "fav-3",
        name: "kejie222",
        instanceCount: 25,
        usageLabel: "应用-次",
        favorite: true,
        tags: [
          { label: "OTG2025090...", count: 4 },
          { label: "OTG2025090...", count: 6 },
        ],
      },
      {
        id: "fav-4",
        name: "回归测试1",
        instanceCount: 25,
        usageLabel: "应用-次",
        description: "3333",
        favorite: true,
        tags: [
          { label: "OTG20250...", count: 5 },
          { label: "工时", count: 4 },
        ],
      },
    ],
  };
}

export async function getObjectTypeList(
  params: ObjectTypeListParams,
): Promise<ObjectTypeListResponse> {
  await delay();
  const keyword = params.keyword?.trim().toLowerCase();
  const filteredRows = keyword
    ? objectTypeRows.filter((row) =>
        [row.name, row.id, row.rid].some((value) =>
          value.toLowerCase().includes(keyword),
        ),
      )
    : objectTypeRows;

  const start = (params.pageNo - 1) * params.pageSize;
  return {
    rows: filteredRows.slice(start, start + params.pageSize),
    total: keyword ? filteredRows.length : 39,
  };
}

export async function getObjectTypeListPermissions(): Promise<ObjectTypeListPermissionsResponse> {
  await delay();
  return {
    canCreate: true,
    canViewDetail: true,
  };
}

export async function getAvailableDatasets(): Promise<DatasetListResponse> {
  await delay();
  return {
    rows: datasets,
    total: 14,
  };
}

export async function createObjectType(
  payload: CreateObjectTypePayload,
): Promise<CreateObjectTypeResponse> {
  await delay(300);
  return {
    id: `ot_${payload.objectTypeId}_${dayjs().format("HHmmss")}`,
  };
}
