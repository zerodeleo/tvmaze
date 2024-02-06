<template>
  <ul class="flex flex-col justify-center items-center">
    <li class="text-center" v-if="numberOfShows">
      <h1>
        Currently browsing through
        <span class="text-custom-200 h1-highlight">{{ numberOfShows }}</span> shows
      </h1>
    </li>
    <br />
    <br />
    <li class="flex flex-col justify-center items-center" v-if="selectedRating || selectedGenre">
      <h2>Your choice is filtered!</h2>
      <h4 v-if="selectedGenre">Viewing shows in the</h4>
      <h1 class="h1-highlight">{{ selectedGenre.toUpperCase() }}</h1>
      <h4 v-if="selectedGenre">genre or subgenre.</h4>
      <div class="flex flex-wrap" v-if="selectedRating">
        <h4>With the rating of</h4>
        <h1 class="h1-highlight md:px-4">{{ selectedRating }}</h1>
        <h4>stars or more</h4>
      </div>
      <br />
      <button @click.stop @click="handleResetFilters" class="underline">Reset</button>
    </li>
    <li v-else>
      <h3>You can filter the shows by genre or rating.</h3>
    </li>
    <br />
    <br />
    <li class="hidden md:block text-center">
      <h3>You can also arrange the shows by sorting or grouping them.</h3>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

const selectedGenre = inject('selectedGenre', ref(''))
const selectedRating = inject('selectedRating', ref(0))
const numberOfShows = inject('numberOfShows', ref(0))

const handleResetFilters = () => {
  selectedGenre.value = ''
  selectedRating.value = 0
  localStorage.setItem('selectedGenre', '')
  localStorage.setItem('selectedRating', '')
}
</script>
