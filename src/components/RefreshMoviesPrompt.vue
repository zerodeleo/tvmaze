<template>
  <article class="fixed bottom-2 w-full left-0 text-center">
    <p>Didn't find anything you like?</p>
    <button
      @click="handleTriggerFetchByUser"
    >
      <span class="underline px-4">Click Here!</span>
    </button>
    <p>Or refresh the page to get new random shows</p>
  </article>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue'

const triggerFetch = inject('triggerFetch', ref(false))
const handleTriggerFetchByUser = () => {
  triggerFetch.value = true
}
</script>
