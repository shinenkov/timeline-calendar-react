import { describe, it, expect } from "vitest";
import { compareUserWithRanges } from "./compareUserWithRanges";
import type { RangeType } from "entities/range";
import type { User, Department } from "entities/user";
import type { EventType } from "entities/event";
import type { StatusType } from "entities/status";

const users: User[] = [
  { id: 1, name: "John Doe", department: 10 },
  { id: 2, name: "Jane Smith", department: "Marketing" },
  { id: 3, name: "Bob Brown" },
];

const departments: Department[] = [{ id: 10, name: "Engineering" }];

const ranges: RangeType[] = [
  {
    id: 1,
    userId: 1,
    eventType: 1,
    statusType: 1,
    startDate: "2025-04-01",
    endDate: "2025-04-05",
  },
  {
    id: 2,
    userId: 1,
    eventType: 2,
    statusType: 2,
    startDate: "2025-04-10",
    endDate: "2025-04-15",
  },
  {
    id: 3,
    userId: 2,
    eventType: 1,
    statusType: 2,
    startDate: "2025-04-01",
    endDate: "2025-04-03",
  },
];

const eventsById: EventType[] = [
  { id: 1, label: "Vacation" },
  { id: 2, label: "Sick leave" },
];

const _eventsByLabel: EventType[] = [
  { id: 0, label: "Vacation" },
  { id: 1, label: "Sick leave" },
];

const _statuses: StatusType[] = [
  { id: 1, label: "Approved" },
  { id: 2, label: "Pending" },
];

describe("compareUserWithRanges", () => {
  it("returns [] when users is null", () => {
    expect(compareUserWithRanges(null, ranges)).toEqual([]);
  });

  it("returns all users with empty events when ranges is null", () => {
    const result = compareUserWithRanges(users, null);
    expect(result).toHaveLength(3);
    expect(result.every((u) => u.events.length === 0)).toBe(true);
  });

  it("groups ranges by userId", () => {
    const result = compareUserWithRanges(users, ranges);
    expect(result.find((u) => u.id === 1)?.events).toHaveLength(2);
    expect(result.find((u) => u.id === 2)?.events).toHaveLength(1);
    expect(result.find((u) => u.id === 3)?.events).toHaveLength(0);
  });

  it("resolves numeric department via the departments map", () => {
    const result = compareUserWithRanges(
      users,
      ranges,
      undefined,
      undefined,
      undefined,
      departments,
    );
    expect(result.find((u) => u.id === 1)?.department).toBe("Engineering");
  });

  it("keeps string department as-is", () => {
    const result = compareUserWithRanges(users, ranges);
    expect(result.find((u) => u.id === 2)?.department).toBe("Marketing");
  });

  it("returns empty department when user has no department", () => {
    const result = compareUserWithRanges(users, ranges);
    expect(result.find((u) => u.id === 3)?.department).toBe("");
  });

  describe("search by name", () => {
    it("filters users by substring (case-insensitive)", () => {
      const result = compareUserWithRanges(
        users,
        ranges,
        undefined,
        undefined,
        "john",
      );
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("John Doe");
    });

    it("ignores whitespace-only search", () => {
      const result = compareUserWithRanges(
        users,
        ranges,
        undefined,
        undefined,
        "   ",
      );
      expect(result).toHaveLength(3);
    });

    it("ignores leading and trailing whitespace in search", () => {
      const result = compareUserWithRanges(
        users,
        ranges,
        undefined,
        undefined,
        "  John  ",
      );
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("John Doe");
    });

    it("escapes regex special chars in search", () => {
      const specialUsers: User[] = [
        { id: 1, name: "Test (Special)" },
        { id: 2, name: "Normal" },
      ];
      const result = compareUserWithRanges(
        specialUsers,
        null,
        undefined,
        undefined,
        "(Special)",
      );
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Test (Special)");
    });
  });

  describe("filter by numeric eventType", () => {
    it("keeps only ranges whose eventType id is in selectedEvents", () => {
      const result = compareUserWithRanges(
        users,
        ranges,
        [{ id: 1, label: "Vacation" }],
        undefined,
      );
      const john = result.find((u) => u.id === 1);
      expect(john?.events).toHaveLength(1);
      expect(john?.events[0].id).toBe(1);
    });
  });

  describe("filter by string eventType (regression)", () => {
    it("matches by label, not by object identity", () => {
      const stringRanges: RangeType[] = [
        { id: 1, userId: 1, eventType: "Vacation", startDate: "2025-04-01" },
        { id: 2, userId: 1, eventType: "Sick leave", startDate: "2025-04-05" },
      ];
      const result = compareUserWithRanges(users, stringRanges, [
        { id: 0, label: "Vacation" },
      ]);
      const john = result.find((u) => u.id === 1);
      expect(john?.events).toHaveLength(1);
      expect(john?.events[0].eventType).toBe("Vacation");
    });
  });

  describe("filter by statusType", () => {
    it("keeps only ranges with matching status id", () => {
      const result = compareUserWithRanges(users, ranges, undefined, [
        { id: 1, label: "Approved" },
      ]);
      const allEvents = result.flatMap((u) => u.events);
      expect(allEvents).toHaveLength(1);
      expect(allEvents[0].statusType).toBe(1);
    });
  });

  describe("combined event + status filter", () => {
    it("requires both filters to pass", () => {
      const result = compareUserWithRanges(
        users,
        ranges,
        [{ id: 1, label: "Vacation" }],
        [{ id: 2, label: "Pending" }],
      );
      const allEvents = result.flatMap((u) => u.events);
      expect(allEvents).toHaveLength(1);
      expect(allEvents[0].id).toBe(3);
    });
  });

  describe("ranges without eventType", () => {
    it("are dropped when an event filter is active", () => {
      const rangesNoEvent: RangeType[] = [
        { id: 1, userId: 1, startDate: "2025-04-01" },
      ];
      const result = compareUserWithRanges(users, rangesNoEvent, eventsById);
      expect(result.flatMap((u) => u.events)).toHaveLength(0);
    });

    it("are kept when no event filter is active", () => {
      const rangesNoEvent: RangeType[] = [
        { id: 1, userId: 1, startDate: "2025-04-01" },
      ];
      const result = compareUserWithRanges(users, rangesNoEvent);
      expect(result.find((u) => u.id === 1)?.events).toHaveLength(1);
    });
  });
});
