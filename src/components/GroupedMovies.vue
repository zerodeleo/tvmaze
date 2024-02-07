<template>
  <div v-for="(groupedMovie, index) in groupedMovies" :key="index">
    <h2 :class="{ 'opacity-0': isMenuOpen }" class="title">{{ groupedMovie[0] }}</h2>
    <div ref="scrollList" @scroll="() => checkScrollEnd(index)" class="flex overflow-x-scroll">
      <MovieListHorisontal :movies="groupedMovie[1]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import MovieListHorisontal from '@/components/MovieListHorisontal.vue'
import type { Movie } from '@/interface/tvmaze'
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from '@tanstack/vue-query'
import { inject, ref } from 'vue'

const { groupedMovies } = defineProps<{ groupedMovies: [string, Movie[]][] }>()
const isMenuOpen = inject('isMenuOpen', ref(false))
const fetchNextPage =
  inject<
    (
      options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult<InfiniteData<Movie[], unknown>, Error>>
  >('fetchNextPage')
const scrollList = ref<HTMLElement[] | null>(null)

const checkScrollEnd = (index: number) => {
  if (scrollList.value) {
    const container = scrollList.value[index]
    if (container.scrollWidth > container.clientWidth) {
      const isEndReached = container.scrollLeft + container.clientWidth >= container.scrollWidth
      if (isEndReached) {
        fetchNextPage!()
      }
    }
  }
}
</script>
