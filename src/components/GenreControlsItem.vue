<template>
  <li
    @click.stop
    @click="handleSelectGenre(genre)"
    :class="selectedGenre === genre ? 'btn-secondary-active' : 'btn-secondary'"
  >
    {{ genre }}
  </li>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

const { genre } = defineProps<{ genre: string }>()
const selectedGenre = inject('selectedGenre', ref(''))
const selectedRating = inject('selectedRating', ref(0))

const handleSelectGenre = (genre: string) => {
  if (genre === selectedGenre.value) {
    selectedGenre.value = ''
  } else {
    selectedRating.value = 0
    selectedGenre.value = genre
  }
}
</script>
