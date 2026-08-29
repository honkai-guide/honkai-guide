<template>
  <div>
    <h2 class="mt-3 mb-3">Calculated multipliers</h2>

    <div v-for="f in FinalStats" v-bind:key="f">
      <span class="font-weight-bold">{{ f }}:&nbsp;</span>
      <span>{{ calculationResults[f] | toPercent }}</span>
    </div>

    <div v-if="developerMode">
      <p>{{ this.value }}</p>
      <br />
      <p>{{ this.calculationResults }}</p>
    </div>

    <div>
      <a @click="showDetailedStats = !showDetailedStats">Toggle detailed stats</a>
    </div>

    <template v-if="showDetailedStats">
      <div v-for="(value, stat) in detailedStats" v-bind:key="stat">
        <span class="font-weight-bold">{{ stat }}:&nbsp;</span>
        <span>{{ value | toPercent }}</span>
      </div>
    </template>

    <h3 class="mt-8">Enter valk info (only needed for physical valks):</h3>

    <v-container class="pa-0">
      <v-row dense>
        <v-col cols="2">
          <v-text-field
            type="number"
            label="Valkyrie level"
            v-model.number="valkLvl"
            :rules="valkLvlRules"
          ></v-text-field>
        </v-col>

        <v-col cols="2" class="ml-2">
          <v-text-field
            type="number"
            label="Valkyrie CRT"
            v-model.number="valkCrt"
            :rules="valueRules"
          ></v-text-field>
        </v-col>

        <v-col class="ml-2">
          <a :href="require('@/assets/valk_crt.png')" target="_blank">Where to find CRT?</a>
        </v-col>
      </v-row>
    </v-container>

    <h3 class="mt-8">Enter new multiplier:</h3>

    <v-form ref="multiplierForm" @submit.prevent="submitMultiplier">
      <v-container class="pa-0">
        <v-row dense>
          <v-col class="py-0">
            <v-text-field
              ref="nameField"
              label="Name"
              v-model="multiplier.name"
              :rules="nameRules"
              autofocus
              required
            ></v-text-field>
          </v-col>

          <v-col class="py-0">
            <v-select
              label="Type"
              v-model="multiplier.type"
              :items="multiplierTypes"
              :rules="multiplierTypeRules"
              required
            ></v-select>
          </v-col>

          <v-col class="py-0">
            <v-text-field
              type="number"
              v-model.number="multiplier.value"
              label="Value"
              :rules="valueRules"
              required
            ></v-text-field>
          </v-col>

          <v-col class="py-0 col-auto">
            <v-btn block color="primary" type="submit">Add</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-container class="pa-0 mb-2">
      <v-row justify="start">
        <v-col class="flex-grow-0">
          <v-dialog v-model="saveDialog" max-width="600px" @click:outside="closeSaveDialog">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" v-on="on">
                <v-icon left>mdi-content-save</v-icon>
                Save/Load
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">Save/Load</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row class="align-center">
                    <v-col class="pa-0 mr-4">
                      <v-form ref="saveForm" @submit.prevent="saveMultipliers">
                        <v-text-field
                          label="Name"
                          v-model="saveName"
                          :rules="nameRules"
                          :error-messages="saveNameErrors"
                          autofocus
                          required
                        ></v-text-field>
                      </v-form>
                    </v-col>

                    <v-col class="pa-0 col-auto">
                      <v-btn color="primary" @click="saveMultipliers">
                        <v-icon left>mdi-content-save</v-icon>
                        Save
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-text>
                <h3>Saved gear:</h3>
              </v-card-text>

              <v-divider></v-divider>

              <v-list-item
                v-for="(multipliers, name) in this.savedMultipliers"
                v-bind:key="name"
                class="mx-3"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ name }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn color="primary" @click="loadMultipliers(name)">Load</v-btn>
                </v-list-item-action>

                <v-list-item-action>
                  <v-btn color="primary" @click="deleteSavedMultipliers(name)">delete</v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="closeSaveDialog">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>

        <v-col class="flex-grow-0">
          <MultiplierDialog
            title="Add valk built-in multipliers"
            no-divider-padding
            filter-by-items
            :dps="this.DpsValkMultipliers"
            :support="this.SupportValkMultipliers"
          >
            <template v-slot:button>
              <v-img
                class="mr-3"
                left
                max-width="35"
                :src="require('@/assets/valkyrie_icon.png')"
              ></v-img>
              Add valks
            </template>

            <template v-slot:group="{ group }">
              <h4 class="my-4">{{ group.name }}</h4>

              <v-btn
                color="primary"
                class="mr-4 mb-4"
                v-for="(multipliers, suit) in group.pieces"
                v-bind:key="suit"
                @click="addMultipliers(multipliers)"
              >
                {{ suit }}
              </v-btn>
            </template>
          </MultiplierDialog>
        </v-col>

        <v-col class="flex-grow-0">
          <MultiplierDialog
            title="Add weapon multipliers"
            no-divider-padding
            filter-by-items
            :dps="this.DpsWeaponMultipliers"
            :support="this.SupportWeaponMultipliers"
          >
            <template v-slot:button>
              <v-img class="mr-3" left :src="require('@/assets/weapon_icon.png')"></v-img>
              Add weapons
            </template>

            <template v-slot:group="{ group }">
              <h4 class="my-4">{{ group.name }}</h4>

              <v-btn
                color="primary"
                class="mr-4 mb-4"
                v-for="(multipliers, piece) in group.pieces"
                v-bind:key="piece"
                @click="addMultipliers(multipliers)"
              >
                {{ piece }}
              </v-btn>
            </template>
          </MultiplierDialog>
        </v-col>

        <v-col class="flex-grow-0">
          <MultiplierDialog
            title="Add stigmata multipliers"
            :dps="this.DpsStigMultipliers"
            :support="this.SupportStigMultipliers"
          >
            <template v-slot:button>
              <v-img
                class="mr-3"
                left
                max-width="15"
                :src="require('@/assets/stigamata_icon.png')"
              ></v-img>
              Add stigs
            </template>

            <template v-slot:group="{ group }">
              <h4 class="my-4">{{ group.name }}</h4>

              <v-btn
                color="primary"
                class="mr-4"
                v-for="(multipliers, piece) in group.pieces"
                v-bind:key="piece"
                @click="addMultipliers(multipliers)"
              >
                {{ piece }}
              </v-btn>
            </template>
          </MultiplierDialog>
        </v-col>

        <v-col class="flex-grow-0">
          <v-btn color="error" @click="clearMultipliers">
            <v-icon left>mdi-trash-can-outline</v-icon>
            Clear
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="editDialog" width="unset" @click:outside="closeEditDialog">
      <v-card>
        <v-card-title>
          <span class="headline">Edit multiplier</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="editMultiplierForm" @submit.prevent="saveEditedMultiplier">
            <v-container class="pa-0">
              <v-row dense>
                <v-col>
                  <v-text-field
                    label="Name"
                    v-model="editedMultiplier.name"
                    :rules="nameRules"
                    autofocus
                    required
                  ></v-text-field>
                </v-col>

                <v-col>
                  <v-select
                    label="Type"
                    v-model="editedMultiplier.type"
                    :items="multiplierTypes"
                    :rules="multiplierTypeRules"
                    required
                  ></v-select>
                </v-col>

                <v-col>
                  <v-text-field
                    type="number"
                    v-model.number="editedMultiplier.value"
                    label="Percentage"
                    :rules="valueRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="closeEditDialog">Close</v-btn>
          <v-btn text color="primary" @click="saveEditedMultiplier">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      dense
      :headers="multiplierTableHeaders"
      :items="value"
      item-key="id"
      hide-default-footer
      disable-pagination
    >
      <template v-slot:item.active="{ item }">
        <v-checkbox v-model="item.active" color="primary"></v-checkbox>
      </template>

      <template v-slot:item.name="props">
        <v-edit-dialog :return-value.sync="props.item.name">
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.name"
              :rules="nameRules"
              label="Edit"
              single-line
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.value="props">
        <v-edit-dialog :return-value.sync="props.item.value">
          {{ props.item.value }}
          <span v-if="props.item.type != Type.Crt">%</span>
          <template v-slot:input>
            <v-text-field
              v-model="editedMultiplier.value"
              :rules="valueRules"
              label="Edit"
              single-line
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn icon @click.stop="startEditMultiplier(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="removeMultiplier(item)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>

      <template slot="no-data">Add some multipliers!</template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MultiplierDialog from "@/components/MultiplierDialog.vue";
import { toPercent } from "@/util/filters";
import { Type, Multiplier } from "@/models/multiplier";
import { DPS_VALK_MULTIPLIERS, SUPPORT_VALK_MULTIPLIERS } from "@/data/valk_multipliers";
import { DPS_WEAPON_MULTIPLIERS, SUPPORT_WEAPON_MULTIPLIERS } from "@/data/weapon_multipliers";
import { DPS_STIG_MULTIPLIERS, SUPPORT_STIG_MULTIPLIERS } from "@/data/stig_multipliers";

enum FinalStats {
  OverallEle = "Overall elemental",
  OverallPhysNoCrits = "Overall physical (no crits)",
  OverallPhysAvgCrits = "Overall physical (average crits)",
  OverallPhysAllCrits = "Overall physical (100% crits)",
}

const tableHeaders = [
  {
    text: "Active",
    value: "active",
    width: "10%",
  },
  {
    text: "Name",
    value: "name",
    width: "25%",
  },
  {
    text: "Type",
    value: "type",
    width: "30%",
  },
  {
    text: "Value",
    value: "value",
    width: "20%",
  },
  {
    text: "Actions",
    value: "actions",
    width: "15%",
  },
];

export default Vue.extend({
  name: "gear-calc",
  props: {
    value: Array,
  },
  components: { MultiplierDialog },
  filters: { toPercent },
  data: function () {
    return {
      // Constants.
      Type: Type,
      FinalStats: FinalStats,
      DpsValkMultipliers: DPS_VALK_MULTIPLIERS,
      SupportValkMultipliers: SUPPORT_VALK_MULTIPLIERS,
      DpsWeaponMultipliers: DPS_WEAPON_MULTIPLIERS,
      SupportWeaponMultipliers: SUPPORT_WEAPON_MULTIPLIERS,
      DpsStigMultipliers: DPS_STIG_MULTIPLIERS,
      SupportStigMultipliers: SUPPORT_STIG_MULTIPLIERS,

      // Save/load
      saveDialog: false,
      saveName: "",
      saveNameErrors: [],
      savedMultipliers: {},

      // Fill
      fillValksDialog: false,
      fillStigsDialog: false,
      stigsDialogFilter: "",

      // Edit
      editDialog: false,
      editedMultiplier: Multiplier.empty(),

      // Stuff that actually changes.
      developerMode: false,
      showDetailedStats: false,
      multiplierTableHeaders: tableHeaders,
      multiplierTypes: Object.values(Type),
      multiplier: new Multiplier({ active: true }),
      valkCrt: 100,
      valkLvl: 80,

      // Validation rules.
      nameRules: [(v: string) => !!v || "Name is required"],
      saveNameRules: [(v: string) => !!v || "Name is required"],
      multiplierTypeRules: [(v: Type) => !!v || "Type is required"],
      valueRules: [(v: number) => !!v || "Value is required"],
      valkLvlRules: [
        (v: number) => !!v || "Level is required",
        (v: number) => v <= 80 || "Max is 80!",
      ],
    };
  },
  computed: {
    calculationResults: function () {
      const result = {};
      for (const key in Type) {
        const type = Type[key];

        if (type == Type.Crt) {
          result[type] = this.value.reduce((acc, m) => {
            return acc + m.toIntegerValue(type);
          }, 0);
        } else if (type == Type.CritRate) {
          result[type] = this.value.reduce((acc, m) => acc + m.toPercent(type), 0);
        } else if (type == Type.TdmTakenHost) {
          result[type] = this.value.reduce((acc, m) => acc * (1 + m.toPercent(type)), 1);
        } else if (type == Type.EleTakenHost) {
          result[type] = this.value.reduce((acc, m) => acc * (1 + m.toPercent(type)), 1);
        } else if (type == Type.PhysTakenHost) {
          result[type] = this.value.reduce((acc, m) => acc * (1 + m.toPercent(type)), 1);
        } else {
          result[type] = this.value.reduce((acc, m) => acc + m.toPercent(type), 1);
        }
      }

      const critRate = Math.min(
        (this.valkCrt + result[Type.Crt]) / (this.valkLvl * 5 + 75) + result[Type.CritRate],
        1
      );
      const tdmOnly = result[Type.TdmDealt] * result[Type.TdmTaken] * result[Type.TdmTakenHost];
      const eleOnly = result[Type.EleDealt] * result[Type.EleTaken] * result[Type.EleTakenHost];
      const physOnlyNoCrits =
        result[Type.PhysDealt] * result[Type.PhysTaken] * result[Type.PhysTakenHost];
      const physOnlyAvgCrits =
        physOnlyNoCrits * critRate * (result[Type.CritDmg] + 1) + physOnlyNoCrits * (1 - critRate);
      const physOnlyAllCrits = physOnlyNoCrits * (result[Type.CritDmg] + 1);
      result[FinalStats.OverallEle] = tdmOnly * eleOnly;
      result[FinalStats.OverallPhysNoCrits] = tdmOnly * physOnlyNoCrits;
      result[FinalStats.OverallPhysAvgCrits] = tdmOnly * physOnlyAvgCrits;
      result[FinalStats.OverallPhysAllCrits] = tdmOnly * physOnlyAllCrits;
      return result;
    },
    detailedStats: function () {
      const stats = Object.assign({}, this.calculationResults);

      // Replace crit rate with total crit rate.
      stats[Type.CritRate] = Math.min(
        (this.valkCrt + stats[Type.Crt]) / (this.valkLvl * 5 + 75) + stats[Type.CritRate],
        1
      );

      // We don't care about CRT only total crit rate.
      delete stats[Type.Crt];

      // Remove final stats too.
      Object.values(FinalStats).map((k) => delete stats[k]);

      return stats;
    },
    filteredDialogStigs: function () {
      function filterByKeyName(map, filterString: string) {
        return Object.keys(map)
          .filter((key) => key.toLowerCase().includes(filterString.toLowerCase()))
          .reduce((obj, key) => {
            obj[key] = map[key];
            return obj;
          }, {});
      }

      return {
        DPS: filterByKeyName(DPS_STIG_MULTIPLIERS, this.stigsDialogFilter),
        Support: filterByKeyName(SUPPORT_STIG_MULTIPLIERS, this.stigsDialogFilter),
      };
    },
  },
  watch: {
    saveDialog: function (value) {
      if (!value) {
        // Dialog is closing.
        return;
      }

      this.savedMultipliers = JSON.parse(localStorage.savedMultipliers || {});
    },
  },
  methods: {
    submitMultiplier() {
      if (this.multiplier.name == "yolol") {
        this.developerMode = !this.developerMode;
        return;
      }

      if (!this.$refs.multiplierForm.validate()) {
        return;
      }

      if (this.multiplier.value < 1) {
        // Convert to integer percentage if user typed decimal.
        this.multiplier.value *= 100;
      }
      this.value.push(this.multiplier);
      this.multiplier = new Multiplier({ active: true });
      this.$refs.multiplierForm.reset();

      this.$refs.nameField.focus();
    },
    addMultipliers(multipliers: Multiplier[]) {
      multipliers.forEach((m) => this.value.push(m.clone()));
    },
    clearMultipliers() {
      while (this.value.length) {
        Vue.delete(this.value, 0);
      }
    },
    saveMultipliers() {
      if (!this.$refs.saveForm.validate()) {
        return;
      }

      if (Object.prototype.hasOwnProperty.call(this.savedMultipliers, this.saveName)) {
        this.saveNameErrors.push("Name already used");
        return;
      }

      if (this.value.length == 0) {
        this.saveNameErrors.push("No gear entered");
        return;
      }

      this.savedMultipliers[this.saveName] = this.value.map((m) => m.clone());

      localStorage.savedMultipliers = JSON.stringify(this.savedMultipliers);

      this.$refs.saveForm.reset();
    },
    loadMultipliers(name) {
      this.clearMultipliers();
      this.savedMultipliers[name].forEach((m) => this.value.push(Multiplier.fromObject(m)));
    },
    deleteSavedMultipliers(name) {
      Vue.delete(this.savedMultipliers, name);
      localStorage.savedMultipliers = JSON.stringify(this.savedMultipliers);
    },
    closeSaveDialog() {
      this.$refs.saveForm.reset();
      this.saveDialog = false;
    },
    startEditMultiplier(multiplier) {
      this.editedMultiplier = multiplier.clone(true);
      this.editDialog = true;
    },
    closeEditDialog() {
      this.$refs.editMultiplierForm.reset();
      this.editDialog = false;
    },
    saveEditedMultiplier() {
      if (!this.$refs.editMultiplierForm.validate()) {
        return;
      }

      for (let i = 0; i < this.value.length; i++) {
        const multiplier = this.value[i];
        if (multiplier.id === this.editedMultiplier.id) {
          Vue.set(this.value, i, this.editedMultiplier);
          break;
        }
      }
      this.editedMultiplier = Multiplier.empty();
      this.editDialog = false;
    },
    removeMultiplier(multiplier) {
      const i = this.value.indexOf(multiplier);
      if (i === -1) {
        return;
      }
      this.value.splice(i, 1);
    },
  },
});
</script>
