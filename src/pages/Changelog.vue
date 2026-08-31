<template>
  <v-container fluid>
    <h1>Changelog</h1>
    <ChangelogList></ChangelogList>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChangelogList from "@/components/Changelog.vue";

export default defineComponent({
  name: "ChangelogPage",
  components: { ChangelogList },
});
</script>
