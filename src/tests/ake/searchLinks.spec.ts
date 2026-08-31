import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  akeBossOptions,
  akeOperatorOptions,
  buildAkeBiliLinks,
  operatorFullname,
  operatorNicknames,
} from "@/util/ake/searchLinks";
import { akeBossToChinese } from "@/data/ake/bossTranslations";
import { akeOperatorToChinese } from "@/data/ake/operatorTranslations";

// Fixtures come out of the translation data rather than being hardcoded, as in the HI3
// specs: the dictionaries are hand-edited and the code is data-driven, so pinning literal
// Chinese would make an unrelated data edit fail the suite.
const bossAliases = akeBossToChinese as Record<string, string[]>;
const operatorData = akeOperatorToChinese as Record<
  string,
  { nicknames: string[]; fullname: string }
>;

// Operators picked by the shape they need to exercise, not by position, so the cases keep
// testing what they mean to when the dictionary is edited. The raw `nicknames` array is the
// predicate: operatorNicknames() cannot tell a lone real nickname from the full-name
// fallback, since both come back as a one-element list.
const WITH_NICKNAMES = akeOperatorOptions.filter((n) => operatorData[n].nicknames.length > 0);
const MULTI_NICKNAMES = akeOperatorOptions.filter((n) => operatorData[n].nicknames.length > 1);
const WITHOUT_NICKNAMES = akeOperatorOptions.filter((n) => operatorData[n].nicknames.length === 0);

// The expected operator keyword variants: one all-full-names spelling, plus the product of
// everyone's nicknames. Mirrors the rule rather than the implementation's loop.
const expectedOperatorTerms = (picked: string[]) => {
  const fullNames = picked.map(operatorFullname).join("");
  const nicknameCombos = picked.reduce(
    (combos, name) => combos.flatMap((curr) => operatorNicknames(name).map((n) => curr + n)),
    [""]
  );
  return new Set([fullNames, ...nicknameCombos]);
};

// The URL machinery itself is covered in tests/biliUrl.spec.ts; this file is only about
// how the AKE page turns a selection into dimensions.
const keywordOf = (link: string) => link.split("keyword=")[1].split("&pubtime_begin_s=")[0];

// buildKeywordLinks reads navigator.userAgent to choose the host.
beforeEach(() => {
  (globalThis as any).window = { navigator: { userAgent: "Mozilla/5.0 (Windows NT 10.0)" } };
});
afterEach(() => delete (globalThis as any).window);

const build = (selectedOperators: string[], selectedBoss: string | null = null) =>
  buildAkeBiliLinks({ selectedBoss, selectedOperators });

describe("operator terms", () => {
  it("concatenates the operators into one term, with no separator", () => {
    const [a, b] = akeOperatorOptions;
    // One keyword, not two: "秋栗阿列什" rather than "秋栗+阿列什".
    for (const link of build([a, b])) {
      expect(keywordOf(link).split("+")).toHaveLength(1);
    }
  });

  it("keeps the operators in the order they were picked, lead first", () => {
    const [a, b, c] = akeOperatorOptions;
    const expected = `${operatorFullname(a)}${operatorFullname(b)}${operatorFullname(c)}`;
    expect(build([a, b, c]).map(keywordOf)).toContain(expected);
    // The reverse selection must produce the reverse term, not the same one.
    const reversed = `${operatorFullname(c)}${operatorFullname(b)}${operatorFullname(a)}`;
    expect(build([c, b, a]).map(keywordOf)).toContain(reversed);
  });

  it("emits exactly one link spelling every operator with its full name", () => {
    const picked = [MULTI_NICKNAMES[0], WITH_NICKNAMES[0]];
    const fullNames = picked.map(operatorFullname).join("");
    expect(build(picked).map(keywordOf).filter((k) => k === fullNames)).toEqual([fullNames]);
  });

  it("emits one link per combination of the operators' nicknames", () => {
    // One operator with several nicknames, so the product is genuinely a product.
    const picked = [MULTI_NICKNAMES[0], WITH_NICKNAMES.find((n) => n !== MULTI_NICKNAMES[0])!];
    const keywords = build(picked).map(keywordOf);
    for (const first of operatorNicknames(picked[0])) {
      for (const second of operatorNicknames(picked[1])) {
        expect(keywords).toContain(`${first}${second}`);
      }
    }
    // Full names never mix with nicknames: the count is 1 + the nickname product.
    const product = operatorNicknames(picked[0]).length * operatorNicknames(picked[1]).length;
    expect(product).toBeGreaterThan(1);
    expect(keywords).toHaveLength(1 + product);
  });

  it("substitutes the full name for an operator that has no nicknames", () => {
    const withNick = WITH_NICKNAMES[0];
    const without = WITHOUT_NICKNAMES[0];
    const keywords = build([withNick, without]).map(keywordOf);
    // The nickname variants still carry the second operator, spelled in full.
    for (const nickname of operatorNicknames(withNick)) {
      expect(keywords).toContain(`${nickname}${operatorFullname(without)}`);
    }
  });

  it("does not repeat the full-name link when no operator has a nickname", () => {
    const picked = WITHOUT_NICKNAMES.slice(0, 2);
    const keywords = build(picked).map(keywordOf);
    // The nickname fallback reproduces the full-name spelling; it must be deduped.
    expect(keywords).toEqual([picked.map(operatorFullname).join("")]);
  });

  it("matches the rule exactly for a mixed selection", () => {
    const picked = [MULTI_NICKNAMES[0], WITHOUT_NICKNAMES[0], WITH_NICKNAMES[0]];
    expect(new Set(build(picked).map(keywordOf))).toEqual(expectedOperatorTerms(picked));
  });

  it("emits the full name and each nickname for a single operator", () => {
    const name = MULTI_NICKNAMES[0];
    expect(new Set(build([name]).map(keywordOf))).toEqual(
      new Set([operatorFullname(name), ...operatorNicknames(name)])
    );
  });

  it("produces no links when nothing is selected", () => {
    expect(build([])).toEqual([]);
  });

  // The cases above are only meaningful if the data still yields these fixtures.
  it("found operators with one nickname, several, and none", () => {
    expect(WITH_NICKNAMES.length).toBeGreaterThanOrEqual(2);
    expect(MULTI_NICKNAMES.length).toBeGreaterThanOrEqual(1);
    expect(WITHOUT_NICKNAMES.length).toBeGreaterThanOrEqual(2);
  });
});

describe("boss term", () => {
  it("stays its own +-separated term ahead of the operators", () => {
    const boss = akeBossOptions[0];
    const picked = [WITH_NICKNAMES[0], WITH_NICKNAMES[1]];
    const operatorVariants = expectedOperatorTerms(picked);
    for (const link of build(picked, boss)) {
      const terms = keywordOf(link).split("+");
      // Two terms: the boss, then the operators concatenated into one.
      expect(terms).toHaveLength(2);
      expect(bossAliases[boss]).toContain(terms[0]);
      expect(operatorVariants).toContain(terms[1]);
    }
  });

  it("is the only term when no operators are picked", () => {
    const boss = akeBossOptions[0];
    expect(build([], boss).map(keywordOf).sort()).toEqual([...bossAliases[boss]].sort());
  });
});
