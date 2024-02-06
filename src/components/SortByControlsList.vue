import type StarsListVue from './StarsList.vue';
<template>
  <li
    @click.stop
    @click="handleSelectSort(sortKeyObj.key as SortKey)"
    :class="sortKey === sortKeyObj.key ? 'btn-secondary-active' : 'btn-secondary'"
    v-for="sortKeyObj in SORT_KEYS"
    :key="sortKeyObj.key"
  >
    {{ sortKeyObj.display }}
  </li>
</template>

<script setup lang="ts">
import { type SortKey } from '@/interface'
import { SORT_KEYS } from '@/constants'
import { inject, ref } from 'vue'

const sortKey = inject('sortKey', ref(SORT_KEYS[0].key as SortKey))
const selectedRating = inject('selectedRating', ref(0))

const handleSelectSort = (key: SortKey) => {
  selectedRating.value = 0
  sortKey.value = key
}
</script>
