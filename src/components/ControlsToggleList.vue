<template>
  <ul :class="{ 'h-screen': isMenuOpen }" class="flex w-full items-start justify-center md:pt-20">
    <div class="flex flex-wrap" v-for="control in controls" :key="control.key + '-list'">
      <GenreControlsList v-if="control.isToggled && control.key === 'genres'" :genres="genres" />
      <RatingControlsList v-if="control.isToggled && control.key === 'ratings'" />
      <SortByControlsList v-if="control.isToggled && control.key === 'sortBy'" />
      <GroupByControlsList v-if="control.isToggled && control.key === 'groupBy'" />
      <OptionsList v-if="control.isToggled && control.key === 'options'" />
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
import OptionsList from './OptionsList.vue'

const controls = inject('controls', ref(CONTROLS))
const genres = inject('genres', [])
const isMenuOpen = inject('isMenuOpen', false)
</script>
