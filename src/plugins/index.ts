/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import { App } from "vue";
// Plugins
import { createPinia } from "pinia";
import vuetify from "./vuetify";
import router from "@/router";
import dayjs from "./dayjs";

export function registerPlugins(app: App<Element>) {
  app.use(createPinia());
  app.use(router);
  app.use(vuetify);
  app.use(dayjs);
}
