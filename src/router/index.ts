import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/auth/login.vue'
import register from '@/views/auth/register.vue'
import logout from '@/views/auth/logout.vue'
import Home from '@/views/index.vue'
import filmZoom from '@/views/film/_id.vue'
import favorite from '@/views/film/favorite.vue'
import allFilms from '@/views/film/allFilms.vue'
import BuyTicketStart from '@/views/buyTicket/start.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth/login',
      name: 'login',
      component: login
    },
    {
      path: '/auth/register',
      name: 'register',
      component: register
    },
    {
      path: '/auth/logout',
      name: 'logout',
      component: logout
    },
    {
      path: '/film/:id',
      name: 'filmZoom',
      component: filmZoom
    },
    {
      path: '/favorite',
      name: 'favoriteFilms',
      component: favorite
    },
    {
      path: '/allFilms',
      name: 'allFilms',
      component: allFilms
    },
    {
      path: '/buyTicket/:id/start',
      name: 'buyTicketStart',
      component: BuyTicketStart
    },
  ]
})

export default router
