<template>
  <v-container fluid>
    <v-row>
      <!-- Left: the form. Right column holds the live-updating links. -->
      <v-col cols="12" md="7" lg="8">
        <h1>Honkai Impact 3rd - Bilibili search generator</h1>
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
            label="Memorial Arena - SSS Boss (Tip: Some SSS MA videos might only show up when this is checked, so try both!)"
          ></v-checkbox>
          <!-- Hidden on mobile: the date params are a desktop-web-search feature, so
               m.bilibili.com drops them and the mobile app captures the link and runs its
               own search. Offering the checkbox there would just silently do nothing. -->
          <v-checkbox
            v-if="showDateFilter"
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

          <h3 class="section-head">Ranks &amp; Synergies</h3>
          <!-- The two modes are mutually exclusive, but neither is required: checking one
               clears the other, and leaving both unchecked is a valid state. Same inline
               pattern as the SSS Boss / date filter pair above. -->
          <!-- flex-grow-0 on each: a v-checkbox is a v-input, which defaults to
               `flex: 1 1 auto` and would otherwise stretch to split the row in half. -->
          <div class="d-flex align-center flex-wrap ga-6 mt-2">
            <v-checkbox
              v-model="allS0Plus1"
              hide-details
              class="flex-grow-0"
              @update:model-value="$event && (individualRanks = false)"
              label="All S0+1"
            ></v-checkbox>
            <v-checkbox
              v-model="individualRanks"
              hide-details
              class="flex-grow-0"
              @update:model-value="$event && (allS0Plus1 = false)"
              label="Assign ranks and synergies individually"
            ></v-checkbox>
          </div>
          <!-- The per-valk rows belong to the "individually" mode only. The rows are keyed
               off the valkyrie selection above, so prompt for that when it's still empty —
               and only once there is something to assign is the syntax caveat worth showing. -->
          <template v-if="individualRanks">
            <p v-if="!valkRows.length" class="text-medium-emphasis mt-2">
              To assign ranks and synergies, select a valkyrie first!
            </p>
            <p v-else class="text-body-2 text-medium-emphasis mt-1 mb-0">
              Note: Some videos use non-standard syntax (e.g. 6S+9, 7S+8, 9S) and won't match
              these selections
            </p>
            <div
              v-for="(row, i) in valkRows"
              :key="row.valk"
              class="d-flex align-center flex-wrap mt-2"
            >
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
                <template v-if="row.synergies.length">
                  <span class="mx-3">|</span>
                  <v-btn-toggle
                    v-model="valkSynergies[row.valk]"
                    class="rank-toggle"
                    density="comfortable"
                    variant="outlined"
                  >
                    <v-btn v-for="synergy in row.synergies" :key="synergy" :value="synergy">
                      {{ synergy }}
                    </v-btn>
                  </v-btn-toggle>
                </template>
              </template>
              <v-btn v-else disabled variant="outlined" density="comfortable" class="rank-na">
                N/A
              </v-btn>
            </div>
          </template>

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

        <Changelog></Changelog>
      </v-col>

      <!-- Right: sticky results panel so links stay visible while the form is edited. -->
      <v-col cols="12" md="5" lg="4">
        <div class="link-panel">
          <h2 class="link-panel-head">Generated links</h2>
          <div class="d-flex align-center">
            <img class="valk-gif mr-2" :src="brnGif" />
            <span>Bronya works hard to instantly generate links as you type.</span>
          </div>
          <p class="mt-2 mb-2">Some bosses/valks go by multiple names, so try all links!</p>
          <!-- Sits outside .link-scroll so it stays visible while the list scrolls. -->
          <!-- icon="$info" rather than type="info": the type prop applies its own
               (darker) theme colour, which would override the accent below. -->
          <v-alert
            v-if="dateRangeLabel"
            icon="$info"
            variant="tonal"
            density="compact"
            class="date-alert mb-3"
          >
            <strong>CN Abyss date filter ON!</strong>
            <div class="text-body-2">Only videos published {{ dateRangeLabel }} (CN time).</div>
          </v-alert>
          <div class="link-scroll">
            <ul class="link-list">
              <li v-for="link in biliLinks" :key="link" class="mb-3">
                <a target="_blank" :href="link">{{ displayLink(link) }}</a>
              </li>
            </ul>
            <p v-if="!biliLinks.length" class="text-medium-emphasis">
              Make some selections to generate links!
            </p>
          </div>
        </div>
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
  font-size: 1.15em;
  // Keyword strings are long and the panel is narrow; wrap rather than overflow.
  overflow-wrap: anywhere;
}

// Results panel: pinned beside the form (md+) so links stay on screen while
// the user edits. The column stretches to the row's height, which is what
// gives `position: sticky` room to travel.
//
// Sticky offsets are measured from the viewport, not from v-main, so the pinned
// panel has to clear App.vue's fixed 64px v-app-bar â€” with a smaller offset its
// top slides under the bar as soon as the page scrolls. The height cap has to
// subtract the same 64px (plus the top/bottom gaps) or the panel overshoots the
// bottom of the screen and grows an inner scrollbar it doesn't need.
$app-bar-height: 64px;
$panel-gap: 16px;

.link-panel {
  position: sticky;
  top: $app-bar-height + $panel-gap;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 16px;
  max-height: calc(100vh - #{$app-bar-height + $panel-gap * 2});
  display: flex;
  flex-direction: column;
}

.link-panel-head {
  margin-bottom: 0.5rem;
}

// Only scrolls once the list genuinely outgrows the panel.
.link-scroll {
  overflow-y: auto;
  min-height: 0;
}

// The last item's margin counts toward the scroll height, which is enough on
// its own to make a list that otherwise fits look scrollable.
.link-list li:last-child {
  margin-bottom: 0 !important;
}

// Stacked layout on small screens: no pinning, no inner scroll container.
@media (max-width: 959px) {
  .link-panel {
    position: static;
    max-height: none;
  }

  .link-scroll {
    overflow-y: visible;
  }
}

.valk-gif {
  height: 80px;
}

.changelog {
  padding-left: 1.5rem;
}

// The tonal alert variant is `color: inherit` with a `currentColor` underlay, so this
// one declaration tints both the text and the background wash.
//
// Qualified with .v-alert on purpose: Vuetify's `.v-alert--variant-tonal { color: inherit }`
// has the same one-class specificity and is emitted after this block, so a bare
// `.date-alert` loses the tie and the text falls back to inherited white.
.v-alert.date-alert {
  color: var(--accent-blue);
}

// Highlighted dropdown item text (mouse hover or keyboard), so it stands out.
.v-overlay .v-list-item:hover .v-list-item-title,
.v-overlay .v-list-item--focus-visible .v-list-item-title,
.v-overlay .v-list-item:focus-visible .v-list-item-title {
  color: var(--accent-blue);
}

// Highlighted (arrow-key navigated) selection in the input box.
.v-autocomplete__selection--selected .v-autocomplete__selection-text {
  color: var(--accent-blue);
}

// Rank / synergy toggle buttons: small gap, each fully rounded, blue when active.
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
  color: var(--accent-blue);
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

// Fixed 4-column grid. `minmax(0, 1fr)` (rather than `1fr`, whose implicit
// minimum is auto) lets long labels wrap instead of widening their column.
.modifier-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 0.75rem;
}

// 4 across is unreadable once the form column is full-width; step it down.
@media (max-width: 959px) {
  .modifier-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { generateScores } from "@/util/score_util";
import { abyssWeekRange, formatAbyssRange } from "@/util/dates";
import { bossToChinese } from "@/data/bossTranslations";
import { weatherToChinese } from "@/data/weatherTranslations";
import {
  buildBiliLinks,
  companionOptions,
  companionRanksFor,
  valkOptions,
  valkRanksFor,
  valkSynergiesFor,
  isTeamValk,
  isMobile,
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
      valkSynergies: {} as Record<string, string | null>,
      allS0Plus1: false,
      individualRanks: false,
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
        valkRanks: this.effectiveValkRanks,
        valkSynergies: this.effectiveValkSynergies,
        allS0Plus1: this.allS0Plus1,
        selectedCompanion: this.selectedCompanion[0] ?? null,
        companionRank: this.companionRank ?? null,
        score: this.score,
        activeModifiers: this.modifierGroups
          .flatMap((g) => g.items)
          .filter((m) => m.value)
          .map((m) => m.name),
        dateRange: this.useDateFilter ? abyssWeekRange() : null,
      });
    },
    // Per-valk ranks/synergies only count in the "assign individually" mode. The buttons are
    // hidden otherwise, and a hidden button's value must not silently reach the search —
    // the picks are kept in valkRanks/valkSynergies so they come back if the box is re-ticked.
    effectiveValkRanks(): Record<string, string | null> {
      return this.individualRanks ? this.valkRanks : {};
    },
    effectiveValkSynergies(): Record<string, string | null> {
      return this.individualRanks ? this.valkSynergies : {};
    },
    // Bilibili only honours the pubtime params on its desktop search, so the checkbox is
    // hidden on mobile rather than offered as a no-op. No reactive dependencies, so Vue
    // evaluates this once — which is right, the user agent can't change mid-session.
    showDateFilter(): boolean {
      return !isMobile();
    },
    // The date window the filter resolves to, for the panel's feedback banner. Null while
    // the filter is off (or unavailable), which is what hides the banner.
    dateRangeLabel(): string | null {
      return this.useDateFilter ? formatAbyssRange(abyssWeekRange()) : null;
    },
    // The checkbox is hidden on mobile, so its value can never be set there — but read it
    // through this guard anyway, so the filter can't be applied on a device that ignores it.
    useDateFilter(): boolean {
      return this.showDateFilter && this.filterByDate;
    },
    // Rank button labels for the currently selected companion's group.
    companionRanks(): string[] {
      return companionRanksFor(this.selectedCompanion[0] ?? null);
    },
    // One entry per selected valk (in order), with its available rank/synergy labels.
    valkRows(): { valk: string; ranks: string[]; synergies: string[] }[] {
      return this.selectedValks.map((valk) => ({
        valk,
        ranks: valkRanksFor(valk),
        synergies: valkSynergiesFor(valk),
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
    // otherwise up to 3 valks. Also prune rank/synergy state for dropped valks.
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
      for (const name of Object.keys(this.valkSynergies)) {
        if (!valks.includes(name)) delete this.valkSynergies[name];
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
      // A link carries either &order=pubdate (no date filter) or &pubtime_begin_s=… (date
      // filter, which drops the sort), never both, and whichever it is leads the query
      // params. Cutting at the first of those two literals drops them and anything after.
      // Matching the whole literal (not a bare "&") means a search term containing "&"
      // won't truncate the label.
      const terms = afterKeyword.split(/&(?:order=pubdate|pubtime_begin_s=)/)[0];
      return terms.replaceAll("+", " ").replaceAll("%2B", "+");
    },
  },
});
</script>
