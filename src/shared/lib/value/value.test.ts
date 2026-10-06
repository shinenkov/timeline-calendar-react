import { describe, it, expect } from "vitest";
import { getValue } from "./value";

type TestItem = { id: number; label: string; color?: string };

describe("getValue", () => {
  const items: TestItem[] = [
    { id: 1, label: "Vacation", color: "#f00" },
    { id: 2, label: "Sick", color: undefined },
  ];

  describe("attribute is undefined", () => {
    it("returns defaultValue", () => {
      expect(getValue("fallback", undefined, "label", items)).toBe("fallback");
    });

    it("returns defaultValue when attribute and array are undefined", () => {
      expect(getValue("fallback")).toBe("fallback");
    });
  });

  describe("attribute is a string", () => {
    it("returns the attribute itself, ignoring type and array", () => {
      expect(getValue("fallback", "custom", "label", items)).toBe("custom");
    });

    it("returns the attribute even when array is empty", () => {
      expect(getValue("fallback", "custom", "label", [])).toBe("custom");
    });
  });

  describe("attribute is a number and array is a Map", () => {
    it("returns the value found in the map", () => {
      const map = new Map<number, string>([
        [1, "Sales"],
        [2, "Engineering"],
      ]);
      expect(getValue("fallback", 1, "label", map)).toBe("Sales");
    });

    it("returns defaultValue when key is missing", () => {
      const map = new Map<number, string>([[1, "Sales"]]);
      expect(getValue("fallback", 99, "label", map)).toBe("fallback");
    });
  });

  describe("attribute is a number and array is a list", () => {
    it("returns the field specified by type when it exists", () => {
      expect(getValue("fallback", 1, "label", items)).toBe("Vacation");
      expect(getValue("fallback", 1, "color", items)).toBe("#f00");
    });

    it("returns defaultValue when the field is missing on the object", () => {
      expect(getValue("fallback", 2, "color", items)).toBe("fallback");
    });

    it("returns defaultValue when id is not found", () => {
      expect(getValue("fallback", 999, "label", items)).toBe("fallback");
    });

    it("returns defaultValue when type is undefined", () => {
      expect(getValue("fallback", 1, undefined as never, items)).toBe(
        "fallback",
      );
    });
  });

  describe("attribute is a number but array is not provided", () => {
    it("returns defaultValue", () => {
      expect(getValue("fallback", 1, "label")).toBe("fallback");
    });
  });
});
