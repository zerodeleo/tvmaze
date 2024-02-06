<template>
  <ul class="flex justify-center w-full pb-10">
    <li class="flex justify-between w-full md:w-1/2 lg:w-1/3">
      <StarIconOutline
        v-for="star in stars"
        :key="star"
        @click.stop
        @click="handleSelectRating(star)"
        :class="{ 'fill-custom-200': star <= selectedRating }"
        class="w-1/12 stroke-custom-200 hover:fill-custom-200 cursor-pointer"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline'
import { inject, ref } from 'vue'

const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const selectedRating = inject('selectedRating', ref(0))

const handleSelectRating = (star: number) => {
  selectedRating.value = star
}
</script>
