<template>
  <div class="inline-block w-48 pb-2 md:pb-4 pr-2 md:pr-4 cursor-pointer">
    <router-link :to="{ name: 'MovieDetails', params: { id: movie.id } }">
      <img
        class="w-full h-auto mb-2 md:mb-2 transition-transform transform-gpu hover:scale-105"
        :src="movie.image ? movie.image.medium : undefined"
        :alt="`An image of the show ${movie.name}`"
      />
    </router-link>
    <div class="flex justify-between mb-2 md:mb-2">
      <template
        v-for="index in Math.floor(movie.rating.average ? movie.rating.average : 0)"
        :key="index"
      >
        <StarIconSolid class="w-1/10 fill-custom-200" />
      </template>
      <template
        v-for="index in 10 - Math.floor(movie.rating.average ? movie.rating.average : 0)"
        :key="index"
      >
        <StarIconOutline class="w-1/10 stroke-custom-200" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/interface/tvmaze'
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline'

const { movie } = defineProps<{ movie: Movie }>()
</script>
