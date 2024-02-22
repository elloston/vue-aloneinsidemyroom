/**
 * stores/loadingStore.ts
 */

import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },
  },
});
