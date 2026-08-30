// Bilibili publish-time range (unix seconds) for the CN Abyss half-week matching 4 weeks ago.
// The week is chosen from the viewer's LOCAL day-of-week; boundaries are anchored to China
// Standard Time (UTC+8), when the CN Abyss half-weeks reset. Local Mon/Tue/Wed searches the
// CN Mon 00:00 -> Thu 00:00 half; local Thu/Fri/Sat/Sun searches the CN Fri 00:00 -> Mon 00:00
// half. Unix time is absolute, so the resulting range is correct in any timezone.
function abyssWeekRange(now: Date = new Date()): { begin: number; end: number } {
  const day = now.getDay(); // local getDay(): 0 = Sunday, 1 = Monday, ... 6 = Saturday
  const daysSinceMonday = (day + 6) % 7;
  // Calendar date (local) of the Monday four weeks before the current week.
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysSinceMonday - 28);

  // First half (local Mon/Tue/Wed): Mon -> Thu. Second half (local Thu-Sun): Fri -> next Mon.
  const firstHalf = day === 1 || day === 2 || day === 3;
  const beginDayOffset = firstHalf ? 0 : 4;
  const endDayOffset = firstHalf ? 3 : 7;

  // CST midnight (UTC+8) of the Monday plus a day offset, as unix seconds.
  const CST_OFFSET_MS = 8 * 60 * 60 * 1000;
  const cstMidnight = (dayOffset: number) =>
    Math.floor(
      (Date.UTC(monday.getFullYear(), monday.getMonth(), monday.getDate() + dayOffset) -
        CST_OFFSET_MS) /
        1000
    );

  return { begin: cstMidnight(beginDayOffset), end: cstMidnight(endDayOffset) - 1 };
}

// Human-readable form of a range, rendered in the China Standard Time its boundaries were
// anchored to — showing it in the viewer's local zone would land the edges on the wrong
// days. `end` is the last second of the closing day, so both ends read as inclusive dates
// (e.g. a Mon 00:00 -> Thu 00:00 half-week shows as Mon - Wed).
function formatAbyssRange({ begin, end }: { begin: number; end: number }): string {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Shanghai",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${fmt.format(new Date(begin * 1000))} – ${fmt.format(new Date(end * 1000))}`;
}

export { abyssWeekRange, formatAbyssRange };
