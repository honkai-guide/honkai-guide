<template>
  <v-app>
    <v-app-bar color="indigo">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Honkai helper</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- `to` (not href) so the changelog is a client-side route, no page reload. -->
      <v-btn icon="mdi-history" to="/changelog" title="Changelog"></v-btn>

      <v-btn
        icon="mdi-github"
        target="_blank"
        title="Source on GitHub"
        href="https://github.com/PaeP3nguin/honkai-guide"
      ></v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list density="compact">
        <v-list-item to="/" prepend-icon="mdi-magnify" title="HI3 Bilibili search"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </v-main>

    <!--
      Footer hidden — no longer needed, but preserved to credit the staff who
      originally started this project: paep3nguin#9170, with help from Aeru and Pootz#7456.

    <v-footer app class="d-none d-md-flex" color="indigo">
      <span>
        By paep3nguin#9170 with help from Aeru and Pootz#7456. Bugs? Suggestions? Find me on the
        <a class="text-white" href="https://discord.gg/hi3">official global discord</a>
        or the
        <a class="text-white" href="https://discord.gg/cafequanta">CafeQuanta armada</a>
        .
      </span>
    </v-footer>
    -->
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data: function () {
    return {
      drawer: null as boolean | null,
    };
  },
  created() {
    window.addEventListener(
      "keydown",
      function (e) {
        if (e.keyCode !== 8) {
          // Only wanna prevent backspace.
          return;
        }

        const target = e.target as Element;
        window.console.log(target);
        if (
          target == document.body ||
          target.hasAttribute("readonly") ||
          ["submit", "checkbox", "button"].includes(target.getAttribute("type"))
        ) {
          e.preventDefault();
          return false;
        }
      },
      true
    );
  },
});
</script>

<style lang="scss">
:root {
  // Site-wide accent blue. Used for dropdown hover/selection text, active toggle
  // buttons and the date-filter alert — change it here to restyle all of them.
  --accent-blue: #90caf9;
}
</style>
