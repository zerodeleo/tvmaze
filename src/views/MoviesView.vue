<template>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <section v-else-if="data">
    <p>{{ currentPage }}</p>
    <p>{{ totalPages }}</p>
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous Page</button>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next Page</button>
    <h1>Genres:</h1>
    <ul>
      <li class="inline-block m-2">
        <button class="btn text-custom-300 hover-scale" @click="filterByGenres(genre)"
          :class="{ 'bg-custom-200 text-custom-300': showGenres.find(g => g === genre) }" v-for="genre in genres"
          :key="genre">{{ genre
          }}</button>
      </li>
    </ul>
    <ul>
      <li class="my-8 p-5 justify-center items-center flex flex-col" v-for="movie in paginatedMovies" :key="movie.id">
        <router-link :to="movieDetailsLink(movie.id, movie)">
          <button class="shadow rounded rotate-12 hover-scale">
            <img class="rounded shadow-md" :src="movie.image.medium" />            
          </button>
        </router-link>
        <h1 class="text-2xl text-custom-200 mt-12 pb-4 flex justify-start w-full" :key="movie.name">
          {{ movie.name }}
        </h1>
        <article class="flex w-full items-center justify-between" v-if="movie.rating && movie.rating.average">
          <p class="text-xl text-custom-400 bg-custom-200 shadow-md rounded-full p-2 m-2 aspect-square">{{movie.rating.average}}{{ movie.rating.average.toString().length !== 1 ? '' : '.0' }}</p>
          <div class="flex w-full  justify-end">
            <div v-for="index in Math.floor(movie.rating.average)" :key="index">
              <StarIconSolid class="h-6 w-6 fill-custom-200" />
            </div>
            <div v-for="index in 10 - Math.floor(movie.rating.average)" :key="index">
              <StarIconOutline class="h-6 w-6 stroke-custom-200" />
            </div>
          </div>
        </article>
      </li>
    </ul>
    <article class="flex" v-if="showMessage">
      <p class="m-1">There's no show with combination</p>
      <div class="btn my-1 mx-3 flex rounded-lg">
        <p class="mx-1" v-for="genre in showGenres" :key="genre">{{ genre }}</p>
      </div>
      <p class="m-1">Please pick another combo :)</p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getMovies } from '@/api/tvmaze'
import type { Movie, Movies } from '@/interface/tvmaze'
import { computed, ref, watch } from 'vue';
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline';
import  * as utils from '@/utils';

const movies = ref<Movies>([]);
const page = ref(1);
const moviesPerPage = ref(5);
const currentPage = ref(1);
const showGenres = ref<string[]>([]);

const showMessage = computed(() => paginatedMovies.value.length === 0);
const genres = computed<string[]>(() => utils.getValuesByKey('genres', data.value)?.sort((a, b) => a.localeCompare(b)))
const filteredAndSortedMovies = computed<Movies>(() => utils.deepFilterAndSortData(movies.value, showGenres.value, 'genres', 'name'))
const paginatedMovies = computed(() => utils.getPaginatedData(filteredAndSortedMovies.value, startIndex.value, endIndex.value));
const startIndex = computed(() => utils.getStartIndex(currentPage.value, moviesPerPage.value));
const endIndex = computed(() => utils.getEndIndex(startIndex.value, moviesPerPage.value));
const totalPages = computed(() => utils.getTotalPages(filteredAndSortedMovies.value, moviesPerPage.value))

const { isLoading, isError, data, error } = useQuery<Movies>({
  queryKey: ['movies', page],
  queryFn: () => getMovies(page.value),
});


const goToPage = (p: number) => {
  currentPage.value = p;
  if (currentPage.value === totalPages.value) {
    page.value += 1;
  }
}

const filterByGenres = (genre: string) => {
  const arr = showGenres.value;
  if (!arr.includes(genre)) {
    arr.push(genre);
  } else {
    arr.splice(arr.indexOf(genre), 1);
  }
  showGenres.value = arr;
  currentPage.value = 1;
}

watch(filteredAndSortedMovies, () => {
  if (filteredAndSortedMovies.value.length < moviesPerPage.value) {
    page.value += 1
  }
})

watch(data, () => {
  if (data.value) {
    movies.value = movies.value.concat(data.value);
  }
  if (page.value < 10) {
    page.value++
  }
})

const movieDetailsLink = (id: number, movie: Movie) => ({
  name: 'movie-details',
  params: { id },
  props: { movie },
});

</script>

<style>
.btn {
  @apply items-center rounded-lg cursor-pointer text-base justify-center leading-4 py-2 px-3 mr-2 mb-2 text-left select-none whitespace-pre break-normal shadow-sm shadow-custom-200;
}

.hover-scale {
  @apply hover:scale-105 transition-transform duration-300 ease-in-out
}
</style>
