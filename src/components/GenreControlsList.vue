<template>
  <GenreControlsItem v-for="genre in genres" :key="genre" :genre="genre" />
</template>

<script setup lang="ts">
import GenreControlsItem from './GenreControlsItem.vue';


const { genres } = defineProps<{ genres: string[] }>()
</script>
