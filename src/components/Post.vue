<template>
  <div v-if="post">
    <v-card color="gray" class="my-5 pa-2">
      <v-row class="pb-4">
        <v-col cols="auto" class="pr-0">
          <v-avatar>
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </v-col>

        <v-col>
          <!-- User -->
          <div class="d-flex mb-2">
            <b>{{ post.user?.username }}</b>
            <div class="ml-4">
              {{ $dateFormat(post.created_at) }}
            </div>
          </div>
          <!-- Content -->
          <div class="d-flex mb-2">
            <div v-html="post.content" class="mb-3"></div>
          </div>
          <!-- Reactions -->
          <div class="d-flex mb-2">
            <reactions :reactable="post" reactableType="post" />
          </div>
          <!-- Comments -->
          <v-row>
            <v-col>
              <div>{{ post.comments?.data.length }} comments</div>
              <v-divider class="mb-2"></v-divider>
              <!-- New Comment -->
              <div class="pb-4">
                <div v-if="!post.comments.new">
                  <v-btn
                    @click="newCommentToPost(post)"
                    size="small"
                    variant="text"
                    color="primary"
                    block
                    class="ml-2"
                  >
                    Leave a comment
                  </v-btn>
                </div>

                <div v-else>
                  <v-textarea
                    class="mb-2"
                    block
                    rounded="lg"
                    hide-details
                    rows="1"
                    variant="outlined"
                    v-model="post.comments.new.content"
                  ></v-textarea>

                  <div class="d-flex justify-end">
                    <v-btn
                      @click="cancelCommentToPost(post)"
                      size="small"
                      rounded="pill"
                      class="ml-2"
                      variant="text"
                    >
                      cancel
                    </v-btn>
                    <v-btn
                      @click="createCommentToPost(post)"
                      size="small"
                      rounded="pill"
                      class="ml-2"
                      variant="text"
                      color="primary"
                    >
                      comment
                    </v-btn>
                  </div>
                </div>
              </div>

              <comment
                v-for="comment in post.comments.data"
                :comment="comment"
              />

              <v-btn
                v-if="post.comments.links.next"
                variant="text"
                color="primary"
                size="small"
                @click="loadCommentsToPost(post)"
                block
                class="mb-5"
              >
                load more comments
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";
import router from "@/router";

const authStore = useAuthStore();

defineProps({
  post: Object,
});

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
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  const { data } = await api.post("comments", {
    post_id: post.id,
    content: post.comments.new.content,
  });

  post.comments.data = [data, ...post.comments.data];
  post.comments.new = null;
}

function newCommentToPost(post: number) {
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  post.comments.new = { content: "", post_id: post.id };
}
function cancelCommentToPost(post: number) {
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  post.comments.new = null;
}
</script>
