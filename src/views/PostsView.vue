<script setup lang="ts">
import { usePostsStore } from "@/stores/postsStore";
import { useAuthStore } from "@/stores/authStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { ref, onMounted, watch } from "vue";
import router from "@/router";

const postsStore = usePostsStore();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();

const loadingPosts = ref(false);

async function loadMorePosts() {
  if (!postsStore.posts) return;

  try {
    loadingPosts.value = true;
    await postsStore.get(postsStore.posts.links.next);
  } catch (e) {
    console.error(e);
  } finally {
    loadingPosts.value = false;
  }
}
async function newPost() {
  if (!authStore.user) {
    router.push("/signin");
    return;
  } else {
    router.push("/posts/editor");
  }
}

onMounted(async () => {
  try {
    loadingStore.setLoading(true);
    await postsStore.get(null);
  } catch (e) {
    console.error(e);
  } finally {
    loadingStore.setLoading(false);
  }
});
</script>

<template>
  <v-container>
    <v-row class="py-10 justify-center">
      <v-col cols="12" sm="11" md="10" lg="8">
        <h1 class="text-h5 text-md-h4 font-weight-medium mb-4">
          Alone Inside My Room
        </h1>
        <!-- New post -->
        <div class="mb-8">
          <v-btn @click="newPost" block color="primary" class="text-body-1">
            New post
          </v-btn>
        </div>
        <!-- Posts -->
        <post-component v-for="post in postsStore.posts?.data" :post="post" />
        <!-- Load more button -->
        <v-btn
          v-if="postsStore.posts?.links?.next"
          @click="loadMorePosts()"
          block
          variant="tonal"
          color="primary"
          class="mb-8 text-body-1"
          :loading="loadingPosts"
          :disabled="loadingPosts"
          >More posts</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
