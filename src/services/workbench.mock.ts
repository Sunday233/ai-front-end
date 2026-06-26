import type { WorkbenchSummary } from "@/types/workbench/model";
import type MockAdapter from "axios-mock-adapter";

export const workbenchSummary: WorkbenchSummary = {
  workspaceId: "workspace-matrix",
  workspaceName: "智能体管理Matrix",
  agentId: "agent-rrr",
  agentName: "rrr",
  menus: [
    { key: "workbench", name: "工作台", routePath: "/workbench" },
    { key: "object-type", name: "对象类型", count: 39, routePath: "/object-types" },
    { key: "link-type", name: "链接类型", count: 6, routePath: "/object-types?resource=link-type" },
    { key: "action-type", name: "动作类型", count: 31, routePath: "/object-types?resource=action-type" },
    { key: "object-type-group", name: "对象类型组", count: 17, routePath: "/object-types?resource=object-type-group" },
    { key: "agent-management", name: "智能体管理", routePath: "/workbench?panel=agent-management" },
    { key: "data-cleaning", name: "数据清理", routePath: "/workbench?panel=data-cleaning" },
    { key: "knowledge-base", name: "知识库", routePath: "/workbench?panel=knowledge-base" },
  ],
  recentObjectTypes: [
    {
      id: "recent-1",
      name: "回归测试1",
      description: "3333",
      instanceCount: 25,
      appText: "应用-次",
      favorite: false,
      tags: [
        { id: "tag-222", label: "222", count: 1 },
        { id: "tag-otg", label: "OTG20250...", count: 5 },
      ],
    },
  ],
  favoriteObjectTypes: [
    {
      id: "fav-1",
      name: "4444",
      instanceCount: 25,
      appText: "应用-次",
      favorite: true,
      tags: [{ id: "tag-otg-1", label: "OTG20250905172508", count: 10 }],
    },
    {
      id: "fav-2",
      name: "sfa22",
      instanceCount: 3,
      appText: "应用-次",
      favorite: true,
      tags: [
        { id: "tag-otg-2", label: "OTG202509...", count: 6 },
        { id: "tag-otg-3", label: "OTG202509...", count: 10 },
      ],
    },
    {
      id: "fav-3",
      name: "kejie222",
      instanceCount: 25,
      appText: "应用-次",
      favorite: true,
      tags: [
        { id: "tag-otg-4", label: "OTG2025090...", count: 4 },
        { id: "tag-otg-5", label: "OTG2025090...", count: 6 },
      ],
    },
    {
      id: "fav-4",
      name: "回归测试1",
      description: "3333",
      instanceCount: 25,
      appText: "应用-次",
      favorite: true,
      tags: [
        { id: "tag-otg-6", label: "OTG20250...", count: 5 },
        { id: "tag-work-hour", label: "工时", count: 4 },
      ],
    },
  ],
  createOptions: [
    {
      key: "object-type",
      title: "对象类型",
      description: "对象类型可以是实体或者是事件",
      routePath: "/object-types/create",
      permissionKey: "canCreateObjectType",
    },
    {
      key: "link-type",
      title: "链接类型",
      description: "链接类型可以链接两个对象类型",
      routePath: "/workbench?create=link",
      permissionKey: "canCreateLink",
    },
    {
      key: "action-type",
      title: "动作类型",
      description: "允许用户将数据写入动态智能体",
      routePath: "/workbench?create=action",
      permissionKey: "canCreateAction",
    },
    {
      key: "object-type-group",
      title: "对象类型组",
      description: "对象类型组可以包含多个对象类型",
      routePath: "/workbench?create=object-type-group",
      permissionKey: "canCreateObjectGroup",
    },
  ],
  permissions: {
    canCreateObjectType: true,
    canCreateLink: true,
    canCreateAction: true,
    canCreateObjectGroup: true,
    canManageAgent: true,
  },
};

export const setupWorkbenchMock = (mock: MockAdapter) => {
  mock.onGet("/mock/workbench/summary").reply(200, {
    code: 0,
    msg: "ok",
    data: workbenchSummary,
  });
  mock.onGet("/mock/workbench/menus").reply(200, {
    code: 0,
    msg: "ok",
    data: {
      menus: workbenchSummary.menus,
    },
  });
  mock.onGet("/mock/workbench/search-object-types").reply((config) => {
    const keyword = String(config.params?.keyword ?? "")
      .trim()
      .toLowerCase();
    const list = keyword
      ? workbenchSummary.favoriteObjectTypes.filter((item) => item.name.toLowerCase().includes(keyword))
      : workbenchSummary.favoriteObjectTypes;

    return [
      200,
      {
        code: 0,
        msg: "ok",
        data: {
          list,
        },
      },
    ];
  });
  mock.onGet("/mock/workbench/create-permissions").reply(200, {
    code: 0,
    msg: "ok",
    data: workbenchSummary.permissions,
  });
};
