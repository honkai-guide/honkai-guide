class Weather {
  name: string;
  effect: string;
  icon: string;

  constructor({ name, effect, icon }: { name: string; effect: string; icon: string }) {
    this.name = name;
    this.effect = effect;
    this.icon = icon;
  }
}

// QT
const EXALTED_WEATHER = Object.freeze({
  Lightning: new Weather({
    name: "Lightning",
    effect: "Enemies takes 50% bonus Lightning DMG and 50% less Physical DMG.",
    icon: "lightning.png",
  }),
  Physical: new Weather({
    name: "Physical",
    effect: "Enemies takes 50% bonus Physical DMG and 50% less Lightning DMG.",
    icon: "physical.png",
  }),
  Ice: new Weather({
    name: "Frost",
    effect: "Enemies takes 50% bonus Ice DMG and 50% less Fire DMG.",
    icon: "ice.png",
  }),
  Fire: new Weather({
    name: "Fire",
    effect: "Enemies takes 50% bonus Fire DMG and 50% less Ice DMG.",
    icon: "fire.png",
  }),
  Ignite: new Weather({
    name: "Ignite",
    effect: "Enemies take 40% bonus damage when ignited and within 4s after the Ignite ends",
    icon: "endless_burn.png",
  }),
  TypeCounter: new Weather({
    name: "Counter",
    effect: "Type countering effects are 20% stronger.",
    icon: "type_counter.png",
  }),
  Quantum: new Weather({
    name: "Quantum",
    effect: "Enemies are mostly QUA type.",
    icon: "quantum.png",
  }),
  Imaginary: new Weather({
    name: "Imaginary",
    effect: "Increase damage done by IMG valkyries by 20%.",
    icon: "quantum.png",
  }),
  Bloodlust: new Weather({
    name: "Bloodlust",
    effect: "Gain 20% TDM for 15s after killing an enemy, stacks up to 8 times.",
    icon: "bloodlust.png",
  }),
  Ranged: new Weather({
    name: "Ranged",
    effect: "Enemies take 50% more ranged damage and 50% less melee damage.",
    icon: "ignite.png",
  }),
  ShieldBreak: new Weather({
    name: "Fortified",
    effect: "Enemies are shielded but they take 40% bonus DMG when their shields are broken.",
    icon: "idk.png",
  }),
});

export { Weather, EXALTED_WEATHER };
