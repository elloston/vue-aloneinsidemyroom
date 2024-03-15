<script setup lang="ts">
import { usePostsStore } from "@/stores/postsStore";
import { useAuthStore } from "@/stores/authStore";
import { useAppStore } from "@/stores/appStore";
import { ref, onMounted } from "vue";
import router from "@/router";

const postsStore = usePostsStore();
const authStore = useAuthStore();
const appStore = useAppStore();

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
    appStore.setLoading(true);
    await postsStore.get(null);
  } catch (e) {
    console.error(e);
  } finally {
    appStore.setLoading(false);
  }
});
</script>

<template>
  <v-container>
    <v-row class="py-10 justify-center">
      <v-col cols="12" sm="9" md="7" lg="6">
        <h1 class="text-h5 text-md-h4 font-weight-medium mb-4">
          Alone Inside My Room
        </h1>
        <!-- New post -->
        <div class="mb-8">
          <v-btn
            @click="newPost"
            block
            color="primary"
            variant="tonal"
            rounded="lg"
            class="text-caption"
          >
            New post
          </v-btn>
        </div>
        <!-- Posts -->
        <post-component
          v-for="(post, index) in postsStore.posts?.data"
          :key="index"
          :post="post"
        />
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
