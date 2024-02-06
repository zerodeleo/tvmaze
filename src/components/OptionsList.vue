<template>
  <section class="flex flex-col justify-around">
    <FilterSummary />
    <br/>
    <RefreshMoviesPrompt />
  </section>
</template>
<script setup lang="ts">
import FilterSummary from './FilterSummary.vue'
import RefreshMoviesPrompt from './RefreshMoviesPrompt.vue'
</script>
