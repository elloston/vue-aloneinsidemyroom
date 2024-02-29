<template>
  <div>
    <v-btn
      @click="performReaction(reactable, 1, reactableType)"
      size="x-small"
      rounded="pill"
      variant="text"
    >
      <v-icon
        :color="reactable.current_user_reaction?.type === 1 ? 'red' : 'default'"
        :icon="
          reactable.current_user_reaction?.type === 1
            ? 'mdi-cards-heart'
            : 'mdi-cards-heart-outline'
        "
      ></v-icon>
      <div class="ml-2">{{ reactable.likes_count }}</div>
    </v-btn>
    <v-btn
      @click="performReaction(reactable, -1, reactableType)"
      size="x-small"
      rounded="pill"
      variant="text"
    >
      <v-icon
        :icon="
          reactable.current_user_reaction?.type === -1
            ? 'mdi-thumb-down'
            : 'mdi-thumb-down-outline'
        "
      ></v-icon>
      <div class="ml-2">{{ reactable.dislikes_count }}</div>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";
import router from "@/router";

const authStore = useAuthStore();

defineProps({
  reactable: Object,
  reactableType: String,
});

async function performReaction(
  reactable: object,
  reactionType: number,
  reactableType: string
) {
  const currentUser = authStore.user;

  if (!currentUser) {
    // Redirect to auth
    router.push("/signin");
    return;
  }

  try {
    const { data } = await api.post(
      `perform_reaction_to/${reactableType}/${reactable.id}`,
      {
        user_id: currentUser.id,
        type: reactionType,
      }
    );

    reactable.current_user_reaction = data.current_user_reaction;
    reactable.likes_count = data.likes_count;
    reactable.dislikes_count = data.dislikes_count;
  } catch (e) {
    console.error("Failed to perform reaction:", e);
    throw e;
  }
}
</script>
