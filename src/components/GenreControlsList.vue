<template>
  <GenreItem v-for="genre in genres" :key="genre" :genre="genre" />
</template>

<script setup lang="ts">
import GenreItem from '@components/GenreItem.vue'

const { genres } = defineProps<{ genres: string[] }>()
</script>
