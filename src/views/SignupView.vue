<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useAppStore } from "@/stores/appStore";
import { ref } from "vue";
import router from "@/router";

const authStore = useAuthStore();
const appStore = useAppStore();

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
    appStore.setLoading(true);

    errorText.value = null;

    await authStore.signup(form.value);
    await authStore.getUser();
    router.push("/");
  } catch (e) {
    console.error(e);
    errorText.value = e.response?.data?.message;
  } finally {
    appStore.setLoading(false);
  }
}

function required(v: string) {
  return !!v || "Field is required";
}
</script>

<template>
  <v-container>
    <v-row class="py-10 justify-center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-5 pa-md-8">
          <h1 class="text-h4 mb-4">Sign Up</h1>

          <v-form v-model="checkForm" @submit.prevent="onSubmit">
            <v-text-field
              v-model="form.email"
              :readonly="appStore.loading"
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
              :readonly="appStore.loading"
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
              :readonly="appStore.loading"
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
              :readonly="appStore.loading"
              type="text"
              class="mb-4"
              label="Username/Nickname"
              color="primary"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="form.name"
              :readonly="appStore.loading"
              type="text"
              class="mb-4"
              label="Name"
              color="primary"
              variant="outlined"
            ></v-text-field>

            <v-btn
              :disabled="!checkForm"
              :loading="appStore.loading"
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
            :disabled="appStore.loading"
            :loading="appStore.loading"
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
