<template>
  <body @click="triggerFetch = true">
    <HeaderComponent />
    <main>
      <section class="mb-10">
        <SearchBar />
      </section>
      <section v-if="isErrorInfiniteData || isLoadingInfiniteData">
        <ErrorIndicator v-if="isErrorInfiniteData" />
        <LoadingIndicator v-if="isLoadingInfiniteData" />
      </section>
      <section v-if="isErrorSearchedData || isLoadingSearchData">
        <LoadingSearchData v-if="isLoadingSearchData" />
        <ErrorSearchData v-if="isErrorSearchedData" />
      </section>
      <section v-if="searchedShow">
        <SearchedShows
          :searchedShow="searchedShow"
          :groupedShowsArraylength="processedShows.groupedShows.length"
        />
      </section>
      <section class="pb-20" v-if="processedShows.groupedShows.length !== 0">
        <GroupedShows :groupedShows="processedShows.groupedShows" />
      </section>
    </main>
    <RefreshShowsPrompt v-if="!isMenuOpen" />
  </body>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, provide, ref, watch } from 'vue'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import { getInfiniteShows, getShowBySearchQuery } from '@/api/tvmaze'
import { watchDebounced } from '@vueuse/core'

import type { InfiniteResponse, Show } from '@/interface/tvmaze'
import { type GroupKey, type SortKey } from '@/interface'

import * as utils from '@/utils'
import { CONTROLS } from '@/constants'

import RefreshShowsPrompt from '@/components/RefreshShowsPrompt.vue'
import SearchBar from '@/components/SearchBar.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SearchedShows from '@/components/SearchedShows.vue'
import GroupedShows from '@/components/GroupedShows.vue'
import LoadingIndicator from '@/components/LoadingIndicator.vue'
import ErrorIndicator from '@/components/ErrorIndicator.vue'
import LoadingSearchData from '@/components/LoadingSearchData.vue'
import ErrorSearchData from '@/components/ErrorSearchData.vue'

const shows = ref<Show[]>([])
const searchedShow = ref<Show>()
const selectedGenre = ref(localStorage.getItem('selectedGenre') || '')
const selectedRating = ref(localStorage.getItem('selectedRating') || '')
const sortKey = ref<SortKey>((localStorage.getItem('sortKey') as SortKey) || 'ratings-desc')
const groupKey = ref<GroupKey>((localStorage.getItem('groupKey') as GroupKey) || 'genres')
const triggerFetch = ref(false)
const searchQuery = ref('')
const debouncedSearchQuery = ref('')
const numberOfShows = ref(0)
const controls = ref(CONTROLS)
const isMenuOpen = ref(!!localStorage.getItem('isMenuOpen') || false)

const genres = computed<string[]>(() => utils.getValuesByKey(shows.value, 'genres'))
const processedShows = computed(() => {
  const filteredShows = utils.filterBySearchQuery(shows.value, searchQuery.value)
  const filteredByGenre = utils.filterByGenre(filteredShows, selectedGenre.value)
  const filteredByRating = utils.filterByRating(filteredByGenre, selectedRating.value)
  const sortedShows = utils.sortShows(filteredByRating, sortKey.value)
  const groupedShows = utils.group(sortedShows, groupKey.value)

  return {
    filteredByRating,
    sortedShows,
    groupedShows
  }
})

const {
  data: infiniteData,
  fetchNextPage,
  isFetching,
  isLoading: isLoadingInfiniteData,
  isError: isErrorInfiniteData
} = useInfiniteQuery<InfiniteResponse, Error>({
  queryKey: ['shows'],
  //@ts-ignore
  queryFn: ({ pageParam = 0 }: { pageParam: number }) => getInfiniteShows({ pageParam }),
  getNextPageParam: (lastPage: InfiniteResponse) => lastPage.nextCursor
})

const {
  data: searchedData,
  isError: isErrorSearchedData,
  isLoading: isLoadingSearchData
} = useQuery({
  queryKey: ['shows', debouncedSearchQuery],
  //@ts-ignore
  queryFn: ({ queryKey }) => getShowBySearchQuery({ searchQuery: queryKey[1] }),
  refetchOnWindowFocus: false,
  refetchInterval: false
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
    shows.value = [...data]
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
    searchedShow.value = data
  }
})

watch(shows, () => {
  if (processedShows.value.filteredByRating.length === 0 && !isFetching) {
    fetchNextPage()
  }
})

watchDebounced(
  searchQuery,
  () => {
    if (searchQuery.value === '') {
      searchedShow.value = undefined
    } else {
      debouncedSearchQuery.value = searchQuery.value
    }
  },
  { debounce: 500, maxWait: 1000 }
)

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
