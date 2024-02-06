<template>
  <section v-if="movie" class="flex flex-col items-center text-center h-max-content">
    <div class="max-w-screen-md px-4 py-8">
      <h1 class="mb-8 h1-highlight">{{ movie.name }}</h1>
      <br />
      <div class="w-full flex justify-center">
        <div class="flex justify-center w-48 h-64">
          <img v-if="movie.image" class="w-full h-full object-cover" :src="movie.image.original" />
          <ImageFallback v-else :movieName="movie.name" />
        </div>
      </div>
      <div class="flex flex-wrap mt-8">
        <h1 class="pr-2" v-for="genre in movie.genres" :key="genre">{{ genre }}</h1>
      </div>
      <br />
      <h4>{{ summary }}</h4>
      <br />
      <div class="flex justify-between text-xs flex-col md:flex-row text-right md:text-center">
        <p v-if="movie.premiered">Premiered: {{ movie.premiered }}</p>
        <p v-if="movie.ended">Ended: {{ movie.ended }}</p>
      </div>
      <br />
      <br />
      <router-link to="/" class="underline text-center">Discover other shows</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getMovieById } from '@/api/tvmaze'
import ImageFallback from '@/components/ImageFallback.vue'
import type { Movie } from '@/interface/tvmaze'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const id = router.currentRoute.value.params.id

const movie = ref<Movie>()
const summary = computed(() => {
  if (movie.value && movie.value.summary) {
    return movie.value.summary.replace(/<[^>]*>/gi, '')
  }
  return ''
})

const { data } = useQuery({
  queryKey: ['movies', id],
  //@ts-ignore
  queryFn: ({ queryKey }) => getMovieById({ id: queryKey[1] })
})

watch(data, () => {
  if (data.value) {
    movie.value = data.value
  }
})
</script>
