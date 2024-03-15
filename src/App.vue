<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { onBeforeMount } from "vue";
import api from "./api";

const authStore = useAuthStore();

onBeforeMount(async () => {
  await api.get(`${import.meta.env.VITE_LARAVEL_URL}/sanctum/csrf-cookie`);

  await authStore.getUser();
});
</script>

<template>
  <v-app id="app">
    <v-main>
      <router-view />
    </v-main>

    <bottom-navigation />
  </v-app>
</template>

<style>
* {
  font-family: "Helvetica Neue", "Helvetica", "Arial" !important;
}
</style>
