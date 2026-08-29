<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Bilibili search generator</h1>
        <!--
          Hidden, but kept to credit the Chinese translation sources.

        <p>
          Some of the Chinese translations courtsey of
          <a href="https://youtu.be/0RR5VR99fvk">The Keebster</a>
          and their excellent
          <a
            href="https://docs.google.com/document/d/1PPZJ4s91tmEBh0Q6J26wbnFapCMioxShS0JhXPtZ4ec/edit"
          >
            Chinese Memorial Glossary
          </a>
          .
        </p>
        -->


        <div class="d-flex align-center">
          <img class="valk-gif mr-2" :src="aijGif" />
          <span>Ai-chan says, "Only fill out as much as you need!"</span>
        </div>

        <v-form>
          <h3 class="section-head">Boss</h3>
          <v-autocomplete
            v-model="selectedBoss"
            v-model:search="bossInput"
            hint='For mobs, use "Mobs"'
            autofocus
            multiple
            auto-select-first
            clearable
            persistent-hint
            @update:model-value="bossInput = ''"
            :items="bosses"
          ></v-autocomplete>
          <v-checkbox
            v-model="sssBoss"
            hide-details
            @update:model-value="$event && (filterByDate = false)"
            label="Memorial Arena - SSS Boss? (Tip: Some SSS MA videos might only show up when this is checked, so try both!)"
          ></v-checkbox>
          <v-checkbox
            v-model="filterByDate"
            hide-details
            @update:model-value="$event && (sssBoss = false)"
            label="Abyss - Filter results by date range of matching CN Abyss cycle from 4 weeks ago"
          ></v-checkbox>

          <h3 class="section-head">Valkyries</h3>
          <v-autocomplete
            v-model="selectedValks"
            v-model:search="valkInput"
            hint="Order matters! Choose the lead valk first. Some acronyms return a lot of results; add prefix * to filter for only acronyms (for example: *RS)."
            multiple
            auto-select-first
            clearable
            persistent-hint
            @update:model-value="valkInput = ''"
            :items="valks"
          ></v-autocomplete>

          <v-checkbox
            v-model="allS0Plus1"
            hide-details
            class="mt-2"
            label="Use All S0+1 search term instead of individual valkyrie ranks & refines (this will override individual valkyrie settings)"
          ></v-checkbox>

          <div v-for="(row, i) in valkRows" :key="row.valk" class="d-flex align-center flex-wrap mt-2">
            <span class="valk-label mr-3">{{ ordinals[i] }} Valkyrie</span>
            <template v-if="row.ranks.length">
              <v-btn-toggle
                v-model="valkRanks[row.valk]"
                class="rank-toggle"
                density="comfortable"
                variant="outlined"
              >
                <v-btn v-for="rank in row.ranks" :key="rank" :value="rank">{{ rank }}</v-btn>
              </v-btn-toggle>
              <template v-if="row.refines.length">
                <span class="mx-3">|</span>
                <v-btn-toggle
                  v-model="valkRefines[row.valk]"
                  class="rank-toggle"
                  density="comfortable"
                  variant="outlined"
                >
                  <v-btn v-for="refine in row.refines" :key="refine" :value="refine">
                    {{ refine }}
                  </v-btn>
                </v-btn-toggle>
              </template>
            </template>
            <v-btn v-else disabled variant="outlined" density="comfortable" class="rank-na">N/A</v-btn>
          </div>

          <h3 class="section-head">ELF / Astral Op</h3>
          <v-autocomplete
            v-model="selectedCompanion"
            v-model:search="companionInput"
            multiple
            auto-select-first
            clearable
            hide-details
            @update:model-value="companionInput = ''"
            :items="companions"
          ></v-autocomplete>
          <div v-if="companionRanks.length" class="d-flex align-center flex-wrap mt-2">
            <v-btn-toggle
              v-model="companionRank"
              class="rank-toggle"
              density="comfortable"
              variant="outlined"
            >
              <v-btn v-for="rank in companionRanks" :key="rank" :value="rank">{{ rank }}</v-btn>
            </v-btn-toggle>
          </div>

          <h3 class="section-head">Weather</h3>
          <v-autocomplete
            v-model="selectedWeather"
            v-model:search="weatherInput"
            multiple
            auto-select-first
            clearable
            hide-details
            @update:model-value="weatherInput = ''"
            :items="weathers"
          ></v-autocomplete>

          <h3 class="section-head">Extra Modifiers</h3>
          <template v-for="group in modifierGroups" :key="group.category">
            <div class="modifier-category">{{ group.category }}</div>
            <div class="modifier-grid">
              <v-checkbox
                v-for="modifier in group.items"
                :key="modifier.name"
                v-model="modifier.value"
                hide-details
                density="compact"
                :label="modifier.name"
                @update:model-value="onModifierToggle(group, modifier, $event)"
              ></v-checkbox>
            </div>
          </template>

          <h3 class="section-head">Score</h3>
          <v-btn-toggle
            v-model="scoreMode"
            mandatory
            class="rank-toggle mb-2"
            density="comfortable"
            variant="outlined"
          >
            <v-btn v-for="mode in scoreModes" :key="mode" :value="mode">{{ mode }}</v-btn>
          </v-btn-toggle>
          <v-combobox
            v-model="score"
            hint="Select a Memorial Arena score, or type in your own Abyss score"
            auto-select-first
            clearable
            persistent-hint
            @keydown="onScoreKeydown"
            :items="scores"
          ></v-combobox>
        </v-form>

        <h2 class="section-head">Generated links</h2>
        <div class="d-flex align-center">
          <img class="valk-gif mr-2" :src="brnGif" />
          <span>Bronya works hard to instantly generate links as you type.</span>
        </div>
        <p>Some bosses/valks go by multiple names, so try all links!</p>
        <ul class="link-list">
          <li v-for="link in biliLinks" :key="link" class="mb-3">
            <a target="_blank" :href="link">{{ displayLink(link) }}</a>
          </li>
        </ul>

        <Changelog></Changelog>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.section-head {
  margin-top: 1.8em;
}

.v-autocomplete {
  padding-top: 0px;
}

.link-list {
  padding-left: 1.5rem;
  font-size: 1.5em;
}

.valk-gif {
  height: 80px;
}

.changelog {
  padding-left: 1.5rem;
}

// Highlighted dropdown item text (mouse hover or keyboard), so it stands out.
.v-overlay .v-list-item:hover .v-list-item-title,
.v-overlay .v-list-item--focus-visible .v-list-item-title,
.v-overlay .v-list-item:focus-visible .v-list-item-title {
  color: #90caf9;
}

// Highlighted (arrow-key navigated) selection in the input box.
.v-autocomplete__selection--selected .v-autocomplete__selection-text {
  color: #90caf9;
}

// Rank / refine toggle buttons: small gap, each fully rounded, blue when active.
.rank-toggle {
  gap: 6px;
  // v-btn-group hides overflow, which clips the outer buttons' side borders.
  overflow: visible;
}

.rank-toggle .v-btn,
.v-btn.rank-na {
  border-radius: 4px !important;
  // v-btn-group strips interior side borders for a seamless look; restore all
  // four sides (width + style) since the gap keeps the buttons separate.
  border-width: 2px !important;
  border-style: solid !important;
}

// The stripped side borders also reset to currentColor; match the top/bottom by
// inheriting the group's (theme) border colour on all four sides.
.rank-toggle .v-btn {
  border-color: inherit !important;
}

.rank-toggle .v-btn--active {
  color: #90caf9;
}

// Keeps the "Nth Valkyrie" labels aligned so the button rows line up.
.valk-label {
  min-width: 96px;
}

// Category-grouped modifier checkboxes, packed tightly.
.modifier-category {
  margin-top: 0.75rem;
  font-weight: 600;
}

.modifier-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  column-gap: 0.75rem;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { generateScores } from "@/util/score_util";
import { abyssWeekRange } from "@/util/dates";
import { bossToChinese } from "@/data/bossTranslations";
import { weatherToChinese } from "@/data/weatherTranslations";
import {
  buildBiliLinks,
  companionOptions,
  companionRanksFor,
  valkOptions,
  valkRanksFor,
  valkRefinesFor,
  isTeamValk,
  modifierCategories,
} from "@/util/searchLinks";
import Changelog from "@/components/Changelog.vue";
import aijGif from "@/assets/aij2.gif";
import brnGif from "@/assets/brn.gif";

const modifierGroups = modifierCategories.map((cat) => ({
  category: cat.category,
  type: cat.type,
  items: cat.names.map((name) => ({ name, value: false })),
}));

// Score dropdown values per mode. SSS combines the SSS and SSS +20% thresholds
// into one "sss / sssUp" entry that expands to two search terms when used.
const sssUpScores = generateScores("SSS +20%");
const scoresByMode: Record<string, (number | string)[]> = {
  SS: generateScores("SS"),
  SSS: generateScores("SSS").map((s, i) => `${s} / ${sssUpScores[i]}`),
};

export default defineComponent({
  components: { Changelog },
  data: function () {
    return {
      selectedBoss: [] as string[],
      bossInput: null,
      sssBoss: false,
      filterByDate: false,
      selectedValks: [] as string[],
      valkInput: null,
      valkRanks: {} as Record<string, string | null>,
      valkRefines: {} as Record<string, string | null>,
      allS0Plus1: false,
      selectedCompanion: [] as string[],
      companionInput: null,
      companionRank: null as string | null,
      selectedWeather: [] as string[],
      weatherInput: null,
      score: null,
      scoreMode: "SS",
      scoreModes: Object.keys(scoresByMode),
      bosses: Object.keys(bossToChinese).sort((a, b) => a.localeCompare(b)),
      valks: [...valkOptions].sort((a, b) => a.localeCompare(b)),
      companions: [...companionOptions].sort((a, b) => a.localeCompare(b)),
      weathers: Object.keys(weatherToChinese).sort((a, b) => a.localeCompare(b)),
      modifierGroups: modifierGroups,
      aijGif,
      brnGif,
      ordinals: ["1st", "2nd", "3rd"],
    };
  },
  computed: {
    biliLinks(): string[] {
      return buildBiliLinks({
        selectedWeather: this.selectedWeather[0] ?? null,
        selectedBoss: this.selectedBoss[0] ?? null,
        sssBoss: this.sssBoss,
        selectedValks: this.selectedValks,
        valkRanks: this.valkRanks,
        valkRefines: this.valkRefines,
        allS0Plus1: this.allS0Plus1,
        selectedCompanion: this.selectedCompanion[0] ?? null,
        companionRank: this.companionRank ?? null,
        score: this.score,
        activeModifiers: this.modifierGroups
          .flatMap((g) => g.items)
          .filter((m) => m.value)
          .map((m) => m.name),
        dateRange: this.filterByDate ? abyssWeekRange() : null,
      });
    },
    // Rank button labels for the currently selected companion's group.
    companionRanks(): string[] {
      return companionRanksFor(this.selectedCompanion[0] ?? null);
    },
    // One entry per selected valk (in order), with its available rank/refine labels.
    valkRows(): { valk: string; ranks: string[]; refines: string[] }[] {
      return this.selectedValks.map((valk) => ({
        valk,
        ranks: valkRanksFor(valk),
        refines: valkRefinesFor(valk),
      }));
    },
    // Score dropdown values for the currently selected mode (SS / SSS / SSS +20%).
    scores(): (number | string)[] {
      return scoresByMode[this.scoreMode] ?? [];
    },
  },
  watch: {
    // Limit boss selection to a maximum of 1.
    selectedBoss(bosses: string[]) {
      if (bosses.length > 1) {
        this.selectedBoss = bosses.slice(0, 1);
      }
    },
    // Enforce valk selection rules: a "team" is exclusive (it fills all 3 slots),
    // otherwise up to 3 valks. Also prune rank/refine state for dropped valks.
    selectedValks(valks: string[], oldValks: string[]) {
      const hasTeam = valks.some((v) => isTeamValk(v));
      if (hasTeam && valks.length > 1) {
        // A team must be selected on its own; reject whatever was just added.
        this.selectedValks = oldValks;
        return;
      }
      if (!hasTeam && valks.length > 3) {
        this.selectedValks = valks.slice(0, 3);
        return;
      }
      for (const name of Object.keys(this.valkRanks)) {
        if (!valks.includes(name)) delete this.valkRanks[name];
      }
      for (const name of Object.keys(this.valkRefines)) {
        if (!valks.includes(name)) delete this.valkRefines[name];
      }
    },
    // Limit companion selection to a maximum of 1, and drop a rank that no
    // longer applies to the newly selected companion's group.
    selectedCompanion(companions: string[]) {
      if (companions.length > 1) {
        this.selectedCompanion = companions.slice(0, 1);
      }
      const ranks = companionRanksFor(companions[0] ?? null);
      if (this.companionRank && !ranks.includes(this.companionRank)) {
        this.companionRank = null;
      }
    },
    // Limit weather selection to a maximum of 1.
    selectedWeather(weathers: string[]) {
      if (weathers.length > 1) {
        this.selectedWeather = weathers.slice(0, 1);
      }
    },
    // Switching score mode clears the previously picked score.
    scoreMode() {
      this.score = null;
    },
  },
  methods: {
    // Single-choice categories are exclusive: selecting one clears the others.
    onModifierToggle(
      group: { type: string; items: { name: string; value: boolean }[] },
      modifier: { name: string; value: boolean },
      value: boolean | null
    ) {
      if (group.type === "single-choice" && value) {
        group.items.forEach((m) => {
          if (m !== modifier) m.value = false;
        });
      }
    },
    // Restrict the score field to numeric typing; selecting list items still works.
    onScoreKeydown(e: KeyboardEvent) {
      // Allow control/navigation keys and shortcuts (Backspace, arrows, Ctrl+A, etc.).
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }
      // Single printable character: permit digits only.
      if (!/\d/.test(e.key)) {
        e.preventDefault();
      }
    },
    // Human-readable label for a generated link: only the search terms, no URL or params.
    displayLink(link: string): string {
      const afterKeyword = link.split("keyword=")[1] ?? link;
      // The three date params are always appended together starting with pubtime_begin_s,
      // so cutting there drops them all. Matching the full name (not a bare "&") means a
      // search term containing "&" won't truncate the label.
      const terms = afterKeyword.split("&pubtime_begin_s=")[0];
      return terms.replaceAll("+", " ").replaceAll("%2B", "+");
    },
  },
});
</script>
