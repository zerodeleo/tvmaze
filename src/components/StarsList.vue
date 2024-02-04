<template>
  <div class="flex justify-between">
    <template v-for="star in stars" :key="star">
      <StarIconOutline
        @click="handleSelectRating(star)"
        class="w-1/10 stroke-custom-200 hover:fill-custom-200 cursor-pointer"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline'
import { inject, ref, type Ref } from 'vue'

const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const selectedRating = inject<Ref<number>>('selectedRating', ref(0))

const handleSelectRating = (star: number) => {
  selectedRating.value = star
}
</script>
