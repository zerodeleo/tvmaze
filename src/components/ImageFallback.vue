<template>
  <div
    class="h-full bg-custom-100 bg-opacity-20 flex text-center items-center text-custom-200 text-opacity-40"
  >
    <p>The show "{{ movieName }}" does not have an image</p>
  </div>
</template>

<script setup lang="ts">
const { movieName } = defineProps<{ movieName: string }>()
</script>
