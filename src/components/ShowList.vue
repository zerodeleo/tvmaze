<template>
  <div v-for="show in shows" class="w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/5 flex" :key="show.id">
    <ShowItem :show="show" />
  </div>
</template>

<script setup lang="ts">
import type { Show } from '@/interface/tvmaze'
import ShowItem from '@components/ShowItem.vue'

const { shows } = defineProps<{ shows: Show[] }>()
</script>
