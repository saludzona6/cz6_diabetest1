import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store.js'
import Home from '@/components/Home.vue'
import LoginComponent from '@/components/auth/LoginComponent'
import DashboardComponent from '@/components/private/dashboard/DashboardComponent'
import Paciente from '@/components/private/Paciente'
import RegistroDetail from '@/components/private/registros/RegistroDetail'

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
    },
    {
      path: '/paciente/:id',
      name: 'Paciente',
      component: Paciente,
      props: true,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/registro/:id',
      name: 'Registro',
      component: RegistroDetail,
      props: true,
      beforeEnter: ifAuthenticated,
    }


  ]
})
