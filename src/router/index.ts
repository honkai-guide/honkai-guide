import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
const Search = () => import("../pages/Search.vue");
const Changelog = () => import("../pages/Changelog.vue");
const AkeSearch = () => import("../pages/AkeSearch.vue");

// Annotated rather than inferred: without it TS widens this mixed array so the redirect
// record picks up `component: undefined`, which clashes with RouteRecordRedirect's
// `component?: never`.
const routes: RouteRecordRaw[] = [
  // Nothing is served at the root, so it redirects to the HI3 page rather than rendering a
  // landing page. vue-router replaces rather than pushes for a redirect record, so "/" does
  // not land in the history stack: Back from /hi3 leaves the site instead of bouncing
  // through the redirect.
  {
    path: "/",
    redirect: { name: "hi3" },
  },
  {
    path: "/hi3",
    name: "hi3",
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
