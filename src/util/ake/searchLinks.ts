import { buildKeywordLinks } from "@/util/biliUrl";
import { akeBossToChinese } from "@/data/ake/bossTranslations";
import { akeOperatorToChinese } from "@/data/ake/operatorTranslations";

// The Arknights: Endfield search page. Much simpler than the HI3 one — for now just a boss
// and up to four operators, with no ranks, weather, modifiers or score. URL assembly is
// shared with the HI3 page via buildKeywordLinks.

// A team is four operators, so that is the selection cap.
export const MAX_OPERATORS = 4;

export interface AkeSearchInput {
  selectedBoss: string | null;
  selectedOperators: string[];
}

// Operators keep their official name apart from community shorthand; see the data file.
export interface OperatorNames {
  nicknames: string[];
  fullname: string;
}

const bossAliases = akeBossToChinese as Record<string, string[]>;
const operatorNames = akeOperatorToChinese as Record<string, OperatorNames>;

// Option lists for the dropdowns.
export const akeBossOptions: string[] = Object.keys(bossAliases);
export const akeOperatorOptions: string[] = Object.keys(operatorNames);

// An operator's official CN name.
export function operatorFullname(name: string): string {
  return operatorNames[name]?.fullname ?? "";
}

// The shorthand a title might use for one operator. An operator with none falls back to its
// full name, so it contributes exactly one option to the nickname product below rather than
// dropping the operator out of the keyword entirely.
export function operatorNicknames(name: string): string[] {
  const names = operatorNames[name];
  if (!names) {
    return [""];
  }
  return names.nicknames.length ? names.nicknames : [names.fullname];
}

// All Chinese aliases for the selected boss.
function bossNames(selectedBoss: string | null): string[] {
  if (selectedBoss === null) {
    return [""];
  }
  return bossAliases[selectedBoss] ?? [""];
}

// The operator keyword variants, each one the selected operators concatenated with no
// separator in the order they were picked (lead first) — the same shape as the HI3 page's
// valkyrie token. One dimension, not one per operator, so the operators stay a single
// keyword rather than being +-separated.
//
// Two kinds of variant, because CN titles use either register but rarely mix them:
//   1. one link spelling every operator with its full name, and
//   2. one link per combination of the operators' nicknames.
// Nicknames fall back to the full name (see operatorNicknames), so an operator without any
// still pins the others' shorthand to the right character. When no selected operator has a
// nickname that fallback reproduces the full-name variant exactly, hence the dedupe.
function operatorCombos(selectedOperators: string[]): string[] {
  if (selectedOperators.length === 0) {
    return [""];
  }

  const fullNames = selectedOperators.map(operatorFullname).join("");

  let nicknameCombos = [""];
  for (const name of selectedOperators) {
    const nicknames = operatorNicknames(name);
    nicknameCombos = nicknameCombos.flatMap((curr) => nicknames.map((nick) => curr + nick));
  }

  return [...new Set([fullNames, ...nicknameCombos])];
}

// Builds the list of Bilibili search URLs for the current selection.
export function buildAkeBiliLinks({ selectedBoss, selectedOperators }: AkeSearchInput): string[] {
  // Order: boss first, then the operators as one concatenated term.
  return buildKeywordLinks([bossNames(selectedBoss), operatorCombos(selectedOperators)]);
}
