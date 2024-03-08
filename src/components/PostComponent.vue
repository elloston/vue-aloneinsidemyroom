<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { ref, provide } from "vue";
import api from "@/api";
import router from "@/router";

const authStore = useAuthStore();

const commenting = ref(false);
const loadingComments = ref(false);
const editablePost = ref({});

const props = defineProps({
  post: Object,
});

provide("postId", props.post.id);

async function loadCommentsToPost(post) {
  if (!post.comments.links.next) return;

  try {
    loadingComments.value = true;
    const { data } = await api.get(post.comments.links.next);

    post.comments.data = [...post.comments.data, ...data.data];
    post.comments.links = data.links;
    post.comments.meta = data.meta;
  } catch (e) {
    console.error("Failed to perform reaction:", e);
    throw e;
  } finally {
    loadingComments.value = false;
  }
}
// Commenting post
async function createCommentToPost(post) {
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  try {
    commenting.value = true;

    const { data } = await api.post("comments", {
      post_id: post.id,
      content: post.comments.new.content,
    });
    post.comments.data = [data, ...post.comments.data];
    post.comments.new = null;
  } catch (e) {
    console.error(e);
  } finally {
    commenting.value = false;
  }
}
function newCommentToPost(post) {
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  post.comments.new = { content: "", post_id: post.id };
}
function cancelCommentToPost(post) {
  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  post.comments.new = null;
}
</script>

<template>
  <div v-if="post">
    <v-card class="mb-8 pa-4">
      <div class="d-flex justify-start">
        <div class="mr-2">
          <v-avatar>
            <v-img
              v-if="post.user.avatar"
              :src="`http://localhost:8080/storage/${post.user.avatar}`"
            ></v-img>
            <v-icon v-else icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </div>

        <div class="w-100">
          <!-- User -->
          <div class="mb-2">
            <author-link :user="post.user" />

            <div class="d-flex">
              <created-date
                :date="post.created_at"
                :link="`/posts/${post.id}`"
              />

              <v-btn
                v-if="post.user.id == authStore.user?.id"
                size="x-small"
                variant="text"
                class="ml-2"
                @click="router.push(`/posts/editor/${post.id}`)"
              >
                <v-icon icon="mdi-pencil-outline"></v-icon>
              </v-btn>
            </div>
          </div>
          <!-- Content -->
          <div v-html="post.content" class="mb-2"></div>

          <!-- Reactions -->
          <div class="d-flex mb-2">
            <reactions-component :reactable="post" reactableType="post" />
          </div>

          <v-divider class="mb-2"></v-divider>

          <!-- Comments -->
          <div class="w-100">
            <div class="text-caption text-start mb-2">
              {{ post.comments?.data.length }} comments
            </div>
            <!-- New Comment -->
            <div>
              <div v-if="!post.comments.new">
                <v-btn
                  @click="newCommentToPost(post)"
                  size="small"
                  variant="text"
                  color="primary"
                  block
                  class="text-caption mb-4"
                >
                  Leave a comment
                </v-btn>
              </div>

              <div v-else>
                <v-textarea
                  class="mb-2"
                  block
                  hide-details
                  rows="1"
                  variant="outlined"
                  color="primary"
                  v-model="post.comments.new.content"
                ></v-textarea>

                <div class="d-flex justify-end">
                  <v-btn
                    @click="cancelCommentToPost(post)"
                    :disabled="commenting"
                    size="small"
                    rounded="pill"
                    variant="text"
                    class="text-caption"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    @click="createCommentToPost(post)"
                    :disabled="commenting"
                    :loading="commenting"
                    size="small"
                    rounded="pill"
                    variant="text"
                    color="primary"
                    class="text-caption"
                  >
                    Comment
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
          <!-- Comments list -->
          <div>
            <comment-component
              v-for="comment in post.comments.data"
              :comment="comment"
            />

            <v-btn
              v-if="post.comments.links.next"
              :disabled="loadingComments"
              :loading="loadingComments"
              variant="tonal"
              color="primary"
              size="small"
              @click="loadCommentsToPost(post)"
              block
              class="text-body-2"
            >
              More comments
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>
