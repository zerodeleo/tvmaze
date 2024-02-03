<template>
  <span v-if="isLoading">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <section v-else-if="data">
    <p>{{ currentPage }}</p>
    <p>{{ totalPages }}</p>
    <button @click="goToPage(currentPage - 1)">Previous Page</button>
    <button @click="goToPage(currentPage + 1)">Next Page</button>
    <h1>Genres:</h1>
    <ul>
      <li @click="filterByGenres(genre)" class="inline-block m-2" :class="{ 'bg-blue-200': showGenres.find(g => g === genre) }"  v-for="genre in genres" :key="genre">{{genre}}</li>
    </ul>
    <ul>
      <li v-for="movie in paginatedMovies" :key="movie.id">
        <p :key="movie.name">
          {{ movie.name }}
        </p>
        <div class="flex flex-row text-center">
          <p class="text-xs m-2" v-for="genre  in movie.genres" :key="genre">{{genre}}</p>
        </div>
      </li>
    </ul>
    <article class="flex" v-if="showMessage">
      <p class="m-1">There's no show with combination</p>
      <div class="my-1 mx-3 bg-blue-300 flex rounded-lg">
        <p class="mx-1" v-for="genre in showGenres" :key="genre">{{genre}}</p>
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

const getStartIndex = () => (currentPage.value - 1) * moviesPerPage.value;
const getEndIndex = () => startIndex.value + moviesPerPage.value;
const getPaginatedMovies = () => filteredMovies.value!.slice(startIndex.value, endIndex.value)
const getTotalPages = () => Math.ceil(filteredMovies.value!.length / moviesPerPage.value)
const getValuesByKey = (key: string): string[] => {
  if (data.value) {
    const values = data.value.flatMap(movie => movie[key as keyof Movie]).reduce<string[]>((cache, value) => {
      if (cache.includes(value)) {
        return cache;
      } else {
        cache.push(value);
        return cache;
      }
    }, [])
  return values;
  }
  return [];
}

const movies = ref<Movies>([]);
const page = ref(1);
const moviesPerPage = ref(20);
const currentPage = ref(1);
const showGenres = ref<string[]>([]);

const showMessage = computed(() => paginatedMovies.value.length === 0);
const totalPages = computed(getTotalPages)
const startIndex = computed(getStartIndex);
const endIndex = computed(getEndIndex);
const paginatedMovies = computed<Movies>(getPaginatedMovies);
const genres = computed<string[]>(() => getValuesByKey('genres')?.sort((a, b) => a.localeCompare(b)))
const filteredMovies = computed<Movies>(() => {
    return data.value?.concat(movies.value).filter(movie => showGenres.value.every(r => movie.genres.includes(r))).sort((a, b) => a.name.localeCompare(b.name)) ?? [];
})

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

watch(showGenres, () => {
  console.log(showGenres.value)
})

const filterByGenres = (genre: string) => {
  const arr = showGenres.value;
  if (!arr.includes(genre)) {     
    arr.push(genre);             
  } else {
    arr.splice(arr.indexOf(genre), 1); 
  }
  showGenres.value = arr;
}

</script>
