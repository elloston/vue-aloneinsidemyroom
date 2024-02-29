<script setup lang="ts">
import { usePostsStore } from "@/stores/postsStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

const postStore = usePostsStore();
const route = useRoute();
const post = ref();

onMounted(async () => {
  post.value = await postStore.getById(route.params.id);
});
</script>

<template>
  <div>
    <v-container>
      <v-row class="justify-center">
        <v-col cols="12" lg="8">
          <v-card v-if="post">
            <post-component :post="post" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
