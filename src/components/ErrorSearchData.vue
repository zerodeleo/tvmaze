<template>
  <article class="flex flex-col text-center z-30 justify-center items-center mb-20">
    <h2>
      No show found for "<span class="text-custom-200">{{ searchQuery }}</span
      >"... <br /><span class="text-custom-300">:(</span>
    </h2>
  </article>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

const searchQuery = inject('searchQuery', ref(''))
</script>
