<template>
    <h2>Is this what you're looking for?</h2>
    <h1 class="text-center my-6">{{ searchedMovie.name }}</h1>
    <div class="mb-20 text-center">
        <MovieItem :movie="searchedMovie" />
    </div>
    <h4 v-if="groupedMoviesArraylength > 0">
        Alternatively, here are other shows that match your search for "<span class="text-custom-200">{{
            searchQuery
        }}</span>".
    </h4>
</template>
<script setup lang="ts">
import { type Movie } from '@/interface/tvmaze'
import MovieItem from '@/components/MovieItem.vue'
import { inject, ref } from 'vue';

const { searchedMovie, groupedMoviesArraylength } = defineProps<{
    searchedMovie: Movie
    groupedMoviesArraylength: number
}>()

const searchQuery = inject('searchQuery', ref(''))
</script>
