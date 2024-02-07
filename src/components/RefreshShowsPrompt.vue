<template>
  <footer
    class="block fixed bottom-0 pb-2 w-full left-0 text-center bg-custom-400 bg-opacity-90 pt-4 px-2"
  >
    <h5 @click.stop="handleTriggerFetchByUser">
      Didn't find anything you like out of the {{ numberOfShows }} shows?
      <span class="underline cursor-pointer">Click Here!</span>
      Or refresh the page to discover new random shows.
    </h5>
  </footer>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

const triggerFetch = inject('triggerFetch', ref(false))
const numberOfShows = inject('numberOfShows', ref(0))

const handleTriggerFetchByUser = () => {
  triggerFetch.value = true
}
</script>
