<template>
  <v-bottom-navigation>
    <v-progress-linear
      :active="loadingStore.loading"
      indeterminate
      absolute
      bottom
      color="primary"
    ></v-progress-linear>
    <v-btn value="room" to="/">
      <v-icon>mdi-account-group</v-icon>

      <span>Room</span>
    </v-btn>

    <v-btn value="account" :to="authStore.user ? `/account` : `/signin`">
      <v-icon icon="mdi-account-circle"></v-icon>

      <span>{{ authStore.user ? authStore.user.username : "Account" }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/stores/loadingStore";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
</script>
