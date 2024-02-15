<template>
  <header>
    <nav :class="{ 'h-screen': isMenuOpen }" class="fixed w-full left-0 top-2 px-8 z-10">
      <ControlsMenu />
    </nav>
    <div
      class="flex justify-center items-center py-24 md:px-32 lg:px-44 md:my-28 flex-col text-center"
    >
      <h1 :class="{ 'opacity-0': isMenuOpen }">
        Discover and explore your favorite shows effortlessly.
      </h1>
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import ControlsMenu from './ControlsMenu.vue'
import useLocalStorage from '@/hooks/useLocalStorage.vue'

useLocalStorage()

const isMenuOpen = inject('isMenuOpen', ref(false))
</script>
