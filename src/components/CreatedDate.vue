<script setup lang="ts">
defineProps({
  date: String,
  link: String,
});
</script>

<template>
  <v-btn
    v-if="link"
    :to="link"
    variant="text"
    size="x-small"
    color="primary"
    class="font-weight-light text-caption px-0"
  >
    {{ $dateFormat(date) }}
  </v-btn>

  <div v-else>
    {{ $dateFormat(date) }}
  </div>
</template>

<style>
.created-date-link {
  text-decoration: none;
}

.dark-theme .created-date-link {
  color: #fff;
}

.light-theme .created-date-link {
  color: #000;
}
</style>
