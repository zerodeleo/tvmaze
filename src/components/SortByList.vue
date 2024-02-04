
import type StarsListVue from './StarsList.vue';
<template>
    <button @click="handleSelectSort(sortKey.key as SortKey)" class="btn-invert" v-for="sortKey in SORT_KEYS" :key="sortKey.key">{{ sortKey.display }}</button>
</template>

<script setup lang="ts">
import { type SortKey } from '@/interface';
import { SORT_KEYS } from '@/utils'
import { inject, ref, type Ref } from 'vue';

const sortKey = inject<Ref<SortKey>>('sortKey', ref(SORT_KEYS[0].key as SortKey))
const selectedRating = inject<Ref<number>>('selectedRating', ref(0));

const handleSelectSort = (key: SortKey) => {
    selectedRating.value = 0;
    sortKey.value = key;
}
</script>