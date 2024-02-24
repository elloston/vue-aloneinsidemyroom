<template>
  <div v-if="reply">
    <v-row>
      <v-col class="pb-0">
        <div>reply id: {{ reply.id }}</div>
      </v-col>

      <v-col>
        <div>{{ reply.likes_count }} likes</div>
        <v-btn
          @click="performReaction(reply, 1)"
          size="small"
          :icon="
            reply.current_user_reaction?.type === 1
              ? 'mdi-cards-heart'
              : 'mdi-cards-heart-outline'
          "
        >
        </v-btn>
      </v-col>

      <v-col>
        <div>{{ reply.dislikes_count }} dislikes</div>
        <v-btn
          @click="performReaction(reply, -1)"
          size="small"
          class="ml-2"
          :icon="
            reply.current_user_reaction?.type === -1
              ? 'mdi-thumb-down'
              : 'mdi-thumb-down-outline'
          "
        ></v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div>{{ reply.content }}</div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";

const authStore = useAuthStore();

defineProps({
  reply: Object,
});

async function performReaction(reply: object, reactionType: number) {
  const currentUser = authStore.user;

  if (!currentUser) {
    // Redirect to auth
    console.log("User not authenticated");
    return;
  }

  try {
    const { data } = await api.post(`perform_reaction_to/reply/${reply.id}`, {
      user_id: currentUser.id,
      type: reactionType,
    });

    reply.current_user_reaction = data;
    // ! update reply reactions count
  } catch (e) {
    console.error("Failed to perform reaction:", e);
    throw e;
  }
}
</script>
