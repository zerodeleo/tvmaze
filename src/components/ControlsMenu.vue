<template>
  <div
    class="flex justify-between"
    @click.stop
    @click="handleCloseMenu"
    :class="{
      'h-screen': isMenuOpen,
      'bg-custom-400': isMenuOpen,
      'bg-opacity-90': isMenuOpen,
      'flex-col': isMenuOpen,
      'flex-row': !isMenuOpen
    }"
  >
    <HamburgerMenuButton />
    <div
      class="flex flex-col w-full md:flex md:items-center"
      :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
    >
      <ControlsList />
      <ControlsToggleList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import ControlsList from './ControlsList.vue'
import ControlsToggleList from './ControlsToggleList.vue'
import HamburgerMenuButton from './HamburgerMenuButton.vue'
import { CONTROLS } from '@/constants'

const isMenuOpen = inject('isMenuOpen', ref(false))
const controls = inject('controls', ref(CONTROLS))

const handleCloseMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  controls.value = CONTROLS
}
</script>
