<template>
  <v-container>
    <v-row>
      <v-col sm="12">
        <h1>Affix calculator</h1>

        <p>
          A real plain and simple calculator to compare attack vs critical damage affixes. Of course
          if your valk is elemental, no need for crit damage affix...
        </p>

        <p>
          For reference, the max value of a general ATK affix is 19 or 23 for a specific
          type/weapon. The max value of a critical damage affix is 5.6%.
        </p>

        <h3 class="mt-6">Valk info:</h3>

        <p>
          Enter the total attack and critical damage percent of the valk, including from
          skills/gear. Remember that you start at 200% critical damage percent.
        </p>

        <v-row dense>
          <v-col md="1">
            <v-text-field
              type="number"
              label="Valkyrie attack"
              v-model.number="valkAtk"
              :rules="valueRules"
            ></v-text-field>

            <v-text-field
              type="number"
              label="Total crit damage"
              suffix="%"
              v-model.number="critDmg"
              :rules="valueRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col md="3">
            <v-slider
              v-model="critRate"
              class="align-center"
              label="Crit rate"
              :max="100"
              :min="0"
              :step="1"
              :thumb-size="24"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="critRate"
                  single-line
                  suffix="%"
                  class="mt-0 pt-0"
                  style="width: 80px"
                  type="number"
                  :max="1.0"
                  :min="0.0"
                  :rules="critRateRules"
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>
        </v-row>

        <v-row class="d-flex">
          <v-col>
            <AffixCalc :valkAtk="valkAtk" :critDmg="critDmg" :critRate="critRate"></AffixCalc>
          </v-col>

          <v-col class="hidden-sm-and-down">
            <AffixCalc :valkAtk="valkAtk" :critDmg="critDmg" :critRate="critRate"></AffixCalc>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import AffixCalc from "@/components/AffixCalc.vue";

export default Vue.extend({
  components: { AffixCalc },
  data: function () {
    return {
      valkAtk: 1200,
      critDmg: 200,
      critRate: 100,

      valueRules: [(v: number) => (!!v && v >= 0) || "Invalid value"],
      critRateRules: [(v: number) => (v <= 100 && v >= 0) || "Invalid crit rate"],
    };
  },
});
</script>
