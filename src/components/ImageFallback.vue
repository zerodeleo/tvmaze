<template>
  <div
    class="bg-custom-100 bg-opacity-20 h-full flex text-center items-center text-custom-200 text-opacity-40"
  >
    <p>{{ movieName }} does not have an image</p>
  </div>
</template>

<script setup lang="ts">
const { movieName } = defineProps<{ movieName: string }>()
</script>
