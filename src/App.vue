<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <main
    class="bg-custom-400 text-custom-100 theme-dark font-montserrat min-h-screen flex flex-col px-8 md:px-12 lg:px-12"
  >
    <RouterView />
    <VueQueryDevtools />
  </main>
</template>
