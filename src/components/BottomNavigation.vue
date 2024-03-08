<template>
  <v-bottom-navigation>
    <v-progress-linear
      :active="loadingStore.loading"
      indeterminate
      absolute
      bottom
      color="primary"
    ></v-progress-linear>

    <!-- <v-btn value="compilations" to="/compilations">
      <v-icon size="24px">mdi-account-group</v-icon>
    </v-btn> -->

    <v-btn value="room" to="/">
      <v-icon size="24px">mdi-account-group</v-icon>
    </v-btn>

    <v-btn v-if="authStore.user" value="account" to="/account">
      <v-avatar size="28px">
        <v-img
          v-if="authStore.user.avatar"
          :src="`http://localhost:8080/storage/${authStore.user.avatar}`"
        ></v-img>
        <v-icon v-else icon="mdi-account-circle"></v-icon>
      </v-avatar>
    </v-btn>

    <v-btn v-else value="account" to="/signin">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/stores/loadingStore";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
</script>
