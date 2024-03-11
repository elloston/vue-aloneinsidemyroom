/**
 * stores/reactionsStore.ts
 */

import { defineStore } from "pinia";

export const useReactionsStore = defineStore("reactions", {
  state: () => ({
    reactions: [],
  }),
  getters: {},
  actions: {},
});
