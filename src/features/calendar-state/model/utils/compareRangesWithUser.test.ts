import { describe, it, expect } from "vitest";
import { compareRangesWithUser } from "./compareRangesWithUser";
import type { RangeType } from "entities/range";
import type { User, Department } from "entities/user";

const users: User[] = [
  { id: 1, name: "John", department: "Sales" },
  { id: 2, name: "Jane", department: 10 },
];

const departments: Department[] = [
  { id: 10, name: "Engineering" },
  { id: 20, name: "Design" },
];

const ranges: RangeType[] = [
  {
    id: 1,
    userId: 1,
    startDate: "2025-04-01",
    endDate: "2025-04-05",
  },
  {
    id: 2,
    userId: 2,
    startDate: "2025-04-10",
    endDate: "2025-04-15",
  },
  {
    id: 3,
    userId: 999,
    startDate: "2025-04-20",
    endDate: "2025-04-22",
  },
];

describe("compareRangesWithUser", () => {
  it("returns [] when events is null", () => {
    expect(compareRangesWithUser(null, users)).toEqual([]);
  });

  it("returns [] when events is empty", () => {
    expect(compareRangesWithUser([], users)).toEqual([]);
  });

  it("drops ranges whose userId does not match any user", () => {
    const result = compareRangesWithUser(ranges, users);
    expect(result).toHaveLength(2);
    expect(result.find((r) => r.userId === 999)).toBeUndefined();
  });

  it("attaches the user name to each range", () => {
    const result = compareRangesWithUser(ranges, users);
    const r1 = result.find((r) => r.userId === 1);
    expect(r1?.name).toBe("John");
  });

  it("resolves department from a string as-is", () => {
    const result = compareRangesWithUser(ranges, users);
    const r1 = result.find((r) => r.userId === 1);
    expect(r1?.department).toBe("Sales");
  });

  it("resolves department from a numeric id via the departments map", () => {
    const result = compareRangesWithUser(ranges, users, departments);
    const r2 = result.find((r) => r.userId === 2);
    expect(r2?.department).toBe("Engineering");
  });

  it("returns empty department when numeric id has no match", () => {
    const result = compareRangesWithUser(ranges, users);
    const r2 = result.find((r) => r.userId === 2);
    expect(r2?.department).toBe("");
  });

  it("returns empty department when user has no department", () => {
    const userNoDept: User = { id: 3, name: "Bob" };
    const result = compareRangesWithUser(
      [{ id: 4, userId: 3, startDate: "2025-04-01" }],
      [userNoDept],
    );
    expect(result[0].department).toBe("");
  });

  it("preserves the original range fields on each result", () => {
    const result = compareRangesWithUser(ranges, users);
    const r1 = result.find((r) => r.userId === 1);
    expect(r1).toMatchObject({
      id: 1,
      startDate: "2025-04-01",
      endDate: "2025-04-05",
      userId: 1,
    });
  });
});
