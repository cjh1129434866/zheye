import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/columnDetail/:id',
      name: 'ColumnDetail',
      component: ColumnDetail
    }
  ]
})

/* router.beforeEach((to, from, next) => {
  if (true) {
    if (token === undefined) {

    }
  }
}) */

export default router