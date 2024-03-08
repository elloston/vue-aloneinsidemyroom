<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostsStore } from "@/stores/postsStore";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const postStore = usePostsStore();
const route = useRoute();
const router = useRouter();

const editablePost = ref();
const quillInstance = ref();
const savingPost = ref(false);

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  ["link", "code-block"],
  [{ align: [] }],
  ["clean"],
];

async function savePost() {
  try {
    savingPost.value = true;

    const htmlContent = quillInstance.value.root.innerHTML;

    if (editablePost.value.id) {
      await postStore.update(editablePost.value.id, htmlContent);
    } else {
      await postStore.create(htmlContent);
    }

    localStorage.setItem("new_post_content", "");

    router.push("/");
  } catch (e) {
    console.error(e);
  } finally {
    savingPost.value = false;
  }
}

function initQuill() {
  quillInstance.value = new Quill("#editor", {
    placeholder: "Say this...",
    theme: "snow",
    modules: {
      toolbar: toolbarOptions,
    },
  });

  const initialContent =
    editablePost.value.content ||
    localStorage.getItem("new_post_content") ||
    "";

  quillInstance.value.root.innerHTML = initialContent;

  quillInstance.value.on("text-change", () => {
    const htmlContent = quillInstance.value.root.innerHTML;
    localStorage.setItem("new_post_content", htmlContent);
  });
}

onMounted(async () => {
  if (route.params.id) {
    editablePost.value = await postStore.getById(route.params.id);
  } else {
    editablePost.value = {
      id: 0,
    };
  }

  initQuill();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <div id="toolbar"></div>
        <div id="editor"></div>

        <div class="d-flex justify-center">
          <v-btn @click="savePost" :loading="savingPost" class="mt-2">{{
            editablePost?.id ? "Save changes" : "Publish"
          }}</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.ql-bubble .ql-tooltip {
  z-index: 10000 !important;
}

.ql-container {
  font-size: 18px;
  height: 500px;
}

.ql-snow .ql-editor.ql-blank::before {
  color: #999;
}
</style>
