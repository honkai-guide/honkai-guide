// English -> Chinese search aliases for Arknights: Endfield bosses.
//
// Flat map, same schema as bossTranslations.ts: each selection expands to one search term
// per alias. Only two entries for now — add more as they're needed, no code change
// required. The bosses' full CN names carry a title after a comma (聂菲斯，"碾骨" /
// 阿莱克琉斯，千夫长); the bare name is the alias here because that is the part video
// titles actually use.
export const akeBossToChinese = {
  Nefarith: ["聂菲斯"],
  Alleikhreos: ["阿莱克琉斯"],
};
