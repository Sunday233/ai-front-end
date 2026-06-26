import type { ObjectTypeCreateDraft } from "@/types/object-type-create/model";
import type MockAdapter from "axios-mock-adapter";

export const objectTypeCreateDraft: ObjectTypeCreateDraft = {
  datasourceMode: "existing",
  selectedDataset: {
    datasetId: "dataset-employees",
    name: "employees",
    path: "yyy == 444",
    sourceType: "接入",
    tableType: "表格",
    selected: true,
  },
  datasets: [
    { datasetId: "dataset-as", name: "as", path: "陈珍的第八个账号的个人项目", sourceType: "手工", tableType: "表格" },
    {
      datasetId: "dataset-employees",
      name: "employees",
      path: "yyy == 444",
      sourceType: "接入",
      tableType: "表格",
      selected: true,
    },
    { datasetId: "dataset-report", name: "报工数据", path: "yyy == 444", sourceType: "手工", tableType: "表格" },
    { datasetId: "dataset-parts", name: "零件信息", path: "yyy == 444", sourceType: "手工", tableType: "表格" },
    { datasetId: "dataset-kejie", name: "调整后kejie", path: "yyy == 444", sourceType: "手工", tableType: "表格" },
  ],
  datasetDetail: {
    dataset: {
      datasetId: "dataset-employees",
      name: "employees",
      path: "yyy == 444",
      sourceType: "接入",
      tableType: "表格",
      selected: true,
    },
    version: "snapshot-1",
    updateTime: "1764237019723",
    columns: [
      { fieldName: "emp_no", fieldType: "Int", displayName: "emp_no" },
      { fieldName: "birth_date", fieldType: "Date", displayName: "birth_date" },
      { fieldName: "first_name", fieldType: "String", displayName: "first_name" },
      { fieldName: "last_name", fieldType: "String", displayName: "last_name" },
      { fieldName: "gender", fieldType: "String", displayName: "gender" },
      { fieldName: "hight", fieldType: "Float", displayName: "hight" },
    ],
    previewRows: [
      {
        empNo: "10002",
        birthDate: "1964-06-02",
        firstName: "Bezalel",
        lastName: "Simmel",
        gender: "F",
        hight: "172.1",
      },
      {
        empNo: "10006",
        birthDate: "1953-04-20",
        firstName: "Anneke",
        lastName: "Preusig",
        gender: "F",
        hight: "168.4",
      },
      {
        empNo: "10017",
        birthDate: "1958-07-06",
        firstName: "Cristinel",
        lastName: "Bouloucos",
        gender: "F",
        hight: "176.2",
      },
      {
        empNo: "10025",
        birthDate: "1958-10-31",
        firstName: "Prasadra",
        lastName: "Heyers",
        gender: "M",
        hight: "181.3",
      },
      {
        empNo: "10035",
        birthDate: "1953-02-08",
        firstName: "Alain",
        lastName: "Chappelet",
        gender: "M",
        hight: "174.9",
      },
      {
        empNo: "10037",
        birthDate: "1963-07-22",
        firstName: "Pradeep",
        lastName: "Makrucki",
        gender: "M",
        hight: "179.2",
      },
    ],
  },
  objectGroups: [{ id: "group-222", name: "222", count: 1 }],
  mappingRows: [
    {
      id: "map-emp-no",
      sourceField: { name: "emp_no", type: "Int", isPrimary: true },
      targetAttribute: { name: "emp_no", type: "Int", countText: "主键", readonly: true, isPrimary: true },
      removable: false,
    },
    {
      id: "map-hight",
      sourceField: { name: "hight", type: "Float" },
      targetAttribute: { name: "hight", type: "Float", countText: "5 / 64", readonly: true },
      removable: true,
    },
    {
      id: "map-birth-date",
      sourceField: { name: "birth_date", type: "Date" },
      targetAttribute: { name: "birth_date", type: "Date", countText: "10 / 64", readonly: true },
      removable: false,
    },
    {
      id: "map-first-name",
      sourceField: { name: "first_name", type: "String" },
      targetAttribute: { name: "first_name", type: "String", countText: "10 / 64", readonly: true },
      removable: false,
    },
    {
      id: "map-last-name",
      sourceField: { name: "last_name", type: "String" },
      targetAttribute: { name: "last_name", type: "String", countText: "9 / 64", readonly: true },
      removable: false,
    },
    {
      id: "map-gender",
      sourceField: { name: "gender", type: "String" },
      targetAttribute: { name: "gender", type: "String", countText: "6 / 64", readonly: true },
      removable: false,
    },
  ],
  actionRows: [
    {
      id: "create",
      title: "创建测试",
      description: "设置emp_no、birth_date、first_name和更多2项其他属性",
      selected: false,
    },
    {
      id: "update",
      title: "修改测试",
      description: "修改hight、birth_date、first_name和更多2项其他属性",
      selected: false,
    },
    {
      id: "delete",
      title: "删除测试",
      description: "允许删除对象实例及其所有属性",
      selected: false,
    },
  ],
  executorType: "用户",
  executorOptions: [
    { id: "chenzhenq5", name: "chenzhenq5" },
    { id: "chenzhenq8", name: "chenzhenq8" },
  ],
  selectedExecutors: [
    { id: "chenzhenq5", name: "chenzhenq5" },
    { id: "chenzhenq8", name: "chenzhenq8" },
  ],
};

const successValidation = {
  code: 0,
  msg: "ok",
  data: {
    valid: true,
  },
};

export const setupObjectTypeCreateMock = (mock: MockAdapter) => {
  mock.onGet("/mock/object-type-create/permissions").reply(200, {
    code: 0,
    msg: "ok",
    data: {
      canCreate: true,
    },
  });
  mock.onGet("/mock/object-type-create/datasets").reply(200, {
    code: 0,
    msg: "ok",
    data: {
      datasets: objectTypeCreateDraft.datasets,
      detail: objectTypeCreateDraft.datasetDetail,
    },
  });
  mock.onGet("/mock/object-type-create/draft").reply(200, {
    code: 0,
    msg: "ok",
    data: objectTypeCreateDraft,
  });
  mock.onGet("/mock/object-type-create/groups").reply(200, {
    code: 0,
    msg: "ok",
    data: {
      groups: objectTypeCreateDraft.objectGroups,
    },
  });
  mock.onGet(/\/mock\/object-type-create\/validate-/).reply((config) => {
    const value = String(config.params?.value ?? "");

    if (value.includes("duplicate")) {
      return [
        200,
        {
          code: 0,
          msg: "ok",
          data: {
            valid: false,
            message: "名称已存在",
          },
        },
      ];
    }

    return [200, successValidation];
  });
  mock.onPost("/mock/object-type-create/submit").reply((config) => {
    const body = JSON.parse(config.data ?? "{}") as { objectTypeName?: string; objectTypeId?: string };

    if (!body.objectTypeName || !body.objectTypeId) {
      return [
        200,
        {
          code: 0,
          msg: "ok",
          data: {
            id: "",
            name: "",
          },
        },
      ];
    }

    return [
      200,
      {
        code: 0,
        msg: "ok",
        data: {
          id: body.objectTypeId,
          name: body.objectTypeName,
        },
      },
    ];
  });
};
