<template>
  <div>
    <div v-if="authStore.user">
      <v-menu v-model="menu" :close-on-content-click="false" location="end">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text" rounded="lg">
            <v-avatar>
              <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-card class="pa-2" rounded="lg">
          <v-list>
            <v-list-item
              :title="authStore.user.name"
              :subtitle="`@${authStore.user.username}`"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-account-circle"></v-icon>
              </template>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact">
            <v-list-item
              v-for="item in menuList"
              :value="item"
              color="primary"
              :to="item.path"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>

              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>

    <div v-else>
      <v-btn to="/signup" rounded="pill">Sign Up</v-btn>
      <v-btn to="/signin" variant="outlined" rounded="pill" class="ml-2"
        >Sign In</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

const menu = ref(false);

const menuList = ref([
  // { icon: "mdi-account", text: "Account", path: "/account" },
  { icon: "mdi-account", text: "Sign Out", path: "/signout" },
]);
</script>
