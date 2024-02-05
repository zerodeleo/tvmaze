<template>
  <body v-if="infiniteData" @click="triggerFetch = true">
    <ControlBar />
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
import { useInfiniteQuery } from '@tanstack/vue-query'
import { getInfiniteMovies } from '@/api/tvmaze'
import type { InfiniteResponse, Movie } from '@/interface/tvmaze'
import { computed, onBeforeMount, onUnmounted, provide, ref, watch } from 'vue'
import * as utils from '@/utils'
import MovieListHorisontal from '@/components/MovieListHorisontal.vue'
import ControlBar from '@/components/ControlBar.vue'
import { type GroupKey, type SortKey } from '@/interface'

const movies = ref<Movie[]>([])
const selectedGenre = ref('')
const selectedRating = ref(0)
const sortKey = ref<SortKey>('ratings-desc')
const groupKey = ref<GroupKey>('genres')
const triggerFetch = ref(false)

const genres = computed<string[]>(() => utils.getValuesByKey(movies.value, 'genres'))
const filteredByGenre = computed<Movie[]>(() =>
  utils.filterByGenre(movies.value, selectedGenre.value)
)
const filterByRating = computed<Movie[]>(() =>
  utils.filterByRating(selectedRating.value, filteredByGenre.value)
)
const sortMovies = computed<Movie[]>(() => utils.sortMovies(filterByRating.value, sortKey.value))
const groupedMovies = computed(() => utils.group(sortMovies.value, groupKey.value))

const {
  data: infiniteData,
  fetchNextPage,
  isFetching,
} = useInfiniteQuery<InfiniteResponse, Error>({
  queryKey: ['movies'],
  //@ts-ignore
  queryFn: ({ pageParam = 1 }: { pageParam: number }) => getInfiniteMovies({ pageParam }),
  getNextPageParam: (lastPage: InfiniteResponse) => lastPage.nextCursor
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
</script>
