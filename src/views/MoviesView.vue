<template>
  <HeaderComponent />
  <body @click="triggerFetch = true">
    <div class="mb-10">
      <SearchBar />
    </div>
    <ErrorIndicator v-if="isErrorInfiniteData" />
    <LoadingIndicator v-if="isLoadingInfiniteData"/>
      <div v-if="searchedMovie">
        <SearchedMovies
          :searchedMovie="searchedMovie"
          :groupedMoviesArraylength="groupedMovies.length"
        />
      </div>
      <div class="pb-20" v-if="groupedMovies.length !== 0">
        <GroupedMovies :groupedMovies="groupedMovies" />
      </div>
    <RefreshMoviesPrompt v-if="!isMenuOpen" />
  </body>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, provide, ref, watch } from 'vue'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import { getInfiniteMovies, getMovieBySearchQuery } from '@/api/tvmaze'

import type { InfiniteResponse, Movie } from '@/interface/tvmaze'
import { type GroupKey, type SortKey } from '@/interface'

import * as utils from '@/utils'
import { CONTROLS } from '@/constants'

import RefreshMoviesPrompt from '@/components/RefreshMoviesPrompt.vue'
import SearchBar from '@/components/SearchBar.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SearchedMovies from '@/components/SearchedMovies.vue'
import GroupedMovies from '@/components/GroupedMovies.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ErrorIndicator from '@/components/ErrorIndicator.vue'

const movies = ref<Movie[]>([])
const searchedMovie = ref<Movie>()
const selectedGenre = ref(localStorage.getItem('selectedGenre') || '')
const selectedRating = ref(localStorage.getItem('selectedRating') || '')
const sortKey = ref<SortKey>((localStorage.getItem('sortKey') as SortKey) || 'ratings-desc')
const groupKey = ref<GroupKey>((localStorage.getItem('groupKey') as GroupKey) || 'genres')
const triggerFetch = ref(false)
const searchQuery = ref('')
const numberOfShows = ref(0)
const controls = ref(CONTROLS)
const isMenuOpen = ref(!!localStorage.getItem('isMenuOpen') || false)

const genres = computed<string[]>(() => utils.getValuesByKey(movies.value, 'genres'))
const filterBySearchQuery = computed<Movie[]>(() =>
  utils.filterBySearchQuery(movies.value, searchQuery.value)
)
const filteredByGenre = computed<Movie[]>(() =>
  utils.filterByGenre(filterBySearchQuery.value, selectedGenre.value)
)
const filterByRating = computed<Movie[]>(() =>
  utils.filterByRating(filteredByGenre.value, selectedRating.value)
)
const sortMovies = computed<Movie[]>(() => utils.sortMovies(filterByRating.value, sortKey.value))
const groupedMovies = computed<[string, Movie[]][]>(() =>
  utils.group(sortMovies.value, groupKey.value)
)

const {
  data: infiniteData,
  fetchNextPage,
  isFetching,
  isLoading: isLoadingInfiniteData,
  isError: isErrorInfiniteData
} = useInfiniteQuery<InfiniteResponse, Error>({
  queryKey: ['movies'],
  //@ts-ignore
  queryFn: ({ pageParam = 1 }: { pageParam: number }) => getInfiniteMovies({ pageParam }),
  getNextPageParam: (lastPage: InfiniteResponse) => lastPage.nextCursor
})

const {
  data: searchedData,
} = useQuery({
  queryKey: ['movies', searchQuery],
  //@ts-ignore
  queryFn: ({ queryKey }) => getMovieBySearchQuery({ searchQuery: queryKey[1] })
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

watch(movies, () => {
  if (filterByRating.value.length === 0 && !isFetching) {
    fetchNextPage()
  }
})

watch(searchQuery, () => {
  if (searchQuery.value === '') {
    searchedMovie.value = undefined
  }
})

provide('genres', genres)
provide('selectedGenre', selectedGenre)
provide('selectedRating', selectedRating)
provide('sortKey', sortKey)
provide('groupKey', groupKey)
provide('triggerFetch', triggerFetch)
provide('searchQuery', searchQuery)
provide('controls', controls)
provide('isMenuOpen', isMenuOpen)
provide('numberOfShows', numberOfShows)
provide('triggerFetch', triggerFetch)
provide('fetchNextPage', fetchNextPage)
</script>
