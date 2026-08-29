# Deprecated modules

These modules were removed from the live app on 2026-08-29. They are **not built
or rendered** — the Vue CLI only compiles `src/`, so nothing in this folder is
part of the bundle. They are kept here for reference/history only.

Because they live outside `src/`, their `@/...` import aliases and any references
to removed dependencies (e.g. Firebase) no longer resolve. **These files will not
compile as-is** — treat them as an archive, not working code.

## What was archived and why

| Tab / feature      | Files                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| Gear calculator    | `pages/GearComparison.vue`, `components/GearCalc.vue`, `components/MultiplierDialog.vue`, `data/valk_multipliers.ts`, `data/weapon_multipliers.ts`, `data/stig_multipliers.ts`, `models/multiplier.ts`, `util/filters.ts` |
| Affix calculator   | `pages/AffixComparison.vue`, `components/AffixCalc.vue`                                                  |
| MA score to time   | `pages/Scores.vue`                                                                                       |
| PGR bili searcher  | `pages/PGRSearch.vue`                                                                                    |
| MA / Abyss lineups | `pages/MemorialLineups.vue`, `pages/AbyssLineups.vue`, `data/abyss_lineups.ts`, `models/weather.ts`, `components/BossCard.vue` (were already hidden from the nav) |

The Gear calculator was the only Firebase consumer, so `firebase` and the anonymous
auth in `App.vue` were removed alongside it. `vue-gtag` was also removed — it used a
Universal Analytics ID that stopped collecting data in July 2023.

The only remaining live page is the Bilibili search (`src/pages/Search.vue`, route `/`).
