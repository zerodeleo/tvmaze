// router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import ShowsView from '../views/ShowsView.vue'
import ShowDetails from '../views/ShowDetails.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/shows' },
    { name: 'ShowsView', path: '/shows', component: ShowsView },
    {
      path: '/show/:id',
      name: 'ShowDetails',
      component: ShowDetails,
      props: true
    },
    { path: '/:catchAll(.*)', component: NotFoundView }
  ]
})

export default router
