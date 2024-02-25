<template>
  <v-container>
    <v-row justify="center" align="center" class="h-screen">
      <v-col cols="12" sm="8" md="5">
        <h1 class="text-blue-grey-lighten-3 font-weight-light text-h4 mb-3">
          Sign Up
        </h1>
        <v-card
          class="mx-auto px-6 py-8"
          variant="outlined"
          color="primary"
          rounded="lg"
        >
          <v-form v-model="checkForm" @submit.prevent="onSubmit">
            <v-text-field
              v-model="form.email"
              :readonly="loading"
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
              :readonly="loading"
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
              :readonly="loading"
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
              :readonly="loading"
              type="text"
              class="mb-4"
              label="Username/Nickname"
              color="primary"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              v-model="form.name"
              :readonly="loading"
              type="text"
              class="mb-4"
              label="Name"
              color="primary"
              variant="outlined"
              size="sm"
            ></v-text-field>

            <v-btn
              :disabled="!checkForm"
              :loading="loading"
              block
              color="primary"
              variant="outlined"
              type="submit"
              size="large"
            >
              Sign In
            </v-btn>
          </v-form>
        </v-card>
        <social-oauth />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import router from "@/router";

const authStore = useAuthStore();

const loading = ref(false);
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
  loading.value = true;
  try {
    console.log(form.value);
    await authStore.signup(form.value);
    await authStore.getUser();
    router.push("/");
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function required(v: string) {
  return !!v || "Field is required";
}
</script>
