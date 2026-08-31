import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { biliBaseUrl, buildKeywordLinks, combine, displayLink } from "@/util/biliUrl";

// The URL machinery both search pages share. Fixtures here are deliberately synthetic
// ASCII rather than translation data: this file must stay true when a game's dictionaries
// change, and a failure here should point at the URL convention, not at HI3 or AKE.
// Per-game wiring (which dimensions, in what order) is asserted in tests/<game>/.

const DESKTOP = "https://search.bilibili.com/all?keyword=";
const MOBILE = "https://m.bilibili.com/search?keyword=";

// buildKeywordLinks reads navigator.userAgent to choose the host.
const setUserAgent = (ua: string) => {
  (globalThis as any).window = { navigator: { userAgent: ua } };
};

beforeEach(() => setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)"));
afterEach(() => delete (globalThis as any).window);

// The search terms of a link: everything between "keyword=" and the date-range params,
// which are the only params a link can carry.
const keywordOf = (link: string) => link.split("keyword=")[1].split("&pubtime_begin_s=")[0];

describe("combine", () => {
  it("produces the cartesian product of every dimension", () => {
    expect(Array.from(combine([["a", "b"], ["x", "y"]]))).toEqual([
      ["a", "x"],
      ["b", "x"],
      ["a", "y"],
      ["b", "y"],
    ]);
  });

  it("yields one combination per element for a single dimension", () => {
    expect(Array.from(combine([["a", "b", "c"]]))).toEqual([["a"], ["b"], ["c"]]);
  });

  it("collapses to nothing when any dimension is empty", () => {
    expect(Array.from(combine([["a"], []]))).toEqual([]);
  });
});

describe("biliBaseUrl", () => {
  it("uses the desktop host on desktop user agents", () => {
    expect(biliBaseUrl()).toBe(DESKTOP);
  });

  it("uses the mobile host when the user agent says mobi", () => {
    setUserAgent("Mozilla/5.0 (Linux; Android 14) Mobile Safari/537.36");
    expect(biliBaseUrl()).toBe(MOBILE);
  });
});

describe("buildKeywordLinks", () => {
  describe("empty selection", () => {
    it("produces no links when every dimension is empty", () => {
      // The all-empty combination is dropped so the UI shows no blank bullet.
      expect(buildKeywordLinks([[""], [""], [""]])).toEqual([]);
    });

    it("produces no links at all from no dimensions", () => {
      expect(buildKeywordLinks([[]])).toEqual([]);
    });
  });

  describe("query params", () => {
    it("carries no params at all when there is no date filter", () => {
      expect(buildKeywordLinks([["boss"]])).toEqual([`${DESKTOP}boss`]);
    });

    it("never emits a sort param", () => {
      // &order=pubdate does not reorder Bilibili's results so much as gut them, so it is
      // gone for good — with and without a date range.
      const withRange = buildKeywordLinks([["boss"]], { dateRange: { begin: 100, end: 200 } });
      for (const link of [...buildKeywordLinks([["boss"]]), ...withRange]) {
        expect(link).not.toContain("order=");
      }
    });

    it("appends the publish-time range when one is set", () => {
      const links = buildKeywordLinks([["boss"]], { dateRange: { begin: 100, end: 200 } });
      for (const link of links) {
        expect(link.endsWith("&pubtime_begin_s=100&pubtime_end_s=200")).toBe(true);
        // First param after the keyword, so it reliably marks where the terms end.
        expect(link.split("&")[1]).toBe("pubtime_begin_s=100");
      }
    });

    it("omits the publish-time params when there is no date range", () => {
      for (const link of buildKeywordLinks([["boss"]])) {
        expect(link).not.toContain("pubtime_begin_s");
        expect(link).not.toContain("pubtime_end_s");
      }
    });

    it("treats an explicitly null date range as no filter", () => {
      expect(buildKeywordLinks([["boss"]], { dateRange: null })).toEqual([`${DESKTOP}boss`]);
    });
  });

  describe("keyword assembly", () => {
    it("emits one link for every combination of terms", () => {
      const links = buildKeywordLinks([["a", "b"], ["x", "y"]]);
      expect(links).toHaveLength(4);
      // Every link is distinct — combinations, not repeats.
      expect(new Set(links).size).toBe(links.length);
      expect(links.map(keywordOf).sort()).toEqual(["a+x", "a+y", "b+x", "b+y"]);
    });

    it("joins dimensions with + and leaves empty ones out entirely", () => {
      // Only two dimensions carry a term, so exactly two terms — no empty separators.
      const links = buildKeywordLinks([["a"], [""], ["b"], [""]]);
      for (const link of links) {
        const terms = keywordOf(link).split("+");
        expect(terms).toEqual(["a", "b"]);
        expect(terms).not.toContain("");
      }
    });

    it("keeps dimensions in the order they were given", () => {
      expect(keywordOf(buildKeywordLinks([["first"], ["second"], ["third"]])[0])).toBe(
        "first+second+third"
      );
    });

    it("sorts links shortest first, then alphabetically", () => {
      const links = buildKeywordLinks([["bb", "a", "ab"]]);
      expect(links.map(keywordOf)).toEqual(["a", "ab", "bb"]);
    });
  });

  describe("transformKeyword", () => {
    it("applies the page's escaping to the assembled keyword", () => {
      const links = buildKeywordLinks([["全S0+1"], ["boss"]], {
        transformKeyword: (keyword) => keyword.replace("全S0+1", "全S0%2B1"),
      });
      // A literal "+" inside a term would otherwise read as a term separator.
      expect(keywordOf(links[0])).toBe("全S0%2B1+boss");
    });

    it("leaves the keyword untouched when no transform is given", () => {
      expect(keywordOf(buildKeywordLinks([["全S0+1"]])[0])).toBe("全S0+1");
    });
  });
});

describe("displayLink", () => {
  it("shows only the search terms, dropping the host", () => {
    expect(displayLink("https://search.bilibili.com/all?keyword=终")).toBe("终");
  });

  it("drops the date-range params on a date-filtered link", () => {
    const link = "https://search.bilibili.com/all?keyword=终&pubtime_begin_s=1&pubtime_end_s=2";
    expect(displayLink(link)).toBe("终");
  });

  it("renders term separators as spaces", () => {
    expect(displayLink("https://search.bilibili.com/all?keyword=红莲+终+40000")).toBe(
      "红莲 终 40000"
    );
  });

  it("decodes %2B back into a literal + for display", () => {
    expect(displayLink("https://search.bilibili.com/all?keyword=全S0%2B1终")).toBe("全S0+1终");
  });

  it("decodes a rank synergy's encoded + too", () => {
    expect(displayLink("https://search.bilibili.com/all?keyword=S1%2B1终")).toBe("S1+1终");
  });

  it("does not truncate a term containing an ampersand", () => {
    // The cut matches the whole &pubtime_begin_s= literal, not a bare "&". Without a date
    // filter there is nothing after the keyword at all, so the term survives untouched.
    expect(displayLink("https://search.bilibili.com/all?keyword=A&B+boss")).toBe("A&B boss");
    expect(displayLink("https://search.bilibili.com/all?keyword=A&B+boss&pubtime_begin_s=1")).toBe(
      "A&B boss"
    );
  });

  it("returns the input unchanged when there is no keyword param", () => {
    expect(displayLink("not-a-link")).toBe("not-a-link");
  });

  it("round-trips the mobile host as well", () => {
    expect(displayLink("https://m.bilibili.com/search?keyword=终")).toBe("终");
  });

  it("round-trips a link this module built", () => {
    const [link] = buildKeywordLinks([["红莲"], ["终"]], { dateRange: { begin: 1, end: 2 } });
    expect(displayLink(link)).toBe("红莲 终");
  });
});
