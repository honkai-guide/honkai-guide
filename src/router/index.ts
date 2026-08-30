import { createRouter, createWebHistory } from "vue-router";
const Search = () => import("../pages/Search.vue");
const Changelog = () => import("../pages/Changelog.vue");
const AkeSearch = () => import("../pages/AkeSearch.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Search,
  },
  {
    path: "/changelog",
    name: "changelog",
    component: Changelog,
  },
  {
    path: "/ake",
    name: "ake",
    component: AkeSearch,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
