<template>
  <v-container>
    <v-row justify="end">
      <v-col>
        <h1 class="mb-5">Room</h1>
        <!-- New post -->
        <div class="pb-5">
          <quill-editor v-model="newPostContent" />
          <v-btn @click="createPost" block class="my-2"> create post </v-btn>
        </div>
        <!-- Posts -->
        <post v-for="post in postsStore.posts?.data" :post="post" />
        <!-- Load more button -->
        <v-btn
          v-if="postsStore.posts?.links?.next"
          @click="postsStore.get(postsStore.posts.links.next)"
          block
          class="my-2"
          >load more posts</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePostsStore } from "@/stores/postsStore";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const postsStore = usePostsStore();
const newPostContent = ref();

async function createPost() {
  await postsStore.create(newPostContent.value);
}

onMounted(async () => {
  try {
    await authStore.getUser();
    await postsStore.get(null);
  } catch (e) {
    console.error(e);
  }
});
</script>
