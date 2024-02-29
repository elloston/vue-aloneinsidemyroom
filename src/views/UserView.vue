<script setup lang="ts">
import api from "@/api";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const user = ref();

const route = useRoute();

onMounted(async () => {
  const { data } = await api.get(`user/${route.params.username}`);
  user.value = data;
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-if="user" cols="12" lg="6">
        <img v-if="user.avatar" :src="user.avatar" alt="" />
        <div>Username: {{ user.username }}</div>
        <div>Name: {{ user.name }}</div>
        <div>Number of posts published:</div>
      </v-col>
    </v-row>
  </v-container>
</template>
