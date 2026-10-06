import { describe, it, expect } from "vitest";
import { getRangeStyle, getDaysArray, getRange } from "./range";

describe("getRangeStyle", () => {
  const WIDTH = 40;
  const COLOR = "#f44336";

  it("returns base style with shift when no flags are set", () => {
    const style = getRangeStyle(WIDTH, COLOR, false, false);
    expect(style.width).toBe("32px");
    expect(style.maxWidth).toBe("32px");
    expect(style.background).toBe("#f4433655");
    expect(style.color).toBe("#f44336");
    expect(style.border).toBe("0px solid #f4433655");
  });

  it("uses a single shift when isEndNextMonth", () => {
    const style = getRangeStyle(WIDTH, COLOR, false, true);
    expect(style.width).toBe("36px");
    expect(style.maxWidth).toBe("36px");
  });

  it("uses full width when isAllMonth", () => {
    const style = getRangeStyle(WIDTH, COLOR, true, false);
    expect(style.width).toBe("40px");
    expect(style.maxWidth).toBe("40px");
  });

  it("isAllMonth wins over isEndNextMonth", () => {
    const style = getRangeStyle(WIDTH, COLOR, true, true);
    expect(style.width).toBe("40px");
    expect(style.maxWidth).toBe("40px");
  });

  it("falls back to default color when color is undefined", () => {
    const style = getRangeStyle(WIDTH, undefined, false, false);
    expect(style.background).toBe("#f4433655");
    expect(style.color).toBe("#f44336");
    expect(style.border).toBe("0px solid #f4433655");
  });
});

describe("getDaysArray", () => {
  it("returns 30 entries for April", () => {
    expect(getDaysArray("2025-04-01", "en")).toHaveLength(30);
  });

  it("returns 28 entries for February in a non-leap year", () => {
    expect(getDaysArray("2025-02-01", "en")).toHaveLength(28);
  });

  it("returns 29 entries for February in a leap year", () => {
    expect(getDaysArray("2024-02-01", "en")).toHaveLength(29);
  });

  it("returns English day-of-week abbreviations", () => {
    const result = getDaysArray("2025-04-01", "en");
    expect(result[0]).toBe("Tu");
    expect(result[5]).toBe("Su");
    expect(result[6]).toBe("Mo");
  });

  it("returns Russian day-of-week abbreviations", () => {
    const result = getDaysArray("2025-04-01", "ru");
    expect(result[0]).toBe("вт");
    expect(result[5]).toBe("вс");
    expect(result[6]).toBe("пн");
  });
});

describe("getRange", () => {
  it("returns a full ascending range", () => {
    expect(getRange(1, 5, "2025-04-01")).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns single-element array when start equals end", () => {
    expect(getRange(3, 3, "2025-04-01")).toEqual([3]);
  });

  it("extends to the last day of month when end < start (April, 30 days)", () => {
    expect(getRange(25, 3, "2025-04-01")).toEqual([25, 26, 27, 28, 29, 30]);
  });

  it("extends to the last day of February (28 days)", () => {
    expect(getRange(26, 3, "2025-02-01")).toEqual([26, 27, 28]);
  });
});
