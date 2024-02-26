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
        <div class="text-body-2 font-weight-medium">
          @{{ reply.user?.username }}
        </div>
        <div class="font-weight-light text-caption">
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
