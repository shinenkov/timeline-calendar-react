import { describe, it, expect } from "vitest";
import { getInitials } from "./initials";

describe("getInitials", () => {
  it("returns empty string for empty input", () => {
    expect(getInitials("")).toBe("");
  });

  it("returns empty string for whitespace-only input", () => {
    expect(getInitials("   ")).toBe("");
  });

  it("returns the first letter uppercased for a single word", () => {
    expect(getInitials("John")).toBe("J");
    expect(getInitials("john")).toBe("J");
  });

  it("returns last + first initials for two words", () => {
    expect(getInitials("John Doe")).toBe("DJ");
  });

  it("handles three or more words by using last + first", () => {
    expect(getInitials("John Ronald Reuel Tolkien")).toBe("TJ");
  });

  it("trims leading/trailing whitespace", () => {
    expect(getInitials("  John   Doe  ")).toBe("DJ");
  });

  it("collapses multiple spaces between words", () => {
    expect(getInitials("John    Doe")).toBe("DJ");
  });

  it("uppercases both letters", () => {
    expect(getInitials("john doe")).toBe("DJ");
  });
});
