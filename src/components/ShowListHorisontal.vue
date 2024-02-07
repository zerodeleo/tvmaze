<template>
  <div class="flex flex-row" v-for="show in shows" :key="show.id">
    <ShowItem :show="show" />
  </div>
</template>

<script setup lang="ts">
import type { Show } from '@/interface/tvmaze'
import ShowItem from './ShowItem.vue'

const { shows } = defineProps<{ shows: Show[] }>()
</script>
