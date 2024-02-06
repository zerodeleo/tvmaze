<template>
  <article class="mb-10">
    <input class="input" placeholder="Search Query" v-model="searchQuery" />
  </article>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'

const searchQuery = inject<Ref<string>>('searchQuery', ref(''))
</script>
