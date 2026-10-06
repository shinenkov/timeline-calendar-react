import { describe, it, expect } from "vitest";
import { isSameDate } from "./date";

describe("isSameDate", () => {
  it("returns true for identical ISO dates", () => {
    expect(isSameDate("2025-04-01", "2025-04-01")).toBe(true);
  });

  it("returns true for dates with different time but same day", () => {
    expect(isSameDate("2025-04-01T10:00:00", "2025-04-01T22:30:00")).toBe(true);
  });

  it("returns true for the same day in different formats", () => {
    expect(isSameDate("2025-04-01", "2025-04-01T00:00:00")).toBe(true);
  });

  it("returns false for different days in the same month", () => {
    expect(isSameDate("2025-04-01", "2025-04-02")).toBe(false);
  });

  it("returns false for the same day in different months", () => {
    expect(isSameDate("2025-04-01", "2025-05-01")).toBe(false);
  });

  it("returns false for the same day in different years", () => {
    expect(isSameDate("2025-04-01", "2024-04-01")).toBe(false);
  });
});
