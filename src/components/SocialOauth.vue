<template>
  <v-container>
    <v-row>
      <v-col v-for="link in oauthLinks" cols="auto">
        <v-btn
          :readonly="loadingStore.loading"
          variant="outlined"
          rounded="lg"
          type="button"
          @click="oauthUser(link.provider)"
          >{{ link.label }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { ref } from "vue";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();

const oauthLinks = ref([
  { label: "VK Sign In", provider: "vkontakte" },
  // { label: "Google", provider: "google" },
]);

function oauthUser(provider: string) {
  loadingStore.setLoading(true);
  authStore.redirect(provider);
  loadingStore.setLoading(false);
}
</script>
