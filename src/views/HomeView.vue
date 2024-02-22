<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Home</h1>
        <quill-editor v-model="editorContent" />
        <v-btn @click="onSubmit"> send </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import QuillEditor from "@/components/QuillEditor.vue";

const editorContent = ref();

function onSubmit() {
  console.log(editorContent.value);
}
</script>
