import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import axios from 'axios';
import Strapi from 'strapi-sdk-javascript';
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false }

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      const response =  strapi.login(
        user.identifier,
        user.password
      ).then(response=>{
        console.log(response)
        const token = response.jwt
        localStorage.setItem('user-token', token)
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
        commit(AUTH_SUCCESS, response)
        dispatch(USER_REQUEST)
        resolve(response)
 
      }).catch(error => {
        commit(AUTH_LOGOUT)
        localStorage.removeItem('user-token')
        // remove the axios default header
        delete axios.defaults.headers.common['Authorization']
        reject(error)
      })

    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      if(localStorage.getItem('user-token')){
        strapi.clearToken(localStorage.getItem('user-token'));
        localStorage.removeItem('user-token')
        commit(AUTH_LOGOUT)
        resolve(null)
      }else{
        commit(AUTH_LOGOUT)
      }
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.jwt
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
