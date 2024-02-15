<template>
  <article>
    <input class="input" placeholder="👀 Search" v-model="searchQuery" />
  </article>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

const searchQuery = inject('searchQuery', ref(''))
</script>
