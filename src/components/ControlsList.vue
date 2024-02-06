<template>
  <ul class="flex flex-wrap flex-col items-end md:items-center md:flex-row w-full justify-end">
    <li
      class="max-w-max"
      v-for="control in controls"
      :key="control.key"
      @click.stop
      @click="handleToggle(control.key)"
      :class="control.isToggled ? 'btn-primary-active' : 'btn-primary'"
    >
      {{ control.display }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { CONTROLS } from '@/constants'

const controls = inject('controls', ref(CONTROLS))
const isMenuOpen = inject('isMenuOpen', ref(false))

const handleToggle = (key: string) => {
  if (!controls.value.find((control) => control.key === key)!.isToggled) {
    isMenuOpen.value = true
  } else {
    isMenuOpen.value = false
  }
  controls.value = controls.value.map((control) => ({
    ...control,
    isToggled: control.key === key ? !control.isToggled : false
  }))
}
</script>
