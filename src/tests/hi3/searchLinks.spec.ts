import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  buildBiliLinks,
  companionOptions,
  companionRanksFor,
  isTeamValk,
  modifierCategories,
  valkOptions,
  valkRanksFor,
  valkSynergiesFor,
  type BiliSearchInput,
} from "@/util/hi3/searchLinks";
import { hi3BossToChinese } from "@/data/hi3/bossTranslations";
import { hi3WeatherToChinese } from "@/data/hi3/weatherTranslations";
import { hi3ValkToChinese } from "@/data/hi3/valkTranslations";
import { hi3CompanionToChinese } from "@/data/hi3/companionTranslations";
import { hi3ModifiersToChinese } from "@/data/hi3/modifierTranslations";

// Fixtures are read out of the translation data rather than hardcoded: those files are
// hand-edited and the code is data-driven, so a test that pinned literal Chinese would
// fail on an unrelated dictionary edit. Picking the first entry of each group keeps the
// expectations tied to whatever the data currently says.
const firstKey = (obj: Record<string, unknown>) => Object.keys(obj)[0];

const BOSS = firstKey(hi3BossToChinese);
const WEATHER = firstKey(hi3WeatherToChinese);
const SIMPLE_VALK = firstKey(hi3ValkToChinese.simple.options);
const ADVANCED2_VALKS = Object.keys(hi3ValkToChinese.advanced2.options);
const TEAM_VALK = firstKey(hi3ValkToChinese.team.options);
const ELF = firstKey(hi3CompanionToChinese.elf.options);
const ASTRAL_OP = firstKey(hi3CompanionToChinese.astralop.options);

const aliasesOf = (obj: Record<string, string[]>, key: string) => obj[key];

const ORDER = "&order=pubdate";

// Nothing selected. Individual tests override only the dimension under test.
const EMPTY: BiliSearchInput = {
  selectedWeather: null,
  selectedBoss: null,
  sssBoss: false,
  selectedValks: [],
  valkRanks: {},
  valkSynergies: {},
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
// A link carries either the sort param or the date-range params, never both.
const keywordOf = (link: string) =>
  link.split("keyword=")[1].split(/&(?:order=pubdate|pubtime_begin_s=)/)[0];
const keywordsOf = (links: string[]) => links.map(keywordOf);

// buildBiliLinks reads navigator.userAgent to choose the desktop or mobile host.
const setUserAgent = (ua: string) => {
  (globalThis as any).window = { navigator: { userAgent: ua } };
};

beforeEach(() => setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)"));
afterEach(() => delete (globalThis as any).window);

describe("buildBiliLinks", () => {
  describe("empty selection", () => {
    it("produces no links when only an unchecked-style falsy score is given", () => {
      expect(build({ score: "" })).toEqual([]);
      expect(build({ score: 0 })).toEqual([]);
    });
  });

  // The URL machinery itself (params, host, sorting, + joining) is covered once in
  // tests/biliUrl.spec.ts. What matters here is that this page hands it the right
  // options — the wiring the two silently lost in a rebase once.
  describe("wiring into buildKeywordLinks", () => {
    it("passes the date range through, so the filter reaches the URL", () => {
      const links = build({ selectedBoss: BOSS, dateRange: { begin: 1754006400, end: 1754265599 } });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.endsWith("&pubtime_begin_s=1754006400&pubtime_end_s=1754265599")).toBe(true);
        expect(link).not.toContain(ORDER);
      }
    });

    it("sorts by pubdate when the page passes no date range", () => {
      const links = build({ selectedBoss: BOSS });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link.endsWith(ORDER)).toBe(true);
      }
    });
  });

  describe("single dimensions", () => {
    it("emits one link per boss alias", () => {
      const links = build({ selectedBoss: BOSS });
      expect(keywordsOf(links).sort()).toEqual([...aliasesOf(hi3BossToChinese, BOSS)].sort());
    });

    it("emits one link per weather alias", () => {
      const links = build({ selectedWeather: WEATHER });
      expect(keywordsOf(links).sort()).toEqual([...aliasesOf(hi3WeatherToChinese, WEATHER)].sort());
    });

    it("prefixes SSS to every boss alias when the SSS boss box is checked", () => {
      const links = build({ selectedBoss: BOSS, sssBoss: true });
      const expected = aliasesOf(hi3BossToChinese, BOSS).map((alias) => `SSS${alias}`);
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
    });

    it("passes a typed Abyss score straight through as a term", () => {
      expect(keywordsOf(build({ score: 123456 }))).toEqual(["123456"]);
    });
  });

  describe("cartesian product across dimensions", () => {
    it("emits one link for every combination of aliases", () => {
      // The product itself is combine()'s job; what this pins is that each HI3 dimension
      // contributes all of its aliases rather than just the first.
      const bossAliases = aliasesOf(hi3BossToChinese, BOSS).length;
      const weatherAliases = aliasesOf(hi3WeatherToChinese, WEATHER).length;
      const links = build({ selectedBoss: BOSS, selectedWeather: WEATHER });
      expect(links).toHaveLength(bossAliases * weatherAliases);
    });

    it("orders terms as modifiers, weather, boss, valkyries, companion, score", () => {
      const modifier = firstKey(hi3ModifiersToChinese["Game Mode"].options);
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
      expect(hi3ModifiersToChinese["Game Mode"].options[modifier]).toContain(terms[0]);
      expect(aliasesOf(hi3WeatherToChinese, WEATHER)).toContain(terms[1]);
      expect(aliasesOf(hi3BossToChinese, BOSS)).toContain(terms[2]);
      expect(hi3ValkToChinese.simple.options[SIMPLE_VALK]).toContain(terms[3]);
      expect(hi3CompanionToChinese.elf.options[ELF]).toContain(terms[4]);
      expect(terms[5]).toBe("40000");
    });

    it("leaves unselected dimensions out entirely", () => {
      // Only boss and score are set, so exactly two terms — no empty separators.
      const links = build({ selectedBoss: BOSS, score: 40000 });
      for (const link of links) {
        expect(keywordOf(link).split("+")).toHaveLength(2);
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
      const expected = hi3ValkToChinese.advanced2.options[valk].map((alias) => `S1${alias}`);
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
    });

    it("concatenates rank + synergy + alias, encoding the synergy's + as %2B", () => {
      const valk = ADVANCED2_VALKS[0];
      const links = build({
        selectedValks: [valk],
        valkRanks: { [valk]: "S1" },
        valkSynergies: { [valk]: "+1" },
      });
      const expected = hi3ValkToChinese.advanced2.options[valk].map((alias) => `S1%2B1${alias}`);
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
      // A literal "+" would read as a term separator on Bilibili.
      for (const link of links) {
        expect(keywordOf(link)).not.toContain("+");
      }
    });

    it("emits one link per rank value when a rank label maps to several", () => {
      // SS0 carries two search variants ("SS" and "SS0").
      const valk = ADVANCED2_VALKS[0];
      const rankValues = hi3ValkToChinese.advanced2.ranks["SS0"].length;
      const aliases = hi3ValkToChinese.advanced2.options[valk].length;
      const links = build({ selectedValks: [valk], valkRanks: { [valk]: "SS0" } });
      expect(links).toHaveLength(rankValues * aliases);
    });

    it("uses bare aliases for a valk whose group has no ranks", () => {
      const links = build({ selectedValks: [SIMPLE_VALK] });
      expect(keywordsOf(links).sort()).toEqual([...hi3ValkToChinese.simple.options[SIMPLE_VALK]].sort());
    });

    it("keeps the selected valks in order, lead first", () => {
      const [first, second] = ADVANCED2_VALKS;
      const links = build({ selectedValks: [first, second] });
      const leadAlias = hi3ValkToChinese.advanced2.options[first][0];
      // Valk tokens are concatenated with no separator, so the lead valk's alias
      // must appear at the start of the (single) valkyrie term.
      expect(links.some((link) => keywordOf(link).startsWith(leadAlias))).toBe(true);
    });

    it("ignores a rank label the valk's group does not define", () => {
      const links = build({ selectedValks: [SIMPLE_VALK], valkRanks: { [SIMPLE_VALK]: "S3" } });
      expect(keywordsOf(links).sort()).toEqual([...hi3ValkToChinese.simple.options[SIMPLE_VALK]].sort());
    });

    it("treats a team option as a normal alias source", () => {
      const links = build({ selectedValks: [TEAM_VALK] });
      expect(keywordsOf(links).sort()).toEqual([...hi3ValkToChinese.team.options[TEAM_VALK]].sort());
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
      const expected = hi3ValkToChinese.advanced2.options[valk].map((alias) => `全S0%2B1${alias}`);
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
    });

    it("overrides individual ranks and synergies", () => {
      const valk = ADVANCED2_VALKS[0];
      const withRanks = build({
        selectedValks: [valk],
        valkRanks: { [valk]: "SSS" },
        valkSynergies: { [valk]: "+3" },
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
      expect(keywordsOf(links).sort()).toEqual([...hi3CompanionToChinese.elf.options[ELF]].sort());
    });

    it("prefixes each rank value onto each alias", () => {
      const rank = firstKey(hi3CompanionToChinese.elf.ranks);
      const links = build({ selectedCompanion: ELF, companionRank: rank });
      const expected = hi3CompanionToChinese.elf.ranks[rank].flatMap((r) =>
        hi3CompanionToChinese.elf.options[ELF].map((alias) => `${r}${alias}`)
      );
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
    });

    it("applies astral op ranks to astral op options", () => {
      const links = build({ selectedCompanion: ASTRAL_OP, companionRank: "SS" });
      const expected = hi3CompanionToChinese.astralop.options[ASTRAL_OP].map((a) => `SS${a}`);
      expect(keywordsOf(links).sort()).toEqual(expected.sort());
    });

    it("ignores a rank the companion's group does not define", () => {
      // Astral Op ranks (S/SS/SSS) do not apply to an ELF (star ratings).
      const links = build({ selectedCompanion: ELF, companionRank: "SSS" });
      expect(keywordsOf(links).sort()).toEqual([...hi3CompanionToChinese.elf.options[ELF]].sort());
    });
  });

  describe("modifiers", () => {
    it("puts a single modifier's alias first in the keyword", () => {
      const modifier = firstKey(hi3ModifiersToChinese["Game Mode"].options);
      const links = build({ activeModifiers: [modifier], selectedBoss: BOSS });
      for (const link of links) {
        const first = keywordOf(link).split("+")[0];
        expect(hi3ModifiersToChinese["Game Mode"].options[modifier]).toContain(first);
      }
    });

    it("joins several active modifiers into the leading term", () => {
      const gameMode = firstKey(hi3ModifiersToChinese["Game Mode"].options);
      const other = firstKey(hi3ModifiersToChinese["Other"].options);
      const links = build({ activeModifiers: [gameMode, other] });
      const perModifierAliases =
        hi3ModifiersToChinese["Game Mode"].options[gameMode].length *
        hi3ModifiersToChinese["Other"].options[other].length;
      expect(links).toHaveLength(perModifierAliases);
      for (const link of links) {
        expect(keywordOf(link).split("+")).toHaveLength(2);
      }
    });

    // Category order inside the keyword is Other, then Game Mode, then Difficulty Level —
    // deliberately not the data-file order, and not the order the boxes were ticked.
    it("orders modifier terms Other, Game Mode, Difficulty Level", () => {
      const other = firstKey(hi3ModifiersToChinese["Other"].options);
      const gameMode = firstKey(hi3ModifiersToChinese["Game Mode"].options);
      const difficulty = firstKey(hi3ModifiersToChinese["Difficulty Level"].options);
      // Ticked in the opposite order to prove the sort, not the input, decides.
      const links = build({ activeModifiers: [difficulty, gameMode, other] });
      for (const link of links) {
        const terms = keywordOf(link).split("+");
        expect(terms).toHaveLength(3);
        expect(hi3ModifiersToChinese["Other"].options[other]).toContain(terms[0]);
        expect(hi3ModifiersToChinese["Game Mode"].options[gameMode]).toContain(terms[1]);
        expect(hi3ModifiersToChinese["Difficulty Level"].options[difficulty]).toContain(terms[2]);
      }
    });

    it("puts Other ahead of Game Mode whichever order they arrive in", () => {
      const other = firstKey(hi3ModifiersToChinese["Other"].options);
      const gameMode = firstKey(hi3ModifiersToChinese["Game Mode"].options);
      const forwards = build({ activeModifiers: [other, gameMode] });
      const backwards = build({ activeModifiers: [gameMode, other] });
      expect(forwards).toEqual(backwards);
      for (const link of forwards) {
        expect(hi3ModifiersToChinese["Other"].options[other]).toContain(keywordOf(link).split("+")[0]);
      }
    });

    it("keeps modifiers from one category in their given order", () => {
      // Array.sort is stable, so same-rank entries must not be reshuffled.
      const [first, second] = Object.keys(hi3ModifiersToChinese["Other"].options);
      if (!second) return;
      const links = build({ activeModifiers: [first, second] });
      for (const link of links) {
        const terms = keywordOf(link).split("+");
        expect(hi3ModifiersToChinese["Other"].options[first]).toContain(terms[0]);
        expect(hi3ModifiersToChinese["Other"].options[second]).toContain(terms[1]);
      }
    });

    it("expands modifiers with multiple aliases into separate links", () => {
      const multi = Object.keys(hi3ModifiersToChinese["Game Mode"].options).find(
        (name) => hi3ModifiersToChinese["Game Mode"].options[name].length > 1
      );
      // Only meaningful if the data still has a multi-alias modifier.
      if (!multi) return;
      const links = build({ activeModifiers: [multi] });
      expect(links).toHaveLength(hi3ModifiersToChinese["Game Mode"].options[multi].length);
    });
  });

  describe("a fully populated selection", () => {
    it("assembles every dimension into each link", () => {
      const valk = ADVANCED2_VALKS[0];
      const modifier = firstKey(hi3ModifiersToChinese["Game Mode"].options);
      const links = build({
        activeModifiers: [modifier],
        selectedWeather: WEATHER,
        selectedBoss: BOSS,
        sssBoss: true,
        selectedValks: [valk],
        valkRanks: { [valk]: "S1" },
        valkSynergies: { [valk]: "+1" },
        selectedCompanion: ELF,
        companionRank: firstKey(hi3CompanionToChinese.elf.ranks),
        score: "40000 / 48000",
        dateRange: { begin: 1, end: 2 },
      });
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(keywordOf(link).split("+")).toHaveLength(6);
        expect(link.endsWith("&pubtime_begin_s=1&pubtime_end_s=2")).toBe(true);
      }
      // Both score thresholds are represented.
      expect(links.some((l) => keywordOf(l).endsWith("40000"))).toBe(true);
      expect(links.some((l) => keywordOf(l).endsWith("48000"))).toBe(true);
    });
  });
});

describe("option lists exposed to the UI", () => {
  it("lists every valk option across all groups", () => {
    const expected = Object.values(hi3ValkToChinese).flatMap((g) => Object.keys(g.options));
    expect([...valkOptions].sort()).toEqual(expected.sort());
  });

  it("lists every companion option across ELF and Astral Op", () => {
    const expected = Object.values(hi3CompanionToChinese).flatMap((g) => Object.keys(g.options));
    expect([...companionOptions].sort()).toEqual(expected.sort());
  });

  it("exposes each modifier category with its selection type", () => {
    expect(modifierCategories.map((c) => c.category)).toEqual(Object.keys(hi3ModifiersToChinese));
    for (const category of modifierCategories) {
      expect(["single-choice", "multiple-choice"]).toContain(category.type);
      expect(category.names).toEqual(
        Object.keys((hi3ModifiersToChinese as any)[category.category].options)
      );
    }
  });
});

describe("valkRanksFor / valkSynergiesFor", () => {
  it("returns no ranks for a group that defines none", () => {
    expect(valkRanksFor(SIMPLE_VALK)).toEqual([]);
    expect(valkSynergiesFor(SIMPLE_VALK)).toEqual([]);
  });

  it("returns the group's rank labels for a ranked valk", () => {
    expect(valkRanksFor(ADVANCED2_VALKS[0])).toEqual(Object.keys(hi3ValkToChinese.advanced2.ranks));
  });

  it("returns synergy labels only for the group that defines them", () => {
    expect(valkSynergiesFor(ADVANCED2_VALKS[0])).toEqual(
      Object.keys(hi3ValkToChinese.advanced2.synergies)
    );
    expect(valkSynergiesFor(firstKey(hi3ValkToChinese.basic.options))).toEqual([]);
  });

  it("returns empty for null or unknown names", () => {
    expect(valkRanksFor(null)).toEqual([]);
    expect(valkSynergiesFor(null)).toEqual([]);
    expect(valkRanksFor("Not A Valkyrie")).toEqual([]);
    expect(valkSynergiesFor("Not A Valkyrie")).toEqual([]);
  });
});

describe("companionRanksFor", () => {
  it("returns star ratings for an ELF", () => {
    expect(companionRanksFor(ELF)).toEqual(Object.keys(hi3CompanionToChinese.elf.ranks));
  });

  it("returns S/SS/SSS for an Astral Op", () => {
    expect(companionRanksFor(ASTRAL_OP)).toEqual(Object.keys(hi3CompanionToChinese.astralop.ranks));
  });

  it("returns empty for null or unknown options", () => {
    expect(companionRanksFor(null)).toEqual([]);
    expect(companionRanksFor("Not A Companion")).toEqual([]);
  });
});

describe("isTeamValk", () => {
  it("identifies options in the team group", () => {
    for (const name of Object.keys(hi3ValkToChinese.team.options)) {
      expect(isTeamValk(name)).toBe(true);
    }
  });

  it("rejects ordinary valks and unknown names", () => {
    expect(isTeamValk(SIMPLE_VALK)).toBe(false);
    expect(isTeamValk(ADVANCED2_VALKS[0])).toBe(false);
    expect(isTeamValk("Not A Valkyrie")).toBe(false);
  });
});
