import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  buildBiliLinks,
  companionOptions,
  companionRanksFor,
  isTeamValk,
  modifierCategories,
  valkOptions,
  valkRanksFor,
  valkRefinesFor,
  type BiliSearchInput,
} from "@/util/searchLinks";
import { bossToChinese } from "@/data/bossTranslations";
import { weatherToChinese } from "@/data/weatherTranslations";
import { valkToChinese } from "@/data/valkTranslations";
import { companionToChinese } from "@/data/companionTranslations";
import { modifiersToChinese } from "@/data/modifierTranslations";

// Fixtures are read out of the translation data rather than hardcoded: those files are
// hand-edited and the code is data-driven, so a test that pinned literal Chinese would
// fail on an unrelated dictionary edit. Picking the first entry of each group keeps the
// expectations tied to whatever the data currently says.
const firstKey = (obj: Record<string, unknown>) => Object.keys(obj)[0];

const BOSS = firstKey(bossToChinese);
const WEATHER = firstKey(weatherToChinese);
const SIMPLE_VALK = firstKey(valkToChinese.simple.options);
const ADVANCED2_VALKS = Object.keys(valkToChinese.advanced2.options);
const TEAM_VALK = firstKey(valkToChinese.team.options);
const ELF = firstKey(companionToChinese.elf.options);
const ASTRAL_OP = firstKey(companionToChinese.astralop.options);

const aliasesOf = (obj: Record<string, string[]>, key: string) => obj[key];

const ORDER = "&order=pubdate";
const DESKTOP = "https://search.bilibili.com/all?keyword=";
const MOBILE = "https://m.bilibili.com/search?keyword=";

// Nothing selected. Individual tests override only the dimension under test.
const EMPTY: BiliSearchInput = {
  selectedWeather: null,
  selectedBoss: null,
  sssBoss: false,
  selectedValks: [],
  valkRanks: {},
  valkRefines: {},
  allS0Plus1: false,
  selectedCompanion: null,
  companionRank: null,
  score: null,
  activeModifiers: [],
  dateRange: null,
};

const build = (overrides: Partial<BiliSearchInput> = {}) =>
  buildBiliLinks({ ...EMPTY, ...overrides });

// The search terms of a link: everything between "keyword=" and the query params.
const keywordOf = (link: string) => link.split("keyword=")[1].split(ORDER)[0];
const keywordsOf = (links: string[]) => links.map(keywordOf);

// buildBiliLinks reads navigator.userAgent to choose the desktop or mobile host.
const setUserAgent = (ua: string) => {
  (globalThis as any).window = { navigator: { userAgent: ua } };
};

beforeEach(() => setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)"));
afterEach(() => delete (globalThis as any).window);

describe("buildBiliLinks", () => {
  describe("empty selection", () => {
    it("produces no links at all when nothing is selected", () => {
      // The all-empty combination is filtered out so the UI shows no blank bullet.
      expect(build()).toEqual([]);
    });

    it("produces no links when only an unchecked-style falsy score is given", () => {
      expect(build({ score: "" })).toEqual([]);
      expect(build({ score: 0 })).toEqual([]);
    });
  });

  describe("URL shape", () => {
    it("puts &order=pubdate on every link, ahead of any other param", () => {
      const links = build({ selectedBoss: BOSS, dateRange: { begin: 100, end: 200 } });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toContain(ORDER);
        // First param after the keyword, so it reliably marks where the terms end.
        expect(link.split("&")[1]).toBe("order=pubdate");
      }
    });

    it("includes &order=pubdate even with no date filter", () => {
      for (const link of build({ selectedBoss: BOSS })) {
        expect(link.endsWith(ORDER)).toBe(true);
      }
    });

    it("appends the publish-time range after the sort param", () => {
      const links = build({ selectedBoss: BOSS, dateRange: { begin: 1754006400, end: 1754265599 } });
      for (const link of links) {
        expect(link).toContain(`${ORDER}&pubtime_begin_s=1754006400&pubtime_end_s=1754265599`);
      }
    });

    it("omits the publish-time params when there is no date range", () => {
      for (const link of build({ selectedBoss: BOSS })) {
        expect(link).not.toContain("pubtime_begin_s");
        expect(link).not.toContain("pubtime_end_s");
      }
    });

    it("uses the desktop host on desktop user agents", () => {
      for (const link of build({ selectedBoss: BOSS })) {
        expect(link.startsWith(DESKTOP)).toBe(true);
      }
    });

    it("uses the mobile host when the user agent says mobi", () => {
      setUserAgent("Mozilla/5.0 (Linux; Android 14) Mobile Safari/537.36");
      for (const link of build({ selectedBoss: BOSS })) {
        expect(link.startsWith(MOBILE)).toBe(true);
      }
    });

    it("sorts links shortest first, then alphabetically", () => {
      const links = build({ selectedBoss: BOSS, selectedWeather: WEATHER });
      const sorted = [...links].sort((a, b) => a.length - b.length || a.localeCompare(b));
      expect(links).toEqual(sorted);
    });
  });

  describe("single dimensions", () => {
    it("emits one link per boss alias", () => {
      const links = build({ selectedBoss: BOSS });
      expect(keywordsOf(links).sort()).toEqual([...aliasesOf(bossToChinese, BOSS)].sort());
    });

    it("emits one link per weather alias", () => {
      const links = build({ selectedWeather: WEATHER });
      expect(keywordsOf(links).sort()).toEqual([...aliasesOf(weatherToChinese, WEATHER)].sort());
    });

    it("prefixes SSS to every boss alias when the SSS boss box is checked", () => {
      const links = build({ selectedBoss: BOSS, sssBoss: true });
      const expected = aliasesOf(bossToChinese, BOSS).map((alias) => `SSS${alias}`);
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
    });

    it("passes a typed Abyss score straight through as a term", () => {
      expect(keywordsOf(build({ score: 123456 }))).toEqual(["123456"]);
    });
  });

  describe("cartesian product across dimensions", () => {
    it("emits one link for every combination of aliases", () => {
      const bossAliases = aliasesOf(bossToChinese, BOSS).length;
      const weatherAliases = aliasesOf(weatherToChinese, WEATHER).length;
      const links = build({ selectedBoss: BOSS, selectedWeather: WEATHER });
      expect(links).toHaveLength(bossAliases * weatherAliases);
      // Every link is distinct — combinations, not repeats.
      expect(new Set(links).size).toBe(links.length);
    });

    it("orders terms as modifiers, weather, boss, valkyries, companion, score", () => {
      const modifier = firstKey(modifiersToChinese["Game Mode"].options);
      const links = build({
        activeModifiers: [modifier],
        selectedWeather: WEATHER,
        selectedBoss: BOSS,
        selectedValks: [SIMPLE_VALK],
        selectedCompanion: ELF,
        score: 40000,
      });
      const terms = keywordOf(links[0]).split("+");
      expect(terms).toHaveLength(6);
      expect(modifiersToChinese["Game Mode"].options[modifier]).toContain(terms[0]);
      expect(aliasesOf(weatherToChinese, WEATHER)).toContain(terms[1]);
      expect(aliasesOf(bossToChinese, BOSS)).toContain(terms[2]);
      expect(valkToChinese.simple.options[SIMPLE_VALK]).toContain(terms[3]);
      expect(companionToChinese.elf.options[ELF]).toContain(terms[4]);
      expect(terms[5]).toBe("40000");
    });

    it("joins dimensions with + and leaves unselected ones out entirely", () => {
      // Only boss and score are set, so exactly two terms — no empty separators.
      const links = build({ selectedBoss: BOSS, score: 40000 });
      for (const link of links) {
        const terms = keywordOf(link).split("+");
        expect(terms).toHaveLength(2);
        expect(terms).not.toContain("");
      }
    });
  });

  describe("score expansion", () => {
    it("expands a combined SSS score into two links, one per threshold", () => {
      const links = build({ score: "40000 / 48000" });
      expect(keywordsOf(links).sort()).toEqual(["40000", "48000"]);
    });

    it("doubles the link count when a combined score is used", () => {
      const single = build({ selectedBoss: BOSS, score: "40000" });
      const combined = build({ selectedBoss: BOSS, score: "40000 / 48000" });
      expect(combined).toHaveLength(single.length * 2);
    });
  });

  describe("valkyries", () => {
    it("concatenates rank + alias for a ranked valk", () => {
      const valk = ADVANCED2_VALKS[0];
      const links = build({ selectedValks: [valk], valkRanks: { [valk]: "S1" } });
      const expected = valkToChinese.advanced2.options[valk].map((alias) => `S1${alias}`);
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
    });

    it("concatenates rank + refine + alias, encoding the refine's + as %2B", () => {
      const valk = ADVANCED2_VALKS[0];
      const links = build({
        selectedValks: [valk],
        valkRanks: { [valk]: "S1" },
        valkRefines: { [valk]: "+1" },
      });
      const expected = valkToChinese.advanced2.options[valk].map((alias) => `S1%2B1${alias}`);
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
      // A literal "+" would read as a term separator on Bilibili.
      for (const link of links) {
        expect(keywordOf(link)).not.toContain("+");
      }
    });

    it("emits one link per rank value when a rank label maps to several", () => {
      // SS0 carries two search variants ("SS" and "SS0").
      const valk = ADVANCED2_VALKS[0];
      const rankValues = valkToChinese.advanced2.ranks["SS0"].length;
      const aliases = valkToChinese.advanced2.options[valk].length;
      const links = build({ selectedValks: [valk], valkRanks: { [valk]: "SS0" } });
      expect(links).toHaveLength(rankValues * aliases);
    });

    it("uses bare aliases for a valk whose group has no ranks", () => {
      const links = build({ selectedValks: [SIMPLE_VALK] });
      expect(keywordsOf(links).sort()).toEqual([...valkToChinese.simple.options[SIMPLE_VALK]].sort());
    });

    it("keeps the selected valks in order, lead first", () => {
      const [first, second] = ADVANCED2_VALKS;
      const links = build({ selectedValks: [first, second] });
      const leadAlias = valkToChinese.advanced2.options[first][0];
      // Valk tokens are concatenated with no separator, so the lead valk's alias
      // must appear at the start of the (single) valkyrie term.
      expect(links.some((link) => keywordOf(link).startsWith(leadAlias))).toBe(true);
    });

    it("ignores a rank label the valk's group does not define", () => {
      const links = build({ selectedValks: [SIMPLE_VALK], valkRanks: { [SIMPLE_VALK]: "S3" } });
      expect(keywordsOf(links).sort()).toEqual([...valkToChinese.simple.options[SIMPLE_VALK]].sort());
    });

    it("treats a team option as a normal alias source", () => {
      const links = build({ selectedValks: [TEAM_VALK] });
      expect(keywordsOf(links).sort()).toEqual([...valkToChinese.team.options[TEAM_VALK]].sort());
    });
  });

  describe("all S0+1", () => {
    it("prefixes the team-wide term with + encoded as %2B", () => {
      const links = build({ selectedValks: [], allS0Plus1: true });
      expect(keywordsOf(links)).toEqual(["全S0%2B1"]);
    });

    it("works with no valks selected", () => {
      // The checkbox is always available now, including with 0-2 valks chosen.
      expect(build({ allS0Plus1: true })).toHaveLength(1);
    });

    it("prefixes the term ahead of the selected valks' aliases", () => {
      const valk = ADVANCED2_VALKS[0];
      const links = build({ selectedValks: [valk], allS0Plus1: true });
      const expected = valkToChinese.advanced2.options[valk].map((alias) => `全S0%2B1${alias}`);
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
    });

    it("overrides individual ranks and refines", () => {
      const valk = ADVANCED2_VALKS[0];
      const withRanks = build({
        selectedValks: [valk],
        valkRanks: { [valk]: "SSS" },
        valkRefines: { [valk]: "+3" },
        allS0Plus1: true,
      });
      const withoutRanks = build({ selectedValks: [valk], allS0Plus1: true });
      expect(withRanks).toEqual(withoutRanks);
      for (const link of withRanks) {
        expect(keywordOf(link)).not.toContain("SSS");
      }
    });

    it("never leaves a literal + in the keyword", () => {
      const links = build({ selectedValks: ADVANCED2_VALKS.slice(0, 3), allS0Plus1: true });
      for (const link of links) {
        expect(keywordOf(link)).not.toContain("+");
      }
    });
  });

  describe("companions", () => {
    it("uses bare aliases when no rank is picked", () => {
      const links = build({ selectedCompanion: ELF });
      expect(keywordsOf(links).sort()).toEqual([...companionToChinese.elf.options[ELF]].sort());
    });

    it("prefixes each rank value onto each alias", () => {
      const rank = firstKey(companionToChinese.elf.ranks);
      const links = build({ selectedCompanion: ELF, companionRank: rank });
      const expected = companionToChinese.elf.ranks[rank].flatMap((r) =>
        companionToChinese.elf.options[ELF].map((alias) => `${r}${alias}`)
      );
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
    });

    it("applies astral op ranks to astral op options", () => {
      const links = build({ selectedCompanion: ASTRAL_OP, companionRank: "SS" });
      const expected = companionToChinese.astralop.options[ASTRAL_OP].map((a) => `SS${a}`);
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
    });

    it("ignores a rank the companion's group does not define", () => {
      // Astral Op ranks (S/SS/SSS) do not apply to an ELF (star ratings).
      const links = build({ selectedCompanion: ELF, companionRank: "SSS" });
      expect(keywordsOf(links).sort()).toEqual([...companionToChinese.elf.options[ELF]].sort());
    });
  });

  describe("modifiers", () => {
    it("puts a single modifier's alias first in the keyword", () => {
      const modifier = firstKey(modifiersToChinese["Game Mode"].options);
      const links = build({ activeModifiers: [modifier], selectedBoss: BOSS });
      for (const link of links) {
        const first = keywordOf(link).split("+")[0];
        expect(modifiersToChinese["Game Mode"].options[modifier]).toContain(first);
      }
    });

    it("joins several active modifiers into the leading term", () => {
      const gameMode = firstKey(modifiersToChinese["Game Mode"].options);
      const other = firstKey(modifiersToChinese["Other"].options);
      const links = build({ activeModifiers: [gameMode, other] });
      const perModifierAliases =
        modifiersToChinese["Game Mode"].options[gameMode].length *
        modifiersToChinese["Other"].options[other].length;
      expect(links).toHaveLength(perModifierAliases);
      for (const link of links) {
        expect(keywordOf(link).split("+")).toHaveLength(2);
      }
    });

    it("expands modifiers with multiple aliases into separate links", () => {
      const multi = Object.keys(modifiersToChinese["Game Mode"].options).find(
        (name) => modifiersToChinese["Game Mode"].options[name].length > 1
      );
      // Only meaningful if the data still has a multi-alias modifier.
      if (!multi) return;
      const links = build({ activeModifiers: [multi] });
      expect(links).toHaveLength(modifiersToChinese["Game Mode"].options[multi].length);
    });
  });

  describe("a fully populated selection", () => {
    it("assembles every dimension into each link", () => {
      const valk = ADVANCED2_VALKS[0];
      const modifier = firstKey(modifiersToChinese["Game Mode"].options);
      const links = build({
        activeModifiers: [modifier],
        selectedWeather: WEATHER,
        selectedBoss: BOSS,
        sssBoss: true,
        selectedValks: [valk],
        valkRanks: { [valk]: "S1" },
        valkRefines: { [valk]: "+1" },
        selectedCompanion: ELF,
        companionRank: firstKey(companionToChinese.elf.ranks),
        score: "40000 / 48000",
        dateRange: { begin: 1, end: 2 },
      });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(keywordOf(link).split("+")).toHaveLength(6);
        expect(link).toContain(`${ORDER}&pubtime_begin_s=1&pubtime_end_s=2`);
      }
      // Both score thresholds are represented.
      expect(links.some((l) => keywordOf(l).endsWith("40000"))).toBe(true);
      expect(links.some((l) => keywordOf(l).endsWith("48000"))).toBe(true);
    });
  });
});

describe("option lists exposed to the UI", () => {
  it("lists every valk option across all groups", () => {
    const expected = Object.values(valkToChinese).flatMap((g) => Object.keys(g.options));
    expect([...valkOptions].sort()).toEqual(expected.sort());
  });

  it("lists every companion option across ELF and Astral Op", () => {
    const expected = Object.values(companionToChinese).flatMap((g) => Object.keys(g.options));
    expect([...companionOptions].sort()).toEqual(expected.sort());
  });

  it("exposes each modifier category with its selection type", () => {
    expect(modifierCategories.map((c) => c.category)).toEqual(Object.keys(modifiersToChinese));
    for (const category of modifierCategories) {
      expect(["single-choice", "multiple-choice"]).toContain(category.type);
      expect(category.names).toEqual(
        Object.keys((modifiersToChinese as any)[category.category].options)
      );
    }
  });
});

describe("valkRanksFor / valkRefinesFor", () => {
  it("returns no ranks for a group that defines none", () => {
    expect(valkRanksFor(SIMPLE_VALK)).toEqual([]);
    expect(valkRefinesFor(SIMPLE_VALK)).toEqual([]);
  });

  it("returns the group's rank labels for a ranked valk", () => {
    expect(valkRanksFor(ADVANCED2_VALKS[0])).toEqual(Object.keys(valkToChinese.advanced2.ranks));
  });

  it("returns refine labels only for the group that defines them", () => {
    expect(valkRefinesFor(ADVANCED2_VALKS[0])).toEqual(
      Object.keys(valkToChinese.advanced2.refines)
    );
    expect(valkRefinesFor(firstKey(valkToChinese.basic.options))).toEqual([]);
  });

  it("returns empty for null or unknown names", () => {
    expect(valkRanksFor(null)).toEqual([]);
    expect(valkRefinesFor(null)).toEqual([]);
    expect(valkRanksFor("Not A Valkyrie")).toEqual([]);
    expect(valkRefinesFor("Not A Valkyrie")).toEqual([]);
  });
});

describe("companionRanksFor", () => {
  it("returns star ratings for an ELF", () => {
    expect(companionRanksFor(ELF)).toEqual(Object.keys(companionToChinese.elf.ranks));
  });

  it("returns S/SS/SSS for an Astral Op", () => {
    expect(companionRanksFor(ASTRAL_OP)).toEqual(Object.keys(companionToChinese.astralop.ranks));
  });

  it("returns empty for null or unknown options", () => {
    expect(companionRanksFor(null)).toEqual([]);
    expect(companionRanksFor("Not A Companion")).toEqual([]);
  });
});

describe("isTeamValk", () => {
  it("identifies options in the team group", () => {
    for (const name of Object.keys(valkToChinese.team.options)) {
      expect(isTeamValk(name)).toBe(true);
    }
  });

  it("rejects ordinary valks and unknown names", () => {
    expect(isTeamValk(SIMPLE_VALK)).toBe(false);
    expect(isTeamValk(ADVANCED2_VALKS[0])).toBe(false);
    expect(isTeamValk("Not A Valkyrie")).toBe(false);
  });
});
