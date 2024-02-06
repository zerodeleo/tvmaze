<template>
  <li
    @click.stop
    @click="handleSelectGroup(groupKeyObj.key as GroupKey)"
    :class="groupKey === groupKeyObj.key ? 'btn-secondary-active' : 'btn-secondary'"
    v-for="groupKeyObj in GROUP_KEYS"
    :key="groupKeyObj.key"
  >
    {{ groupKeyObj.display }}
  </li>
</template>

<script setup lang="ts">
import { type GroupKey } from '@/interface'
import { GROUP_KEYS } from '@/constants'
import { inject, ref } from 'vue'

const groupKey = inject('groupKey', ref(GROUP_KEYS[0].key as GroupKey))
const selectedRating = inject('selectedRating', ref(0))
const handleSelectGroup = (key: GroupKey) => {
  selectedRating.value = 0
  groupKey.value = key
}
</script>
