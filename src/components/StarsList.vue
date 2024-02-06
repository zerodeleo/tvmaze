<template>
  <div class="flex justify-between mb-2 md:mb-2">
    <StarIconSolid
      v-for="index in Math.floor(rating ? rating : 0)"
      :key="index"
      class="fill-custom-200"
    />
    <StarIconOutline
      v-for="index in 10 - Math.floor(rating ? rating : 0)"
      :key="index"
      class="stroke-custom-200"
    />
  </div>
</template>

<script setup lang="ts">
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline'
const { rating } = defineProps<{ rating: number }>()
</script>
