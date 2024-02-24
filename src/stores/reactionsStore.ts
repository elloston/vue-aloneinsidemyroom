/**
 * stores/reactionsStore.ts
 */

import { defineStore } from "pinia";
import api from "@/api";

export const useReactionsStore = defineStore("reactions", {
  state: () => ({
    reactions: [],
  }),
  getters: {},
  actions: {},
});
