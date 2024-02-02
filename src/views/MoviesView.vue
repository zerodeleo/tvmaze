<template>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <ul v-else-if="data">
      <li v-for="movie in data" :key="movie.id">{{ movie.name }}</li>
    </ul>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryKey } from '@tanstack/vue-query'
import { getMovies } from '@/api/tvmaze'
import type { Movies } from '@/interface/tvmaze'
import { ref } from 'vue';

const currentPage = ref(1);

const options: UseQueryOptions<Movies, Error, Movies, Movies, QueryKey> = {
  queryKey: ['movies'],
  queryFn: () => getMovies(currentPage.value),
};

const { isLoading, isError, data, error } = useQuery(options);

</script>
