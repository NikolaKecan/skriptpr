import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewJoke from '@/views/NewJoke.vue'
import Joke from '@/views/Joke.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', //ruta
    name: 'Home',  //ime rute
    component: Home  //view koji prikazuje rutu
  },
  {
    path: '/edit',
    name: 'newJoke',
    component: NewJoke
  },
  {
    path: '/joke/:id',
    name: 'joke',
    component: Joke
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
