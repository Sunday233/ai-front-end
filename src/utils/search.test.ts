import { describe, expect, it } from "vitest";
import {
  filterByObjectKeyword,
  highlightKeyword,
  paginate,
  sortByUpdatedAtDesc,
} from "./search";

const rows = [
  {
    id: "ot-1",
    rid: "RID-001",
    name: "employee",
    updatedAt: "2025-11-27 17:52:56",
  },
  {
    id: "ot-2",
    rid: "RID-002",
    name: "回归测试1",
    updatedAt: "2026-01-06 16:41:43",
  },
  {
    id: "ot-3",
    rid: "RID-003",
    name: "工时统计",
    updatedAt: "2025-11-25 11:33:33",
  },
];

describe("object type search utilities", () => {
  it("filters by id, rid, or name with fuzzy matching", () => {
    expect(filterByObjectKeyword(rows, "emp")).toHaveLength(1);
    expect(filterByObjectKeyword(rows, "RID-00")).toHaveLength(3);
    expect(filterByObjectKeyword(rows, "工时")[0]?.name).toBe("工时统计");
  });

  it("sorts by updated time descending", () => {
    expect(sortByUpdatedAtDesc(rows)[0]?.name).toBe("回归测试1");
  });

  it("paginates with safe defaults", () => {
    expect(paginate(rows, 2, 2).map((row) => row.id)).toEqual(["ot-3"]);
    expect(paginate(rows, 0, 0)).toHaveLength(1);
  });

  it("wraps matched text with mark tag", () => {
    expect(highlightKeyword("employee", "ploy")).toBe("em<mark>ploy</mark>ee");
  });
});
