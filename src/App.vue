<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <main class="bg-custom-400 text-custom-100 theme-light font-montserrat">
    <RouterView />
    <VueQueryDevtools />
  </main>
</template>
