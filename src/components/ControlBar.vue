<template>
  <section class="flex flex-col">
    <SearchBar />
    <article class="flex">
      <div class="flex">
        <button
          v-for="control in controls"
          :key="control.key"
          @click="handleToggle(control.key)"
          :class="control.isToggled ? 'btn' : 'btn-invert'"
        >
          {{ control.display }}
        </button>
      </div>
    </article>
    <article class="flex" v-for="control in controls" :key="control.key + '-list'">
      <GenreList v-if="control.isToggled && control.key === 'genres'" :genres="genres" />
      <RatingsList v-if="control.isToggled && control.key === 'ratings'" />
      <SortByList v-if="control.isToggled && control.key === 'sortBy'" />
      <GroupByList v-if="control.isToggled && control.key === 'groupBy'" />
    </article>
  </section>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
import GenreList from '@/components/GenreList.vue'
import RatingsList from '@/components/RatingsList.vue'
import SortByList from '@/components/SortByList.vue'
import GroupByList from './GroupByList.vue'
import SearchBar from './SearchBar.vue'

const controls = ref([
  { key: 'genres', display: 'Genres', isToggled: false },
  { key: 'ratings', display: 'Ratings', isToggled: false },
  { key: 'sortBy', display: 'Sort By', isToggled: false },
  { key: 'groupBy', display: 'Group By', isToggled: true }
])
const genres = inject('genres', [])

const handleToggle = (key: string) => {
  controls.value = controls.value.map((control) => ({
    ...control,
    isToggled: control.key === key ? !control.isToggled : false
  }))
}
</script>
