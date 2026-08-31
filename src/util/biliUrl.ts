// URL machinery shared by every Bilibili search page (HI3, AKE).
//
// Each page contributes its own "dimensions" — one array of alternative search terms per
// thing the user picked — and this module turns them into the finished link list. Keeping
// the assembly in one place means a change to the Bilibili query convention (the sort
// param, the date filter, the separator) lands on every page at once.

// Optional Bilibili publish-time filter, in unix seconds.
export interface DateRange {
  begin: number;
  end: number;
}

// Whether the viewer is on a mobile device, by user agent. Drives the search host below,
// and lets the pages hide options Bilibili only honours on desktop. UA sniffing rather than
// a viewport check on purpose: what matters is which Bilibili front end the link will open
// (m.bilibili.com or the app), not how wide the window is.
export function isMobile(): boolean {
  return window.navigator.userAgent.toLowerCase().includes("mobi");
}

// Cartesian product of the given arrays of strings.
export function* combine(arrOfArr: string[][]): Generator<string[]> {
  const [head, ...tail] = arrOfArr;
  const remainder = tail.length ? combine(tail) : [[]];
  for (const r of remainder) for (const h of head) yield [h, ...r];
}

// Bilibili's search host, which differs on mobile.
export function biliBaseUrl(): string {
  return isMobile()
    ? "https://m.bilibili.com/search?keyword="
    : "https://search.bilibili.com/all?keyword=";
}

export interface KeywordLinkOptions {
  dateRange?: DateRange | null;
  // Applied to the assembled keyword before it is trimmed, for page-specific escaping.
  transformKeyword?: (keyword: string) => string;
}

// One link per combination of the given dimensions.
//
// Dimensions are joined with "+", which Bilibili reads as a term separator — so a literal
// "+" inside a term has to reach here already encoded as %2B. Combinations with no terms
// at all are dropped, so an empty selection yields no links rather than a blank bullet.
export function buildKeywordLinks(
  dimensions: string[][],
  { dateRange = null, transformKeyword }: KeywordLinkOptions = {}
): string[] {
  const baseUrl = biliBaseUrl();

  // Bilibili returns poor results when a publish-time range is combined with
  // &order=pubdate, so the two are mutually exclusive: with a date range we rely on the
  // range alone (it already narrows things down enough that sorting adds little), and
  // without one we sort newest-first. Either way the params start with a fixed literal
  // (&pubtime_begin_s= or &order=pubdate), which is what displayLink below cuts on.
  const suffix = dateRange
    ? `&pubtime_begin_s=${dateRange.begin}&pubtime_end_s=${dateRange.end}`
    : "&order=pubdate";

  return Array.from(combine(dimensions))
    .map((terms) => terms.filter((term) => term !== ""))
    .filter((terms) => terms.length > 0)
    .map((terms) => {
      const keyword = terms.join("+");
      return `${baseUrl}${(transformKeyword ? transformKeyword(keyword) : keyword).trim()}${suffix}`;
    })
    .sort((a, b) => a.length - b.length || a.localeCompare(b));
}

// Human-readable label for a generated link: only the search terms, no URL or params.
// Shared by every search page, so the label reads the same wherever links are listed —
// and so the cut rule below cannot drift from the suffix built above.
export function displayLink(link: string): string {
  const afterKeyword = link.split("keyword=")[1] ?? link;
  // A link carries either &order=pubdate (no date filter) or &pubtime_begin_s=… (date
  // filter, which drops the sort), never both, and whichever it is leads the query params.
  // Cutting at the first of those two literals drops them and anything after. Matching the
  // whole literal (not a bare "&") means a search term containing "&" won't truncate it.
  const terms = afterKeyword.split(/&(?:order=pubdate|pubtime_begin_s=)/)[0];
  return terms.replaceAll("+", " ").replaceAll("%2B", "+");
}
