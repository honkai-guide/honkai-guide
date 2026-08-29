import { createRouter, createWebHistory } from "vue-router";
const Search = () => import("../pages/Search.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Search,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
