<template>
    <article v-for="(shows, index) in chunkedShows" :key="index">
      <h2 :class="{ 'opacity-0': isMenuOpen }" class="title">{{ shows.groupTitle }}</h2>
      <ul ref="scrollList" @scroll="() => checkScrollEnd(index, shows.chunkedShows.length)" class="flex overflow-x-scroll">
        <ShowListHorisontal v-if="shows.chunkedShows" :shows="shows.chunkedShows[currentChunkIndexes[index]]" />
      </ul>
    </article>
</template>
<script setup lang="ts">
import ShowListHorisontal from '@/components/ShowListHorisontal.vue'
import type { ChunkedShow, Show } from '@/interface/tvmaze'
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from '@tanstack/vue-query'
import { inject, ref } from 'vue'

const { chunkedShows } = defineProps<{ chunkedShows: ChunkedShow[] }>()
const isMenuOpen = inject('isMenuOpen', ref(false))
const currentChunkIndexes = inject('currentChunkIndexes', ref([]));

const fetchNextPage =
  inject<
    (
      options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult<InfiniteData<Show[], unknown>, Error>>
  >('fetchNextPage')
const scrollList = ref<HTMLElement[] | null>(null)

const checkScrollEnd = (index: number, length: number) => {
  if (scrollList.value) {
    const container = scrollList.value[index]
    if (container.scrollWidth > container.clientWidth) {
      const isEndReached = container.scrollLeft + container.clientWidth >= container.scrollWidth
      const isBeginningReached = container.scrollLeft === 0;

      if (isEndReached) {
        if(currentChunkIndexes.value[index] === length) {
          console.log('fetch new page')
          fetchNextPage!()
        } else {
          console.log('paginating forwards')
          currentChunkIndexes.value[index]++;
        }
      }
      if(isBeginningReached && length !== 0) {
        console.log('paginating backwards')
        currentChunkIndexes.value[index]--;
      }
    }
  }
}
</script>
