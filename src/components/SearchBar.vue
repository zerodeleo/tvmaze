<template>
  <input class="input" placeholder="Search Query" v-model="searchQuery" />
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

const searchQuery = inject('searchQuery', ref(''))
</script>
