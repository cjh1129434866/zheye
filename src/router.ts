import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreateArticle from '@/views/CreateArticle.vue'
const routerHistory = createWebHistory()
const store = useStore()
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
    },
    {
      path: '/createArticle',
      name: 'CreateArticle',
      component: CreateArticle
    }
  ]
})

router.beforeEach((to, form, next) => {
  console.log(to)
  if (to.path !== '/login' && !store.state.user.isLogin) {
    next('/login')
  } else {
    next()
  }
})

export default router