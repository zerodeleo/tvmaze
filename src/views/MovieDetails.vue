<!-- MovieDetails.vue -->
<template>
  <div v-if="movie">
    <h1>{{ movie.title }}</h1>
    <p>{{ movie.description }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  movie: Object
})
</script>
