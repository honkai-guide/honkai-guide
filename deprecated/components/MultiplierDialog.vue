<template>
  <v-dialog scrollable v-model="dialogVisible" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">
        <slot name="button"></slot>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="pb-0 flex-column align-stretch">
        <span class="headline">{{ title }}</span>

        <v-text-field label="Search" v-model="dialogFilter" autofocus></v-text-field>
      </v-card-title>

      <v-tabs v-model="activeTab">
        <template v-for="(groups, type) in filteredDialogItems">
          <v-tab v-bind:key="type">{{ type }}</v-tab>
        </template>
      </v-tabs>

      <v-card-text class="pa-0">
        <v-tabs-items v-model="activeTab">
          <template v-for="(groups, type) in filteredDialogItems">
            <v-tab-item class="px-4" v-bind:key="type">
              <div v-for="(pieces, name, i) in groups" v-bind:key="name">
                <v-divider v-if="i != 0" :class="[noDividerPadding ? 'mt-0' : 'mt-4']"></v-divider>

                <slot name="group" v-bind:group="{ pieces: pieces, name: name }"></slot>
              </div>
            </v-tab-item>
          </template>
        </v-tabs-items>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="dialogVisible = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MultiplierDialog",
  props: {
    title: String,
    dps: Object,
    support: Object,
    noDividerPadding: Boolean,
    // True if filter should act on items instead of groups.
    filterByItems: Boolean,
  },
  data: function () {
    return { dialogVisible: false, dialogFilter: "", activeTab: null };
  },
  computed: {
    filteredDialogItems: function () {
      function filterByKeyName(map, filterString: string) {
        return Object.keys(map)
          .filter((key) => key.toLowerCase().includes(filterString.toLowerCase()))
          .reduce((obj, key) => {
            obj[key] = map[key];
            return obj;
          }, {});
      }

      function filterByValueName(map, filterString: string) {
        return Object.keys(map).reduce((obj, key) => {
          const filtered = filterByKeyName(map[key], filterString);
          if (Object.keys(filtered).length > 0) {
            obj[key] = filtered;
          }
          return obj;
        }, {});
      }

      if (this.filterByItems) {
        return {
          DPS: filterByValueName(this.dps, this.dialogFilter),
          Support: filterByValueName(this.support, this.dialogFilter),
        };
      }

      return {
        DPS: filterByKeyName(this.dps, this.dialogFilter),
        Support: filterByKeyName(this.support, this.dialogFilter),
      };
    },
  },
});
</script>
