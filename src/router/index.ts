/**
 * router/index.ts
 */

import routes from "./routes";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  if (typeof ym !== "undefined") {
    ym(import.meta.env.VITE_YANDEX_METRIKA_ID, "hit", to.fullPath);
  }
});

export default router;
