<template>
  <ul class="flex mb-10 flex-col md:flex-row w-full">
    <li
      class="text-xl md:text-2xl max-w-max"
      v-for="control in controls"
      :key="control.key"
      @click="handleToggle(control.key)"
      :class="control.isToggled ? 'btn' : 'btn-invert'"
    >
      {{ control.display }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { CONTROLS } from '@/constants'

const controls = inject('controls', ref(CONTROLS))

const handleToggle = (key: string) => {
  controls.value = controls.value.map((control) => ({
    ...control,
    isToggled: control.key === key ? !control.isToggled : false
  }))
}
</script>
