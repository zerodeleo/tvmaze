<template>
  <article v-for="(groupedShow, index) in groupedShows" :key="index">
    <h2 :class="{ 'opacity-0': isMenuOpen }" class="title">{{ groupedShow[0] }}</h2>
    <ul ref="scrollList" @scroll="() => checkScrollEnd(index)" class="flex overflow-x-scroll">
      <ShowListHorisontal :shows="groupedShow[1]" />
    </ul>
  </article>
</template>
<script setup lang="ts">
import ShowListHorisontal from '@/components/ShowListHorisontal.vue'
import type { Show } from '@/interface/tvmaze'
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from '@tanstack/vue-query'
import { inject, ref } from 'vue'

const { groupedShows } = defineProps<{ groupedShows: [string, Show[]][] }>()
const isMenuOpen = inject('isMenuOpen', ref(false))
const fetchNextPage =
  inject<
    (
      options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult<InfiniteData<Show[], unknown>, Error>>
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
