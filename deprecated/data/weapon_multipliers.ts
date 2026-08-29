import { Type, Multiplier } from "@/models/multiplier";

const SUPPORT_WEAPON_MULTIPLIERS = Object.freeze({
  Pistols: {
    "Judgment of Shamash": [
      new Multiplier({
        active: true,
        name: "Shamash: Active: Enemies hit take more total DMG.",
        type: Type.TdmTaken,
        value: 15,
      }),
    ],
    "Echo of Paradise": [
      new Multiplier({
        active: true,
        name: "EoP: Active: boost team lightning DMG",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "EoP: Passive: boost team total DMG",
        type: Type.TdmDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "EoP: Upon casting ultimate, fielded valks deal bonus total DMG",
        type: Type.TdmDealt,
        value: 12,
      }),
    ],
    "Echo of Paradise: Time Ruins (EoPRI)": [
      new Multiplier({
        active: true,
        name: "EoPRI: Active: boost team lightning DMG",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "EoPRI: Passive: boost team total DMG",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "EoPRI: Upon casting ultimate, all team members deal bonus total DMG",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
    "Positron Blasters": [
      new Multiplier({
        active: true,
        name: "Positron: Active: Enemies hit take more physical DMG (15.3% at lvl 50).",
        type: Type.PhysTaken,
        value: 20,
      }),
    ],
    "Thunder Kikaku": [
      new Multiplier({
        active: true,
        name: "Kikaku: Passive: Enemies hit during burst mode take more lightning DMG.",
        type: Type.EleTaken,
        value: 60,
      }),
    ],
  },
  Cannons: {
    "Crusher Bunny 19C": [
      new Multiplier({
        active: true,
        name: "Crusher Bunny: Active: team ice DMG boost for 15 sec.",
        type: Type.EleDealt,
        value: 27,
      }),
      new Multiplier({
        active: true,
        name: "Crusher Bunny: Passive: team elemental DMG boost.",
        type: Type.EleDealt,
        value: 12,
      }),
    ],
    "Key of Ascension (KoA)": [
      new Multiplier({
        active: false,
        name: "KoA: Passive: increase Fire DMG received by all enemies for each Fire DMG dealer on the team (5% each)",
        type: Type.EleTaken,
        value: 10,
      }),
    ],
    "Domain of Ascension (DoA)": [
      new Multiplier({
        active: false,
        name: "DoA: Passive: increase Fire DMG received by all enemies for each Fire DMG dealer on the team (7% each)",
        type: Type.EleTaken,
        value: 14,
      }),
      new Multiplier({
        active: false,
        name: "DoA: Passive: increase team members Elemental DMG (unique)",
        type: Type.EleDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "DoA: Passive: increase team members Elemental DMG (unique); after ultimate, this bonus increases",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    "Star Shatterer - Vikrant": [
      new Multiplier({
        active: true,
        name: "Vikrant: Passive: Team TDM boost against weakened enemies",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
  },
  Chakram: {
    "Purana Phantasma": [
      new Multiplier({
        active: true,
        name: "Purana Phantasma: Active: team ice DMG boost for 10 sec.",
        type: Type.EleDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Purana Phantasma: Passive: team total DMG boost.",
        type: Type.TdmDealt,
        value: 8,
      }),
    ],
    "Purana Phantasma: Nighteye": [
      new Multiplier({
        active: true,
        name: "Purana Phantasma PRI: Active: team ice DMG boost for 10 sec.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Purana Phantasma PRI: Passive: team total DMG boost.",
        type: Type.TdmDealt,
        value: 12,
      }),
    ],
    "Rudder in Dream": [
      new Multiplier({
        active: true,
        name: "Rudder: Passive: team total DMG boost.",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
    "Rudder in Dream Λ-I": [
      new Multiplier({
        active: true,
        name: "Rudder PRI: Passive: team total DMG boost.",
        type: Type.TdmDealt,
        value: 12,
      }),
      new Multiplier({
        active: false,
        name: "Rudder PRI: Passive: enemies hit by pulse receive more fire DMG",
        type: Type.EleTaken,
        value: 8,
      }),
      new Multiplier({
        active: true,
        name: "Rudder PRI: Passive: enemies hit by pulse receive more fire DMG (ignited)",
        type: Type.EleTaken,
        value: 15,
      }),
    ],
    "Twirling Gaze": [
      new Multiplier({
        active: true,
        name: "Twirling Gaze: Active: Valkyrie Quicksand: In Rhythm state, all enemies take more Bleed DMG",
        type: Type.PhysTaken,
        value: 8,
      }),
    ],
    "Twirling Gaze: Lustrous Bloom": [
      new Multiplier({
        active: true,
        name: "Twirling Gaze PRI: Active: Valkyrie Quicksand: In Rhythm state, all enemies take more Bleed DMG",
        type: Type.PhysTaken,
        value: 10,
      }),
    ],
  },
  Katanas: {
    "MAG-Typhoon": [
      new Multiplier({
        active: true,
        name: "Typhoon: Active: Enemies hit take more lightning DMG (13.2% at level 50).",
        type: Type.EleTaken,
        value: 25,
      }),
    ],
    "Ruinous Sakura": [
      new Multiplier({
        active: true,
        name: "Ruinous: Active: Enemies hit take more fire DMG (28.6% at level 50).",
        type: Type.EleTaken,
        value: 42,
      }),
    ],
  },
  Greatswords: {
    "Blood Dance (BD)": [
      new Multiplier({
        active: true,
        name: "Blood Dance: Active",
        type: Type.EleTaken,
        value: 60,
      }),
    ],
  },
  Crosses: {
    "11th Sacred Relic": [
      new Multiplier({
        active: true,
        name: "11th: Active: Teammates in the range of cross gain crit rate.",
        type: Type.CritRate,
        value: 10,
      }),
    ],
    "11th Leitourgia": [
      new Multiplier({
        active: true,
        name: "11th PRI: Active: Teammates in the range of cross gain crit rate.",
        type: Type.CritRate,
        value: 20,
      }),
    ],
    "Elysian Astra": [
      new Multiplier({
        active: true,
        name: "Elysian Astra: Passive: increase team physical DMG",
        type: Type.PhysDealt,
        value: 15,
      }),
    ],
    "Elysian Astra: Heart's Color": [
      new Multiplier({
        active: true,
        name: "Elysian Astra PRI: Passive: increase team physical DMG",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Elysian Astra PRI: Passive: within 22s of weapon active, unshielded enemies take bonus physical DMG",
        type: Type.PhysTaken,
        value: 8,
      }),
    ],
    "Super-☆ Sonata": [
      new Multiplier({
        active: true,
        name: "Sonata: Active: Teammates in the range of cross gain elemental DMG.",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    "Zither's Lament": [
      new Multiplier({
        active: true,
        name: "Zither: Passive: Team's ultimate and burst gain physical DMG.",
        type: Type.PhysDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Zither: Active: Valks in range gain 15% physical DMG.",
        type: Type.PhysDealt,
        value: 15,
      }),
    ],
  },
  Gauntlets: {
    "Miracle Kissy Pillow": [
      new Multiplier({
        active: true,
        name: "Pillow: Passive: Ultimate boosts team phys DMG for 15s",
        type: Type.PhysDealt,
        value: 35,
      }),
    ],
    "Nebulous Duality": [
      new Multiplier({
        active: true,
        name: "Duality: Passive: Fu Hua bonus: hitting enemy with last hit of combo boosts team TDM by 4% once switched out. Max 3 stacks.",
        type: Type.TdmDealt,
        value: 12,
      }),
    ],
    "Nocturnal Stealth": [
      new Multiplier({
        active: true,
        name: "Nocturnal: Passive: after using weapon active, team deals more Ice DMG",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    "Nocturnal Stealth: Beam": [
      new Multiplier({
        active: true,
        name: "Nocturnal PRI: Passive: after using weapon active, team deals more Ice DMG",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Nocturnal PRI: Passive: increase team total DMG dealt",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
  },
  Scythes: {
    "Iris of the Dreams": [
      new Multiplier({
        active: true,
        name: "Iris: Passive: Team deals 15% more TDM to enemies marked by FR charge.",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
  },
  // Lances
  Bows: {
    "Obscuring Whisper": [
      new Multiplier({
        active: true,
        name: "Obscuring Whisper: Active: 3 attacks deal bonus fire DMG.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Obscuring Whisper: Passive: Team deals bonus fire DMG.",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
  },
});

const DPS_WEAPON_MULTIPLIERS = Object.freeze({
  Pistols: {
    "Key of Anonymity": [
      new Multiplier({
        active: true,
        name: "KoAn: Passive: Deal more Total DMG to Withered enemies",
        type: Type.TdmDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "KoAn: Passive: HoFi bonus: Combo ATK deals more Fire DMG",
        type: Type.EleDealt,
        value: 18,
      }),
    ],
    "Domain of Genesis (DoG)": [
      new Multiplier({
        active: true,
        name: "DoG: Passive: Deal more Total DMG to Withered enemies",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "DoG: Passive: HoFi bonus: Combo ATK deals more Fire DMG",
        type: Type.EleDealt,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "DoG: Passive: Deal more Fire DMG",
        type: Type.EleDealt,
        value: 45,
      }),
      new Multiplier({
        active: true,
        name: "DoG: Passive: HoFi bonus: During Absolute Time Fracture, withered enemies take more Total DMG",
        type: Type.TdmTaken,
        value: 15,
      }),
    ],
    "Key of Radiance": [
      new Multiplier({
        active: true,
        name: "Key of Radiance: boost fire DMG",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: false,
        name: "Key of Radiance: boost total DMG of combo ATK and ultimate",
        type: Type.TdmDealt,
        value: 25,
      }),
    ],
    "Domain of Incandescence": [
      new Multiplier({
        active: true,
        name: "DoI: boost fire DMG",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: false,
        name: "DoI: boost total DMG of combo ATK and ultimate",
        type: Type.TdmDealt,
        value: 35,
      }),
      new Multiplier({
        active: true,
        name: "DoI: enemies hit by weapon active explosion take bonus fire DMG",
        type: Type.EleTaken,
        value: 15,
      }),
    ],
    "Echo of Paradise": [
      new Multiplier({
        active: true,
        name: "EoP: Active: boost team lightning DMG",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "EoP: Passive: boost team total DMG",
        type: Type.TdmDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "EoP: Upon casting ultimate, fielded valks deal bonus total DMG",
        type: Type.TdmDealt,
        value: 12,
      }),
    ],
    "Echo of Paradise: Time Ruins (EoPRI)": [
      new Multiplier({
        active: true,
        name: "EoPRI: Active: boost team lightning DMG",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "EoPRI: Passive: boost team total DMG",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "EoPRI: Upon casting ultimate, all team members deal bonus total DMG",
        type: Type.TdmDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "EoPRI: Passive: boost lightning DMG",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    "Tranquil Arias": [
      new Multiplier({
        active: true,
        name: "Arias: Passive",
        type: Type.PhysDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Arias: Passive",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Arias: Passive: Within 5s of switching in or ult, gain TDM.",
        type: Type.TdmDealt,
        value: 50,
      }),
    ],
    "Domain of the Void": [
      new Multiplier({
        active: true,
        name: "KoV Pri",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "KoV Pri",
        type: Type.CritDmg,
        value: 20,
      }),
    ],
  },
  Cannons: {
    "Briareus EX": [
      new Multiplier({
        active: false,
        name: "Bri EX: Passive: MECH valks gain TDM.",
        type: Type.TdmDealt,
        value: 16,
      }),
      new Multiplier({
        active: false,
        name: "Bri EX: Passive: BIO valks gain physical DMG.",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    "Dark Star": [
      new Multiplier({
        active: true,
        name: "Dark Star: Passive: Team deals bonus physical DMG to bleeding enemies",
        type: Type.PhysDealt,
        value: 15,
      }),
    ],
    "Falcon Flare 0019": [
      new Multiplier({
        active: true,
        name: "Falcon Flare: Passive",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Falcon Flare: Passive: Ice DMG increases when QTE deals dmg",
        type: Type.EleDealt,
        value: 15,
      }),
    ],
    "Falcon Flare: FINAL": [
      new Multiplier({
        active: true,
        name: "Falcon Flare PRI: Passive",
        type: Type.TdmDealt,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "Falcon Flare PRI: Passive: Ice DMG increases when QTE deals dmg",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Falcon Flare PRI: Passive: Ice DMG increases when Weapon Skills or Ultimate are used",
        type: Type.EleDealt,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "Falcon Flare PRI: Passive: Silverwing: Increase Ice DMG dealt by energy balls passing through scatter barrier",
        type: Type.EleDealt,
        value: 40,
      }),
    ],
    "Key of Ascension (KoA)": [
      new Multiplier({
        active: true,
        name: "KoA: Passive: Ice DMG boost for each Ice DMG dealer on the team (8% each)",
        type: Type.EleDealt,
        value: 24,
      }),
      new Multiplier({
        active: false,
        name: "KoA: Passive: increase Fire DMG received by all enemies for each Fire DMG dealer on the team (5% each)",
        type: Type.EleTaken,
        value: 10,
      }),
    ],
    "Key of Reason (KoR)": [
      new Multiplier({
        active: true,
        name: "KoR: Passive: Ice DMG boost.",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "KoR: Active: After using active, gain TDM.",
        type: Type.TdmDealt,
        value: 35,
      }),
    ],
    "Domain of Ascension (DoA)": [
      new Multiplier({
        active: true,
        name: "DoA: Passive: Ice DMG boost for each Ice DMG dealer on the team (12% each)",
        type: Type.EleDealt,
        value: 36,
      }),
      new Multiplier({
        active: false,
        name: "DoA: Passive: increase Fire DMG received by all enemies for each Fire DMG dealer on the team (7% each)",
        type: Type.EleTaken,
        value: 14,
      }),
      new Multiplier({
        active: false,
        name: "DoA: Passive: increase team members Elemental DMG (unique)",
        type: Type.EleDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "DoA: Passive: increase team members Elemental DMG (unique); after ultimate, this bonus increases",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "DoA: Active: Increase user Ice DMG",
        type: Type.EleDealt,
        value: 30,
      }),
    ],
    "Domain of Revelation (DoR)": [
      new Multiplier({
        active: true,
        name: "DoR: Passive: Ice DMG boost.",
        type: Type.EleDealt,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "DoR: Passive: total DMG boost for charged and ultimate ATKs.",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "DoR: Active: After using active, gain TDM.",
        type: Type.TdmDealt,
        value: 40,
      }),
    ],
    "Star of Eden: Anti-Entropy (SoE)": [
      new Multiplier({
        active: true,
        name: "SoE: Passive: increase total DMG dealt to type-countered enemies",
        type: Type.TdmDealt,
        value: 35,
      }),
      new Multiplier({
        active: true,
        name: "SoE: Active: when casting weapon active outside of Bike mode increase shield DMG",
        type: Type.ShieldDmgDealt,
        value: 200,
      }),
      new Multiplier({
        active: false,
        name: "SoE: Passive: in co-op raids increase ice DMG dealt",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    "Star of Eden: World (SoE)": [
      new Multiplier({
        active: true,
        name: "SoE PRI: Passive: increase total DMG dealt to type-countered enemies",
        type: Type.TdmDealt,
        value: 45,
      }),
      new Multiplier({
        active: true,
        name: "SoE PRI: Passive: increase ice DMG dealt",
        type: Type.EleDealt,
        value: 45,
      }),
      new Multiplier({
        active: true,
        name: "SoE PRI: Passive: increase total DMG dealt by Charge ATKs",
        type: Type.TdmDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "SoE PRI: Passive: HoR bonus: increase ice DMG dealt by Hover Gun to analyzed enemies",
        type: Type.EleDealt,
        value: 50,
      }),
      new Multiplier({
        active: true,
        name: "SoE PRI: Active: when casting weapon active outside of Bike mode increase shield DMG",
        type: Type.ShieldDmgDealt,
        value: 200,
      }),
      new Multiplier({
        active: false,
        name: "SoE PRI: Passive: in co-op raids increase ice DMG dealt",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    "Tower of the Past (ToP)": [
      new Multiplier({
        active: true,
        name: "ToP: Passive",
        type: Type.TdmDealt,
        value: 8,
      }),
      new Multiplier({
        active: true,
        name: "ToP: Passive: deal increased Fire DMG to Locked targets",
        type: Type.EleDealt,
        value: 8,
      }),
    ],
    "Tower of the Past: Silk Ladder (ToP PRI)": [
      new Multiplier({
        active: true,
        name: "ToP PRI: Passive",
        type: Type.TdmDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "ToP PRI: Passive: deal increased Fire DMG to Locked targets",
        type: Type.EleDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "ToP PRI: Passive: Ultimate and burst mode attacks deal bonus Fire DMG to Locked targets",
        type: Type.EleDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "ToP PRI: Passive: in burst mode increase Total DMG to Locked targets",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
  },
  Chakram: {
    "Lost Conviction": [
      new Multiplier({
        active: true,
        name: "Lost Conviction: Active: caster deals more lightning DMG against marked targets",
        type: Type.EleDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Lost Conviction: Active: caster deals more lightning DMG",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    "Lost Conviction: Damnation": [
      new Multiplier({
        active: true,
        name: "Lost Conviction PRI: Active: caster deals more lightning DMG against marked targets",
        type: Type.EleDealt,
        value: 16,
      }),
      new Multiplier({
        active: true,
        name: "Lost Conviction PRI: Active: caster deals more lightning DMG",
        type: Type.EleDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Lost Conviction PRI: Passive: lightning DMG",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Lost Conviction PRI: Passive: Disciplinary Perdition equip: ultimate gains total DMG",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
    "Purana Phantasma": [
      new Multiplier({
        active: true,
        name: "Purana Phantasma: Active: team ice DMG boost for 10 sec.",
        type: Type.EleDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Purana Phantasma: Passive: total DMG boost.",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Purana Phantasma: Passive: team total DMG boost.",
        type: Type.TdmDealt,
        value: 8,
      }),
    ],
    "Purana Phantasma: Nighteye": [
      new Multiplier({
        active: true,
        name: "Purana Phantasma PRI: Active: team ice DMG boost for 10 sec.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Purana Phantasma PRI: Passive: total DMG boost.",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Purana Phantasma PRI: Passive: ice DMG boost with icy crystal present.",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Purana Phantasma PRI: Passive: team total DMG boost.",
        type: Type.TdmDealt,
        value: 12,
      }),
    ],
    "Rudder in Dream": [
      new Multiplier({
        active: true,
        name: "Rudder: Active: weapon enters Overclocked mode boosting user total DMG",
        type: Type.TdmDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Rudder: Passive: team total DMG boost.",
        type: Type.TdmDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Rudder: Passive: Chrono Navi equip: knocking back a chakram in Overclocked mode boosts fire DMG to ignited enemies",
        type: Type.EleDealt,
        value: 12,
      }),
    ],
    "Rudder in Dream Λ-I": [
      new Multiplier({
        active: true,
        name: "Rudder PRI: Active: weapon enters Overclocked mode boosting user total DMG",
        type: Type.TdmDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Rudder PRI: Passive: team total DMG boost.",
        type: Type.TdmDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Rudder PRI: Passive: Chrono Navi equip: knocking back a chakram in Overclocked mode boosts fire DMG to ignited enemies",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Rudder PRI: Passive: increase fire DMG",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: false,
        name: "Rudder PRI: Passive: enemies hit by pulse receive more fire DMG",
        type: Type.EleTaken,
        value: 8,
      }),
      new Multiplier({
        active: true,
        name: "Rudder PRI: Passive: enemies hit by pulse receive more fire DMG (ignited)",
        type: Type.EleTaken,
        value: 15,
      }),
    ],
    "Twirling Gaze": [
      new Multiplier({
        active: true,
        name: "Twirling Gaze: Passive: increase Bleed DMG",
        type: Type.PhysDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Twirling Gaze: Active: Valkyrie Quicksand: In Rhythm state, all enemies take more Bleed DMG",
        type: Type.PhysTaken,
        value: 8,
      }),
      new Multiplier({
        active: true,
        name: "Twirling Gaze: Passive",
        type: Type.TdmDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Twirling Gaze: Passive: Valkyrie Quicksand: Perfect Ultimates increases its Total DMG (5 stacks)",
        type: Type.TdmDealt,
        value: 80,
      }),
    ],
    "Twirling Gaze: Lustrous Bloom": [
      new Multiplier({
        active: true,
        name: "Twirling Gaze PRI: Passive: increase Bleed DMG",
        type: Type.PhysDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Twirling Gaze PRI: Active: Valkyrie Quicksand: In Rhythm state, all enemies take more Bleed DMG",
        type: Type.PhysTaken,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Twirling Gaze PRI: Passive",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Twirling Gaze PRI: Passive: Valkyrie Quicksand: Perfect Ultimates increases its Total DMG (5 stacks)",
        type: Type.TdmDealt,
        value: 100,
      }),
      new Multiplier({
        active: true,
        name: "Twirling Gaze PRI: Passive: increase Total DMG when in Rhythm state",
        type: Type.TdmDealt,
        value: 8,
      }),
      new Multiplier({
        active: true,
        name: "Twirling Gaze PRI: Passive: increase Physical DMG when in Rhythm state",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
  },
  Katanas: {
    "Frozen Naraka": [
      new Multiplier({
        active: true,
        name: "Naraka: Passive: Ice DMG boost.",
        type: Type.EleDealt,
        value: 45,
      }),
      new Multiplier({
        active: true,
        name: "Naraka: Active: Enemies in field generated by active take more ice DMG.",
        type: Type.EleTaken,
        value: 25,
      }),
    ],
    "MAG-Typhoon": [
      new Multiplier({
        active: true,
        name: "Typhoon: Passive: Lightning boost.",
        type: Type.EleDealt,
        value: 50,
      }),
      new Multiplier({
        active: true,
        name: "Typhoon: Active: Enemies hit take more lightning DMG (13.2% at level 50).",
        type: Type.EleTaken,
        value: 25,
      }),
    ],
    "Key of Castigation": [
      new Multiplier({
        active: true,
        name: "KoC: Passive: Lightning boost.",
        type: Type.EleDealt,
        value: 35,
      }),
    ],
    "Domain of Sanction": [
      new Multiplier({
        active: false,
        name: "DoS: Active: dragon laser boost (is passive even though in active description).",
        type: Type.EleDealt,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "DoS: Passive: Using weapon active or HoT ult boosts TDM.",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "DoS: Passive: Lightning boost.",
        type: Type.EleDealt,
        value: 45,
      }),
      new Multiplier({
        active: true,
        name: "DoS: Passive: HoT gains lightning boost when attacking enemies with Narukami's Mark.",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    "Seven Thunders of Retribution: Rumble (7T)": [
      new Multiplier({
        active: true,
        name: "7T: Passive: deal bonus total DMG to enemies of weaker types.",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "7T: Passive: in co-op raids, total elemental DMG increases.",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    "Seven Thunders of Retribution: Narukami (7T PRI)": [
      new Multiplier({
        active: true,
        name: "7T PRI: Passive: deal bonus total DMG to enemies of weaker types.",
        type: Type.TdmDealt,
        value: 45,
      }),
      new Multiplier({
        active: true,
        name: "7T PRI: Passive: in non-burst mode, increase lightning DMG.",
        type: Type.EleDealt,
        value: 35,
      }),
      new Multiplier({
        active: true,
        name: "7T PRI: Passive: in co-op raids, total elemental DMG increases.",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    "Key of Limpidity": [
      new Multiplier({
        active: true,
        name: "KoL: Active: A successful block increases Lightning DMG",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "KoL: Passive: Deal more Lightning DMG",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "KoL: Passive: Triggering Time-Frozen Domain increases Total DMG from Basic/Combo/Charged ATKs (3 stacks)",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
    "Domain of Unity (DoU)": [
      new Multiplier({
        active: true,
        name: "DoU: Active: A successful block increases Lightning DMG",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "DoU: Passive: Deal more Lightning DMG",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "DoU: Passive: Triggering Time-Frozen Domain increases Total DMG from Basic/Combo/Charged ATKs (3 stacks)",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "DoU: Passive: Basic/Combo/Charged ATKs deal more Lightning DMG",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "DoU: HoO bonus: Enemies hit by her Combo ATK take more Elemental DMG",
        type: Type.EleTaken,
        value: 15,
      }),
    ],
  },
  Greatswords: {
    "Godslayer - Surtr": [
      new Multiplier({
        active: true,
        name: "Surtr: Passive",
        type: Type.TdmDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Surtr: Passive: When burst ATKs hit, gain 5% TDM. Max 4 stacks.",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    "Might of An-Utu": [
      new Multiplier({
        active: true,
        name: "An-Utu: Active: Enemies take more fire DMG on hit.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "An-Utu: Passive",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
    "Sleeping Beauty": [
      new Multiplier({
        active: true,
        name: "Sleeping Beauty: Active: Gain crit rate.",
        type: Type.CritRate,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Sleeping Beauty: Active: Gain crit DMG.",
        type: Type.CritDmg,
        value: 50,
      }),
    ],
    "Shuhadaku of Uriel (Utu PRI)": [
      new Multiplier({
        active: true,
        name: "Utu PRI: Passive",
        type: Type.TdmDealt,
        value: 35,
      }),
      new Multiplier({
        active: true,
        name: "Utu PRI: Active: Enemies take more fire DMG on hit.",
        type: Type.EleTaken,
        value: 23,
      }),
    ],
    "Surtr Muspellsverd": [
      new Multiplier({
        active: false,
        name: "Surtr PRI: Active: VK charge and ult gain 30% fire boost.",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Surtr PRI: Passive",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Surtr PRI: Passive: When ult or burst ATKs hit, gain 12% fire DMG. Max 4 stacks.",
        type: Type.EleDealt,
        value: 48,
      }),
    ],
  },
  Crosses: {
    "Basilisk's Image": [
      new Multiplier({
        active: true,
        name: "Basilisk: Passive: Lightning DMG increase",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Basilisk: Passive: Lightning DMG increase against enemies in Serpent Domain",
        type: Type.EleDealt,
        value: 10,
      }),
    ],
    "Basilisk's Image: Deathshroud": [
      new Multiplier({
        active: true,
        name: "Basilisk PRI: Passive: Lightning DMG increase",
        type: Type.EleDealt,
        value: 45,
      }),
      new Multiplier({
        active: true,
        name: "Basilisk PRI: Passive: Lightning DMG increase against enemies in Serpent Domain",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Basilisk PRI: Passive: Ranged ATKs deal bonus total DMG",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
    "Elysian Astra": [
      new Multiplier({
        active: true,
        name: "Elysian Astra: Passive: increase wielder's Combo ATKs and Ultimates total DMG",
        type: Type.TdmDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Elysian Astra: Passive: increase team physical DMG",
        type: Type.PhysDealt,
        value: 15,
      }),
    ],
    "Elysian Astra: Heart's Color": [
      new Multiplier({
        active: true,
        name: "Elysian Astra PRI: Passive: increase wielder's Combo ATKs and Ultimates total DMG",
        type: Type.TdmDealt,
        value: 35,
      }),
      new Multiplier({
        active: true,
        name: "Elysian Astra PRI: Passive: increase team physical DMG",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Elysian Astra PRI: Passive: within 22s of weapon active, unshielded enemies take bonus physical DMG",
        type: Type.PhysTaken,
        value: 8,
      }),
    ],
    "Hekate's Gloom": [
      new Multiplier({
        active: true,
        name: "Hekate: Passive",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Hekate: Passive: Every 10 hits on enemies gives 2.5% physical DMG. Max 10 stacks",
        type: Type.PhysDealt,
        value: 25,
      }),
    ],
  },
  Gauntlets: {
    "Grips of Tai Xuan": [
      new Multiplier({
        active: true,
        name: "Tai Xuan: Passive: When basic, combo, burst, or switch/QTE attacks hit, gain 8% TDM. Each attack type is separate stack.",
        type: Type.TdmDealt,
        value: 32,
      }),
    ],
    "Miracle Kissy Pillow": [
      new Multiplier({
        active: true,
        name: "Pillow: Passive: Ultimate boosts team phys DMG for 15s",
        type: Type.PhysDealt,
        value: 35,
      }),
      new Multiplier({
        active: true,
        name: "Pillow: Passive: Charged ATK and Ultimate deal bonus shield DMG",
        type: Type.ShieldDmgDealt,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "Pillow: Active: Carole: Charged ATK 3 or aerial Charged ATK 2 deals bonus phys DMG",
        type: Type.PhysDealt,
        value: 45,
      }),
    ],
    "Nebulous Duality": [
      new Multiplier({
        active: true,
        name: "Duality: Passive: Fu Hua bonus: hitting enemy with last hit of combo boosts TDM by 6%. Max 3 stacks.",
        type: Type.TdmDealt,
        value: 18,
      }),
    ],
    "Nocturnal Stealth": [
      new Multiplier({
        active: true,
        name: "Nocturnal: Passive: after using weapon active, team deals more Ice DMG",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    "Nocturnal Stealth: Beam": [
      new Multiplier({
        active: true,
        name: "Nocturnal PRI: Passive: after using weapon active, team deals more Ice DMG",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Nocturnal PRI: Passive: increase Ice DMG dealt by combo ATKs",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Nocturnal PRI: Passive: increase team total DMG dealt",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
    "Nuada's Revenge": [
      new Multiplier({
        active: true,
        name: "Nuada PRI: Passive: lightning DMG boost.",
        type: Type.EleDealt,
        value: 40,
      }),
      new Multiplier({
        active: false,
        name: "Nuada PRI: Active: During burst or within 5s of using weapon active or ult, emits shockwave that makes enemies take 3.5% more lightning DMG. Max 7 stacks.",
        type: Type.EleTaken,
        value: 24.5,
      }),
    ],
    "Skoll and Hati": [
      new Multiplier({
        active: true,
        name: "Skoll: Passive: When attacks hit, gain 3% physical DMG. Max 10 stacks.",
        type: Type.PhysDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Skoll: Passive: Attacks against enemies affected by time slow, reduced attack or move speed gain 10% crit rate.",
        type: Type.CritRate,
        value: 10,
      }),
    ],
  },
  Scythes: {
    Aphrodite: [
      new Multiplier({
        active: true,
        name: "Aphrodite: Passive",
        type: Type.PhysDealt,
        value: 20,
      }),
    ],
    "Astral Divide": [
      new Multiplier({
        active: true,
        name: "Astral PRI: Active: Flared enemies take bonus fire DMG.",
        type: Type.EleTaken,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Astral PRI: Passive: Basic, Charged, and Combo ATK deal bonus total DMG to flared enemies.",
        type: Type.TdmDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Astral PRI: Passive: Charged ATK deal bonus total DMG.",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Astral PRI: Passive: Spina Astera equip bonus: Charged ATK or Ultimate boosts fire DMG.",
        type: Type.EleDealt,
        value: 25,
      }),
    ],
    "Astral Rend": [
      new Multiplier({
        active: true,
        name: "Astral: Active: Flared enemies take bonus fire DMG.",
        type: Type.EleTaken,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Astral: Passive: Basic, Charged, and Combo ATK deal bonus total DMG to flared enemies.",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    "Iris of the Dreams": [
      new Multiplier({
        active: true,
        name: "Iris: Passive: Charge attack increases TDM by 15%.",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Iris: Passive: Team deals 15% more TDM to enemies marked by FR charge.",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
    "Path to Acheron": [
      new Multiplier({
        active: true,
        name: "Acheron: Passive",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Acheron: Passive: Gain crit rate when using switch skill or ult.",
        type: Type.CritRate,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Acheron: Passive: Gain crit DMG when using switch skill or ult.",
        type: Type.CritDmg,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Acheron: Passive: Stygian Nymph marks gain 30% TDM boost.",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
    "Path to Acheron: Kindred": [
      new Multiplier({
        active: true,
        name: "Kindred: Mark: Gain crit rate when using switch skill or ult.",
        type: Type.CritRate,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Kindred: Mark: Gain crit DMG when using switch skill or ult.",
        type: Type.CritDmg,
        value: 36,
      }),
      new Multiplier({
        active: true,
        name: "Kindred: Mark: Veliona gains additional crit DMG after switch/ult (70% total)",
        type: Type.CritDmg,
        value: 34,
      }),
      new Multiplier({
        active: true,
        name: "Kindred: Nirvana",
        type: Type.PhysDealt,
        value: 26,
      }),
      new Multiplier({
        active: true,
        name: "Kindred: Nirvana: Stygian Nymph marks gain TDM boost.",
        type: Type.TdmDealt,
        value: 36,
      }),
    ],
    "Sanguine Gaze": [
      new Multiplier({
        active: true,
        name: "Sanguine Gaze: Passive: Ice DMG",
        type: Type.EleDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Sanguine Gaze: Ultimate and Burst mode attacks deal bonus total DMG.",
        type: Type.TdmDealt,
        value: 30,
      }),
    ],
    "Sanguine Gaze: Union": [
      new Multiplier({
        active: true,
        name: "Sanguine Gaze Union: Passive: Ice DMG",
        type: Type.EleDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Sanguine Gaze Union: Ultimate and Burst mode attacks deal bonus total DMG.",
        type: Type.TdmDealt,
        value: 40,
      }),
      new Multiplier({
        active: true,
        name: "Sanguine Gaze Union: charged attacks deal bonus total DMG.",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    "Undine's Tale": [
      new Multiplier({
        active: true,
        name: "Undine: Passive: Backside hits on enemy gives TDM.",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
  },
  Lances: {
    "Abyss Flower": [
      new Multiplier({
        active: true,
        name: "Abyss Flower: Passive",
        type: Type.CritRate,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Abyss Flower: Passive: Physical DMG is increased for 15s during burst.",
        type: Type.PhysDealt,
        value: 35,
      }),
    ],
    "Abyss Flower: Liminal Spiral": [
      new Multiplier({
        active: true,
        name: "Abyss Flower PRI: Passive",
        type: Type.CritRate,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Abyss Flower PRI: Passive: Physical DMG is increased for 15s during burst.",
        type: Type.PhysDealt,
        value: 35,
      }),
      new Multiplier({
        active: true,
        name: "Abyss Flower PRI: Passive: Crit DMG is increased for 15s during burst.",
        type: Type.CritDmg,
        value: 20,
      }),
    ],
    "Hler's Serenity": [
      new Multiplier({
        active: true,
        name: "Hler: Passive: Crit rate boost.",
        type: Type.CritRate,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Hler: Passive: Retaliation grants crit rate for 3s.",
        type: Type.CritRate,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Hler: Passive: Charged ATKs and Throws mark enemies, deal more crit DMG against mark enemies.",
        type: Type.CritDmg,
        value: 20,
      }),
    ],
    "Lance of Longinus": [
      new Multiplier({
        active: false,
        name: 'Asuka Equip Bonus: Passive: Charged ATK, "Mind, Matching, Moment", and Ultimate finisher deal bonus total DMG.',
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: false,
        name: 'Asuka Equip Bonus: Passive: Charged ATK, "Mind, Matching, Moment", and Ultimate finisher gain crit rate.',
        type: Type.CritRate,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Lance of Longinus: Passive",
        type: Type.PhysDealt,
        value: 30,
      }),
    ],
    "Midnight Ataegina": [
      new Multiplier({
        active: true,
        name: "Midnight Ataegina: Passive",
        type: Type.CritRate,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Midnight Ataegina: Passive",
        type: Type.TdmDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Midnight Ataegina: Passive: Weapon skill deals bonus Total DMG",
        type: Type.TdmDealt,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Midnight Ataegina: Passive: Weapon skill deals bonus Physical DMG",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
    "Midnight Eclipse": [
      new Multiplier({
        active: true,
        name: "Midnight Eclipse: Passive",
        type: Type.CritRate,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "Midnight Eclipse: Passive: Weapon skill deals bonus Total DMG",
        type: Type.TdmDealt,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "Midnight Eclipse: Passive: Weapon skill deals bonus Physical DMG",
        type: Type.TdmDealt,
        value: 12,
      }),
    ],
    "Sagittarius Astra": [
      new Multiplier({
        active: true,
        name: "Sagittarius Astra: Passive: Ultimate or Burst Mode attacks deal bonus Fire DMG",
        type: Type.EleDealt,
        value: 35,
      }),
      new Multiplier({
        active: true,
        name: "Sagittarius Astra: Passive: Enemies hit by shattered Stardust take bonus Fire DMG",
        type: Type.EleTaken,
        value: 20,
      }),
    ],
    "Starlance Prime": [
      new Multiplier({
        active: true,
        name: "Starlance: Passive: Ultimate or Burst Mode attacks deal bonus Fire DMG",
        type: Type.EleDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Starlance: Passive: Enemies hit by shattered Stardust take bonus Fire DMG",
        type: Type.EleTaken,
        value: 16,
      }),
    ],
  },
  Bows: {
    "Key of Ego": [
      new Multiplier({
        active: true,
        name: "KoE: Passive: when wielded by HoHE, enemies that trigger Ego Blossom take more Ice DMG",
        type: Type.EleTaken,
        value: 12,
      }),
      new Multiplier({
        active: true,
        name: "KoE: Passive: when using weapon active increase Total DMG",
        type: Type.TdmDealt,
        value: 10,
      }),
      new Multiplier({
        active: true,
        name: "KoE: Passive: when wielded by HoHE, weapon skill total DMG increase",
        type: Type.TdmDealt,
        value: 10,
      }),
    ],
    "Domain of Ego: Flawless Return": [
      new Multiplier({
        active: true,
        name: "DoE: Passive: when wielded by HoHE, enemies that trigger Ego Blossom take more Ice DMG",
        type: Type.EleTaken,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "DoE: Passive: when using weapon active increase Total DMG",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "DoE: Passive: when wielded by HoHE, weapon skill total DMG increase",
        type: Type.TdmDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "DoE: Passive: increase Ice DMG",
        type: Type.EleDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "DoE: Passive: when wielded by HoHE, ult finisher total DMG increases when Origin Form Charged ATK hits enemies",
        type: Type.TdmDealt,
        value: 20,
      }),
    ],
    "Obscuring Whisper": [
      new Multiplier({
        active: true,
        name: "Obscuring Whisper: Active: 3 attacks deal bonus fire DMG.",
        type: Type.EleDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Obscuring Whisper: Passive: Wielder deals bonus total DMG.",
        type: Type.TdmDealt,
        value: 25,
      }),
      new Multiplier({
        active: true,
        name: "Obscuring Whisper: Passive: Team deals bonus fire DMG.",
        type: Type.EleDealt,
        value: 20,
      }),
    ],
    "Whisper of the Past": [
      new Multiplier({
        active: true,
        name: "Whisper of the Past: Passive: Charged ATKs deal bonus phys DMG",
        type: Type.PhysDealt,
        value: 15,
      }),
      new Multiplier({
        active: true,
        name: "Whisper of the Past: Passive: Using weapon active or charged ATKs boost crit DMG",
        type: Type.CritDmg,
        value: 20,
      }),
    ],
    "Whisper of the Past: Sonnet": [
      new Multiplier({
        active: true,
        name: "Whisper of the Past PRI: Passive: Charged ATKs deal bonus phys DMG",
        type: Type.PhysDealt,
        value: 20,
      }),
      new Multiplier({
        active: true,
        name: "Whisper of the Past PRI: Passive: Using weapon active or charged ATKs boost crit DMG",
        type: Type.CritDmg,
        value: 30,
      }),
      new Multiplier({
        active: true,
        name: "Whisper of the Past PRI: Passive: Wielder deals bonus total DMG",
        type: Type.TdmDealt,
        value: 15,
      }),
    ],
  },
});

export { SUPPORT_WEAPON_MULTIPLIERS, DPS_WEAPON_MULTIPLIERS };
