import type { GetObjectTypeListParams } from "@/types/object-type-list/api";
import type { ObjectTypeListItem } from "@/types/object-type-list/model";
import type MockAdapter from "axios-mock-adapter";

export const objectTypeListRows: ObjectTypeListItem[] = [
  {
    id: "ot-001",
    rid: "OTG20260106164143",
    icon: "object-type",
    name: "回归测试1",
    status: "正常",
    visibility: "可见",
    updatedAt: "2026-01-06 16:41:43",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-002",
    rid: "OTG20251127175256",
    icon: "object-type",
    name: "employee",
    status: "正常",
    visibility: "可见",
    updatedAt: "2025-11-27 17:52:56",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-003",
    rid: "OTG20251125181231",
    icon: "object-type",
    name: "eeww3",
    status: "草稿",
    visibility: "可见",
    updatedAt: "2025-11-25 18:12:31",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-004",
    rid: "OTG20251125113333",
    icon: "object-type",
    name: "工时统计",
    status: "正常",
    visibility: "可见",
    updatedAt: "2025-11-25 11:33:33",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-005",
    rid: "OTG20251124182029",
    icon: "object-type",
    name: "部件",
    status: "正常",
    visibility: "可见",
    updatedAt: "2025-11-24 18:20:29",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-006",
    rid: "OTG20250922170102",
    icon: "object-type",
    name: "aa11",
    status: "草稿",
    visibility: "可见",
    updatedAt: "2025-09-22 17:01:02",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-007",
    rid: "OTG20250919164704",
    icon: "object-type",
    name: "rrr",
    status: "草稿",
    visibility: "可见",
    updatedAt: "2025-09-19 16:47:04",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-008",
    rid: "OTG20250919153416",
    icon: "object-type",
    name: "kejie222",
    status: "草稿",
    visibility: "可见",
    updatedAt: "2025-09-19 15:34:16",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-009",
    rid: "OTG20250919110213",
    icon: "object-type",
    name: "kejie22",
    status: "草稿",
    visibility: "可见",
    updatedAt: "2025-09-19 11:02:13",
    operatorPermissions: ["detail"],
  },
];

const filterRows = (params?: GetObjectTypeListParams) => {
  const keyword = params?.keyword?.trim().toLowerCase();

  if (!keyword) {
    return objectTypeListRows;
  }

  return objectTypeListRows.filter((item) => {
    return [item.id, item.rid, item.name].some((field) => field.toLowerCase().includes(keyword));
  });
};

const buildListResponse = (params?: GetObjectTypeListParams) => {
  const rows = filterRows(params);

  return {
    code: 0,
    msg: "ok",
    data: {
      list: rows.slice(0, params?.pageSize ?? 10),
      total: params?.keyword ? rows.length : 39,
      pageNo: params?.pageNo ?? 1,
      pageSize: params?.pageSize ?? 10,
    },
  };
};

export const setupObjectTypeListMock = (mock: MockAdapter) => {
  mock.onGet("/mock/object-types").reply((config) => [200, buildListResponse(config.params)]);
  mock.onGet("/mock/object-types/search").reply((config) => [200, buildListResponse(config.params)]);
  mock.onGet("/mock/object-types/refresh").reply((config) => [200, buildListResponse(config.params)]);
  mock.onGet("/mock/object-types/permissions").reply(200, {
    code: 0,
    msg: "ok",
    data: {
      canCreate: true,
      canViewDetail: true,
    },
  });
};
