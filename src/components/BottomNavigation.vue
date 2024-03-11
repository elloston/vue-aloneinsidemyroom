<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const appStore = useAppStore();
</script>

<template>
  <v-bottom-navigation>
    <v-progress-linear
      :active="appStore.loading"
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
          :src="appStore.storeUrl + authStore.user.avatar"
        ></v-img>
        <v-icon v-else icon="mdi-account-circle"></v-icon>
      </v-avatar>
    </v-btn>

    <v-btn v-else value="account" to="/signin">
      <v-icon icon="mdi-account-circle"></v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
