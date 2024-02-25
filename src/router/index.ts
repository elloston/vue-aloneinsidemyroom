/**
 * router/index.ts
 */

/* global ym */

import routes from "./routes";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  // Проверка, что функция ym доступна
  if (typeof ym !== "undefined") {
    // Использование id счётчика и функции hit для отправки информации о просмотре страницы
    ym(96569431, "hit", to.fullPath);
  }
});

export default router;
