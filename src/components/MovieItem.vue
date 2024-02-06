<template>
  <article class="inline-block w-32 md:w-48 lg:w-56 pb-2 md:pb-4 pr-2 md:pr-4 cursor-pointer">
    <router-link :to="{ name: 'MovieDetails', params: { id: movie.id } }">
      <div class="h-68">
        <img
          v-if="movie.image"
          class="w-full h-full mb-2 md:mb-2 scale object-cover"
          :src="movie.image.medium"
          :alt="`An image of the show ${movie.name}`"
        />
        <ImageFallback v-else :movieName="movie.name" />
      </div>
    </router-link>
    <StarsList :rating="movie.rating.average || 0" />
  </article>
</template>

<script setup lang="ts">
import type { Movie } from '@/interface/tvmaze'
import StarsList from './StarsList.vue'
import ImageFallback from './ImageFallback.vue'

const { movie } = defineProps<{ movie: Movie }>()
</script>
