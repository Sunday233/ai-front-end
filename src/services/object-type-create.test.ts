import { resetApiMock, setupApiMock } from "@/services/mock";
import { getObjectTypeCreateDraft } from "@/services/object-type-create";
import { beforeEach, describe, expect, it } from "vitest";

describe("object type create service", () => {
  beforeEach(() => {
    resetApiMock();
    setupApiMock();
  });

  it("keeps dataset fields and attributes mapped row by row", async () => {
    const draft = await getObjectTypeCreateDraft();

    expect(draft.mappingRows.map((row) => row.sourceField.name)).toEqual([
      "emp_no",
      "hight",
      "birth_date",
      "first_name",
      "last_name",
      "gender",
    ]);
    expect(draft.mappingRows[1]).toMatchObject({
      sourceField: { name: "hight", type: "Float" },
      targetAttribute: { name: "hight", type: "Float", countText: "5 / 64" },
      removable: true,
    });
  });
});
