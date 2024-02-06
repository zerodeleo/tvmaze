<template>
  <ul class="flex w-full">
    <div
      class="flex flex-wrap text-sm md:text-lg"
      v-for="control in controls"
      :key="control.key + '-list'"
    >
      <GenreControlsList v-if="control.isToggled && control.key === 'genres'" :genres="genres" />
      <RatingControlsList v-if="control.isToggled && control.key === 'ratings'" />
      <SortByControlsList v-if="control.isToggled && control.key === 'sortBy'" />
      <GroupByControlsList v-if="control.isToggled && control.key === 'groupBy'" />
    </div>
  </ul>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import GenreControlsList from '@/components/GenreControlsList.vue'
import RatingControlsList from '@/components/RatingControlsList.vue'
import SortByControlsList from '@/components/SortByControlsList.vue'
import GroupByControlsList from '@/components/GroupByControlsList.vue'
import { CONTROLS } from '@/constants'

const controls = ref(CONTROLS)
const genres = inject<string[]>('genres', [])
</script>
