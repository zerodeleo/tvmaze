<template>
  <ul class="flex flex-wrap flex-col items-end md:items-center md:flex-row w-full justify-end">
    <li
      class="max-w-max"
      v-for="control in controls"
      :key="control.key"
    >
    <button @click.stop
        @click="handleToggle(control.key)" :class="control.isToggled ? 'btn-primary-active' : 'btn-primary'">
      {{ control.display }}
    </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { CONTROLS } from '@/constants'

const controls = inject('controls', ref(CONTROLS))
const isMenuOpen = inject('isMenuOpen', ref(false))

const handleToggle = (key: string) => {
  if (!controls.value) {
    return
  }

  const control = controls.value.find((control) => control.key === key)
  if (!control) {
    return
  }
  isMenuOpen.value = !control.isToggled

  
  controls.value = controls.value.map((c) => ({
    ...c,
    isToggled: c.key === key ? !c.isToggled : false
  }))
}

</script>
