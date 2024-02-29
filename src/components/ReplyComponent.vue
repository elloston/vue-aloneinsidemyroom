<script setup lang="ts">
import { inject } from "vue";
const postId = inject("postId");

defineProps({
  reply: Object,
});
</script>

<template>
  <v-row v-if="reply">
    <v-col cols="auto" class="px-0">
      <v-avatar>
        <v-icon icon="mdi-account-circle"></v-icon>
      </v-avatar>
    </v-col>

    <v-col class="px-0">
      <!-- User -->
      <div class="mb-2">
        <author-link :user="reply.user" />

        <created-date
          :date="reply.created_at"
          :link="`/posts/${postId}?reply=${reply.id}`"
        />
      </div>
      <!-- Content -->
      <div class="d-flex">
        <div>{{ reply.content }}</div>
      </div>
      <!-- Reactions -->
      <div class="d-flex">
        <reactions-component :reactable="reply" reactableType="reply" />
      </div>
    </v-col>
  </v-row>
</template>
