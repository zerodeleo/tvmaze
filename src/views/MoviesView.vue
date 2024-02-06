<template>
  <header class="flex justify-center items-center md:px-32 lg:px-44 md:my-28 flex-col text-center">
    <h1>Discover and explore your favorite shows effortlessly.</h1>
    <h4>
      Currently browsing through
      <span class="text-custom-200 text-4xl">{{ numberOfShows }}</span> shows
    </h4>
    <p>Don't find anything you like?</p>
    <button
      @click="handleTriggerFetchByUser"
      class="font-protest text-xl tracking-widest my-8 bg-custom-100 bg-opacity-50 rounded-full py-2 px-10"
    >
      Click Here!
    </button>
    <p>Or refresh the page and you'll get new random shows to browse through</p>
  </header>
  <body v-if="infiniteData" @click="triggerFetch = true">
    <div>
      <ControlsBar />
      <div v-if="searchedMovie">
        <p>Is this what you're looking for?</p>
        <h1>{{ searchedMovie.name }}</h1>
        <MovieItem :movie="searchedMovie" />
      </div>
      <div v-if="groupedMovies.length !== 0">
        <div v-for="(groupedMovie, index) in groupedMovies" :key="index">
          <h2 class="title">{{ groupedMovie[0] }}</h2>
          <div class="flex overflow-x-scroll">
            <MovieListHorisontal :movies="groupedMovie[1] as Movie[]" />
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup lang="ts">
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import { getInfiniteMovies, getMovieBySearchQuery } from '@/api/tvmaze'
import type { InfiniteResponse, Movie } from '@/interface/tvmaze'
import { computed, onBeforeMount, provide, ref, watch } from 'vue'
import * as utils from '@/utils'
import { type GroupKey, type SortKey } from '@/interface'
import { CONTROLS } from '@/constants'
import MovieListHorisontal from '@/components/MovieListHorisontal.vue'
import MovieItem from '@/components/MovieItem.vue'
import ControlsBar from '@/components/ControlsBar.vue'

const movies = ref<Movie[]>([])
const searchedMovie = ref<Movie>()
const selectedGenre = ref('')
const selectedRating = ref(0)
const sortKey = ref<SortKey>('ratings-desc')
const groupKey = ref<GroupKey>('genres')
const triggerFetch = ref(false)
const searchQuery = ref('')
const numberOfShows = ref(0)
const controls = ref(CONTROLS)

const genres = computed<string[]>(() => utils.getValuesByKey(movies.value, 'genres'))
const filterBySearchQuery = computed<Movie[]>(() =>
  utils.filterBySearchQuery(movies.value, searchQuery.value)
)
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
  queryFn: ({ queryKey }) => getMovieBySearchQuery({ searchQuery: queryKey[1] })
})

watch(infiniteData, () => {
  if (!infiniteData.value) {
    return
  }
  const data = infiniteData.value.pages.flatMap((page) => (page as InfiniteResponse).pageData)
  if (data) {
    movies.value = [...data]
    numberOfShows.value = data.length
  }
})

watch(triggerFetch, () => {
  if (triggerFetch.value && !isFetching.value) {
    fetchNextPage()
    triggerFetch.value = false
  }
})

watch(searchedData, () => {
  const data = searchedData.value
  if (data) {
    searchedMovie.value = data
  }
})

watch(searchQuery, () => {
  if (searchQuery.value === '') {
    searchedMovie.value = undefined
  }
})

onBeforeMount(() => {
  const storedRandomPagesArrayPreviousFetches = localStorage.getItem('random')
  if (storedRandomPagesArrayPreviousFetches) {
    const parsed = JSON.parse(storedRandomPagesArrayPreviousFetches)
    if (Array.isArray(parsed) && parsed.length > 100) {
      localStorage.removeItem('random')
    }
  }
})

const handleTriggerFetchByUser = () => {
  triggerFetch.value = true
}

provide('genres', genres)
provide('selectedGenre', selectedGenre)
provide('selectedRating', selectedRating)
provide('sortKey', sortKey)
provide('groupKey', groupKey)
provide('triggerFetch', triggerFetch)
provide('searchQuery', searchQuery)
provide('controls', controls)
</script>
