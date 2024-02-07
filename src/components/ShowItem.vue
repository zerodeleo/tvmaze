<template>
  <div class="inline-block w-32 md:w-48 lg:w-56 pb-2 md:pb-4 pr-2 md:pr-4 cursor-pointer">
    <router-link :to="{ name: 'ShowDetails', params: { id: show.id } }">
      <div class="h-38 md:h-80 scale mb-4">
        <img
          v-if="show.image"
          class="w-full h-full mb-2 md:mb-2 object-cover"
          :src="show.image.medium"
          :alt="`An image of the show ${show.name}`"
        />
        <ImageFallback v-else :showName="show.name" />
      </div>
    </router-link>
    <StarsList :rating="show.rating.average || 0" />
  </div>
</template>

<script setup lang="ts">
import type { Show } from '@/interface/tvmaze'
import StarsList from './StarsList.vue'
import ImageFallback from './ImageFallback.vue'

const { show } = defineProps<{ show: Show }>()
</script>
