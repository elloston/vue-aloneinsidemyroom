<template>
  <v-app>
    <v-app-bar fixed>
      <v-container>
        <v-row>
          <v-col v-for="item in items" cols="auto">
            <v-btn
              variant="outlined"
              color="primary"
              rounded="pill"
              :to="item.path"
            >
              {{ item.label }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "./api";

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
