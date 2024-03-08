<script setup lang="ts">
import { inject } from "vue";
const postId = inject("postId");

defineProps({
  reply: Object,
});
</script>

<template>
  <div class="d-flex" v-if="reply">
    <div class="mr-2">
      <v-avatar>
        <v-img
          v-if="reply.user.avatar"
          :src="`http://localhost:8080/storage/${reply.user.avatar}`"
        ></v-img>
        <v-icon v-else icon="mdi-account-circle"></v-icon>
      </v-avatar>
    </div>

    <div>
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
    </div>
  </div>
</template>
