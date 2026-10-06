import { describe, it, expect } from "vitest";
import { getRangesArray } from "./getRangesArray";
import type { UserWithRangeType } from "entities/user";
import type { RangeType } from "./types";

const makeUser = (events: RangeType[]): UserWithRangeType => ({
  id: 1,
  name: "John Doe",
  events,
});

const makeRange = (overrides: Partial<RangeType> = {}): RangeType => ({
  id: 1,
  userId: 1,
  startDate: "2025-04-01",
  endDate: "2025-04-01",
  ...overrides,
});

const CURRENT = "2025-04-01";
const TD = 20;

describe("getRangesArray", () => {
  it("returns an array with one entry per day of the month", () => {
    const result = getRangesArray(makeUser([]), CURRENT, TD);
    expect(result).toHaveLength(30);
  });

  it("returns only { isStart: false } when the user has no events", () => {
    const result = getRangesArray(makeUser([]), CURRENT, TD);
    expect(result.every((r) => r.isStart === false)).toBe(true);
  });

  it("returns 28 entries for February in a non-leap year", () => {
    const result = getRangesArray(makeUser([]), "2025-02-01", TD);
    expect(result).toHaveLength(28);
  });

  it("returns 29 entries for February in a leap year", () => {
    const result = getRangesArray(makeUser([]), "2024-02-01", TD);
    expect(result).toHaveLength(29);
  });

  describe("single event within the month", () => {
    const user = makeUser([
      makeRange({ startDate: "2025-04-10", endDate: "2025-04-15" }),
    ]);

    it("marks the event start day with isStart: true", () => {
      const result = getRangesArray(user, CURRENT, TD);
      expect(result[9].isStart).toBe(true);
    });

    it("marks all other days with isStart: false", () => {
      const result = getRangesArray(user, CURRENT, TD);
      const startIndexes = result
        .map((r, i) => (r.isStart ? i : -1))
        .filter((i) => i !== -1);
      expect(startIndexes).toEqual([9]);
    });

    it("computes width as tdWidth * daysInRange", () => {
      const result = getRangesArray(user, CURRENT, TD);
      expect(result[9].width).toBe(TD * 6);
    });

    it("fills the range entry with the original event fields", () => {
      const result = getRangesArray(user, CURRENT, TD);
      expect(result[9]).toMatchObject({
        id: 1,
        userId: 1,
        startDate: "2025-04-10",
        endDate: "2025-04-15",
      });
    });
  });

  describe("event starting on the 1st of the month", () => {
    const user = makeUser([
      makeRange({ startDate: "2025-04-01", endDate: "2025-04-05" }),
    ]);

    it("marks index 0 as start", () => {
      const result = getRangesArray(user, CURRENT, TD);
      expect(result[0].isStart).toBe(true);
    });

    it("does not set isStartPrevMonth or isEndNextMonth", () => {
      const result = getRangesArray(user, CURRENT, TD);
      expect(result[0].isStartPrevMonth).toBe(false);
      expect(result[0].isEndNextMonth).toBe(false);
      expect(result[0].isAllMonth).toBe(false);
    });
  });

  describe("event crossing the previous month boundary", () => {
    const user = makeUser([
      makeRange({ startDate: "2025-03-25", endDate: "2025-04-05" }),
    ]);

    it("marks index 0 as start (currentDay.date() === 1)", () => {
      const result = getRangesArray(user, CURRENT, TD);
      expect(result[0].isStart).toBe(true);
    });

    it("sets isStartPrevMonth: true", () => {
      const result = getRangesArray(user, CURRENT, TD);
      expect(result[0].isStartPrevMonth).toBe(true);
      expect(result[0].isEndNextMonth).toBe(false);
    });

    it("computes width up to the event end date", () => {
      const result = getRangesArray(user, CURRENT, TD);
      expect(result[0].width).toBe(TD * 5);
    });
  });

  describe("event crossing the next month boundary", () => {
    const user = makeUser([
      makeRange({ startDate: "2025-04-28", endDate: "2025-05-03" }),
    ]);

    it("sets isEndNextMonth: true", () => {
      const result = getRangesArray(user, CURRENT, TD);
      expect(result[27].isEndNextMonth).toBe(true);
      expect(result[27].isStartPrevMonth).toBe(false);
    });

    it("clamps width to the end of the current month", () => {
      const result = getRangesArray(user, CURRENT, TD);
      expect(result[27].width).toBe(TD * 3);
    });
  });

  describe("event covering the entire month", () => {
    const user = makeUser([
      makeRange({ startDate: "2025-03-25", endDate: "2025-05-05" }),
    ]);

    it("sets isAllMonth, isStartPrevMonth and isEndNextMonth", () => {
      const result = getRangesArray(user, CURRENT, TD);
      expect(result[0].isStart).toBe(true);
      expect(result[0].isAllMonth).toBe(true);
      expect(result[0].isStartPrevMonth).toBe(true);
      expect(result[0].isEndNextMonth).toBe(true);
    });
  });

  describe("multiple events", () => {
    const user = makeUser([
      makeRange({
        id: 1,
        startDate: "2025-04-01",
        endDate: "2025-04-03",
      }),
      makeRange({
        id: 2,
        startDate: "2025-04-20",
        endDate: "2025-04-22",
      }),
    ]);

    it("marks both event starts", () => {
      const result = getRangesArray(user, CURRENT, TD);
      const starts = result
        .map((r, i) => (r.isStart ? i : -1))
        .filter((i) => i !== -1);
      expect(starts).toEqual([0, 19]);
    });
  });

  describe("tdWidth = null", () => {
    const user = makeUser([
      makeRange({ startDate: "2025-04-10", endDate: "2025-04-12" }),
    ]);

    it("falls back to width 0", () => {
      const result = getRangesArray(user, CURRENT, null);
      expect(result[9].width).toBe(0);
    });
  });
});
