<template>
  <body v-if="infiniteData" @click="triggerFetch = true">
    <ControlBar />
    <div v-if="searchedMovie">
      <p>Is this what you're looking for?</p>
      <h1>{{searchedMovie.name}}</h1>
      <MovieItem :movie="searchedMovie" />
    </div>
    <div v-if="groupedMovies.length !== 0">
      <div v-for="(groupedMovie, index) in groupedMovies" :key="index">
        <p>{{ groupedMovie[0] }}</p>
        <div class="flex overflow-x-scroll">
          <MovieListHorisontal :movies="groupedMovie[1] as Movie[]" />
        </div>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import { getInfiniteMovies, getMovieBySearchQuery } from '@/api/tvmaze'
import type { InfiniteResponse, Movie } from '@/interface/tvmaze'
import { computed, onBeforeMount, onUnmounted, provide, ref, watch } from 'vue'
import * as utils from '@/utils'
import MovieListHorisontal from '@/components/MovieListHorisontal.vue'
import ControlBar from '@/components/ControlBar.vue'
import { type GroupKey, type SortKey } from '@/interface'
import MovieItem from '@/components/MovieItem.vue'

const movies = ref<Movie[]>([])
const searchedMovie = ref<Movie>();
const selectedGenre = ref('')
const selectedRating = ref(0)
const sortKey = ref<SortKey>('ratings-desc')
const groupKey = ref<GroupKey>('genres')
const triggerFetch = ref(false)
const searchQuery = ref('')

const genres = computed<string[]>(() => utils.getValuesByKey(movies.value, 'genres'))
const filterBySearchQuery = computed<Movie[]>(() => utils.filterBySearchQuery(movies.value, searchQuery.value));
const filteredByGenre = computed<Movie[]>(() =>
  utils.filterByGenre(filterBySearchQuery.value, selectedGenre.value)
)
const filterByRating = computed<Movie[]>(() =>
  utils.filterByRating(selectedRating.value, filteredByGenre.value)
)
const sortMovies = computed<Movie[]>(() => utils.sortMovies(filterByRating.value, sortKey.value))
const groupedMovies = computed(() => utils.group(sortMovies.value, groupKey.value))

const {
  data: infiniteData,
  fetchNextPage,
  isFetching
} = useInfiniteQuery<InfiniteResponse, Error>({
  queryKey: ['movies'],
  //@ts-ignore
  queryFn: ({ pageParam = 1 }: { pageParam: number }) => getInfiniteMovies({ pageParam }),
  getNextPageParam: (lastPage: InfiniteResponse) => lastPage.nextCursor
})

const { data: searchedData } = useQuery({
  queryKey: ['movies', searchQuery],
  //@ts-ignore
  queryFn: ({ queryKey }) => getMovieBySearchQuery({ searchQuery: queryKey[1]})
})

watch(infiniteData, () => {
  if (!infiniteData.value) {
    return
  }
  const data = infiniteData.value.pages.flatMap((page) => (page as InfiniteResponse).pageData)
  if (data) {
    movies.value = [...data]
  }
})

watch(triggerFetch, () => {
  if (triggerFetch.value && !isFetching.value) {
    fetchNextPage()
    triggerFetch.value = false
  }
})

watch(searchedData, () => {
  const data = searchedData.value;
  if (data) {
    searchedMovie.value = data;
  }
})

watch(searchQuery, () => {
  if (searchQuery.value === '') {
    searchedMovie.value = undefined;
  }
})

onBeforeMount(() => {
  localStorage.removeItem('random')
})

onUnmounted(() => {
  localStorage.removeItem('random')
})

provide('genres', genres)
provide('selectedGenre', selectedGenre)
provide('selectedRating', selectedRating)
provide('sortKey', sortKey)
provide('groupKey', groupKey)
provide('triggerFetch', triggerFetch)
provide('searchQuery', searchQuery)
</script>
