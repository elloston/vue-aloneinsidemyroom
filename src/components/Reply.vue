<template>
  <v-row v-if="reply">
    <v-col cols="auto" class="pr-0">
      <v-avatar>
        <v-icon icon="mdi-account-circle"></v-icon>
      </v-avatar>
    </v-col>

    <v-col>
      <!-- User -->
      <div class="d-flex">
        <b>{{ reply.user?.username }}</b>
        <div class="ml-4">
          {{ $dateFormat(reply.created_at) }}
        </div>
      </div>
      <!-- Content -->
      <div class="d-flex">
        <div>{{ reply.content }}</div>
      </div>
      <!-- Reactions -->
      <div class="d-flex">
        <reactions :reactable="reply" reactableType="reply" />
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
defineProps({
  reply: Object,
});
</script>
