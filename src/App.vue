<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <div class="h-max bg-custom-400 theme-light">
    <RouterView />
    <VueQueryDevtools />
  </div>
</template>

<style>
* {
  @apply text-custom-100 font-montserrat
}
</style>
