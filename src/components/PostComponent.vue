<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { ref, provide } from "vue";
import api from "@/api";
import router from "@/router";
import { useAppStore } from "@/stores/appStore";

const authStore = useAuthStore();

const commenting = ref(false);
const loadingComments = ref(false);
const appStore = useAppStore();

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
    <div class="mb-8 py-4" rounded="lg">
      <div class="d-flex justify-start">
        <div class="mr-2">
          <v-avatar size="30px">
            <v-img
              v-if="post.user.avatar"
              :src="appStore.storeUrl + post.user.avatar"
            ></v-img>
            <v-icon v-else icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </div>

        <v-col class="w-100 post-content-scrollable">
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
          <div v-html="post.content" class="mb-4"></div>

          <!-- Reactions -->
          <div class="d-flex mb-4">
            <div>
              <reactions-component :reactable="post" reactableType="post" />
            </div>

            <div>
              <v-btn
                @click="newCommentToPost(post)"
                size="x-small"
                variant="text"
                rounded="pill"
                color="primary"
                class="text-caption ml-2"
              >
                Leave a comment
              </v-btn>
            </div>
          </div>

          <div class="w-100">
            <!-- New Comment -->
            <div>
              <div v-if="!post.comments.new"></div>

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
              v-for="(comment, index) in post.comments.data"
              :key="index"
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
              <div class="text-caption text-start ml-2">
                {{ post.comments?.meta.total - post.comments.data.length }}
                comments
              </div>
            </v-btn>
          </div>
        </v-col>
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<style>
.post-content-scrollable {
  overflow: scroll;
  word-wrap: normal;
}
</style>
