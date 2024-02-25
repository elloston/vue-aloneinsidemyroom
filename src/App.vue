<template>
  <v-app>
    <v-app-bar fixed>
      <v-container>
        <v-row class="justify-space-between">
          <v-col v-for="item in items" cols="auto">
            <v-btn
              variant="text"
              color="primary"
              rounded="pill"
              :to="item.path"
            >
              {{ item.label }}
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <app-bar-menu />
          </v-col>
        </v-row>
      </v-container>

      <v-progress-linear
        :active="loadingStore.loading"
        indeterminate
        absolute
        bottom
        color="primary"
      ></v-progress-linear>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useLoadingStore } from "@/stores/loadingStore";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

const loadingStore = useLoadingStore();

const items = ref([
  {
    label: "Room",
    path: "/",
  },
]);

onBeforeMount(async () => {
  await authStore.getUser();
});
</script>
