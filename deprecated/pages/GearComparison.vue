<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Honkai gear calculator</h1>

        <p>
          Bonus tip: click on the name or percentage of a multiplier you already entered to edit it
          directly!
        </p>

        <v-row class="mx-0">
          <v-dialog v-model="shareDialog" width="unset" @click:outside="shareDialog = false">
            <template v-slot:activator="{ on }">
              <v-btn color="success" v-on="on" :disabled="emptyMultipliers">
                <v-icon left>mdi-link</v-icon>
                Get shareable link
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">Share</span>
              </v-card-title>

              <v-card-text>
                <p>Send this link to anyone for them to see the multipliers you entered!</p>
                <p>
                  If you make changes to the multipliers, click the button again to get a new link.
                </p>
                <p>
                  <a :href="shareLink">{{ shareLink }}</a>
                </p>

                <v-tooltip top v-model="shareCopiedTooltip" :open-on-hover="false">
                  <template v-slot:activator="{}">
                    <v-btn color="success" @click="copyShareLink()" retain-focus-on-click>
                      <v-icon left>mdi-content-copy</v-icon>
                      Copy link
                    </v-btn>
                  </template>

                  <span>Link copied!</span>
                </v-tooltip>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-btn class="ml-6 hidden-sm-and-down" color="success" @click="compare = !compare">
            <v-icon left>mdi-compare</v-icon>
            Toggle compare
          </v-btn>

          <v-btn v-if="compare" class="ml-6 hidden-sm-and-down" color="success" @click="copyRight">
            <v-icon left>mdi-arrow-right</v-icon>
            Copy left to right
          </v-btn>

          <v-btn v-if="compare" class="ml-6 hidden-sm-and-down" color="success" @click="copyLeft">
            <v-icon left>mdi-arrow-left</v-icon>
            Copy right to left
          </v-btn>
        </v-row>

        <v-row class="d-flex">
          <v-col class="mr-8">
            <GearCalc v-model="leftMultipliers" />
          </v-col>

          <v-col class="hidden-sm-and-down" v-if="compare">
            <GearCalc v-model="rightMultipliers" />
          </v-col>
        </v-row>

        <h2 class="mt-6 mb-3">How do gear bonuses work?</h2>
        <p>
          In Honkai, your overall damage boost is calculated by adding all the bonuses of the same
          type and multiplying by all the different types. This is why mixing different types of
          bonuses together is effective. The different multiplier categories are listed below, with
          examples:
        </p>

        <ul>
          <li>
            Physical Damage Dealt -
            <a href="https://honkaiimpact3.fandom.com/Marco_Polo">Marco Polo T</a>
          </li>
          <li>
            Physical Damage Taken -
            <a href="https://honkaiimpact3.fandom.com/Gustav_Klimt">Gustav Klimt 2-set</a>
          </li>
          <li>
            Physical Damage Taken from Host (rare) -
            <a href="https://honkaiimpact3.fandom.com/Night_Squire">
              Night Squire SSS rank ability "Authority"
            </a>
          </li>
          <li>
            Elemental Damage Dealt -
            <a href="https://honkaiimpact3.fandom.com/Nuwa">Nuwa M</a>
          </li>
          <li>
            Elemental Damage Taken -
            <a href="https://honkaiimpact3.fandom.com/Phoenix#Special">
              Phoenix SS rank ability "Oriole"
            </a>
          </li>
          <li>
            Elemental Damage Taken from Host (rare) -
            <a href="https://honkaiimpact3.fandom.com/Thales">Thales M (stacks only)</a>
            ,
            <a href="https://honkaiimpact3.fandom.com/Welt Yang">Welt M (stacks only)</a>
          </li>
          <li>
            Total Damage Dealt -
            <a href="https://honkaiimpact3.fandom.com/Jingwei">Jingwei T</a>
          </li>
          <li>
            Total Damage Taken -
            <a href="https://honkaiimpact3.fandom.com/Isaac_Newton">Newton B</a>
          </li>
          <li>
            Total Damage Taken from Host (rare) -
            <a href="https://honkaiimpact3.fandom.com/Swallowtail_Phantasm#Special">
              Swallowtail Vibration debuff "Particle Vibration"
            </a>
            ,
            <a href="https://honkaiimpact3.fandom.com/Herrscher_of_the_Void#Passive">
              HoV mark debuff "Honkai Mark"
            </a>
          </li>
          <li>Type advantage bonus - BIO > PSY > MECH, QUA > QUA</li>
          <li>Dirac type-counter weather bonus / QS evadion boost</li>
        </ul>

        <p class="mt-4">
          What is this "from host" thing? Well apparently people were comparing the new Leeuwenhook
          stig set to Thales and Thales was overperforming. After some testing, it was discovered
          that some effects are unique multpliers, as in they multiply with other multipliers and
          don't diluted. Some examples of this so far are Thales M, Welt M, Swallowtail charge
          debuff, and GK snap debuff. For example, even each Thales M 2% fire DMG stack is separate
          from each other, so the total effect is (1+0.02) ^ 10 = ~22%, not 0.02*10 = 20%. Yikes!
        </p>

        <p class="mt-4">
          Note that bonuses that only apply to specific types of attacks, like
          <a href="https://honkaiimpact3.fandom.com/Sakamoto_Ryoma">Sakamoto Ryoma</a>
          or bonuses that only apply to one element type are not separate multipliers.
        </p>

        <h3 class="mt-4">What about critical hits?</h3>
        <p>
          The combination of crit rate and crit damage can be thought of as another multiplier, but
          only for physical damage. Critical damage starts at 100% and this is already factored in,
          so only include additional boosts. Most multipliers you see will be direct crit rate
          boosts, like
          <a href="https://honkaiimpact3.fandom.com/Dirac">Dirac T</a>
          , however some stigs directly give CRT, like
          <a href="https://honkaiimpact3.fandom.com/Ryunosuke_Akutagawa">Ryunosuke M</a>
          , so you can also use the "CRT" multiplier type directly. CRT converts to crit rate with
          the following formula: crit rate = CRT/(Valk Level * 5 + 75). At max level, 4.75 CRT is
          equal to 1% crit rate.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import GearCalc from "@/components/GearCalc.vue";
import "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  CollectionReference,
  DocumentData,
  addDoc,
} from "firebase/firestore";
import { Multiplier } from "@/models/multiplier";
import { firebaseApp } from "@/main";

let shareCopiedTooltipTimeout = null;
let userId = "anonymous";

const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
  }
});

const firestore = getFirestore(firebaseApp);

function buildShareLink(userId: string, comparisonId: string): string {
  const base = window.location.href.split("?")[0];
  return `${base}?userId=${userId}&comparisonId=${comparisonId}`;
}

function getUserRef(userId: string): CollectionReference<DocumentData> {
  return collection(firestore, "comparison", userId, "comparison");
}

export default Vue.extend({
  components: {
    GearCalc,
  },
  data: function () {
    return {
      leftMultipliers: [],
      rightMultipliers: [],
      compare: true,

      // Share
      shareDialog: false,
      shareData: null,
      shareLink: null,
      shareCopiedTooltip: false,
    };
  },
  async mounted() {
    const queryParams = this.$route.query;
    if (queryParams.comparisonId) {
      const docRef = await getDoc(
        doc(await getUserRef(queryParams.userId), queryParams.comparisonId)
      );
      if (docRef.exists) {
        this.shareData = docRef.data();
        this.shareData.left.forEach((d) => this.leftMultipliers.push(Multiplier.fromObject(d)));
        this.shareData.right.forEach((d) => this.rightMultipliers.push(Multiplier.fromObject(d)));
        this.shareLink = buildShareLink(queryParams.userId, queryParams.comparisonId);
      }
    }

    this.shareData = this.exportData;
  },
  computed: {
    exportData: function () {
      return JSON.parse(
        JSON.stringify({ left: this.leftMultipliers, right: this.rightMultipliers })
      );
    },
    emptyMultipliers: function () {
      return this.leftMultipliers.length + this.rightMultipliers.length === 0;
    },
  },
  watch: {
    shareDialog: async function (open) {
      if (!open) {
        return;
      }

      if (this.shareData === this.exportData) {
        return;
      }

      const ref = await addDoc(await getUserRef(userId), this.exportData);
      this.shareLink = buildShareLink(userId, ref.id);
      this.shareData = this.exportData;
    },
  },
  methods: {
    copyRight() {
      this.rightMultipliers.splice(0, this.rightMultipliers.length);
      this.leftMultipliers.forEach((m) => {
        this.rightMultipliers.push(m.clone());
      });
    },
    copyLeft() {
      this.leftMultipliers.splice(0, this.leftMultipliers.length);
      this.rightMultipliers.forEach((m) => {
        this.leftMultipliers.push(m.clone());
      });
    },
    async copyShareLink() {
      await navigator.clipboard.writeText(this.shareLink);
      clearTimeout(shareCopiedTooltipTimeout);
      this.shareCopiedTooltip = true;
      shareCopiedTooltipTimeout = setTimeout(() => (this.shareCopiedTooltip = false), 2000);
    },
  },
});
</script>
