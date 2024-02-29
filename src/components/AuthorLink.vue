<script setup lang="ts">
defineProps({
  user: Object,
});
</script>

<template>
  <router-link v-if="user" :to="`/users/${user.username}`" class="author-link">
    <div class="text-body-2 font-weight-medium">@{{ user.username }}</div>
  </router-link>
</template>

<style>
.author-link {
  text-decoration: none;
  color: inherit;
}
</style>
