<template>
  <div v-if="comment">
    <v-row>
      <v-col class="pb-0">
        <div>comment id: {{ comment.id }}</div>
      </v-col>

      <v-col>
        <div>{{ comment.likes_count }} likes</div>
        <v-btn
          @click="performReaction(comment, 1)"
          size="small"
          :icon="
            comment.current_user_reaction?.type === 1
              ? 'mdi-cards-heart'
              : 'mdi-cards-heart-outline'
          "
        >
        </v-btn>
      </v-col>

      <v-col>
        <div>{{ comment.dislikes_count }} dislikes</div>
        <v-btn
          @click="performReaction(comment, -1)"
          size="small"
          class="ml-2"
          :icon="
            comment.current_user_reaction?.type === -1
              ? 'mdi-thumb-down'
              : 'mdi-thumb-down-outline'
          "
        ></v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div>{{ comment.content }}</div>
      </v-col>
    </v-row>

    <!--Comment Replies -->

    <v-textarea
      variant="outlined"
      no-resize
      rows="1"
      v-model="replyContent"
    ></v-textarea>
    <v-btn @click="createReply(comment)" block class="mb-5">
      create reply
    </v-btn>

    <div>{{ comment.replies?.meta?.total }} replies</div>

    <reply v-for="reply in comment.replies.data" :reply="reply" />

    <v-btn
      v-if="comment.replies?.links?.next"
      variant="outlined"
      size="small"
      @click="getReplies(comment)"
      block
      class="mb-5"
    >
      load replies
    </v-btn>

    <!-- <div>
      <div class="mb-2">replies to comment</div>



      <v-btn
        v-if="comment.replies.links.next"
        variant="outlined"
        size="small"
        @click="getReplies(comment)"
        block
        class="mb-5"
      >
        load more replies
      </v-btn>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";

const authStore = useAuthStore();

const replyContent = ref();

defineProps({
  comment: Object,
});

async function performReaction(comment: Comment, reactionType: number) {
  const currentUser = authStore.user;

  if (!currentUser) {
    // Redirect to auth
    console.log("User not authenticated");
    return;
  }

  try {
    const { data } = await api.post(
      `perform_reaction_to/comment/${comment.id}`,
      {
        user_id: currentUser.id,
        type: reactionType,
      }
    );

    comment.current_user_reaction = data;
    // ! update comment reactions count
  } catch (e) {
    console.error("Failed to perform reaction:", e);
    throw e;
  }
}

async function getReplies(comment: object) {
  if (!comment.replies.links.next) return;

  try {
    const { data } = await api.get(comment.replies.links.next);

    comment.replies.data = [...comment.replies.data, ...data.data];
    comment.replies.links = data.links;
    comment.replies.meta = data.meta;
  } catch (e) {
    console.error("Failed to perform reaction:", e);
    throw e;
  }
}

async function createReply(comment: number) {
  const { data } = await api.post("replies", {
    comment_id: comment.id,
    content: replyContent.value,
  });

  comment.replies.data = [data, ...comment.replies.data];
  replyContent.value = "";
}
</script>
