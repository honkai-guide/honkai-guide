<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md10>
        <h1>Bilibili search generator for Punishing Gray Raven</h1>
        <p>Generates Bilibili search links, no Chinese knowledge needed!</p>

        <v-layout align-center>
          <img class="gif mr-2" :src="require('@/assets/liv_wake.png')" />
          <span>Only fill out as much as you need for better search results!</span>
        </v-layout>

        <v-form>
          <h3 class="section-head">Boss</h3>
          <v-autocomplete
            v-model="selectedBoss"
            hint="Start typing to autocomplete."
            autofocus
            auto-select-first
            clearable
            persistent-hint
            :items="bosses"
          ></v-autocomplete>

          <h3 class="section-head">Characters</h3>
          <p>Order matters! Choose the lead character first.</p>
          <v-autocomplete
            v-model="selectedCharacters"
            hint="Start typing to autocomplete."
            multiple
            auto-select-first
            clearable
            persistent-hint
            @change="characterInput = ''"
            :search-input.sync="characterInput"
            :items="characters"
          ></v-autocomplete>

          <h3 class="section-head">Modifiers</h3>
          <v-layout wrap>
            <v-flex grow xs4 md3 v-for="modifier in modifiers" v-bind:key="modifier.name">
              <v-checkbox v-model="modifier.value" :label="`${modifier.name}`"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-form>

        <h2 class="section-head">Generated links</h2>
        <v-layout align-center>
          <img class="gif mr-2" :src="require('@/assets/liv_peek.png')" />
          <span>Links are instantly generated as you make choices.</span>
        </v-layout>

        <p>Some bosses/characters go by multiple names, so try all links!</p>
        <p v-for="link in biliLinks" v-bind:key="link">
          <a target="_blank" class="bili-link" :href="`${link}`">{{ link }}</a>
        </p>

        <h2 class="section-head">Changelog</h2>
        <ul>
          <li>2022/03/23 - Updated translations for some modifiers and bosses</li>
          <li>2022/02/17 - Launched! Thanks Ushay for the translations</li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss">
.section-head {
  margin-top: 1.8em;
}

.v-autocomplete {
  padding-top: 0px;
}

.bili-link {
  font-size: 1.5em;
}

.gif {
  height: 80px;
}
</style>

<script lang="ts">
import Vue from "vue";
import { RECENT_LINEUPS } from "@/data/boss_lineups";

const bossToChinese = {
  Roland: ["罗兰"],
  Vassago: ["瓦沙克"],
  Roseblade: ["管家"],
  Camu: ["卡穆"],
  Musashi: ["武藏玖型"],
  "Iron Maiden": ["苦刑之女"],
  Nozzle: ["喷涂机械"],
  Alpha: ["不明构造体α"],
  Rosetta: ["罗塞塔"],
  Huaxu: ["华胥"],
  Ambria: ["安博莉亚"],
  Gabriel: ["加百列"],
  "Shark-spear": ["鲨士碧儿"],
  Machiaveli: ["马基雅维利"],
  Xenophobe: ["枢蛉后"],
  Qu: ["曲"],
  Siren: ["塞壬"],
  Luna: ["露娜"],
};

const characterToChinese = {
  // S ranks
  "Lee Entropy": ["里·乱数", "乱数", "乱"],
  "Liv Luminance": ["丽芙·仰光", "仰光"],
  "Kamui Tenebrion": ["神威·暗能", "暗能"],
  "Nanami Pulse": ["七实·脉冲", "脉冲"],
  "Karen Ember": ["卡列尼娜·烬燃", "烬燃"],
  Alpha: ["露西亚·深红之渊", "白毛", "白"],
  "Bianca Veritas": ["比安卡·真理", "真理"],
  "Lucia Plume": ["露西亚·鸦羽", "冰露", "冰"],
  Rosetta: ["罗塞塔·凛冽", "罗塞", "罗", "马"],
  Luna: ["露娜·银冕", "露娜"],
  A2: ["A2"],
  "9S": ["9S"],
  B2: ["B2"],

  // A/B ranks
  "Chrome Glory": ["库洛姆·荣光", "冰库怒斩", "荣光", "冰库"],
  "Vera Flare": ["薇拉·绯耀", "薇拉", "顶配薇"],
  "Liv Solaeter": ["丽芙·极昼", "极昼", "芙"],
  "Selena Capriccio": ["赛琳娜·幻奏"],
  "Nanami Gundam": ["七实·遥星之座"],
  "Lucia Lotus": ["露西亚·红莲", "红莲"],
  "Liv Eclipse": ["丽芙·蚀暗", "蚀暗", "蚀"],
  "Nanami Storm": ["七实·风暴", "风暴"],
  "Lucia Dawn": ["露西亚·黎明", "黎明"],
  "Liv Lux": ["丽芙·流光", "流光"],
  "Lee Palefire": ["里·异火", "异火"],
  "Karen Blast": ["卡列尼娜·爆裂", "爆裂"],
  "Bianca Zero": ["比安卡·零度", "零度"],
  "Watanabe Nightblade": ["渡边·夜刃", "夜刃"],
  "Kamui Bastion": ["神威·重能", "重能"],
  "Ayla Brilliance": ["艾拉·溢彩", "溢彩"],
  "Watanabe Astral": ["渡边·夙星", "夙星"],
  "Sofia Silverfang": ["苏菲亚·银牙", "银牙"],
  "Chrome Arclight": ["库洛姆·弧光", "弧光"],
  "Vera Rozen": ["薇拉·瑰丽", "瑰丽"],
  "Changyu Kirin": ["常羽·游麟", "游麟"],
  "Wanshi Fate": ["万事·明觉", "万事", "万"],
  "No 21": ["21号·XXI", "21号", "21"],

  // Compositors
  Camu: ["卡穆·狂犬", "卡穆"],
  Qu: ["曲·雀翎", "曲"],
  "Selena Tempest": ["赛琳娜·岚音", "岚音"],
  Roland: ["罗兰·戏炎", "罗兰"],
  Pulao: ["蒲牢·华钟", "蒲牢"],

  // Special cases
  "Ice team": ["冰队"],
  "Lee + Rosetta team": ["乱马队"],
};

const modifiersToChinese = {
  // Pain cage difficulties
  "Advanced PPC": ["高级区"],
  "Ex PPC": ["终极区"],

  // War zone
  "War Zone": ["纷争战区"],
  "Physical Map": ["物理区", "物理"],
  "Fire Map": ["火区", "火"],
  "Lightning Map": ["雷区", "雷"],
  "Dark Map": ["暗区", "暗"],
  "Ice Map": ["冰区", "冰"],

  // Other game modes
  "Babel Tower": ["巴别塔"],
  "Norman War": ["矿区", "矿"],
  "Punishing Gray Raven": ["战双"],
};

const modifiers = Object.keys(modifiersToChinese).map((m) => ({
  name: m,
  value: false,
}));

function isMobile(): boolean {
  return window.navigator.userAgent.toLowerCase().includes("mobi");
}

function* combine(arrOfArr: string[][]) {
  const [head, ...tail] = arrOfArr;
  const remainder = tail.length ? combine(tail) : [[]];
  for (const r of remainder) for (const h of head) yield [h, ...r];
}

export default Vue.extend({
  data: function () {
    return {
      selectedBoss: null,
      selectedCharacters: [],
      characterInput: null,
      bosses: Object.keys(bossToChinese),
      characters: Object.keys(characterToChinese),
      modifiers: modifiers,
      lineups: RECENT_LINEUPS,
    };
  },
  computed: {
    bossNames: function () {
      if (this.selectedBoss === null) {
        return [""];
      }

      return bossToChinese[this.selectedBoss];
    },
    // Some characters have multiple names, make all combos of team.
    characterCombos: function () {
      let combos = [""];
      this.selectedCharacters
        .map((v) => characterToChinese[v])
        .forEach((names) => {
          combos = combos.reduce((acc, curr) => {
            names.forEach((n) => acc.push(curr + n));
            return acc;
          }, []);
        });
      return combos;
    },
    biliLinks: function () {
      const baseUrl = isMobile()
        ? "https://m.bilibili.com/search?keyword="
        : "https://search.bilibili.com/all?keyword=";

      // Static modifiers that go at the end.
      let modifierParams = this.modifiers
        .filter((m) => m.value)
        .map((m) => modifiersToChinese[m.name]);

      // Must have at least one element in each array passed to combine to generate anything.
      modifierParams = modifierParams.length ? modifierParams : [[""]];
      const modifierCombos = Array.from(combine(modifierParams)).map((c: string[]) =>
        c.join(" ").trim()
      );

      const combinations = Array.from(
        combine([this.bossNames, this.characterCombos, modifierCombos])
      );

      // Sort by length and then alphabetical.
      return combinations
        .map((c: string[]) => `${baseUrl}${c.join(" ").trim()}`)
        .sort(function (a, b) {
          return a.length - b.length || a.localeCompare(b);
        });
    },
  },
});
</script>
