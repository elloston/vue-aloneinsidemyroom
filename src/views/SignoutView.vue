<template>
  <v-container> </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import router from "@/router";

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.signout();
  router.push("/signin");
});
</script>
