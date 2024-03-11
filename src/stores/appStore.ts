/**
 * stores/appStore.ts
 */

import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    laravelUrl: import.meta.env.VITE_LARAVEL_URL,
    storeUrl: `${import.meta.env.VITE_LARAVEL_URL}/storage/`,
  }),

  actions: {
    //
  },
});
