import { resetApiMock, setupApiMock } from "@/services/mock";
import { getObjectTypeList, searchObjectTypes } from "@/services/object-type-list";
import { beforeEach, describe, expect, it } from "vitest";

describe("object type list service", () => {
  beforeEach(() => {
    resetApiMock();
    setupApiMock();
  });

  it("returns the default visible rows in design order", async () => {
    const result = await getObjectTypeList({ pageNo: 1, pageSize: 10, keyword: "" });

    expect(result.total).toBe(39);
    expect(result.list).toHaveLength(9);
    expect(result.list.map((item) => item.name)).toEqual([
      "回归测试1",
      "employee",
      "eeww3",
      "工时统计",
      "部件",
      "aa11",
      "rrr",
      "kejie222",
      "kejie22",
    ]);
  });

  it("searches by keyword without changing row schema", async () => {
    const result = await searchObjectTypes({ pageNo: 1, pageSize: 10, keyword: "kejie" });

    expect(result.list.map((item) => item.name)).toEqual(["kejie222", "kejie22"]);
    expect(result.list.every((item) => item.visibility === "可见")).toBe(true);
  });
});
