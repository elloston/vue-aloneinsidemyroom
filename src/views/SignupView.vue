<template>
  <v-container>
    <v-row class="py-10 justify-center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-5 pa-md-8">
          <h1 class="text-h4 mb-4">Sign Up</h1>

          <v-form v-model="checkForm" @submit.prevent="onSubmit">
            <v-text-field
              v-model="form.email"
              :readonly="loadingStore.loading"
              :rules="[required]"
              id="email"
              type="email"
              class="mb-4"
              label="Email*"
              color="primary"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :readonly="loadingStore.loading"
              :rules="[required]"
              id="password"
              type="password"
              class="mb-4"
              label="Password*"
              placeholder="Enter your password"
              color="primary"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="form.password_confirmation"
              :readonly="loadingStore.loading"
              :rules="[required]"
              type="password"
              class="mb-4"
              label="Password confirmation*"
              placeholder="Confirmation password"
              color="primary"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="form.username"
              :readonly="loadingStore.loading"
              type="text"
              class="mb-4"
              label="Username/Nickname"
              color="primary"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="form.name"
              :readonly="loadingStore.loading"
              type="text"
              class="mb-4"
              label="Name"
              color="primary"
              variant="outlined"
            ></v-text-field>

            <v-btn
              :disabled="!checkForm"
              :loading="loadingStore.loading"
              block
              color="primary"
              type="submit"
              size="large"
              class="text-body-1"
            >
              Sign Up
            </v-btn>

            <v-dialog v-model="errorText">
              <v-card>
                <v-alert
                  type="error"
                  title="Error"
                  :text="errorText"
                  variant="tonal"
                ></v-alert>
              </v-card>
            </v-dialog>
          </v-form>
          <social-oauth />

          <v-divider class="mt-5"></v-divider>
          <v-btn
            :disabled="loadingStore.loading"
            :loading="loadingStore.loading"
            color="primary"
            variant="text"
            type="submit"
            size="small"
            class="text-body-2 mt-4"
            @click="router.push('/signin')"
          >
            Already have account
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { ref } from "vue";
import router from "@/router";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();

const errorText = ref();

const checkForm = ref(false);
const form = ref({
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
  name: "",
});

async function onSubmit() {
  if (!checkForm.value) return;

  try {
    loadingStore.setLoading(true);

    errorText.value = null;

    await authStore.signup(form.value);
    await authStore.getUser();
    router.push("/");
  } catch (e) {
    console.error(e);
    errorText.value = e.response?.data?.message;
  } finally {
    loadingStore.setLoading(false);
  }
}

function required(v: string) {
  return !!v || "Field is required";
}
</script>
