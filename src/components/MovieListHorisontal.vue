<template>
    <div class="flex flex-row" v-for="movie in movies" :key="movie.id">
        <MovieItem :movie="movie" />
    </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/interface/tvmaze'
import MovieItem from './MovieItem.vue'

const { movies } = defineProps<{ movies: Movie[] }>()
</script>
