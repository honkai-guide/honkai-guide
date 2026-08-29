<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Future Exalted Abyss lineups</h1>

        <p>
          In 4.3, abyss lineups for Global/SEA seemed to match CN's schedule for 4.3, just a month
          later. Schedules weren't synced at the start for a while so no guarantees!
        </p>

        <p>The small "CN" date is the date that the CN server had these lineups.</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div class="d-flex mb-6" v-for="lineup in lineups" v-bind:key="lineup.id">
          <div class="align-self-start">
            <h2 class="boss-date">{{ lineup.date | dateFormat("MMM DD") }}</h2>
            <p>CN: {{ lineup.cnDate | dateFormat("MMM DD") }}</p>
          </div>

          <v-divider class="mr-6" vertical fill-height></v-divider>

          <div class="d-flex flex-column">
            <template v-if="lineup.boss">
              <BossCard class="mx-2 my-2" :boss="lineup.boss"></BossCard>

              <v-list-item class="flex-shrink-1">
                <v-list-item-avatar>
                  <v-img :src="require('@/assets/weather/' + lineup.weather.icon)"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ lineup.weather.name }}</v-list-item-title>

                  <v-list-item-subtitle class="wrap-text">
                    {{ lineup.weather.effect }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>

            <template v-if="lineup.event">
              <h2>{{ lineup.event }}</h2>
            </template>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.boss-date {
  min-width: 100px;
}
.v-divider--vertical {
  border-width: 0 medium 0 0;
}
.wrap-text {
  white-space: normal;
}
</style>

<script lang="ts">
import Vue from "vue";
import { RECENT_LINEUPS } from "@/data/abyss_lineups";
import BossCard from "@/components/BossCard.vue";

export default Vue.extend({
  components: { BossCard },
  data: function () {
    return {
      lineups: RECENT_LINEUPS,
    };
  },
});
</script>
