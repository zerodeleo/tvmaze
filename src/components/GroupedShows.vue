<template>
  <article v-for="(groupedShow, index) in groupedShows" :key="index">
    <h2 :class="{ 'opacity-0': isMenuOpen }" class="title">{{ groupedShow.groupTitle }}</h2>
    <ul ref="scrollList" @scroll="() => checkScrollEnd(index)" class="flex overflow-x-scroll">
      <ShowListHorisontal :shows="groupedShow.shows" />
    </ul>
  </article>
</template>
<script setup lang="ts">
import ShowListHorisontal from '@/components/ShowListHorisontal.vue'
import type { GroupedShow, Show } from '@/interface/tvmaze'
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from '@tanstack/vue-query'
import { inject, ref } from 'vue'

const { groupedShows } = defineProps<{ groupedShows: GroupedShow[] }>()
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
