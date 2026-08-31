import { describe, expect, it } from "vitest";
import { abyssWeekRange, formatAbyssRange } from "@/util/hi3/dates";

// Renders a unix-second boundary the way CN players read it: CST weekday + clock.
// Weekday and time use separate formatters because the punctuation a combined
// weekday+time format inserts varies by ICU version. hourCycle "h23" keeps midnight
// as 00:00:00 rather than the 24:00:00 some builds emit for hour12: false.
const cstWeekday = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Shanghai",
  weekday: "short",
});
const cstTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Shanghai",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});
const cstStamp = (unixSeconds: number) => {
  const date = new Date(unixSeconds * 1000);
  return `${cstWeekday.format(date)} ${cstTime.format(date)}`;
};

const DAY = 24 * 60 * 60;

// A local noon on the given date, so the "which weekday is it" branch is picked from
// an unambiguous local day regardless of the machine's timezone.
const localNoon = (iso: string) => new Date(`${iso}T12:00:00`);

describe("abyssWeekRange", () => {
  // Local Mon/Tue/Wed -> the CN Mon 00:00 -> Thu 00:00 half-week.
  it.each([
    ["2026-08-24", "Mon"],
    ["2026-08-25", "Tue"],
    ["2026-08-26", "Wed"],
  ])("covers CN Mon 00:00:00 through Wed 23:59:59 when local day is %s (%s)", (iso) => {
    const { begin, end } = abyssWeekRange(localNoon(iso));
    expect(cstStamp(begin)).toBe("Mon 00:00:00");
    expect(cstStamp(end)).toBe("Wed 23:59:59");
  });

  // Local Thu-Sun -> the CN Fri 00:00 -> Mon 00:00 half-week.
  it.each([
    ["2026-08-27", "Thu"],
    ["2026-08-28", "Fri"],
    ["2026-08-29", "Sat"],
    ["2026-08-30", "Sun"],
  ])("covers CN Fri 00:00:00 through Sun 23:59:59 when local day is %s (%s)", (iso) => {
    const { begin, end } = abyssWeekRange(localNoon(iso));
    expect(cstStamp(begin)).toBe("Fri 00:00:00");
    expect(cstStamp(end)).toBe("Sun 23:59:59");
  });

  it("spans 3 days for the first half and 3 days for the second", () => {
    // end is the closing boundary minus a second, so a Mon->Thu half is 3 days - 1s.
    const firstHalf = abyssWeekRange(localNoon("2026-08-26"));
    expect(firstHalf.end - firstHalf.begin).toBe(3 * DAY - 1);
    const secondHalf = abyssWeekRange(localNoon("2026-08-29"));
    expect(secondHalf.end - secondHalf.begin).toBe(3 * DAY - 1);
  });

  it("targets the cycle roughly 4 weeks back", () => {
    const now = localNoon("2026-08-29");
    const { begin } = abyssWeekRange(now);
    const weeksBack = (now.getTime() / 1000 - begin) / (7 * DAY);
    expect(weeksBack).toBeGreaterThan(3.5);
    expect(weeksBack).toBeLessThan(5);
  });

  it("returns whole unix seconds with begin before end", () => {
    const { begin, end } = abyssWeekRange(localNoon("2026-08-29"));
    expect(Number.isInteger(begin)).toBe(true);
    expect(Number.isInteger(end)).toBe(true);
    expect(begin).toBeLessThan(end);
  });

  // Sunday is day 0 from getDay(); the (day + 6) % 7 shift is what keeps it in the
  // Thu-Sun half rather than wrapping to the start of the week.
  it("groups Sunday with the second half, not the following week", () => {
    const sunday = abyssWeekRange(localNoon("2026-08-30"));
    const saturday = abyssWeekRange(localNoon("2026-08-29"));
    expect(sunday).toEqual(saturday);
  });

  it("keeps consecutive weeks 7 days apart", () => {
    const thisWeek = abyssWeekRange(localNoon("2026-08-29"));
    const nextWeek = abyssWeekRange(localNoon("2026-09-05"));
    expect(nextWeek.begin - thisWeek.begin).toBe(7 * DAY);
  });

  it("handles a range that crosses a month boundary", () => {
    // Local Sat 2026-08-29 resolves 4 weeks back to Jul 31 - Aug 2.
    const { begin, end } = abyssWeekRange(localNoon("2026-08-29"));
    expect(cstStamp(begin)).toBe("Fri 00:00:00");
    expect(cstStamp(end)).toBe("Sun 23:59:59");
    expect(formatAbyssRange({ begin, end })).toBe("Jul 31, 2026 – Aug 2, 2026");
  });
});

describe("formatAbyssRange", () => {
  it("renders both ends as inclusive CN calendar dates", () => {
    const range = abyssWeekRange(localNoon("2026-08-26"));
    // Mon 00:00 -> Thu 00:00 must read as Mon - Wed, never Mon - Thu.
    expect(formatAbyssRange(range)).toBe("Jul 27, 2026 – Jul 29, 2026");
  });

  it("formats in CN time, not the host timezone", () => {
    // 1754006400 is 2025-08-01 00:00:00 CST, which is still Jul 31 in UTC and the US.
    const label = formatAbyssRange({ begin: 1754006400, end: 1754006400 });
    expect(label).toBe("Aug 1, 2025 – Aug 1, 2025");
  });

  it("separates the two dates with an en dash", () => {
    expect(formatAbyssRange(abyssWeekRange(localNoon("2026-08-29")))).toContain(" – ");
  });
});
