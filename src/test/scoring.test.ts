import { describe, it, expect } from "vitest";
import { techniqueStatus, coveragePct, levelOf } from "@/lib/scoring";
describe("scoring", () => {
  it("full beats partial", () => expect(techniqueStatus(["none", "partial", "full"])).toBe("covered"));
  it("no defenses is a gap", () => expect(techniqueStatus([])).toBe("gap"));
  it("partial counts half", () => expect(coveragePct(["covered", "partial", "gap", "gap"])).toBe(38));
  it("bar color thresholds", () => {
    expect(levelOf(76)).toBe("good"); expect(levelOf(75)).toBe("mid"); expect(levelOf(40)).toBe("mid"); expect(levelOf(39)).toBe("bad");
  });
});
