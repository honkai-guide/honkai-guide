import { bossToChinese } from "@/data/bossTranslations";
import { valkToChinese } from "@/data/valkTranslations";
import { modifiersToChinese } from "@/data/modifierTranslations";
import { weatherToChinese } from "@/data/weatherTranslations";
import { companionToChinese } from "@/data/companionTranslations";

export interface BiliSearchInput {
  selectedWeather: string | null;
  selectedBoss: string | null;
  sssBoss: boolean;
  selectedValks: string[];
  valkRanks: Record<string, string | null>;
  valkRefines: Record<string, string | null>;
  // Use the team-wide "All S0+1" term instead of each valk's individual rank/refine.
  allS0Plus1: boolean;
  selectedCompanion: string | null;
  companionRank: string | null;
  score: string | number | null;
  // Names of the checked modifiers (keys of modifiersToChinese).
  activeModifiers: string[];
  // Optional Bilibili publish-time filter in unix seconds, or null for no filter.
  dateRange: { begin: number; end: number } | null;
}

function isMobile(): boolean {
  return window.navigator.userAgent.toLowerCase().includes("mobi");
}

// Cartesian product of the given arrays of strings.
function* combine(arrOfArr: string[][]): Generator<string[]> {
  const [head, ...tail] = arrOfArr;
  const remainder = tail.length ? combine(tail) : [[]];
  for (const r of remainder) for (const h of head) yield [h, ...r];
}

// All Chinese aliases for the selected weather.
function weatherNames(selectedWeather: string | null): string[] {
  if (selectedWeather === null) {
    return [""];
  }
  return weatherToChinese[selectedWeather];
}

// All Chinese aliases for the selected boss (SSS-prefixed when applicable).
function bossNames(selectedBoss: string | null, sssBoss: boolean): string[] {
  if (selectedBoss === null) {
    return [""];
  }
  if (sssBoss) {
    return bossToChinese[selectedBoss].map((bossName) => "SSS" + bossName);
  }
  return bossToChinese[selectedBoss];
}

type ValkGroup = {
  ranks: Record<string, string[]>;
  refines?: Record<string, string[]>;
  options: Record<string, string[]>;
};

const valkGroups = Object.values(valkToChinese) as ValkGroup[];

// All selectable valkyrie option names, across every group.
export const valkOptions: string[] = valkGroups.flatMap((g) => Object.keys(g.options));

function valkGroupFor(name: string): ValkGroup | undefined {
  return valkGroups.find((g) => name in g.options);
}

// Rank button labels for a valk option's group (empty when the group has none).
export function valkRanksFor(name: string | null): string[] {
  if (!name) {
    return [];
  }
  const group = valkGroupFor(name);
  return group ? Object.keys(group.ranks) : [];
}

// Refine button labels for a valk option's group (empty when the group has none).
export function valkRefinesFor(name: string | null): string[] {
  if (!name) {
    return [];
  }
  const group = valkGroupFor(name);
  return group && group.refines ? Object.keys(group.refines) : [];
}

// Whether a valk option is a full 3-valk team (an exclusive selection).
export function isTeamValk(name: string): boolean {
  const team = (valkToChinese as Record<string, ValkGroup>).team;
  return team ? name in team.options : false;
}

// Search tokens for one valk: rank + refine + alias, for every value combination.
function valkVariants(name: string, rankLabel: string | null, refineLabel: string | null): string[] {
  const group = valkGroupFor(name);
  if (!group) {
    return [""];
  }
  const aliases = group.options[name];
  const rankValues = rankLabel && group.ranks[rankLabel] ? group.ranks[rankLabel] : [""];
  // Refine values contain "+", which is the URL term separator, so encode it as %2B
  // to keep rank+refine+alias as a single literal search token.
  const refineValues =
    refineLabel && group.refines && group.refines[refineLabel]
      ? group.refines[refineLabel].map((r) => r.replace(/\+/g, "%2B"))
      : [""];
  const variants: string[] = [];
  for (const rank of rankValues) {
    for (const refine of refineValues) {
      for (const alias of aliases) {
        variants.push(rank + refine + alias);
      }
    }
  }
  return variants;
}

// Every combination of the selected valks' search tokens, lead-first order preserved.
// Each valk contributes rank + refine + alias (per the selected rank/refine labels).
function valkCombos(
  selectedValks: string[],
  valkRanks: Record<string, string | null>,
  valkRefines: Record<string, string | null>,
  allS0Plus1: boolean
): string[] {
  let combos = [""];
  for (const name of selectedValks) {
    // With "All S0+1" the individual rank/refine are ignored — just the aliases.
    const variants = allS0Plus1
      ? valkGroupFor(name)?.options[name] ?? [""]
      : valkVariants(name, valkRanks[name] ?? null, valkRefines[name] ?? null);
    combos = combos.flatMap((curr) => variants.map((v) => curr + v));
  }
  if (allS0Plus1) {
    // Prefix the team-wide "All S0+1" term (全S0+1) once; "+" encoded as %2B.
    combos = combos.map((c) => "全S0%2B1" + c);
  }
  return combos;
}

type CompanionGroup = {
  ranks: Record<string, string[]>;
  options: Record<string, string[]>;
};

const companionGroups = Object.values(companionToChinese) as CompanionGroup[];

// All selectable companion option names, across ELF and Astral Op.
export const companionOptions: string[] = companionGroups.flatMap((g) => Object.keys(g.options));

function companionGroupFor(option: string): CompanionGroup | undefined {
  return companionGroups.find((g) => option in g.options);
}

// Rank button labels for the given companion option's group (empty if none / unknown).
export function companionRanksFor(option: string | null): string[] {
  if (!option) {
    return [];
  }
  const group = companionGroupFor(option);
  return group ? Object.keys(group.ranks) : [];
}

// Companion search tokens: the option's aliases, each prefixed with the selected
// rank's translated value(s) when a rank is active.
function companionNames(selectedCompanion: string | null, companionRank: string | null): string[] {
  if (selectedCompanion === null) {
    return [""];
  }
  const group = companionGroupFor(selectedCompanion);
  if (!group) {
    return [""];
  }
  const aliases = group.options[selectedCompanion];
  const rankValues = companionRank ? group.ranks[companionRank] : null;
  if (rankValues) {
    return rankValues.flatMap((rank) => aliases.map((name) => rank + name));
  }
  return aliases;
}

type ModifierCategoryData = {
  type: string;
  options: Record<string, string[]>;
};

const modifierCategoryData = modifiersToChinese as Record<string, ModifierCategoryData>;

// Flattened modifier name -> aliases, across all categories.
const modifierAliases: Record<string, string[]> = Object.assign(
  {},
  ...Object.values(modifierCategoryData).map((c) => c.options)
);

// Modifiers grouped by category (with its selection type) for the checkbox UI.
export const modifierCategories: { category: string; type: string; names: string[] }[] =
  Object.entries(modifierCategoryData).map(([category, group]) => ({
    category,
    type: group.type,
    names: Object.keys(group.options),
  }));

// Builds the list of Bilibili search URLs for the current selection.
export function buildBiliLinks(input: BiliSearchInput): string[] {
  const {
    selectedWeather,
    selectedBoss,
    sssBoss,
    selectedValks,
    valkRanks,
    valkRefines,
    allS0Plus1,
    selectedCompanion,
    companionRank,
    score,
    activeModifiers,
    dateRange,
  } = input;

  // Active modifiers (category checkboxes); these lead the search string.
  let modifierParams = activeModifiers.map((name) => modifierAliases[name]);
  // Must have at least one element in each array passed to combine to generate anything.
  modifierParams = modifierParams.length ? modifierParams : [[""]];
  const modifierCombos = Array.from(combine(modifierParams)).map((c) => c.join("+").trim());

  // MA score is an optional trailing term; a combined "sss / sssUp" value
  // expands to two score terms, each producing its own link.
  const scoreTokens = score ? String(score).split(" / ") : [""];

  const baseUrl = isMobile()
    ? "https://m.bilibili.com/search?keyword="
    : "https://search.bilibili.com/all?keyword=";

  // Order: modifiers first, then weather, boss, valkyries, companion, then score.
  const combinations = Array.from(
    combine([
      modifierCombos,
      weatherNames(selectedWeather),
      bossNames(selectedBoss, sssBoss),
      valkCombos(selectedValks, valkRanks, valkRefines, allS0Plus1),
      companionNames(selectedCompanion, companionRank),
      scoreTokens,
    ])
  )
    .map((element) => element.filter((x) => x !== ""))
    // Drop the empty combination (nothing selected) so no blank link/bullet is shown.
    .filter((c) => c.length > 0);

  // bilibili changes spaces to + in their url query params
  // handle special case for 全S0+1, encode the + to %2B
  // Optional publish-time range filter (sorted by publish date) as Bilibili query params.
  const dateSuffix = dateRange
    ? `&pubtime_begin_s=${dateRange.begin}&pubtime_end_s=${dateRange.end}&order=pubdate`
    : "";

  return combinations
    .map((c) => `${baseUrl}${c.join("+").replace("全S0+1", "全S0%2B1").trim()}${dateSuffix}`)
    .sort((a, b) => a.length - b.length || a.localeCompare(b));
}
