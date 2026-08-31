import { describe, expect, it } from "vitest";
import { generateScores } from "@/util/hi3/scoreUtil";

// Memorial Arena thresholds: each mode starts from a raw score and decays by a
// fixed number of points per second, floored, for the first 45 seconds.
describe("generateScores", () => {
  const modes = ["SS", "SSS", "SSS +20%"] as const;

  it.each(modes)("returns 45 entries for %s", (mode) => {
    expect(generateScores(mode)).toHaveLength(45);
  });

  it.each(modes)("returns integers in strictly descending order for %s", (mode) => {
    const scores = generateScores(mode);
    for (const score of scores) {
      expect(Number.isInteger(score)).toBe(true);
    }
    for (let i = 1; i < scores.length; i += 1) {
      expect(scores[i]).toBeLessThan(scores[i - 1]);
    }
  });

  // The first entry is one second of decay off the raw start, not the raw start
  // itself — the loop applies (i + 1) seconds.
  it("starts one second below the raw start for each mode", () => {
    expect(generateScores("SS")[0]).toBe(Math.floor(32000 - (53 + 1 / 3)));
    expect(generateScores("SSS")[0]).toBe(Math.floor(40000 - (13 + 1 / 3)));
    expect(generateScores("SSS +20%")[0]).toBe(48000 - 16);
  });

  it("decays at the documented rate per second", () => {
    // 45 seconds of decay separates the first and last entries. Comparing the span
    // rather than adjacent pairs keeps the fractional SS/SSS rates exact.
    const span = (mode: (typeof modes)[number]) => {
      const s = generateScores(mode);
      return s[0] - s[s.length - 1];
    };
    expect(span("SS")).toBe(Math.floor(32000 - (53 + 1 / 3)) - Math.floor(32000 - (53 + 1 / 3) * 45));
    expect(span("SSS +20%")).toBe(16 * 44);
  });

  // SSS +20% is the highest-value tier at every second, then SSS, then SS — the
  // ordering the UI's mode buttons imply.
  it("keeps SSS +20% above SSS at every second", () => {
    const sss = generateScores("SSS");
    const sssUp = generateScores("SSS +20%");
    sss.forEach((score, i) => expect(sssUp[i]).toBeGreaterThan(score));
  });

  it("does not share array state between calls", () => {
    const first = generateScores("SS");
    first[0] = -1;
    expect(generateScores("SS")[0]).not.toBe(-1);
  });
});
