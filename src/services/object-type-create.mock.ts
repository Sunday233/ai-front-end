import type { DatasetOption } from "@/types/object-type-create/model";
import type MockAdapter from "axios-mock-adapter";

const datasets: DatasetOption[] = [
  {
    id: "dataset-employee",
    name: "暂无选择数据集",
    path: "智能体 / 数据资源 / employee",
    fields: [
      { id: "field-emp-no", name: "emp_no", type: "int", primary: true },
      { id: "field-hight", name: "hight", type: "float" },
      { id: "field-birth-date", name: "birth_date", type: "date" },
      { id: "field-first-name", name: "first_name", type: "string" },
      { id: "field-last-name", name: "last_name", type: "string" },
      { id: "field-gender", name: "gender", type: "string" },
    ],
  },
];

const duplicateNames = new Set(["employee", "回归测试1", "ot-employee"]);

const createValidateResponse = (value: string) => {
  const normalized = value.trim().toLowerCase();

  if (!normalized) {
    return { valid: false, message: "字段不能为空" };
  }

  if (duplicateNames.has(normalized)) {
    return { valid: false, message: "名称已存在" };
  }

  return { valid: true };
};

export const setupObjectTypeCreateMock = (mock: MockAdapter) => {
  mock.onGet("/matrix/object-types/create-permissions").reply(200, {
    code: 0,
    msg: "ok",
    data: { canCreateObjectType: true },
  });

  mock.onGet("/matrix/object-types/available-datasets").reply(200, {
    code: 0,
    msg: "ok",
    data: { datasets },
  });

  mock.onPost("/matrix/object-types/validate-dataset-name").reply((config) => {
    const body = JSON.parse(config.data as string) as { datasetName: string };
    return [
      200,
      { code: 0, msg: "ok", data: createValidateResponse(body.datasetName) },
    ];
  });

  mock.onPost("/matrix/object-types/validate-name").reply((config) => {
    const body = JSON.parse(config.data as string) as {
      objectTypeName: string;
    };
    return [
      200,
      { code: 0, msg: "ok", data: createValidateResponse(body.objectTypeName) },
    ];
  });

  mock.onPost("/matrix/object-types/validate-english-name").reply((config) => {
    const body = JSON.parse(config.data as string) as {
      objectTypeEnglishName: string;
    };
    return [
      200,
      {
        code: 0,
        msg: "ok",
        data: createValidateResponse(body.objectTypeEnglishName),
      },
    ];
  });

  mock.onPost("/matrix/object-types/validate-id").reply((config) => {
    const body = JSON.parse(config.data as string) as { objectTypeId: string };
    return [
      200,
      { code: 0, msg: "ok", data: createValidateResponse(body.objectTypeId) },
    ];
  });

  mock.onPost("/matrix/object-types/create").reply((config) => {
    const body = JSON.parse(config.data as string) as {
      draft: { actions?: unknown[] };
    };
    return [
      200,
      {
        code: 0,
        msg: "ok",
        data: {
          id: "ot-created-001",
          actions: body.draft.actions ?? [],
        },
      },
    ];
  });
};
