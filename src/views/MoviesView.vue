<template>
  <body v-if="data">
    <!-- <p>{{ currentPage }}</p>
    <p>{{ totalPages }}</p>
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous Page</button>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next Page</button> -->
    <ControlBar />
    <div v-if="groupedMovies.length !== 0">
      <div v-for="(groupedMovie, index) in groupedMovies" :key="index">
        <p>{{groupedMovie[0]}}</p>
        <div class="flex overflow-x-scroll">
          <MovieListHorisontal :movies="(groupedMovie[1] as Movie[])" />
        </div>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getMovies } from '@/api/tvmaze'
import type { Movie } from '@/interface/tvmaze'
import { computed, provide, ref, watch } from 'vue'
import * as utils from '@/utils'
import MovieListHorisontal from '@/components/MovieListHorisontal.vue'
import ControlBar from '@/components/ControlBar.vue'
import { type GroupKey, type SortKey } from '@/interface'

const movies = ref<Movie[]>([])
const page = ref(1)
const selectedGenre = ref('')
const selectedRating = ref(0)
const sortKey = ref<SortKey>('ratings-desc')
const groupKey = ref<GroupKey>('genres')

const genres = computed<string[]>(() =>
  utils.getValuesByKey(data.value ? data.value : null, 'genres')
)
const filteredByGenre = computed<Movie[]>(() =>
  utils.filterByGenre(movies.value, selectedGenre.value)
)
const filterByRating = computed<Movie[]>(() =>
  utils.filterByRating(selectedRating.value, filteredByGenre.value)
)
const sortMovies = computed<Movie[]>(() => utils.sortMovies(filterByRating.value, sortKey.value))
const groupedMovies = computed(() => utils.group(sortMovies.value, groupKey.value))

const { isLoading, isError, data, error } = useQuery<Movie[]>({
  queryKey: ['movies', page],
  queryFn: () => getMovies(page.value)
})

watch(data, () => {
  if (data.value) {
    movies.value = movies.value.concat(data.value)
  }
})

provide('genres', genres)
provide('selectedGenre', selectedGenre)
provide('selectedRating', selectedRating)
provide('sortKey', sortKey)
provide('groupKey', groupKey)
</script>
