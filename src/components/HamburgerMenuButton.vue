<template>
  <button
    aria-label="Menu"
    class="flex mt-2 md:hidden w-full z-20"
    :class="{ 'justify-start': isMenuOpen, 'justify-end': !isMenuOpen }"
    @click="handleToggleMenu"
    @click.stop
  >
    <Bars3Icon class="h-11 w-11 fill-custom-100" />
  </button>
</template>
<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/solid'
import { inject, ref } from 'vue'

const isMenuOpen = inject('isMenuOpen', ref(false))

const handleToggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
