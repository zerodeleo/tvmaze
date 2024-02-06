<template>
  <li
    @click="handleSelectGroup(groupKeyObj.key as GroupKey)"
    :class="groupKey === groupKeyObj.key ? 'btn' : 'btn-invert'"
    v-for="groupKeyObj in GROUP_KEYS"
    :key="groupKeyObj.key"
  >
    {{ groupKeyObj.display }}
  </li>
</template>

<script setup lang="ts">
import { type GroupKey } from '@/interface'
import { GROUP_KEYS } from '@/constants'
import { inject, ref, type Ref } from 'vue'

const groupKey = inject<Ref<GroupKey>>('groupKey', ref(GROUP_KEYS[0].key as GroupKey))
const selectedRating = inject<Ref<number>>('selectedRating', ref(0))
const handleSelectGroup = (key: GroupKey) => {
  selectedRating.value = 0
  groupKey.value = key
}
</script>
