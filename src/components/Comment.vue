<template>
  <div>
    <v-row v-if="comment">
      <v-col cols="auto" class="pr-0">
        <v-avatar color="">
          <v-icon icon="mdi-account-circle"></v-icon>
        </v-avatar>
      </v-col>

      <v-col>
        <!-- User -->
        <div class="d-flex">
          <b>{{ comment.user?.username }}</b>
          <div class="ml-4">
            {{ $dateFormat(comment.created_at) }}
          </div>
        </div>
        <!-- Content -->
        <div class="d-flex mb-2">
          <div>{{ comment.content }}</div>
        </div>
        <!-- Reactions -->
        <div class="d-flex mb-2">
          <reactions :reactable="comment" reactableType="comment" />
          <div>
            <v-btn
              @click="newReply(comment)"
              size="small"
              variant="text"
              block
              rounded="pill"
              class="ml-2"
            >
              reply
            </v-btn>
          </div>
        </div>
        <!--Comment Replies -->
        <div class="mb-2">
          <!-- New Comment -->
          <div class="pb-4">
            <div v-if="!comment.replies.new">
              <v-divider class="mb-2"></v-divider>
            </div>

            <div v-else>
              <v-textarea
                class="mb-2"
                block
                rounded="lg"
                hide-details
                rows="1"
                no-resize
                variant="outlined"
                v-model="comment.replies.new.content"
              ></v-textarea>

              <div class="d-flex justify-end">
                <v-btn
                  @click="cancelReply(comment)"
                  size="small"
                  rounded="pill"
                  class="ml-2"
                  variant="text"
                >
                  cancel
                </v-btn>
                <v-btn
                  @click="createReply(comment)"
                  size="small"
                  rounded="pill"
                  class="ml-2"
                  variant="text"
                  color="primary"
                >
                  reply
                </v-btn>
              </div>
            </div>
          </div>

          <reply v-for="reply in comment.replies.data" :reply="reply" />

          <v-btn
            v-if="comment.replies?.links?.next"
            variant="text"
            color="primary"
            rounded="pill"
            size="small"
            @click="getReplies(comment)"
            block
          >
            <div>{{ comment.replies?.meta?.total }} replies</div>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-divider class="mb-4"></v-divider>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";
import router from "@/router";

const authStore = useAuthStore();

defineProps({
  comment: Object,
});

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

async function createReply(comment: object) {
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  const { data } = await api.post("replies", {
    comment_id: comment.id,
    content: comment.replies.new.content,
  });

  comment.replies.data = [data, ...comment.replies.data];
  comment.replies.new = null;
}

function newReply(comment: object) {
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  comment.replies.new = { content: "", comment_id: comment.id };
}
function cancelReply(comment: object) {
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  comment.replies.new = null;
}
</script>
