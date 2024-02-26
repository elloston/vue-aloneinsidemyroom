<template>
  <div>
    <div class="d-flex justify-start" v-if="comment">
      <div class="pr-2">
        <v-icon icon="mdi-account-circle"></v-icon>
      </div>

      <div class="w-100">
        <!-- User -->
        <div class="mb-2">
          <div class="text-body-2 font-weight-medium">
            @{{ comment.user?.username }}
          </div>
          <div class="font-weight-light text-caption">
            {{ $dateFormat(comment.created_at) }}
          </div>
        </div>
        <!-- Content -->
        <div class="d-flex mb-2">
          <div>{{ comment.content }}</div>
        </div>
        <!-- Reactions -->
        <div class="d-flex justify-start align-center mb-2">
          <reactions :reactable="comment" reactableType="comment" />
          <div>
            <v-btn
              @click="newReply(comment)"
              size="x-small"
              variant="text"
              block
              rounded="pill"
              class="text-caption"
            >
              Reply
            </v-btn>
          </div>
        </div>
        <!--Comment Replies -->
        <div class="mb-2">
          <!-- New Comment -->

          <div v-if="!comment.replies.new"></div>

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
                :disabled="replying"
                size="small"
                rounded="pill"
                variant="text"
                class="text-caption"
              >
                Cancel
              </v-btn>
              <v-btn
                @click="createReply(comment)"
                :disabled="replying"
                :loading="replying"
                size="small"
                rounded="pill"
                class="text-caption"
                variant="text"
                color="primary"
              >
                Reply
              </v-btn>
            </div>
          </div>

          <reply v-for="reply in comment.replies.data" :reply="reply" />

          <v-btn
            v-if="comment.replies?.links?.next"
            @click="getReplies(comment)"
            :loading="loadingReplies"
            :disabled="loadingReplies"
            variant="text"
            color="primary"
            size="small"
            block
          >
            <div class="text-body-2">
              {{ comment.replies?.meta?.total }} replies
            </div>
          </v-btn>
        </div>
      </div>
    </div>
    <v-divider class="mb-4"></v-divider>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { ref } from "vue";
import api from "@/api";
import router from "@/router";

const authStore = useAuthStore();
const loadingStore = useLoadingStore();

const replying = ref(false);
const loadingReplies = ref(false);

defineProps({
  comment: Object,
});

async function getReplies(comment) {
  if (!comment.replies.links.next) return;

  try {
    loadingReplies.value = true;

    const { data } = await api.get(comment.replies.links.next);
    comment.replies.data = [...comment.replies.data, ...data.data];
    comment.replies.links = data.links;
    comment.replies.meta = data.meta;
  } catch (e) {
    console.error("Failed to reply:", e);
    throw e;
  } finally {
    loadingReplies.value = false;
  }
}

async function createReply(comment) {
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  try {
    replying.value = true;

    const { data } = await api.post("replies", {
      comment_id: comment.id,
      content: comment.replies.new.content,
    });
    comment.replies.data = [data, ...comment.replies.data];
    comment.replies.new = null;
  } catch (e) {
    console.error(e);
  } finally {
    replying.value = false;
  }
}

function newReply(comment) {
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  comment.replies.new = { content: "", comment_id: comment.id };
}
function cancelReply(comment) {
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  comment.replies.new = null;
}
</script>
