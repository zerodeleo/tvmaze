<!-- MovieDetails.vue -->
<template>
  <div v-if="movie">
    <h1>{{ movie.name }}</h1>
    <p>{{ movie.summary }}</p>
    <router-link to="/" class="back-button">Back</router-link>
  </div>
</template>

<script setup lang="ts">
import { getMovieById } from '@/api/tvmaze'
import type { Movie } from '@/interface/tvmaze'
import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const id = router.currentRoute.value.params.id

const movie = ref<Movie>()

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
