<template>
  <div v-if="post">
    <v-card color="gray" class="my-5 pa-2">
      <v-row>
        <v-col>
          <div>post id: {{ post.id }}</div>

          <b class="my-3">{{ post.user?.username }}</b>
        </v-col>

        <v-col>
          <div>{{ post.likes_count }} likes</div>
          <v-btn
            @click="performReaction(post, 1)"
            size="small"
            :icon="
              post.current_user_reaction?.type === 1
                ? 'mdi-cards-heart'
                : 'mdi-cards-heart-outline'
            "
          >
          </v-btn>
        </v-col>

        <v-col>
          <div>{{ post.dislikes_count }} dislikes</div>
          <v-btn
            @click="performReaction(post, -1)"
            size="small"
            class="ml-2"
            :icon="
              post.current_user_reaction?.type === -1
                ? 'mdi-thumb-down'
                : 'mdi-thumb-down-outline'
            "
          ></v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div v-html="post.content" class="mb-3"></div>
        </v-col>
      </v-row>

      <!-- Comments -->
      <v-divider></v-divider>
      <v-col>
        <div class="mb-2">
          {{ post.comments?.data.length }} comments to post
        </div>

        <v-textarea rows="1" v-model="commentContent"></v-textarea>
        <v-btn @click="createCommentToPost(post)" block class="mb-5">
          create comment
        </v-btn>

        <comment v-for="comment in post.comments.data" :comment="comment" />

        <v-btn
          v-if="post.comments.links.next"
          variant="outlined"
          size="small"
          @click="loadCommentsToPost(post)"
          block
          class="mb-5"
        >
          load more comments
        </v-btn>
      </v-col>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";

const authStore = useAuthStore();

const commentContent = ref("");

defineProps({
  post: Object,
});

async function performReaction(post: Post, reactionType: number) {
  const currentUser = authStore.user;

  if (!currentUser) {
    // Redirect to auth
    console.log("User not authenticated");
    return;
  }

  try {
    const { data } = await api.post(`perform_reaction_to/post/${post.id}`, {
      user_id: currentUser.id,
      type: reactionType,
    });

    post.current_user_reaction = data;
    // ! update post reactions count
  } catch (e) {
    console.error("Failed to perform reaction:", e);
    throw e;
  }
}

async function loadCommentsToPost(post: object) {
  if (!post.comments.links.next) return;

  try {
    const { data } = await api.get(post.comments.links.next);

    post.comments.data = [...post.comments.data, ...data.data];
    post.comments.links = data.links;
    post.comments.meta = data.meta;
  } catch (e) {
    console.error("Failed to perform reaction:", e);
    throw e;
  }
}

async function createCommentToPost(post: number) {
  const { data } = await api.post("comments", {
    post_id: post.id,
    content: commentContent.value,
  });

  post.comments.data = [data, ...post.comments.data];
  commentContent.value = "";
}
</script>
