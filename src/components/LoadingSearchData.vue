<template>
  <article class="flex text-center z-30 justify-center items-center mb-20">
    <h2>
      Searching for show: "<span class="text-custom-200">{{ searchQuery }}</span
      >"...
    </h2>
  </article>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

const searchQuery = inject('searchQuery', ref(''))
</script>
