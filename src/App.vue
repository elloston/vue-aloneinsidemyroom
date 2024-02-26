<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>

    <bottom-navigation />
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { onBeforeMount } from "vue";

const authStore = useAuthStore();

onBeforeMount(async () => {
  await authStore.getUser();
});
</script>
