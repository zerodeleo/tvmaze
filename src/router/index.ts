// router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import MoviesView from '../views/MoviesView.vue'
import MovieDetails from '../views/MovieDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/movies' },
    { path: '/movies', component: MoviesView },
    {
      path: '/movies/:id',
      component: MovieDetails,
      name: 'movie-details',
      props: true // Pass route params as props to MovieDetails
    }
  ]
})

export default router
