import type { ObjectTypeListItem } from "@/types/object-type-list/model";
import {
  filterByObjectKeyword,
  paginate,
  sortByUpdatedAtDesc,
} from "@/utils/search";
import type MockAdapter from "axios-mock-adapter";

const objectTypes: ObjectTypeListItem[] = [
  {
    id: "ot-regression-1",
    rid: "RID-20260106",
    icon: "object",
    name: "回归测试1",
    status: "normal",
    visibility: "visible",
    updatedAt: "2026-01-06 16:41:43",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-employee",
    rid: "RID-20251127",
    icon: "object",
    name: "employee",
    status: "normal",
    visibility: "visible",
    updatedAt: "2025-11-27 17:52:56",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-eeww3",
    rid: "RID-20251125-A",
    icon: "object",
    name: "eeww3",
    status: "draft",
    visibility: "visible",
    updatedAt: "2025-11-25 18:12:31",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-work-hour",
    rid: "RID-20251125-B",
    icon: "object",
    name: "工时统计",
    status: "normal",
    visibility: "visible",
    updatedAt: "2025-11-25 11:33:33",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-part",
    rid: "RID-20251124",
    icon: "object",
    name: "部件",
    status: "normal",
    visibility: "visible",
    updatedAt: "2025-11-24 18:20:29",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-aa11",
    rid: "RID-20250922",
    icon: "object",
    name: "aa11",
    status: "draft",
    visibility: "visible",
    updatedAt: "2025-09-22 17:01:02",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-rrr",
    rid: "RID-20250919-A",
    icon: "object",
    name: "rrr",
    status: "draft",
    visibility: "visible",
    updatedAt: "2025-09-19 16:47:04",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-kejie222",
    rid: "RID-20250919-B",
    icon: "object",
    name: "kejie222",
    status: "draft",
    visibility: "visible",
    updatedAt: "2025-09-19 15:34:16",
    operatorPermissions: ["detail"],
  },
  {
    id: "ot-kejie22",
    rid: "RID-20250919-C",
    icon: "object",
    name: "kejie22",
    status: "draft",
    visibility: "visible",
    updatedAt: "2025-09-19 11:02:13",
    operatorPermissions: ["detail"],
  },
];

const getListPayload = (params?: Record<string, unknown>) => {
  const pageNo = Number(params?.pageNo ?? 1);
  const pageSize = Number(params?.pageSize ?? 10);
  const keyword = String(params?.keyword ?? "");
  const filtered = sortByUpdatedAtDesc(
    filterByObjectKeyword(objectTypes, keyword),
  );

  return {
    list: paginate(filtered, pageNo, pageSize),
    total: keyword ? filtered.length : 39,
  };
};

export const setupObjectTypeListMock = (mock: MockAdapter) => {
  mock.onGet("/matrix/object-types").reply((config) => [
    200,
    {
      code: 0,
      msg: "ok",
      data: getListPayload(config.params),
    },
  ]);

  mock.onGet("/matrix/object-types/search").reply((config) => [
    200,
    {
      code: 0,
      msg: "ok",
      data: getListPayload(config.params),
    },
  ]);

  mock.onGet("/matrix/object-types/refresh").reply((config) => [
    200,
    {
      code: 0,
      msg: "ok",
      data: getListPayload(config.params),
    },
  ]);

  mock.onGet("/matrix/object-types/permissions").reply(200, {
    code: 0,
    msg: "ok",
    data: {
      permissions: {
        canCreate: true,
        canViewDetail: true,
      },
    },
  });
};
