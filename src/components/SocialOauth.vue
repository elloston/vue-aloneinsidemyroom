<template>
  <div class="d-flex mt-4">
    <div v-for="link in oauthLinks" cols="auto">
      <v-btn
        :disabled="loading || loadingStore.loading"
        :loading="loading"
        variant="text"
        color="primary"
        type="button"
        size="small"
        class="text-body-1"
        @click="oauthUser(link.provider)"
        >Sign In with {{ link.label }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { ref } from "vue";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();

const loading = ref(false);

const oauthLinks = ref([
  { label: "VK", provider: "vkontakte" },
  // { label: "Google", provider: "google" },
]);

function oauthUser(provider: string) {
  loading.value = true;
  authStore.redirect(provider);
  loading.value = false;
}
</script>
