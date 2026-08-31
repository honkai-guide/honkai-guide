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

const bossAliases = akeBossToChinese as Record<string, string[]>;
const operatorAliases = akeOperatorToChinese as Record<string, string[]>;

// Option lists for the dropdowns.
export const akeBossOptions: string[] = Object.keys(bossAliases);
export const akeOperatorOptions: string[] = Object.keys(operatorAliases);

// All Chinese aliases for the selected boss.
function bossNames(selectedBoss: string | null): string[] {
  if (selectedBoss === null) {
    return [""];
  }
  return bossAliases[selectedBoss] ?? [""];
}

// Builds the list of Bilibili search URLs for the current selection.
export function buildAkeBiliLinks({ selectedBoss, selectedOperators }: AkeSearchInput): string[] {
  // Each operator is its own dimension rather than being concatenated into one term, so
  // they come out as separate keywords ("佩丽卡+陈千语"). Endfield operator names run to
  // several characters each, and video titles space them apart; the HI3 page concatenates
  // its valkyrie tokens only because those aliases are single characters.
  const operatorDimensions = selectedOperators.map((name) => operatorAliases[name] ?? [""]);

  // Order: boss first, then operators in the order they were picked.
  return buildKeywordLinks([bossNames(selectedBoss), ...operatorDimensions]);
}
