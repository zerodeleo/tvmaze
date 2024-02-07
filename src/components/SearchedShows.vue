<template>
  <h2>Is this what you're looking for?</h2>
  <h1 class="text-center my-6">{{ searchedShow.name }}</h1>
  <div class="mb-20 text-center">
    <ShowItem :show="searchedShow" />
  </div>
  <h4 v-if="groupedShowsArraylength > 0">
    Alternatively, here are other shows that match your search for "<span class="text-custom-200">{{
      searchQuery
    }}</span
    >".
  </h4>
</template>
<script setup lang="ts">
import { type Show } from '@/interface/tvmaze'
import ShowItem from '@/components/ShowItem.vue'
import { inject, ref } from 'vue'

const { searchedShow, groupedShowsArraylength } = defineProps<{
  searchedShow: Show
  groupedShowsArraylength: number
}>()

const searchQuery = inject('searchQuery', ref(''))
</script>
