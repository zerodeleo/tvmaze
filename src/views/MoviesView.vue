<template>
  <body v-if="data">
    <!-- <p>{{ currentPage }}</p>
    <p>{{ totalPages }}</p>
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous Page</button>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next Page</button> -->
    <ControlBar />
    <div class="flex flex-wrap w-full px-1 md:px-4">
      <MovieList :movies="paginatedMovies" />
    </div>
  </body>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getMovies } from '@/api/tvmaze'
import type { Movie } from '@/interface/tvmaze'
import { computed, provide, ref, watch } from 'vue';
import * as utils from '@/utils';
import MovieList from '@/components/MovieList.vue';
import ControlBar from '@/components/ControlBar.vue';
import { type SortKey } from '@/interface';

const movies = ref<Movie[]>([]);
const page = ref(1);
const moviesPerPage = ref(50);
const currentPage = ref(1);
const selectedGenre = ref('');
const selectedRating = ref(0);
const sortKey = ref<SortKey>('ratings-desc')

const genres = computed<string[]>(() => utils.getValuesByKey('genres', data.value)?.sort((a, b) => a.localeCompare(b)))
const filteredByGenre = computed<Movie[]>(() => utils.filterByGenre(selectedGenre.value, movies.value))
const filterByRating = computed<Movie[]>(() => utils.filterByRating(selectedRating.value, filteredByGenre.value))
const sortMovies = computed<Movie[]>(() => utils.sortMovies(filterByRating.value, sortKey.value))
const paginatedMovies = computed(() => utils.getPaginatedData(sortMovies.value, startIndex.value, endIndex.value));
const startIndex = computed(() => utils.getStartIndex(currentPage.value, moviesPerPage.value));
const endIndex = computed(() => utils.getEndIndex(startIndex.value, moviesPerPage.value));
const totalPages = computed(() => utils.getTotalPages(sortMovies.value, moviesPerPage.value))

const { isLoading, isError, data, error } = useQuery<Movie[]>({
  queryKey: ['movies', page],
  queryFn: () => getMovies(page.value),
});


const goToPage = (p: number) => {
  currentPage.value = p;
  if (currentPage.value === totalPages.value) {
    page.value += 1;
  }
}

watch(data, () => {
  if (data.value) {
    movies.value = movies.value.concat(data.value);
  }
  if (page.value < 10) {
    page.value++
  }
})

const movieDetailsLink = (id: number, movie: Movie) => ({
  name: 'movie-details',
  params: { id },
  props: { movie },
});

provide('genres', genres);
provide('selectedGenre', selectedGenre);
provide('selectedRating', selectedRating);
provide('sortKey', sortKey);

</script>
