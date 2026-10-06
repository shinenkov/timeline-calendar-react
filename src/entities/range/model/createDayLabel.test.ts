import { describe, it, expect } from "vitest";
import { createDayLabel } from "./createDayLabel";

describe("createDayLabel", () => {
  describe("russian plural forms", () => {
    it("uses 'День' for 1, 21, 31", () => {
      expect(createDayLabel(1, "ru")).toBe("1 День");
      expect(createDayLabel(21, "ru")).toBe("21 День");
      expect(createDayLabel(31, "ru")).toBe("31 День");
    });

    it("uses 'Дня' for 2, 3, 4, 22, 23, 24", () => {
      expect(createDayLabel(2, "ru")).toBe("2 Дня");
      expect(createDayLabel(3, "ru")).toBe("3 Дня");
      expect(createDayLabel(4, "ru")).toBe("4 Дня");
      expect(createDayLabel(22, "ru")).toBe("22 Дня");
      expect(createDayLabel(23, "ru")).toBe("23 Дня");
      expect(createDayLabel(24, "ru")).toBe("24 Дня");
    });

    it("uses 'Дней' for 5, 6, 10, 11, 12, 20, 25", () => {
      expect(createDayLabel(5, "ru")).toBe("5 Дней");
      expect(createDayLabel(6, "ru")).toBe("6 Дней");
      expect(createDayLabel(10, "ru")).toBe("10 Дней");
      expect(createDayLabel(11, "ru")).toBe("11 Дней");
      expect(createDayLabel(12, "ru")).toBe("12 Дней");
      expect(createDayLabel(20, "ru")).toBe("20 Дней");
      expect(createDayLabel(25, "ru")).toBe("25 Дней");
    });

    it("uses 'Дней' for numbers 11-14 (edge case of Russian plurals)", () => {
      expect(createDayLabel(11, "ru")).toBe("11 Дней");
      expect(createDayLabel(12, "ru")).toBe("12 Дней");
      expect(createDayLabel(13, "ru")).toBe("13 Дней");
      expect(createDayLabel(14, "ru")).toBe("14 Дней");
      expect(createDayLabel(111, "ru")).toBe("111 Дней");
      expect(createDayLabel(112, "ru")).toBe("112 Дней");
    });

    it("uses 'День' for 101, 121 (not 'Дней')", () => {
      expect(createDayLabel(101, "ru")).toBe("101 День");
      expect(createDayLabel(121, "ru")).toBe("121 День");
    });
  });

  describe("english plural forms", () => {
    it("uses 'Day' for 1", () => {
      expect(createDayLabel(1, "en")).toBe("1 Day");
    });

    it("uses 'Days' for 2 and above", () => {
      expect(createDayLabel(2, "en")).toBe("2 Days");
      expect(createDayLabel(5, "en")).toBe("5 Days");
      expect(createDayLabel(11, "en")).toBe("11 Days");
      expect(createDayLabel(21, "en")).toBe("21 Days");
    });

    it("uses 'Days' for 0 (English plural for zero)", () => {
      expect(createDayLabel(0, "en")).toBe("0 Days");
    });
  });
});
