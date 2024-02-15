<template>
  <section v-if="show" class="flex flex-col items-center text-center h-max-content">
    <article class="max-w-screen-md px-4 py-8">
      <h1 class="mb-8 h1-highlight">{{ show.name }}</h1>
      <br />
      <div class="w-full flex justify-center">
        <div class="flex justify-center w-48 h-64 bg-blue-300">
          <img v-if="show.image" class="w-full h-full object-cover" :src="show.image.original" />
          <ImageFallback v-else :showName="show.name" />
        </div>
      </div>
      <div class="flex flex-wrap mt-8">
        <h1 class="pr-2" v-for="genre in show.genres" :key="genre">{{ genre }}</h1>
      </div>
      <br />
      <h4>{{ summary }}</h4>
      <br />
      <div class="flex justify-between text-xs flex-col md:flex-row text-right md:text-center">
        <p v-if="show.premiered">Premiered: {{ show.premiered }}</p>
        <p v-if="show.ended">Ended: {{ show.ended }}</p>
      </div>
      <br />
      <br />
      <router-link to="/" class="underline text-center">Discover other shows</router-link>
    </article>
  </section>
</template>

<script setup lang="ts">
import { getShowById } from '@/api/tvmaze'
import ImageFallback from '@/components/ImageFallback.vue'
import type { Show } from '@/interface/tvmaze'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const id = router.currentRoute.value.params.id

const show = ref<Show>()
const summary = computed(() => {
  if (show.value && show.value.summary) {
    return show.value.summary.replace(/<[^>]*>/gi, '')
  }
  return ''
})

const { data } = useQuery({
  queryKey: ['shows', id],
  //@ts-ignore
  queryFn: ({ queryKey }) => getShowById({ id: queryKey[1] })
})

watch(data, () => {
  if (data.value) {
    show.value = data.value
  }
})
</script>
