<script setup lang="ts">
defineProps({
  date: String,
  link: String,
});
</script>

<template>
  <div class="font-weight-light text-caption">
    <router-link class="created-date-link" v-if="link" :to="link">
      <div>
        {{ $dateFormat(date) }}
      </div>
    </router-link>

    <div v-else>
      {{ $dateFormat(date) }}
    </div>
  </div>
</template>

<style>
.created-date-link {
  text-decoration: none;
}
</style>
