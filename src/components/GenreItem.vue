<template>
        <button @click="handleSelectGenre(genre)" :class="selectedGenre === genre ? 'btn' : 'btn-invert'">{{genre}}</button>
</template>

<script setup lang="ts">
import { defineProps, inject, ref, type Ref } from 'vue';

const { genre } = defineProps<{ genre: string }>();
const selectedGenre = inject<Ref<string>>('selectedGenre', ref(''));

const handleSelectGenre = (genre: string) => {
        if (genre === selectedGenre.value) {
                selectedGenre.value = '';
        } else {
                selectedGenre.value = genre;
        }
};
</script>