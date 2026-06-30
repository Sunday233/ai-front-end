import type {
  WorkbenchMenuItem,
  WorkbenchObjectTypeCard,
  WorkbenchSummary,
} from "@/types/workbench/model";
import { filterByObjectKeyword } from "@/utils/search";
import type MockAdapter from "axios-mock-adapter";

const favoriteCards: WorkbenchObjectTypeCard[] = [
  {
    id: "ot-4444",
    rid: "OTG20250905172508",
    name: "4444",
    instanceCount: 25,
    appName: "应用-次",
    description: "",
    groups: [{ id: "group-1", name: "OTG20250905172508", count: 10 }],
    favorite: true,
  },
  {
    id: "ot-sfa22",
    rid: "OTG20250902131633",
    name: "sfa22",
    instanceCount: 3,
    appName: "应用-次",
    description: "",
    groups: [
      { id: "group-2", name: "OTG202509...", count: 6 },
      { id: "group-3", name: "OTG202509...", count: 10 },
    ],
    favorite: true,
  },
  {
    id: "ot-kejie222",
    rid: "OTG20250919153416",
    name: "kejie222",
    instanceCount: 25,
    appName: "应用-次",
    description: "",
    groups: [
      { id: "group-4", name: "OTG202509...", count: 4 },
      { id: "group-5", name: "OTG202509...", count: 6 },
    ],
    favorite: true,
  },
  {
    id: "ot-regression-1",
    rid: "OTG20250106164143",
    name: "回归测试1",
    instanceCount: 25,
    appName: "应用-次",
    description: "3333",
    groups: [
      { id: "group-6", name: "OTG20250...", count: 5 },
      { id: "group-7", name: "工时", count: 4 },
    ],
    favorite: true,
  },
];

const recentCards = [favoriteCards[3]].filter(
  Boolean,
) as WorkbenchObjectTypeCard[];

const menus: WorkbenchMenuItem[] = [
  {
    key: "workbench",
    name: "工作台",
    routePath: "/workbench",
    iconType: "workbench",
  },
  {
    key: "object-types",
    name: "对象类型",
    count: 39,
    routePath: "/object-types",
    iconType: "object",
  },
  {
    key: "link-types",
    name: "链接类型",
    count: 6,
    routePath: "/links",
    iconType: "link",
  },
  {
    key: "action-types",
    name: "动作类型",
    count: 31,
    routePath: "/actions",
    iconType: "action",
  },
  {
    key: "object-groups",
    name: "对象类型组",
    count: 17,
    routePath: "/object-groups",
    iconType: "group",
  },
  {
    key: "agent-manage",
    name: "智能体管理",
    routePath: "/agent/manage",
    iconType: "manage",
    permissionCode: "manage",
  },
  {
    key: "data-clean",
    name: "数据清理",
    routePath: "/data-clean",
    iconType: "clean",
    permissionCode: "manage",
  },
  {
    key: "knowledge",
    name: "知识库",
    routePath: "/knowledge",
    iconType: "knowledge",
  },
];

const summary: WorkbenchSummary = {
  workspaceId: "workspace-eda",
  workspaceName: "rrr",
  agentId: "agent-matrix",
  agentName: "智能体管理Matrix",
  recentObjectTypes: recentCards,
  favoriteObjectTypes: favoriteCards,
  resourceCounts: {
    objectType: 39,
    linkType: 6,
    actionType: 31,
    objectGroup: 17,
  },
  permissions: {
    canCreateObjectType: true,
    canCreateLink: true,
    canCreateAction: true,
    canCreateObjectGroup: true,
    canManageAgent: true,
  },
};

export const setupWorkbenchMock = (mock: MockAdapter) => {
  mock.onGet("/matrix/workbench/summary").reply(200, {
    code: 0,
    msg: "ok",
    data: { summary },
  });

  mock.onGet("/matrix/workbench/menus").reply(200, {
    code: 0,
    msg: "ok",
    data: { menus },
  });

  mock.onGet("/matrix/workbench/object-types/search").reply((config) => {
    const keyword = String(config.params?.keyword ?? "");
    const list = filterByObjectKeyword(
      [...summary.recentObjectTypes, ...summary.favoriteObjectTypes],
      keyword,
    );
    return [
      200,
      {
        code: 0,
        msg: "ok",
        data: { list },
      },
    ];
  });

  mock.onGet("/matrix/workbench/create-permissions").reply(200, {
    code: 0,
    msg: "ok",
    data: summary.permissions,
  });
};
