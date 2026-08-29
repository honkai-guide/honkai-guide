enum Type {
  TdmDealt = "Total DMG dealt",
  TdmTaken = "Total DMG taken",
  TdmTakenHost = "Total DMG taken (from host)",
  EleDealt = "Elemental DMG dealt",
  EleTaken = "Elemental DMG taken",
  EleTakenHost = "Elemental DMG taken (from host)",
  PhysDealt = "Physical DMG dealt",
  PhysTaken = "Physical DMG taken",
  PhysTakenHost = "Physical DMG taken (from host)",
  CritRate = "Critical rate %",
  Crt = "CRT",
  CritDmg = "Critical DMG",

  // Percentage is calculated, but not factored into overall damage calculations.
  ShieldDmgDealt = "Shield damage dealt",
}

interface MultiplierInterface {
  name: string;
  type: Type;
  value: number;
  active: boolean;
}

class Multiplier {
  id: number;
  name: string;
  type: Type;
  value: number;
  active: boolean;

  constructor({
    id,
    name,
    type,
    value,
    active,
  }: {
    active?: boolean;
    id?: number;
    name?: string;
    type?: Type;
    value?: number;
  }) {
    this.id = id || Math.random();
    if (name) {
      this.name = name;
    }
    if (type) {
      this.type = type;
    }
    if (value) {
      this.value = value;
    }
    this.active = active;
  }

  static fromObject(object: MultiplierInterface): Multiplier {
    return new Multiplier({
      name: object.name,
      type: object.type,
      value: object.value,
      active: object.active,
    });
  }

  static empty(): Multiplier {
    return new Multiplier({});
  }

  /**
   * Converts this multiplier to a decimal percentage value if it matches the desired type, else returns 0.
   *
   * If the multiplier is not active, also returns 0.
   */
  toPercent(type: Type): number {
    if (this.type != type || !this.active) {
      return 0;
    }

    return this.value / 100;
  }

  /**
   * Converts this multiplier to an integer value if it matches the desired type, else returns 0.
   *
   * If the multiplier is not active, also returns 0.
   */
  toIntegerValue(type: Type): number {
    if (this.type != type || !this.active) {
      return 0;
    }

    return this.value;
  }

  /**
   * Clones this multiplier into a new object.
   *
   * @param {boolean} [id] if true, will also clone the id of this multiplier
   * @returns {Multiplier}
   * @memberof Multiplier
   */
  clone(id?: boolean): Multiplier {
    return new Multiplier({
      id: id ? this.id : null,
      name: this.name,
      type: this.type,
      value: this.value,
      active: this.active,
    });
  }
}

export { Type, Multiplier };
