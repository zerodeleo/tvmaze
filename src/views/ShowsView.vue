<template>
  <body @click="triggerFetch = true">
    <HeaderComponent />
    <main>
      <section class="mb-10">
        <SearchBar />
      </section>
      <ErrorIndicator v-if="isErrorInfiniteData" />
      <LoadingIndicator v-if="isLoadingInfiniteData" />
      <section v-if="searchedShow">
        <SearchedShows :searchedShow="searchedShow" :groupedShowsArraylength="groupedShows.length" />
      </section>
      <section class="pb-20" v-if="groupedShows.length !== 0">
        <GroupedShows :groupedShows="groupedShows" />
      </section>
    </main>
    <RefreshShowsPrompt v-if="!isMenuOpen" />
  </body>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, provide, ref, watch } from 'vue'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import { getInfiniteShows, getShowBySearchQuery } from '@/api/tvmaze'

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

const shows = ref<Show[]>([])
const searchedShow = ref<Show>()
const selectedGenre = ref(localStorage.getItem('selectedGenre') || '')
const selectedRating = ref(localStorage.getItem('selectedRating') || '')
const sortKey = ref<SortKey>((localStorage.getItem('sortKey') as SortKey) || 'ratings-desc')
const groupKey = ref<GroupKey>((localStorage.getItem('groupKey') as GroupKey) || 'genres')
const triggerFetch = ref(false)
const searchQuery = ref('')
const numberOfShows = ref(0)
const controls = ref(CONTROLS)
const isMenuOpen = ref(!!localStorage.getItem('isMenuOpen') || false)

const genres = computed<string[]>(() => utils.getValuesByKey(shows.value, 'genres'))
const filterBySearchQuery = computed<Show[]>(() =>
  utils.filterBySearchQuery(shows.value, searchQuery.value)
)
const filteredByGenre = computed<Show[]>(() =>
  utils.filterByGenre(filterBySearchQuery.value, selectedGenre.value)
)
const filterByRating = computed<Show[]>(() =>
  utils.filterByRating(filteredByGenre.value, selectedRating.value)
)
const sortShows = computed<Show[]>(() => utils.sortShows(filterByRating.value, sortKey.value))
const groupedShows = computed<[string, Show[]][]>(() =>
  utils.group(sortShows.value, groupKey.value)
)

const {
  data: infiniteData,
  fetchNextPage,
  isFetching,
  isLoading: isLoadingInfiniteData,
  isError: isErrorInfiniteData
} = useInfiniteQuery<InfiniteResponse, Error>({
  queryKey: ['shows'],
  //@ts-ignore
  queryFn: ({ pageParam = 1 }: { pageParam: number }) => getInfiniteShows({ pageParam }),
  getNextPageParam: (lastPage: InfiniteResponse) => lastPage.nextCursor
})

const { data: searchedData } = useQuery({
  queryKey: ['shows', searchQuery],
  //@ts-ignore
  queryFn: ({ queryKey }) => getShowBySearchQuery({ searchQuery: queryKey[1] })
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
  if (filterByRating.value.length === 0 && !isFetching) {
    fetchNextPage()
  }
})

watch(searchQuery, () => {
  if (searchQuery.value === '') {
    searchedShow.value = undefined
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
