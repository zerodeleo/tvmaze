<template>
    <section class="flex flex-col">
        <article>
            <input class="input" placeholder="Search Query" />
        </article>
        <article class="flex">
            <div class="flex">
                <button v-for="control in controls" :key="control.key" @click="handleToggle(control.key)"
                    :class="control.isToggled ? 'btn' : 'btn-invert'">{{ control.display }}</button>
            </div>
        </article>
        <article v-for="control in controls" :key="control.key + '-list'">
            <GenreList v-if="control.isToggled && control.key === 'genres'" :genres="genres" />
            <RatingsList v-if="control.isToggled && control.key === 'ratings'" />
            <SortByList v-if="control.isToggled && control.key === 'sortBy'" />
        </article>
    </section>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import GenreList from '@/components/GenreList.vue';
import RatingsList from '@/components/RatingsList.vue';
import SortByList from '@/components/SortByList.vue';

const controls = ref([{ key: 'genres', display: 'Genres', isToggled: false }, { key: 'ratings', display: 'Ratings', isToggled: true }, { key: 'sortBy', display: 'Sort By', isToggled: false }])
const genres = inject('genres', [])

const handleToggle = (key: string) => {
    controls.value = controls.value.map(control => ({...control, isToggled: control.key === key ? !control.isToggled : false }))
}

</script>