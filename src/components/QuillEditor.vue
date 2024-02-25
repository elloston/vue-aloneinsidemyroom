<template>
  <div class="mb-2">
    <div id="editor"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const quillInstance = ref();

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons

  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  ["link", "code-block"], // add's image support

  [{ align: [] }], // text align

  ["clean"], // remove formatting button
];

onMounted(() => {
  quillInstance.value = new Quill("#editor", {
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder: "Say this...",
    theme: "snow",
  });

  const initialContent =
    props.modelValue || localStorage.getItem("new_post_content") || "";
  quillInstance.value.root.innerHTML = initialContent;

  // Обработчик события изменения текста в редакторе
  quillInstance.value.on("text-change", () => {
    const htmlContent = quillInstance.value.root.innerHTML;
    emit("update:modelValue", htmlContent);
    localStorage.setItem("new_post_content", htmlContent); // Сохраняем изменения в localStorage
  });
});
</script>

<style>
.ql-bubble .ql-tooltip {
  z-index: 10000 !important;
}

.ql-editor {
  font-size: 18px;
  min-height: 100px;
}

.ql-snow .ql-editor.ql-blank::before {
  color: #999; /* Укажите нужный цвет */
}
</style>
