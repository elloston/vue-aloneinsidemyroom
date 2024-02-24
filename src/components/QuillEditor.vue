<template>
  <v-card class="mb-2">
    <div id="editor"></div>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Quill from "quill";
import "quill/dist/quill.bubble.css";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const quillInstance = ref();

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  ["link", "image", "video", "code-block"], // add's image support
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }], // text align

  ["clean"], // remove formatting button
];

onMounted(() => {
  quillInstance.value = new Quill("#editor", {
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder: "Compose an epic...",
    theme: "bubble",
  });

  quillInstance.value.on("text-change", () => {
    emit("update:modelValue", quillInstance.value.root.innerHTML);
  });
});
</script>

<style>
.ql-bubble .ql-tooltip {
  z-index: 10000;
}

.ql-editor {
  font-size: 18px;
}
</style>
