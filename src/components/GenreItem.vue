<template>
  <button @click="handleSelectGenre(genre)" :class="selectedGenre === genre ? 'btn' : 'btn-invert'">
    {{ genre }}
  </button>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'

const { genre } = defineProps<{ genre: string }>()
const selectedGenre = inject<Ref<string>>('selectedGenre', ref(''))
const selectedRating = inject<Ref<number>>('selectedRating', ref(0))

const handleSelectGenre = (genre: string) => {
  if (genre === selectedGenre.value) {
    selectedGenre.value = ''
  } else {
    selectedRating.value = 0
    selectedGenre.value = genre
  }
}
</script>
