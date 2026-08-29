<template>
  <v-container class="pa-0">
    <h3 class="mt-4">Affixes values:</h3>

    <v-row dense>
      <v-col md="3">
        <v-text-field
          clearable
          type="number"
          label="Affix line 1"
          v-model.number="affix1"
          :suffix="affix1Type === AffixType.CritDmg ? '%' : ''"
        ></v-text-field>
      </v-col>

      <v-col md="4">
        <v-select label="Affix type" v-model="affix1Type" :items="affixTypes" required></v-select>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col md="3">
        <v-text-field
          clearable
          type="number"
          label="Affix line 2"
          v-model.number="affix2"
          :suffix="affix2Type === AffixType.CritDmg ? '%' : ''"
        ></v-text-field>
      </v-col>

      <v-col md="4">
        <v-select label="Affix type" v-model="affix2Type" :items="affixTypes" required></v-select>
      </v-col>
    </v-row>

    <h3 class="mt-4">Results:</h3>
    <div v-for="f in FinalStats" v-bind:key="f">
      <span class="font-weight-bold">{{ f }}:&nbsp;</span>
      <span>{{ calculationResults[f] | toPercent }}</span>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { toPercent } from "@/util/filters";

enum AffixType {
  Attack = "ATK",
  CritDmg = "Critical DMG %",
}

enum FinalStats {
  TotalBoost = "Total boost",
  AtkBoost = "Boost from attack",
  CritDmgBoost = "Boost from critical DMG",
}

export default Vue.extend({
  name: "affix-calc",
  props: {
    valkAtk: Number,
    critDmg: Number,
    critRate: Number,
  },
  data: function () {
    return {
      // Constants.
      FinalStats: FinalStats,
      AffixType: AffixType,
      affixTypes: Object.values(AffixType),

      // Affix variables.
      affix1: 23,
      affix1Type: AffixType.Attack,
      affix2: 5.5,
      affix2Type: AffixType.CritDmg,
    };
  },
  computed: {
    calculationResults: function () {
      const affix1Atk = this.affix1Type === AffixType.Attack ? this.affix1 : 0;
      const affix2Atk = this.affix2Type === AffixType.Attack ? this.affix2 : 0;
      const overallAffixAtk = affix1Atk + affix2Atk;

      const affix1CritDmg = this.affix1Type === AffixType.CritDmg ? this.affix1 : 0;
      const affix2CritDmg = this.affix2Type === AffixType.CritDmg ? this.affix2 : 0;
      const overallAffixCritDmg = affix1CritDmg + affix2CritDmg;

      const results = {};
      results[FinalStats.AtkBoost] = overallAffixAtk / this.valkAtk;
      const critRateDecimal = this.critRate / 100;
      const nonCritRate = 1 - critRateDecimal;
      const boostCrits = 100 * nonCritRate + (this.critDmg + overallAffixCritDmg) * critRateDecimal;
      const boostNonCrits = 100 * nonCritRate + this.critDmg * critRateDecimal;
      results[FinalStats.CritDmgBoost] = boostCrits / boostNonCrits - 1;
      results[FinalStats.TotalBoost] =
        (1 + results[FinalStats.AtkBoost]) * (1 + results[FinalStats.CritDmgBoost]) - 1;

      return results;
    },
  },
  filters: {
    toPercent: toPercent,
  },
});
</script>
