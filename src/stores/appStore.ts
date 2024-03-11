/**
 * stores/appStore.ts
 */

import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    loading: false,
    laravelUrl: import.meta.env.VITE_LARAVEL_URL,
    storeUrl: `${import.meta.env.VITE_LARAVEL_URL}/storage/`,
  }),

  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },
  },
});
