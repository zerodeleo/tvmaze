<template>
  <li :id="`${show.id}`" class="flex flex-row" v-for="show in shows" :key="show.id">
    <ShowItem :show="show" />
  </li>
</template>

<script setup lang="ts">
import type { Show } from '@/interface/tvmaze'
import ShowItem from './ShowItem.vue'

const { shows } = defineProps<{ shows: Show[] }>()
</script>
