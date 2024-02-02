<template>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <ul v-else-if="data">
    <p>{{ currentPage }}</p>
    <p>{{ totalPages }}</p>
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous Page</button>
    <button @click="goToPage(currentPage + 1)">Next Page</button>
    <li v-for="movie in paginatedData" :key="movie.id">{{ movie.name }}</li>
  </ul>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getMovies } from '@/api/tvmaze'
import type { Movies } from '@/interface/tvmaze'
import { computed, ref } from 'vue';

const getStartIndex = () => (currentPage.value - 1) * moviesPerPage.value;
const getEndIndex = () => startIndex.value + moviesPerPage.value;
const getPaginatedData = () => data.value!.slice(startIndex.value, endIndex.value)
const getTotalPages = () => Math.ceil(data.value!.length / moviesPerPage.value)

const page = ref(1);
const moviesPerPage = ref(10);
const totalPages = computed(getTotalPages)
const currentPage = ref(24);
const startIndex = computed(getStartIndex);
const endIndex = computed(getEndIndex);
const paginatedData = computed<Movies>(getPaginatedData);

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['movies', page],
  queryFn: () => getMovies(page.value),
});

const goToPage = (p: number) => {
  currentPage.value = p;
  if (currentPage.value === totalPages.value) {
    currentPage.value = 1;
    page.value += 1;
  }
}

</script>
