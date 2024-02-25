<template>
  <v-container>
    <v-row justify="center" align="center" class="h-screen">
      <v-col cols="12" sm="8" md="5">
        <h1 class="text-blue-grey-lighten-3 font-weight-light text-h4 mb-3">
          Sign In
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
              :readonly="loadingStore.loading"
              :rules="[required]"
              id="email"
              type="email"
              class="mb-4"
              label="Email"
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
              label="Password"
              placeholder="Enter your password"
              color="primary"
              variant="outlined"
            ></v-text-field>

            <v-btn
              :disabled="!checkForm"
              :loading="loadingStore.loading"
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
import { useLoadingStore } from "@/stores/loadingStore";
import router from "@/router";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();

const checkForm = ref(false);
const form = ref({
  email: "",
  password: "",
});

async function onSubmit() {
  if (!checkForm.value) return;
  loadingStore.setLoading(true);
  try {
    await authStore.signin(form.value);
    await authStore.getUser();
    router.push("/");
  } catch (e) {
    console.error(e);
  } finally {
    loadingStore.setLoading(false);
  }
}

function required(v: string) {
  return !!v || "Field is required";
}
</script>
