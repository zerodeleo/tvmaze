<template>
  <div class="flex items-center justify-between px-4 py-3">
    <div class="text-white">Logo</div>
    <div class="menu-toggle md:hidden" @click="toggleMenu">
      <svg
        class="w-6 h-6 fill-current text-white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          v-if="!isMenuOpen"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4 6H20C20.5523 6 21 6.44771 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7C3 6.44771 3.44772 6 4 6ZM20 12H4C3.44772 12 3 12.4477 3 13C3 13.5523 3.44772 14 4 14H20C20.5523 14 21 13.5523 21 13C21 12.4477 20.5523 12 20 12ZM20 18H4C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18Z"
        />
        <path
          v-else
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4 6H20C20.5523 6 21 6.44771 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7C3 6.44771 3.44772 6 4 6ZM20 12H4C3.44772 12 3 12.4477 3 13C3 13.5523 3.44772 14 4 14H20C20.5523 14 21 13.5523 21 13C21 12.4477 20.5523 12 20 12ZM20 18H4C3.44772 18 3 18.4477 3 19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18Z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
