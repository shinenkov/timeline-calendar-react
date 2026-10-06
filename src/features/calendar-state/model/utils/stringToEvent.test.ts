import { describe, it, expect } from "vitest";
import { stringToEvent } from "./stringToEvent";

describe("stringToEvent", () => {
  it("returns an array with one entry per input string", () => {
    expect(stringToEvent(["a", "b", "c"])).toHaveLength(3);
  });

  it("assigns sequential ids starting at 0", () => {
    const result = stringToEvent(["x", "y"]);
    expect(result[0].id).toBe(0);
    expect(result[1].id).toBe(1);
  });

  it("preserves the input order in labels", () => {
    const result = stringToEvent(["Vacation", "Sick", "Personal"]);
    expect(result.map((r) => r.label)).toEqual([
      "Vacation",
      "Sick",
      "Personal",
    ]);
  });

  it("assigns colors deterministically by index", () => {
    const first = stringToEvent(["a", "b", "c"]);
    const second = stringToEvent(["a", "b", "c"]);
    expect(first.map((r) => r.color)).toEqual(second.map((r) => r.color));
  });

  it("cycles colors when there are more items than palette entries", () => {
    const input = Array.from({ length: 23 }, (_, i) => `item-${i}`);
    const result = stringToEvent(input);
    expect(result[0].color).toBe(result[11].color);
    expect(result[11].color).toBe(result[22].color);
  });

  it("icon is always undefined", () => {
    const result = stringToEvent(["a", "b"]);
    expect(result.every((r) => r.icon === undefined)).toBe(true);
  });

  it("returns an empty array for empty input", () => {
    expect(stringToEvent([])).toEqual([]);
  });
});
