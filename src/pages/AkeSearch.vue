<template>
  <v-container fluid>
    <v-row>
      <!-- Left: the form. Right column holds the live-updating links. -->
      <v-col cols="12" md="7" lg="8">
        <h1>Arknights: Endfield - Bilibili search generator</h1>

        <p class="mt-2">Only fill out as much as you need!</p>

        <v-form>
          <h3 class="section-head">Boss</h3>
          <v-autocomplete
            v-model="selectedBoss"
            v-model:search="bossInput"
            autofocus
            multiple
            auto-select-first
            clearable
            hide-details
            @update:model-value="bossInput = ''"
            :items="bosses"
          ></v-autocomplete>

          <h3 class="section-head">Operators</h3>
          <v-autocomplete
            v-model="selectedOperators"
            v-model:search="operatorInput"
            hint="Order matters! Choose the lead operator first. Up to 4 can be selected."
            multiple
            auto-select-first
            clearable
            persistent-hint
            @update:model-value="operatorInput = ''"
            :items="operators"
          ></v-autocomplete>
        </v-form>
      </v-col>

      <!-- Right: sticky results panel so links stay visible while the form is edited. -->
      <v-col cols="12" md="5" lg="4">
        <div class="link-panel">
          <h2 class="link-panel-head">Generated links</h2>
          <p class="mt-2 mb-2">Some bosses/operators go by multiple names, so try all links!</p>
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
// These rules mirror Search.vue's. They are repeated rather than shared because each page
// is a lazily-loaded route chunk: styles defined in Search.vue only reach the document
// once that route has been visited, so this page cannot rely on them.
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

// Results panel: pinned beside the form (md+) so links stay on screen while the user
// edits. Sticky offsets are measured from the viewport, not from v-main, so the pinned
// panel has to clear App.vue's fixed 64px v-app-bar, and the height cap has to subtract
// the same 64px (plus the top/bottom gaps).
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

// The last item's margin counts toward the scroll height, which is enough on its own to
// make a list that otherwise fits look scrollable.
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
</style>

<script lang="ts">
import { defineComponent } from "vue";
import {
  akeBossOptions,
  akeOperatorOptions,
  buildAkeBiliLinks,
  MAX_OPERATORS,
} from "@/util/akeSearchLinks";

export default defineComponent({
  data: function () {
    return {
      selectedBoss: [] as string[],
      bossInput: null,
      selectedOperators: [] as string[],
      operatorInput: null,
      bosses: [...akeBossOptions].sort((a, b) => a.localeCompare(b)),
      operators: [...akeOperatorOptions].sort((a, b) => a.localeCompare(b)),
    };
  },
  computed: {
    biliLinks(): string[] {
      return buildAkeBiliLinks({
        selectedBoss: this.selectedBoss[0] ?? null,
        selectedOperators: this.selectedOperators,
      });
    },
  },
  watch: {
    // Limit boss selection to a maximum of 1.
    selectedBoss(bosses: string[]) {
      if (bosses.length > 1) {
        this.selectedBoss = bosses.slice(0, 1);
      }
    },
    // A full team is 4 operators, one more than the HI3 page's 3 valkyries.
    selectedOperators(operators: string[]) {
      if (operators.length > MAX_OPERATORS) {
        this.selectedOperators = operators.slice(0, MAX_OPERATORS);
      }
    },
  },
  methods: {
    // Human-readable label for a generated link: only the search terms, no URL or params.
    displayLink(link: string): string {
      const afterKeyword = link.split("keyword=")[1] ?? link;
      // A link carries either &order=pubdate (no date filter) or &pubtime_begin_s=… (date
      // filter, which drops the sort), never both, and whichever it is leads the query
      // params. This page has no date filter yet, so it is always the former — matching
      // both keeps the label correct if that changes. Matching the whole literal (not a
      // bare "&") means a search term containing "&" won't truncate the label.
      const terms = afterKeyword.split(/&(?:order=pubdate|pubtime_begin_s=)/)[0];
      return terms.replaceAll("+", " ").replaceAll("%2B", "+");
    },
  },
});
</script>
