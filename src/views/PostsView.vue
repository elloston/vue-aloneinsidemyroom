<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <h1 class="mb-5">Room</h1>
        <!-- New post -->
        <div class="pb-5">
          <quill-editor v-model="newPostContent" />
          <v-btn @click="createPost" block class="my-2"> Publish </v-btn>
        </div>
        <!-- Posts -->
        <post v-for="post in postsStore.posts?.data" :post="post" />
        <!-- Load more button -->
        <v-btn
          v-if="postsStore.posts?.links?.next"
          @click="postsStore.get(postsStore.posts.links.next)"
          block
          variant="text"
          color="primary"
          class="my-2"
          >load more posts</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { usePostsStore } from "@/stores/postsStore";
import { useAuthStore } from "@/stores/authStore";
import router from "@/router";

const postsStore = usePostsStore();
const authStore = useAuthStore();
const newPostContent = ref(localStorage.getItem("new_post_content") || "");

async function createPost() {
  localStorage.setItem("new_post_content", newPostContent.value);

  if (!authStore.user) {
    router.push("/signin");
    return;
  }

  await postsStore.create(newPostContent.value);

  localStorage.setItem("new_post_content", "");
  newPostContent.value = "";
}

onMounted(async () => {
  try {
    await postsStore.get(null);
  } catch (e) {
    console.error(e);
  }
});

watch(newPostContent, (newValue) => {
  localStorage.setItem("new_post_content", newValue);
});
</script>
