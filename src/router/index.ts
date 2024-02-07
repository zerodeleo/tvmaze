// router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import ShowsView from '../views/ShowsView.vue'
import ShowDetails from '../views/ShowDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/shows' },
    { path: '/shows', component: ShowsView },
    {
      path: '/show/:id',
      name: 'ShowDetails',
      component: ShowDetails,
      props: true
    }
  ]
})

export default router
