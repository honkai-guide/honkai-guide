<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="10" lg="8">
        <h2 class="mb-4">Convert between scores and time:</h2>
        <v-row justify="center">
          <v-col>
            <v-autocomplete
              v-model="selectedTime"
              @change="computeByTime"
              label="Time"
              auto-select-first
              :items="times"
            ></v-autocomplete>
          </v-col>

          <v-col>
            <v-autocomplete
              v-model="selectedSsScore"
              @change="computeBySsScore"
              label="SS Score"
              autofocus
              auto-select-first
              :items="ssScore"
            ></v-autocomplete>
          </v-col>

          <v-col>
            <v-autocomplete
              v-model="selectedBase"
              @change="computeByBase"
              label="SSS Score"
              auto-select-first
              :items="base"
            ></v-autocomplete>
          </v-col>

          <v-col>
            <v-autocomplete
              v-model="selectedUp"
              @change="computeByUp"
              label="SSS 20% Bonus"
              auto-select-first
              :items="up"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col sm="10" lg="8">
        <h2 class="mb-4">All scores and times:</h2>
        <!-- Purposefully don't change on mobile as this ruins the density of the table! -->
        <v-data-table
          :headers="tableHeaders"
          :items="scoresByTime"
          :items-per-page="50"
          :footer-props="tableFooterProps"
          :mobile-breakpoint="null"
          item-key="score"
          dense
        >
          <template v-slot:item.elapsedSec="{ item }">
            {{ item.elapsedSec | countdownSeconds }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { generateScores, countdownSecondsFilter } from "@/util/score_util";

const tableHeaders = [
  {
    text: "Time",
    value: "elapsedSec",
    width: "25%",
  },
  {
    text: "SS Score",
    value: "ssScore",
    width: "25%",
  },
  {
    text: "SSS Score",
    value: "base",
    width: "25%",
  },
  {
    text: "SSS 20% Bonus",
    value: "up",
    width: "25%",
  },
];

const scoresByTime = generateScores(300);

function elapsedSecToAutocompleteItem(elapsedSec: number) {
  return {
    text: countdownSecondsFilter(elapsedSec.toString()),
    value: elapsedSec,
  };
}

export default Vue.extend({
  data: function () {
    return {
      scoresByTime: scoresByTime,

      // Converter stuff
      ssScore: scoresByTime.map((s) => s.ssScore),
      base: scoresByTime.map((s) => s.base),
      up: scoresByTime.map((s) => s.up),
      times: scoresByTime.map((s) => elapsedSecToAutocompleteItem(s.elapsedSec)),
      selectedSsScore: null,
      selectedBase: null,
      selectedUp: null,
      selectedTime: null,

      // Table stuff
      tableHeaders: tableHeaders,
      tableFooterProps: {
        "items-per-page-options": [10, 20, 30, 40, 50, 75, 100],
      },
    };
  },
  methods: {
    computeBySsScore: function () {
      const computedScore = scoresByTime.find((s) => s.ssScore == this.selectedSsScore);
      this.fillSelectionsWithComputedScore(computedScore);
    },
    computeByBase: function () {
      const computedScore = scoresByTime.find((s) => s.base == this.selectedBase);
      this.fillSelectionsWithComputedScore(computedScore);
    },
    computeByUp: function () {
      const computedScore = scoresByTime.find((s) => s.up == this.selectedUp);
      this.fillSelectionsWithComputedScore(computedScore);
    },
    computeByTime: function () {
      const computedScore = scoresByTime.find((s) => s.elapsedSec == this.selectedTime);
      this.fillSelectionsWithComputedScore(computedScore);
    },
    fillSelectionsWithComputedScore: function (computedScore) {
      this.selectedSsScore = computedScore.ssScore;
      this.selectedBase = computedScore.base;
      this.selectedUp = computedScore.up;
      this.selectedTime = elapsedSecToAutocompleteItem(computedScore.elapsedSec);
    },
  },
  filters: {
    countdownSeconds: countdownSecondsFilter,
  },
});
</script>
