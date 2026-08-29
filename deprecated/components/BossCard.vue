<template>
  <component
    :is="boss.wikiLink ? 'a' : 'div'"
    class="boss-card"
    :href="boss.wikiLink"
    target="_blank"
  >
    <div
      class="boss-card__background"
      v-bind:style="{ 'background-image': 'url(' + require('@/assets/bosses/' + boss.image) + ')' }"
    >
      <div class="boss-card__name hidden-xs-only">{{ boss.name }}</div>
      <div v-if="uprate" class="boss-card__uprate hidden-xs-only">Score +20%</div>

      <div class="boss-card__name hidden-sm-and-up">{{ boss.shortName }}</div>
      <div v-if="uprate" class="boss-card__uprate hidden-sm-and-up">+20%</div>
    </div>
  </component>
</template>

<style>
.boss-card {
  max-width: 256px;
  width: 100%;
  height: 100px;
  position: relative;
  border: 2px solid #45c6c2;
  border-radius: 4px;
  box-sizing: content-box;
}
.boss-card__background {
  height: 100px;
  box-sizing: content-box;
  background-position: center center;
  background-repeat: no-repeat;
}
.boss-card__name {
  z-index: 2;
  position: absolute;
  background-color: #000000bb;
  padding: 0px 8px;
  left: 4px;
  bottom: 4px;
  border-radius: 4px;
  color: white;
}
.boss-card__uprate {
  z-index: 2;
  position: absolute;
  background-color: #f68f44dd;
  padding: 0px 8px;
  top: 4px;
  right: 4px;
  border-radius: 4px;
  color: white;
}
.boss-card__pic {
  position: absolute;
  left: 0;
  top: 0;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "BossCard",
  props: {
    boss: Object,
    uprate: Boolean,
  },
});
</script>
