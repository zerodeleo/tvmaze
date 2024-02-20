<template>
  <div class="flex w-full h-full bg-opacity-20 text-center items-center text-custom-400">
    <p>The show "{{ showName }}" does not have an image</p>
  </div>
</template>

<script setup lang="ts">
const { showName } = defineProps<{ showName: string }>()
</script>
