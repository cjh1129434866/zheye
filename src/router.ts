import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreateArticle from '@/views/CreateArticle.vue'
import SignUp from '@/views/SignUp.vue'
import Axios from 'axios'
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
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/columnDetail/:id',
      name: 'ColumnDetail',
      component: ColumnDetail
    },
    {
      path: '/createArticle',
      name: 'CreateArticle',
      component: CreateArticle,
      meta: { requiredLogin: true }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})

router.beforeEach((to, form, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.log(e)
        store.commit('loginOut')
        next('/login')
      })
    } else {
      if (requiredLogin) {
        next('/login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router