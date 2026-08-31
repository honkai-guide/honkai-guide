// English -> Chinese search aliases for Arknights: Endfield operators.
//
// A flat map of the name shown in the UI to that operator's Chinese search terms, split
// into the official full name and any shorthand the community uses:
//
//   <English name>: { nicknames: string[], fullname: string }
//
// Unlike the HI3 dictionaries — which are plain alias arrays — the two are kept apart here
// because the search treats them differently: one link spells every selected operator in
// full, and the other links are the cartesian product of their nicknames (see
// util/ake/searchLinks.ts). The two registers are never mixed in one keyword. Order in this
// file does not matter; the UI sorts the dropdown with localeCompare. Add to `nicknames`
// when videos title an operator more than one way; no code change is needed.
//
// CN community in most cases only use the first character of the operator's full name.
// If not, the first character will still match the full name in a text search.
export const akeOperatorToChinese = {
  Akekuri: {
    nicknames: [],
    fullname: "秋栗",
  },
  Alesh: {
    nicknames: ["钓"],
    fullname: "阿列什",
  },
  Antal: {
    nicknames: [],
    fullname: "安塔尔",
  },
  Arcane: {
    nicknames: [],
    fullname: "诀",
  },
  Arclight: {
    nicknames: ["弧"],
    fullname: "弧光",
  },
  Ardelia: {
    nicknames: ["羊"],
    fullname: "艾尔黛拉",
  },
  Avywenna: {
    nicknames: [],
    fullname: "艾维文娜",
  },
  Camille: {
    nicknames: ["卡"],
    fullname: "卡缪",
  },
  Catcher: {
    nicknames: [],
    fullname: "卡契尔",
  },
  "Chen Qianyu": {
    nicknames: [],
    fullname: "陈千语",
  },
  "Da Pan": {
    nicknames: [],
    fullname: "大潘",
  },
  Ember: {
    nicknames: [],
    fullname: "余烬",
  },
  Endministrator: {
    nicknames: ["管"],
    fullname: "管理员",
  },
  Estella: {
    nicknames: [],
    fullname: "埃特拉",
  },
  Fluorite: {
    nicknames: [],
    fullname: "萤石",
  },
  Gilberta: {
    nicknames: ["洁", "塔"],
    fullname: "洁尔佩塔",
  },
  Laevatain: {
    nicknames: ["莱"],
    fullname: "莱万汀",
  },
  "Last Rite": {
    nicknames: ["别"],
    fullname: "别礼",
  },
  Lifeng: {
    nicknames: [],
    fullname: "黎风",
  },
  Liino: {
    nicknames: ["梨"],
    fullname: "梨诺",
  },
  "Mi Fu": {
    nicknames: [],
    fullname: "弭弗",
  },
  Perlica: {
    nicknames: ["佩"],
    fullname: "佩丽卡",
  },
  Pogranichnik: {
    nicknames: [],
    fullname: "骏卫",
  },
  Purrchena: {
    nicknames: [],
    fullname: "普切娜",
  },
  Rossi: {
    nicknames: ["洛"],
    fullname: "洛茜",
  },
  Snowshine: {
    nicknames: [],
    fullname: "昼雪",
  },
  Tangtang: {
    nicknames: ["汤"],
    fullname: "汤汤",
  },
  Typhoeus: {
    nicknames: [],
    fullname: "提弗洛斯",
  },
  Wulfgard: {
    nicknames: ["狼"],
    fullname: "狼卫",
  },
  Xaihi: {
    nicknames: ["赛"],
    fullname: "赛希",
  },
  Yvonne: {
    nicknames: ["伊"],
    fullname: "伊冯",
  },
  "Zhuang Fangyi": {
    nicknames: ["庄"],
    fullname: "庄方宜",
  }
};
