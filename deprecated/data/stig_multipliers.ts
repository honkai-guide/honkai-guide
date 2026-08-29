import { Type, Multiplier } from "@/models/multiplier";

const SUPPORT_STIG_MULTIPLIERS = Object.freeze({
  Ai: {
    T: [
      new Multiplier({
        active: true,
        name: "Ai T: when host Charged ATK or Ultimate hits, Fire DMG dealers deal more total DMG",
        type: Type.TdmDealt,
        value: 25,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Ai B: when weapon active or Ultimate hits, team deals more fire DMG",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Ai 2 set: at max Spotlight team deals more fire DMG to ignited enemies",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Ai 3 set: when ignited enemies are hit by team members, it receives more fire DMG",
        type: Type.EleTaken,
        value: 35,
      }),
      new Multiplier({
        active: false,
        name: "Ai 3 set: Chrono Navi equip: igniting enemies make them receive more ignite DMG",
        type: Type.EleTaken,
        value: 20,
      }),
    ],
  },
  Aladdin: {
    M: [
      new Multiplier({
        active: true,
        name: "Aladdin M: team deals more Physical DMG to bleeding enemies",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Aladdin B: enemies take more Bleed DMG",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Aladdin 2 set: team deals more Bleed DMG",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
  },
  Aslaug: {
    T: [
      new Multiplier({
        active: true,
        name: "Aslaug T: team elemental DMG boost against Feathered enemies",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Aslaug M: team fire DMG boost with host on standby",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Aslaug B: Enemies hit by ultimate are inflicted with Feathered and take bonus elemental DMG.",
        type: Type.EleTaken,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Aslaug 2 set: Enemies in Feathered state take 30% bonus elemental DMG instead.",
        type: Type.EleTaken,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Aslaug 2 set: team deals bonus total DMG",
        type: Type.TdmDealt,
        value: 12,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Aslaug 3 set: team fire DMG boost with host on standby",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
  },
  Avogadro: {
    M: [
      new Multiplier({
        active: true,
        name: "Avogadro M: team gains total DMG boost after host casts weapon active.",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
  },
  Bastet: {
    T: [
      new Multiplier({
        active: true,
        name: "Bastet T: Team deals bonus ice DMG to frozen enemies.",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Bastet 2 set: Freezing enemies boosts team total DMG",
        type: Type.TdmDealt,
        value: 50,
      }),
    ],
  },
  Beethoven: {
    M: [
      new Multiplier({
        active: true,
        name: "Beet M: Team gains melee physical boost.",
        type: Type.PhysDealt,
        value: 15,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Beet 2 set: After ult, next valk to switch in gains melee physical boost.",
        type: Type.PhysDealt,
        value: 40,
      }),
    ],
  },
  "Bronya Zaychik": {
    T: [
      new Multiplier({
        active: true,
        name: "Zaychik T: When all team members are in Inceptive Authority, they deal more Total DMG",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Zaychik B: Inceptive Authority increases elemental DMG",
        type: Type.EleDealt,
        value: 34,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Zaychik 2 set: Combo ATKs in Herrscher form improves Inceptive Authority effect, making all enemies receive more total DMG",
        type: Type.TdmTaken,
        value: 18,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Zaychik 3 set: If a team member is in Inceptive Authority, all enemies receive more elemental DMG",
        type: Type.EleTaken,
        value: 16,
      }),
    ],
  },
  Cezanne: {
    T: [
      new Multiplier({
        active: true,
        name: "Cezanne T: boost phys DMG of ultimate after any team's ultimate hits",
        type: Type.PhysDealt,
        value: 27,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Cezanne B: when combo atk hits, inflict Structure Outline, all enemies take more total DMG",
        type: Type.TdmTaken,
        value: 36,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Cezanne 3 set: after ultimate, team gains total DMG when attacking enemies with broken/no shield for each stack of Bleed (max 10%)",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
  },
  "Fu Hua - Margrave": {
    T: [
      new Multiplier({
        active: true,
        name: "Margrave T: When 2-set effect is active, team gains elemental DMG.",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Margrave B: When 2-set is active, nearby enemies take more TDM.",
        type: Type.TdmTaken,
        value: 14,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Margrave 3 set: When spending 60/120 SP, increase 2-set effect to 17/20%.",
        type: Type.TdmTaken,
        value: 6,
      }),
    ],
  },
  "Fu Hua Musician": {
    M: [
      new Multiplier({
        active: true,
        name: "Musician M: When undeployed, team gains fire DMG.",
        type: Type.EleDealt,
        value: 10,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Musician 2 set: After exit, team gains TDM for 10 seconds.",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
  },
  "Gustav Klimt": {
    M: [
      new Multiplier({
        active: true,
        name: "Gustav M: When using weapon active, team gains physical DMG.",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Gustav 2 set: When using weapon active, enemies take more physical DMG.",
        type: Type.PhysTaken,
        value: 10,
      }),
    ],
  },
  Handel: {
    T: [
      new Multiplier({
        active: true,
        name: "Handel T: Landing QTE increases lightning DMG for fielded valks",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Handel 3 set: Teammates on field gain total DMG",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: false,
        name: "Handel 3 set: Upon spending 60 SP in one go, enemies take bonus lightning DMG",
        type: Type.EleTaken,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Handel 3 set: Upon spending 120 SP in one go, enemies take bonus lightning DMG",
        type: Type.EleTaken,
        value: 35,
      }),
    ],
  },
  Holmes: {
    M: [
      new Multiplier({
        active: true,
        name: "Holmes M: team QTEs deal bonus total DMG vs bleeding enemies",
        type: Type.TdmDealt,
        value: 18,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Holmes B: after host dmgs a bleeding enemy, team deals bonus physical DMG",
        type: Type.PhysDealt,
        value: 18,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Holmes 2 set: Host attacks inflict Sanguine Stain on bleeding targets, making them receive bonus physical DMG.",
        type: Type.PhysTaken,
        value: 20,
      }),
    ],
  },
  "Irene Adler": {
    T: [
      new Multiplier({
        active: true,
        name: "Adler T: When undeployed, team gains elemental DMG.",
        type: Type.EleDealt,
        value: 12,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Adler B: charge attack and ult make enemies take more elemental DMG.",
        type: Type.EleTaken,
        value: 15,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Adler 2 set: team gain elemental DMG against enemies hit by charge attack and ult.",
        type: Type.EleDealt,
        value: 18,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Adler 3 set: charge attack and ult boost team lightning DMG.",
        type: Type.EleDealt,
        value: 10,
      }),
    ],
  },
  "Jin Shengtan (JST)": {
    T: [
      new Multiplier({
        active: true,
        name: "JST T: Allies in Blue Phoenix Field (2-set effect).",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    M: [
      new Multiplier({
        active: false,
        name: "JST M: When undeployed, team gains Ice DMG.",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "JST 2 set: Allies in Blue Phoenix Field.",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "JST 2 set: Enemies in Blue Phoenix Field.",
        type: Type.EleTaken,
        value: 10,
      }),
    ],
  },
  "Li Sushang": {
    T: [
      new Multiplier({
        active: true,
        name: "Li Sushang T: when dealing dmg with Combo ATK increase team Ice DMG",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: false,
        name: "Li Sushang B: in Reinforcement state Ice DMG dealt by team increase (120 SP)",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Li Sushang B: in Reinforcement state Ice DMG dealt by team increase (150 SP)",
        type: Type.EleDealt,
        value: 55,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Li Sushang 2 set: Menacing Sword Ki stacks increases ice DMG taken (10 stacks max)",
        type: Type.EleTaken,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Li Sushang 2 set: when equipped by JK, increase max Menacing Sword Ki by 12",
        type: Type.EleTaken,
        value: 12,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Li Sushang 3 set: increase max Menacing Sword Ki to 15",
        type: Type.EleTaken,
        value: 5,
      }),
      new Multiplier({
        active: true,
        name: "Li Sushang 3 set: increase team shield DMG",
        type: Type.ShieldDmgDealt,
        value: 50,
      }),
    ],
  },
  "New Year (Fireworks)": {
    "2 set": [
      new Multiplier({
        active: true,
        name: "New Year B: Fireworks boost physical DMG for team members in AoE.",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
  },
  Newton: {
    B: [
      new Multiplier({
        active: true,
        name: "Newton B: When hitting enemy, they take more TDM for 5 seconds.",
        type: Type.TdmTaken,
        value: 31,
      }),
    ],
  },
  Ogier: {
    T: [
      new Multiplier({
        active: true,
        name: "Ogier T: When undeployed, team gains elemental DMG.",
        type: Type.EleDealt,
        value: 7,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Ogier B: When undeployed, team gains physical DMG.",
        type: Type.PhysDealt,
        value: 5,
      }),
    ],
  },
  Paganini: {
    M: [
      new Multiplier({
        active: true,
        name: "Paganini M: Dealing DMG boosts team phys DMG",
        type: Type.PhysDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Paganini M: Dealing DMG boosts team shield DMG.",
        type: Type.ShieldDmgDealt,
        value: 50,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Paganini B: Charged ATK or Ultimate boosts team total DMG",
        type: Type.TdmDealt,
        value: 18,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Paganini 2 set: Charged ATK makes enemies take bonus phys DMG",
        type: Type.PhysTaken,
        value: 20,
      }),
    ],
  },
  Picasso: {
    "2 set": [
      new Multiplier({
        active: true,
        name: "Picasso 2 set: When orange paint mixes, enemy takes more physical DMG.",
        type: Type.PhysTaken,
        value: 25,
      }),
    ],
  },
  "Pool Party Mei (PPM)": {
    M: [
      new Multiplier({
        active: true,
        name: "Mei M: When hitting enemy, they take more TDM for 5 seconds.",
        type: Type.TdmTaken,
        value: 15,
      }),
    ],
  },
  "Raiden Mei": {
    B: [
      new Multiplier({
        active: true,
        name: "Raiden Mei B: Triggering Time-Frozen Domain makes all enemies take more Total DMG (3 stacks)",
        type: Type.TdmTaken,
        value: 24,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Raiden Mei 2 set: Triggering Time-Frozen Domain makes all enemies take more Elemental DMG (independent) (3 stacks)",
        type: Type.EleTakenHost,
        value: 25.9712,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Raiden Mei 3 set: After any team member casts Joint Bursting in Herrscher Form, all enemies take more Total DMG.",
        type: Type.TdmTaken,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Raiden Mei 3 set: Enemies in Listen Well state take more Total DMG after being hit by Combo ATK 5 times",
        type: Type.TdmTaken,
        value: 21,
      }),
    ],
  },
  "Shattered Swords": {
    B: [
      new Multiplier({
        active: true,
        name: "Shattered Swords B: Combo atk boosts team Crit DMG for 15s",
        type: Type.CritDmg,
        value: 25,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Shattered Swords 2 set: in herrscher form, team gains crit DMG",
        type: Type.CritDmg,
        value: 30,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Shattered Swords 3 set: team gains crit rate on entry",
        type: Type.CritRate,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Shattered Swords 3 set: in herrscher form, team gains total DMG",
        type: Type.TdmDealt,
        value: 35,
      }),
    ],
  },
  "Shuijing (Sima)": {
    T: [
      new Multiplier({
        active: true,
        name: "Shuijing T: Team gains physical boost.",
        type: Type.PhysDealt,
        value: 8,
      }),
      new Multiplier({
        active: true,
        name: "Shuijing T: When QTE hits a target, team gains physical boost.",
        type: Type.PhysDealt,
        value: 8,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Shuijing B: When QTE hits a target, target takes more physical DMG.",
        type: Type.PhysTaken,
        value: 18,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Shuijing 3 set: When using ult, team gains total DMG boost.",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
  },
  "Summer Day (balloon)": {
    M: [
      new Multiplier({
        active: true,
        name: "Balloon M: When balloon explodes, allies in AoE gain elemental DMG boost.",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
  },
  "Tesla Band": {
    T: [
      new Multiplier({
        active: true,
        name: "Tesla Band T: When undeployed, team gains physical DMG.",
        type: Type.PhysDealt,
        value: 10,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Tesla Band M: When undeployed, team gains lightning DMG.",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
  },
  "Theresa - Gluttony": {
    T: [
      new Multiplier({
        active: true,
        name: "Gluttony T: Team gains 16% TDM when picking up candy.",
        type: Type.TdmDealt,
        value: 16,
      }),
      new Multiplier({
        active: false,
        name: "Gluttony T: Team gains 24% TDM when picking up two candies.",
        type: Type.TdmDealt,
        value: 24,
      }),
    ],
  },
  Turgenev: {
    T: [
      new Multiplier({
        active: true,
        name: "Turgenev T: team gains total DMG when Hunter Marked enemies exist.",
        type: Type.TdmDealt,
        value: 18,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Turgenev B: team gains elemental DMG against Hunter Marked enemies.",
        type: Type.EleDealt,
        value: 36,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Turgenev 2 set: Hunter Marked enemies take more elemental DMG.",
        type: Type.EleTaken,
        value: 21,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: false,
        name: "Turgenev 3 set: team gains ice DMG against Hunter Marked enemies.",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
  },
  Zhenyi: {
    M: [
      new Multiplier({
        active: true,
        name: "Zhenyi M: On exit, ends [Mitternachts] status to grant team lightning DMG for 18s",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Zhenyi B: target hit by weapon active takes more lightning DMG",
        type: Type.EleTaken,
        value: 20,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Zhenyi 3 set: when equipped by Fischl, using QTE during [Mitternachts] grants team total DMG for 20s.",
        type: Type.TdmDealt,
        value: 45,
      }),
    ],
  },
});

const DPS_STIG_MULTIPLIERS = Object.freeze({
  Ai: {
    T: [
      new Multiplier({
        active: true,
        name: "Ai T: Increase fire DMG from weapon active and basic ATK",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Ai T: when host Charged ATK or Ultimate hits, Fire DMG dealers deal more total DMG",
        type: Type.TdmDealt,
        value: 25,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Ai M: increase fire DMG dealt",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Ai B",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Ai B: when weapon active or Ultimate hits, team deals more fire DMG",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Ai 2 set: weapon skill hits grant Spotlight (3 max) that increases fire DMG",
        type: Type.EleDealt,
        value: 24,
      }),
      new Multiplier({
        active: true,
        name: "Ai 2 set: at max Spotlight team deals more fire DMG to ignited enemies",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Ai 3 set: weapon active deals more fire DMG",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Ai 3 set: when ignited enemies are hit by team members, it receives more fire DMG",
        type: Type.EleTaken,
        value: 35,
      }),
      new Multiplier({
        active: false,
        name: "Ai 3 set: Chrono Navi equip: igniting enemies make them receive more ignite DMG",
        type: Type.EleTaken,
        value: 20,
      }),
    ],
  },
  Aladdin: {
    T: [
      new Multiplier({
        active: true,
        name: "Aladdin T: Ultimate deals more Physical DMG",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Aladdin T: When Ultimate deals Bleed DMG, it deals more Total DMG",
        type: Type.TdmDealt,
        value: 60,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Aladdin M: team deals more Physical DMG to bleeding enemies",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Aladdin B",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Aladdin B: enemies take more Bleed DMG",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Aladdin 2 set: team deals more Bleed DMG",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Aladdin 2 set: Valkyrie Quicksand: weapon active and Ultimate deal more Total DMG",
        type: Type.TdmDealt,
        value: 80,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Aladdin 3 set: increases Physical DMG",
        type: Type.PhysDealt,
        value: 18,
      }),
      new Multiplier({
        active: true,
        name: "Aladdin 3 set: increase Combo ATK Total DMG",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
  },
  "Allen Poe": {
    T: [
      new Multiplier({
        active: true,
        name: "Poe T",
        type: Type.CritRate,
        value: 18,
      }),
      new Multiplier({
        active: false,
        name: "Poe T: if 2 or more enemies, convert 2%*n of the bonus crit rate to 4%*n phys DMG (max 5)",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: false,
        name: "Poe M: After spending no less than 3 sp, boost crit DMG for basic ATKs (charged/combo included)",
        type: Type.CritDmg,
        value: 50,
      }),
      new Multiplier({
        active: true,
        name: "Poe M: After spending no less than 33 sp, boost crit DMG for basic ATKs (charged/combo included)",
        type: Type.CritDmg,
        value: 60,
      }),
      new Multiplier({
        active: false,
        name: "Poe M: After spending no less than 63 sp, boost crit DMG for basic ATKs (charged/combo included)",
        type: Type.CritDmg,
        value: 70,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Poe 2 set",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Poe 2 set: Charged ATKs and followups within 1sec deal more total DMG",
        type: Type.TdmDealt,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "Poe 2 set: Seele gains additional total DMG for said ATKs",
        type: Type.TdmDealt,
        value: 40,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Poe 3 set: Seele gains total DMG",
        type: Type.TdmDealt,
        value: 25,
      }),
    ],
  },
  "Ana Schariac": {
    T: [
      new Multiplier({
        active: true,
        name: "Ana T: ice DMG boost.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Ana T: total DMG boost against enemies within 5 meters. Drops by 2% per meter past 5, down to 10% minimum.",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Ana M: ice DMG boost.",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Ana B: ice DMG boost against enemies within 5 meters. Drops by 3% per meter past 5, down to 15% minimum.",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Ana 2 set: ice DMG boost.",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Ana 3 set: combo and charged attacks gain TDM boost.",
        type: Type.TdmDealt,
        value: 50,
      }),
      new Multiplier({
        active: true,
        name: "Ana 3 set: enemies within 5 meters take extra ice DMG from host.",
        type: Type.EleTakenHost,
        value: 10,
      }),
    ],
  },
  Aslaug: {
    T: [
      new Multiplier({
        active: true,
        name: "Aslaug T: fire DMG boost.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Aslaug T: team elemental DMG boost against Feathered enemies",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Aslaug M: fire DMG boost.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Aslaug M: every hit boosts host's total DMG (6 stacks max)",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Aslaug B: fire DMG boost.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Aslaug B: Enemies hit by ultimate are inflicted with Feathered and take bonus elemental DMG.",
        type: Type.EleTaken,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Aslaug 2 set: total DMG boost.",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Aslaug 2 set: Enemies in Feathered state take 30% bonus elemental DMG instead.",
        type: Type.EleTaken,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Aslaug 2 set: team deals bonus total DMG",
        type: Type.TdmDealt,
        value: 12,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Aslaug 3 set: Charged ATKs boost total DMG on hit",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
  },
  Attila: {
    B: [
      new Multiplier({
        active: true,
        name: "Attila B: when combo count exceeds 30, gain physical DMG.",
        type: Type.PhysDealt,
        value: 31,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Attila 2 set",
        type: Type.CritDmg,
        value: 30,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Attila 3 set",
        type: Type.Crt,
        value: 40,
      }),
    ],
  },
  Avogadro: {
    T: [
      new Multiplier({
        active: true,
        name: "Avogadro T",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Avogadro M: team gains total DMG boost after host casts weapon active.",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Avogadro B: host weapon active gains physical DMG boost for 5s after its activation.",
        type: Type.PhysDealt,
        value: 65,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Avogadro 3 set",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Avogadro 3 set: host deals more TDM against marked enemies.",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
  },
  Bastet: {
    T: [
      new Multiplier({
        active: true,
        name: "Bastet T: Team deals bonus ice DMG to frozen enemies.",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Bastet T: ice DMG",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Bastet M",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Bastet B",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Bastet 2 set: Freezing enemies boosts team total DMG",
        type: Type.TdmDealt,
        value: 50,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Bastet 3 set",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
  },
  "Benares: Awakening": {
    T: [
      new Multiplier({
        active: true,
        name: "Benares T",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Benares T: Lightning boost in herrscher form.",
        type: Type.EleDealt,
        value: 50,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Benares M: Lightning boost.",
        type: Type.EleDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Benares M: Gain TDM for 9s after switch in or using weapon active.",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Benares B: Lightning boost.",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Benares 2 set",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Benares 3 set: Lightning boost",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Benares 3 set: Enemies hit by Herrscher mode attacks take more lightning DMG.",
        type: Type.EleTaken,
        value: 15,
      }),
    ],
  },
  "Bianka: Theatre": {
    T: [
      new Multiplier({
        active: true,
        name: "Bianka T",
        type: Type.PhysDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Bianka T: Landing Charged ATK 10 times boost Crit DMG.",
        type: Type.CritDmg,
        value: 45,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Bianka M",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Bianka M: Ultimate Evasion or Retaliation Skill boosts Total DMG.",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Bianka B",
        type: Type.CritRate,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Bianka B: Global Time Slow boosts Crit Rate",
        type: Type.CritRate,
        value: 5,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Bianka 2 set: World's a Stage",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Bianka 3 set",
        type: Type.PhysDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Bianka 3 set: Triggering World's a Stage boosts Physical DMG dealt by Ultimate",
        type: Type.PhysDealt,
        value: 80,
      }),
    ],
  },
  "Bronya: N-EX": {
    T: [
      new Multiplier({
        active: true,
        name: "N-EX T",
        type: Type.TdmDealt,
        value: 25,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "N-EX M",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "N-EX B: Each stack of Falconwings increases Ice DMG (3 max)",
        type: Type.EleDealt,
        value: 75,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "N-EX 2 set: Max stacked Falconwings increases Total DMG",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "N-EX 2 set: If QTE used with 3 Falconwings stacks, increase Ice DMG for each stack granted by B-piece",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "N-EX 3 set: Basic ATKs (including Combo/Charged) deal additional Ice DMG",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
  },
  "Bronya Zaychik": {
    T: [
      new Multiplier({
        active: true,
        name: "Zaychik T: In Herrscher form increase Ice DMG",
        type: Type.EleDealt,
        value: 50,
      }),
      new Multiplier({
        active: true,
        name: "Zaychik T: When all team members are in Inceptive Authority, they deal more Total DMG",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Zaychik M: All enemies receive more Total DMG from Bronya's ranged attacks",
        type: Type.TdmTaken,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Zaychik B",
        type: Type.TdmDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Zaychik B: Inceptive Authority increases elemental DMG",
        type: Type.EleDealt,
        value: 34,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Zaychik 2 set: Bearer deals more total DMG w/ team members in Inceptive Authority",
        type: Type.TdmDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Zaychik 2 set: Combo ATKs in Herrscher form improves Inceptive Authority effect, making all enemies receive more total DMG",
        type: Type.TdmTaken,
        value: 18,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Zaychik 3 set: Combo ATK, Ultimate, and burst mode ATKs deal more Ice DMG",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Zaychik 3 set: If a team member is in Inceptive Authority, all enemies receive more elemental DMG",
        type: Type.EleTaken,
        value: 16,
      }),
    ],
  },
  "Carlo Collodi": {
    T: [
      new Multiplier({
        active: true,
        name: "Collodi T",
        type: Type.TdmDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Collodi T: Fire DMG dealt by ranged attacks",
        type: Type.EleDealt,
        value: 40,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Collodi M: when a summoned entity is spawned or defeated, all enemies take bonus Fire DMG from host",
        type: Type.EleTakenHost,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Collodi B: Fire DMG",
        type: Type.EleDealt,
        value: 60,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Collodi 2 set",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Collodi 2 set: increase Fire DMG in burst mode",
        type: Type.TdmDealt,
        value: 40,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Collodi 3 set: attacks increase Fire DMG on hit (5 stacks)",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Collodi 3 set: gain Total DMG in burst mode",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
  },
  Cezanne: {
    T: [
      new Multiplier({
        active: true,
        name: "Cezanne T",
        type: Type.PhysDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Cezanne T: boost phys DMG of ultimate after any team's ultimate hits",
        type: Type.PhysDealt,
        value: 27,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Cezanne B: when combo atk hits, inflict Structure Outline, all enemies take more total DMG",
        type: Type.TdmTaken,
        value: 36,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Cezanne 3 set: after ultimate, team gains total DMG when attacking enemies with broken/no shield for each stack of Bleed (max 10%).",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
  },
  "Children/Columbus": {
    T: [
      new Multiplier({
        active: true,
        name: "Children T",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Children T: bonus crit DMG for 4s after landing a charged (can stack).",
        type: Type.CritDmg,
        value: 30,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Children M",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Children M: bonus against single enemies.",
        type: Type.CritDmg,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Children B",
        type: Type.CritRate,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Children B: attacks against same target gain physical DMG (15% max).",
        type: Type.PhysDealt,
        value: 15,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Children 2 set: gain totl DMG for 6s when Charged ATK hits single enemies.",
        type: Type.TdmDealt,
        value: 45,
      }),
    ],
  },
  Cleopatra: {
    M: [
      new Multiplier({
        active: true,
        name: "Cleo M: Attacks against stunned enemies.",
        type: Type.TdmDealt,
        value: 82,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Cleo B: Attacks against paralyzed enemies.",
        type: Type.TdmDealt,
        value: 82,
      }),
    ],
  },
  Dante: {
    T: [
      new Multiplier({
        active: true,
        name: "Dante T",
        type: Type.CritRate,
        value: 15,
      }),
      new Multiplier({
        active: false,
        name: "Dante T: When hit, gain physical DMG.",
        type: Type.PhysDealt,
        value: 8,
      }),
      new Multiplier({
        active: true,
        name: "Dante T: After ultimate evasion or retaliation, gain physical DMG (overwrites on-hit effect).",
        type: Type.PhysDealt,
        value: 16,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Dante M",
        type: Type.PhysDealt,
        value: 30,
      }),
      new Multiplier({
        active: false,
        name: "Dante M: When hit, gain crit DMG.",
        type: Type.CritDmg,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Dante M: After ultimate evasion or retaliation, gain crit DMG (overwrites on-hit effect).",
        type: Type.CritDmg,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: false,
        name: "Dante B: When hit, gain total DMG.",
        type: Type.TdmDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Dante B: After ultimate evasion or retaliation, gain total DMG (overwrites on-hit effect).",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Dante 2 set",
        type: Type.CritDmg,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Dante 2 set: When performing charge attack in burst mode, charge attacks gain physical DMG.",
        type: Type.PhysDealt,
        value: 30,
      }),
    ],
  },
  "Dark Jixuanyuan (DXY)": {
    M: [
      new Multiplier({
        active: true,
        name: "DXY M: When time fracture is active, gain crit rate.",
        type: Type.CritRate,
        value: 30,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "DXY 2 set: When time fracture is active, gain physical DMG.",
        type: Type.PhysDealt,
        value: 40,
      }),
    ],
  },
  Dickens: {
    T: [
      new Multiplier({
        active: true,
        name: "Dickens T",
        type: Type.PhysDealt,
        value: 30,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Dickens M",
        type: Type.PhysDealt,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Dickens B",
        type: Type.TdmDealt,
        value: 25,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Dickens 2 set: basic, combo, charged atks deal bonus physical DMG.",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: false,
        name: "Dickens 2 set: basic, combo, charged atks deal bonus physical DMG against MECH enemies.",
        type: Type.PhysDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Dickens 2 set: casting Ultimate boosts basic, combo, charged atks total DMG.",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
  },
  Dirac: {
    T: [
      new Multiplier({
        active: true,
        name: "Dirac T",
        type: Type.CritRate,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Dirac T: After entry or weapon skill, gain crit rate.",
        type: Type.CritRate,
        value: 10,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Dirac M: Ultimate attacks gain TDM.",
        type: Type.TdmDealt,
        value: 26,
      }),
      new Multiplier({
        active: true,
        name: "Dirac M: During burst mode, gain TDM.",
        type: Type.TdmDealt,
        value: 26,
      }),
      new Multiplier({
        active: false,
        name: "Dirac M: During burst mode, gain 1.5% TDM every second. Max 9 stacks",
        type: Type.TdmDealt,
        value: 13.5,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Dirac B",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Dirac 2 set: If any 2 Dirac stig effects are active, gain physical DMG.",
        type: Type.PhysDealt,
        value: 35,
      }),
    ],
  },
  Edison: {
    T: [
      new Multiplier({
        active: true,
        name: "Edison T: Lightning DMG boost.",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Edison M: Lightning DMG boost.",
        type: Type.EleDealt,
        value: 10,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: false,
        name: "Edison 2 set: Gain a charge every 12s. Next basic attack gains TDM boost.",
        type: Type.TdmDealt,
        value: 50,
      }),
      new Multiplier({
        active: false,
        name: "Edison 2 set: Gain a charge every 12s. Gain TDM boost for 6s.",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Edison 3 set: Lightning DMG boost.",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
  },
  "Elizabeth Bathory": {
    T: [
      new Multiplier({
        active: true,
        name: "Bathory T",
        type: Type.CritRate,
        value: 5,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Bathory M",
        type: Type.PhysDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Bathory M: When above 80% HP.",
        type: Type.PhysDealt,
        value: 10,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Bathory 2 set",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
  },
  Elysia: {
    T: [
      new Multiplier({
        active: true,
        name: "Elysia T",
        type: Type.PhysDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Elysia T: Crit DMG increased for basic/combo/charged ATKs",
        type: Type.CritDmg,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Elysia M",
        type: Type.PhysDealt,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Elysia B",
        type: Type.TdmDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Elysia B",
        type: Type.CritDmg,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Elysia B: Charged ATKs boost crit DMG",
        type: Type.CritDmg,
        value: 15,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Elysia 2 set",
        type: Type.TdmDealt,
        value: 25,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Elysia 3 set: Crit DMG for ranged attacks",
        type: Type.CritDmg,
        value: 30,
      }),
    ],
  },
  "Elysia: Pristine": {
    T: [
      new Multiplier({
        active: true,
        name: "Pristine T",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Pristine T: Weapon skills increase Ice DMG",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Pristine T: Ranged Ice DMG increase in Herrscher Form",
        type: Type.EleDealt,
        value: 35,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Pristine M: increase Ice DMG",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Pristine M: while in Herrscher Form weapon skill hits increase ranged Ice DMG",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Pristine B: increase Ice DMG",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Pristine B: ranged ATKs deal bonus Total DMG",
        type: Type.CritDmg,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Pristine 2 set: total DMG increase while in Herrscher Form",
        type: Type.TdmDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Pristine 2 set: after 8 hits, ranged Ice DMG increases",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Pristine 3 set: Ranged Ice DMG increases",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Pristine 3 set: Ranged Total DMG increases",
        type: Type.TdmDealt,
        value: 35,
      }),
    ],
  },
  Ekaterina: {
    M: [
      new Multiplier({
        active: true,
        name: "Ekaterina M: When over 40 combo, gain physical DMG.",
        type: Type.PhysDealt,
        value: 41,
      }),
    ],
  },
  "Fu Hua: Pride": {
    B: [
      new Multiplier({
        active: true,
        name: "Fu Hua Pride B: Gain melee physical DMG.",
        type: Type.PhysDealt,
        value: 30,
      }),
    ],
  },
  Fuxi: {
    T: [
      new Multiplier({
        active: true,
        name: "Fuxi T: Attacks against frozen enemies.",
        type: Type.EleDealt,
        value: 92,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Fuxi M: Attacks against paralyzed enemies.",
        type: Type.EleDealt,
        value: 92,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Fuxi B: Attacks against ignited enemies.",
        type: Type.EleDealt,
        value: 51,
      }),
    ],
  },
  Goemon: {
    T: [
      new Multiplier({
        active: true,
        name: "Goemon T: Melee attacks give 7% lightning DMG. 12% under Kenbu mode (2-set). Max 3 stacks.",
        type: Type.EleDealt,
        value: 36,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Goemon M",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Goemon M: After using ult, gain 15% lightning DMG for 6s. 25% under Kenbu mode (2-set).",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Goemon B: Lightning boost.",
        type: Type.EleDealt,
        value: 35,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Goemon 2 set: Enter Kenbu mode when combo ATK hits.",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
  },
  Handel: {
    T: [
      new Multiplier({
        active: true,
        name: "Handel T: Boost lightning DMG",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Handel T: Landing QTE increases lightning DMG for fielded valks",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Handel M",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Handel M: Landing weapon active increases lightning DMG",
        type: Type.EleDealt,
        value: 40,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Handel B: Boost lightning DMG",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Handel B: Landing combo/charged ATKs increase total DMG",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Handel 2 set: Lightning DMG",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Handel 3 set: Teammates on field gain total DMG",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: false,
        name: "Handel 3 set: Upon spending 60 SP in one go, enemies take bonus lightning DMG",
        type: Type.EleTaken,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Handel 3 set: Upon spending 120 SP in one go, enemies take bonus lightning DMG",
        type: Type.EleTaken,
        value: 35,
      }),
    ],
  },
  Himeko: {
    T: [
      new Multiplier({
        active: true,
        name: "Himeko T",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Himeko T: Boost fire DMG in Herrscher form",
        type: Type.EleDealt,
        value: 50,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Himeko M: Enemies take bonus Fire DMG from host when host loses HP",
        type: Type.EleTakenHost,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Himeko B",
        type: Type.TdmDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Himeko B: Every 10% of HP lost, boost fire DMG per stack (4 max)",
        type: Type.EleDealt,
        value: 40,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Himeko 2 set: B-piece stacks give another 15% fire DMG",
        type: Type.EleDealt,
        value: 60,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Himeko 3 set",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Himeko 3 set: On HP loss, boost total DMG",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
  },
  "Irene Adler": {
    T: [
      new Multiplier({
        active: true,
        name: "Adler T: Lightning damage boost.",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Adler M: Lightning damage boost.",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Adler B",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Adler B: charge attack and ult make enemies take more elemental DMG.",
        type: Type.EleTaken,
        value: 15,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Adler 2 set",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Adler 2 set: team gain elemental DMG against enemies hit by charge attack and ult.",
        type: Type.EleDealt,
        value: 18,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Adler 3 set: charge attack and ult boost team lightning DMG.",
        type: Type.EleDealt,
        value: 10,
      }),
      new Multiplier({
        active: false,
        name: "Adler 3 set: Boost if equipped on Rita.",
        type: Type.TdmDealt,
        value: 25,
      }),
    ],
  },
  Jingwei: {
    T: [
      new Multiplier({
        active: true,
        name: "Jingwei T: Gain TDM when only 1 enemy.",
        type: Type.TdmDealt,
        value: 31,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Jingwei M: After a charged or combo attack hits, gain fire DMG for 5 seconds.",
        type: Type.EleDealt,
        value: 40,
      }),
    ],
  },
  Kafka: {
    T: [
      new Multiplier({
        active: true,
        name: "Kafka T: Gain TDM for each critical hit. 2.5% per stack. Max 8 stacks",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Kafka T: Gain Crit DMG for each critical hit. 2.5% per stack. Max 8 stacks",
        type: Type.CritDmg,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Kafka M: Gain physical DMG for each critical hit. 5% per stack. Max 8 stacks.",
        type: Type.PhysDealt,
        value: 40,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Kafka B: Gain crit rate for each critical hit. 2.5% per stack. Max 8 stacks.",
        type: Type.CritRate,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Kafka 2 set: When charged attack used, gain TDM.",
        type: Type.TdmDealt,
        value: 45,
      }),
    ],
  },
  "Kiana Kaslana": {
    T: [
      new Multiplier({
        active: true,
        name: "Kiana T: Increase Fire DMG",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Kiana T: Casting weapon active boosts Total DMG",
        type: Type.TdmDealt,
        value: 16,
      }),
      new Multiplier({
        active: true,
        name: "Kiana T: Casting weapon active boosts Total DMG in Herrscher Form",
        type: Type.TdmDealt,
        value: 16,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Kiana M: After QTE or weapon active hits, all enemies take more Fire DMG from character (independent)",
        type: Type.EleTakenHost,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Kiana M: After Joint Burst entry, all enemies take more Fire DMG from character (independent)",
        type: Type.EleTakenHost,
        value: 3,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Kiana B: In Herrscher Form, weapon active and Combo ATK deal more Fire DMG",
        type: Type.EleDealt,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "Kiana B: In Absolute Time Fracture, deal more Fire DMG",
        type: Type.EleDealt,
        value: 50,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Kiana 2 set: Combo ATK deals more Total DMG temporarily upon consuming Trace of Moon and Dust of Time",
        type: Type.TdmDealt,
        value: 45,
      }),
      new Multiplier({
        active: true,
        name: "Kiana 2 set: Character deals more Total DMG temporarily upon consuming Trace of Moon and Dust of Time",
        type: Type.TdmDealt,
        value: 45,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Kiana 3 set: In Herrscher Form, weapon active and Ultimate deals more Fire DMG",
        type: Type.EleDealt,
        value: 55,
      }),
      new Multiplier({
        active: true,
        name: "Kiana 3 set: After casting weapon active all enemies take more Total DMG from the character",
        type: Type.TdmTakenHost,
        value: 18,
      }),
      new Multiplier({
        active: true,
        name: "Kiana 3 set: Deal more Total DMG during Absolute Time Fracture",
        type: Type.TdmDealt,
        value: 40,
      }),
    ],
  },
  Leeuwenhoek: {
    T: [
      new Multiplier({
        active: true,
        name: "Leeuwenhoek T: Fire boost.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Leeuwenhoek T: Gain TDM for every 10% HP lost. 4% per stack. Max 4 stacks. Gain max stacks on activating 2 set or when use lance skill.",
        type: Type.TdmDealt,
        value: 16,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Leeuwenhoek M",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Leeuwenhoek M: Gain fire DMG after ultimate evasion.",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Leeuwenhoek B: Fire boost.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Leeuwenhoek B: Gain TDM for 10s on entry or attacking ignited enemy.",
        type: Type.TdmDealt,
        value: 25,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Leeuwenhoek 2 set",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Leeuwenhoek 2 set: Enemies take more fire DMG from host for 10s after using ult. (activate all single stig conditional effects)",
        type: Type.EleTakenHost,
        value: 15,
      }),
    ],
  },
  "Li Sushang": {
    T: [
      new Multiplier({
        active: true,
        name: "Li Sushang T",
        type: Type.TdmDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Li Sushang T: when dealing dmg with Combo ATK increase team Ice DMG",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Li Sushang M: increase ice DMG dealt by Basic and Combo ATKs",
        type: Type.EleDealt,
        value: 50,
      }),
    ],
    B: [
      new Multiplier({
        active: false,
        name: "Li Sushang B: in Reinforcement state Ice DMG dealt by team increase (120 SP)",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Li Sushang B: in Reinforcement state Ice DMG dealt by team increase (150 SP)",
        type: Type.EleDealt,
        value: 55,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Li Sushang 2 set: Menacing Sword Ki stacks increases ice DMG taken (10 stacks max)",
        type: Type.EleTaken,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Li Sushang 2 set: when equipped by JK, increase max Menacing Sword Ki by 12",
        type: Type.EleTaken,
        value: 12,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Li Sushang 3 set: increase max Menacing Sword Ki to 15",
        type: Type.EleTaken,
        value: 5,
      }),
      new Multiplier({
        active: true,
        name: "Li Sushang 3 set: increase team shield DMG",
        type: Type.ShieldDmgDealt,
        value: 50,
      }),
    ],
  },
  Lier: {
    B: [
      new Multiplier({
        active: true,
        name: "Lier B: At 100% HP, gain physical DMG.",
        type: Type.PhysDealt,
        value: 46,
      }),
    ],
  },
  Linnaeus: {
    T: [
      new Multiplier({
        active: true,
        name: "Linnaeus T: host and her summons deal bonus total DMG",
        type: Type.TdmDealt,
        value: 24,
      }),
      new Multiplier({
        active: true,
        name: "Linnaeus T: host and her summons deal bonus total DMG after combo ATK",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Linnaeus M: host and her summons deal bonus lightning DMG",
        type: Type.EleDealt,
        value: 45,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Linnaeus B: basic/combo/charged ATKs deal bonus lightning DMG",
        type: Type.EleDealt,
        value: 36,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Linnaeus 2 set: host and summon gains lightning DMG boost when summoning an entity",
        type: Type.EleDealt,
        value: 60,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Linnaeus 3 set: ranged atks deal bonus total DMG",
        type: Type.TdmDealt,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "Linnaeus 3 set: host, summons, ELFs, and support valks deal bonus total DMG for each entity present (5 max) [3 stacks]",
        type: Type.TdmDealt,
        value: 18,
      }),
      new Multiplier({
        active: false,
        name: "Linnaeus 3 set: host, summons, ELFs, and support valks deal bonus total DMG for each entity present (5 max) [2 stacks]",
        type: Type.TdmDealt,
        value: 12,
      }),
    ],
  },
  "Marco Polo": {
    T: [
      new Multiplier({
        active: true,
        name: "Polo T",
        type: Type.PhysDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Polo T: When above 30 combo.",
        type: Type.PhysDealt,
        value: 15,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Polo M",
        type: Type.CritDmg,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Polo M: When above 30 combo.",
        type: Type.CritDmg,
        value: 25,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Polo B",
        type: Type.CritRate,
        value: 11,
      }),
    ],
  },
  Michelangelo: {
    T: [
      new Multiplier({
        active: true,
        name: "Mich T: Gain 7.2% physical DMG per basic attack. Max 5 stacks.",
        type: Type.PhysDealt,
        value: 36,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Mich M: Gain 3% crit rate per basic attack. Max 5 stacks.",
        type: Type.CritRate,
        value: 15,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Mich B: Gain 14% crit DMG per basic attack. Max 5 stacks.",
        type: Type.CritDmg,
        value: 70,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Mich 2 set: TDM boost.",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Mich 2 set: TDM boost for 15s upon switching in.",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
  },
  Monet: {
    T: [
      new Multiplier({
        active: true,
        name: "Monet T: Lightning boost.",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Monet T: 1% total DMG per combo count. Max 15 stacks.",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Monet M: 2% lightning DMG per combo count. Max 15 stacks.",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Monet 2 set: Gain shield that gives lightning boost when active.",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
  },
  Newton: {
    B: [
      new Multiplier({
        active: true,
        name: "Newton B: When hitting enemy, they take more TDM for 5 seconds.",
        type: Type.TdmTaken,
        value: 31,
      }),
    ],
  },
  Paganini: {
    T: [
      new Multiplier({
        active: true,
        name: "Paganini T",
        type: Type.CritRate,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Paganini T: Every 5s, next charged ATK deals bonus phys DMG.",
        type: Type.PhysDealt,
        value: 40,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Paganini M: Dealing DMG boosts team phys DMG",
        type: Type.PhysDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Paganini M: Dealing DMG boosts team shield DMG.",
        type: Type.ShieldDmgDealt,
        value: 50,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Paganini B: Charged ATK or Ultimate boosts team total DMG",
        type: Type.TdmDealt,
        value: 18,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Paganini 2 set: Bonus shield DMG",
        type: Type.ShieldDmgDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Paganini 2 set: Charged ATK makes enemies take bonus phys DMG",
        type: Type.PhysTaken,
        value: 20,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Paganini 3 set: Charged ATK boosts total DMG by 18% of host's bonus shield DMG",
        type: Type.TdmDealt,
        value: 19.8, // 70% shield dmg from set 40% from Kissy Pillow
      }),
    ],
  },
  Peary: {
    T: [
      new Multiplier({
        active: true,
        name: "Peary T",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Peary T: When combo is above 20, gain ice DMG.",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Peary M: Gain 0.4% TDM for each combo count. Max 60 stacks.",
        type: Type.TdmDealt,
        value: 24,
      }),
      new Multiplier({
        active: true,
        name: "Peary M: Gain 0.5% ice DMG for each combo count. Max 60 stacks.",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Peary 3 set",
        type: Type.TdmDealt,
        value: 25,
      }),
    ],
  },
  Planck: {
    M: [
      new Multiplier({
        active: true,
        name: "Planck M: Physical boost for basic attacks.",
        type: Type.PhysDealt,
        value: 51,
      }),
    ],
  },
  Poe: {
    T: [
      new Multiplier({
        active: true,
        name: "Poe T: Crit rate boost. For every enemy past the first, decreases by 2%. Max 5 stacks.",
        type: Type.CritRate,
        value: 18,
      }),
      new Multiplier({
        active: false,
        name: "Poe T: physical DMG boost. For every enemy past the first, increases by 4%. Max 5 stacks.",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Poe M: Spend 3/33/63 SP to increase Crit DMG of basic attacks by 50/60/70%",
        type: Type.CritDmg,
        value: 70,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Poe 2 set",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Poe 2 set: TDM increased by 40% for 1s when doing charged ATK. 2s CD.",
        type: Type.TdmDealt,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "Poe 2 set: Extra charge attack TDM boost when equipped on Seele.",
        type: Type.TdmDealt,
        value: 40,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Poe 3 set: Seele equip bonus",
        type: Type.TdmDealt,
        value: 25,
      }),
    ],
  },
  "Pool Party Mei (PPM)": {
    M: [
      new Multiplier({
        active: true,
        name: "Mei M",
        type: Type.TdmDealt,
        value: 18,
      }),
      new Multiplier({
        active: true,
        name: "Mei M: When hitting enemy, they take more TDM for 4 seconds.",
        type: Type.TdmTaken,
        value: 15,
      }),
    ],
  },
  Ragna: {
    T: [
      new Multiplier({
        active: true,
        name: "Ragna T",
        type: Type.TdmDealt,
        value: 25,
      }),
      new Multiplier({
        active: false,
        name: "Ragna T: Combo and Charged ATK boosts fire DMG.",
        type: Type.EleDealt,
        value: 40,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Ragna M: Landing Charged ATK 10 times makes all enemies take bonus fire DMG from host (independent effect).",
        type: Type.EleTakenHost,
        value: 20,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Ragna B",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Ragna B: On hit, Charged ATK boosts fire DMG.",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Ragna 2 set: On charged ATK boost fire DMG.",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Ragna 2 set: Rita equip bonus",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Ragna 3 set: Charged ATK deals bonus fire DMG.",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Ragna 2 set: Rita equip bonus: Charged ATK deals bonus fire DMG",
        type: Type.EleDealt,
        value: 50,
      }),
    ],
  },
  "Raiden Mei": {
    T: [
      new Multiplier({
        active: true,
        name: "Raiden Mei T",
        type: Type.TdmDealt,
        value: 16,
      }),
      new Multiplier({
        active: false,
        name: "Raiden Mei T: Increase Lightning DMG from Basic/Combo/Charged ATKs",
        type: Type.EleDealt,
        value: 50,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Raiden Mei M: In Herrscher Form, after Combo ATK hits, deal more Lightning DMG",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Raiden Mei B",
        type: Type.TdmDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Raiden Mei B: Triggering Time-Frozen Domain makes all enemies take more Total DMG (3 stacks)",
        type: Type.TdmTaken,
        value: 24,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Raiden Mei 2 set: In Herrscher form, Basic/Combo/Charged ATKs deal more Lightning DMG",
        type: Type.EleDealt,
        value: 35,
      }),
      new Multiplier({
        active: true,
        name: "Raiden Mei 2 set: Triggering Time-Frozen Domain makes all enemies take more Elemental DMG (independent) (3 stacks)",
        type: Type.EleTakenHost,
        value: 25.9712,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Raiden Mei 3 set: All enemies take more Lightning DMG from character's Basic/Combo/Charged ATKs (independent)",
        type: Type.EleTakenHost,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Raiden Mei 3 set: After any team member casts Joint Bursting in Herrscher Form, all enemies take more Total DMG.",
        type: Type.TdmTaken,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Raiden Mei 3 set: Enemies in Listen Well state take more Total DMG after being hit by Combo ATK 5 times",
        type: Type.TdmTaken,
        value: 21,
      }),
    ],
  },
  Rasputin: {
    T: [
      new Multiplier({
        active: true,
        name: "Rasputin T",
        type: Type.TdmDealt,
        value: 12,
      }),
      new Multiplier({
        active: false,
        name: "Rasputin T: Attacks against frozen or move slowed enemies gain TDM.",
        type: Type.TdmDealt,
        value: 12,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Rasputin M: Gain 20/35% ice DMG when above 10/30 combo respectively.",
        type: Type.EleDealt,
        value: 35,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Rasputin B: Ice DMG boost.",
        type: Type.EleDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Rasputin B: Gain ice DMG for 10s after entry.",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
  },
  "Rebel Blades": {
    "Kiana T": [
      new Multiplier({
        active: true,
        name: "Kiana T: Lightning DMG boost.",
        type: Type.EleDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Kiana T: Gain 5% lightning DMG boost per hit. Max 5 stacks.",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    "Mei M": [
      new Multiplier({
        active: true,
        name: "Mei M: Lightning DMG boost.",
        type: Type.EleDealt,
        value: 10,
      }),
    ],
    "Bronya B": [
      new Multiplier({
        active: true,
        name: "Bronya B: Lightning DMG boost.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: false,
        name: "Bronya B: Lightning DMG boost for 10s after ultimate evasion.",
        type: Type.EleDealt,
        value: 10,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Rebel Blades 2 set: TDM boost when combo is above 25.",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
  },
  "Rebel Blades (Physical)": {
    "Mei T": [
      new Multiplier({
        active: true,
        name: "Mei T",
        type: Type.PhysDealt,
        value: 13,
      }),
      new Multiplier({
        active: true,
        name: "Mei T: Gain 4% phys DMG per hit. Max 5 stacks.",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    "Fu Hua M": [
      new Multiplier({
        active: true,
        name: "Fu Hua M",
        type: Type.CritDmg,
        value: 15,
      }),
    ],
    "Fu Hua B": [
      new Multiplier({
        active: true,
        name: "Fu Hua B",
        type: Type.CritRate,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Fu Hua B: when combo hits reach 30",
        type: Type.CritDmg,
        value: 25,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Rebel Blades 2 set: TDM boost when combo is above 25.",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
  },
  "Ryunosuke Akutagawa": {
    T: [
      new Multiplier({
        active: true,
        name: "Ryunosuke T: Melee physical boost.",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Ryunosuke M: 5.0 CRT per combo hit. Max 5 stacks.",
        type: Type.Crt,
        value: 25,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Ryunosuke 2 set: Host receives shield. While shield unbroken, gain Crit DMG.",
        type: Type.CritDmg,
        value: 40,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Ryunosuke 3 set: Melee attacks.",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
  },
  Scott: {
    T: [
      new Multiplier({
        active: true,
        name: "Scott T: Ice DMG boost.",
        type: Type.EleDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Scott T: Gain 0.5% TDM for each combo hit. Max 20 stacks.",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Scott M: Ice DMG boost.",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Scott M: Charge or combo attacks gain ice DMG.",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Scott 2 set",
        type: Type.TdmDealt,
        value: 12,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Scott 3 set: Gain ice DMG for 6s after using combo or charge attack.",
        type: Type.EleDealt,
        value: 18,
      }),
    ],
  },
  Schrodinger: {
    T: [
      new Multiplier({
        active: true,
        name: "Schro T: High roll.",
        type: Type.TdmDealt,
        value: 205,
      }),
      new Multiplier({
        active: false,
        name: "Schro T: Low roll.",
        type: Type.TdmDealt,
        value: 52,
      }),
    ],
  },
  Shakespeare: {
    T: [
      new Multiplier({
        active: true,
        name: "Shakespeare T: Lightning boost.",
        type: Type.EleDealt,
        value: 51,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Shakespeare M: Fire boost.",
        type: Type.EleDealt,
        value: 51,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Shakespeare B: Ice boost.",
        type: Type.EleDealt,
        value: 51,
      }),
    ],
  },
  "Shakespeare: Adrift": {
    T: [
      new Multiplier({
        active: true,
        name: "ShakesA T: Fire boost.",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "ShakesA M",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "ShakesA M: Raising Alignment boosts Ultimate fire dmg (max 4)",
        type: Type.EleDealt,
        value: 32,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "ShakesA B: Fire boost.",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "ShakesA 2 set: Fire boost.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "ShakesA 2 set: Raising Alignment to 4 makes enemies take bonus fire DMG from host",
        type: Type.EleTakenHost,
        value: 20,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "ShakesA 3 set: Boost Ultimate total DMG.",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "ShakesA 3 set: Durandal bonus: boost Ultimate total DMG.",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
  },
  "Shattered Swords": {
    T: [
      new Multiplier({
        active: true,
        name: "Shattered Swords T",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Shattered Swords T: ultimate evasion boosts physical DMG for 15s",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Shattered Swords M",
        type: Type.PhysDealt,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Shattered Swords B: Combo atk boosts team Crit DMG for 15s",
        type: Type.CritDmg,
        value: 25,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Shattered Swords 2 set: in herrscher form, team gains crit DMG",
        type: Type.CritDmg,
        value: 30,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Shattered Swords 3 set: team gains crit rate on entry",
        type: Type.CritRate,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Shattered Swords 3 set: in herrscher form, team gains total DMG",
        type: Type.TdmDealt,
        value: 35,
      }),
    ],
  },
  "Shuijing (Sima)": {
    T: [
      new Multiplier({
        active: true,
        name: "Shuijing T",
        type: Type.PhysDealt,
        value: 8,
      }),
      new Multiplier({
        active: true,
        name: "Shuijing T: When QTE hits a target, gains physical boost.",
        type: Type.PhysDealt,
        value: 8,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Shuijing M",
        type: Type.PhysDealt,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Shuijing B: When QTE hits a target, target takes more physical DMG.",
        type: Type.PhysTaken,
        value: 18,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Shuijing 2 set",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Shuijing 3 set: When using ult, team gains total DMG boost.",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: false,
        name: "Shuijing 3 set: When using ult, Zhuge gains crit DMG boost.",
        type: Type.CritDmg,
        value: 40,
      }),
    ],
  },
  "Sirin Ascendant": {
    T: [
      new Multiplier({
        active: true,
        name: "Sirin Asc T",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Sirin Asc T: Herrscher form.",
        type: Type.PhysDealt,
        value: 30,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Sirin Asc M",
        type: Type.CritDmg,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Sirin Asc B: Shield Active.",
        type: Type.PhysDealt,
        value: 15,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Sirin Asc 2 set: For each summoned space core, gain 12% TDM. Max 2 stacks.",
        type: Type.TdmDealt,
        value: 36,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Sirin Asc 3 set",
        type: Type.CritDmg,
        value: 50,
      }),
      new Multiplier({
        active: true,
        name: "Sirin Asc 3 set: Herrscher form.",
        type: Type.CritRate,
        value: 15,
      }),
    ],
  },
  Tesla: {
    T: [
      new Multiplier({
        active: true,
        name: "Tesla T: Attacks against paralyzed enemies.",
        type: Type.TdmDealt,
        value: 51,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Tesla M: Attacks against frozen enemies.",
        type: Type.TdmDealt,
        value: 51,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Tesla B: Attacks against stunned enemies.",
        type: Type.TdmDealt,
        value: 51,
      }),
    ],
  },
  Thales: {
    T: [
      new Multiplier({
        active: true,
        name: "Thales T",
        type: Type.TdmDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Thales T: Gain 1.5% fire DMG per combo count. Max 10 stacks.",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Thales M",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Thales M: Hits on enemies cause them to take more fire DMG from the host. 2% per hit (each stack is separate multiplier). Max 10 stacks.",
        type: Type.EleTakenHost,
        value: 22,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Thales 2 set: Once every 10 seconds, next charged ATK gains TDM and enter Blazer Mode for 10s.",
        type: Type.TdmDealt,
        value: 50,
      }),
      new Multiplier({
        active: false,
        name: "Thales 2 set: During Blazer Mode, ult attacks gain TDM.",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
  },
  Verne: {
    T: [
      new Multiplier({
        active: true,
        name: "Verne T: ice DMG",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Verne T: charged attacks deal bonus total DMG",
        type: Type.TdmDealt,
        value: 40,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Verne M",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Verne M: charged attacks deal bonus ice DMG",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Verne B: basic & charged attacks deal bonus ice DMG",
        type: Type.EleDealt,
        value: 50,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: false,
        name: "Verne 2 set: ultimate evasion in burst mode boosts total DMG",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Verne 2 set: charged attacks in burst mode boost ice DMG by 15%. 4 stacks max.",
        type: Type.EleDealt,
        value: 60,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Verne 3 set: enemies take 20% bonus ice DMG when equipped by Seele",
        type: Type.EleTaken,
        value: 20,
      }),
    ],
  },
  "Welt Yang": {
    T: [
      new Multiplier({
        active: true,
        name: "Welt T",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Welt T: Herrscher form (ult and charged attacks).",
        type: Type.EleDealt,
        value: 50,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Welt M: Ice boost",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Welt M: Hits on enemies cause them to take more ice DMG from the host. 1% per stack. Max 10 stacks.",
        type: Type.EleTakenHost,
        value: 10,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Welt B",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Welt 2 set: Charged attacks for 5 seconds following the first hit.",
        type: Type.TdmDealt,
        value: 60,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Welt 3 set: Ice boost",
        type: Type.EleDealt,
        value: 40,
      }),
    ],
  },
  Willows: {
    T: [
      new Multiplier({
        active: true,
        name: "Willows T: increase Ice DMG",
        type: Type.EleDealt,
        value: 60,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Willows M",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Willows M: increase Ice DMG when weapon skill hits",
        type: Type.EleDealt,
        value: 35,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Willows B: when host is on field, enemies take more Ice DMG",
        type: Type.EleTaken,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Willows B: hitting enemies with Charged ATKs increases Ice DMG taken",
        type: Type.EleTaken,
        value: 15,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Willows 2 set: spend 1 Looming Shadow stack to increase Ice DMG",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: false,
        name: "Willows 3 set: enemies take more Ice DMG from the host",
        type: Type.EleTakenHost,
        value: 5,
      }),
      new Multiplier({
        active: true,
        name: "Willows 3 set: spending over 100 SP at once increases effect to 15%",
        type: Type.EleTakenHost,
        value: 15,
      }),
    ],
  },
  Zeno: {
    T: [
      new Multiplier({
        active: true,
        name: "Zeno T: increase lightning DMG",
        type: Type.EleDealt,
        value: 45,
      }),
      new Multiplier({
        active: true,
        name: "Zeno T: when dealing lightning DMG w/ Combo ATK increase total DMG",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Zeno M: increase lightning DMG",
        type: Type.EleDealt,
        value: 35,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Zeno B: ranged ATKs total DMG boost",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Zeno B: combo ATKs lightning DMG boost",
        type: Type.EleDealt,
        value: 40,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Zeno 2 set",
        type: Type.TdmDealt,
        value: 35,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Zeno 3 set: Triggering ultimate evasion skill increases lightning DMG against butterfly marked enemies",
        type: Type.EleDealt,
        value: 60,
      }),
    ],
  },
  Zhangheng: {
    B: [
      new Multiplier({
        active: true,
        name: "Zhang B: gain lightning DMG for 2s after an ultimate evade when combo count is below 20.",
        type: Type.EleDealt,
        value: 120,
      }),
    ],
  },
  Zhenyi: {
    T: [
      new Multiplier({
        active: true,
        name: "Zhenyi T: lightning DMG",
        type: Type.EleDealt,
        value: 45,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Zhenyi M",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: false,
        name: "Zhenyi M: On exit, ends [Mitternachts] status to grant team lightning DMG for 18s",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Zhenyi B",
        type: Type.EleDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Zhenyi B: target hit by weapon active takes more lightning DMG",
        type: Type.EleTaken,
        value: 20,
      }),
    ],
    "2 set": [
      new Multiplier({
        active: true,
        name: "Zhenyi 2 set",
        type: Type.TdmDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Zhenyi 2 set: for 12s upon switch in, gain lightning DMG",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "3 set": [
      new Multiplier({
        active: true,
        name: "Zhenyi 3 set: weapon active and ult gain lightning DMG",
        type: Type.EleDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Zhenyi 3 set: when equipped by Fischl, using QTE during [Mitternachts] grants team total DMG for 20s.",
        type: Type.TdmDealt,
        value: 45,
      }),
    ],
  },
  Zorro: {
    T: [
      new Multiplier({
        active: true,
        name: "Zorro T",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    M: [
      new Multiplier({
        active: true,
        name: "Zorro M",
        type: Type.CritDmg,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "Zorro M: After ultimate evasion, gain crit rate for 5s.",
        type: Type.CritRate,
        value: 15,
      }),
    ],
    B: [
      new Multiplier({
        active: true,
        name: "Zorro B",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Zorro B: After ultimate evasion, gain physical DMG for 5s.",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
  },
});

export { DPS_STIG_MULTIPLIERS, SUPPORT_STIG_MULTIPLIERS };
