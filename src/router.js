import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store.js'
import Home from './views/Home.vue'
import LoginComponent from '@/components/auth/LoginComponent'
import DashboardComponent from '@/components/private/dashboard/DashboardComponent'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/login',
      name: 'login',
      beforeEnter: ifNotAuthenticated,
      component: LoginComponent
    },{
      path: '/dashboard',
      name: 'dashboard',
      beforeEnter: ifAuthenticated,
      component: DashboardComponent
    }

  ]
})
