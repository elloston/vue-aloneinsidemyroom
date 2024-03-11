<script setup lang="ts">
import { useLoadingStore } from "@/stores/loadingStore";
import { useAuthStore } from "@/stores/authStore";
import router from "@/router";
import { ref } from "vue";
import api from "@/api";
import { useAppStore } from "@/stores/appStore";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();
const newAvatar = ref();
const uploading = ref(false);
const appStore = useAppStore();

async function logoutUser() {
  try {
    loadingStore.setLoading(true);

    await authStore.signout();
    router.push("/signin");
  } catch (e) {
    console.error(e);
  } finally {
    loadingStore.setLoading(false);
  }
}

async function uploadAvatar() {
  try {
    uploading.value = true;
    const formData = new FormData();

    formData.append("avatar", newAvatar.value[0]);

    const { data } = await api.post("user/update-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    authStore.user = data;
  } catch (e) {
    console.error(e);
  } finally {
    uploading.value = false;
  }
}
</script>

<template>
  <div>
    <v-container>
      <v-row class="py-5 justify-center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-5 pa-md-8" v-if="authStore.user">
            <h1 class="text-h4 font-weight-medium mb-4">Account</h1>

            <v-avatar v-if="authStore.user.avatar">
              <v-img :src="appStore.storeUrl + authStore.user.avatar"></v-img>
            </v-avatar>

            <v-file-input
              variant="outlined"
              v-model="newAvatar"
              :multiple="false"
              @change="uploadAvatar()"
            ></v-file-input>

            <v-text-field
              v-model="authStore.user.username"
              :readonly="true"
              type="text"
              class="mb-4"
              label="Username"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="authStore.user.name"
              :readonly="true"
              type="text"
              class="mb-4"
              label="Name"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="authStore.user.email"
              :readonly="true"
              type="email"
              class="mb-4"
              label="Email"
              variant="outlined"
            ></v-text-field>

            <v-btn
              :loading="loadingStore.loading"
              @click="logoutUser()"
              block
              color="primary"
              class="text-body-1"
              >Sign Out</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
