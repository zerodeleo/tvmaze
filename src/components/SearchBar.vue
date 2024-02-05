<template>
  <article>
    <input class="input" placeholder="Search Query" v-model="searchQuery" />
    <button @click="handleTrigger">Search</button>
  </article>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'

const searchQuery = inject<Ref<string>>('searchQuery', ref(''));

const handleTrigger = () => {
  console.log(searchQuery.value)
}

</script>
