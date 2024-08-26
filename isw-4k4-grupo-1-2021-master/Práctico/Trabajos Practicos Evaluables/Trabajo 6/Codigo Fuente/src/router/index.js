import Vue from 'vue'
import VueRouter from 'vue-router'
import PaginaPrincipal from '../views/principal'
import LoQueSea from '../views/LoQueSea'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PaginaPrincipal
  },
  {
    path: '/LoQueSea',
    name: 'NewPedido',
    component: LoQueSea
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
