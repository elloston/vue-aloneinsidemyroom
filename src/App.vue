<template>
  <v-app>
    <v-app-bar fixed>
      <v-container>
        <v-row>
          <v-col v-for="item in items" cols="auto">
            <v-btn
              variant="outlined"
              color="primary"
              rounded="lg"
              :to="item.path"
            >
              {{ item.label }}
            </v-btn>
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
import { ref } from "vue";
import { useLoadingStore } from "@/stores/loadingStore";

const loadingStore = useLoadingStore();

const items = ref([
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Sign Up",
    path: "/signup",
  },

  {
    label: "Sign In",
    path: "/signin",
  },
]);
</script>
