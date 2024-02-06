<template>
  <div v-for="movie in movies" class="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/5 flex" :key="movie.id">
    <MovieItem :movie="movie" />
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/interface/tvmaze'
import MovieItem from '@components/MovieItem.vue'

const { movies } = defineProps<{ movies: Movie[] }>()
</script>
